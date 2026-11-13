import Link from "next/link";
import { ProjectCard, Empty } from "@/components/mairie";
import { SecHead, T } from "@/components/ui";
import { getProjects } from "@/lib/data/content";
import { PROJECT_STATUS, type ProjectStatus } from "@/lib/data/types";
import { meta } from "@/lib/meta";
import { Hero } from "@/components/Hero";

export const dynamic = "force-dynamic";
export const metadata = meta("Projets et chantiers", "Projects and works", "Les projets de la Commune de Bangangté : écoles, eau potable, routes, ponts, éclairage solaire, marchés et stade municipal.");

export default async function Projets({ searchParams }: { searchParams: Promise<{ etat?: string }> }) {
  const sp = await searchParams;
  const all = await getProjects();
  const st = sp.etat && sp.etat in PROJECT_STATUS ? (sp.etat as ProjectStatus) : undefined;
  const items = st ? all.filter((p) => p.progress === st) : all;
  const count = (s: ProjectStatus) => all.filter((p) => p.progress === s).length;
  return (
    <>
      <Hero page="projets"
        crumb={{ fr: "Projets", en: "Projects" }}
        kicker={{ fr: "La Mairie", en: "Town hall" }}
        title={{ fr: "Projets", en: "Projects" }}
        lead={{ fr: "Écoles, eau potable, routes, ponts, éclairage et équipements marchands : suivez l'avancement des investissements de la commune.", en: "Schools, drinking water, roads, bridges, lighting and markets: follow the progress of council investments." }}
        img="marche2"
        inset="aerial"
        badge={{ big: String(all.length), small: { fr: "projets suivis", en: "projects tracked" } }}
      />
      <section className="sec sec-dark">
        <div className="wrap">
          <SecHead kicker={{ fr: "En un coup d'œil", en: "At a glance" }} title={{ fr: "Où en sont les projets", en: "Where things stand" }} />
          <div className="proj-stats" data-stagger>
            {(Object.keys(PROJECT_STATUS) as ProjectStatus[]).map((s) => <div key={s}><b data-count={count(s)}>{count(s)}</b><span><T fr={PROJECT_STATUS[s].fr} en={PROJECT_STATUS[s].en} /></span></div>)}
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <nav className="cat-nav proj-filters" aria-label="État / Status" data-reveal>
            <Link href="/projets" aria-current={!st ? "page" : undefined}><T fr="Tous" en="All" /></Link>
            {(Object.keys(PROJECT_STATUS) as ProjectStatus[]).map((s) => <Link key={s} href={`/projets?etat=${s}`} aria-current={st === s ? "page" : undefined}><T fr={PROJECT_STATUS[s].fr} en={PROJECT_STATUS[s].en} /></Link>)}
          </nav>
          {items.length ? <div className="g3" data-stagger>{items.map((p) => <ProjectCard key={p.id} p={p} />)}</div> : <Empty fr="Aucun projet dans cette catégorie." en="No projects here." />}
        </div>
      </section>
    </>
  );
}
