"use client";

import { setLang } from "@/components/Site";
import { useLang } from "../_lib/i18n";

/** Sélecteur de langue du tableau de bord (même préférence que le site public). */
export function LangSwitch() {
  const lang = useLang();
  return (
    <div className="ad-langsw" role="group" aria-label="Langue / Language">
      <span className="ad-langsw-pill" data-on={lang} aria-hidden="true" />
      <button type="button" aria-pressed={lang === "fr"} onClick={() => setLang("fr")}>FR</button>
      <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
    </div>
  );
}
