import Link from "next/link";
import { Icon, Img, PageHero, SecHead, T } from "@/components/ui";
import { IMG } from "@/lib/images";
import { meta } from "@/lib/meta";

export const metadata = meta("La ville", "The town", "Hôtel de ville, quartiers, propreté, éducation, santé, sport, marchés et grands projets de Bangangté, chef-lieu du Ndé.");

const QUARTIERS = ["Batela", "Koptcha", "Quartier 1", "Quartier 3", "Quartier 7", "Madja", "Metcha", "Toukop 1", "Toukop 2", "Toukop 3", "Nenga 1", "Nenga 2", "Banekouane 1", "Banekouane 2", "Banekane", "Netam", "Mago'o", "Mango'o Nitsit", "Manko'o", "Sangnam", "Sangnam 2", "Feutom", "Feutap", "Feutcheup", "Nyamjeu", "Ngakoun", "Ndakou", "Tchouneum", "Babou I", "Babou II", "Babou III", "Baboussah", "Bantoum 2", "Bantoum 3", "Sifeu", "Ndadoun", "Feugnoun 2", "Fatgo", "Maham", "Bichoua", "Tanleum", "Yawoum", "Pedond", "Nessah", "Neukeum", "Zuitko", "Chouagoua", "Sanki", "Veubath", "Toudadun", "Noumga", "Bororos"];

const SERVICES = [
  { img: "udm5", t: { fr: "Éducation", en: "Education" }, d: { fr: "L'Université des Montagnes, fondée en 2000, forme aux métiers de la santé et des technologies. Écoles, lycées et un centre de formation en agroécologie complètent l'offre.", en: "The Université des Montagnes, founded in 2000, trains students in health and technology. Schools, high schools and an agroecology training centre complete the picture." } },
  { img: "udm1", t: { fr: "Santé", en: "Health" }, d: { fr: "L'hôpital de district, la Clinique universitaire des Montagnes et le nouveau centre de santé intégré de Banekane.", en: "The district hospital, the Université des Montagnes teaching clinic and the new Banekane health centre." } },
  { img: "stade", t: { fr: "Sport", en: "Sport" }, d: { fr: "Fief de la Panthère du Ndé, triple vainqueur de la Coupe du Cameroun (1988, 2009, 2025) et du Trophée des champions 2026. Basket, volley, handball et rugby complètent l'offre.", en: "Home of Panthère du Ndé, three-time Cameroon Cup winners (1988, 2009, 2025) and 2026 Champions Trophy holders. Basketball, volleyball, handball and rugby clubs too." } },
  { img: "marche2", t: { fr: "Commerce", en: "Trade" }, d: { fr: "Grand marché le samedi et petit marché le mercredi aux marchés A et B, et un marché central de 304 boutiques avec gare routière.", en: "The big market on Saturdays and the small market on Wednesdays at Markets A and B, plus a 304-shop central market with a bus station." } },
] as const;

const PROJECTS = [
  { icon: "store", t: { fr: "Marché central", en: "Central market" }, d: { fr: "304 boutiques, stockage, gare routière et parkings. Plus de 910 millions FCFA financés par le FEICOM.", en: "304 shops, storage, a bus station and parking. Over 910 million FCFA funded by FEICOM." } },
  { icon: "build", t: { fr: "Voiries et aires de jeux", en: "Roads and playgrounds" }, d: { fr: "Aires de jeux, accès aux écoles, drainage et routes, inspectés par le ministre de l'Habitat en octobre 2026.", en: "Playgrounds, school access, drainage and roads, inspected by the Housing Minister in October 2026." } },
  { icon: "ball", t: { fr: "Stade municipal", en: "Municipal stadium" }, d: { fr: "Réhabilitation par phases, financée par le budget d'investissement public de l'État.", en: "Refurbishment in phases, funded by the State's public investment budget." } },
  { icon: "bolt", t: { fr: "Mini-centrale hydroélectrique", en: "Mini hydro plant" }, d: { fr: "Un projet de 5 MW, validé au niveau national, pour renforcer l'accès à l'électricité.", en: "A 5 MW project, approved nationally, to improve access to electricity." } },
  { icon: "drop", t: { fr: "Assainissement à Noumga", en: "Sanitation at Noumga" }, d: { fr: "Un centre de traitement des boues de vidange pour améliorer l'hygiène de la ville.", en: "A sludge treatment centre to improve sanitation in town." } },
  { icon: "leaf", t: { fr: "Agroécologie", en: "Agroecology" }, d: { fr: "Un centre de formation et un collectif de producteurs bio, avec un premier marché bio en août 2026.", en: "A training centre and an organic growers' group, with a first organic market in August 2026." } },
];

