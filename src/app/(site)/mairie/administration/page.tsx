import Link from "next/link";
import { B } from "@/components/mairie";
import { Icon, SecHead, T } from "@/components/ui";
import { getPeople, getUnits } from "@/lib/data/content";
import type { Person, Unit } from "@/lib/data/types";
import { meta } from "@/lib/meta";
import { Hero } from "@/components/Hero";

export const dynamic = "force-dynamic";
export const metadata = meta("L'administration communale", "Council administration", "Organigramme de la Mairie de Bangangté : secrétariat général, état civil, affaires sociales, hygiène, urbanisme, emploi et communication.");

function Node({ u, head, top }: { u: Unit; head?: Person; top?: boolean }) {
  return (
    <div className={`org-node${top ? " top" : ""}`} data-reveal>
      <div className="pi"><Icon name={u.icon} /></div>
      <div>
        <strong><B fr={u.name_fr} en={u.name_en} /></strong>
        <small><B fr={u.description_fr} en={u.description_en} /></small>
        {head && <span className="org-head"><Icon name="users" />{head.name}</span>}
      </div>
    </div>
  );
}

export default async function Administration() {
  const [units, people, executive] = await Promise.all([getUnits(), getPeople("administration"), getPeople("executif")]);
  const headOf = (u: Unit) => people.find((p) => p.id === u.head_id) ?? executive.find((p) => p.id === u.head_id);
  const roots = units.filter((u) => !u.parent_id);
  const sg = roots.find((u) => u.slug === "secretariat-general") ?? roots[0];
  const otherRoots = roots.filter((u) => u.id !== sg?.id);
  const under = (id: string) => units.filter((u) => u.parent_id === id);
  const mayor = executive[0];
  return (
    <>
      <Hero page="mairie/administration"
        crumb={{ fr: "L'administration", en: "Administration" }}
        kicker={{ fr: "La Mairie", en: "Town hall" }}
        title={{ fr: "Les services", en: "Departments" }}
        lead={{ fr: "Sous l'autorité du Maire, le Secrétariat général coordonne les services qui accueillent les usagers au quotidien.", en: "Under the mayor's authority, the general secretariat coordinates the departments that serve residents every day." }}
        img="hdv"
        landscape
        badge={{ big: String(units.length), small: { fr: "services et bureaux", en: "departments" } }}
      />
      <section className="sec">
        <div className="wrap">
          <SecHead kicker={{ fr: "Organigramme", en: "Org chart" }} title={{ fr: "Comment la mairie est organisée", en: "How the council is organised" }} text={{ fr: "Organigramme simplifié, établi à partir des communications officielles de la mairie.", en: "Simplified chart, based on the council's official communications." }} />
          <div className="org">
            {mayor && (
              <div className="org-node top" data-reveal>
                <div className="pi"><Icon name="shield" /></div>
                <div><strong><T fr="Le Maire et l'exécutif" en="The mayor and executive" /></strong><small>{mayor.name}</small></div>
              </div>
            )}
            <div className="org-line" />
            <div className="org-row">{otherRoots.map((u) => <Node key={u.id} u={u} head={headOf(u)} />)}</div>
            <div className="org-line" />
            {sg && <Node u={sg} head={headOf(sg)} top />}
            {sg && (
              <div className="org-children">
                {under(sg.id).map((u) => <Node key={u.id} u={u} head={headOf(u)} />)}
              </div>
            )}
            {otherRoots.flatMap((r) => under(r.id)).length > 0 && (
              <div className="org-children">{otherRoots.flatMap((r) => under(r.id)).map((u) => <Node key={u.id} u={u} head={headOf(u)} />)}</div>
            )}
          </div>
        </div>
      </section>
      <section className="sec sec-alt">
        <div className="wrap split">
          <div>
            <h2 data-reveal><T fr="Besoin d'un service ?" en="Need a department?" /></h2>
            <p className="lead" data-reveal><T fr="Retrouvez chaque démarche avec les pièces à fournir et le service compétent." en="Find each formality with the documents required and the department in charge." /></p>
          </div>
          <div className="btn-row" data-reveal>
            <Link className="btn btn-solid" href="/services"><T fr="Les démarches" en="Formalities" /><Icon name="arrow" /></Link>
            <Link className="btn btn-line" href="/contact"><T fr="Contacter la mairie" en="Contact the council" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
