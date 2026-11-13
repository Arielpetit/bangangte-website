import Link from "next/link";
import type { ReactNode } from "react";
import { bi, bothDates, dayMonth, initials, mediaAlt, mediaUrl, plain } from "@/lib/data/format";
import {
  COMMUNIQUE_KINDS, EVENT_CATEGORIES, POST_CATEGORIES, PROCEDURE_THEMES, PROJECT_STATUS,
  type CalEvent, type Communique, type Person, type Post, type Procedure, type Project,
} from "@/lib/data/types";
import { Icon, T } from "./ui";

/** Image de contenu (bibliothèque du site ou Supabase Storage), texte alternatif bilingue. */
export function Pic({ url, alt, w = 960, className, priority }: { url: string | null | undefined; alt: string; w?: number; className?: string; priority?: boolean }) {
  const s = mediaUrl(url, w);
  const a = mediaAlt(url, alt);
  if (!s) return <span className={`pic-empty ${className ?? ""}`} aria-hidden="true" />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={s} alt={a.fr} data-en-alt={a.en} className={className} loading={priority ? "eager" : "lazy"} />
  );
}

/** Texte bilingue venant de la base (repli sur le français). */
export function B({ fr, en }: { fr: string | null | undefined; en: string | null | undefined }) {
  const v = bi(fr, en);
  return <T fr={v.fr} en={v.en} />;
}

export function D({ iso, opts }: { iso: string | null | undefined; opts?: Intl.DateTimeFormatOptions }) {
  const d = bothDates(iso, opts);
  return <time dateTime={iso ?? undefined}><T fr={d.fr} en={d.en} /></time>;
}

