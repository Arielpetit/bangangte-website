"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import { slugify } from "@/lib/data/format";

/** Compresse les photos dans le navigateur (connexions mobiles) puis les dépose dans Supabase Storage. */
export async function uploadFile(sb: SupabaseClient, bucket: "media" | "documents", file: File): Promise<string> {
  let body: Blob = file;
  let ext = (file.name.split(".").pop() || "bin").toLowerCase();
  let type = file.type;
  if (bucket === "media" && file.type.startsWith("image/") && file.type !== "image/gif") {
    const { default: compress } = await import("browser-image-compression");
    body = await compress(file, { maxWidthOrHeight: 2000, maxSizeMB: 0.9, useWebWorker: true, fileType: "image/webp", initialQuality: 0.82 });
    ext = "webp"; type = "image/webp";
  }
  const d = new Date();
  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "fichier";
  const path = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${base}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await sb.storage.from(bucket).upload(path, body, { contentType: type, cacheControl: "31536000", upsert: false });
  if (error) throw error;
  return sb.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

export type StoredFile = { name: string; path: string; url: string; size: number; created: string };

/** Liste récursive (2 niveaux : année/mois) des fichiers d'un dossier de stockage. */
export async function listFiles(sb: SupabaseClient, bucket: "media" | "documents"): Promise<StoredFile[]> {
  const out: StoredFile[] = [];
  const walk = async (prefix: string, depth: number) => {
    const { data } = await sb.storage.from(bucket).list(prefix, { limit: 1000, sortBy: { column: "created_at", order: "desc" } });
    for (const it of data ?? []) {
      const p = prefix ? `${prefix}/${it.name}` : it.name;
      if (!it.id) { if (depth < 3) await walk(p, depth + 1); continue; }
      out.push({ name: it.name, path: p, url: sb.storage.from(bucket).getPublicUrl(p).data.publicUrl, size: (it.metadata as { size?: number })?.size ?? 0, created: it.created_at ?? "" });
    }
  };
  await walk("", 0);
  return out.sort((a, b) => b.created.localeCompare(a.created));
}
