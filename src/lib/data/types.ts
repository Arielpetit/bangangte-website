// Modèle de contenu de la mairie. Les colonnes *_en sont facultatives : si elles sont vides, le français s'affiche.

export type Status = "draft" | "published";

export type Photo = { url: string; alt_fr?: string; alt_en?: string; credit?: string };

export const POST_CATEGORIES = {
  vie_communale: { fr: "Vie communale", en: "Council life" },
  jeudi_propre: { fr: "Jeudi propre", en: "Clean Thursday" },
  projets: { fr: "Projets et chantiers", en: "Projects and works" },
  social: { fr: "Action sociale", en: "Social action" },
  education: { fr: "Éducation", en: "Education" },
  jeunesse: { fr: "Jeunesse et emploi", en: "Youth and jobs" },
  sport: { fr: "Sport", en: "Sport" },
  culture: { fr: "Culture", en: "Culture" },
  institutionnel: { fr: "Institutionnel", en: "Institutional" },
  cooperation: { fr: "Coopération", en: "Cooperation" },
  sante: { fr: "Santé et environnement", en: "Health and environment" },
} as const;
export type PostCategory = keyof typeof POST_CATEGORIES;

export type Post = {
  id: string;
  slug: string;
  title_fr: string;
  title_en: string | null;
  excerpt_fr: string | null;
  excerpt_en: string | null;
  body_fr: string; // HTML assaini
  body_en: string | null;
  cover_url: string | null;
  gallery: Photo[];
  category: PostCategory;
  status: Status;
  featured: boolean;
  published_at: string;
  source_url: string | null;
};

export const COMMUNIQUE_KINDS = {
  communique: { fr: "Communiqué", en: "Press release" },
  avis: { fr: "Avis au public", en: "Public notice" },
  appel: { fr: "Appel à candidatures", en: "Call for applications" },
  marche: { fr: "Marché public", en: "Public tender" },
  alerte: { fr: "Alerte", en: "Alert" },
  deliberation: { fr: "Délibération", en: "Council decision" },
} as const;
export type CommuniqueKind = keyof typeof COMMUNIQUE_KINDS;

export type Communique = {
  id: string;
  slug: string;
  ref: string | null;
  kind: CommuniqueKind;
  title_fr: string;
  title_en: string | null;
  body_fr: string;
  body_en: string | null;
  pdf_url: string | null;
  urgent: boolean;
  status: Status;
  published_at: string;
  expires_at: string | null;
};

export const EVENT_CATEGORIES = {
  institutionnel: { fr: "Institutionnel", en: "Institutional" },
  citoyennete: { fr: "Citoyenneté", en: "Civic life" },
  jeunesse: { fr: "Jeunesse", en: "Youth" },
  culture: { fr: "Culture", en: "Culture" },
  sport: { fr: "Sport", en: "Sport" },
  fete: { fr: "Fête", en: "Celebration" },
  festival: { fr: "Festival", en: "Festival" },
  marche: { fr: "Marché", en: "Market" },
  conseil: { fr: "Conseil municipal", en: "Council session" },
} as const;
export type EventCategory = keyof typeof EVENT_CATEGORIES;

export type CalEvent = {
  id: string;
  slug: string;
  title_fr: string;
  title_en: string | null;
  description_fr: string;
  description_en: string | null;
  starts_at: string; // date ISO
  ends_at: string | null;
  date_label_fr: string | null; // ex. « Chaque jeudi », « Juillet (date à confirmer) »
  date_label_en: string | null;
  recurring: boolean; // rendez-vous annuel ou hebdomadaire
  location_fr: string | null;
  location_en: string | null;
  category: EventCategory;
  organizer: "mairie" | "partenaire";
  cover_url: string | null;
  link: string | null;
  featured: boolean;
  status: Status;
};

export type PersonBody = "executif" | "conseil" | "administration";

