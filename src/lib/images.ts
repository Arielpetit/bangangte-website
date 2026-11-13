// Photos sous licence libre (Wikimedia Commons) et photos locales du dossier public/images.
// Copies hébergées dans Supabase Storage (bucket « media », dossier site/) : voir scripts/upload-site-images.mjs.
import hostedJson from "@/content/site-images.json";

const HOSTED = hostedJson as Record<string, Partial<Record<"500" | "1280", string>> | string>;

export type ImageInfo = {
  path: string; // chemin Commons, ou chemin local commençant par "/"
  width: number;
  author: string;
  license: string;
  fr: string;
  en: string;
};

export const IMG = {
  femme1: { path: "0/05/Bamileke_woman_in_traditional_funeral_attire%28feather_hat_and_embroidered_tunic%29%2C_Bangangt%C3%A9%2C_Cameroon.jpg_01.jpg", width: 3024, author: "Patrick Yakeu", license: "CC BY-SA 4.0", fr: "Femme de Bangangté en tenue de cérémonie", en: "A Bangangté woman in ceremonial dress" },
  femme2: { path: "f/fb/Bamileke_woman_in_traditional_funeral_attire%28feather_hat_and_embroidered_tunic%29%2C_Bangangt%C3%A9%2C_Cameroon.jpg_02.jpg", width: 3024, author: "Patrick Yakeu", license: "CC BY-SA 4.0", fr: "Chapeau à plumes et tunique brodée, Bangangté", en: "Feather hat and embroidered tunic, Bangangté" },
  femme3: { path: "1/1e/Bamileke_woman_in_traditional_funeral_attire%28feather_hat_and_embroidered_tunic%29%2C_Bangangt%C3%A9%2C_Cameroon.jpg_03.jpg", width: 3024, author: "Patrick Yakeu", license: "CC BY-SA 4.0", fr: "Femmes en tenue de cérémonie à Bangangté", en: "Women in ceremonial dress in Bangangté" },
  femme4: { path: "8/83/Bamileke_woman_in_traditional_funeral_attire%28feather_hat_and_embroidered_tunic%29%2C_Bangangt%C3%A9%2C_Cameroon.jpg_04.jpg", width: 3024, author: "Patrick Yakeu", license: "CC BY-SA 4.0", fr: "Cérémonie traditionnelle à Bangangté", en: "Traditional ceremony in Bangangté" },
  danse1: { path: "1/11/Funeral_ceremony_in_Bangangt%C3%A9_-_Traditional_dance_and_costume_01.jpg", width: 3024, author: "Patrick Yakeu", license: "CC BY-SA 4.0", fr: "Danse traditionnelle à Bangangté", en: "Traditional dance in Bangangté" },
  danse2: { path: "5/52/Funeral_ceremony_in_Bangangt%C3%A9_-_Traditional_dance_and_costume_02.jpg", width: 3024, author: "Patrick Yakeu", license: "CC BY-SA 4.0", fr: "Danseurs en costume traditionnel à Bangangté", en: "Dancers in traditional costume in Bangangté" },
  aerial: { path: "f/f2/Vue_a%C3%A9rienne_de_Bangangt%C3%A9_Vall%C3%A9e_Ouest_Cameroun.jpg", width: 1080, author: "Nadnad30", license: "CC BY-SA 4.0", fr: "Vue aérienne de Bangangté", en: "Aerial view of Bangangté" },
  aerial2: { path: "d/df/Vue_a%C3%A9rienne_de_Bangangt%C3%A9_Vall%C3%A9e_Ouest_Cameroun2.jpg", width: 1080, author: "Nadnad30", license: "CC BY-SA 4.0", fr: "La vallée de Bangangté vue du ciel", en: "The Bangangté valley from above" },
  ouest: { path: "f/fd/Ouest_Cameroun2.jpg", width: 4032, author: "ArnoBOUJIKA", license: "CC0", fr: "Paysage des hauts plateaux de l'Ouest Cameroun", en: "Highland landscape in West Cameroon" },
  stade: { path: "7/7b/Football_Stadium_in_Bangangt%C3%A9%2C_Cameroon.jpg", width: 3648, author: "Alecdhuse", license: "CC BY-SA 3.0", fr: "Match au stade de Bangangté", en: "A match at the Bangangté stadium" },
  defile: { path: "a/a1/Chef_de_bataillon_Retrait%C3%A9_NANA_GONGA.jpg", width: 661, author: "TcHuisss", license: "CC BY-SA 4.0", fr: "Le chef de bataillon retraité Nana Gonga au défilé du 20 mai 2002 à Bangangté", en: "Retired Major Nana Gonga at the 20 May 2002 parade in Bangangté" },
  udm5: { path: "e/e0/Udm5.jpg", width: 4608, author: "Awonox", license: "CC BY-SA 3.0", fr: "Amphithéâtre de l'Université des Montagnes", en: "Lecture hall at the Université des Montagnes" },
  udm1: { path: "1/1b/Udm1.JPG", width: 1024, author: "Awonox", license: "CC BY-SA 3.0", fr: "Travaux pratiques de chirurgie dentaire à l'Université des Montagnes", en: "Dental surgery practical at the Université des Montagnes" },
  roi: { path: "4/47/S.M_Nji_Moluh_Pokam_Seidou%2C_Roi_des_Bangangt%C3%A9.jpg", width: 3360, author: "Alain Ndanga", license: "CC BY-SA 4.0", fr: "Sa Majesté Nji Monluh Seidou Pokam, roi des Bangangté", en: "His Majesty Nji Monluh Seidou Pokam, King of the Bangangté" },
  roi2: { path: "b/bd/Nji_Monluh_Seidou_Pokam_de_Bangangte%2C_West_Province%2C_Cameroon.jpg", width: 3468, author: "Alfred Weidinger", license: "CC BY 2.0", fr: "Sa Majesté Nji Monluh Seidou Pokam sur son trône", en: "His Majesty Nji Monluh Seidou Pokam on his throne" },
  ketcha: { path: "e/ef/Celestine_Ketcha_Courtes_at_Peace_Corps_ceremony.JPG", width: 448, author: "Peace Corps", license: "Domaine public", fr: "Célestine Ketcha Courtès", en: "Célestine Ketcha Courtès" },
  niat: { path: "b/b2/Marcel_Niat_Njifenji.jpg", width: 1750, author: "Dtseekstruth", license: "CC BY-SA 3.0", fr: "Marcel Niat Njifenji", en: "Marcel Niat Njifenji" },
  dynastie: { path: "9/9c/Bangangt%C3%A9_Kings_Dynasty.jpg", width: 1694, author: "Alec Dhuse", license: "CC BY-SA 4.0", fr: "Tableau de la dynastie des rois Bangangté", en: "Board of the Bangangté royal dynasty" },
  mandjong: { path: "7/7f/Masque_Bamil%C3%A9k%C3%A9_de_la_soci%C3%A9t%C3%A9_secr%C3%A8te_Mandjong-Bangangt%C3%A9.jpg", width: 1964, author: "Ji-Elle", license: "CC BY-SA 4.0", fr: "Masque de la société Mandjong de Bangangté", en: "Mask of the Mandjong society of Bangangté" },
  babou: { path: "7/76/Entr%C3%A9e_Chefferie_Babou.jpg", width: 1600, author: "Princesse Olivia", license: "CC BY-SA 4.0", fr: "Entrée de la chefferie de Babou", en: "Entrance to the Babou chiefdom" },
  bazou: { path: "f/fe/Sortie_Chefferie_Bazou_%C3%A0_l%27Ouest_au_Cameroun.jpg", width: 4000, author: "Harouna674", license: "CC0", fr: "Cases à toit conique de la chefferie de Bazou, dans le Ndé", en: "Cone-roofed houses of the Bazou chiefdom, in the Ndé" },
  bazou_musee: { path: "9/9a/Mus%C3%A9e_en_construction_%C3%A0_la_chefferie_Bazou_%C3%A0_l%27Ouest_au_Cameroun.jpg", width: 4000, author: "Harouna674", license: "CC0", fr: "Musée en construction à la chefferie de Bazou", en: "Museum under construction at the Bazou chiefdom" },
  bazou_chef: { path: "6/64/Costume_du_chef_de_Bazou.jpg", width: 3024, author: "Ji-Elle", license: "CC BY-SA 4.0", fr: "Costume du chef de Bazou", en: "Costume of the Bazou chief" },
  chute: { path: "a/a6/Chute_Bangoua_1.jpg", width: 464, author: "MEKEM Z. Prosper", license: "CC BY-SA 4.0", fr: "Chute d'eau à Bangoua", en: "Waterfall at Bangoua" },
  chute2: { path: "1/14/Chute_Bangoua_2.jpg", width: 464, author: "MEKEM Z. Prosper", license: "CC BY-SA 4.0", fr: "Chute d'eau à Bangoua", en: "Waterfall at Bangoua" },
  grotte: { path: "f/f9/Bangoua_1.jpg", width: 700, author: "MEKEM Z. Prosper", license: "CC BY-SA 4.0", fr: "Rochers et forêt de la grotte de Bangoua", en: "Rocks and forest at the Bangoua cave" },
  grotte2: { path: "a/ac/Grotte-Bangoua.jpg", width: 464, author: "MEKEM Z. Prosper", license: "CC BY-SA 4.0", fr: "Grotte à Bangoua", en: "Cave at Bangoua" },
  monoun: { path: "6/65/Monoun.jpg", width: 2272, author: "Prosper Mekem", license: "CC BY-SA 4.0", fr: "Le lac Monoun, à Nkouoptamo", en: "Lake Monoun, at Nkouoptamo" },
  masque: { path: "7/72/Masque_cimier-Bangoua.jpg", width: 3024, author: "Ji-Elle", license: "CC BY-SA 4.0", fr: "Masque cimier de Bangoua", en: "Crest mask from Bangoua" },
  sculpture: { path: "7/74/Kunst_aus_Bangoua.jpg", width: 2880, author: "KrStr", license: "CC BY-SA 4.0", fr: "Sculptures et trône de Bangoua", en: "Carvings and throne from Bangoua" },
  trone: { path: "a/a8/Tr%C3%B4ne_de_Bangoulap_%28Cameroun%29.jpg", width: 3024, author: "Ji-Elle", license: "CC BY-SA 4.0", fr: "Trône royal de Bangoulap", en: "Royal throne of Bangoulap" },
  reine: { path: "5/53/Statue_de_reine_tatou%C3%A9e-Bangoulap.jpg", width: 1527, author: "Ji-Elle", license: "CC BY-SA 4.0", fr: "Statue de reine tatouée, Bangoulap", en: "Statue of a tattooed queen, Bangoulap" },
  tagny: { path: "2/20/TAGNY-BANGOULAP_3.jpg", width: 800, author: "MEKEM Z. Prosper", license: "CC BY-SA 4.0", fr: "Le site sacré de Tagny, à Bangoulap", en: "The sacred site of Tagny, Bangoulap" },
  tagny2: { path: "7/7b/TAGNY-BANGOULAP.jpg", width: 800, author: "MEKEM Z. Prosper", license: "CC BY-SA 4.0", fr: "Purification et méditation sur le site de Tagny", en: "Purification and meditation at Tagny" },
  tagny3: { path: "7/72/TAGNY-BANGOULAP_4.jpg", width: 400, author: "MEKEM Z. Prosper", license: "CC BY-SA 4.0", fr: "Rituel de purification à Tagny", en: "Purification ritual at Tagny" },
  ndop: { path: "1/1f/Boubou_en_ndop.jpg", width: 2096, author: "serieminou", license: "CC BY-SA 4.0", fr: "Boubou en tissu ndop", en: "Robe made of ndop cloth" },
  zing: { path: "6/60/Dance_traditionnelle_bamileke_ouest_Cameroun_%22Zing%22.jpg", width: 4128, author: "Geremibidias", license: "CC0", fr: "Danse traditionnelle bamiléké", en: "Traditional Bamiléké dance" },
  koki: { path: "a/a5/KOKI_au_feuille_du_bananier.jpg", width: 1920, author: "Essing Moutassi Georges", license: "CC0", fr: "Koki cuit dans des feuilles de bananier", en: "Koki steamed in banana leaves" },
  taro: { path: "1/1d/Taro_sauce_jaune_avec_peau_de_boeuf.jpg", width: 4608, author: "Minette Lontsie", license: "CC BY-SA 4.0", fr: "Taro à la sauce jaune", en: "Taro with yellow sauce" },
  gacha: { path: "e/e5/Case_Mousgoum.jpg", width: 4320, author: "Mouenthias", license: "CC BY-SA 4.0", fr: "Cases Mousgoum reproduites à la Fondation Gacha, Bangoulap", en: "Mousgoum houses rebuilt at the Gacha Foundation, Bangoulap" },
  gacha2: { path: "2/21/Case_du_grand_Nord.jpg", width: 4320, author: "Mouenthias", license: "CC BY-SA 4.0", fr: "Case du Grand Nord à la Fondation Gacha, Bangoulap", en: "Far North house at the Gacha Foundation, Bangoulap" },
  bailly: { path: "8/86/Blanche_Bailly_%28cropped%29.jpg", width: 4243, author: "Feutseu Brice", license: "CC BY-SA 4.0", fr: "Blanche Bailly", en: "Blanche Bailly" },
  nanjip: { path: "1/1f/Cabrel_Nanjip.jpg", width: 4912, author: "Feutseu Brice", license: "CC BY-SA 4.0", fr: "Cabrel Nanjip", en: "Cabrel Nanjip" },
  tchoutang: { path: "5/5c/Bernard_Tchoutang_VOA_%28cropped%29.jpg", width: 1241, author: "Emmanuel Jules Ntap", license: "Domaine public", fr: "Bernard Tchoutang", en: "Bernard Tchoutang" },
  kemen: { path: "d/d1/Olivier_Kemen_20250813.jpg", width: 5152, author: "Zafer", license: "CC BY 4.0", fr: "Olivier Kemen", en: "Olivier Kemen" },
  tchatchoua: { path: "4/42/Jackson_Tchatchoua_01112025_%281%29.jpg", width: 1613, author: "Timmy96", license: "CC0", fr: "Jackson Tchatchoua", en: "Jackson Tchatchoua" },
  chuteB: { path: "6/6b/Chute_Bangoua1.jpg", width: 2448, author: "Hnkamwa", license: "CC BY-SA 4.0", fr: "Chute d'eau dans le village de Bangoua", en: "Waterfall in the village of Bangoua" },
  chuteB2: { path: "b/b0/Chute_Bangoua30.jpg", width: 4928, author: "Hnkamwa", license: "CC BY-SA 4.0", fr: "Les chutes de Bangoua", en: "The Bangoua falls" },
  chuteB3: { path: "6/63/Wasserf%C3%A4lle_von_Bangoua.jpg", width: 6048, author: "KrStr", license: "CC BY-SA 4.0", fr: "Au pied des chutes de Bangoua", en: "At the foot of the Bangoua falls" },
  festival: { path: "0/06/FestivalBangoua.jpg", width: 4032, author: "Happiraphael", license: "CC BY-SA 4.0", fr: "Masques et danseurs au festival de Bangoua", en: "Masks and dancers at the Bangoua festival" },
  rituel: { path: "b/b5/Ritueller_Tanz_in_Bangoua.jpg", width: 6016, author: "KrStr", license: "CC BY-SA 4.0", fr: "Danse rituelle pour les 20 ans de règne du roi de Bangoua", en: "Ritual dance for the Bangoua king's 20th jubilee" },
  palais_bangoua: { path: "6/60/K%C3%B6nigspalast_von_Bangoua.jpg", width: 2880, author: "KrStr", license: "CC BY-SA 4.0", fr: "Le palais royal de Bangoua", en: "The royal palace of Bangoua" },
  musee_bangoua: { path: "9/9d/Mus%C3%A9e_Royal_de_Bangoua.jpg", width: 6000, author: "KrStr", license: "CC BY-SA 4.0", fr: "Salle du musée royal de Bangoua", en: "Gallery in the Bangoua royal museum" },
  statues: { path: "c/c7/Mus%C3%A9e_de_Bangoua.jpg", width: 4064, author: "Nguimatsia Alixone", license: "CC BY-SA 4.0", fr: "Statues exposées au musée de Bangoua", en: "Statues on display at the Bangoua museum" },
  roi_bangoua: { path: "f/f5/S.M_Djampou_Tchatchouang_Anick_Julio%2C_Roi_des_Bangoua.jpg", width: 3264, author: "Alain Ndanga", license: "CC BY-SA 4.0", fr: "S.M. Djampou Tchatchouang Anick Julio, roi des Bangoua", en: "H.M. Djampou Tchatchouang Anick Julio, King of the Bangoua" },
  roi_bangoulap: { path: "0/0a/S.M_Yonkeu_Jean_Marie%2C_Roi_des_Bangoulap.jpg", width: 2136, author: "Alain Ndanga", license: "CC BY-SA 4.0", fr: "S.M. Yonkeu Jean Marie, roi des Bangoulap", en: "H.M. Yonkeu Jean Marie, King of the Bangoulap" },
  roi_bazou: { path: "9/9e/S.M_Tchoua_Kemajou_Vincent%2C_Roi_des_Bazou.jpg", width: 2640, author: "Alain Ndanga", license: "CC BY-SA 4.0", fr: "S.M. Tchoua Kemajou Vincent, roi des Bazou", en: "H.M. Tchoua Kemajou Vincent, King of the Bazou" },
  partage: { path: "0/08/Le_partage.jpg", width: 1300, author: "MEKEM Z. Prosper", license: "CC BY-SA 4.0", fr: "Partage autour du guide spirituel à Tagni, Bangoulap", en: "Sharing around the spiritual guide at Tagni, Bangoulap" },
  champetre: { path: "8/86/Espace_champ%C3%AAtre_%C3%A0_Bagangt%C3%A9_dans_la_region_de_l%27Ouest.jpg", width: 4160, author: "Nguini Désiré", license: "CC BY-SA 4.0", fr: "Champs et collines à Bangangté", en: "Fields and hills in Bangangté" },
  marche2: { path: "/images/local/nouveau-marche.webp", width: 1536, author: "Actu Cameroun", license: "droits réservés", fr: "Le nouveau marché central de Bangangté vu du ciel", en: "Bangangté's new central market from above" },
  achu: { path: "9/9f/Achu_meal.jpg", width: 3024, author: "Adesolive", license: "CC0", fr: "Achu : taro pilé et sauce jaune dans une assiette creusée", en: "Achu: pounded taro and yellow sauce in a hollowed-out plate" },
  haricots: { path: "f/f2/Plantain_demi-m%C3%BBr_bouilli.jpg", width: 2588, author: "Kondah", license: "CC BY-SA 4.0", fr: "Haricots et plantain demi-mûr bouilli", en: "Beans with boiled half-ripe plantain" },
  ndole: { path: "5/57/Ndol%C3%A8_sawa.jpg", width: 6016, author: "BACHELOR45", license: "CC BY-SA 4.0", fr: "Ndolè aux plantains mûrs frits", en: "Ndolè with fried ripe plantains" },
  bhb: { path: "c/c1/Beignets_haricot_bouillie_%28BHB%29.jpg", width: 4464, author: "Minette Lontsie", license: "CC BY-SA 4.0", fr: "Beignets, haricots et bouillie : un petit-déjeuner populaire", en: "Doughnuts, beans and porridge: a popular breakfast" },
  jeunesse_defile: { path: "b/b0/C%C3%A9l%C3%A9bration_de_la_F%C3%AAte_Nationale_de_la_Jeunesse_2025_%C3%A0_Bonab%C3%A9ri_le_11_f%C3%A9vrier_%28Douala_IVe%29_06.jpg", width: 2048, author: "Tchoumegni", license: "CC BY-SA 4.0", fr: "Écoliers au défilé de la Fête de la jeunesse, Douala, 11 février 2025", en: "Schoolchildren at the Youth Day parade, Douala, 11 February 2025" },
  defile_eleves: { path: "e/e0/El%C3%A8ves_au_d%C3%A9fil%C3%A92.jpg", width: 4500, author: "Happiraphael", license: "CC BY-SA 4.0", fr: "Élèves et étudiants au défilé de la fête nationale, Douala, 20 mai 2019", en: "Pupils and students at the National Day parade, Douala, 20 May 2019" },
  hdv: { path: "/images/local/hotel-de-ville.jpg", width: 898, author: "Commune de Bangangté", license: "droits réservés", fr: "L'hôtel de ville de Bangangté", en: "Bangangté town hall" },
  jeudi: { path: "/images/local/jeudi-propre.jpg", width: 1080, author: "Commune de Bangangté", license: "droits réservés", fr: "Jeudi propre : les habitants nettoient leur quartier avec la mairie", en: "Clean Thursday: residents clean up their neighbourhood with the town hall" },
  jeudi2: { path: "/images/local/jeudi-propre-2.jpg", width: 1080, author: "Commune de Bangangté", license: "droits réservés", fr: "Habitants mobilisés pour le Jeudi propre", en: "Residents turned out for Clean Thursday" },
} satisfies Record<string, ImageInfo>;

export type ImgKey = keyof typeof IMG;

const WIDTHS = [250, 330, 500, 960, 1280, 1920];

export function src(key: ImgKey, w = 960): string {
  // Copie dans le bucket Supabase si elle existe (500 px pour les vignettes, 1280 px au-delà).
  const h = HOSTED[key];
  if (h && typeof h === "object") {
    const u = w <= 500 ? h["500"] ?? h["1280"] : h["1280"] ?? h["500"];
    if (u) return u;
  }
  const { path, width } = IMG[key] as ImageInfo;
  if (path.startsWith("/")) return path;
  if (width <= w) return `https://upload.wikimedia.org/wikipedia/commons/${path}`;
  const size = WIDTHS.find((x) => x >= w) ?? 1920;
  const [h1, h2, ...rest] = path.split("/");
  const file = rest.join("/");
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${h1}/${h2}/${file}/${size}px-${file}`;
}

export function pageUrl(key: ImgKey): string | null {
  const { path } = IMG[key] as ImageInfo;
  if (path.startsWith("/")) return null;
  return "https://commons.wikimedia.org/wiki/File:" + path.split("/").slice(2).join("/");
}
