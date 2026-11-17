import Link from "next/link";
import { Icon, T } from "@/components/ui";
import { getCommuniques, getEvents, getPosts, getProcedures, getProjects } from "@/lib/data/content";
import { meta } from "@/lib/meta";
import { CHEFFERIES } from "@/lib/chefferies";
import { GROUPS, SINGLE, type Bi } from "@/lib/nav";
import { AWARDS, MAYORS, PARTNERS, STEPS } from "@/lib/history";
import { CULTURAL_TIERS, POLITICAL_TIERS, TRADITIONAL_TIERS } from "@/lib/people";
import { SITES } from "@/lib/sites";

export const dynamic = "force-dynamic";
export const metadata = meta("Recherche", "Search", "Rechercher une page, une actualité, un communiqué, une démarche ou une personnalité sur le site de la Commune de Bangangté.");

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const plain = (s: string | null | undefined) => (s ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const cut = (s: string, n = 150) => (s.length > n ? s.slice(0, n).trimEnd() + "…" : s);

type Item = { href: string; icon: string; title: Bi; text?: Bi; hay: string; head: string };
type Section = { key: string; label: Bi; items: Item[] };

const bi = (fr: string | null | undefined, en: string | null | undefined): Bi => ({ fr: plain(fr), en: plain(en) || plain(fr) });
const item = (href: string, icon: string, title: Bi, text: Bi | undefined, extra = ""): Item => ({ href, icon, title, text, head: norm(title.fr + " " + title.en), hay: norm([title.fr, title.en, text?.fr, text?.en, extra].join(" ")) });
const H = "/mairie/historique";

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
    { key: "topics", label: { fr: "Rubriques", en: "Topics" }, items: [
      item(`${H}#partenaires`, "users", { fr: "Nos partenaires", en: "Our partners" }, { fr: "Partenaires techniques et financiers, coopération décentralisée et institutions.", en: "Technical and financial partners, decentralised cooperation and institutions." }, "partenaire partenaires partner partners coopération cooperation"),
      item(`${H}#maires`, "users", { fr: "Maires successifs et leurs adjoints", en: "Past mayors and their deputies" }, { fr: "Depuis 1954 : administrateurs municipaux, maires et adjoints.", en: "Since 1954: municipal administrators, mayors and deputies." }, "anciens maires adjoints"),
      item(`${H}#distinctions`, "shield", { fr: "Distinctions et prix", en: "Awards and prizes" }, { fr: "Prix FEICOM, Prix des Nations unies, certification AFAQ 26000.", en: "FEICOM prize, United Nations prize, AFAQ 26000 certification." }, "prix distinction award"),
      item(`${H}#histoire`, "book", { fr: "Histoire de la commune", en: "History of the council" }, { fr: "De la fondation à l'hôtel de ville de 2022.", en: "From the founding to the 2022 town hall." }, "historique histoire"),
      item("/mairie#investir", "store", { fr: "Investir à Bangangté", en: "Invest in Bangangté" }, { fr: "Marché central, agriculture, hôtellerie, énergie.", en: "Central market, farming, hotels, energy." }, "investisseur investissement"),
      item("/mairie#diaspora", "globe", { fr: "Diaspora", en: "Diaspora" }, { fr: "Fils et filles de Bangangté : COMENGA, projets, investissements.", en: "Sons and daughters of Bangangté: COMENGA, projects, investment." }, "diaspora comenga"),
      item("/mairie", "radio", { fr: "Radio municipale 92.7 FM", en: "Municipal radio 92.7 FM" }, { fr: "Informations municipales, culture et vie des quartiers.", en: "Council news, culture and neighbourhood life." }, "radio fm"),
      item("/contact", "phone", { fr: "Contact, horaires et adresse", en: "Contact, hours and address" }, { fr: "Écrire à la mairie, téléphone, Facebook.", en: "Write to the council, phone, Facebook." }, "contacter telephone email adresse horaires"),
      item("/credits", "image", { fr: "Crédits photos et sources", en: "Photo credits and sources" }, undefined, "credits licence photo"),
    ] },
    { key: "history", label: { fr: "Histoire, maires et partenaires", en: "History, mayors and partners" }, items: [
      ...PARTNERS.map((p) => item(`${H}#partenaires`, "users", { fr: p.n, en: p.n }, { fr: "Partenaire de la commune", en: "Council partner" }, "partenaire partner coopération")),
      ...MAYORS.map((m) => item(`${H}#maires`, "users", { fr: m.n, en: m.n }, { fr: `${m.role?.fr ?? "Maire"} · ${m.y}`, en: `${m.role?.en ?? "Mayor"} · ${m.y}` }, m.deputies.join(" "))),
      ...AWARDS.map((a) => item(`${H}#distinctions`, "shield", { fr: `${a.by} ${a.y}`, en: `${a.by} ${a.y}` }, { fr: a.fr, en: a.en })),
      ...STEPS.map((s) => item(`${H}#histoire`, "book", s.t, s.d, s.y)),
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
    ? sections.map((s) => ({ ...s, items: s.items.filter((i) => terms.every((t) => i.hay.includes(t))).sort((a, b) => Number(terms.every((t) => b.head.includes(t))) - Number(terms.every((t) => a.head.includes(t)))) })).filter((s) => s.items.length)
    : [];
  const total = results.reduce((n, s) => n + s.items.length, 0);
  const SHOWN = 10;

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
              {s.items.slice(0, SHOWN).map((i) => (
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
            {s.items.length > SHOWN && (
              <details className="search-more">
                <summary><T fr={`Voir les ${s.items.length - SHOWN} autres`} en={`Show ${s.items.length - SHOWN} more`} /></summary>
                <ul className="search-hits">
                  {s.items.slice(SHOWN).map((i) => (
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
              </details>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
