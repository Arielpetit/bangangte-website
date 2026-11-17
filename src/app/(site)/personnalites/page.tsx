import Link from "next/link";
import { PeopleGroup } from "@/components/PersonCard";
import { Icon, Img, SecHead, T } from "@/components/ui";
import { meta } from "@/lib/meta";
import { CULTURAL_TIERS, POLITICAL_TIERS, TRADITIONAL_TIERS, type Tier } from "@/lib/people";
import { Hero } from "@/components/Hero";

export const metadata = meta("Personnalités", "Notable people", "Les sept chefs traditionnels, les élus et ministres, les artistes, sportifs et médecins : les grandes figures de Bangangté, classées par rang.");

const NOTABLES = [
  ["Menkam Njalan", "deuxième", "second"], ["Nja Njeuh Nya", "quatrième", "fourth"], ["Nja Tchumguet", "cinquième", "fifth"],
  ["Nja Nsoub Ngaheu", "sixième", "sixth"], ["Menkam Yomi", "septième", "seventh"], ["Menmafeun Nga Ndoumane", "huitième", "eighth"], ["Tei Nsoub Nziki", "neuvième", "ninth"],
];

function TierBlock({ tier, level }: { tier: Tier; level?: number }) {
  const solo = tier.people.length === 1;
  return (
    <div className={`tier${tier.cols === 3 ? " cols3" : ""}`}>
      <div className="patriarche-tier-label" data-reveal>
        <div className="pi"><Icon name={tier.icon} /></div>
        <h3><T fr={tier.title.fr} en={tier.title.en} /></h3>
        {tier.badge ? <span className="tier-lvl"><T fr={tier.badge.fr} en={tier.badge.en} /></span> : level && <span className="tier-lvl"><T fr={`Rang ${level}`} en={`Rank ${level}`} /></span>}
      </div>
      <div className={solo ? "patriarche-feat" : undefined} data-reveal={solo ? "" : undefined}>
        <PeopleGroup people={tier.people} />
      </div>
    </div>
  );
}

export default function Personnalites() {
  return (
    <>
      <Hero page="personnalites"
        crumb={{ fr: "Personnalités", en: "Notable people" }}
        kicker={{ fr: "Noblesse, dignité, élégance", en: "Nobility, dignity, elegance" }}
        title={{ fr: "Personnalités", en: "People" }}
        lead={{ fr: "Les sept chefs traditionnels, les élus et ministres, puis les artistes, sportifs et médecins : les fils et filles de Bangangté qui rayonnent.", en: "The seven traditional chiefs, elected officials and ministers, then the artists, athletes and doctors: the sons and daughters of Bangangté who shine." }}
        img="rituel"
        inset="femme1"
        badge={{ big: "7", small: { fr: "chefs traditionnels", en: "traditional chiefs" } }}
      />

      <section className="sec" id="tradition">
        <div className="wrap">
          <nav className="cat-nav" aria-label="Sections" data-reveal>
            <a href="#tradition"><T fr="Autorité traditionnelle" en="Traditional authority" /></a>
            <a href="#politique"><T fr="Vie politique" en="Politics" /></a>
            <a href="#culture"><T fr="Culture, sport et société" en="Culture, sport and society" /></a>
          </nav>
          <SecHead kicker={{ fr: "Autorité traditionnelle", en: "Traditional authority" }} title={{ fr: "Les sept chefs de la commune", en: "The council's seven chiefs" }} text={{ fr: "Sept royaumes, sept souverains. Le chef supérieur de Bangangté, de 1er degré, est présenté en premier ; les six chefs de 2e degré viennent ensuite, à égalité et par ordre alphabétique.", en: "Seven kingdoms, seven sovereigns. The paramount chief of Bangangté, of the 1st degree, comes first; the six 2nd-degree chiefs follow, on equal footing and in alphabetical order." }} />
          {TRADITIONAL_TIERS.map((t) => <TierBlock key={t.id} tier={t} />)}
          <div className="btn-row" data-reveal style={{ marginTop: "1.4rem" }}>
            <Link className="btn btn-solid" href="/chefferies"><T fr="Les sept chefferies en détail" en="The seven chiefdoms in detail" /><Icon name="arrow" /></Link>
          </div>
        </div>
      </section>

      <div className="band" aria-hidden="true" />
      <section className="sec sec-dark">
        <div className="wrap split">
          <div>
            <p className="kicker" data-reveal><T fr="Chefferie de Bangangté" en="Bangangté chiefdom" /></p>
            <h2 data-reveal><T fr="Le Conseil des neuf notables" en="The Council of Nine Notables" /></h2>
            <p className="lead" data-reveal><T fr="Auprès du roi de Bangangté, neuf notables assistent le souverain dans les grandes décisions. La société Mandjong, force de défense et d'ordre coutumier, veille sur les cérémonies royales et les lieux sacrés." en="Alongside the king of Bangangté, nine notables advise the sovereign on major decisions. The Mandjong society, the customary guard, watches over royal ceremonies and sacred places." /></p>
            <ul className="list-check" data-stagger>
              {NOTABLES.map(([n, fr, en]) => <li key={n}>{n}, <T fr={`${fr} notable`} en={`${en} notable`} /></li>)}
            </ul>
          </div>
          <div className="deco" data-reveal="clip"><figure className="frame" style={{ margin: 0 }}><Img k="mandjong" /></figure></div>
        </div>
      </section>

      <section className="sec sec-alt" id="politique">
        <div className="wrap">
          <SecHead kicker={{ fr: "Vie politique", en: "Politics" }} title={{ fr: "Du sommet de l'État à la mairie", en: "From the top of the State to the town hall" }} text={{ fr: "Les personnalités politiques sont classées par rang : l'État, le gouvernement, le Parlement, puis la commune.", en: "Political figures are ranked: the State, government, Parliament, then the council." }} />
          {POLITICAL_TIERS.map((t, i) => <TierBlock key={t.id} tier={t} level={i + 1} />)}
        </div>
      </section>

      <section className="sec" id="culture">
        <div className="wrap">
          <SecHead kicker={{ fr: "Culture, sport et société", en: "Culture, sport and society" }} title={{ fr: "Artistes, champions et médecins", en: "Artists, champions and doctors" }} text={{ fr: "Les figures de la culture, du sport et de la société civile, séparées de la vie politique.", en: "Figures from culture, sport and civil society, kept apart from politics." }} />
          {CULTURAL_TIERS.map((t) => <TierBlock key={t.id} tier={t} />)}
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap split">
          <div>
            <h2 data-reveal><T fr="Une personnalité à ajouter ?" en="Someone missing?" /></h2>
            <p className="lead" data-reveal><T fr="Artistes, sportifs, entrepreneurs, enseignants : proposez une personnalité de Bangangté avec une courte biographie et une photo." en="Artists, athletes, entrepreneurs, teachers: suggest someone from Bangangté with a short biography and a photo." /></p>
          </div>
          <div className="btn-row" data-reveal><Link className="btn btn-solid" href="/contact"><T fr="Proposer une personnalité" en="Suggest someone" /><Icon name="arrow" /></Link></div>
        </div>
      </section>
    </>
  );
}
