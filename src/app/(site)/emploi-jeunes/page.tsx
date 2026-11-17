import Link from "next/link";
import { B, PostCard } from "@/components/mairie";
import { Icon, SecHead, T } from "@/components/ui";
import { Hero } from "@/components/Hero";
import { getPosts, getSettings } from "@/lib/data/content";
import { meta } from "@/lib/meta";
import type { Bi } from "@/lib/nav";

export const dynamic = "force-dynamic";
export const metadata = meta("Emploi des jeunes", "Youth employment", "Ce que fait la Commune de Bangangté pour l'emploi des jeunes : Bureau municipal de l'emploi, stages, programmes ORFEV-Jeunes et JEME, et BAM, la future plateforme d'opportunités.");

// Adresse de la plateforme BAM : à renseigner dans NEXT_PUBLIC_BAM_URL quand le sous-domaine est en ligne.
const BAM_URL = process.env.NEXT_PUBLIC_BAM_URL ?? "";

const PROGRAMMES: { icon: string; t: Bi; d: Bi }[] = [
  { icon: "briefcase", t: { fr: "Bureau municipal de l'emploi (BEM)", en: "Municipal employment office (BEM)" }, d: { fr: "À l'hôtel de ville, des jeunes stagiaires du programme ORFEV-Jeunes reçoivent chaque jour les chercheurs d'emploi : orientation, centres de formation, offres disponibles, conseils pour l'insertion.", en: "At the town hall, young trainees of the ORFEV-Jeunes programme welcome jobseekers every day: guidance, training centres, available offers and advice on finding work." } },
  { icon: "layers", t: { fr: "ORFEV-Jeunes et JEME", en: "ORFEV-Jeunes and JEME" }, d: { fr: "ORFEV-Jeunes (Orientation, Formation, Emploi, Vacances Jeunes) est un programme du MINEFOP ouvert à toute la jeunesse, scolarisée ou non, diplômée ou non. La commune a été distinguée lors de sa 2e édition, en 2026.", en: "ORFEV-Jeunes (Guidance, Training, Employment, Youth Holidays) is a MINEFOP programme open to all young people, in school or not, qualified or not. The council was recognised at its 2nd edition, in 2026." } },
  { icon: "file", t: { fr: "Vacances utiles", en: "Useful holidays" }, d: { fr: "Chaque été, la mairie accueille des élèves et étudiants de 15 ans et plus pour un stage rémunéré dans ses services. Le dépôt des dossiers s'ouvre dès le communiqué de juin.", en: "Each summer the council takes students aged 15 and over for a paid internship in its departments. Applications open when the June notice is published." } },
  { icon: "radio", t: { fr: "Vacances informatiques", en: "Computer holidays" }, d: { fr: "En juillet et août, 200 boursiers ont suivi en 2026 des cours d'initiation, de bureautique et d'infographie. C'était la 8e édition, avec l'association Académie du Bien-Être.", en: "In July and August 2026, 200 scholars took courses in computing basics, office software and graphic design. This was the 8th edition, with the Académie du Bien-Être association." } },
];

const YOUTH: Bi[] = [
  { fr: "Consulter les offres d'emploi, de stage et de formation publiées par les employeurs", en: "Browse the jobs, internships and training posted by employers" },
  { fr: "S'inscrire en ligne à un programme, à un séminaire ou à un atelier", en: "Sign up online for a programme, seminar or workshop" },
  { fr: "Garder son profil et suivre ses candidatures au même endroit", en: "Keep a profile and follow applications in one place" },
];
const EMPLOYERS: Bi[] = [
  { fr: "Publier une offre ou ouvrir un programme à destination des jeunes de Bangangté", en: "Post an offer or open a programme for the young people of Bangangté" },
  { fr: "Organiser un séminaire, une formation ou une journée de recrutement", en: "Run a seminar, training or recruitment day" },
  { fr: "Recevoir les candidatures et les inscriptions, sans passer par des intermédiaires", en: "Receive applications and sign-ups directly, with no middlemen" },
];
const STEPS: { t: Bi; d: Bi }[] = [
  { t: { fr: "Créer son profil", en: "Create a profile" }, d: { fr: "Un compte gratuit avec son parcours, ses diplômes et son quartier.", en: "A free account with your background, qualifications and neighbourhood." } },
  { t: { fr: "Choisir une opportunité", en: "Pick an opportunity" }, d: { fr: "Emploi, stage, formation, séminaire : filtrer, comparer, enregistrer.", en: "Job, internship, training, seminar: filter, compare, save." } },
  { t: { fr: "S'inscrire et suivre", en: "Apply and follow up" }, d: { fr: "Candidater en quelques minutes et suivre la réponse de l'employeur.", en: "Apply in minutes and follow the employer's answer." } },
];
const PRINCIPLES: { icon: string; t: Bi; d: Bi }[] = [
  { icon: "check", t: { fr: "Gratuit pour les jeunes", en: "Free for young people" }, d: { fr: "Aucune somme n'est demandée à un candidat, jamais.", en: "A candidate is never asked to pay anything." } },
  { icon: "shield", t: { fr: "Offres vérifiées", en: "Verified offers" }, d: { fr: "Chaque employeur est reconnu avant de publier, pour écarter les fausses annonces.", en: "Every employer is vetted before posting, to keep out fake ads." } },
  { icon: "lock", t: { fr: "Données protégées", en: "Protected data" }, d: { fr: "Les profils ne sont visibles que des employeurs auxquels le jeune candidate.", en: "Profiles are only visible to employers the young person applies to." } },
];

