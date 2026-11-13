import Link from "next/link";
import { Gallery } from "@/components/Interactive";
import { Img, Media, PageHero, SecHead, T } from "@/components/ui";
import type { ImgKey } from "@/lib/images";
import { meta } from "@/lib/meta";

export const metadata = meta("Culture et saveurs", "Culture and food", "Langue medumba, danses, masques, ndop, musées, cuisine bamiléké, marchés et artisanat de Bangangté.");

type Card = { img: ImgKey; t: { fr: string; en: string }; d: { fr: string; en: string } };

const TRADITIONS: Card[] = [
  { img: "festival", t: { fr: "Danses et musiques", en: "Dance and music" }, d: { fr: "Danses masquées, tambours, chapeaux à plumes et costumes brodés animent les grandes cérémonies.", en: "Masked dances, drums, feather hats and embroidered costumes bring major ceremonies to life." } },
  { img: "mandjong", t: { fr: "La société Mandjong", en: "The Mandjong society" }, d: { fr: "Gardienne du royaume, elle apparaît lors des cérémonies avec ses masques sculptés.", en: "Guardian of the kingdom, it appears at ceremonies with its carved masks." } },
  { img: "ndop", t: { fr: "Le ndop", en: "Ndop cloth" }, d: { fr: "L'étoffe indigo à motifs blancs des Grassfields, autrefois réservée aux rois et aux notables. Elle inspire l'identité de ce site.", en: "The indigo cloth with white patterns of the Grassfields, once reserved for kings and notables. It inspires this site's design." } },
  { img: "sculpture", t: { fr: "Sculpture sur bois", en: "Woodcarving" }, d: { fr: "Trônes, statues et piliers sculptés racontent les rois et les reines des chefferies du Ndé.", en: "Thrones, statues and carved pillars tell the story of the kings and queens of the Ndé chiefdoms." } },
  { img: "statues", t: { fr: "Musée de Bangoua", en: "Bangoua museum" }, d: { fr: "Le célèbre masque de la reine et l'art de la chasse, dans une case patrimoniale ouverte en 2011.", en: "The famous queen's mask and the art of hunting, in a heritage house opened in 2011." } },
  { img: "bazou_chef", t: { fr: "Parures royales", en: "Royal regalia" }, d: { fr: "Perles, plumes et étoffes : les costumes des chefs, comme celui du chef de Bazou, sont de véritables œuvres d'art.", en: "Beads, feathers and cloth: chiefs' costumes, like that of the Bazou chief, are true works of art." } },
];

const FOOD: Card[] = [
  { img: "taro", t: { fr: "Taro à la sauce jaune", en: "Taro with yellow sauce" }, d: { fr: "Le taro pilé, servi avec une sauce jaune à l'huile de palme et aux épices, est le plat des grandes occasions bamiléké.", en: "Pounded taro served with a yellow palm-oil and spice sauce is the dish for great Bamiléké occasions." } },
  { img: "achu", t: { fr: "L'achu des Grassfields", en: "Achu from the Grassfields" }, d: { fr: "Un voisin du taro à la sauce jaune : on creuse la purée de taro au centre de l'assiette pour y verser la sauce, avec des bananes bouillies.", en: "A cousin of taro with yellow sauce: the taro purée is hollowed out in the middle of the plate and filled with the sauce, alongside boiled bananas." } },
  { img: "koki", t: { fr: "Koki", en: "Koki" }, d: { fr: "Un gâteau de haricots pilés, relevé à l'huile de palme, cuit à la vapeur dans des feuilles de bananier. On le sert avec des plantains mûrs ou des ignames.", en: "A pounded-bean cake with palm oil, steamed in banana leaves. Served with ripe plantains or yams." } },
  { img: "haricots", t: { fr: "Haricots et plantain", en: "Beans and plantain" }, d: { fr: "Le haricot est de tous les repas au Cameroun : mijoté à l'huile de palme et accompagné de plantain bouilli ou frit.", en: "Beans feature in everyday meals across Cameroon: simmered in palm oil and served with boiled or fried plantain." } },
  { img: "ndole", t: { fr: "Ndolè", en: "Ndolè" }, d: { fr: "Le plat national du Cameroun : feuilles amères, arachides, viande ou crevettes, servi avec plantains mûrs frits, bâton de manioc ou miondo.", en: "Cameroon's national dish: bitter leaves, groundnuts, meat or shrimp, served with fried ripe plantains, cassava sticks or miondo." } },
  { img: "bhb", t: { fr: "Beignets, haricots et bouillie", en: "Doughnuts, beans and porridge" }, d: { fr: "Le petit-déjeuner populaire des marchés et des bords de route : beignets dorés, haricots à l'huile de palme et bouillie de maïs chaude.", en: "The popular breakfast at markets and roadsides: golden doughnuts, beans in palm oil and hot maize porridge." } },
];

