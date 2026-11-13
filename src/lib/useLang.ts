"use client";

import { useSyncExternalStore } from "react";

/**
 * Langue courante (préférence FR / EN du site, sur <html data-lang>), lue par React.
 * Le rendu serveur et l'hydratation se font en français, puis le composant se met à jour :
 * pas d'écart d'hydratation. Mise à jour à chaque changement de langue (événement « langchange »).
 */
export type Lang = "fr" | "en";
const subscribe = (cb: () => void) => { window.addEventListener("langchange", cb); return () => window.removeEventListener("langchange", cb); };
const read = (): Lang => (document.documentElement.dataset.lang === "en" ? "en" : "fr");

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, read, () => "fr");
}
