import Link from "next/link";
import { Icon, Img, SecHead, T } from "@/components/ui";
import { meta } from "@/lib/meta";
import { Hero } from "@/components/Hero";
import { AWARDS, MAYORS, PARTNERS, STEPS } from "@/lib/history";
import type { Bi } from "@/lib/nav";

export const metadata = meta("Histoire et distinctions", "History and awards", "Histoire de la Commune de Bangangté depuis 1954 : grandes étapes, maires successifs et leurs adjoints, prix, certification et partenaires.");


export default function Historique() {
  return (
    <>
      <Hero page="mairie/historique"
        crumb={{ fr: "Histoire et distinctions", en: "History and awards" }}
        kicker={{ fr: "La Mairie", en: "Town hall" }}
        title={{ fr: "Depuis 1954", en: "Since 1954" }}
        lead={{ fr: "Créée par l'arrêté n° 807 du 29 novembre 1954, la commune couvrait alors tout l'actuel département du Ndé. Elle administre aujourd'hui sept groupements.", en: "Created by order no. 807 of 29 November 1954, the council first covered the whole of today's Ndé division. It now runs seven groupements." }}
        img="hdv"
        landscape
        badge={{ big: "1954", small: { fr: "Création de la commune", en: "Council founded" } }}
        facts={[{ fr: "Bangangté", en: "Bangangté" }, { fr: "Bangoulap", en: "Bangoulap" }, { fr: "Bangoua", en: "Bangoua" }, { fr: "Bamena", en: "Bamena" }, { fr: "Batchingou", en: "Batchingou" }, { fr: "Bangang-Fokam", en: "Bangang-Fokam" }, { fr: "Bahouoc", en: "Bahouoc" }]}
      />

      <section className="sec" id="histoire">
        <div className="wrap">
          <SecHead kicker={{ fr: "L'histoire de la commune", en: "The council's story" }} title={{ fr: "De Pah ha nteu à la commune d'aujourd'hui", en: "From Pah ha nteu to today's council" }} text={{ fr: "Trois siècles et demi de peuplement, de résistance et de construction, jusqu'à la commune moderne.", en: "Three and a half centuries of settlement, resistance and building, up to the modern council." }} aside={<Link className="link-arrow" data-reveal href="/histoire"><T fr="Le royaume et ses rois" en="The kingdom and its kings" /><Icon name="arrow" /></Link>} />
          <ol className="steps" data-stagger>
            {STEPS.map((s) => <li key={s.y}><b>{s.y}</b><div><strong><T fr={s.t.fr} en={s.t.en} /></strong><p><T fr={s.d.fr} en={s.d.en} /></p></div></li>)}
          </ol>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <figure className="wide-photo" data-reveal>
            <Img k="elus" />
            <figcaption><T fr="Élus municipaux, autorités administratives et chefs traditionnels de la commune." en="Councillors, administrative authorities and traditional chiefs of the council." /></figcaption>
          </figure>
        </div>
      </section>

      <section className="sec" id="maires">
        <div className="wrap">
          <SecHead kicker={{ fr: "Maires successifs", en: "Past mayors" }} title={{ fr: "Ils ont dirigé la commune", en: "They led the council" }} text={{ fr: "Depuis 1954, un administrateur municipal puis douze maires. Paul Nana détient le plus long mandat : près de dix-sept ans.", en: "Since 1954, one municipal administrator then twelve mayors. Paul Nana served longest: nearly seventeen years." }} />
          <div className="mayors" data-stagger>
            {MAYORS.map((m) => (
              <article key={m.y} className={`mayor${m.now ? " now" : ""}`}>
                <b>{m.y}</b>
                <div>
                  <strong>{m.n}</strong>
                  {m.role && <em><T fr={m.role.fr} en={m.role.en} /></em>}
                  {m.now && <span className="mayor-now"><T fr="En fonction" en="In office" /></span>}
                </div>
                {m.deputies.length > 0 && <p><span><T fr="Adjoints" en="Deputies" /></span>{m.deputies.join(" · ")}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-dark" id="distinctions">
        <div className="wrap">
          <SecHead kicker={{ fr: "Distinctions", en: "Awards" }} title={{ fr: "Une commune primée", en: "An award-winning council" }} />
          <div className="awards" data-stagger>
            {AWARDS.map((a) => <article key={a.y} className="award"><b>{a.y}</b><strong><T fr={a.fr} en={a.en} /></strong><span>{a.by}</span></article>)}
          </div>
        </div>
      </section>

      <section className="sec" id="partenaires">
        <div className="wrap split-2">
          <div>
            <SecHead kicker={{ fr: "Patrimoine", en: "Heritage" }} title={{ fr: "Le nouvel hôtel de ville", en: "The new town hall" }} />
            <p className="lead" data-reveal><T fr="Inauguré en 2022, l'hôtel de ville R+2 de 1 120 m² abrite le cabinet du Maire, le secrétariat général, l'état civil, la salle des actes et la salle des fêtes." en="Opened in 2022, the two-storey, 1,120 m² town hall houses the mayor's office, the general secretariat, the civil registry, the council chamber and the function hall." /></p>
            <ul className="list-check" data-stagger>
              <li><T fr="Budget de plus d'un milliard de FCFA (1,4 milliard en 2022)" en="A budget of over one billion FCFA (1.4 billion in 2022)" /></li>
              <li><T fr="Marché central (marché A) construit avec le FEICOM" en="Central market (market A) built with FEICOM" /></li>
              <li><T fr="Exercice 2025 clôturé avec un excédent de plus de 66 millions de FCFA" en="2025 financial year closed with a surplus of over 66 million FCFA" /></li>
            </ul>
          </div>
          <div>
            <SecHead kicker={{ fr: "Coopération", en: "Cooperation" }} title={{ fr: "Nos partenaires", en: "Our partners" }} text={{ fr: "Partenaires techniques et financiers, coopération décentralisée et institutions.", en: "Technical and financial partners, decentralised cooperation and institutions." }} />
            <ul className="partners" data-stagger>
              {PARTNERS.map((p) => p.logo
                ? <li key={p.n} className="has-logo" title={p.n}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={`/images/partners/${p.logo}`} alt={p.n} loading="lazy" /><span>{p.n}</span></li>
                : <li key={p.n}>{p.n}</li>)}
            </ul>
          </div>
        </div>
        <div className="wrap">
          <p className="note" style={{ marginTop: "2rem" }}><Icon name="check" className="icon" /> <T fr="Sources : archives du site de la Commune de Bangangté (2014-2022), Osidimbea, AIMF, pS-Eau et communications de la commune." en="Sources: Bangangté council website archives (2014-2022), Osidimbea, AIMF, pS-Eau and council communications." /></p>
        </div>
      </section>
    </>
  );
}
