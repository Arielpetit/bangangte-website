import { Icon, SecHead, T } from "@/components/ui";
import { meta } from "@/lib/meta";
import { Hero } from "@/components/Hero";

export const metadata = meta("Histoire et distinctions", "History and awards", "La Commune de Bangangté depuis 1954 : maires successifs, prix, certification et partenaires.");

const MAYORS = [
  { y: "2021 –", n: "Éric Aimé NIAT", now: true },
  { y: "2019 – 2021", n: "Jonas KOUAMOUO" },
  { y: "2007 – 2019", n: "Célestine KETCHA COURTÈS", fr: "Devenue ministre de l'Habitat et du Développement urbain", en: "Later Minister of Housing and Urban Development" },
  { y: "2002 – 2007", n: "Marcel NIAT NJIFENJI", fr: "Premier président du Sénat du Cameroun", en: "First President of the Senate of Cameroon" },
  { y: "1996 – 2002", n: "Thomas TCHATCHOUA" },
];

const AWARDS = [
  { y: "2011", fr: "1er prix national FEICOM des meilleures pratiques communales", en: "FEICOM national first prize for best council practice", by: "FEICOM" },
  { y: "2014", fr: "Prix des Nations unies pour le service public, « services rendus aux populations » (projet MODEAB)", en: "United Nations Public Service Award, “delivering services to the public” (MODEAB project)", by: "ONU / UN" },
  { y: "2016", fr: "Certification ISO 26000 « Collectivités »", en: "ISO 26000 “Local authorities” certification", by: "AFNOR" },
];

const PARTNERS = ["FEICOM", "CVUC", "PNDP", "AIMF", "KfW", "Fondation Veolia", "AESN", "SIAAP", "Friedrich Ebert Stiftung", "Berlin-Charlottenburg", "What Water (Luxembourg)", "ONU-Habitat", "HYSACAM"];

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
      <section className="sec">
        <div className="wrap split-2">
          <div>
            <SecHead kicker={{ fr: "Maires successifs", en: "Past mayors" }} title={{ fr: "Ils ont dirigé la commune", en: "They led the council" }} />
            <ul className="timeline" data-stagger>
              {MAYORS.map((m) => <li key={m.n} className={m.now ? "now" : undefined}><b>{m.y}</b><div><strong>{m.n}</strong>{m.fr && <span><T fr={m.fr} en={m.en!} /></span>}</div></li>)}
            </ul>
          </div>
          <div>
            <SecHead kicker={{ fr: "Patrimoine", en: "Heritage" }} title={{ fr: "Le nouvel hôtel de ville", en: "The new town hall" }} />
            <p className="lead" data-reveal><T fr="Inauguré en 2022, l'hôtel de ville R+2 de 1 120 m² abrite le cabinet du Maire, le secrétariat général, l'état civil, la salle des actes et la salle des fêtes." en="Opened in 2022, the two-storey, 1,120 m² town hall houses the mayor's office, the general secretariat, the civil registry, the council chamber and the function hall." /></p>
            <ul className="list-check" data-stagger>
              <li><T fr="Budget de plus d'un milliard de FCFA (1,4 milliard en 2022)" en="A budget of over one billion FCFA (1.4 billion in 2022)" /></li>
              <li><T fr="Marché central (marché A) construit avec le FEICOM" en="Central market (market A) built with FEICOM" /></li>
              <li><T fr="Exercice 2025 clôturé avec un excédent de plus de 66 millions de FCFA" en="2025 financial year closed with a surplus of over 66 million FCFA" /></li>
            </ul>
          </div>
        </div>
      </section>
      <section className="sec sec-dark">
        <div className="wrap">
          <SecHead kicker={{ fr: "Distinctions", en: "Awards" }} title={{ fr: "Une commune primée", en: "An award-winning council" }} />
          <div className="awards" data-stagger>
            {AWARDS.map((a) => <article key={a.y} className="award"><b>{a.y}</b><strong><T fr={a.fr} en={a.en} /></strong><span>{a.by}</span></article>)}
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <SecHead kicker={{ fr: "Coopération", en: "Cooperation" }} title={{ fr: "Nos partenaires", en: "Our partners" }} text={{ fr: "Partenaires techniques et financiers, coopération décentralisée et institutions.", en: "Technical and financial partners, decentralised cooperation and institutions." }} />
          <ul className="partners" data-stagger>{PARTNERS.map((p) => <li key={p}>{p}</li>)}</ul>
          <p className="note" style={{ marginTop: "1.4rem" }}><Icon name="check" className="icon" /> <T fr="Sources : Osidimbea, AIMF, pS-Eau et communications de la commune." en="Sources: Osidimbea, AIMF, pS-Eau and council communications." /></p>
        </div>
      </section>
    </>
  );
}
