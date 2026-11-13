import Link from "next/link";
import { PeopleGroup } from "@/components/PersonCard";
import { Icon, Img, SecHead, T } from "@/components/ui";
import type { ImgKey } from "@/lib/images";
import { meta } from "@/lib/meta";
import type { Person } from "@/lib/people";
import { Hero } from "@/components/Hero";

export const metadata = meta("Histoire", "History", "Origine du nom, fondation vers 1660, dynastie Mveun Nga', période coloniale, maires et histoire de la commune de Bangangté.");

const ERAS: { img: ImgKey; year: string; when: { fr: string; en: string }; t: { fr: string; en: string }; d: { fr: string; en: string } }[] = [
  { img: "tagny2", year: "1660", when: { fr: "Vers 1660", en: "Around 1660" }, t: { fr: "La fondation", en: "The founding" }, d: { fr: "Deux princes venus de Banka, Ngami et Kameni, s'installent sur les terres de trois chefs locaux. Ngami est accepté comme roi et fonde la dynastie Mveun Nga', qui règne encore aujourd'hui.", en: "Two princes from Banka, Ngami and Kameni, settle on the lands of three local chiefs. Ngami is accepted as king and founds the Mveun Nga' dynasty, which still reigns today." } },
  { img: "zing", year: "XVIIe", when: { fr: "Depuis le XVIIe siècle", en: "Since the 17th century" }, t: { fr: "Une société organisée", en: "An organised society" }, d: { fr: "La vie du groupement suit un calendrier traditionnel à semaine de huit jours. Il rythme encore aujourd'hui les jours de marché, les travaux des champs et les cérémonies.", en: "Life in the group follows a traditional calendar with an eight-day week. It still sets the rhythm of market days, farm work and ceremonies today." } },
  { img: "mandjong", year: "1800", when: { fr: "XIXe siècle", en: "19th century" }, t: { fr: "Résistance et consolidation", en: "Resistance and consolidation" }, d: { fr: "Les rois mènent des guerres d'expansion et de défense et sécurisent les frontières, avec l'appui des sociétés coutumières comme le Mandjong. Nya II règne 45 ans, le plus long règne de la dynastie.", en: "The kings wage wars of expansion and defence and secure the borders, supported by customary societies such as the Mandjong. Nya II reigns for 45 years, the longest reign in the dynasty." } },
  { img: "babou", year: "1912", when: { fr: "1912 – 1960", en: "1912 – 1960" }, t: { fr: "La période coloniale", en: "The colonial era" }, d: { fr: "Le royaume traverse la colonisation allemande puis française. Le poste administratif de Bangangté est créé le 14 juin 1930, la subdivision en 1931 et la commune en 1954.", en: "The kingdom lives through German then French colonial rule. The Bangangté administrative post is created on 14 June 1930, the subdivision in 1931 and the council in 1954." } },
  { img: "aerial", year: "1961", when: { fr: "1960 – 1961", en: "1960 – 1961" }, t: { fr: "Chef-lieu du Ndé", en: "Capital of the Ndé" }, d: { fr: "La subdivision devient département en 1960 et prend le nom de Ndé par décret du 3 février 1961, avec Bangangté pour chef-lieu.", en: "The subdivision becomes a division in 1960 and is named Ndé by decree on 3 February 1961, with Bangangté as its capital." } },
  { img: "roi2", year: "1987", when: { fr: "Depuis 1987", en: "Since 1987" }, t: { fr: "L'ère moderne", en: "The modern era" }, d: { fr: "Sa Majesté Nji Monluh Seidou Pokam, 15e roi, conduit le royaume vers la modernité. L'Université des Montagnes ouvre ses portes en 2000.", en: "His Majesty Nji Monluh Seidou Pokam, the 15th king, leads the kingdom into the modern era. The Université des Montagnes opens in 2000." } },
  { img: "hdv", year: "2022", when: { fr: "2022 et après", en: "2022 and beyond" }, t: { fr: "Une ville qui se transforme", en: "A changing town" }, d: { fr: "Nouvel hôtel de ville, marché central, voiries rénovées et COMENGA : Bangangté prépare son avenir avec sa diaspora.", en: "A new town hall, central market, renewed roads and COMENGA: Bangangté is building its future with its diaspora." } },
];

