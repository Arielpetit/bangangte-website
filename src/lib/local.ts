import { existsSync } from "node:fs";
import path from "node:path";

/** Photo déposée dans public/images/<dossier>/<slug>.(jpg|png|webp), si elle existe. */
export function localPhoto(folder: string, slug: string): string | null {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    const rel = `/images/${folder}/${slug}.${ext}`;
    if (existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}
