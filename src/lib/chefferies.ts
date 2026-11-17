import type { ImgKey } from "./images";
import type { Bi } from "./nav";

// Les sept chefferies supérieures de la commune.
// Source : ancien site de la Commune de Bangangté (communedebangangte.net, page « Les chefferies traditionnelles », archivée en 2022).
// Données enrichies le 16 novembre 2026 : villages.cm, batchingou.net, bangang-fokam-developpement.org, page Facebook de la Commune.
// Superficies et populations : chiffres publiés par la commune à l'époque, à actualiser avec les chefferies.

export type Chefferie = {
  slug: string;
  name: string;
  degree: 1 | 2;
  king: string; // souverain cité par la commune
  since: string | null;
  area: number; // km²
  population: number | null;
  img?: ImgKey; // portrait du souverain
  place?: ImgKey; // photo de la chefferie ou du site
  history: Bi;
  sites: Bi[];
  festivals?: Bi[];
};

const FR = (fr: string, en: string): Bi => ({ fr, en });

export const CHEFFERIES: Chefferie[] = [
  {
    slug: "bangangte", name: "Bangangté", degree: 1, king: "S.M. Nji Monluh Seidou Pokam", since: "1987", area: 605, population: null, img: "roi2",
    history: FR(
      "Le plus grand et le plus peuplé des treize royaumes du Ndé. Il est gouverné par la dynastie Mveun Nga', fondée par Ngami, frère jumeau de Kammi, le fondateur de Bangang-Fokam. Comme son frère, Ngami était chasseur ; il s'est imposé aux souverains de son époque par son habileté et ses largesses.",
      "The largest and most populous of the Ndé's thirteen kingdoms. It is ruled by the Mveun Nga' dynasty, founded by Ngami, twin brother of Kammi, who founded Bangang-Fokam. Like his brother, Ngami was a hunter; he won over the rulers of his day through his skill and generosity.",
    ),
    sites: [FR("Lâkâm, palais et lieu de cérémonies royales", "Lâkâm, the royal palace and ceremony grounds"), FR("Mbwregoum, rite initiatique royal", "Mbwregoum, royal initiation rite"), FR("Grotte de Ntock-Si, vers Toukop", "Ntock-Si cave, near Toukop"), FR("Forêt sacrée de Feulem", "Feulem sacred forest"), FR("Le Ndiankatse, cours d'eau en labyrinthe", "The Ndiankatse, a maze-like stream"), FR("Rochers de Mfeuchen et de Mfeun Ngwa", "Mfeuchen and Mfeun Ngwa rocks"), FR("Pierre de Nekem", "Nekem stone"), FR("Chute de l'IRAD, à Mango'o", "IRAD falls, at Mango'o")],
    festivals: [FR("Lâkâm, cérémonie annuelle du roi", "Lâkâm, the king's annual ceremony"), FR("COMENGA, Congrès mondial du peuple Bangangté (tous les 2 ans)", "COMENGA, World Congress of the Bangangté people (biennial)")],
  },
  {
    slug: "bangoulap", name: "Bangoulap", degree: 2, king: "S.M. Yonkeu Jean Marie", since: "2004", area: 54, population: 17000, img: "roi_bangoulap",
    history: FR(
      "Dirigé depuis des siècles par la famille Mfeun Nzoua, issue de Nzouamy venu de Baloumgou (Bangou). Bangoulap est l'un des groupements les plus organisés de la commune, porté par la solidarité de ses fils et filles. Il a connu 23 rois.",
      "Ruled for centuries by the Mfeun Nzoua family, descended from Nzouamy, who came from Baloumgou (Bangou). Bangoulap is one of the council's best-organised groupements, driven by the solidarity of its sons and daughters. It has had 23 kings.",
    ),
    sites: [FR("Chutes de Baba", "Baba falls"), FR("Lieu sacré de Nsi Tagni", "Nsi Tagni sacred site"), FR("Forge traditionnelle de Lafeng", "Traditional forge at Lafeng"), FR("Plateau sacré de Tagni", "Tagni sacred plateau"), FR("Rocher aux hyènes de Nyamga", "Hyena rock at Nyamga")],
    festivals: [FR("Danses traditionnelles Mangambeu, Lah et Ngou", "Traditional Mangambeu, Lah and Ngou dances")],
  },
  {
    slug: "bangoua", name: "Bangoua", degree: 2, king: "S.M. Djampou Tchatchouang Anick Julio", since: "2001", area: 67, population: 19000, img: "roi_bangoua", place: "palais_bangoua",
    history: FR(
      "La grande figure de l'histoire de Bangoua est le roi Nono Tchoutouo, le roi « aux longs ongles » de la tradition orale, qui régna près de 70 ans. Il créa la fête du macabo, encore célébrée en novembre tous les deux ans pour commémorer son retour d'exil.",
      "The great figure of Bangoua's history is King Nono Tchoutouo, the 'long-nailed' king of oral tradition, who reigned for nearly 70 years. He founded the macabo festival, still held every other November to mark his return from exile.",
    ),
    sites: [FR("Chutes et cascade de Lono", "Waterfalls and the Lono cascade"), FR("Rocher aux corbeaux", "Crow rock"), FR("Rivière aux neuf affluents (Tah Mveu)", "River of nine tributaries (Tah Mveu)"), FR("Grotte aux hyènes", "Hyena cave"), FR("Musée royal", "Royal museum"), FR("Place royale", "Royal square"), FR("Forêt sacrée de Sa Majesté", "His Majesty's sacred forest")],
    festivals: [FR("Fête du macabo (novembre, tous les 2 ans)", "Macabo festival (November, biennial)")],
  },
  {
    slug: "bangang-fokam", name: "Bangang-Fokam", degree: 2, king: "S.M. Jules Roland Kouatchou", since: null, area: 69, population: 12000, img: "roi_bangang_fokam", place: "chef_bangang_fokam",
    history: FR(
      "Fondé au XVIIe siècle par Kammi (ou Kamegne), prince venu du royaume de Banka, dans l'actuel Haut-Nkam, et frère jumeau de Ngami, fondateur de Bangangté. Chasseur d'éléphants, Kammi avait la réputation d'un homme intègre et généreux.",
      "Founded in the 17th century by Kammi (or Kamegne), a prince from the kingdom of Banka in today's Haut-Nkam and twin brother of Ngami, founder of Bangangté. An elephant hunter, Kammi was known as an honest and generous man.",
    ),
    sites: [FR("Palais royal", "Royal palace"), FR("Grotte royale", "Royal cave"), FR("Lâkâm, lieu de cérémonies", "Lâkâm ceremony grounds"), FR("Plantations de Sa Majesté", "His Majesty's plantations")],
  },
  {
    slug: "batchingou", name: "Batchingou", degree: 2, king: "S.M. Nana André Flaubert", since: "1982", area: 39, population: 13407, img: "roi_batchingou", place: "mont_batchingou",
    history: FR(
      "Fondé par Folefack, venu de Baleng près de Bafoussam ; ses deux frères s'installèrent à Bangou et à Balengou. Longtemps rattaché à Bafoussam, Batchingou rejoint la subdivision de Bangangté le 28 avril 1940. Sa Majesté Nana André Flaubert, 12e souverain de sa lignée, est sur le trône depuis 1982. C'est l'une des zones les plus densément peuplées de l'arrondissement.",
      "Founded by Folefack, who came from Baleng near Bafoussam; his two brothers settled in Bangou and Balengou. Long attached to Bafoussam, Batchingou joined the Bangangté subdivision on 28 April 1940. His Majesty Nana André Flaubert, 12th sovereign of his line, has reigned since 1982. It is one of the most densely populated parts of the subdivision.",
    ),
    sites: [FR("Lieu sacré de She-Shia et sa grande chute, à 12 km", "She-Shia sacred site and its great waterfall, 12 km away"), FR("Grotte aux neuf chambres, traversée par un cours d'eau", "Nine-chamber cave, crossed by a stream"), FR("Salle royale en bambou", "Royal bamboo hall"), FR("Massif de Batchingou", "Batchingou massif")],
    festivals: [FR("Festival Gah'chou (FECUGA), annuel, novembre–décembre", "Gah'chou festival (FECUGA), annual, November–December"), FR("Danse traditionnelle Kougang", "Traditional Kougang dance")],
  },
  {
    slug: "bahouoc", name: "Bahouoc", degree: 2, king: "S.M. Kemajou (Nkamajou) Roger II", since: "1984", area: 7, population: 939, img: "roi_bahouoc",
    history: FR(
      "Le plus petit royaume de la commune est, selon la tradition orale, le plus ancien du Ndé : tous les rois lui reconnaissent cette antériorité. Selon la légende, Ketoutse, fondateur de la famille régnante, serait sorti des eaux de la rivière qui porte son nom. Sa dynastie, Mfeunghaze, signifie « le chef qui ouvre le chemin ».",
      "The council's smallest kingdom is, according to oral tradition, the oldest in the Ndé, and every king acknowledges its seniority. Legend says Ketoutse, founder of the ruling family, rose from the waters of the river that bears his name. The dynasty's name, Mfeunghaze, means 'the chief who opens the way'.",
    ),
    sites: [FR("Rivière Ketoutse", "Ketoutse river"), FR("Palais royal", "Royal palace"), FR("Les neuf pierres sacrées", "The nine sacred stones")],
  },
  {
    slug: "bamena", name: "Bamena", degree: 2, king: "S.M. Njoukwe Alexandre", since: "1995", area: 48, population: 7055, img: "roi_bamena", place: "chef_bamena",
    history: FR(
      "Les Bamena sont connus dans le Ndé comme un peuple d'éleveurs et de mangeurs de chèvre. La légende raconte qu'en pleine disette, un fils du pays ramena à la chefferie un gibier inattendu : une chèvre. Les fils et filles du groupement se retrouvent lors du Congrès de l'émergence du village, organisé notamment en 2024 et 2026.",
      "The Bamena are known across the Ndé as a people of herders and goat-eaters. Legend has it that during a harsh famine, a son of the land brought an unexpected catch back to the palace: a goat. Sons and daughters of the groupement gather at the Village Emergence Congress, held notably in 2024 and 2026.",
    ),
    sites: [FR("Place de la chefferie", "Chiefdom square")],
    festivals: [FR("Fête de la Chèvre", "Festival of the Goat"), FR("Danse Nkam", "Nkam dance"), FR("Festival Nzwue", "Nzwue festival"), FR("Congrès de l'émergence du village (2024, 2026)", "Village Emergence Congress (2024, 2026)")],
  },
];
