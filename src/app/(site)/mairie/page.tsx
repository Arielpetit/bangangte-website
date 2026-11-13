import Link from "next/link";
import { Icon, Img, Media, SecHead, T } from "@/components/ui";
import { PersonTile, PostCard } from "@/components/mairie";
import { getPeople, getPosts, getSettings } from "@/lib/data/content";
import { IMG } from "@/lib/images";
import { meta } from "@/lib/meta";
import { Hero } from "@/components/Hero";

export const dynamic = "force-dynamic";
export const metadata = meta("La Mairie", "Town hall", "La Commune de Bangangté : missions, exécutif municipal, conseil, administration, services, actualités, investissement et diaspora.");

const SECTIONS = [
  { href: "/mairie/maire", icon: "users", t: { fr: "Le Maire", en: "The mayor" }, d: { fr: "Parcours et action d'Éric Aimé NIAT, maire depuis 2021.", en: "Éric Aimé NIAT's career and work as mayor since 2021." } },
  { href: "/mairie/executif", icon: "shield", t: { fr: "L'exécutif municipal", en: "The executive" }, d: { fr: "Le Maire et ses quatre adjoints, officiers d'état civil.", en: "The mayor and four deputies, all civil registrars." } },
  { href: "/mairie/conseil", icon: "layers", t: { fr: "Le Conseil municipal", en: "The municipal council" }, d: { fr: "41 conseillers, des commissions et des sessions publiques.", en: "41 councillors, committees and public sessions." } },
  { href: "/mairie/administration", icon: "grid", t: { fr: "L'administration", en: "Administration" }, d: { fr: "Secrétariat général, état civil, hygiène, urbanisme, emploi.", en: "General secretariat, civil records, hygiene, planning, jobs." } },
  { href: "/projets", icon: "hammer", t: { fr: "Projets et chantiers", en: "Projects and works" }, d: { fr: "Écoles, eau, routes, ponts et éclairage solaire.", en: "Schools, water, roads, bridges and solar lighting." } },
  { href: "/mairie/historique", icon: "book", t: { fr: "Histoire et distinctions", en: "History and awards" }, d: { fr: "Maires successifs, prix et partenaires depuis 1954.", en: "Past mayors, awards and partners since 1954." } },
];

export default async function Mairie() {
  const [executive, news, settings] = await Promise.all([getPeople("executif"), getPosts({ limit: 3 }), getSettings()]);
  return (
    <>
      <Hero page="mairie"
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
          <a className="btn btn-glass" href={settings.facebook} rel="noopener" target="_blank">Facebook</a>
        </div>
      </Hero>

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
          <SecHead kicker={{ fr: "L'institution", en: "The institution" }} title={{ fr: "Qui fait quoi à la mairie", en: "Who does what at the council" }} />
          <div className="g3" data-stagger>
            {SECTIONS.map((x) => (
              <Link key={x.href} className="panel" href={x.href} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="pi"><Icon name={x.icon} /></div>
                <h3><T fr={x.t.fr} en={x.t.en} /></h3>
                <p><T fr={x.d.fr} en={x.d.en} /></p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead kicker={{ fr: "Mandature 2020-2026", en: "2020-2026 term" }} title={{ fr: "L'exécutif municipal", en: "The executive" }} aside={<Link className="link-arrow" data-reveal href="/mairie/executif"><T fr="En savoir plus" en="Learn more" /><Icon name="arrow" /></Link>} />
          <div className="exec" data-stagger>{executive.map((p, i) => <PersonTile key={p.id} p={{ ...p, bio_fr: i === 0 ? p.bio_fr : null }} big={i === 0} />)}</div>
        </div>
      </section>

      <div className="band" aria-hidden="true" />
      <section className="sec sec-dark">
        <div className="wrap split">
          <div>
            <p className="kicker" data-reveal><T fr="Actualités" en="News" /></p>
            <h2 data-reveal><T fr="La commune en mouvement" en="The council at work" /></h2>
            <div className="news-side" data-stagger>{news.map((p) => <PostCard key={p.id} p={p} variant="side" />)}</div>
            <Link className="btn btn-gold" data-reveal href="/actualites" style={{ marginTop: "1.6rem" }}><T fr="Toutes les actualités" en="All news" /><Icon name="arrow" /></Link>
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
