// Copie la photothèque du site (src/lib/images.ts : Wikimedia Commons + public/images/local) dans le bucket Supabase « media ».
// Deux tailles par photo : 500 px (cartes, vignettes) et 1280 px (grands visuels), dans media/site/.
// Écrit src/content/site-images.json : le site utilise alors ces copies au lieu de Wikimedia.
// Usage : npm run db:images   (relançable : les photos déjà copiées sont sautées ; --force pour tout recopier)
import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim().replace(/\/(rest|auth|storage)\/v1\/?$/, "").replace(/\/+$/, "");
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) { console.error("Ajoutez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env.local."); process.exit(1); }
const sb = createClient(url, key, { auth: { persistSession: false } });

// Lecture de la liste des photos dans images.ts (clé, chemin, largeur d'origine).
const src = readFileSync(path.join(root, "src/lib/images.ts"), "utf8");
const items = [...src.matchAll(/^ {2}([a-zA-Z0-9_]+): \{ path: "([^"]+)", width: (\d+)/gm)].map(([, k, p, w]) => ({ key: k, path: p, width: Number(w) }));

const SIZES = [500, 1280];
const commons = (p, w, width) => {
  if (width <= w) return `https://upload.wikimedia.org/wikipedia/commons/${p}`;
  const [h1, h2, ...rest] = p.split("/");
  const file = rest.join("/");
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${h1}/${h2}/${file}/${w}px-${file}`;
};
const extOf = (type, p) => ({ "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" })[type] ?? (p.split(".").pop() || "jpg").toLowerCase();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Téléchargement via curl (plus fiable que fetch sur certains réseaux), avec reprise en cas de limitation (429).
function curl(u) {
  return new Promise((resolve, reject) => {
    execFile("curl", ["-sS", "-L", "--max-time", "60", "-A", "BangangteSiteImageSync/1.0 (municipal website asset copy)", "-w", "\n%{http_code} %{content_type}", "-o", "-", u], { encoding: "buffer", maxBuffer: 50 * 1024 * 1024 }, (err, out) => {
      if (err) return reject(err);
      const tail = out.subarray(out.lastIndexOf(10) + 1).toString();
      const [code, type] = tail.split(" ");
      resolve({ status: Number(code), type: (type || "image/jpeg").split(";")[0], body: new Uint8Array(out.subarray(0, out.lastIndexOf(10))) });
    });
  });
}
async function fetchImage(u) {
  for (let i = 0; i < 6; i++) {
    const r = await curl(u).catch(() => ({ status: 0 }));
    if (r.status === 200) return r;
    if (r.status === 429 || r.status === 0 || r.status >= 500) { await sleep(5000 * (i + 1)); continue; }
    throw new Error(`${r.status} ${u}`);
  }
  throw new Error(`échec après plusieurs essais : ${u}`);
}

async function put(dest, body, type) {
  const { error } = await sb.storage.from("media").upload(dest, body, { contentType: type, cacheControl: "31536000", upsert: true });
  if (error) throw new Error(`${dest}: ${error.message}`);
  return sb.storage.from("media").getPublicUrl(dest).data.publicUrl;
}

const manifestPath = path.join(root, "src/content/site-images.json");
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};
const force = process.argv.includes("--force");
let n = 0;
for (const it of items) {
  n++;
  if (!force && manifest[it.key]?.[500] && manifest[it.key]?.[1280]) { console.log(`= ${String(n).padStart(2)}/${items.length} ${it.key} (déjà copiée)`); continue; }
  try {
    const entry = {};
    if (it.path.startsWith("/")) {
      // Photo locale : un seul fichier, servi pour les deux tailles.
      const body = new Uint8Array(readFileSync(path.join(root, "public", it.path)));
      const ext = it.path.split(".").pop().toLowerCase();
      const type = ext === "webp" ? "image/webp" : ext === "png" ? "image/png" : "image/jpeg";
      const u = await put(`site/${it.key}.${ext}`, body, type);
      for (const s of SIZES) entry[s] = u;
    } else {
      for (const s of SIZES) {
        const img = await fetchImage(commons(it.path, s, it.width));
        entry[s] = await put(`site/${it.key}-${s}.${extOf(img.type, it.path)}`, img.body, img.type);
        await sleep(1200); // politesse envers Wikimedia
      }
    }
    manifest[it.key] = entry;
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 1) + "\n"); // sauvegarde à chaque photo : on peut interrompre sans rien perdre
    console.log(`✓ ${String(n).padStart(2)}/${items.length} ${it.key}`);
  } catch (e) {
    console.error(`✗ ${it.key} : ${e.message}`);
  }
}

// Logo de la commune.
try {
  manifest.__logo = await put("site/logo.png", new Uint8Array(readFileSync(path.join(root, "public/images/logo.png"))), "image/png");
  console.log("✓ logo");
} catch (e) { console.error(`✗ logo : ${e.message}`); }

writeFileSync(manifestPath, JSON.stringify(manifest, null, 1) + "\n");
console.log(`\n${Object.keys(manifest).length - 1} / ${items.length} photos copiées dans le bucket « media » (dossier site/). Manifeste : src/content/site-images.json`);
