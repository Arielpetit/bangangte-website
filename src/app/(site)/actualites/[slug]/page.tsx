import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { B, D, DetailHero, Pic, RichText } from "@/components/mairie";
import { PhotoStrip, Share } from "@/components/Share";
import { Icon, T } from "@/components/ui";
import { getPost, getPosts } from "@/lib/data/content";
import { mediaUrl, plain } from "@/lib/data/format";
import { clean } from "@/lib/data/html";
import { POST_CATEGORIES } from "@/lib/data/types";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getPost((await params).slug);
  if (!p) return { title: "Actualité introuvable" };
  const desc = p.excerpt_fr || plain(p.body_fr, 180);
  const img = mediaUrl(p.cover_url, 1280);
  return {
    title: p.title_fr,
    description: desc,
    openGraph: { title: p.title_fr, description: desc, type: "article", publishedTime: p.published_at, images: img ? [img] : undefined },
    other: { "title-fr": `${p.title_fr} | Commune de Bangangté`, "title-en": `${p.title_en || p.title_fr} | Bangangté council` },
  };
}

export default async function Article({ params }: Props) {
  const slug = (await params).slug;
  const p = await getPost(slug);
  if (!p) notFound();
  const related = (await getPosts({ limit: 8 })).filter((x) => x.slug !== slug && (x.category === p.category)).slice(0, 4);
  const latest = related.length ? related : (await getPosts({ limit: 5 })).filter((x) => x.slug !== slug).slice(0, 4);
  const cat = POST_CATEGORIES[p.category] ?? POST_CATEGORIES.vie_communale;
  const bodyFr = clean(p.body_fr);
  const bodyEn = p.body_en ? clean(p.body_en) : null;

  return (
    <>
      <DetailHero
        crumbs={[{ href: "/actualites", fr: "Actualités", en: "News" }, { href: `/actualites?cat=${p.category}`, fr: cat.fr, en: cat.en }]}
        kicker={<span className="kchip"><T fr={cat.fr} en={cat.en} /></span>}
        title={{ fr: p.title_fr, en: p.title_en || p.title_fr }}
      >
        <p className="ph-meta"><span><Icon name="calendar" /><D iso={p.published_at} opts={{ weekday: "long", day: "numeric", month: "long", year: "numeric" }} /></span><span><Icon name="pin" />Bangangté</span></p>
      </DetailHero>
      <section className="sec">
        <div className="wrap article">
          <article>
            {p.cover_url && <figure className="article-cover" data-reveal="clip"><Pic url={p.cover_url} alt={p.title_fr} w={1280} priority /></figure>}
            <div data-l="fr"><RichText html={bodyFr} /></div>
            <div data-l="en">
              {!bodyEn && <p className="notice"><T fr="" en="This article is only available in French." /></p>}
              <RichText html={bodyEn ?? bodyFr} />
            </div>
            {p.gallery.length > 0 && <PhotoStrip photos={p.gallery} title={p.title_fr} />}
            <p className="source-note"><Icon name="news" /><T fr="© CELCOM, Commune de Bangangté" en="© CELCOM, Bangangté council" />{p.source_url && <> · <a href={p.source_url} rel="noopener" target="_blank"><T fr="Publication d'origine" en="Original post" /></a></>}</p>
          </article>
          <aside className="article-aside">
            <div className="aside-card">
              <h4><T fr="Partager" en="Share" /></h4>
              <Share title={p.title_fr} />
            </div>
            {latest.length > 0 && (
              <div className="aside-card">
                <h4><T fr="À lire aussi" en="Read next" /></h4>
                <ul className="aside-list">
                  {latest.map((x) => <li key={x.id}><Link href={`/actualites/${x.slug}`}><small><D iso={x.published_at} /></small><B fr={x.title_fr} en={x.title_en} /></Link></li>)}
                </ul>
              </div>
            )}
            <Link className="btn btn-line" href="/actualites"><Icon name="arrow" className="icon flip" /><T fr="Toutes les actualités" en="All news" /></Link>
          </aside>
        </div>
      </section>
    </>
  );
}
