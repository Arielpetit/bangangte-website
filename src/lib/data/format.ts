import { IMG, src, type ImgKey } from "@/lib/images";
import type { Photo } from "./types";

/** Résout une adresse d'image : « img:clé » désigne une photo de la bibliothèque du site, sinon URL (Supabase Storage). */
export function mediaUrl(url: string | null | undefined, w = 960): string | null {
  if (!url) return null;
  if (url.startsWith("img:")) {
    const key = url.slice(4) as ImgKey;
    return key in IMG ? src(key, w) : null;
  }
  return url;
}

/** Texte alternatif bilingue d'une image de la bibliothèque. */
export function mediaAlt(url: string | null | undefined, fallback: string): { fr: string; en: string } {
  if (url?.startsWith("img:")) {
    const key = url.slice(4) as ImgKey;
    if (key in IMG) return { fr: IMG[key].fr, en: IMG[key].en };
  }
  return { fr: fallback, en: fallback };
}

export const photoAlt = (p: Photo, fallback: string) => ({ fr: p.alt_fr || fallback, en: p.alt_en || p.alt_fr || fallback });

const TZ = "Africa/Douala";

export function fmtDate(iso: string | null | undefined, lang: "fr" | "en", opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) {
  if (!iso) return "";
  const d = new Date(iso.length === 10 ? `${iso}T12:00:00+01:00` : iso);
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", { timeZone: TZ, ...opts }).format(d);
}

export const bothDates = (iso: string | null | undefined, opts?: Intl.DateTimeFormatOptions) => ({ fr: fmtDate(iso, "fr", opts), en: fmtDate(iso, "en", opts) });

export function dayMonth(iso: string) {
  const d = new Date(iso);
  const day = new Intl.DateTimeFormat("fr-FR", { timeZone: TZ, day: "numeric" }).format(d);
  return {
    day,
    month: { fr: fmtDate(iso, "fr", { month: "short" }).replace(".", ""), en: fmtDate(iso, "en", { month: "short" }) },
    monthIndex: Number(new Intl.DateTimeFormat("en-GB", { timeZone: TZ, month: "numeric" }).format(d)),
    year: Number(new Intl.DateTimeFormat("en-GB", { timeZone: TZ, year: "numeric" }).format(d)),
  };
}

/** Texte bilingue avec repli sur le français. */
export const bi = (fr: string | null | undefined, en: string | null | undefined) => ({ fr: fr ?? "", en: en || fr || "" });

export function initials(name: string) {
  const w = name.replace(/^(Dr|S\.M\.|M\.|Mme)\s+/i, "").split(/\s+/).filter(Boolean);
  // Prénom + nom de famille (souvent en majuscules) : « Éric Aimé NIAT » → « EN ».
  const last = [...w].reverse().find((x) => x.length > 1 && x === x.toUpperCase()) ?? w[w.length - 1] ?? "";
  return ((w[0]?.[0] ?? "") + (w.length > 1 ? last[0] ?? "" : "")).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}

export function slugify(s: string) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").split("-").slice(0, 10).join("-");
}

/** Extrait en texte brut d'un contenu HTML. */
export function plain(html: string | null | undefined, max = 220) {
  const t = (html ?? "").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();
  return t.length > max ? t.slice(0, t.lastIndexOf(" ", max)) + "…" : t;
}
