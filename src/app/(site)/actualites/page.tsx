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

export default async function Actualites({ searchParams }: { searchParams: Promise<{ cat?: string; page?: string }> }) {
  const sp = await searchParams;
  const cat = sp.cat && sp.cat in POST_CATEGORIES ? (sp.cat as PostCategory) : undefined;
  const page = Math.max(1, Number(sp.page) || 1);
  const all = await getPosts({ category: cat });
  const top = !cat && page === 1 ? all.slice(0, 4) : [];
  const rest = all.slice(top.length);
  const pages = Math.max(1, Math.ceil(rest.length / PER_PAGE));
  const items = rest.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  // Par défaut, l'en-tête montre les photos réelles des dernières actualités (modifiable dans Réglages).
  const real = (await getPosts()).map((p) => p.cover_url).filter((u): u is string => !!u && !u.startsWith("img:"));
  const href = (p: number) => `/actualites?${new URLSearchParams({ ...(cat ? { cat } : {}), ...(p > 1 ? { page: String(p) } : {}) })}`;

  return (
    <>
      <Hero page="actualites"
        crumb={{ fr: "Actualités", en: "News" }}
        kicker={{ fr: "Informations", en: "News" }}
        title={{ fr: "Actualités", en: "News" }}
        lead={{ fr: "La vie de la commune au fil des semaines : chantiers, conseil municipal, Jeudi propre, jeunesse, solidarité et coopération.", en: "Council life week by week: building works, council sessions, Clean Thursday, youth, solidarity and cooperation." }}
        img={real[0] ?? "img:hdv"}
        inset={real[1] ?? "img:marche2"}
        badge={{ big: String(all.length), small: { fr: "articles publiés", en: "articles" } }}
      />
      <section className="sec">
        <div className="wrap">
          <nav className="cat-nav" aria-label="Catégories / Categories" data-reveal>
            <Link href="/actualites" aria-current={!cat ? "page" : undefined}><T fr="Toutes" en="All" /></Link>
            {(Object.keys(POST_CATEGORIES) as PostCategory[]).map((k) => (
              <Link key={k} href={`/actualites?cat=${k}`} aria-current={cat === k ? "page" : undefined}><T fr={POST_CATEGORIES[k].fr} en={POST_CATEGORIES[k].en} /></Link>
            ))}
          </nav>
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
