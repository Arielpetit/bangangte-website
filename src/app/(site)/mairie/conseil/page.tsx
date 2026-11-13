import Link from "next/link";
import { B, PersonLine, PostCard } from "@/components/mairie";
import { Icon, SecHead, T } from "@/components/ui";
import { getCommissions, getPeople, getPosts } from "@/lib/data/content";
import { meta } from "@/lib/meta";
import { Hero } from "@/components/Hero";

export const dynamic = "force-dynamic";
export const metadata = meta("Le Conseil municipal", "The municipal council", "Le Conseil municipal de Bangangté : 41 conseillers, commissions, sessions budgétaires et délibérations.");

export default async function Conseil() {
  const [council, commissions, people, sessions] = await Promise.all([getPeople("conseil"), getCommissions(), getPeople(), getPosts({ category: "institutionnel", limit: 3 })]);
  const nameOf = (id: string | null) => people.find((p) => p.id === id)?.name;
  return (
    <>
      <Hero page="mairie/conseil"
        crumb={{ fr: "Le Conseil municipal", en: "The municipal council" }}
        kicker={{ fr: "La Mairie", en: "Town hall" }}
        title={{ fr: "Le Conseil", en: "The council" }}
        lead={{ fr: "Organe délibérant de la commune, le Conseil municipal vote le budget, adopte les comptes et décide des grandes orientations.", en: "The council's deliberative body votes the budget, adopts the accounts and sets the main policies." }}
        img="defile"
        badge={{ big: "41", small: { fr: "conseillers municipaux", en: "councillors" } }}
      />
      <section className="sec">
        <div className="wrap split-2">
          <div>
            <SecHead kicker={{ fr: "Ses missions", en: "Its role" }} title={{ fr: "Ce que décide le Conseil", en: "What the council decides" }} />
            <ul className="list-check" data-stagger>
              <li><T fr="Vote du budget communal (le budget 2026 a été adopté à l'unanimité le 18 décembre 2025)" en="Votes the council budget (the 2026 budget was adopted unanimously on 18 December 2025)" /></li>
              <li><T fr="Examen du compte administratif du Maire et du compte de gestion du receveur municipal" en="Reviews the mayor's annual accounts and the treasurer's accounts" /></li>
              <li><T fr="Élection du Maire et de ses adjoints" en="Elects the mayor and deputies" /></li>
              <li><T fr="Délibérations sur les tarifs, le patrimoine, les marchés et les partenariats" en="Decides on fees, property, markets and partnerships" /></li>
              <li><T fr="Création des comités de village et de quartier" en="Creates village and neighbourhood committees" /></li>
            </ul>
          </div>
          <div>
            <SecHead kicker={{ fr: "Commissions", en: "Committees" }} title={{ fr: "Les commissions", en: "The committees" }} />
            <div className="commissions" data-stagger>
              {commissions.map((c) => (
                <article key={c.id} className="panel">
                  <h3><B fr={c.name_fr} en={c.name_en} /></h3>
                  <p><B fr={c.description_fr} en={c.description_en} /></p>
                  {c.chair_id && nameOf(c.chair_id) && <p className="org-head"><Icon name="users" /><T fr="Président" en="Chair" /> : {nameOf(c.chair_id)}</p>}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="sec sec-alt">
        <div className="wrap">
          <SecHead kicker={{ fr: "Conseillers municipaux", en: "Councillors" }} title={{ fr: "Les élus du Conseil", en: "Council members" }} text={{ fr: "Liste en cours de compléments avec la mairie.", en: "List being completed with the council." }} />
          <ul className="plist" data-stagger>{council.map((p) => <PersonLine key={p.id} p={p} />)}</ul>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <SecHead kicker={{ fr: "Sessions", en: "Sessions" }} title={{ fr: "Les dernières décisions", en: "Latest decisions" }} aside={<Link className="link-arrow" data-reveal href="/communiques?type=deliberation"><T fr="Délibérations et convocations" en="Decisions and notices" /><Icon name="arrow" /></Link>} />
          <div className="posts-grid" data-stagger>{sessions.map((p) => <PostCard key={p.id} p={p} />)}</div>
        </div>
      </section>
    </>
  );
}
