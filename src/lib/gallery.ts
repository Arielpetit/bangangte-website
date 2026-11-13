import type { GalleryCat } from "@/components/PhotoGallery";

export const GALLERY: GalleryCat[] = [
  { key: "culture", label: { fr: "Fêtes et traditions", en: "Festivals and traditions" }, items: ["femme1", "festival", "danse1", "femme3", "rituel", "danse2", "femme2", "zing", "femme4", "mandjong", "ndop", "bazou_chef", "jeunesse_defile", "defile_eleves"] },
  { key: "patrimoine", label: { fr: "Chefferies et musées", en: "Chiefdoms and museums" }, items: ["roi2", "palais_bangoua", "musee_bangoua", "statues", "sculpture", "masque", "trone", "reine", "gacha", "gacha2", "bazou", "bazou_musee", "babou", "dynastie"] },
  { key: "nature", label: { fr: "Nature et lieux sacrés", en: "Nature and sacred places" }, items: ["chuteB", "chuteB2", "chuteB3", "chute", "chute2", "grotte", "tagny", "partage", "tagny2", "tagny3", "monoun", "champetre", "ouest"] },
  { key: "ville", label: { fr: "La ville", en: "The town" }, items: ["hdv", "marche2", "stade", "udm5", "udm1", "defile", "aerial", "aerial2"] },
  { key: "saveurs", label: { fr: "Saveurs", en: "Food" }, items: ["taro", "achu", "koki", "haricots", "ndole", "bhb"] },
];
