import { Icon, Img, Media, PageHero, SecHead, T } from "@/components/ui";
import { localPhoto } from "@/lib/local";
import { meta } from "@/lib/meta";
import { SITES, ZONES, type Site } from "@/lib/sites";

export const metadata = meta("Nature et sites", "Nature and sights", "Tous les sites touristiques de Bangangté et du Ndé : palais royal, lieux sacrés, chutes, grottes, musées, chefferies, lac et randonnées.");

function Tags({ s }: { s: Site }) {
  return (
    <ul className="tags">
      {s.tags.map((t) => <li key={t.fr}><T fr={t.fr} en={t.en} /></li>)}
      {s.warn && <li className="warn"><T fr={s.warn.fr} en={s.warn.en} /></li>}
    </ul>
  );
}

function Info({ s }: { s: Site }) {
  return s.info ? <p className="site-info"><Icon name="clock" /><T fr={s.info.fr} en={s.info.en} /></p> : null;
}

export default function Nature() {
  // Un site sans photo passe en carte illustrée dès qu'une image est déposée dans public/images/sites/<slug>.jpg
  const sites = SITES.map((s) => ({ s, photo: s.img ? null : localPhoto("sites", s.slug) }));

  return (
    <>
      <PageHero
        crumb={{ fr: "Nature et sites", en: "Nature and sights" }}
        kicker={{ fr: "Le Ndé à pied, avec un guide", en: "The Ndé on foot, with a guide" }}
        title={{ fr: "Nature et sites", en: "Nature and sights" }}
        lead={{ fr: "Palais royal, lieux sacrés, chutes, grottes, musées, chefferies, lac et cols : tous les sites de Bangangté et de ses environs.", en: "Royal palace, sacred places, waterfalls, caves, museums, chiefdoms, a lake and mountain passes: every sight in and around Bangangté." }}
        img="chuteB"
        inset="gacha"
        badge={{ big: String(SITES.length), small: { fr: "sites à découvrir", en: "sights to explore" } }}
      >
        <ul className="ph-facts fade-in" style={{ ["--d" as string]: ".8s" }}>
          {ZONES.map((z) => <li key={z.key}><a href={`#${z.key}`} style={{ color: "inherit", textDecoration: "none" }}><T fr={z.kicker.fr} en={z.kicker.en} /></a></li>)}
        </ul>
      </PageHero>

      {ZONES.map((z, zi) => {
        const inZone = sites.filter((x) => x.s.zone === z.key);
        const cards = inZone.filter((x) => x.s.img || x.photo);
        const list = inZone.filter((x) => !x.s.img && !x.photo).map((x) => x.s);
        return (
          <section key={z.key} id={z.key} className={`sec${zi % 2 ? " sec-alt" : ""}`}>
            <div className="wrap">
              <SecHead kicker={z.kicker} title={z.title} text={z.text} aside={<span className="zone-count" data-reveal>{inZone.length} <T fr="sites" en="sights" /></span>} />
              <div className="g3" data-stagger>
                {cards.map(({ s, photo }) => (
                  <article key={s.slug} className="card" id={s.slug === "fondation-gacha" ? "gacha" : undefined}>
                    {s.img ? <Media k={s.img} /> : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <div className="media"><img src={photo!} alt={s.t.fr} loading="lazy" /></div>
                    )}
                    <h3><T fr={s.t.fr} en={s.t.en} /></h3>
                    <p><T fr={s.d.fr} en={s.d.en} /></p>
                    <Info s={s} />
                    <Tags s={s} />
                  </article>
                ))}
              </div>
              {list.length > 0 && (
                <>
                  <h3 className="group-title" data-reveal><T fr="Également à découvrir" en="Also worth discovering" /></h3>
                  <ul className="more-sites" data-stagger>
                    {list.map((s) => (
                      <li key={s.slug}>
                        <span className="pi"><Icon name={s.icon} /></span>
                        <div><h3><T fr={s.t.fr} en={s.t.en} /></h3><p><T fr={s.d.fr} en={s.d.en} /></p><Info s={s} /><Tags s={s} /></div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </section>
        );
      })}

      <div className="band" aria-hidden="true" />
      <section className="sec sec-dark">
        <div className="wrap split">
          <div>
            <p className="kicker" data-reveal><T fr="Avant de partir" en="Before you go" /></p>
            <h2 data-reveal><T fr="Randonner en respectant les lieux" en="Hike with respect" /></h2>
            <ul className="list-check" data-stagger>
              <li><T fr="Partez avec un guide qui connaît les sentiers et les familles : la mairie et la Villa Boutanga peuvent vous orienter" en="Go with a guide who knows the paths and the families: the town hall and Villa Boutanga can point you to one" /></li>
              <li><T fr="Les forêts, grottes et sites sacrés se visitent sur autorisation du chef ou des notables" en="Sacred forests, caves and sites need permission from the chief or notables" /></li>
              <li><T fr="Plusieurs chutes ne sont accessibles qu'à pied : privilégiez la saison sèche, de novembre à février" en="Several waterfalls are reachable only on foot: choose the dry season, from November to February" /></li>
              <li><T fr="Prévoyez de bonnes chaussures, de l'eau et une veste légère" en="Bring good shoes, water and a light jacket" /></li>
            </ul>
          </div>
          <div className="deco" data-reveal="clip"><figure className="frame" style={{ margin: 0 }}><Img k="tagny3" /></figure></div>
        </div>
      </section>
    </>
  );
}
