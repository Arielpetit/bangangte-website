import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { IMG, type ImgKey, pageUrl, src } from "@/lib/images";

/** Texte bilingue : les deux langues sont rendues, le CSS n'affiche que la langue active. */
export function T({ fr, en }: { fr: ReactNode; en: ReactNode }) {
  return (
    <>
      <span data-l="fr">{fr}</span>
      <span data-l="en">{en}</span>
    </>
  );
}

/** Photo de la bibliothèque, avec texte alternatif dans les deux langues. */
export function Img({ k, w = 960, className, priority }: { k: ImgKey; w?: number; className?: string; priority?: boolean }) {
  const info = IMG[k];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src(k, w)} alt={info.fr} data-en-alt={info.en} className={className} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} />
  );
}

/** Photo de la photothèque (clé, ou « img:clé ») ou photo téléversée (adresse). */
const libKey = (v: string): ImgKey | null => { const k = v.startsWith("img:") ? v.slice(4) : v; return k in IMG ? (k as ImgKey) : null; };
function AnyImg({ v, w, priority }: { v: string; w: number; priority?: boolean }) {
  const k = libKey(v);
  if (k) return <Img k={k} w={w} priority={priority} />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={v} alt="" loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} />;
}

/** Image avec légende en pastille. */
export function Media({ k, w = 960, className = "" }: { k: ImgKey; w?: number; className?: string }) {
  return (
    <div className={`media ${className}`}>
      <Img k={k} w={w} />
      <span className="cap"><T fr={IMG[k].fr} en={IMG[k].en} /></span>
    </div>
  );
}

export function Credit({ k }: { k: ImgKey }) {
  const info = IMG[k];
  const url = pageUrl(k);
  return (
    <>
      Photo : {url ? <a href={url} rel="noopener" target="_blank">{info.author}</a> : info.author}, {info.license}
    </>
  );
}

const ICONS: Record<string, string> = {
  city: '<path d="M3 21h18M5 21V8l6-4v17M11 21V10h8v11M8 10v.01M8 14v.01M8 18v.01M15 14v.01M15 18v.01"/>',
  book: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
  users: '<circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M16 3.1a4 4 0 0 1 0 7.8M21 21v-2a4 4 0 0 0-3-3.9"/>',
  mountain: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
  mask: '<path d="M12 2c4 0 7 3 7 8 0 6-3 12-7 12S5 16 5 10c0-5 3-8 7-8z"/><path d="M8.5 10h2M13.5 10h2M10 16h4"/>',
  bed: '<path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  landmark: '<path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l8 5H4z"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  arrow: '<path d="M5 12h14M13 5l7 7-7 7"/>',
  chev: '<path d="m6 9 6 6 6-6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  build: '<path d="M2 20h20M4 20V9l8-5 8 5v11M9 20v-6h6v6"/>',
  store: '<path d="M3 9l1.5-5h15L21 9M3 9v11h18V9M3 9h18M9 20v-6h6v6"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 4 13c0-6 7-10 16-10 0 9-4 16-10 16zM4 20l8-8"/>',
  ball: '<circle cx="12" cy="12" r="10"/><path d="m12 7 4 3-1.5 5h-5L8 10z"/>',
  alert: '<path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
  radio: '<circle cx="12" cy="12" r="2"/><path d="M16.2 7.8a6 6 0 0 1 0 8.5M7.8 16.2a6 6 0 0 1 0-8.5M19.1 4.9a10 10 0 0 1 0 14.2M4.9 19.1a10 10 0 0 1 0-14.2"/>',
  bolt: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
  drop: '<path d="M12 2s7 7.5 7 13a7 7 0 0 1-14 0c0-5.5 7-13 7-13z"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  fb: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  water: '<path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 7c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
  tree: '<path d="M12 22v-6M8 16h8l-4-6 3 0-3-5-3 5h3z"/>',
  megaphone: '<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1zM15 8a5 5 0 0 1 0 8M18 5a9 9 0 0 1 0 14"/>',
  news: '<path d="M4 4h13v16H6a2 2 0 0 1-2-2zM17 8h3v10a2 2 0 0 1-2 2M8 8h5M8 12h5M8 16h3"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  upload: '<path d="M12 21V9M7 14l5-5 5 5M5 3h14"/>',
  inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  hammer: '<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9M17.6 15 22 10.6M20 12.6 11.4 4l2.8-2.8 8.6 8.6"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  whatsapp: '<path d="M3 21l1.6-4.8A9 9 0 1 1 8 19.6z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.2-2-1-1 .8a4 4 0 0 1-2.3-2.3l.8-1-1-2z"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  external: '<path d="M14 3h7v7M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>',
};

