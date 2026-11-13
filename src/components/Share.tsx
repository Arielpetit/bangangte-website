"use client";

import { useRef, useState } from "react";
import type { Photo } from "@/lib/data/types";
import { mediaUrl, photoAlt } from "@/lib/data/format";
import { Icon, T } from "./ui";

/** Boutons de partage : WhatsApp (très utilisé localement), Facebook et copie du lien. */
export function Share({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = () => (typeof window === "undefined" ? "" : window.location.href);
  const open = (base: string) => window.open(base + encodeURIComponent(url()), "_blank", "noopener,width=640,height=560");
  return (
    <div className="share">
      <button type="button" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url()}`)}`, "_blank", "noopener")}><Icon name="whatsapp" />WhatsApp</button>
      <button type="button" onClick={() => open("https://www.facebook.com/sharer/sharer.php?u=")}><Icon name="fb" />Facebook</button>
      <button type="button" onClick={async () => { try { await navigator.clipboard.writeText(url()); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {} }}>
        <Icon name={copied ? "check" : "external"} />{copied ? <T fr="Lien copié" en="Link copied" /> : <T fr="Copier le lien" en="Copy link" />}
      </button>
    </div>
  );
}

/** Galerie d'un article ou d'un projet, avec visionneuse. */
export function PhotoStrip({ photos, title }: { photos: Photo[]; title: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(0);
  const show = (n: number) => { setI((n + photos.length) % photos.length); if (!dialog.current?.open) dialog.current?.showModal(); };
  const cur = photos[i];
  return (
    <>
      <div className="post-gallery" data-stagger>
        {photos.map((ph, n) => {
          const a = photoAlt(ph, title);
          return (
            <button key={ph.url + n} type="button" onClick={() => show(n)} aria-label={a.fr}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mediaUrl(ph.url, 500) ?? ""} alt={a.fr} data-en-alt={a.en} loading="lazy" />
            </button>
          );
        })}
      </div>
      <dialog ref={dialog} className="lightbox" onClick={(e) => { if (e.target === dialog.current) dialog.current?.close(); }} onKeyDown={(e) => { if (e.key === "ArrowLeft") show(i - 1); if (e.key === "ArrowRight") show(i + 1); }}>
        <span className="lb-count">{i + 1} / {photos.length}</span>
        <button className="car-btn lb-close" type="button" aria-label="Fermer / Close" onClick={() => dialog.current?.close()}><Icon name="x" /></button>
        {photos.length > 1 && <button className="car-btn lb-nav lb-prev prev" type="button" aria-label="Précédente / Previous" onClick={() => show(i - 1)}><Icon name="arrow" /></button>}
        {photos.length > 1 && <button className="car-btn lb-nav lb-next" type="button" aria-label="Suivante / Next" onClick={() => show(i + 1)}><Icon name="arrow" /></button>}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {cur && <img key={cur.url} src={mediaUrl(cur.url, 1920) ?? ""} alt={photoAlt(cur, title).fr} />}
        {cur && (cur.alt_fr || cur.credit) && <p>{cur.alt_fr}{cur.credit ? ` · ${cur.credit}` : ""}</p>}
      </dialog>
    </>
  );
}
