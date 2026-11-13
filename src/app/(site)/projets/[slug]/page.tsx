import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { B, D, DetailHero, Pic, ProgressChip, ProjectCard, RichText } from "@/components/mairie";
import { PhotoStrip, Share } from "@/components/Share";
import { Icon, T } from "@/components/ui";
import { getProject, getProjects } from "@/lib/data/content";
import { clean } from "@/lib/data/html";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProject((await params).slug);
  if (!p) return { title: "Projet introuvable" };
  return { title: p.title_fr, description: p.summary_fr, other: { "title-fr": `${p.title_fr} | Commune de Bangangté`, "title-en": `${p.title_en || p.title_fr} | Bangangté council` } };
}

export default async function ProjectPage({ params }: Props) {
  const slug = (await params).slug;
  const p = await getProject(slug);
  if (!p) notFound();
  const others = (await getProjects()).filter((x) => x.slug !== slug).slice(0, 3);
  return (
    <>
      <DetailHero crumbs={[{ href: "/projets", fr: "Projets", en: "Projects" }]} kicker={<ProgressChip s={p.progress} />} title={{ fr: p.title_fr, en: p.title_en || p.title_fr }}>
        <p className="ph-meta">
          {p.location && <span><Icon name="pin" />{p.location}</span>}
          {p.started_on && <span><Icon name="calendar" /><T fr="Démarrage :" en="Started:" />&nbsp;<D iso={p.started_on} opts={{ month: "long", year: "numeric" }} /></span>}
          {p.ended_on && <span><Icon name="check" /><T fr="Réception :" en="Handed over:" />&nbsp;<D iso={p.ended_on} /></span>}
        </p>
      </DetailHero>
      <section className="sec">
        <div className="wrap article">
          <article>
            {p.cover_url && <figure className="article-cover" data-reveal="clip"><Pic url={p.cover_url} alt={p.title_fr} w={1280} priority /></figure>}
            <div className="prose"><p><B fr={p.summary_fr} en={p.summary_en} /></p></div>
            {p.body_fr && <><div data-l="fr"><RichText html={clean(p.body_fr)} /></div><div data-l="en"><RichText html={clean(p.body_en || p.body_fr)} /></div></>}
            {p.gallery.length > 0 && <PhotoStrip photos={p.gallery} title={p.title_fr} />}
          </article>
          <aside className="article-aside">
            <div className="aside-card">
              <h4><T fr="Fiche du projet" en="Project facts" /></h4>
              <ul className="facts-list">
                <li><Icon name="layers" /><span><small><T fr="État" en="Status" /></small><strong><ProgressChip s={p.progress} /></strong></span></li>
                {p.location && <li><Icon name="pin" /><span><small><T fr="Lieu" en="Location" /></small><strong>{p.location}</strong></span></li>}
                {p.funding && <li><Icon name="store" /><span><small><T fr="Financement" en="Funding" /></small><strong>{p.funding}</strong></span></li>}
                {p.budget && <li><Icon name="briefcase" /><span><small><T fr="Montant" en="Amount" /></small><strong>{p.budget}</strong></span></li>}
              </ul>
            </div>
            <div className="aside-card"><h4><T fr="Partager" en="Share" /></h4><Share title={p.title_fr} /></div>
            <Link className="btn btn-line" href="/projets"><Icon name="arrow" className="icon flip" /><T fr="Tous les projets" en="All projects" /></Link>
          </aside>
        </div>
      </section>
      {others.length > 0 && (
        <section className="sec sec-alt">
          <div className="wrap">
            <h2 data-reveal><T fr="Autres projets" en="Other projects" /></h2>
            <div className="g3" data-stagger>{others.map((x) => <ProjectCard key={x.id} p={x} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