/** Contenu riche déjà assaini côté serveur. */
export function RichText({ html, className = "" }: { html: string; className?: string }) {
  return <div className={`prose ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

// ---------- Actualités ----------
export function PostCard({ p, variant = "grid" }: { p: Post; variant?: "main" | "side" | "grid" }) {
  const cat = POST_CATEGORIES[p.category] ?? POST_CATEGORIES.vie_communale;
  return (
    <Link className={`card post-card post-${variant}`} href={`/actualites/${p.slug}`}>
      <div className="media">
        <Pic url={p.cover_url} alt={p.title_fr} w={variant === "main" ? 1280 : 500} />
        {variant !== "side" && <span className="cap"><T fr={cat.fr} en={cat.en} /></span>}
      </div>
      <div>
        <span className="date"><D iso={p.published_at} /></span>
        <h3><B fr={p.title_fr} en={p.title_en} /></h3>
        {variant !== "side" && <p><B fr={p.excerpt_fr || plain(p.body_fr, 180)} en={p.excerpt_en || (p.body_en ? plain(p.body_en, 180) : null)} /></p>}
      </div>
    </Link>
  );
}

/** Une grande actualité et une colonne de trois. */
export function NewsBlock({ posts }: { posts: Post[] }) {
  if (!posts.length) return <Empty fr="Aucune actualité pour le moment." en="No news yet." />;
  const [first, ...rest] = posts;
  return (
    <div className="news">
      <div className="news-main" data-reveal><PostCard p={first} variant="main" /></div>
      <div className="news-side" data-stagger>{rest.map((p) => <PostCard key={p.id} p={p} variant="side" />)}</div>
    </div>
  );
}

// ---------- Communiqués ----------
export function KindChip({ kind, urgent }: { kind: Communique["kind"]; urgent?: boolean }) {
  const k = COMMUNIQUE_KINDS[kind] ?? COMMUNIQUE_KINDS.communique;
  return (
    <span className="chip-row">
      <span className={`kchip k-${kind}`}><T fr={k.fr} en={k.en} /></span>
      {urgent && <span className="kchip k-urgent"><Icon name="alert" /><T fr="Urgent" en="Urgent" /></span>}
    </span>
  );
}

export function CommuniqueRow({ c }: { c: Communique }) {
  const d = dayMonth(c.published_at);
  return (
    <li>
      <Link className={`cq${c.urgent ? " is-urgent" : ""}`} href={`/communiques/${c.slug}`}>
        <span className="cq-date"><b>{d.day}</b><span><T fr={d.month.fr} en={d.month.en} /> {d.year}</span></span>
        <span className="cq-body">
          <KindChip kind={c.kind} urgent={c.urgent} />
          <strong><B fr={c.title_fr} en={c.title_en} /></strong>
          {c.ref && <small>Réf. {c.ref}</small>}
        </span>
        <span className="cq-go">{c.pdf_url ? <Icon name="download" /> : <Icon name="arrow" />}</span>
      </Link>
    </li>
  );
}

export function CommuniqueList({ items }: { items: Communique[] }) {
  if (!items.length) return <Empty fr="Aucun communiqué publié." en="No notices published." />;
  return <ul className="cq-list" data-stagger>{items.map((c) => <CommuniqueRow key={c.id} c={c} />)}</ul>;
}

// ---------- Agenda ----------
export function EventTile({ e, big = false }: { e: CalEvent; big?: boolean }) {
  const d = dayMonth(e.starts_at);
  const cat = EVENT_CATEGORIES[e.category] ?? EVENT_CATEGORIES.institutionnel;
  return (
    <article className={`ev${big ? " ev-big" : ""}`} id={e.slug}>
      <div className="ev-img">
        <Pic url={e.cover_url} alt={e.title_fr} w={big ? 960 : 500} />
        <div className="ev-date">
          <b>{e.recurring && e.date_label_fr && !/^\d/.test(e.date_label_fr) ? <Icon name="clock" /> : d.day}</b>
          <span><T fr={d.month.fr} en={d.month.en} /></span>
        </div>
        <span className="ev-cat"><T fr={cat.fr} en={cat.en} /></span>
      </div>
      <div className="ev-body">
        <p className="ev-meta">
          <Icon name="pin" /><B fr={e.location_fr || "Bangangté"} en={e.location_en} />
          <span aria-hidden="true">/</span>
          {e.date_label_fr ? <B fr={e.date_label_fr} en={e.date_label_en} /> : <D iso={e.starts_at} />}
        </p>
        <h3><B fr={e.title_fr} en={e.title_en} /></h3>
        <p className="ev-text"><B fr={e.description_fr} en={e.description_en} /></p>
        <ul className="tags">
          <li>{e.organizer === "mairie" ? <T fr="Organisé par la mairie" en="Council event" /> : <T fr="Partenaire" en="Partner event" />}</li>
          {e.recurring && <li><T fr="Chaque année" en="Every year" /></li>}
        </ul>
        {e.link && <a className="link-arrow" href={e.link} rel="noopener" target="_blank"><T fr="En savoir plus" en="Learn more" /><Icon name="arrow" /></a>}
      </div>
    </article>
  );
}

// ---------- Personnes ----------
export function PersonTile({ p, big = false }: { p: Person; big?: boolean }) {
  const photo = mediaUrl(p.photo_url, 500);
  return (
    <article className={`pcard${big ? " pcard-big" : ""}`}>
      <div className="pcard-img">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={p.name} loading="lazy" />
        ) : (
          <span className="pcard-ini" aria-hidden="true">{initials(p.name)}</span>
        )}
        <div className="pcard-name"><span className="role"><B fr={p.role_fr} en={p.role_en} /></span><h3>{p.name}</h3></div>
      </div>
      {p.bio_fr && <p><B fr={p.bio_fr} en={p.bio_en} /></p>}
    </article>
  );
}

export function PersonLine({ p }: { p: Person }) {
  const photo = mediaUrl(p.photo_url, 250);
  return (
    <li className="prow">
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="prow-ini prow-img" src={photo} alt="" />
      ) : (
        <span className="prow-ini" aria-hidden="true">{initials(p.name)}</span>
      )}
      <div>
        <h3>{p.name}</h3>
        <span className="role"><B fr={p.role_fr} en={p.role_en} /></span>
        {p.bio_fr && <p><B fr={p.bio_fr} en={p.bio_en} /></p>}
      </div>
    </li>
  );
}

// ---------- Projets ----------
export function ProgressChip({ s }: { s: Project["progress"] }) {
  return <span className={`pchip p-${s}`}><i aria-hidden="true" /><T fr={PROJECT_STATUS[s].fr} en={PROJECT_STATUS[s].en} /></span>;
}

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Link className="feature-card project-card" href={`/projets/${p.slug}`}>
      <div className="fc-img"><Pic url={p.cover_url} alt={p.title_fr} w={960} /><ProgressChip s={p.progress} /></div>
      <div className="fc-body">
        {p.location && <p className="site-info"><Icon name="pin" />{p.location}</p>}
        <h3><B fr={p.title_fr} en={p.title_en} /></h3>
        <p><B fr={p.summary_fr} en={p.summary_en} /></p>
        {p.funding && <p className="fund"><T fr="Financement" en="Funding" /> : {p.funding}</p>}
      </div>
    </Link>
  );
}

// ---------- Démarches ----------
export function ProcedureLink({ p }: { p: Procedure }) {
  return (
    <li>
      <Link className="proc-link" href={`/services/${p.slug}`}>
        <span><strong><B fr={p.title_fr} en={p.title_en} /></strong><small><B fr={p.summary_fr} en={p.summary_en} /></small></span>
        <Icon name="arrow" />
      </Link>
    </li>
  );
}

export const themeOf = (t: Procedure["theme"]) => PROCEDURE_THEMES[t] ?? PROCEDURE_THEMES.etat_civil;

// ---------- Divers ----------
export function Empty({ fr, en }: { fr: string; en: string }) {
  return <p className="empty"><Icon name="inbox" /><T fr={fr} en={en} /></p>;
}

/** Fil d'Ariane + titre d'une page de détail (sans photo encadrée). */
export function DetailHero({ crumbs, kicker, title, children }: { crumbs: { href?: string; fr: string; en: string }[]; kicker?: ReactNode; title: { fr: string; en: string }; children?: ReactNode }) {
  return (
    <section className="ph ph-detail">
      <div className="wrap">
        <p className="crumbs">
          <Link href="/"><T fr="Accueil" en="Home" /></Link>
          {crumbs.map((c, i) => (
            <span key={i}> / {c.href ? <Link href={c.href}><T fr={c.fr} en={c.en} /></Link> : <T fr={c.fr} en={c.en} />}</span>
          ))}
        </p>
        {kicker && <div className="ph-kicker fade-in" style={{ ["--d" as string]: ".05s" }}>{kicker}</div>}
        <h1 className="detail-title fade-in" style={{ ["--d" as string]: ".15s" }}><T fr={title.fr} en={title.en} /></h1>
        {children && <div className="fade-in" style={{ ["--d" as string]: ".35s" }}>{children}</div>}
      </div>
    </section>
  );
}
