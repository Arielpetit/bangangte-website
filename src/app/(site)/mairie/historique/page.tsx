import Link from "next/link";
import { Icon, Img, SecHead, T } from "@/components/ui";
import { meta } from "@/lib/meta";
import { Hero } from "@/components/Hero";

export const metadata = meta("Histoire et distinctions", "History and awards", "Histoire de la Commune de Bangangté depuis 1954 : grandes étapes, maires successifs et leurs adjoints, prix, certification et partenaires.");

type Bi = { fr: string; en: string };
const FR = (fr: string, en: string): Bi => ({ fr, en });

// Source principale : « Histoire de la Commune de Bangangté » et « Les anciens Maires et leurs adjoints », ancien site de la commune (archives 2014-2022).
const STEPS: { y: string; t: Bi; d: Bi }[] = [
  { y: "1660", t: FR("La fondation", "The founding"), d: FR("Deux princes venus de Banka, Ngami et Kameni, s'installent dans la région : c'est le noyau de la future commune. Le nom vient de « Pah ha nteu », « ceux qui refusent la domination ».", "Two princes from Banka, Ngami and Kameni, settle in the area: the core of the future council. The name comes from “Pah ha nteu”, “those who refuse domination”.") },
  { y: "XVIIIe", t: FR("Les villages se multiplient", "Villages spread"), d: FR("Madoum, Batela, Lafeng, Bapoumpa, Mandja, Batoum, Bametcha et Famveu voient le jour. À la fin du XIXe siècle, guerres de conquête et rivalités déplacent plusieurs villages.", "Madoum, Batela, Lafeng, Bapoumpa, Mandja, Batoum, Bametcha and Famveu are founded. In the late 19th century, wars of conquest and rivalries move several villages.") },
  { y: "1900", t: FR("La résistance à la colonisation", "Resisting colonial rule"), d: FR("Les populations résistent à l'arrivée allemande et le paient cher : travaux forcés, villages détruits, chefs emprisonnés. Le chef Toukam de Bangang-Fokam mène une résistance farouche.", "The people resist the German arrival and pay dearly: forced labour, villages destroyed, chiefs imprisoned. Chief Toukam of Bangang-Fokam leads a fierce resistance.") },
  { y: "1915", t: FR("Le territoire s'agrandit", "The territory grows"), d: FR("Batchingou, Bangweu, Poozou, Noumko, Noumtchouet, Ndoukong et Sanki sont rattachés à Bangangté. Dès les années 1920, les missions protestante puis catholique ouvrent les premières écoles de village.", "Batchingou, Bangweu, Poozou, Noumko, Noumtchouet, Ndoukong and Sanki join Bangangté. From the 1920s, Protestant then Catholic missions open the first village schools.") },
  { y: "1954", t: FR("Naissance de la commune", "The council is born"), d: FR("L'arrêté n° 807 du 29 novembre 1954 crée la Commune mixte rurale de Bangangté. Elle couvre alors toute la subdivision, soit l'actuel département du Ndé.", "Order no. 807 of 29 November 1954 creates the Bangangté mixed rural council. It then covers the whole subdivision, today's Ndé division.") },
  { y: "1955", t: FR("Les années de maquis", "The years of unrest"), d: FR("De 1955 à 1965, le maquis touche plusieurs villages. Les habitants se réfugient en ville et ne reviennent qu'après l'indépendance ; Bitchoua se repeuple grâce à la fertilité de ses terres.", "From 1955 to 1965, armed unrest hits several villages. Residents take refuge in town and only return after independence; Bitchoua is resettled thanks to its fertile land.") },
  { y: "1961", t: FR("Chef-lieu du Ndé", "Capital of the Ndé"), d: FR("Le décret du 3 février 1961 fait de la subdivision le département du Ndé, avec Bangangté pour chef-lieu.", "The decree of 3 February 1961 turns the subdivision into the Ndé division, with Bangangté as its capital.") },
  { y: "1980", t: FR("Les villages du « Projet »", "The “Projet” villages"), d: FR("Issus du projet de la route du Noun lancé par l'État en 1975 contre l'exode rural, Projet I (Nkong-Gam) naît en 1980 et Projet II en 1989, avec 40 jeunes pionniers agriculteurs installés chaque année.", "Born of the state's 1975 Noun road project against rural flight, Projet I (Nkong-Gam) is founded in 1980 and Projet II in 1989, with 40 young pioneer farmers settled each year.") },
  { y: "1983", t: FR("La route nationale n° 4", "National road no. 4"), d: FR("Les travaux de l'axe Yaoundé–Bafoussam désenclavent la commune : arrivée du réseau électrique et de l'eau potable en ville, adductions d'eau dans les villages, centres de santé et postes agricoles.", "Work on the Yaoundé–Bafoussam road opens up the council: electricity and piped water reach the town, water networks reach villages, along with health centres and farm extension posts.") },
  { y: "1996", t: FR("Commune d'arrondissement", "Subdivision council"), d: FR("La loi n° 96/06 du 18 janvier 1996 recentre la commune sur l'arrondissement de Bangangté et ses sept groupements.", "Law no. 96/06 of 18 January 1996 refocuses the council on the Bangangté subdivision and its seven groupements.") },
  { y: "2007", t: FR("Rayonnement national et international", "National and international standing"), d: FR("Célestine Ketcha Courtès, première femme maire titulaire, est élue en 2007 et réélue en 2013. La commune remporte le prix FEICOM en 2012 et un prix des Nations unies en 2014. En 2013, l'ancien maire Marcel Niat Njifenji devient le premier président du Sénat.", "Célestine Ketcha Courtès, the first woman to hold the office, is elected in 2007 and re-elected in 2013. The council wins the FEICOM prize in 2012 and a United Nations award in 2014. In 2013, former mayor Marcel Niat Njifenji becomes the first President of the Senate.") },
  { y: "2019", t: FR("Continuité de l'exécutif", "A smooth handover"), d: FR("Nommée ministre de l'Habitat et du Développement urbain le 4 janvier 2019, Célestine Ketcha Courtès est remplacée par le Dr Jonas Kouamouo, élu le 1er mars 2019. Éric Aimé Niat lui succède en mai 2021.", "Appointed Minister of Housing and Urban Development on 4 January 2019, Célestine Ketcha Courtès is succeeded by Dr Jonas Kouamouo, elected on 1 March 2019. Éric Aimé Niat takes over in May 2021.") },
  { y: "2022", t: FR("Le nouvel hôtel de ville", "The new town hall"), d: FR("Lancé en 2017, l'hôtel de ville est inauguré en 2022 : 1 120 m² sur deux étages pour accueillir tous les services.", "Started in 2017, the town hall opens in 2022: 1,120 m² over two storeys to house every department.") },
];

