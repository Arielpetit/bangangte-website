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

// Source unique pour l'en-tête, le menu mobile et le pied de page. La Mairie d'abord, la découverte de la ville ensuite.
export const GROUPS: NavGroup[] = [
  {
    key: "mairie",
    label: { fr: "La Mairie", en: "Town hall" },
    intro: { fr: "L'institution communale et ceux qui la font vivre", en: "The council and the people who run it" },
    items: [
      { href: "/mairie", icon: "landmark", label: { fr: "La commune", en: "The council" }, desc: { fr: "Missions, chiffres clés et hôtel de ville", en: "Missions, key figures and town hall" } },
      { href: "/mairie/maire", icon: "users", label: { fr: "Le Maire", en: "The mayor" }, desc: { fr: "Éric Aimé NIAT, son parcours et son action", en: "Éric Aimé NIAT, his career and work" } },
      { href: "/mairie/executif", icon: "shield", label: { fr: "L'exécutif municipal", en: "The executive" }, desc: { fr: "Le Maire et ses quatre adjoints", en: "The mayor and four deputies" } },
      { href: "/mairie/conseil", icon: "layers", label: { fr: "Le Conseil municipal", en: "The municipal council" }, desc: { fr: "Conseillers, commissions et sessions", en: "Councillors, committees and sessions" } },
      { href: "/mairie/administration", icon: "grid", label: { fr: "L'administration", en: "Administration" }, desc: { fr: "Organigramme et services communaux", en: "Org chart and council departments" } },
      { href: "/projets", icon: "hammer", label: { fr: "Projets et chantiers", en: "Projects and works" }, desc: { fr: "Écoles, eau, routes, ponts, éclairage", en: "Schools, water, roads, bridges, lighting" } },
    ],
    feature: { img: "hdv", href: "/mairie/historique", title: { fr: "Une commune primée depuis 1954", en: "An award-winning council since 1954" }, text: { fr: "Maires successifs, distinctions et partenaires.", en: "Past mayors, awards and partners." } },
  },
  {
    key: "infos",
    label: { fr: "Informations", en: "News" },
    intro: { fr: "Ce qui se passe à la mairie et dans la commune", en: "What is happening at the council and in town" },
    items: [
      { href: "/actualites", icon: "news", label: { fr: "Actualités", en: "News" }, desc: { fr: "La vie de la commune, chaque semaine", en: "Council life, week by week" } },
      { href: "/communiques", icon: "megaphone", label: { fr: "Communiqués et avis", en: "Notices" }, desc: { fr: "Annonces officielles, appels, alertes", en: "Official notices, calls, alerts" } },
      { href: "/agenda", icon: "calendar", label: { fr: "Agenda", en: "Events" }, desc: { fr: "Jeudi propre, conseils, fêtes et festivals", en: "Clean Thursday, sessions, celebrations" } },
      { href: "/galerie", icon: "image", label: { fr: "Photothèque", en: "Photo library" }, desc: { fr: "Les images de Bangangté", en: "Images of Bangangté" } },
    ],
    feature: { img: "jeudi", href: "/agenda#jeudi-propre", title: { fr: "Jeudi propre", en: "Clean Thursday" }, text: { fr: "Chaque jeudi, un quartier se mobilise avec le Maire.", en: "Every Thursday, a neighbourhood gets to work with the mayor." } },
  },
  {
    key: "services",
    label: { fr: "Services", en: "Services" },
    intro: { fr: "Vos démarches auprès de la mairie", en: "Your formalities with the council" },
    items: [
      { href: "/services", icon: "file", label: { fr: "Toutes les démarches", en: "All formalities" }, desc: { fr: "Pièces à fournir, coûts et délais", en: "Documents, fees and timing" } },
      { href: "/services#etat_civil", icon: "book", label: { fr: "État civil", en: "Civil records" }, desc: { fr: "Naissance, mariage, décès, copies", en: "Birth, marriage, death, copies" } },
      { href: "/services#urbanisme", icon: "build", label: { fr: "Urbanisme", en: "Planning" }, desc: { fr: "Permis de bâtir, certificats", en: "Building permits, certificates" } },
      { href: "/services#jeunesse", icon: "briefcase", label: { fr: "Emploi des jeunes", en: "Youth jobs" }, desc: { fr: "Bureau de l'emploi, stages de vacances", en: "Employment office, internships" } },
      { href: "/services/signaler", icon: "alert", label: { fr: "Signaler un problème", en: "Report a problem" }, desc: { fr: "Ordures, voirie, éclairage, eau", en: "Waste, roads, lighting, water" } },
      { href: "/contact", icon: "phone", label: { fr: "Contacter la mairie", en: "Contact the council" }, desc: { fr: "Horaires, adresse et formulaire", en: "Hours, address and form" } },
    ],
    feature: { img: "marche2", href: "/services#commerce", title: { fr: "Marchés et commerce", en: "Markets and trade" }, text: { fr: "Boutiques, places marchandes et droits de place.", en: "Shops, market pitches and fees." } },
  },
  {
    key: "decouvrir",
    label: { fr: "Découvrir", en: "Discover" },
    intro: { fr: "La ville, son histoire, sa culture et ses sites", en: "The town, its history, culture and sights" },
    items: [
      { href: "/ville", icon: "city", label: { fr: "La ville", en: "The town" }, desc: { fr: "Quartiers, équipements et vie locale", en: "Neighbourhoods, facilities, local life" } },
      { href: "/histoire", icon: "book", label: { fr: "Histoire", en: "History" }, desc: { fr: "De la fondation aux 15 rois", en: "From its founding to the 15 kings" } },
      { href: "/personnalites", icon: "users", label: { fr: "Personnalités", en: "Notable people" }, desc: { fr: "Le roi, les notables, les grandes figures", en: "The king, notables and leading figures" } },
      { href: "/nature", icon: "mountain", label: { fr: "Nature et sites", en: "Nature and sights" }, desc: { fr: "Chutes, grottes, lacs, lieux sacrés", en: "Waterfalls, caves, lakes, sacred places" } },
      { href: "/culture", icon: "mask", label: { fr: "Culture et saveurs", en: "Culture and food" }, desc: { fr: "Medumba, danses, ndop et cuisine", en: "Medumba, dances, ndop and food" } },
      { href: "/sejourner", icon: "bed", label: { fr: "Séjourner", en: "Plan your stay" }, desc: { fr: "Hôtels, restaurants et accès", en: "Hotels, restaurants, getting here" } },
    ],
    feature: { img: "chuteB", href: "/nature", title: { fr: "Les chutes du Ndé", en: "The waterfalls of the Ndé" }, text: { fr: "Bangoua, Ntaveu, Baba : à découvrir avec un guide.", en: "Bangoua, Ntaveu, Baba: explore them with a guide." } },
  },
];

export const SINGLE: { href: string; label: Bi }[] = [
  { href: "/contact", label: { fr: "Contact", en: "Contact" } },
];