const KINGS = [["Ngami Ier", "1665 – 1701"], ["Tshamngo", "1701 – 1706"], ["Menaton", "1706 – 1748"], ["Mbiatat", "1748 – 1780"], ["Ngassam Ier", "1780 – 1804"], ["Nya Ier", "1804 – 1805"], ["Nzike Ier", "1805 – 1840"], ["Nya II", "1840 – 1885"], ["Ngassam II", "1885 – 1891"], ["Yomi", "1891 – 1895"], ["Tchatchoua", "1895 – 1912"], ["Nzike II", "1912 – 1943"], ["Pokam Njike Robert", "1943 – 1974"], ["Njike Pokam François", "1974 – 1987"]];

const EARLIER: [string, string][] = [
  ["Paul Nana", "1961 – 1978"], ["Émile Ngoumgnia Kamgoum", "1978 – 1980"], ["François Yanzeu", "1980 – 1982"],
  ["Jacques Alimoka", "1982 – 1983"], ["Thomas Léoué Yetenje", "1984 – 1987"], ["Jean-Claude Tzeuton", "1987 – 1995"],
  ["Jean-Calvin Djeudam", "1995 – 1996"], ["Thomas Tchatchoua", "1996 – 2002"],
];

const MAYORS: Person[] = [
  { slug: "marcel-niat-njifenji", name: "Marcel Niat Njifenji", initials: "MN", img: "niat", role: { fr: "2002 – 2007", en: "2002 – 2007" }, text: { fr: "Ingénieur, devenu le premier président du Sénat du Cameroun.", en: "An engineer who became the first President of the Senate of Cameroon." } },
  { slug: "celestine-ketcha-courtes", name: "Célestine Ketcha Courtès", initials: "CK", img: "ketcha", role: { fr: "2007 – 2018", en: "2007 – 2018" }, text: { fr: "Puis ministre de l'Habitat et du Développement urbain.", en: "Then Minister of Housing and Urban Development." } },
  { slug: "jonas-kouamouo", name: "Jonas Kouamouo", initials: "JK", role: { fr: "2019 – 2021", en: "2019 – 2021" }, text: { fr: "Pharmacien et enseignant à l'Université des Montagnes.", en: "Pharmacist and lecturer at the Université des Montagnes." } },
  { slug: "eric-niat", name: "Éric Niat", initials: "ÉN", role: { fr: "Depuis mai 2021", en: "Since May 2021" }, text: { fr: "Fils de Marcel Niat Njifenji, il a inauguré le nouvel hôtel de ville en 2022.", en: "Son of Marcel Niat Njifenji, he opened the new town hall in 2022." } },
];

