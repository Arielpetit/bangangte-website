import Link from "next/link";
import { Empty, PostCard } from "@/components/mairie";
import { Icon, Img, SecHead, T } from "@/components/ui";
import { getPosts } from "@/lib/data/content";
import { POST_CATEGORIES, type Post, type PostCategory } from "@/lib/data/types";
import { meta } from "@/lib/meta";
import { Hero } from "@/components/Hero";

export const dynamic = "force-dynamic";
export const metadata = meta("Activités communales", "Council activities", "Les activités de la Commune de Bangangté année par année depuis 2014 : conseils municipaux, chantiers, écoles, santé, eau, jeunesse, coopération.");

const PER_YEAR = 6;
const yearOf = (p: Post) => p.published_at.slice(0, 4);

export default async function Activites({ searchParams }: { searchParams: Promise<{ cat?: string; annee?: string }> }) {
  const sp = await searchParams;
  const cat = sp.cat && sp.cat in POST_CATEGORIES ? (sp.cat as PostCategory) : undefined;
  const all = await getPosts();
  const inCat = cat ? all.filter((p) => p.category === cat) : all;

  const byYear = new Map<string, Post[]>();
  for (const p of inCat) byYear.set(yearOf(p), [...(byYear.get(yearOf(p)) ?? []), p]);
  const years = [...byYear.keys()].sort((a, b) => b.localeCompare(a));
  const annee = sp.annee && byYear.has(sp.annee) ? sp.annee : undefined;
  const shown = annee ? [annee] : years;

  const counts = new Map<PostCategory, number>();
  for (const p of all) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  const allYears = [...new Set(all.map(yearOf))].sort();
  const href = (q: { cat?: string; annee?: string }) => {
    const s = new URLSearchParams(Object.entries(q).filter(([, v]) => v) as [string, string][]).toString();
    return `/activites${s ? `?${s}` : ""}`;
  };

  return (
    <>
      <Hero page="activites"
        crumb={{ fr: "Activités communales", en: "Council activities" }}
        kicker={{ fr: "L'action municipale", en: "Council action" }}
        title={{ fr: "Activités communales", en: "Council activities" }}
        lead={{ fr: "Conseils municipaux, chantiers, écoles, eau et assainissement, santé, jeunesse et coopération : l'action de la commune au service des habitants, année après année.", en: "Council sessions, building works, schools, water and sanitation, health, youth and cooperation: the council's work for residents, year after year." }}
        img="elus"
        inset="hdv"
        landscape
        badge={{ big: String(all.length), small: { fr: "activités publiées", en: "activities published" } }}
        facts={allYears.length ? [{ fr: `De ${allYears[0]} à ${allYears[allYears.length - 1]}`, en: `${allYears[0]} to ${allYears[allYears.length - 1]}` }, { fr: `${allYears.length} années d'action`, en: `${allYears.length} years of action` }] : undefined}
      />

      <section className="sec">
        <div className="wrap">
          <div className="act-themes" data-stagger>
            {(Object.keys(POST_CATEGORIES) as PostCategory[]).filter((k) => counts.get(k)).map((k) => (
              <Link key={k} href={href({ cat: cat === k ? undefined : k, annee })} className={`act-theme${cat === k ? " on" : ""}`} aria-current={cat === k ? "page" : undefined}>
                <b>{counts.get(k)}</b><span><T fr={POST_CATEGORIES[k].fr} en={POST_CATEGORIES[k].en} /></span>
              </Link>
            ))}
          </div>

          <nav className="cat-nav act-years" aria-label="Années / Years" data-reveal>
            <Link href={href({ cat })} aria-current={!annee ? "page" : undefined}><T fr="Toutes les années" en="All years" /></Link>
            {years.map((y) => <Link key={y} href={href({ cat, annee: y })} aria-current={annee === y ? "page" : undefined}>{y} <small>{byYear.get(y)!.length}</small></Link>)}
          </nav>

          {shown.length === 0 && <Empty fr="Aucune activité pour ce thème." en="No activities for this theme." />}
          {shown.map((y) => {
            const items = byYear.get(y)!;
            const list = annee ? items : items.slice(0, PER_YEAR);
            return (
              <section key={y} className="act-year" id={`annee-${y}`}>
                <header className="act-year-head" data-reveal>
                  <h2>{y}</h2>
                  <span><T fr={`${items.length} activité${items.length > 1 ? "s" : ""}`} en={`${items.length} ${items.length > 1 ? "activities" : "activity"}`} /></span>
                  {!annee && items.length > PER_YEAR && <Link className="link-arrow" href={href({ cat, annee: y })}><T fr={`Toute l'année ${y}`} en={`All of ${y}`} /><Icon name="arrow" /></Link>}
                </header>
                <div className="posts-grid" data-stagger>{list.map((p) => <PostCard key={p.id} p={p} />)}</div>
              </section>
            );
          })}
        </div>
      </section>

      <section className="sec sec-dark">
        <div className="wrap split">
          <div>
            <p className="kicker" data-reveal><T fr="Ensemble" en="Together" /></p>
            <h2 data-reveal><T fr="Élus, autorités et chefs traditionnels" en="Councillors, authorities and traditional chiefs" /></h2>
            <p className="lead" data-reveal><T fr="L'action communale se construit avec l'administration, les chefferies, les comités de quartier, la diaspora et les partenaires de la commune." en="Council action is built with the administration, the chiefdoms, neighbourhood committees, the diaspora and the council's partners." /></p>
            <Link className="btn" data-reveal href="/mairie/conseil"><T fr="Le Conseil municipal" en="The municipal council" /><Icon name="arrow" /></Link>
          </div>
          <div className="deco" data-reveal="clip"><figure className="frame fit" style={{ margin: 0, aspectRatio: "3 / 2" }}><Img k="elus" /></figure></div>
        </div>
      </section>
    </>
  );
}
