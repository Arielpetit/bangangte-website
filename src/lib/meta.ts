import type { Metadata } from "next";

/** Métadonnées de page en français, avec le titre anglais pour le changement de langue. */
export function meta(fr: string, en: string, description: string): Metadata {
  return {
    title: fr,
    description,
    other: { "title-fr": `${fr} | Bangangté`, "title-en": `${en} | Bangangté` },
  };
}