export type Person = {
  id: string;
  slug: string;
  name: string;
  role_fr: string;
  role_en: string | null;
  body: PersonBody;
  rank: number;
  photo_url: string | null;
  bio_fr: string | null;
  bio_en: string | null;
  unit_id: string | null;
  active: boolean;
};

export type Unit = {
  id: string;
  slug: string;
  name_fr: string;
  name_en: string | null;
  description_fr: string | null;
  description_en: string | null;
  parent_id: string | null;
  head_id: string | null;
  icon: string;
  rank: number;
};

export type Commission = {
  id: string;
  name_fr: string;
  name_en: string | null;
  chair_id: string | null;
  description_fr: string | null;
  description_en: string | null;
  rank: number;
};

export const PROCEDURE_THEMES = {
  etat_civil: { fr: "État civil", en: "Civil records", icon: "file" },
  urbanisme: { fr: "Urbanisme et construction", en: "Planning and building", icon: "build" },
  commerce: { fr: "Commerce et marchés", en: "Trade and markets", icon: "store" },
  hygiene: { fr: "Hygiène et environnement", en: "Hygiene and environment", icon: "leaf" },
  social: { fr: "Action sociale", en: "Social action", icon: "users" },
  jeunesse: { fr: "Jeunesse et emploi", en: "Youth and jobs", icon: "ball" },
} as const;
export type ProcedureTheme = keyof typeof PROCEDURE_THEMES;

export type Procedure = {
  id: string;
  slug: string;
  theme: ProcedureTheme;
  title_fr: string;
  title_en: string | null;
  summary_fr: string;
  summary_en: string | null;
  documents_fr: string[];
  documents_en: string[] | null;
  fees_fr: string | null;
  fees_en: string | null;
  delay_fr: string | null;
  delay_en: string | null;
  where_fr: string | null;
  where_en: string | null;
  unit_id: string | null;
  form_url: string | null;
  rank: number;
  validated: boolean; // false : fiche à valider par la mairie
  status: Status;
};

export const PROJECT_STATUS = {
  planned: { fr: "Programmé", en: "Planned" },
  ongoing: { fr: "En cours", en: "In progress" },
  done: { fr: "Réceptionné", en: "Delivered" },
} as const;
export type ProjectStatus = keyof typeof PROJECT_STATUS;

export type Project = {
  id: string;
  slug: string;
  title_fr: string;
  title_en: string | null;
  summary_fr: string;
  summary_en: string | null;
  body_fr: string | null;
  body_en: string | null;
  location: string | null;
  funding: string | null;
  budget: string | null;
  progress: ProjectStatus;
  percent: number | null;
  cover_url: string | null;
  gallery: Photo[];
  started_on: string | null;
  ended_on: string | null;
  status: Status;
};

export type Album = {
  id: string;
  slug: string;
  title_fr: string;
  title_en: string | null;
  date: string | null;
  cover_url: string | null;
  photos: Photo[];
  status: Status;
};

export type Settings = {
  hours_fr: string;
  hours_en: string;
  phone: string;
  whatsapp: string;
  email: string;
  address_fr: string;
  address_en: string;
  facebook: string;
  mayor_message_fr: string;
  mayor_message_en: string;
  alert_fr: string; // bandeau d'alerte en haut du site (vide = masqué)
  alert_en: string;
  alert_link: string;
  /** Photos d'en-tête choisies dans le tableau de bord, par page (clé = chemin, ex. "actualites"). */
  page_heroes?: Record<string, { img?: string | null; inset?: string | null }>;
};

export type Message = {
  id: string;
  kind: "contact" | "signalement";
  name: string;
  email: string | null;
  phone: string | null;
  subject: string | null;
  body: string;
  location: string | null;
  status: "new" | "in_progress" | "closed";
  notes: string | null;
  created_at: string;
};

export type Role = "admin" | "editor" | "contributor" | "none";
export type Profile = { id: string; email: string; full_name: string | null; role: Role; created_at: string };