const MAYORS: { y: string; n: string; role?: Bi; deputies: string[]; now?: boolean }[] = [
  { y: "1954 – 1961", n: "Thomas Yatchoua", role: FR("Administrateur municipal", "Municipal administrator"), deputies: [] },
  { y: "1961 – 1978", n: "Paul Nana", deputies: ["Robert Pokam Njiké", "Marc Nzouanké", "Mathieu Wafo Jepang", "Zacharie Wantong Nono"] },
  { y: "1978 – 1980", n: "Émile Ngoumgnia Kamgoum", deputies: ["Marc Nzouanké", "Jacques Nya Nana"] },
  { y: "1980 – 1982", n: "François Yanzeu", deputies: ["Marc Nzouanké", "Jacques Nya Nana"] },
  { y: "1982 – 1983", n: "Jacques Alimoka", deputies: ["Marc Nzouanké", "Jacques Nya Nana"] },
  { y: "1984 – 1987", n: "Thomas Leoue Yetendje", deputies: ["Pierre Ernest Kouajip", "Nji Monluh Seidou Pokam"] },
  { y: "1987 – 1995", n: "Jean-Claude Tzeuton", deputies: ["Jean Ernest Kouadjip", "Nji Monluh Seidou Pokam"] },
  { y: "1995 – 1996", n: "Jean Calvin Djeundam", deputies: ["Jean Ernest Kouadjip", "Nji Monluh Seidou Pokam"] },
  { y: "1996 – 2002", n: "Thomas Tchatchoua", deputies: ["Jonas Kouamouo", "Jean Paul Nganwa", "Luc Ndjonjup"] },
  { y: "2002 – 2007", n: "Marcel Niat Njifenji", role: FR("Puis premier président du Sénat", "Later first President of the Senate"), deputies: ["Jean Paul Njepang", "Françoise Njiki", "Philippe Kouamedjo"] },
  { y: "2007 – 2013", n: "Célestine Ketcha Courtès", deputies: ["Philippe Wandji", "Emmanuel Tchatchoua", "Philippe Kouamedjo", "Magloire Tchatchoua Nya"] },
  { y: "2013 – 2019", n: "Célestine Ketcha Courtès", role: FR("Puis ministre de l'Habitat et du Développement urbain", "Later Minister of Housing and Urban Development"), deputies: ["Dr Jonas Kouamouo", "Robert Nyangang", "Virginie Tamen Fotso", "Éric Aimé Niat"] },
  { y: "2019 – 2020", n: "Dr Jonas Kouamouo", deputies: ["Robert Nyangang", "Virginie Tamen Fotso", "Éric Aimé Niat", "Robenson Nya"] },
  { y: "2020 – 2021", n: "Dr Jonas Kouamouo", deputies: ["Robert Nyangang", "Jean Lambert Tchoumi", "Robenson Nya", "Marie Antoinette Kepnang Kouakam ép. Nana"] },
  { y: "Depuis 2021", n: "Éric Aimé Niat", now: true, deputies: ["Robert Nyangang", "Jean Lambert Tchoumi", "Robenson Nya", "Marie Antoinette Kepnang Kouakam ép. Nana"] },
];