export function Icon({ name, className = "icon" }: { name: string; className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[name] ?? "" }} />;
}

/** Titre animé lettre par lettre (rendu côté serveur, sans JavaScript). */
export function SplitTitle({ text, className, as: Tag = "h1", base = 0.15 }: { text: { fr: string; en: string }; className?: string; as?: "h1" | "h2"; base?: number }) {
  const render = (s: string) => {
    let i = 0;
    const words = s.split(" ");
    return words.map((word, wi) => (
      <Fragment key={wi}>
        <span className="word">
          {[...word].map((c, ci) => (
            <span key={ci} className="ch" style={{ ["--i" as string]: i++, ["--base" as string]: `${base}s` }}>{c}</span>
          ))}
        </span>
        {wi < words.length - 1 ? " " : null}
      </Fragment>
    ));
  };
  return (
    <Tag className={`split-chars ${className ?? ""}`}>
      <span className="line" data-l="fr">{render(text.fr)}</span>
      <span className="line" data-l="en">{render(text.en)}</span>
    </Tag>
  );
}

/** En-tête de page intérieure : texte à gauche, photo encadrée de ndop à droite. */
export function PageHero({
  crumb, kicker, title, lead, img, inset, badge, facts, landscape, children,
}: {
  crumb: { fr: string; en: string };
  kicker?: { fr: string; en: string };
  title: { fr: string; en: string };
  lead: { fr: ReactNode; en: ReactNode };
  /** Clé de la photothèque, ou adresse d'une photo (téléversée dans le tableau de bord). */
  img: ImgKey | string;
  inset?: ImgKey | string | null;
  badge?: { big: ReactNode; small: { fr: string; en: string } };
  facts?: { fr: string; en: string }[];
  landscape?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="ph">
      <div className="wrap ph-grid">
        <div>
          <p className="crumbs"><Link href="/"><T fr="Accueil" en="Home" /></Link> / <T fr={crumb.fr} en={crumb.en} /></p>
          {kicker && <p className="kicker"><T fr={kicker.fr} en={kicker.en} /></p>}
          <SplitTitle text={title} />
          <p className="lead fade-in" style={{ ["--d" as string]: ".55s" }}><T fr={lead.fr} en={lead.en} /></p>
          {facts && (
            <ul className="ph-facts fade-in" style={{ ["--d" as string]: ".75s" }}>
              {facts.map((f, i) => <li key={i}><T fr={f.fr} en={f.en} /></li>)}
            </ul>
          )}
          {children}
        </div>
        <div className={`ph-visual${landscape ? " ph-wide" : ""}`}>
          <div className={landscape ? "arch arch-wide" : "arch"}><AnyImg v={img} w={1280} priority /></div>
          {inset && <div className="ph-inset"><AnyImg v={inset} w={500} /></div>}
          {badge && <div className="ph-badge">{badge.big}<small><T fr={badge.small.fr} en={badge.small.en} /></small></div>}
        </div>
      </div>
      {libKey(img) && <p className="ph-credit"><Credit k={libKey(img)!} /></p>}
    </section>
  );
}

export function SecHead({ kicker, title, text, aside }: { kicker?: { fr: string; en: string }; title: { fr: ReactNode; en: ReactNode }; text?: { fr: ReactNode; en: ReactNode }; aside?: ReactNode }) {
  return (
    <div className="sec-head">
      <div>
        {kicker && <p className="kicker" data-reveal><T fr={kicker.fr} en={kicker.en} /></p>}
        <h2 data-reveal><T fr={title.fr} en={title.en} /></h2>
        {text && <p data-reveal><T fr={text.fr} en={text.en} /></p>}
      </div>
      {aside}
    </div>
  );
}
