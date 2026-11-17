import Link from "next/link";
import { Icon, Img, SecHead, T } from "@/components/ui";
import { meta } from "@/lib/meta";
import { Hero } from "@/components/Hero";

export const metadata = meta("Séjourner", "Plan your stay", "Hébergements, restaurants, accès, déplacements et conseils pratiques pour visiter Bangangté.");

const STAYS: { t: string | { fr: string; en: string }; d: { fr: string; en: string }; c?: string }[] = [
  { t: "Farhyda & Frères Hôtels", d: { fr: "Hôtel quatre étoiles : piscine, deux restaurants, bars, jardin, Wi-Fi et parking. À environ 2 km du centre.", en: "Four-star hotel: pool, two restaurants, bars, garden, Wi-Fi and parking. About 2 km from the centre." }, c: "B.P. 79, Bangangté" },
  { t: "Villa Boutanga", d: { fr: "Maison d'hôtes de la Fondation Gacha à Bangoulap, à 7 km et 1 500 m d'altitude. Cuisine du jardin, centre culturel, cases patrimoniales et circuits de découverte. Note 4,2/5 sur Petit Futé.", en: "The Gacha Foundation's guesthouse at Bangoulap, 7 km away at 1,500 m. Garden-fresh food, a cultural centre, heritage houses and discovery trails. Rated 4.2/5 on Petit Futé." }, c: "+237 695 856 095" },
  { t: "Hôtel Cristal Foua Ndingon", d: { fr: "Hôtel bien situé en ville, chambres simples et bien équipées, bar-restaurant et parking surveillé.", en: "Well-located hotel in town with simple, well-equipped rooms, a bar-restaurant and guarded parking." }, c: "+237 233 48 91 16" },
  { t: "Penko Hôtel Touristique", d: { fr: "Hôtel touristique en ville.", en: "Tourist hotel in town." }, c: "B.P. 4383, +237 233 48 46 77" },
  { t: "City Guest House Hotel", d: { fr: "Réception 24 h/24, restaurant, petit-déjeuner, terrasse et blanchisserie.", en: "24-hour reception, restaurant, breakfast, terrace and laundry." } },
  { t: "Mbatkam Palace", d: { fr: "Hôtel en ville, proposé sur les plateformes de réservation.", en: "Hotel in town, listed on booking platforms." } },
  { t: "La Vallée de Bana", d: { fr: "Complexe hôtelier et touristique à Bana, dans le Haut-Nkam voisin, au pied du col de Bana.", en: "Hotel and leisure resort at Bana, in neighbouring Haut-Nkam, below the Bana pass." }, c: "+237 694 23 39 43" },
  { t: { fr: "Appartements meublés", en: "Furnished flats" }, d: { fr: "Location courte durée, idéale pour les familles et la diaspora.", en: "Short-term rentals, ideal for families and the diaspora." } },
];

const FAQ = [
  { q: { fr: "Quelle est la meilleure période pour venir ?", en: "When is the best time to visit?" }, a: { fr: "La saison sèche, de novembre à février, rend routes et sentiers plus praticables. Fin novembre et décembre sont aussi les mois des grands rassemblements comme le COMENGA.", en: "The dry season, November to February, makes roads and trails easier. Late November and December are also the months of big gatherings such as COMENGA." } },
  { q: { fr: "Comment payer sur place ?", en: "How do I pay?" }, a: { fr: "La monnaie est le franc CFA (FCFA). Prévoyez des espèces pour les marchés, les moto-taxis et les villages. Le mobile money est très répandu.", en: "The currency is the CFA franc (FCFA). Carry cash for markets, motorbike taxis and villages. Mobile money is widely used." } },
  { q: { fr: "Où se soigner en cas de besoin ?", en: "Where can I get medical care?" }, a: { fr: "L'hôpital de district et la Clinique universitaire des Montagnes accueillent les patients. Des pharmacies sont présentes en centre-ville.", en: "The district hospital and the Université des Montagnes clinic take patients. There are pharmacies in the town centre." } },
  { q: { fr: "Peut-on visiter les chefferies et les sites sacrés ?", en: "Can I visit chiefdoms and sacred sites?" }, a: { fr: "Oui, sur demande. Renseignez-vous à l'avance, respectez les consignes des notables et demandez avant de photographier. Certains lieux sacrés ne sont pas ouverts au public.", en: "Yes, on request. Ask ahead, follow the notables' guidance and ask before taking photos. Some sacred places are closed to the public." } },
  { q: { fr: "Quelle tenue prévoir ?", en: "What should I wear?" }, a: { fr: "Les matinées et les soirées sont fraîches en altitude : prévoyez une veste légère, de bonnes chaussures et un imperméable en saison des pluies.", en: "Mornings and evenings are cool at altitude: bring a light jacket, good shoes and a raincoat in the rainy season." } },
  { q: { fr: "La région est-elle sûre ?", en: "Is the area safe?" }, a: { fr: "Consultez les recommandations officielles de votre pays et les autorités locales avant de voyager, et informez votre hébergement de vos déplacements.", en: "Check your country's official travel advice and local authorities before travelling, and tell your accommodation where you are going." } },
];

