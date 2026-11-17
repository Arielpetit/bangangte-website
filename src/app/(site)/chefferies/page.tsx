import Link from "next/link";
import { Icon, Img, SecHead, T } from "@/components/ui";
import { CHEFFERIES } from "@/lib/chefferies";
import { meta } from "@/lib/meta";
import { Hero } from "@/components/Hero";

export const metadata = meta("Les chefferies traditionnelles", "Traditional chiefdoms", "Les sept chefferies supérieures de la commune de Bangangté : histoire, souverains, superficie, population et sites à découvrir.");

const nf = (n: number) => n.toLocaleString("fr-FR");

export default function Chefferies() {
  const area = CHEFFERIES.reduce((s, c) => s + c.area, 0);
  return (
    <>
      <Hero page="chefferies"
        crumb={{ fr: "Chefferies", en: "Chiefdoms" }}
        kicker={{ fr: "Découvrir", en: "Discover" }}
        title={{ fr: "Les chefferies", en: "The chiefdoms" }}
        lead={{ fr: "Sept royaumes, une commune. Chacun a son roi, son palais, son histoire et ses lieux sacrés.", en: "Seven kingdoms, one council. Each has its king, its palace, its history and its sacred places." }}
        img="roi2"
        inset="palais_bangoua"
        badge={{ big: "7", small: { fr: "chefferies supérieures", en: "paramount chiefdoms" } }}
        facts={CHEFFERIES.map((c) => ({ fr: c.name, en: c.name }))}
      />

      <section className="sec">
        <div className="wrap split">
          <div>
            <p className="kicker" data-reveal><T fr="L'organisation coutumière" en="Customary organisation" /></p>
            <h2 data-reveal><T fr="Un chef pour chaque village" en="A chief for every village" /></h2>
            <p className="lead" data-reveal><T fr="Les sept villages de la commune ont chacun à leur tête un chef supérieur, de premier ou de deuxième degré, entouré de ses notables." en="Each of the council's seven villages is led by a paramount chief, of the first or second degree, surrounded by notables." /></p>
            <p data-reveal><T fr="La coutume est gardée par les anciens et les notables, héritiers de la tradition. Ils conseillent les familles lors des mariages, des successions et des veuvages, et veillent au respect des rites." en="Custom is kept by the elders and notables, heirs of the tradition. They advise families on marriages, successions and widowhood, and see that the rites are respected." /></p>
            <ul className="chef-ranks" data-stagger>
              <li><b>1</b><span><T fr="chef de 1er degré, à Bangangté" en="first-degree chief, in Bangangté" /></span></li>
              <li><b>6</b><span><T fr="chefs de 2e degré : Bahouoc, Bangoulap, Bangoua, Batchingou, Bangang-Fokam et Bamena" en="second-degree chiefs: Bahouoc, Bangoulap, Bangoua, Batchingou, Bangang-Fokam and Bamena" /></span></li>
              <li><b>50+</b><span><T fr="chefs de 3e degré, dont une dizaine dans le centre urbain" en="third-degree chiefs, about ten of them in the town centre" /></span></li>
            </ul>
          </div>
          <div className="deco" data-reveal="clip"><figure className="frame" style={{ margin: 0 }}><Img k="ouest" /></figure></div>
        </div>
      </section>

      <section className="sec sec-alt" id="hierarchie">
        <div className="wrap">
          <SecHead kicker={{ fr: "Organisation coutumière", en: "Customary organisation" }} title={{ fr: "La hiérarchie des chefferies", en: "The chiefdom hierarchy" }} text={{ fr: "Trois niveaux de chefferies structurent la vie traditionnelle de la commune, du chef supérieur de 1er degré aux chefs de quartier de 3e degré.", en: "Three levels of chiefdoms structure traditional life in the council, from the 1st-degree paramount chief to the 3rd-degree neighbourhood chiefs." }} />
          <div className="trad-hier">
            {/* Niveau 1 */}
            <div className="trad-tier">
              <div className="trad-tier-label"><span><T fr="1er degré" en="1st degree" /></span></div>
              <div className="trad-node top" data-reveal style={{ width: "min(100%,420px)" }}>
                <div className="pi"><Icon name="mask" /></div>
                <div>
                  <strong>{CHEFFERIES[0].king}</strong>
                  <small><T fr={`Roi des ${CHEFFERIES[0].name} · depuis ${CHEFFERIES[0].since}`} en={`King of the ${CHEFFERIES[0].name} · since ${CHEFFERIES[0].since}`} /></small>
                </div>
              </div>
            </div>
            <div className="trad-vbar" aria-hidden="true" />
            {/* Niveau 2 */}
            <div className="trad-tier" style={{ width: "100%" }}>
              <div className="trad-tier-label"><span><T fr="2e degré" en="2nd degree" /></span></div>
              <div className="trad-row" data-stagger>
                {CHEFFERIES.filter((c) => c.degree === 2).map((c) => (
                  <div key={c.slug} className="trad-node">
                    <div className="pi"><Icon name="landmark" /></div>
                    <div>
                      <strong>{c.king}</strong>
                      <small><T fr={`Roi de ${c.name}${c.since ? ` · depuis ${c.since}` : ""}`} en={`King of ${c.name}${c.since ? ` · since ${c.since}` : ""}`} /></small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="trad-vbar" aria-hidden="true" />
            {/* Niveau 3 */}
            <div className="trad-tier" style={{ width: "min(100%,420px)" }}>
              <div className="trad-tier-label"><span><T fr="3e degré" en="3rd degree" /></span></div>
              <div className="trad-node-3rd" data-reveal>
                <b>50+</b>
                <span><T fr="chefs de quartier et de village, dont une dizaine en centre-ville" en="neighbourhood and village chiefs, about ten in the town centre" /></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="royaumes">
        <div className="wrap">
          <SecHead kicker={{ fr: "Les sept royaumes", en: "The seven kingdoms" }} title={{ fr: "Histoire, souverains et sites", en: "History, rulers and sights" }} text={{ fr: `Ensemble, les sept groupements couvrent près de ${nf(area)} km².`, en: `Together, the seven groupements cover about ${area.toLocaleString("en-GB")} km².` }} />
          <nav className="cat-nav" aria-label="Chefferies / Chiefdoms" data-reveal>
            {CHEFFERIES.map((c) => <a key={c.slug} href={`#${c.slug}`}>{c.name}</a>)}
          </nav>
          <div className="chefs">
            {CHEFFERIES.map((c) => (
              <article key={c.slug} id={c.slug} className={`chef${c.img ? "" : " no-img"}`} data-reveal>
                {c.img && <figure className={`chef-media${c.place ? " has-place" : ""}`}><Img k={c.img} />{c.place && <Img k={c.place} className="chef-place" />}</figure>}
                <div className="chef-body">
                  <p className="kicker">{c.degree === 1 ? <T fr="Chefferie de 1er degré" en="First-degree chiefdom" /> : <T fr="Chefferie de 2e degré" en="Second-degree chiefdom" />}</p>
                  <h3><T fr={`Royaume ${c.name}`} en={`Kingdom of ${c.name}`} /></h3>
                  <dl className="chef-facts">
                    <div><dt><T fr="Souverain" en="Ruler" /></dt><dd>{c.king}{c.since && <span><T fr={` depuis ${c.since}`} en={` since ${c.since}`} /></span>}</dd></div>
                    <div><dt><T fr="Superficie" en="Area" /></dt><dd>{nf(c.area)} km²</dd></div>
                    {c.population && <div><dt><T fr="Population" en="Population" /></dt><dd><T fr={`environ ${nf(c.population)} hab.`} en={`about ${c.population.toLocaleString("en-GB")}`} /></dd></div>}
                  </dl>
                  <p><T fr={c.history.fr} en={c.history.en} /></p>
                  {c.sites.length > 0 && (
                    <>
                      <h4><Icon name="pin" /> <T fr="À découvrir" en="Worth seeing" /></h4>
                      <ul className="tags">{c.sites.map((s) => <li key={s.fr}><T fr={s.fr} en={s.en} /></li>)}</ul>
                    </>
                  )}
                  {c.festivals && c.festivals.length > 0 && (
                    <>
                      <h4><Icon name="users" /> <T fr="Fêtes et cérémonies" en="Festivals and ceremonies" /></h4>
                      <ul className="tags">{c.festivals.map((f) => <li key={f.fr}><T fr={f.fr} en={f.en} /></li>)}</ul>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
          <p className="note" style={{ marginTop: "2rem" }}><Icon name="check" className="icon" /> <T fr="Source : Commune de Bangangté, « Les chefferies traditionnelles ». Superficies et populations publiées par la commune, à actualiser auprès des chefferies." en="Source: Bangangté council, “Traditional chiefdoms”. Areas and populations as published by the council, to be updated with the chiefdoms." /></p>
        </div>
      </section>

      <section className="sec sec-dark">
        <div className="wrap split">
          <div>
            <p className="kicker" data-reveal><T fr="Visiter" en="Visit" /></p>
            <h2 data-reveal><T fr="Palais, forêts sacrées et chutes" en="Palaces, sacred forests and waterfalls" /></h2>
            <p className="lead" data-reveal><T fr="Les palais et les lieux sacrés se visitent sur autorisation du chef ou des notables. Partez avec un guide." en="Palaces and sacred places can be visited with permission from the chief or notables. Go with a guide." /></p>
            <Link className="btn" data-reveal href="/nature"><T fr="Tous les sites à découvrir" en="All the sights" /><Icon name="arrow" /></Link>
          </div>
          <div className="deco" data-reveal="clip"><figure className="frame" style={{ margin: 0 }}><Img k="trone" /></figure></div>
        </div>
      </section>
    </>
  );
}
