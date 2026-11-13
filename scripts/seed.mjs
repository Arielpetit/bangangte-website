// Charge le contenu de départ (src/content/seed/*.json) dans Supabase.
// Usage : npm run db:seed   (lit NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env.local)
// Sans risque à relancer : les lignes sont mises à jour par slug, rien n'est supprimé.
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim().replace(/\/(rest|auth|storage)\/v1\/?$/, "").replace(/\/+$/, "");
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Ajoutez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env.local.");
  process.exit(1);
}
const sb = createClient(url, key, { auth: { persistSession: false } });
const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "content", "seed");
const load = (name) => JSON.parse(readFileSync(path.join(dir, `${name}.json`), "utf8"));

async function upsert(table, rows, onConflict = "slug") {
  if (!rows.length) return [];
  const { data, error } = await sb.from(table).upsert(rows, { onConflict }).select("id,slug");
  if (error) throw new Error(`${table}: ${error.message}`);
  console.log(`✓ ${table} : ${rows.length}`);
  return data;
}
const idMap = (rows) => Object.fromEntries(rows.map((r) => [r.slug, r.id]));

// 1. Services (sans liens), 2. personnes, 3. liens services, 4. le reste.
const units = load("units");
const unitIds = idMap(await upsert("units", units.map((u) => { const c = { ...u }; delete c.parent_id; delete c.head_id; return c; })));
const people = load("people");
const peopleIds = idMap(await upsert("people", people.map((p) => ({ ...p, unit_id: p.unit_id ? unitIds[p.unit_id] ?? null : null }))));
for (const u of units) {
  if (!u.parent_id && !u.head_id) continue;
  const { error } = await sb.from("units").update({ parent_id: u.parent_id ? unitIds[u.parent_id] : null, head_id: u.head_id ? peopleIds[u.head_id] : null }).eq("slug", u.slug);
  if (error) throw new Error(`units links: ${error.message}`);
}
console.log("✓ organigramme relié");

const commissions = load("commissions").map((c) => ({ ...c, chair_id: c.chair_id ? peopleIds[c.chair_id] ?? null : null }));
{
  const { error } = await sb.from("commissions").upsert(commissions, { onConflict: "name_fr" });
  if (error) throw new Error(`commissions: ${error.message}`);
  console.log(`✓ commissions : ${commissions.length}`);
}

await upsert("procedures", load("procedures").map((p) => ({ ...p, unit_id: p.unit_id ? unitIds[p.unit_id] ?? null : null })));
await upsert("posts", load("posts"));
await upsert("communiques", load("communiques"));
await upsert("events", load("events"));
await upsert("projects", load("projects"));
await upsert("albums", load("albums"));

const settings = load("settings");
{
  const rows = Object.entries(settings).map(([k, value]) => ({ key: k, value }));
  const { error } = await sb.from("settings").upsert(rows, { onConflict: "key", ignoreDuplicates: true });
  if (error) throw new Error(`settings: ${error.message}`);
  console.log(`✓ settings : ${rows.length} (valeurs existantes conservées)`);
}
console.log("\nContenu de départ chargé.");
