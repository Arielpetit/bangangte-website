import Link from "next/link";
import { B, CommuniqueList, D, EventTile, NewsBlock, Pic, ProjectCard } from "@/components/mairie";
import { Credit, Icon, Img, SecHead, T } from "@/components/ui";
import { getCommuniques, getFeaturedPosts, getPeople, getProcedures, getProjects, getSettings, getUpcomingEvents } from "@/lib/data/content";
import { initials, mediaUrl } from "@/lib/data/format";
import { meta } from "@/lib/meta";

export const dynamic = "force-dynamic";
export const metadata = { ...meta("Commune de Bangangté", "Bangangté council", "Site officiel de la Commune de Bangangté : actualités de la mairie, communiqués, agenda, démarches administratives, projets et découverte de la ville."), title: { absolute: "Commune de Bangangté · Site officiel de la Mairie" }, other: { "title-fr": "Commune de Bangangté · Site officiel de la Mairie", "title-en": "Bangangté council · Official website" } };

const QUICK = [
  { theme: "etat_civil", href: "/services#etat_civil", icon: "file", t: { fr: "État civil", en: "Civil records" }, d: { fr: "Actes de naissance, de mariage et de décès, copies et légalisations.", en: "Birth, marriage and death certificates, copies and certifications." } },
  { theme: "urbanisme", href: "/services#urbanisme", icon: "build", t: { fr: "Urbanisme", en: "Planning" }, d: { fr: "Permis de bâtir, certificats", en: "Building permits, certificates" } },
  { theme: "commerce", href: "/services#commerce", icon: "store", t: { fr: "Marchés", en: "Markets" }, d: { fr: "Boutiques et places", en: "Shops and pitches" } },
  { theme: "jeunesse", href: "/services#jeunesse", icon: "briefcase", t: { fr: "Emploi jeunes", en: "Youth jobs" }, d: { fr: "Bureau de l'emploi, stages", en: "Jobs office, internships" } },
  { theme: "social", href: "/services#social", icon: "users", t: { fr: "Aide sociale", en: "Social help" }, d: { fr: "Comité des aides et secours", en: "Assistance committee" } },
] as const;

const PROGRAMMES = [
  { fr: "Jeudi propre", en: "Clean Thursday" }, { fr: "Bangangté, ville fontaine", en: "Bangangté, fountain city" }, { fr: "Un quartier, une lumière", en: "One quarter, one light" },
  { fr: "Vacances utiles", en: "Holiday internships" }, { fr: "Bureau municipal de l'emploi", en: "Municipal employment office" }, { fr: "Noël pour tous", en: "Christmas for all" },
  { fr: "Comité des aides et secours", en: "Social assistance committee" }, { fr: "Comités de village", en: "Village committees" },
];

