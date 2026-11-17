import Link from "next/link";
import { Icon, T } from "@/components/ui";
import { getCommuniques, getEvents, getPosts, getProcedures, getProjects } from "@/lib/data/content";
import { meta } from "@/lib/meta";
import { CHEFFERIES } from "@/lib/chefferies";
import { GROUPS, SINGLE, type Bi } from "@/lib/nav";
import { CULTURAL_TIERS, POLITICAL_TIERS, TRADITIONAL_TIERS } from "@/lib/people";
import { SITES } from "@/lib/sites";

export const dynamic = "force-dynamic";
export const metadata = meta("Recherche", "Search", "Rechercher une page, une actualité, un communiqué, une démarche ou une personnalité sur le site de la Commune de Bangangté.");

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const plain = (s: string | null | undefined) => (s ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const cut = (s: string, n = 150) => (s.length > n ? s.slice(0, n).trimEnd() + "…" : s);

type Item = { href: string; icon: string; title: Bi; text?: Bi; hay: string };
type Section = { key: string; label: Bi; items: Item[] };

const bi = (fr: string | null | undefined, en: string | null | undefined): Bi => ({ fr: plain(fr), en: plain(en) || plain(fr) });
const item = (href: string, icon: string, title: Bi, text: Bi | undefined, extra = ""): Item => ({ href, icon, title, text, hay: norm([title.fr, title.en, text?.fr, text?.en, extra].join(" ")) });

export default async function Recherche({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim().slice(0, 80);
  const terms = norm(q).split(/\s+/).filter(Boolean);

  const [posts, communiques, events, procedures, projects] = q ? await Promise.all([
    getPosts({ limit: 200 }), getCommuniques({}), getEvents(), getProcedures(), getProjects(),
  ]) : [[], [], [], [], []];

  const sections: Section[] = [
    { key: "pages", label: { fr: "Pages", en: "Pages" }, items: [
      ...GROUPS.flatMap((g) => g.items.map((i) => item(i.href, i.icon, i.label, i.desc))),
      ...SINGLE.map((s) => item(s.href, "arrow", s.label, undefined)),
    ] },
    { key: "news", label: { fr: "Actualités", en: "News" }, items: posts.map((p) => item(`/actualites/${p.slug}`, "news", bi(p.title_fr, p.title_en), bi(p.excerpt_fr, p.excerpt_en), plain(p.body_fr))) },
    { key: "notices", label: { fr: "Communiqués et avis", en: "Notices" }, items: communiques.map((c) => item(`/communiques/${c.slug}`, "megaphone", bi(c.title_fr, c.title_en), bi(c.body_fr, c.body_en))) },
    { key: "events", label: { fr: "Agenda", en: "Events" }, items: events.map((e) => item(`/agenda#${e.slug}`, "calendar", bi(e.title_fr, e.title_en), bi(e.description_fr, e.description_en))) },
    { key: "services", label: { fr: "Démarches", en: "Formalities" }, items: procedures.map((p) => item(`/services/${p.slug}`, "file", bi(p.title_fr, p.title_en), bi(p.summary_fr, p.summary_en))) },
    { key: "projects", label: { fr: "Projets", en: "Projects" }, items: projects.map((p) => item(`/projets/${p.slug}`, "hammer", bi(p.title_fr, p.title_en), bi(p.summary_fr, p.summary_en), p.location ?? "")) },
    { key: "chiefdoms", label: { fr: "Chefferies", en: "Chiefdoms" }, items: CHEFFERIES.map((c) => item(`/chefferies#${c.slug}`, "landmark", { fr: `Royaume ${c.name}`, en: `Kingdom of ${c.name}` }, { fr: c.king, en: c.king }, c.history.fr + " " + c.history.en + " " + c.sites.map((s) => s.fr).join(" "))) },
    { key: "people", label: { fr: "Personnalités", en: "People" }, items: [...TRADITIONAL_TIERS, ...POLITICAL_TIERS, ...CULTURAL_TIERS].flatMap((t) => t.people).map((p) => item("/personnalites", "users", { fr: p.name, en: p.name }, p.role, p.text.fr + " " + p.text.en)) },
    { key: "sites", label: { fr: "À découvrir", en: "Places to see" }, items: SITES.map((s) => item(`/nature#${s.zone}`, "pin", s.t, s.d)) },
  ];

  const results = terms.length
    ? sections.map((s) => ({ ...s, items: s.items.filter((i) => terms.every((t) => i.hay.includes(t))).slice(0, 12) })).filter((s) => s.items.length)
    : [];
  const total = results.reduce((n, s) => n + s.items.length, 0);

  return (
    <section className="sec search-page">
      <div className="wrap">
        <p className="kicker"><T fr="Recherche" en="Search" /></p>
        <h1 className="search-title"><T fr="Que cherchez-vous ?" en="What are you looking for?" /></h1>
        <form className="search-form" action="/recherche" role="search">
          <Icon name="search" />
          <input type="search" name="q" defaultValue={q} placeholder="Rechercher / Search…" aria-label="Recherche / Search" autoFocus />
          <button className="btn btn-solid" type="submit"><T fr="Rechercher" en="Search" /></button>
        </form>

        {!q && (
          <div className="search-tips">
            <p className="muted"><T fr="Essayez : état civil, Bangoua, communiqué, Jeudi propre, marché, maire…" en="Try: civil records, Bangoua, notice, Clean Thursday, market, mayor…" /></p>
            <div className="chips">
              {["état civil", "Bangoua", "communiqué", "marché", "chute", "maire"].map((w) => <Link key={w} href={`/recherche?q=${encodeURIComponent(w)}`}>{w}</Link>)}
            </div>
          </div>
        )}

        {q && total === 0 && <p className="search-empty"><T fr={`Aucun résultat pour « ${q} ». Vérifiez l'orthographe ou essayez un mot plus court.`} en={`No results for “${q}”. Check the spelling or try a shorter word.`} /></p>}
        {q && total > 0 && <p className="muted search-count"><T fr={`${total} résultat${total > 1 ? "s" : ""} pour « ${q} »`} en={`${total} result${total > 1 ? "s" : ""} for “${q}”`} /></p>}

        {results.map((s) => (
          <div key={s.key} className="search-group">
            <h2><T fr={s.label.fr} en={s.label.en} /><span>{s.items.length}</span></h2>
            <ul className="search-hits">
              {s.items.map((i) => (
                <li key={i.href + i.title.fr}>
                  <Link href={i.href}>
                    <span className="ic"><Icon name={i.icon} /></span>
                    <span>
                      <strong><T fr={i.title.fr} en={i.title.en} /></strong>
                      {i.text && (i.text.fr || i.text.en) && <small><T fr={cut(i.text.fr)} en={cut(i.text.en || i.text.fr)} /></small>}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