export default function Ville() {
  return (
    <>
      <PageHero
        crumb={{ fr: "La ville", en: "The town" }}
        kicker={{ fr: "Chef-lieu du Ndé depuis 1961", en: "Capital of the Ndé since 1961" }}
        title={{ fr: "La ville", en: "The town" }}
        lead={{ fr: "Administrative, universitaire et commerçante, Bangangté est connue dans tout le Cameroun pour sa propreté et la vitalité de ses quartiers.", en: "An administrative, university and market town, Bangangté is known across Cameroon for its cleanliness and lively neighbourhoods." }}
        img="marche2"
        inset="hdv"
        badge={{ big: "1961", small: { fr: "Chef-lieu du Ndé", en: "Ndé capital" } }}
        facts={[{ fr: "56 villages et quartiers", en: "56 villages and quarters" }, { fr: "Université des Montagnes", en: "Université des Montagnes" }, { fr: "Marché central de 304 boutiques", en: "304-shop central market" }]}
      />

      <section className="sec">
        <div className="wrap split">
          <div>
            <p className="kicker" data-reveal><T fr="En quelques mots" en="At a glance" /></p>
            <h2 data-reveal><T fr="Au cœur des hauts plateaux bamiléké" en="In the heart of the Bamiléké highlands" /></h2>
            <p className="lead" data-reveal><T fr="Bangangté se trouve dans la région de l'Ouest, à environ 1 400 mètres d'altitude. Chef-lieu du département du Ndé, elle est le centre des arrondissements de Bangangté, Bassamba, Bazou et Tonga." en="Bangangté lies in the West Region, about 1,400 metres above sea level. As capital of the Ndé division, it is the hub for the Bangangté, Bassamba, Bazou and Tonga subdivisions." /></p>
            <p data-reveal><T fr="Ses habitants parlent le medumba, langue bamiléké partagée avec Bakong, Bangoulap, Bahouoc, Bagnoun et Tonga. L'arrondissement compte sept chefferies traditionnelles, dont la Chefferie supérieure Bangangté." en="Its people speak Medumba, a Bamiléké language shared with Bakong, Bangoulap, Bahouoc, Bagnoun and Tonga. The subdivision has seven traditional chiefdoms, including the Bangangté paramount chiefdom." /></p>
            <ul className="list-check" data-stagger>
              <li><T fr="Poste administratif créé en 1930, commune en 1954" en="Administrative post created in 1930, council in 1954" /></li>
              <li><T fr="Chef-lieu du département du Ndé depuis 1961" en="Capital of the Ndé division since 1961" /></li>
              <li><T fr="63 595 habitants dans la commune au recensement de 2005" en="63,595 people in the council area at the 2005 census" /></li>
              <li><T fr="Budget communal de plus d'un milliard de FCFA en 2024" en="Council budget of over one billion FCFA in 2024" /></li>
            </ul>
          </div>
          <div className="mosaic" data-reveal="clip">
            <figure><Img k="stade" /><figcaption><T fr={IMG.stade.fr} en={IMG.stade.en} /></figcaption></figure>
            <figure><Img k="udm5" w={500} /><figcaption><T fr={IMG.udm5.fr} en={IMG.udm5.en} /></figcaption></figure>
            <figure><Img k="defile" w={500} /><figcaption><T fr={IMG.defile.fr} en={IMG.defile.en} /></figcaption></figure>
          </div>
        </div>
      </section>

      <section className="sec sec-alt" id="hotel-de-ville">
        <div className="wrap split rev">
          <div>
            <p className="kicker" data-reveal><T fr="Hôtel de ville" en="Town hall" /></p>
            <h2 data-reveal><T fr="Un hôtel de ville neuf depuis 2022" en="A new town hall since 2022" /></h2>
            <p className="lead" data-reveal><T fr="Inauguré en février 2022 par le ministre de la Décentralisation, Georges Elanga Obam, le nouvel hôtel de ville a été construit en trois phases grâce au FEICOM." en="Opened in February 2022 by the Minister of Decentralisation, Georges Elanga Obam, the new town hall was built in three phases with FEICOM funding." /></p>
            <div className="stats" data-stagger>
              <div className="stat"><b>R+2</b><span><T fr="deux étages" en="two upper floors" /></span></div>
              <div className="stat"><b>1 120 m²</b><span><T fr="de surface bâtie" en="of floor area" /></span></div>
            </div>
            <p className="muted" data-reveal style={{ marginTop: "1.4rem" }}><T fr="Un chantier porté sur plusieurs mandats et inauguré par le maire Éric Niat. La radio municipale 92.7 FM y a ses studios." en="A project carried across several terms of office and opened by mayor Éric Niat. The 92.7 FM municipal radio has its studios there." /></p>
            <Link className="btn btn-solid" data-reveal href="/mairie"><T fr="Services de la mairie" en="Town hall services" /><Icon name="arrow" /></Link>
          </div>
          <div className="deco" data-reveal="clip"><figure className="frame fit" style={{ margin: 0 }}><Img k="hdv" /></figure></div>
        </div>
      </section>

      <section className="sec" id="quartiers">
        <div className="wrap">
          <SecHead kicker={{ fr: "Quartiers et villages", en: "Neighbourhoods and villages" }} title={{ fr: "56 quartiers, une seule ville", en: "56 neighbourhoods, one town" }} text={{ fr: "Chaque quartier a son chef et son histoire. Koptcha, le quartier 4, est considéré comme le quartier fondateur de la ville.", en: "Each neighbourhood has its own chief and history. Koptcha, the 4th quarter, is considered the town's founding neighbourhood." }} />
          <ul className="chips" data-reveal>{QUARTIERS.map((q) => <li key={q}>{q}</li>)}</ul>
        </div>
      </section>

      <div className="band" aria-hidden="true" />
      <section className="sec sec-dark" id="propre">
        <div className="wrap split">
          <div>
            <p className="kicker" data-reveal><T fr="Ville propre" en="Clean town" /></p>
            <h2 data-reveal><T fr="La propreté, une affaire collective" en="Cleanliness is everyone's business" /></h2>
            <p className="lead" data-reveal><T fr="Plusieurs fois désignée ville la plus propre de l'Ouest et du Cameroun, Bangangté a reçu le premier prix FEICOM des meilleures pratiques communales et un prix des Nations unies pour le service public." en="Named the cleanest town in the West Region and in Cameroon several times, Bangangté won FEICOM's first prize for best council practice and a United Nations public service award." /></p>
          </div>
          <ul className="list-check" data-stagger>
            <li><T fr="Le jeudi, journée de propreté générale : chacun nettoie rues et caniveaux" en="Thursday is general clean-up day: everyone cleans streets and gutters" /></li>
            <li><T fr="Le concours du quartier le plus propre, organisé par la mairie" en="The cleanest-neighbourhood contest, run by the town hall" /></li>
            <li><T fr="Les chefs de quartier et les agents municipaux veillent au quotidien" en="Neighbourhood chiefs and council staff keep watch every day" /></li>
            <li><T fr="Des arbres plantés le long de la route principale, dans les écoles et les quartiers" en="Trees planted along the main road, in schools and neighbourhoods" /></li>
          </ul>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead kicker={{ fr: "Vivre à Bangangté", en: "Living in Bangangté" }} title={{ fr: "Les services qui font le centre du Ndé", en: "The services that make it the heart of the Ndé" }} />
          <div className="g2" data-stagger style={{ gap: "1.6rem" }}>
            {SERVICES.map((s) => (
              <article key={s.img} className="feature-card">
                <div className="fc-img"><Img k={s.img} /></div>
                <div className="fc-body"><h3><T fr={s.t.fr} en={s.t.en} /></h3><p><T fr={s.d.fr} en={s.d.en} /></p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <SecHead kicker={{ fr: "Grands projets", en: "Major projects" }} title={{ fr: "La ville en chantier", en: "A town on the move" }} aside={<Link className="link-arrow" data-reveal href="/mairie#investir"><T fr="Investir à Bangangté" en="Invest in Bangangté" /><Icon name="arrow" /></Link>} />
          <ul className="svc" data-stagger>
            {PROJECTS.map((p) => (
              <li key={p.icon}><span className="pi"><Icon name={p.icon} /></span><div><h3><T fr={p.t.fr} en={p.t.en} /></h3><p><T fr={p.d.fr} en={p.d.en} /></p></div></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
