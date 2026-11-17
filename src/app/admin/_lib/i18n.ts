"use client";

import { useCallback } from "react";
import { useLang, type Lang } from "@/lib/useLang";
import { EN } from "./en";

/**
 * Langue de l'interface du tableau de bord : la même préférence que le site public
 * (bouton FR / EN, enregistrée dans « bg-lang »). Les textes sont écrits en français ;
 * leur traduction anglaise est dans en.ts (repli sur le français si elle manque).
 */
export { useLang, type Lang } from "@/lib/useLang";

export type TFn = (fr: string, vars?: Record<string, string | number>) => string;
export function translate(lang: Lang, fr: string, vars?: Record<string, string | number>) {
  let s = lang === "en" ? EN[fr] ?? fr : fr;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
  return s;
}

export function useT(): TFn {
  const lang = useLang();
  return useCallback((fr, vars) => translate(lang, fr, vars), [lang]);
}
