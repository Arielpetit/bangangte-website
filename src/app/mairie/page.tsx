import Link from "next/link";
import { Icon, Img, Media, PageHero, SecHead, T } from "@/components/ui";
import { IMG } from "@/lib/images";
import { meta } from "@/lib/meta";

export const metadata = meta("Mairie", "Town hall", "Hôtel de ville, services municipaux, actualités, investissement et diaspora de la Commune de Bangangté.");

const SERVICES = [
  { icon: "file", t: { fr: "État civil", en: "Civil records" }, d: { fr: "Actes de naissance, de mariage et de décès, copies certifiées et légalisations.", en: "Birth, marriage and death certificates, certified copies and legalisations." } },
  { icon: "build", t: { fr: "Urbanisme", en: "Planning" }, d: { fr: "Permis de bâtir, certificats d'urbanisme et occupation de la voie publique.", en: "Building permits, planning certificates and use of public space." } },
  { icon: "store", t: { fr: "Commerce et marchés", en: "Trade and markets" }, d: { fr: "Boutiques du marché central, autorisations d'exercer et droits de place.", en: "Central market shops, trading permits and pitch fees." } },
  { icon: "leaf", t: { fr: "Hygiène et propreté", en: "Hygiene and cleanliness" }, d: { fr: "Collecte des ordures, journée de propreté du jeudi, concours du quartier le plus propre.", en: "Waste collection, Thursday clean-up day and the cleanest-neighbourhood contest." } },
  { icon: "ball", t: { fr: "Jeunesse et sport", en: "Youth and sport" }, d: { fr: "Fête de la jeunesse, stade municipal et soutien aux associations.", en: "Youth Day, the municipal stadium and support for associations." } },
  { icon: "alert", t: { fr: "Signaler un problème", en: "Report a problem" }, d: { fr: "Voirie, éclairage, eau, déchets : écrivez-nous depuis la page contact.", en: "Roads, lighting, water, waste: write to us from the contact page." } },
];

const NEWS = [
  { d: { fr: "23 octobre 2026", en: "23 October 2026" }, t: { fr: "Le ministre de l'Habitat inspecte aires de jeux, accès aux écoles et voiries", en: "The Housing Minister inspects playgrounds, school access roads and streets" } },
  { d: { fr: "1er août 2026", en: "1 August 2026" }, t: { fr: "Premier marché bio sur l'esplanade de l'ancienne mairie", en: "First organic market on the old town hall square" } },
  { d: { fr: "11 février 2025", en: "11 February 2025" }, t: { fr: "Concert géant pour la Fête de la jeunesse", en: "A big concert for Youth Day" } },
  { d: { fr: "Février 2022", en: "February 2022" }, t: { fr: "Inauguration du nouvel hôtel de ville", en: "The new town hall opens" } },
];

