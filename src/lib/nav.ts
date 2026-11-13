import type { ImgKey } from "./images";

export type Bi = { fr: string; en: string };
export type NavItem = { href: string; icon: string; label: Bi; desc: Bi };
export type NavGroup = {
  key: string;
  label: Bi;
  intro: Bi;
  items: NavItem[];
  feature: { img: ImgKey; href: string; title: Bi; text: Bi };
};

// Source unique pour l'en-tête, le menu mobile et le pied de page.
export const GROUPS: NavGroup[] = [
  {
    key: "decouvrir",
    label: { fr: "Découvrir", en: "Discover" },
    intro: { fr: "La ville, son histoire et ses figures", en: "The town, its history and its people" },
    items: [
      { href: "/ville", icon: "city", label: { fr: "La ville", en: "The town" }, desc: { fr: "Quartiers, services, projets et hôtel de ville", en: "Neighbourhoods, services, projects and town hall" } },
      { href: "/histoire", icon: "book", label: { fr: "Histoire", en: "History" }, desc: { fr: "De la fondation vers 1660 aux 15 rois", en: "From its founding around 1660 to the 15 kings" } },
      { href: "/personnalites", icon: "users", label: { fr: "Personnalités", en: "Notable people" }, desc: { fr: "Le roi, les notables et les grandes figures", en: "The king, the notables and leading figures" } },
    ],
    feature: { img: "roi2", href: "/histoire", title: { fr: "Ba'gha'nte'", en: "Ba'gha'nte'" }, text: { fr: "Ceux qui refusent la domination : l'histoire d'un nom.", en: "Those who refuse domination: the story of a name." } },
  },
  {
    key: "visiter",
    label: { fr: "Visiter", en: "Visit" },
    intro: { fr: "Sites, culture et séjour", en: "Sights, culture and your stay" },
    items: [
      { href: "/nature", icon: "mountain", label: { fr: "Nature et sites", en: "Nature and sights" }, desc: { fr: "Chutes, grottes, lacs et lieux sacrés", en: "Waterfalls, caves, lakes and sacred places" } },
      { href: "/culture", icon: "mask", label: { fr: "Culture et saveurs", en: "Culture and food" }, desc: { fr: "Medumba, danses, masques, ndop et cuisine", en: "Medumba, dances, masks, ndop and food" } },
      { href: "/sejourner", icon: "bed", label: { fr: "Séjourner", en: "Plan your stay" }, desc: { fr: "Hôtels, restaurants, accès et conseils", en: "Hotels, restaurants, getting here and tips" } },
      { href: "/agenda", icon: "calendar", label: { fr: "Agenda", en: "Events" }, desc: { fr: "COMENGA, festivals et fêtes de l'année", en: "COMENGA, festivals and yearly celebrations" } },
      { href: "/galerie", icon: "image", label: { fr: "Galerie photos", en: "Photo gallery" }, desc: { fr: "Plus de 50 photos du pays medumba", en: "Over 50 photos of Medumba country" } },
    ],
    feature: { img: "chuteB", href: "/nature", title: { fr: "Les chutes du Ndé", en: "The waterfalls of the Ndé" }, text: { fr: "Bangoua, Ntaveu, Baba : à découvrir avec un guide.", en: "Bangoua, Ntaveu, Baba: explore them with a guide." } },
  },
];

export const SINGLE: { href: string; label: Bi }[] = [
  { href: "/mairie", label: { fr: "Mairie", en: "Town hall" } },
  { href: "/contact", label: { fr: "Contact", en: "Contact" } },
];
