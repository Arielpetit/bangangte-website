import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { B, D, DetailHero, KindChip, RichText } from "@/components/mairie";
import { Share } from "@/components/Share";
import { Icon, T } from "@/components/ui";
import { getCommunique, getCommuniques } from "@/lib/data/content";
import { plain } from "@/lib/data/format";
import { clean } from "@/lib/data/html";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = await getCommunique((await params).slug);
  if (!c) return { title: "Communiqué introuvable" };
  return { title: c.title_fr, description: plain(c.body_fr, 180), other: { "title-fr": `${c.title_fr} | Commune de Bangangté`, "title-en": `${c.title_en || c.title_fr} | Bangangté council` } };
}

export default async function CommuniquePage({ params }: Props) {
  const slug = (await params).slug;
  const c = await getCommunique(slug);
  if (!c) notFound();
  const others = (await getCommuniques({ limit: 6 })).filter((x) => x.slug !== slug).slice(0, 4);
  const expired = c.expires_at && c.expires_at < new Date().toISOString();
  return (
    <>
      <DetailHero crumbs={[{ href: "/communiques", fr: "Communiqués", en: "Notices" }]} kicker={<KindChip kind={c.kind} urgent={c.urgent && !expired} />} title={{ fr: c.title_fr, en: c.title_en || c.title_fr }}>
        <p className="ph-meta">
          <span><Icon name="calendar" /><T fr="Publié le" en="Published" />&nbsp;<D iso={c.published_at} /></span>
          {c.ref && <span><Icon name="file" />Réf. {c.ref}</span>}
          {c.expires_at && <span><Icon name="clock" /><T fr="Échéance :" en="Deadline:" />&nbsp;<D iso={c.expires_at} /></span>}
        </p>
      </DetailHero>
      <section className="sec">
        <div className="wrap article">
          <article>
            {expired && <p className="notice warn" style={{ marginBottom: "2rem" }}><T fr="L'échéance de ce communiqué est dépassée. Il reste consultable pour information." en="This notice's deadline has passed. It remains online for reference." /></p>}
            <div data-l="fr"><RichText html={clean(c.body_fr)} /></div>
            <div data-l="en"><RichText html={clean(c.body_en || c.body_fr)} /></div>
            {c.pdf_url && (
              <a className="doc-card" href={c.pdf_url} rel="noopener" target="_blank" style={{ textDecoration: "none", marginTop: "1.6rem" }}>
                <span className="pi"><Icon name="file" /></span>
                <span><strong><T fr="Document officiel (PDF)" en="Official document (PDF)" /></strong><small><T fr="Télécharger ou imprimer le communiqué signé" en="Download or print the signed notice" /></small></span>
                <span className="btn btn-gold btn-sm"><Icon name="download" /><T fr="Télécharger" en="Download" /></span>
              </a>
            )}
            <p className="source-note"><Icon name="landmark" /><T fr="Le Maire de la Commune de Bangangté" en="The Mayor of Bangangté" /></p>
          </article>
          <aside className="article-aside">
            <div className="aside-card"><h4><T fr="Partager" en="Share" /></h4><Share title={c.title_fr} /></div>
            {others.length > 0 && (
              <div className="aside-card">
                <h4><T fr="Autres communiqués" en="Other notices" /></h4>
                <ul className="aside-list">{others.map((x) => <li key={x.id}><Link href={`/communiques/${x.slug}`}><small><D iso={x.published_at} /></small><B fr={x.title_fr} en={x.title_en} /></Link></li>)}</ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