const KEYS = ["jeune", "emploi", "orfev", "vacances", "youth", "stage", "formation"];

export default async function EmploiJeunes() {
  const [settings, all] = await Promise.all([getSettings(), getPosts({ limit: 80 })]);
  const news = all.filter((p) => { const t = `${p.title_fr} ${p.excerpt_fr ?? ""}`.toLowerCase(); return KEYS.some((k) => t.includes(k)); }).slice(0, 3);

  return (
    <>
      <Hero page="emploi-jeunes"
        crumb={{ fr: "Emploi des jeunes", en: "Youth employment" }}
        kicker={{ fr: "Jeunesse et insertion", en: "Youth and inclusion" }}
        title={{ fr: "Emploi des jeunes", en: "Youth employment" }}
        lead={{ fr: "Orientation, stages, formations et emplois : ce que la commune fait pour les jeunes de Bangangté, et BAM, la plateforme qui rassemblera toutes les opportunités.", en: "Guidance, internships, training and jobs: what the council does for the young people of Bangangté, and BAM, the platform that will gather every opportunity." }}
        img="jeunesse_defile"
        inset="udm5"
        badge={{ big: "BEM", small: { fr: "Bureau municipal de l'emploi", en: "Municipal employment office" } }}
      />

      <section className="sec">
        <div className="wrap">
          <SecHead kicker={{ fr: "Aujourd'hui", en: "Today" }} title={{ fr: "Ce que la commune fait déjà", en: "What the council already does" }} text={{ fr: "Quatre dispositifs, ouverts toute l'année ou chaque été, pour aider les jeunes à trouver leur voie.", en: "Four schemes, open all year or each summer, to help young people find their way." }} />
          <div className="g2" data-stagger>
            {PROGRAMMES.map((p) => (
              <article key={p.t.fr} className="panel">
                <div className="pi"><Icon name={p.icon} /></div>
                <h3><T fr={p.t.fr} en={p.t.en} /></h3>
                <p><T fr={p.d.fr} en={p.d.en} /></p>
              </article>
            ))}
          </div>
          <div className="btn-row" data-reveal style={{ marginTop: "1.6rem" }}>
            <Link className="btn btn-solid" href="/services#jeunesse"><T fr="Démarches pour les jeunes" en="Formalities for young people" /><Icon name="arrow" /></Link>
          </div>
        </div>
      </section>

      <div className="band" aria-hidden="true" />
      <section className="sec sec-dark" id="bam">
        <div className="wrap">
          <p className="kicker" data-reveal><T fr="Bientôt en ligne" en="Coming online" /></p>
          <h2 data-reveal>BAM <small className="bam-sub">Bangangté Youth Opportunities</small></h2>
          <p className="lead" data-reveal><T fr="Une plateforme à part, dédiée aux jeunes de Bangangté : les employeurs y publient leurs opportunités, les jeunes s'y inscrivent. Séminaires, ateliers et programmes y trouvent aussi leur place." en="A separate platform for the young people of Bangangté: employers post their opportunities and young people sign up. Seminars, workshops and programmes will have a home there too." /></p>
          <div className="bam-cols" data-stagger>
            <div className="bam-card">
              <h3><Icon name="users" /><T fr="Pour les jeunes" en="For young people" /></h3>
              <ul className="list-check">{YOUTH.map((i) => <li key={i.fr}><T fr={i.fr} en={i.en} /></li>)}</ul>
            </div>
            <div className="bam-card">
              <h3><Icon name="briefcase" /><T fr="Pour les employeurs et organisateurs" en="For employers and organisers" /></h3>
              <ul className="list-check">{EMPLOYERS.map((i) => <li key={i.fr}><T fr={i.fr} en={i.en} /></li>)}</ul>
            </div>
          </div>
          <div className="btn-row" data-reveal style={{ marginTop: "1.8rem" }}>
            {BAM_URL
              ? <a className="btn btn-gold" href={BAM_URL} rel="noopener" target="_blank"><T fr="Accéder à BAM" en="Open BAM" /><Icon name="external" /></a>
              : <>
                  <span className="btn btn-gold is-soon" aria-disabled="true"><T fr="BAM ouvre bientôt" en="BAM opens soon" /></span>
                  <Link className="btn btn-glass" href="/contact"><T fr="Être prévenu du lancement" en="Get notified at launch" /></Link>
                </>}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead kicker={{ fr: "Comment ça marchera", en: "How it will work" }} title={{ fr: "Trois étapes pour un jeune", en: "Three steps for a young person" }} />
          <ol className="bam-steps" data-stagger>
            {STEPS.map((s, i) => (
              <li key={s.t.fr}><span className="n">{i + 1}</span><div><h3><T fr={s.t.fr} en={s.t.en} /></h3><p><T fr={s.d.fr} en={s.d.en} /></p></div></li>
            ))}
          </ol>
          <h3 className="group-title" data-reveal><T fr="Nos engagements pour BAM" en="Our commitments for BAM" /></h3>
          <div className="g3" data-stagger>
            {PRINCIPLES.map((p) => (
              <article key={p.t.fr} className="panel">
                <div className="pi"><Icon name={p.icon} /></div>
                <h3><T fr={p.t.fr} en={p.t.en} /></h3>
                <p><T fr={p.d.fr} en={p.d.en} /></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap split">
          <div>
            <p className="kicker" data-reveal><T fr="En attendant BAM" en="Until BAM opens" /></p>
            <h2 data-reveal><T fr="Passez au Bureau municipal de l'emploi" en="Visit the municipal employment office" /></h2>
            <p className="lead" data-reveal><T fr="Jeune diplômé, chercheur d'emploi ou porteur de projet : l'équipe du BEM vous écoute et vous oriente, à l'hôtel de ville." en="Recent graduate, jobseeker or project owner: the BEM team listens and guides you, at the town hall." /></p>
            <ul className="list-check" data-stagger>
              <li><T fr="Apportez votre carte nationale d'identité et votre CV ou vos diplômes" en="Bring your national ID card and your CV or qualifications" /></li>
              <li><B fr={settings.hours_fr} en={settings.hours_en} /></li>
              <li><T fr="L'inscription est gratuite" en="Registration is free" /></li>
            </ul>
          </div>
          <div className="panel" data-reveal="right">
            <div className="pi"><Icon name="briefcase" /></div>
            <h3><T fr="Vous êtes employeur ou organisateur ?" en="Are you an employer or organiser?" /></h3>
            <p><T fr="Entreprise, association, établissement de formation : proposez des stages, des emplois ou un séminaire aux jeunes de Bangangté. Écrivez-nous pour être référencé dès l'ouverture de BAM." en="Company, association or training centre: offer internships, jobs or a seminar to the young people of Bangangté. Write to us to be listed when BAM opens." /></p>
            <Link className="btn btn-solid" href="/contact"><T fr="Écrire à la mairie" en="Write to the council" /><Icon name="arrow" /></Link>
          </div>
        </div>
      </section>

      {news.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <SecHead kicker={{ fr: "À la une", en: "In the news" }} title={{ fr: "L'actualité de la jeunesse", en: "Youth news" }} aside={<Link className="link-arrow" data-reveal href="/actualites"><T fr="Toutes les actualités" en="All news" /><Icon name="arrow" /></Link>} />
            <div className="g3" data-stagger>{news.map((p) => <PostCard key={p.id} p={p} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
