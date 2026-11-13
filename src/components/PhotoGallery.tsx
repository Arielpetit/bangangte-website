"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { IMG, src, type ImgKey } from "@/lib/images";
import type { Bi } from "@/lib/nav";
import { currentLang } from "./Site";
import { Icon, T } from "./ui";

export type GalleryCat = { key: string; label: Bi; items: ImgKey[] };

/** Galerie filtrable par catégorie, avec visionneuse plein écran (flèches, clavier, compteur). */
export function PhotoGallery({ cats }: { cats: GalleryCat[] }) {
  const all = useMemo(() => [...new Set(cats.flatMap((c) => c.items))], [cats]);
  const [cat, setCat] = useState("all");
  const [idx, setIdx] = useState(0);
  const [lang, setLangState] = useState<"fr" | "en">("fr");
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const on = () => setLangState(currentLang());
    on();
    window.addEventListener("langchange", on);
    return () => window.removeEventListener("langchange", on);
  }, []);

  const items = cat === "all" ? all : cats.find((c) => c.key === cat)?.items ?? all;
  const open = (i: number) => {
    setIdx((i + items.length) % items.length);
    if (!dialog.current?.open) dialog.current?.showModal();
  };
  const k = items[idx] ?? items[0];

  return (
    <>
      <div className="gal-filters" role="group" aria-label="Catégories / Categories">
        <button className="filter" type="button" aria-pressed={cat === "all"} onClick={() => setCat("all")}><T fr="Toutes" en="All" /> ({all.length})</button>
        {cats.map((c) => (
          <button key={c.key} className="filter" type="button" aria-pressed={cat === c.key} onClick={() => setCat(c.key)}>
            <T fr={c.label.fr} en={c.label.en} /> ({c.items.length})
          </button>
        ))}
      </div>
      <div className="gallery" key={cat}>
        {items.map((key, i) => (
          <button key={key} type="button" onClick={() => open(i)} className="g-in" style={{ ["--d" as string]: `${Math.min(i, 12) * 50}ms` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src(key, 500)} alt={IMG[key][lang]} loading="lazy" />
            <span className="gcap">{IMG[key][lang]}</span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        onClick={(e) => { if (e.target === dialog.current) dialog.current?.close(); }}
        onKeyDown={(e) => { if (e.key === "ArrowLeft") open(idx - 1); if (e.key === "ArrowRight") open(idx + 1); }}
      >
        <span className="lb-count">{idx + 1} / {items.length}</span>
        <button className="car-btn lb-close" type="button" aria-label="Fermer / Close" onClick={() => dialog.current?.close()}><Icon name="x" /></button>
        <button className="car-btn lb-nav lb-prev prev" type="button" aria-label="Précédente / Previous" onClick={() => open(idx - 1)}><Icon name="arrow" /></button>
        <button className="car-btn lb-nav lb-next" type="button" aria-label="Suivante / Next" onClick={() => open(idx + 1)}><Icon name="arrow" /></button>
        {k && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={k} src={src(k, 1920)} alt={IMG[k][lang]} />
            <p>{IMG[k][lang]}. Photo : {IMG[k].author}, {IMG[k].license}</p>
          </>
        )}
      </dialog>
    </>
  );
}