export default function Histoire() {
  return (
    <>
      <Hero page="histoire"
        crumb={{ fr: "Histoire", en: "History" }}
        kicker={{ fr: "Plus de 350 ans d'histoire", en: "More than 350 years of history" }}
        title={{ fr: "Histoire", en: "History" }}
        lead={{ fr: "D'un royaume bamiléké fondé au XVIIe siècle au chef-lieu moderne du département du Ndé.", en: "From a Bamiléké kingdom founded in the 17th century to the modern capital of the Ndé division." }}
        img="dynastie"
        inset="mandjong"
        badge={{ big: "1665", small: { fr: "Premier roi", en: "First king" } }}
        facts={[{ fr: "Fondé vers 1660", en: "Founded around 1660" }, { fr: "Dynastie Mveun Nga'", en: "Mveun Nga' dynasty" }, { fr: "15 rois", en: "15 kings" }]}
      />

      <section className="sec">
        <div className="wrap split">
          <div>
            <p className="kicker" data-reveal><T fr="Le nom" en="The name" /></p>
            <h2 data-reveal>Ba&apos;gha&apos;nte&apos;</h2>
            <p className="quote" data-reveal><T fr="Ceux qui refusent la domination." en="Those who refuse domination." /></p>
            <p className="lead" data-reveal><T fr={<>Le nom vient du medumba : <em>Ba&apos;</em>, « ceux qui », et <em>gha&apos;nte&apos;</em>, « refusent la domination ». Il résume l&apos;identité d&apos;un peuple fier et insoumis.</>} en={<>The name comes from Medumba: <em>Ba&apos;</em>, “those who”, and <em>gha&apos;nte&apos;</em>, “refuse domination”. It sums up the identity of a proud, independent people.</>} /></p>
            <p data-reveal><T fr="Selon la Chefferie supérieure, le groupement couvre environ 605 km² et compte plus de 150 000 habitants dans le centre-ville et 56 villages. C'est le plus grand groupement de l'Ouest après le royaume bamoun." en="According to the paramount chiefdom, the group covers about 605 km² and has over 150,000 people in the town centre and 56 villages. It is the largest group in the West after the Bamoun kingdom." /></p>
          </div>
          <div className="deco" data-reveal="clip"><figure className="frame" style={{ margin: 0 }}><Img k="femme2" /></figure></div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <SecHead kicker={{ fr: "Les grandes époques", en: "The great eras" }} title={{ fr: "Trois siècles et demi d'histoire", en: "Three and a half centuries of history" }} text={{ fr: "Des origines à nos jours, les moments qui ont façonné le royaume et la ville.", en: "From the beginnings to today, the moments that shaped the kingdom and the town." }} />
          <div className="zz">
            {ERAS.map((e) => (
              <article key={e.year} className="zz-row">
                <div className="zz-media">
                  <figure className="frame" style={{ margin: 0 }} data-reveal="clip"><Img k={e.img} /></figure>
                  <span className="zz-year" data-reveal>{e.year}</span>
                </div>
                <div className="zz-text" data-reveal>
                  <span className="when"><T fr={e.when.fr} en={e.when.en} /></span>
                  <h3><T fr={e.t.fr} en={e.t.en} /></h3>
                  <p><T fr={e.d.fr} en={e.d.en} /></p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="band" aria-hidden="true" />
      <section className="sec sec-dark" id="rois">
        <div className="wrap">
          <SecHead kicker={{ fr: "Dynastie Mveun Nga'", en: "Mveun Nga' dynasty" }} title={{ fr: "Les 15 rois des Bangangté", en: "The 15 kings of the Bangangté" }} text={{ fr: "Plus de trois siècles et demi de règne ininterrompu. Faites glisser pour parcourir la lignée.", en: "More than three and a half centuries of unbroken rule. Swipe to follow the line." }} />
          <ol className="dyn" data-stagger>
            {KINGS.map(([n, y]) => <li key={n}><strong>{n}</strong><span>{y}</span></li>)}
            <li className="now"><strong>Nji Monluh Seidou Pokam</strong><span><T fr="Depuis 1987" en="Since 1987" /></span></li>
          </ol>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead kicker={{ fr: "La commune", en: "The council" }} title={{ fr: "Les maires de Bangangté", en: "The mayors of Bangangté" }} text={{ fr: "Créée en 1954, la commune est dirigée par des administrateurs jusqu'en 1961, puis par des maires dont plusieurs sont devenus des figures nationales.", en: "Created in 1954, the council was run by administrators until 1961, then by mayors, several of whom became national figures." }} aside={<Link className="link-arrow" data-reveal href="/personnalites"><T fr="Toutes les personnalités" en="All notable people" /><Icon name="arrow" /></Link>} />
          <PeopleGroup people={MAYORS} />
          <h3 className="group-title" data-reveal><T fr="Les maires précédents" en="Earlier mayors" /></h3>
          <ul className="more-sites" data-stagger>
            {EARLIER.map(([n, y]) => <li key={n}><span className="pi"><Icon name="landmark" /></span><div><h3>{n}</h3><p>{y}</p></div></li>)}
          </ul>
        </div>
      </section>
    </>
  );
}