export default function Sejourner() {
  return (
    <>
      <Hero page="sejourner"
        crumb={{ fr: "Séjourner", en: "Plan your stay" }}
        kicker={{ fr: "Bienvenue chez les Bangangté", en: "Welcome to Bangangté" }}
        title={{ fr: "Séjourner", en: "Your stay" }}
        lead={{ fr: "Où dormir, où manger, comment venir et comment vous déplacer.", en: "Where to sleep, where to eat, how to get here and how to get around." }}
        img="ouest"
        inset="taro"
        facts={[{ fr: "Saison sèche : nov. à fév.", en: "Dry season: Nov to Feb" }, { fr: "Franc CFA", en: "CFA franc" }, { fr: "Français et medumba", en: "French and Medumba" }]}
      />

      <section className="sec">
        <div className="wrap">
          <SecHead kicker={{ fr: "Hébergement", en: "Accommodation" }} title={{ fr: "Où dormir", en: "Where to stay" }} aside={<Link className="link-arrow" data-reveal href="/contact"><T fr="Référencer votre établissement" en="List your business" /><Icon name="arrow" /></Link>} />
          <ul className="svc" data-stagger>
            {STAYS.map((s, i) => (
              <li key={i}><span className="pi"><Icon name="bed" /></span><div><h3>{typeof s.t === "string" ? s.t : <T fr={s.t.fr} en={s.t.en} />}</h3><p><T fr={s.d.fr} en={s.d.en} /></p>{s.c && <p className="site-info"><Icon name="phone" />{s.c}</p>}</div></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap split">
          <div>
            <p className="kicker" data-reveal><T fr="Restauration" en="Food" /></p>
            <h2 data-reveal><T fr="Où manger" en="Where to eat" /></h2>
            <ul className="list-check" data-stagger>
              <li><T fr={<><strong>Restaurants des hôtels</strong> : cuisine camerounaise et internationale, ouverts aux non-résidents</>} en={<><strong>Hotel restaurants</strong>: Cameroonian and international food, open to non-guests</>} /></li>
              <li><T fr={<><strong>Complexe Eugénie</strong> : restaurant en ville</>} en={<><strong>Complexe Eugénie</strong>: restaurant in town</>} /></li>
              <li><T fr={<><strong>Autour des marchés</strong> : beignets, brochettes, maïs grillé, koki et plats du jour</>} en={<><strong>Around the markets</strong>: doughnuts, skewers, grilled corn, koki and daily dishes</>} /></li>
            </ul>
          </div>
          <div className="deco" data-reveal="clip"><figure className="frame wide" style={{ margin: 0 }}><Img k="taro" w={1280} /></figure></div>
        </div>
      </section>

      <div className="band" aria-hidden="true" />
      <section className="sec sec-dark" id="acces">
        <div className="wrap split">
          <div>
            <p className="kicker" data-reveal><T fr="Accès" en="Getting here" /></p>
            <h2 data-reveal><T fr="Venir à Bangangté" en="Getting to Bangangté" /></h2>
            <p className="lead" data-reveal><T fr="Bangangté se trouve à 1 340 m d'altitude sur la route nationale 4, à 49 km au sud de Bafoussam et à 249 km de Yaoundé. Les vols internationaux arrivent à Douala ou à Yaoundé, puis des agences de voyage relient la ville plusieurs fois par jour." en="Bangangté sits at 1,340 m on National Road 4, 49 km south of Bafoussam and 249 km from Yaoundé. International flights land in Douala or Yaoundé, then coach companies run to town several times a day." /></p>
            <ul className="list-check" data-stagger>
              <li><T fr="Depuis Bafoussam : 49 km par l'axe bitumé Bafoussam–Bangangté, via Bangoua" en="From Bafoussam: 49 km on the paved Bafoussam–Bangangté road, via Bangoua" /></li>
              <li><T fr="Depuis Yaoundé : par la route nationale 4, via Obala, Bafia et Tonga (environ 249 km)" en="From Yaoundé: on National Road 4, via Obala, Bafia and Tonga (about 249 km)" /></li>
              <li><T fr="Depuis Douala : par la route de l'Ouest, via Bafang" en="From Douala: on the West road, via Bafang" /></li>
              <li><T fr="Sur place : taxis et moto-taxis. À moto, portez un casque et fixez le prix avant de partir" en="In town: taxis and motorbike taxis. On a motorbike, wear a helmet and agree the fare first" /></li>
            </ul>
          </div>
          <div data-reveal="right">
            <div className="gmap"><iframe title="Bangangté sur Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Bangangt%C3%A9%2C%20Cameroun&z=12&output=embed" /></div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap split">
          <div>
            <p className="kicker" data-reveal><T fr="Questions pratiques" en="Practical questions" /></p>
            <h2 data-reveal><T fr="Bon à savoir" en="Good to know" /></h2>
            <p className="lead" data-reveal><T fr="Les réponses aux questions que se posent le plus souvent les visiteurs." en="Answers to the questions visitors ask most." /></p>
          </div>
          <div className="faq" data-reveal>
            {FAQ.map((f, i) => (
              <details key={i} open={i === 0}><summary><T fr={f.q.fr} en={f.q.en} /></summary><div className="ans"><T fr={f.a.fr} en={f.a.en} /></div></details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