export default function Mairie() {
  return (
    <>
      <PageHero
        crumb={{ fr: "Mairie", en: "Town hall" }}
        kicker={{ fr: "Commune de Bangangté", en: "Bangangté council" }}
        title={{ fr: "Mairie", en: "Town hall" }}
        lead={{ fr: "Au service des habitants, des visiteurs, de la diaspora et des investisseurs.", en: "Serving residents, visitors, the diaspora and investors." }}
        img="hdv"
        landscape
        badge={{ big: "2022", small: { fr: "Nouvel hôtel de ville", en: "New town hall" } }}
      >
        <div className="btn-row fade-in" style={{ ["--d" as string]: ".9s", marginTop: "1.6rem" }}>
          <Link className="btn btn-gold" href="/contact"><T fr="Contacter la mairie" en="Contact the town hall" /><Icon name="arrow" /></Link>
          <a className="btn btn-glass" href="https://www.facebook.com/commune.bangangte/" rel="noopener" target="_blank">Facebook</a>
        </div>
      </PageHero>

      <section className="sec">
        <div className="wrap split">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="seal" data-reveal src="/images/logo.png" alt="Armoiries de la commune de Bangangté" data-en-alt="Coat of arms of the Bangangté council" />
            <p className="kicker" data-reveal><T fr="La commune" en="The council" /></p>
            <h2 data-reveal><T fr="Une commune primée" en="An award-winning council" /></h2>
            <p className="lead" data-reveal><T fr="Créée en 1954, la commune administre la ville et les villages de l'arrondissement. Son budget dépasse un milliard de FCFA en 2024." en="Created in 1954, the council runs the town and the villages of the subdivision. Its budget passed one billion FCFA in 2024." /></p>
            <p data-reveal><T fr="Le maire, Éric Niat, est en fonction depuis le 19 mai 2021. La commune est connue pour sa politique de propreté, primée par le FEICOM, et participe au Pacte mondial des Nations unies." en="Mayor Éric Niat has been in office since 19 May 2021. The council is known for its cleanliness policy, awarded by FEICOM, and is a participant in the United Nations Global Compact." /></p>
            <div className="stats" data-stagger>
              <div className="stat"><b>1954</b><span><T fr="création de la commune" en="council founded" /></span></div>
              <div className="stat"><b>1 120 m²</b><span><T fr="hôtel de ville R+2, inauguré en 2022" en="two-storey town hall, opened in 2022" /></span></div>
            </div>
          </div>
          <div className="mosaic" data-reveal="clip">
            <figure><Img k="marche2" /><figcaption><T fr={IMG.marche2.fr} en={IMG.marche2.en} /></figcaption></figure>
            <figure><Img k="defile" w={500} /><figcaption><T fr={IMG.defile.fr} en={IMG.defile.en} /></figcaption></figure>
            <figure><Img k="stade" w={500} /><figcaption><T fr={IMG.stade.fr} en={IMG.stade.en} /></figcaption></figure>
          </div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <SecHead kicker={{ fr: "Services municipaux", en: "Council services" }} title={{ fr: "Vos démarches", en: "Your formalities" }} text={{ fr: "Munissez-vous de votre carte nationale d'identité.", en: "Bring your national identity card." }} aside={<Link className="link-arrow" data-reveal href="/contact"><T fr="Poser une question" en="Ask a question" /><Icon name="arrow" /></Link>} />
          <ul className="svc" data-stagger>
            {SERVICES.map((s) => (
              <li key={s.icon}><span className="pi"><Icon name={s.icon} /></span><div><h3><T fr={s.t.fr} en={s.t.en} /></h3><p><T fr={s.d.fr} en={s.d.en} /></p></div></li>
            ))}
          </ul>
        </div>
      </section>

      <div className="band" aria-hidden="true" />
      <section className="sec sec-dark">
        <div className="wrap split">
          <div>
            <p className="kicker" data-reveal><T fr="Actualités" en="News" /></p>
            <h2 data-reveal><T fr="La commune en mouvement" en="The council at work" /></h2>
            <ul className="list-check" data-stagger>
              {NEWS.map((n) => <li key={n.d.fr}><strong><T fr={n.d.fr} en={n.d.en} /></strong> : <T fr={n.t.fr} en={n.t.en} /></li>)}
            </ul>
            <a className="btn btn-gold" data-reveal href="https://www.facebook.com/commune.bangangte/" rel="noopener" target="_blank"><T fr="Toutes les actualités sur Facebook" en="All news on Facebook" /><Icon name="arrow" /></a>
          </div>
          <div className="panel" data-reveal="right" style={{ textAlign: "center" }}>
            <div className="pi" style={{ marginInline: "auto" }}><Icon name="radio" /></div>
            <p className="kicker" style={{ justifyContent: "center" }}><T fr="Radio municipale" en="Municipal radio" /></p>
            <p style={{ font: "800 clamp(3rem,7vw,5rem)/1 var(--font-display), system-ui", color: "#fff", margin: "0 0 .6rem" }}>92.7 FM</p>
            <p><T fr="Informations municipales, culture et vie des quartiers, depuis l'hôtel de ville." en="Council news, culture and neighbourhood life, broadcast from the town hall." /></p>
          </div>
        </div>
      </section>

      <section className="sec" id="investir">
        <div className="wrap g2">
          <article className="card" data-reveal>
            <Media k="marche2" w={1280} />
            <p className="kicker" style={{ margin: 0 }}><T fr="Investir" en="Invest" /></p>
            <h3 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)" }}><T fr="Investir à Bangangté" en="Invest in Bangangté" /></h3>
            <ul className="list-check" style={{ margin: 0 }}>
              <li><T fr="Boutiques et stockage au marché central" en="Shops and storage at the central market" /></li>
              <li><T fr="Agriculture, agroécologie et transformation locale" en="Farming, agroecology and local processing" /></li>
              <li><T fr="Hôtellerie, restauration et services touristiques" en="Hotels, restaurants and tourism services" /></li>
              <li><T fr="Énergie : mini-centrale hydroélectrique de 5 MW" en="Energy: a 5 MW mini hydro plant" /></li>
            </ul>
          </article>
          <article className="card" data-reveal id="diaspora">
            <Media k="femme3" />
            <p className="kicker" style={{ margin: 0 }}><T fr="Diaspora" en="Diaspora" /></p>
            <h3 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)" }}><T fr="Fils et filles de Bangangté" en="Sons and daughters of Bangangté" /></h3>
            <p><T fr="De Douala à Paris, de Yaoundé à Toronto : participez au COMENGA, soutenez une école, un centre de santé ou un projet de quartier, ou investissez dans votre ville d'origine. La mairie vous met en relation avec les porteurs de projets." en="From Douala to Paris, from Yaoundé to Toronto: join COMENGA, support a school, a health centre or a neighbourhood project, or invest in your home town. The council will put you in touch with project leaders." /></p>
            <Link className="link-arrow" href="/contact"><T fr="Contacter la mairie" en="Contact the town hall" /><Icon name="arrow" /></Link>
          </article>
        </div>
      </section>
    </>
  );
}
