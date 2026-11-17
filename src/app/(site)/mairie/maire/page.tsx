import Link from "next/link";
import { B, PostCard } from "@/components/mairie";
import { Icon, SecHead, T } from "@/components/ui";
import { getPeople, getPosts, getSettings } from "@/lib/data/content";
import { initials, mediaUrl } from "@/lib/data/format";
import { meta } from "@/lib/meta";
import { Hero } from "@/components/Hero";

export const dynamic = "force-dynamic";
export const metadata = meta("Le Maire", "The mayor", "Éric Aimé NIAT, Maire de Bangangté depuis 2021 : parcours, mandat et action municipale.");

const STEPS = [
  { y: "2013", fr: "Élu conseiller municipal, 4e adjoint au Maire", en: "Elected councillor, 4th deputy mayor" },
  { y: "2019", fr: "3e adjoint au Maire", en: "3rd deputy mayor" },
  { y: "2020", fr: "Réélu conseiller municipal", en: "Re-elected councillor" },
  { y: "2021", fr: "Élu Maire le 19 mai, prête serment le 3 juin, installé avec ses adjoints le 31 juillet", en: "Elected mayor on 19 May, sworn in on 3 June, installed with his deputies on 31 July" },
  { y: "2026", fr: "Ambassadeur Youth Connekt Cameroon pour la région de l'Ouest", en: "Youth Connekt Cameroon ambassador for the West Region" },
];

const PRIORITIES = [
  { icon: "leaf", fr: "Une ville propre", en: "A clean town", dfr: "Jeudi propre chaque semaine, réceptacles à ordures, partenariat avec HYSACAM et camion hydrocureur.", den: "Clean Thursday every week, waste points, partnership with HYSACAM and a septic tank truck." },
  { icon: "drop", fr: "L'eau et la lumière", en: "Water and light", dfr: "« Bangangté, ville fontaine » et éclairage public solaire dans les quartiers et les villages.", den: "“Bangangté, fountain city” and solar street lighting in neighbourhoods and villages." },
  { icon: "book", fr: "L'école d'abord", en: "Schools first", dfr: "Salles de classe, préscolaire, appui aux 59 écoles primaires publiques et numérique à l'école.", den: "Classrooms, preschools, support for 59 public primary schools and digital tools." },
  { icon: "briefcase", fr: "La jeunesse et l'emploi", en: "Youth and jobs", dfr: "Bureau municipal de l'emploi, vacances utiles, vacances informatiques, ORFEV Jeunes.", den: "Municipal employment office, holiday internships, computer camp, ORFEV Jeunes." },
  { icon: "users", fr: "La solidarité", en: "Solidarity", dfr: "Comité communal des aides et secours, Noël pour tous, soutien aux personnes vulnérables.", den: "Social assistance committee, Christmas for all, support for vulnerable people." },
  { icon: "hammer", fr: "Les infrastructures", en: "Infrastructure", dfr: "Routes, ponts, marchés, gare routière et stade municipal.", den: "Roads, bridges, markets, bus station and the municipal stadium." },
];

export default async function Maire() {
  const [executive, settings, news] = await Promise.all([getPeople("executif"), getSettings(), getPosts({ limit: 3 })]);
  const mayor = executive[0];
  const photo = mayor ? mediaUrl(mayor.photo_url, 960) : null;
  return (
    <>
      <Hero page="mairie/maire"
        crumb={{ fr: "Le Maire", en: "The mayor" }}
        kicker={{ fr: "La Mairie", en: "Town hall" }}
        title={{ fr: "Le Maire", en: "The mayor" }}
        lead={{ fr: `${mayor?.name ?? "Éric Aimé NIAT"}, Maire de la Commune de Bangangté depuis le 19 mai 2021.`, en: `${mayor?.name ?? "Éric Aimé NIAT"}, mayor of Bangangté since 19 May 2021.` }}
        img="hdv"
        landscape
        badge={{ big: "2021", small: { fr: "Élu Maire", en: "Elected mayor" } }}
      />

      <section className="sec">
        <div className="wrap mayor">
          <div className="mayor-portrait" data-reveal="left">
            <div className="frame pcard-img">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt={mayor?.name} />
              ) : (
                <span className="pcard-ini" aria-hidden="true">{initials(mayor?.name ?? "E N")}</span>
              )}
            </div>
          </div>
          <div>
            <p className="kicker" data-reveal>{settings.mayor_message_fr ? <T fr="Le mot du Maire" en="A word from the mayor" /> : <T fr="Parcours" en="Career" />}</p>
            {settings.mayor_message_fr && <p className="quote" data-reveal><B fr={settings.mayor_message_fr} en={settings.mayor_message_en} /></p>}
            <h2 data-reveal>{mayor?.name}</h2>
            <p className="lead" data-reveal><B fr={mayor?.bio_fr} en={mayor?.bio_en} /></p>
            <ul className="timeline" data-stagger>
              {STEPS.map((s) => <li key={s.y}><b>{s.y}</b><span><T fr={s.fr} en={s.en} /></span></li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <SecHead kicker={{ fr: "L'action municipale", en: "Council action" }} title={{ fr: "Six priorités pour Bangangté", en: "Six priorities for Bangangté" }} text={{ fr: "Les axes qui reviennent dans l'action de la mairie depuis 2021.", en: "The themes that run through the council's work since 2021." }} />
          <div className="g3" data-stagger>
            {PRIORITIES.map((p) => (
              <article key={p.icon} className="panel"><div className="pi"><Icon name={p.icon} /></div><h3><T fr={p.fr} en={p.en} /></h3><p><T fr={p.dfr} en={p.den} /></p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead kicker={{ fr: "Sur le terrain", en: "On the ground" }} title={{ fr: "Les dernières actualités", en: "Latest news" }} aside={<Link className="link-arrow" data-reveal href="/actualites"><T fr="Toutes les actualités" en="All news" /><Icon name="arrow" /></Link>} />
          <div className="posts-grid" data-stagger>{news.map((p) => <PostCard key={p.id} p={p} />)}</div>
        </div>
      </section>
    </>
  );
}