const AWARDS = [
  { y: "2012", fr: "1er prix FEICOM des meilleures pratiques communales de développement local, remis le 16 février 2012", en: "First FEICOM prize for best council practice in local development, awarded on 16 February 2012", by: "FEICOM" },
  { y: "2014", fr: "Prix des Nations unies pour le service public, eau et assainissement (projet MODEAB), remis à Séoul le 26 juin 2014", en: "United Nations Public Service Award, water and sanitation (MODEAB project), presented in Seoul on 26 June 2014", by: "ONU / UN" },
  { y: "2016", fr: "Attestation AFAQ 26000 « Collectivités » : première ville d'Afrique à l'obtenir", en: "AFAQ 26000 “Local authorities” certification: the first town in Africa to earn it", by: "AFNOR" },
];

const PARTNERS: { n: string; logo?: string }[] = [
  { n: "FEICOM", logo: "feicom.jpg" }, { n: "CVUC" }, { n: "PNDP", logo: "pndp.png" }, { n: "AIMF" }, { n: "GIZ", logo: "giz.png" }, { n: "KfW", logo: "kfw.svg" },
  { n: "AFD", logo: "afd.svg" }, { n: "Fondation Veolia" }, { n: "AESN", logo: "aesn.png" }, { n: "SIAAP" }, { n: "Commune de Fouesnant" },
  { n: "Friedrich Ebert Stiftung", logo: "fes.svg" }, { n: "Berlin-Charlottenburg", logo: "berlin.svg" }, { n: "What Water (Luxembourg)" }, { n: "ONU-Habitat" }, { n: "HYSACAM" },
];

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

      <section className="sec sec-dark">
        <div className="wrap">
          <SecHead kicker={{ fr: "Distinctions", en: "Awards" }} title={{ fr: "Une commune primée", en: "An award-winning council" }} />
          <div className="awards" data-stagger>
            {AWARDS.map((a) => <article key={a.y} className="award"><b>{a.y}</b><strong><T fr={a.fr} en={a.en} /></strong><span>{a.by}</span></article>)}
          </div>
        </div>
      </section>

      <section className="sec">
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
