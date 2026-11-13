import Link from "next/link";
import { PeopleGroup } from "@/components/PersonCard";
import { Icon, Img, SecHead, T } from "@/components/ui";
import { meta } from "@/lib/meta";
import { ARTS, FIGURES, OTHERS, POLITICS, ROIS, SPORT } from "@/lib/people";
import { Hero } from "@/components/Hero";

export const metadata = meta("Personnalités", "Notable people", "Le roi, les notables, les maires, ministres, médecins, diplomates et écrivains : les grandes figures de Bangangté.");

const NOTABLES = [
  ["Menkam Njalan", "deuxième", "second"], ["Nja Njeuh Nya", "quatrième", "fourth"], ["Nja Tchumguet", "cinquième", "fifth"],
  ["Nja Nsoub Ngaheu", "sixième", "sixth"], ["Menkam Yomi", "septième", "seventh"], ["Menmafeun Nga Ndoumane", "huitième", "eighth"], ["Tei Nsoub Nziki", "neuvième", "ninth"],
];

export default function Personnalites() {
  return (
    <>
      <Hero page="personnalites"
        crumb={{ fr: "Personnalités", en: "Notable people" }}
        kicker={{ fr: "Noblesse, dignité, élégance", en: "Nobility, dignity, elegance" }}
        title={{ fr: "Personnalités", en: "People" }}
        lead={{ fr: "Autour du roi, des notables et des fils et filles de Bangangté qui rayonnent en politique, en médecine, en diplomatie et en culture.", en: "Around the king, the notables and the sons and daughters of Bangangté who shine in politics, medicine, diplomacy and culture." }}
        img="roi"
        inset="femme1"
        badge={{ big: <T fr="15e" en="15th" />, small: { fr: "roi des Bangangté", en: "king of the Bangangté" } }}
      />

      <section className="sec">
        <div className="wrap split">
          <div className="deco" data-reveal="clip"><figure className="frame" style={{ margin: 0 }}><Img k="roi2" /></figure></div>
          <div>
            <p className="kicker" data-reveal><T fr="Chef supérieur des Bangangté" en="Paramount chief of the Bangangté" /></p>
            <h2 data-reveal><T fr="Sa Majesté Nji Monluh Seidou Pokam" en="His Majesty Nji Monluh Seidou Pokam" /></h2>
            <p className="lead" data-reveal><T fr="15e roi de la dynastie Mveun Nga', sur le trône depuis 1987." en="15th king of the Mveun Nga' dynasty, on the throne since 1987." /></p>
            <p data-reveal><T fr="Ingénieur agronome, gardien des traditions et président des procès coutumiers, il est le seul maître des rituels ancestraux du Mbwregoum. Il est aussi l'initiateur du COMENGA, le congrès mondial des Bangangté. Son titre, Nzui Manto, évoque la panthère royale." en="An agricultural engineer, keeper of traditions and presiding judge of customary courts, he alone leads the ancestral rites of the Mbwregoum. He also founded COMENGA, the world congress of the Bangangté. His title, Nzui Manto, refers to the royal panther." /></p>
            <a className="btn btn-line" data-reveal href="https://www.chefferie-superieure-bangangte.com/" rel="noopener" target="_blank"><T fr="Site de la Chefferie supérieure" en="Paramount chiefdom website" /></a>
          </div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <SecHead kicker={{ fr: "Grandes figures", en: "Leading figures" }} title={{ fr: "Ils ont marqué l'histoire du Cameroun", en: "They left their mark on Cameroon" }} />
          <PeopleGroup people={FIGURES} />
          <h3 className="group-title" data-reveal><T fr="Rois des chefferies voisines" en="Kings of neighbouring chiefdoms" /></h3>
          <PeopleGroup people={ROIS} />
          <h3 className="group-title" data-reveal><T fr="Vie politique" en="Politics" /></h3>
          <PeopleGroup people={POLITICS} />
          <h3 className="group-title" data-reveal><T fr="Médecine, éducation, diplomatie et diaspora" en="Medicine, education, diplomacy and diaspora" /></h3>
          <PeopleGroup people={OTHERS} />
          <h3 className="group-title" data-reveal><T fr="Arts, lettres et médias" en="Arts, letters and media" /></h3>
          <PeopleGroup people={ARTS} />
          <h3 className="group-title" data-reveal><T fr="Sport : footballeurs internationaux et champions" en="Sport: international footballers and champions" /></h3>
          <PeopleGroup people={SPORT} />
        </div>
      </section>

      <div className="band" aria-hidden="true" />
      <section className="sec sec-dark">
        <div className="wrap split">
          <div>
            <p className="kicker" data-reveal><T fr="Autour du roi" en="Around the king" /></p>
            <h2 data-reveal><T fr="Le Conseil des neuf notables" en="The Council of Nine Notables" /></h2>
            <p className="lead" data-reveal><T fr="Neuf notables assistent le roi dans les grandes décisions. La société Mandjong, force de défense et d'ordre coutumier, veille sur les cérémonies royales et les lieux sacrés." en="Nine notables advise the king on major decisions. The Mandjong society, the customary guard, watches over royal ceremonies and sacred places." /></p>
            <ul className="list-check" data-stagger>
              {NOTABLES.map(([n, fr, en]) => <li key={n}>{n}, <T fr={`${fr} notable`} en={`${en} notable`} /></li>)}
            </ul>
          </div>
          <div className="deco" data-reveal="clip"><figure className="frame" style={{ margin: 0 }}><Img k="mandjong" /></figure></div>
        </div>
      </section>

      <section className="sec">
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