export default function Culture() {
  return (
    <>
      <PageHero
        crumb={{ fr: "Culture et saveurs", en: "Culture and food" }}
        kicker={{ fr: "Le pays medumba", en: "Medumba country" }}
        title={{ fr: "Culture et saveurs", en: "Culture and food" }}
        lead={{ fr: "Une langue, des danses, des masques, des étoffes et une cuisine transmis de génération en génération.", en: "A language, dances, masks, cloth and food passed down from generation to generation." }}
        img="femme3"
        inset="ndop"
        facts={[{ fr: "Medumba", en: "Medumba" }, { fr: "Ndop", en: "Ndop" }, { fr: "Mandjong", en: "Mandjong" }, { fr: "Koki", en: "Koki" }]}
      />

      <section className="sec">
        <div className="wrap split">
          <div>
            <p className="kicker" data-reveal><T fr="La langue" en="The language" /></p>
            <h2 data-reveal><T fr="Le medumba, langue du Ndé" en="Medumba, the language of the Ndé" /></h2>
            <p className="lead" data-reveal><T fr="Une langue bamiléké parlée à Bangangté, Bakong, Bangoulap, Bahouoc, Bagnoun et Tonga, qui donne son nom à la ville elle-même." en="A Bamiléké language spoken in Bangangté, Bakong, Bangoulap, Bahouoc, Bagnoun and Tonga, which gives the town its very name." /></p>
            <p data-reveal><T fr="Depuis 1995, le Festival des arts et de la culture medumba la fait vivre pendant quinze jours, tous les deux ans en juillet. Le groupement suit aussi un calendrier traditionnel à semaine de huit jours, qui rythme marchés et cérémonies." en="Since 1995, the Medumba Arts and Culture Festival has kept it alive for fifteen days every other July. The group also follows a traditional calendar with an eight-day week that sets the rhythm of markets and ceremonies." /></p>
          </div>
          <div className="deco" data-reveal="clip"><figure className="frame" style={{ margin: 0 }}><Img k="femme2" /></figure></div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <SecHead kicker={{ fr: "Traditions et patrimoine", en: "Traditions and heritage" }} title={{ fr: "Ce qui fait l'âme du Ndé", en: "The soul of the Ndé" }} text={{ fr: "Le patrimoine se vit dans les fêtes, les funérailles et les cérémonies royales, autant que dans les musées.", en: "Heritage lives in festivals, funerals and royal ceremonies as much as in museums." }} />
          <div className="g3" data-stagger>
            {TRADITIONS.map((c) => <article key={c.img} className="card"><Media k={c.img} /><h3><T fr={c.t.fr} en={c.t.en} /></h3><p><T fr={c.d.fr} en={c.d.en} /></p></article>)}
          </div>
        </div>
      </section>

      <section className="sec" id="table">
        <div className="wrap">
          <SecHead kicker={{ fr: "À table", en: "At the table" }} title={{ fr: "À goûter à Bangangté et dans l'Ouest", en: "What to taste in Bangangté and the West" }} text={{ fr: "La cuisine bamiléké se partage en famille, lors des mariages, des baptêmes, des funérailles et des fêtes, avec quelques grands classiques camerounais.", en: "Bamiléké food is shared with family at weddings, christenings, funerals and festivals, alongside a few great Cameroonian classics." }} />
          <div className="g3" data-stagger>
            {FOOD.map((c) => <article key={c.img} className="card"><Media k={c.img} /><h3><T fr={c.t.fr} en={c.t.en} /></h3><p><T fr={c.d.fr} en={c.d.en} /></p></article>)}
          </div>
        </div>
      </section>

      <div className="band" aria-hidden="true" />
      <section className="sec sec-dark">
        <div className="wrap g2">
          <div>
            <p className="kicker" data-reveal><T fr="Les marchés" en="Markets" /></p>
            <h2 data-reveal><T fr="Goûter, acheter, rencontrer" en="Taste, shop, meet people" /></h2>
            <ul className="list-check" data-stagger>
              <li><T fr={<><strong>Grand marché du samedi</strong>, aux marchés A et B : produits frais, tissus, vêtements, quincaillerie</>} en={<><strong>Big Saturday market</strong>, at Markets A and B: fresh food, fabric, clothes, hardware</>} /></li>
              <li><T fr={<><strong>Petit marché du mercredi</strong>, aux mêmes marchés</>} en={<><strong>Small Wednesday market</strong>, at the same markets</>} /></li>
              <li><T fr={<><strong>Marché central</strong> : 304 boutiques et une gare routière</>} en={<><strong>Central market</strong>: 304 shops and a bus station</>} /></li>
              <li><T fr={<><strong>Marché bio</strong>, esplanade de l&apos;ancienne mairie : première édition le 1er août 2026</>} en={<><strong>Organic market</strong>, old town hall square: first held on 1 August 2026</>} /></li>
            </ul>
          </div>
          <div>
            <p className="kicker" data-reveal><T fr="Artisanat" en="Crafts" /></p>
            <h2 data-reveal><T fr="Les mains du Ndé" en="The hands of the Ndé" /></h2>
            <p className="lead" data-reveal><T fr="Sculpture sur bois, perlage, ferronnerie, tissage et agro-transformation. À Bangoulap, la Fondation Jean-Félicien Gacha accueille des ateliers de perlage et de ferronnerie." en="Woodcarving, beadwork, ironwork, weaving and food processing. At Bangoulap, the Jean-Félicien Gacha Foundation hosts beadwork and ironwork workshops." /></p>
            <div className="btn-row" data-reveal>
              <Link className="btn btn-gold" href="/nature#gacha"><T fr="Découvrir la Fondation Gacha" en="Discover the Gacha Foundation" /></Link>
              <Link className="btn btn-glass" href="/contact"><T fr="Se faire référencer" en="Get listed" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead kicker={{ fr: "Galerie", en: "Gallery" }} title={{ fr: "Couleurs du pays medumba", en: "Colours of Medumba country" }} />
          <Gallery items={["danse1", "rituel", "zing", "trone", "femme4", "masque", "partage"]} />
        </div>
      </section>
    </>
  );
}
