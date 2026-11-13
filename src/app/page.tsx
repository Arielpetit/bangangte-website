import Link from "next/link";
import { Collage } from "@/components/Collage";
import { UpcomingEvents } from "@/components/Events";
import { Countdown, Gallery } from "@/components/Interactive";
import { Credit, Icon, Img, Media, SecHead, SplitTitle, T } from "@/components/ui";
import { meta } from "@/lib/meta";
import { SITES } from "@/lib/sites";

export const metadata = meta("Bangangté, ville du Ndé", "Bangangté, town of the Ndé", "Découvrez Bangangté, chef-lieu du Ndé dans l'Ouest Cameroun : histoire, personnalités, chutes et grottes, culture medumba, agenda et services de la mairie.");

export default function Home() {
  return (
    <>
      <section className="home">
        <div className="wrap home-grid">
          <div>
            <p className="kicker fade-in" style={{ ["--d" as string]: ".1s" }}><T fr="Ba'gha'nte' : ceux qui refusent la domination" en="Ba'gha'nte': those who refuse domination" /></p>
            <SplitTitle text={{ fr: "Bangangté", en: "Bangangté" }} base={0.2} />
            <p className="lead fade-in" style={{ ["--d" as string]: ".7s" }}>
              <T fr="Chef-lieu du Ndé, ville propre des hauts plateaux bamiléké et porte des chutes, des grottes et des collines du pays medumba." en="Capital of the Ndé, the clean town of the Bamiléké highlands and gateway to the waterfalls, caves and hills of Medumba country." />
            </p>
            <div className="btn-row fade-in" style={{ ["--d" as string]: ".85s" }}>
              <Link className="btn btn-gold" href="/nature"><T fr="Explorer les sites" en="Explore the sights" /><Icon name="arrow" /></Link>
              <Link className="btn btn-glass" href="/histoire"><T fr="Découvrir l'histoire" en="Discover the history" /></Link>
            </div>
            <div className="home-stats fade-in" style={{ ["--d" as string]: "1s" }}>
              <div><b data-count="56">56</b><span><T fr="villages et quartiers" en="villages and quarters" /></span></div>
              <div><b data-count="605" data-suffix=" km²">605 km²</b><span><T fr="de groupement" en="of land" /></span></div>
              <div><b data-count="15">15</b><span><T fr="rois depuis 1665" en="kings since 1665" /></span></div>
              <div><b>1961</b><span><T fr="chef-lieu du Ndé" en="Ndé capital" /></span></div>
            </div>
          </div>
          <div className="ph-visual">
            <div className="arch"><Img k="femme1" w={960} priority /></div>
            <div className="ph-badge">1665<small><T fr="Fondation du royaume" en="Kingdom founded" /></small></div>
          </div>
        </div>
        <p className="ph-credit"><Credit k="femme1" /></p>
      </section>

      <section className="sec">
        <div className="wrap split">
          <div>
            <p className="kicker" data-reveal><T fr="Bienvenue" en="Welcome" /></p>
            <h2 data-reveal><T fr="Une ville à taille humaine, un royaume de trois siècles et demi" en="A town on a human scale, a kingdom three and a half centuries old" /></h2>
            <p className="lead" data-reveal><T fr="Au cœur des hauts plateaux de l'Ouest, Bangangté réunit une administration moderne, une université, des marchés animés et un patrimoine bamiléké toujours vivant." en="In the heart of the western highlands, Bangangté brings together a modern administration, a university, busy markets and a living Bamiléké heritage." /></p>
            <ul className="list-check" data-stagger>
              <li><T fr="Plusieurs fois désignée ville la plus propre du Cameroun" en="Named Cameroon's cleanest town several times" /></li>
              <li><T fr="Siège de l'Université des Montagnes, fondée en 2000" en="Home of the Université des Montagnes, founded in 2000" /></li>
              <li><T fr="Un nouvel hôtel de ville depuis 2022 et un marché central de 304 boutiques" en="A new town hall since 2022 and a 304-shop central market" /></li>
            </ul>
            <Link className="btn btn-solid" data-reveal href="/ville"><T fr="Découvrir la ville" en="Discover the town" /><Icon name="arrow" /></Link>
          </div>
          <div className="deco" data-reveal="clip"><figure className="frame fit" style={{ margin: 0 }}><Img k="hdv" /></figure></div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <SecHead kicker={{ fr: "Que faire à Bangangté", en: "Things to do" }} title={{ fr: "Six façons de découvrir le pays medumba", en: "Six ways to discover Medumba country" }} aside={<Link className="link-arrow" data-reveal href="/nature"><T fr="Tous les sites" en="All sights" /><Icon name="arrow" /></Link>} />
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

      <div className="band" aria-hidden="true" />
      <section className="sec sec-dark" id="comenga">
        <div className="wrap split">
          <div>
            <p className="kicker" data-reveal><T fr="Du 25 novembre au 6 décembre 2026" en="25 November to 6 December 2026" /></p>
            <h2 data-reveal>COMENGA 2026</h2>
            <p className="lead" data-reveal><T fr="Le 5e Congrès mondial des fils et filles Bangangté réunit la diaspora et le terroir sur le thème « Un peuple, un roi, une culture »." en="The 5th World Congress of the Bangangté people brings the diaspora home around the theme “One people, one king, one culture”." /></p>
            <div data-reveal><Countdown /></div>
            <div className="btn-row" data-reveal>
              <Link className="btn btn-gold" href="/agenda"><T fr="Voir l'agenda" en="See the events" /><Icon name="arrow" /></Link>
              <a className="btn btn-glass" href="https://www.chefferie-superieure-bangangte.com/comenga" rel="noopener" target="_blank"><T fr="Programme officiel" en="Official programme" /></a>
            </div>
          </div>
          <Collage />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead kicker={{ fr: "À ne pas manquer", en: "Don't miss" }} title={{ fr: "Sites et patrimoine", en: "Sights and heritage" }} text={{ fr: `${SITES.length} sites : palais royal, lieux sacrés, chutes, grottes, musées et chefferies, à rejoindre depuis Bangangté.`, en: `${SITES.length} sights: the royal palace, sacred places, waterfalls, caves, museums and chiefdoms, all within reach of Bangangté.` }} aside={<Link className="link-arrow" data-reveal href="/nature"><T fr={`Voir les ${SITES.length} sites`} en={`See all ${SITES.length} sights`} /><Icon name="arrow" /></Link>} />
          <div className="g3" data-stagger>
            <Link className="card" href="/nature"><Media k="chuteB2" w={960} /><h3><T fr="Chutes de Bangoua" en="Bangoua falls" /></h3><p><T fr="Avec le rocher Loukik, au bord de l'axe Bangangté–Bafoussam." en="With the Loukik rock, beside the Bangangté–Bafoussam road." /></p></Link>
            <Link className="card" href="/nature#gacha"><Media k="gacha" /><h3><T fr="Fondation Gacha, Bangoulap" en="Gacha Foundation, Bangoulap" /></h3><p><T fr="Cases patrimoniales, centre culturel, ateliers et maison d'hôtes à 7 km de la ville." en="Heritage houses, a cultural centre, workshops and a guesthouse 7 km from town." /></p></Link>
            <Link className="card" href="/nature"><Media k="bazou" w={960} /><h3><T fr="Chefferie de Bazou" en="Bazou chiefdom" /></h3><p><T fr="Cases à toit conique et patrimoine royal du Ndé." en="Cone-roofed houses and royal heritage of the Ndé." /></p></Link>
          </div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap split rev">
          <div>
            <p className="quote" data-reveal><T fr="Noblesse, dignité, élégance : la devise d'un peuple qui garde ses racines." en="Nobility, dignity, elegance: the motto of a people who keep their roots." /></p>
            <p className="lead" data-reveal><T fr="Depuis 1987, Sa Majesté Nji Monluh Seidou Pokam, 15e roi de la dynastie Mveun Nga', conduit le royaume vers la modernité. Ingénieur agronome, il est à l'origine du COMENGA." en="Since 1987, His Majesty Nji Monluh Seidou Pokam, 15th king of the Mveun Nga' dynasty, has led the kingdom into the modern era. An agricultural engineer, he founded COMENGA." /></p>
            <div className="btn-row" data-reveal>
              <Link className="btn btn-solid" href="/personnalites"><T fr="Les grandes figures" en="Leading figures" /><Icon name="arrow" /></Link>
              <Link className="btn btn-line" href="/histoire#rois"><T fr="Les 15 rois" en="The 15 kings" /></Link>
            </div>
          </div>
          <div className="deco" data-reveal="clip"><figure className="frame" style={{ margin: 0 }}><Img k="roi2" /></figure></div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead kicker={{ fr: "Agenda", en: "Events" }} title={{ fr: "Aussi à l'agenda", en: "Also coming up" }} text={{ fr: "Après le COMENGA : fêtes, festivals et randonnées à ne pas manquer à Bangangté et dans le Ndé.", en: "Beyond COMENGA: celebrations, festivals and hikes not to miss in Bangangté and the Ndé." }} aside={<Link className="link-arrow" data-reveal href="/agenda"><T fr="Tout l'agenda" en="All events" /><Icon name="arrow" /></Link>} />
          <div data-reveal><UpcomingEvents /></div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <SecHead kicker={{ fr: "Actualités", en: "News" }} title={{ fr: "La vie de la commune", en: "Life in the commune" }} aside={<a className="link-arrow" data-reveal href="https://www.facebook.com/commune.bangangte/" rel="noopener" target="_blank"><T fr="Toutes les actualités sur Facebook" en="All news on Facebook" /><Icon name="arrow" /></a>} />
          <div className="news">
            <a className="card news-main" data-reveal href="https://www.minhdu.gov.cm/en/bangangte-en-marche-la-visite-ministerielle-accelere-la-transformation-urbaine-du-nde/" rel="noopener" target="_blank">
              <Media k="aerial2" />
              <span className="date"><T fr="23 octobre 2026" en="23 October 2026" /></span>
              <h3><T fr="Le ministre de l'Habitat inspecte les chantiers urbains" en="The Housing Minister inspects urban works" /></h3>
              <p><T fr="Aires de jeux, voies d'accès aux écoles, drainage et réhabilitation des voiries : la transformation urbaine du Ndé avance." en="Playgrounds, school access roads, drainage and road repairs: urban renewal in the Ndé is moving ahead." /></p>
            </a>
            <div className="news-side" data-stagger>
              <a className="card" href="https://www.chefferie-superieure-bangangte.com/news" rel="noopener" target="_blank"><div className="media"><Img k="roi" w={330} /></div><div><span className="date"><T fr="1er septembre 2026" en="1 September 2026" /></span><h3><T fr="Le roi de retour à Bangangté" en="The king returns to Bangangté" /></h3></div></a>
              <a className="card" href="https://www.camer.be/actualites/societe/cameroun-le-cfpa-participe-au-tout-premier-marche-bio-de-la-ville-de-bangangte.html" rel="noopener" target="_blank"><div className="media"><Img k="marche2" w={330} /></div><div><span className="date"><T fr="1er août 2026" en="1 August 2026" /></span><h3><T fr="Premier marché bio de la ville" en="The town's first organic market" /></h3></div></a>
              <a className="card" href="https://www.camer.be/88228/11:1/cameroun-11-fevrier-2025-le-maire-eric-niat-offre-un-spectacle-de-ouf-a-la-jeunesse-de-bangangte-cameroon.html" rel="noopener" target="_blank"><div className="media"><Img k="stade" w={330} /></div><div><span className="date"><T fr="11 février 2025" en="11 February 2025" /></span><h3><T fr="Concert géant pour la Fête de la jeunesse" en="A big concert for Youth Day" /></h3></div></a>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead kicker={{ fr: "Galerie", en: "Gallery" }} title={{ fr: "Bangangté en images", en: "Bangangté in pictures" }} text={{ fr: "Touchez une photo pour l'agrandir, puis naviguez avec les flèches.", en: "Tap a photo to enlarge it, then use the arrows to browse." }} aside={<Link className="btn btn-solid" data-reveal href="/galerie"><T fr="Toute la galerie" en="Full gallery" /><Icon name="arrow" /></Link>} />
          <Gallery items={["festival", "chuteB", "femme3", "palais_bangoua", "mandjong", "taro", "rituel"]} />
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap g2">
          <Link className="tile" style={{ minHeight: 320 }} href="/sejourner" data-reveal><Img k="ouest" w={1280} /><div className="tile-body"><h3><T fr="Préparer votre séjour" en="Plan your stay" /></h3><p style={{ maxHeight: "none", opacity: 1 }}><T fr="Hôtels, restaurants, accès, saison idéale et conseils pratiques." en="Hotels, restaurants, getting here, best season and practical tips." /></p></div></Link>
          <Link className="tile" style={{ minHeight: 320 }} href="/contact" data-reveal><Img k="hdv" /><div className="tile-body"><h3><T fr="Contacter la mairie" en="Contact the town hall" /></h3><p style={{ maxHeight: "none", opacity: 1 }}><T fr="Adresse, plan d'accès, horaires et formulaire de contact." en="Address, map, opening hours and contact form." /></p></div></Link>
        </div>
      </section>
    </>
  );
}
