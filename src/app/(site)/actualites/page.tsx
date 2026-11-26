import Link from "next/link";
import { NewsBlock, PostCard, Empty } from "@/components/mairie";
import { Icon, T } from "@/components/ui";
import { getPosts } from "@/lib/data/content";
import { POST_CATEGORIES, type PostCategory } from "@/lib/data/types";
import { meta } from "@/lib/meta";
import { Hero } from "@/components/Hero";

export const dynamic = "force-dynamic";
export const metadata = meta("Actualités", "News", "Toutes les actualités de la Mairie de Bangangté : Jeudi propre, projets, conseil municipal, action sociale, jeunesse, sport et coopération.");

const PER_PAGE = 12;

export default async function Actualites({ searchParams }: { searchParams: Promise<{ cat?: string; annee?: string; page?: string }> }) {
  const sp = await searchParams;
  const cat = sp.cat && sp.cat in POST_CATEGORIES ? (sp.cat as PostCategory) : undefined;
  const page = Math.max(1, Number(sp.page) || 1);
  const inCat = await getPosts({ category: cat });
  const yearOf = (p: { published_at: string }) => p.published_at.slice(0, 4);
  const yearCounts = new Map<string, number>();
  for (const p of inCat) yearCounts.set(yearOf(p), (yearCounts.get(yearOf(p)) ?? 0) + 1);
  const years = [...yearCounts.keys()].sort((a, b) => b.localeCompare(a));
  const annee = sp.annee && yearCounts.has(sp.annee) ? sp.annee : undefined;
  const all = annee ? inCat.filter((p) => yearOf(p) === annee) : inCat;
  const top = !cat && !annee && page === 1 ? all.slice(0, 4) : [];
  const rest = all.slice(top.length);
  const pages = Math.max(1, Math.ceil(rest.length / PER_PAGE));
  const items = rest.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  // Par défaut, l'en-tête montre les photos réelles des dernières actualités (modifiable dans Réglages).
  const real = (await getPosts()).map((p) => p.cover_url).filter((u): u is string => !!u && !u.startsWith("img:"));
  const q = (o: { cat?: string; annee?: string; page?: number }) => {
    const s = new URLSearchParams({ ...(o.cat ? { cat: o.cat } : {}), ...(o.annee ? { annee: o.annee } : {}), ...(o.page && o.page > 1 ? { page: String(o.page) } : {}) }).toString();
    return `/actualites${s ? `?${s}` : ""}`;
  };
  const href = (p: number) => q({ cat, annee, page: p });

  return (
    <>
      <Hero page="actualites"
        crumb={{ fr: "Actualités", en: "News" }}
        kicker={{ fr: "Informations", en: "News" }}
        title={{ fr: "Actualités", en: "News" }}
        lead={{ fr: "La vie de la commune au fil des semaines et des années : chantiers, conseil municipal, Jeudi propre, jeunesse, solidarité et coopération.", en: "Council life week by week: building works, council sessions, Clean Thursday, youth, solidarity and cooperation." }}
        img={real[0] ?? "img:hdv"}
        inset={real[1] ?? "img:rue"}
        badge={{ big: String(all.length), small: { fr: "articles publiés", en: "articles" } }}
      />
      <section className="sec">
        <div className="wrap">
          <nav className="cat-nav" aria-label="Catégories / Categories" data-reveal>
            <Link href={q({ annee })} aria-current={!cat ? "page" : undefined}><T fr="Toutes" en="All" /></Link>
            {(Object.keys(POST_CATEGORIES) as PostCategory[]).map((k) => (
              <Link key={k} href={q({ cat: k, annee })} aria-current={cat === k ? "page" : undefined}><T fr={POST_CATEGORIES[k].fr} en={POST_CATEGORIES[k].en} /></Link>
            ))}
          </nav>
          {years.length > 1 && (
            <nav className="cat-nav act-years" aria-label="Années / Years" data-reveal>
              <Link href={q({ cat })} aria-current={!annee ? "page" : undefined}><T fr="Toutes les années" en="All years" /></Link>
              {years.map((y) => <Link key={y} href={q({ cat, annee: y })} aria-current={annee === y ? "page" : undefined}>{y} <small>{yearCounts.get(y)}</small></Link>)}
            </nav>
          )}
          {top.length > 0 && <div style={{ marginBottom: "3.5rem" }}><NewsBlock posts={top} /></div>}
          {items.length > 0 ? (
            <div className="posts-grid" data-stagger>{items.map((p) => <PostCard key={p.id} p={p} />)}</div>
          ) : top.length === 0 && <Empty fr="Aucune actualité dans cette catégorie." en="No news in this category." />}
          {pages > 1 && (
            <nav className="pager" aria-label="Pages">
              {page > 1 && <Link className="car-btn prev" href={href(page - 1)} aria-label="Précédent / Previous"><Icon name="arrow" /></Link>}
              <span>{page} / {pages}</span>
              {page < pages && <Link className="car-btn" href={href(page + 1)} aria-label="Suivant / Next"><Icon name="arrow" /></Link>}
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