export default async function Home() {
  const [posts, communiques, events, executive, projects, settings, procedures] = await Promise.all([
    getFeaturedPosts(4), getCommuniques({ limit: 4 }), getUpcomingEvents(3), getPeople("executif"), getProjects(), getSettings(), getProcedures(),
  ]);
  const byTheme = (t: string) => procedures.filter((p) => p.theme === t);
  const mayor = executive[0];
  const nextEvent = events[0];
  const lastNotice = communiques[0];
  const mayorPhoto = mayor ? mediaUrl(mayor.photo_url, 960) : null;

  return (
    <>
      <section className="home home-mairie">
        <div className="wrap home-grid">
          <div>
            <p className="kicker fade-in" style={{ ["--d" as string]: ".1s" }}><T fr="Mairie de Bangangté · Département du Ndé" en="Bangangté town hall · Ndé division" /></p>
            <h1 className="split-chars">
              <span className="line" data-l="fr"><SplitWords s="Commune de" i={0} /></span>
              <span className="line" data-l="fr"><SplitWords s="Bangangté" i={10} /></span>
              <span className="line" data-l="en"><SplitWords s="Bangangté" i={0} /></span>
              <span className="line" data-l="en"><SplitWords s="Council" i={9} /></span>
            </h1>
            <p className="lead fade-in" style={{ ["--d" as string]: ".7s" }}>
              <T fr="Au service des habitants depuis 1954 : actualités de la mairie, communiqués officiels, démarches administratives et projets qui transforment la commune." en="Serving residents since 1954: council news, official notices, administrative formalities and the projects transforming the town." />
            </p>
            <div className="btn-row fade-in" style={{ ["--d" as string]: ".85s" }}>
              <Link className="btn btn-gold" href="/services"><T fr="Vos démarches" en="Your formalities" /><Icon name="arrow" /></Link>
              <Link className="btn btn-glass" href="/actualites"><T fr="Actualités de la mairie" en="Council news" /></Link>
            </div>
            <div className="home-stats fade-in" style={{ ["--d" as string]: "1s" }}>
              <div><b>1954</b><span><T fr="création de la commune" en="council founded" /></span></div>
              <div><b data-count="7">7</b><span><T fr="groupements" en="groupements" /></span></div>
              <div><b data-count="41">41</b><span><T fr="conseillers municipaux" en="councillors" /></span></div>
              <div><b data-count="59">59</b><span><T fr="écoles primaires publiques" en="public primary schools" /></span></div>
            </div>
          </div>
          <div className="hm-visual">
            <div className="arch"><Img k="hdv" w={960} priority /></div>
            {nextEvent && (
              <Link className="hm-card hm-c1" href={`/agenda#${nextEvent.slug}`}>
                <span className="col-ic"><Icon name="calendar" /></span>
                <span><b><B fr={nextEvent.title_fr} en={nextEvent.title_en} /></b><span>{nextEvent.date_label_fr ? <B fr={nextEvent.date_label_fr} en={nextEvent.date_label_en} /> : <D iso={nextEvent.starts_at} />}</span></span>
              </Link>
            )}
            {lastNotice && (
              <Link className="hm-card hm-c2" href={`/communiques/${lastNotice.slug}`}>
                <span className="col-ic"><Icon name="megaphone" /></span>
                <span><b><T fr="Dernier communiqué" en="Latest notice" /></b><span><B fr={lastNotice.title_fr} en={lastNotice.title_en} /></span></span>
              </Link>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hm-seal" src="/images/logo.png" alt="" />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead kicker={{ fr: "Services en ligne", en: "Online services" }} title={{ fr: "Que souhaitez-vous faire ?", en: "What would you like to do?" }} text={{ fr: "Les démarches les plus demandées, avec les pièces à fournir.", en: "The most requested formalities, with the documents you need." }} aside={<Link className="link-arrow" data-reveal href="/services"><T fr="Toutes les démarches" en="All formalities" /><Icon name="arrow" /></Link>} />
          <div className="qx" data-stagger>
            {QUICK.map((q, i) => {
              const list = byTheme(q.theme);
              return (
                <div key={q.theme} className={`qx-card${i === 0 ? " qx-main" : ""}`}>
                  <Link className="qx-hit" href={q.href} aria-label={q.t.fr} />
                  <div className="qx-top">
                    <span className="qx-ic"><Icon name={q.icon} /></span>
                    <span className="qx-n">0{i + 1}</span>
                  </div>
                  <strong><T fr={q.t.fr} en={q.t.en} /></strong>
                  <small><T fr={q.d.fr} en={q.d.en} /></small>
                  {i === 0 && list.length > 0 && (
                    <ul className="qx-list">
                      {list.slice(0, 4).map((p) => (
                        <li key={p.slug}><Link href={`/services/${p.slug}`}><B fr={p.title_fr} en={p.title_en} /><Icon name="arrow" /></Link></li>
                      ))}
                    </ul>
                  )}
                  <span className="qx-foot">
                    {list.length > 0 && <span className="qx-count">{list.length} <T fr={list.length > 1 ? "démarches" : "démarche"} en={list.length > 1 ? "formalities" : "formality"} /></span>}
                    <span className="qx-go"><Icon name="arrow" /></span>
                  </span>
                </div>
              );
            })}
            <Link className="qx-report" href="/services/signaler">
              <span className="qx-ic"><Icon name="alert" /></span>
              <span><strong><T fr="Signaler un problème" en="Report a problem" /></strong><small><T fr="Ordures, voirie, éclairage, fuite d'eau : la mairie vous répond." en="Waste, roads, lighting, water leaks: the town hall gets back to you." /></small></span>
              <span className="qx-go"><Icon name="arrow" /></span>
            </Link>
            <div className="qx-hours">
              <span className="qx-live" aria-hidden="true" />
              <span><strong><T fr="Guichets de la mairie" en="Town hall counters" /></strong><small><T fr={settings.hours_fr} en={settings.hours_en || settings.hours_fr} /></small></span>
              {settings.phone && <a href={`tel:${settings.phone.replace(/\s/g, "")}`}><Icon name="phone" />{settings.phone}</a>}
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <SecHead kicker={{ fr: "À la une", en: "Top stories" }} title={{ fr: "La vie de la commune", en: "Life in the council" }} aside={<Link className="link-arrow" data-reveal href="/actualites"><T fr="Toutes les actualités" en="All news" /><Icon name="arrow" /></Link>} />
          <NewsBlock posts={posts} />
        </div>
      </section>

      <div className="tk" aria-hidden="true">
        <div className="tk-band tk-a">
          <div className="tk-track">{[...PROGRAMMES, ...PROGRAMMES].map((p, i) => <span key={i} className={i % 2 ? "o" : undefined}><T fr={p.fr} en={p.en} /></span>)}</div>
        </div>
        <div className="tk-band tk-b">
          <div className="tk-track rev">{[...PROGRAMMES.slice(4), ...PROGRAMMES.slice(0, 4), ...PROGRAMMES.slice(4), ...PROGRAMMES.slice(0, 4)].map((p, i) => <span key={i} className={i % 2 ? undefined : "o"}><T fr={p.fr} en={p.en} /></span>)}</div>
        </div>
      </div>

      <section className="sec">
        <div className="wrap split-2">
          <div>
            <SecHead kicker={{ fr: "Officiel", en: "Official" }} title={{ fr: "Communiqués et avis", en: "Notices" }} aside={<Link className="link-arrow" data-reveal href="/communiques"><T fr="Tous" en="All" /><Icon name="arrow" /></Link>} />
            <CommuniqueList items={communiques} />
          </div>
          <div>
            <SecHead kicker={{ fr: "Agenda", en: "Events" }} title={{ fr: "Prochains rendez-vous", en: "Coming up" }} aside={<Link className="link-arrow" data-reveal href="/agenda"><T fr="L'agenda" en="Calendar" /><Icon name="arrow" /></Link>} />
            <div className="upcoming-side" data-stagger>{events.slice(0, 2).map((e) => <EventTile key={e.id} e={e} />)}</div>
          </div>
        </div>
      </section>

      {mayor && (
        <section className="sec sec-dark">
          <div className="wrap mayor">
            <div className="mayor-portrait" data-reveal="left">
              <div className="frame pcard-img">
                {mayorPhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={mayorPhoto} alt={mayor.name} />
                ) : (
                  <span className="pcard-ini" aria-hidden="true">{initials(mayor.name)}</span>
                )}
              </div>
            </div>
            <div>
              <p className="kicker" data-reveal>{settings.mayor_message_fr ? <T fr="Le mot du Maire" en="A word from the mayor" /> : <T fr="Le Maire de Bangangté" en="The mayor of Bangangté" />}</p>
              {settings.mayor_message_fr ? (
                <p className="quote" data-reveal><B fr={settings.mayor_message_fr} en={settings.mayor_message_en} /></p>
              ) : (
                <>
                  <h2 data-reveal>{mayor.name}</h2>
                  <p className="lead" data-reveal><B fr={mayor.bio_fr} en={mayor.bio_en} /></p>
                </>
              )}
              <div className="mayor-sign" data-reveal>
                {settings.mayor_message_fr && <b>{mayor.name}</b>}
                <span><T fr={`Entouré de ${executive.length - 1} adjoints et d'un conseil municipal de 41 membres.`} en={`Supported by ${executive.length - 1} deputies and a 41-member council.`} /></span>
              </div>
              <div className="btn-row" data-reveal style={{ marginTop: "1.6rem" }}>
                <Link className="btn btn-gold" href="/mairie/executif"><T fr="L'exécutif municipal" en="The executive" /><Icon name="arrow" /></Link>
                <Link className="btn btn-glass" href="/mairie/maire"><T fr="Le parcours du Maire" en="The mayor's career" /></Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="sec">
        <div className="wrap">
          <SecHead kicker={{ fr: "Projets et chantiers", en: "Projects and works" }} title={{ fr: "La commune se transforme", en: "A council on the move" }} text={{ fr: "Écoles, eau potable, routes, ponts et éclairage : l'avancement des investissements communaux.", en: "Schools, drinking water, roads, bridges and lighting: progress on council investments." }} aside={<Link className="link-arrow" data-reveal href="/projets"><T fr="Tous les projets" en="All projects" /><Icon name="arrow" /></Link>} />
          <div className="g3" data-stagger>{projects.slice(0, 3).map((p) => <ProjectCard key={p.id} p={p} />)}</div>
        </div>
      </section>

      <div className="band" aria-hidden="true" />
      <section className="sec sec-alt">
        <div className="wrap">
          <SecHead kicker={{ fr: "Découvrir Bangangté", en: "Discover Bangangté" }} title={{ fr: "Une ville, un royaume, un pays medumba", en: "A town, a kingdom, Medumba country" }} text={{ fr: "Plusieurs fois désignée ville la plus propre du Cameroun, Bangangté est aussi la porte des chutes, des grottes et des traditions du Ndé.", en: "Named Cameroon's cleanest town several times, Bangangté is also the gateway to the waterfalls, caves and traditions of the Ndé." }} aside={<Link className="link-arrow" data-reveal href="/ville"><T fr="Découvrir la ville" en="Discover the town" /><Icon name="arrow" /></Link>} />
          <div className="bento" data-stagger>
            <Link className="tile t-big" href="/culture"><Img k="danse2" w={1280} /><span className="tag"><T fr="Culture" en="Culture" /></span><div className="tile-body"><h3><T fr="Danses, masques et parures" en="Dances, masks and finery" /></h3><p><T fr="Les grandes cérémonies, la société Mandjong, le ndop et la langue medumba." en="Major ceremonies, the Mandjong society, ndop cloth and the Medumba language." /></p></div></Link>
            <Link className="tile t-tall" href="/nature"><Img k="chuteB" /><span className="tag"><T fr="Nature" en="Nature" /></span><div className="tile-body"><h3><T fr="Les chutes du Ndé" en="The Ndé waterfalls" /></h3><p><T fr="Des chutes cachées dans les forêts galeries." en="Waterfalls hidden in gallery forests." /></p></div></Link>
            <Link className="tile" href="/culture#table"><Img k="taro" /><span className="tag"><T fr="Saveurs" en="Food" /></span><div className="tile-body"><h3><T fr="Taro et sauce jaune" en="Taro and yellow sauce" /></h3><p><T fr="Le plat des grandes occasions." en="The dish for great occasions." /></p></div></Link>
            <Link className="tile" href="/personnalites"><Img k="roi2" w={500} /><span className="tag"><T fr="Royaume" en="Kingdom" /></span><div className="tile-body"><h3><T fr="Le roi et ses notables" en="The king and his notables" /></h3><p><T fr="Quinze rois depuis 1665." en="Fifteen kings since 1665." /></p></div></Link>
            <Link className="tile t-wide" href="/nature"><Img k="tagny" /><span className="tag"><T fr="Lieux sacrés" en="Sacred places" /></span><div className="tile-body"><h3><T fr="Tagny, Mbwregoum et forêts sacrées" en="Tagny, Mbwregoum and sacred forests" /></h3><p><T fr="Des sites de rassemblement et de pèlerinage, à visiter sur autorisation." en="Gathering and pilgrimage sites, visited with permission." /></p></div></Link>
            <Link className="tile t-wide" href="/ville"><Img k="marche2" w={1280} /><span className="tag"><T fr="La ville" en="The town" /></span><div className="tile-body"><h3><T fr="Marchés et vie de quartier" en="Markets and neighbourhood life" /></h3><p><T fr="Grand marché le samedi, petit marché le mercredi." en="Big market on Saturdays, small market on Wednesdays." /></p></div></Link>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap split">
          <div>
            <p className="kicker" data-reveal><T fr="Une question, une démarche ?" en="A question or a formality?" /></p>
            <h2 data-reveal><T fr="La mairie vous répond" en="The council is here to help" /></h2>
            <p className="lead" data-reveal><B fr={settings.hours_fr} en={settings.hours_en} /></p>
            <div className="btn-row" data-reveal>
              <Link className="btn btn-solid" href="/contact"><T fr="Écrire à la mairie" en="Write to the council" /><Icon name="arrow" /></Link>
              <a className="btn btn-line" href={`tel:${settings.phone.replace(/\s+/g, "")}`}><Icon name="phone" />{settings.phone}</a>
            </div>
          </div>
          <div className="deco" data-reveal="clip"><figure className="frame wide" style={{ margin: 0 }}><Pic url="img:marche2" alt="Marché de Bangangté" w={1280} /></figure></div>
        </div>
      </section>
      <p className="sr"><Credit k="hdv" /></p>
    </>
  );
}

/** Lettres animées (même effet que SplitTitle), avec un décalage de départ. */
function SplitWords({ s, i }: { s: string; i: number }) {
  let n = i;
  return (
    <>
      {s.split(" ").map((w, wi, arr) => (
        <span key={wi}>
          <span className="word">{[...w].map((c, ci) => <span key={ci} className="ch" style={{ ["--i" as string]: n++, ["--base" as string]: ".2s" }}>{c}</span>)}</span>
          {wi < arr.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
