import Link from "next/link";
import { B } from "@/components/mairie";
import { Icon, SecHead, T } from "@/components/ui";
import { getPeople, getUnits } from "@/lib/data/content";
import type { Person, Unit } from "@/lib/data/types";
import { meta } from "@/lib/meta";
import { Hero } from "@/components/Hero";

export const dynamic = "force-dynamic";
export const metadata = meta("L'administration communale", "Council administration", "Organigramme de la Mairie de Bangangté : secrétariat général, état civil, affaires sociales, hygiène, urbanisme, emploi et communication.");

function Head({ p }: { p?: Person }) {
  return p ? <span className="org-head"><Icon name="users" />{p.name}</span> : null;
}

export default async function Administration() {
  const [units, people, executive] = await Promise.all([getUnits(), getPeople("administration"), getPeople("executif")]);
  const headOf = (u: Unit) => people.find((p) => p.id === u.head_id) ?? executive.find((p) => p.id === u.head_id);
  const under = (id: string) => units.filter((u) => u.parent_id === id);
  const roots = units.filter((u) => !u.parent_id);
  const sg = roots.find((u) => u.slug === "secretariat-general") ?? roots[0];
  const attached = roots.filter((u) => u.id !== sg?.id);
  const sgKids = sg ? under(sg.id) : [];
  const services = sgKids.filter((u) => under(u.id).length > 0);
  const staff = sgKids.filter((u) => under(u.id).length === 0);
  const mayor = executive[0];

  const Subs = ({ id }: { id: string }) => {
    const kids = under(id);
    if (!kids.length) return null;
    return (
      <ul className="org-subs">
        {kids.map((k) => (
          <li key={k.id}>
            <span><B fr={k.name_fr} en={k.name_en} /></span>
            <Head p={headOf(k)} />
            <Subs id={k.id} />
          </li>
        ))}
      </ul>
    );
  };
  const Unit = ({ u }: { u: Unit }) => (
    <article className="org-unit" id={u.slug} data-reveal>
      <header>
        <div className="pi"><Icon name={u.icon} /></div>
        <div>
          <h3><B fr={u.name_fr} en={u.name_en} /></h3>
          <Head p={headOf(u)} />
        </div>
      </header>
      <Subs id={u.id} />
    </article>
  );

  return (
    <>
      <Hero page="mairie/administration"
        crumb={{ fr: "L'administration", en: "Administration" }}
        kicker={{ fr: "La Mairie", en: "Town hall" }}
        title={{ fr: "Les services", en: "Departments" }}
        lead={{ fr: "Sous l'autorité du Maire, le Secrétariat général coordonne les services qui accueillent les usagers au quotidien.", en: "Under the mayor's authority, the general secretariat coordinates the departments that serve residents every day." }}
        img="hdv"
        landscape
        badge={{ big: String(units.length), small: { fr: "services et bureaux", en: "departments and offices" } }}
      />
      <section className="sec">
        <div className="wrap">
          <SecHead kicker={{ fr: "Organigramme", en: "Org chart" }} title={{ fr: "Comment la mairie est organisée", en: "How the council is organised" }} text={{ fr: "D'après l'organigramme officiel de la commune, adopté par délibération municipale (révision du 19 mai 2014, complétée par une annexe). Les noms des responsables s'affichent à mesure qu'ils sont confirmés.", en: "Based on the council's official org chart, adopted by municipal deliberation (revised on 19 May 2014 and completed by an annex). Names of heads appear as they are confirmed." }} />
          <div className="org org-full">
            <Link className="org-node top" href="/mairie/conseil" data-reveal>
              <div className="pi"><Icon name="layers" /></div>
              <div><strong><T fr="Le Conseil municipal" en="The municipal council" /></strong><small><T fr="41 conseillers, des commissions et des sessions" en="41 councillors, committees and sessions" /></small></div>
            </Link>
            <div className="org-line" />
            <Link className="org-node top" href="/mairie/executif" data-reveal>
              <div className="pi"><Icon name="shield" /></div>
              <div><strong><T fr="Le Maire et ses adjoints" en="The mayor and deputies" /></strong>{mayor && <small>{mayor.name}</small>}</div>
            </Link>
            <div className="org-line" />
            <div className="org-cols">
              {attached.map((u) => <Unit key={u.id} u={u} />)}
            </div>
            <div className="org-line" />
            {sg && (
              <div className="org-node top" id={sg.slug} data-reveal>
                <div className="pi"><Icon name={sg.icon} /></div>
                <div><strong><B fr={sg.name_fr} en={sg.name_en} /></strong><small><B fr={sg.description_fr} en={sg.description_en} /></small><Head p={headOf(sg)} /></div>
              </div>
            )}
            {staff.length > 0 && <div className="org-staff">{staff.map((u) => <Unit key={u.id} u={u} />)}</div>}
            <div className="org-line" />
            <div className="org-cols">
              {services.map((u) => <Unit key={u.id} u={u} />)}
            </div>
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
