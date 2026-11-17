import { COMMUNIQUE_KINDS, EVENT_CATEGORIES, POST_CATEGORIES, PROCEDURE_THEMES, PROJECT_STATUS } from "@/lib/data/types";

export type FieldType = "text" | "textarea" | "rich" | "select" | "bool" | "date" | "datetime" | "image" | "gallery" | "file" | "list" | "number" | "slug" | "relation" | "icon";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  relation?: { table: string; label: string; filter?: [string, string] };
  side?: boolean; // colonne latérale de l'éditeur
  lang?: "fr" | "en"; // champ traduit : affiché dans l'onglet de langue
  slugFrom?: string;
  max?: number;
};

export type Resource = {
  key: string;
  table: string;
  label: string;
  singular: string;
  icon: string;
  titleField: string;
  imageField?: string;
  dateField?: string;
  badge?: (row: Record<string, unknown>) => string | null;
  hasStatus: boolean;
  order: [string, boolean];
  publicPath?: (row: Record<string, unknown>) => string;
  fields: Field[];
  defaults?: () => Record<string, unknown>;
  editorRole?: "editor" | "admin";
  intro?: string;
};

const opts = (o: Record<string, { fr: string }>) => Object.entries(o).map(([value, v]) => ({ value, label: v.fr }));
const now = () => new Date().toISOString();

const STATUS: Field = { name: "status", label: "État", type: "select", side: true, options: [{ value: "draft", label: "Brouillon" }, { value: "published", label: "Publié" }] };

export const ICONS = ["landmark", "users", "file", "build", "store", "leaf", "ball", "briefcase", "bolt", "radio", "book", "shield", "grid", "layers", "megaphone", "drop", "water", "hammer", "calendar", "phone", "mail", "alert", "city", "image"];

export const RESOURCES: Resource[] = [
  {
    key: "actualites", table: "posts", label: "Actualités", singular: "actualité", icon: "news", titleField: "title_fr", imageField: "cover_url", dateField: "published_at", hasStatus: true, order: ["published_at", false],
    badge: (r) => POST_CATEGORIES[r.category as keyof typeof POST_CATEGORIES]?.fr ?? null,
    publicPath: (r) => `/actualites/${r.slug}`,
    intro: "Les articles de la vie communale. Rédigez en français ; la version anglaise est facultative.",
    defaults: () => ({ status: "draft", category: "vie_communale", published_at: now(), featured: false, gallery: [] }),
    fields: [
      { name: "title_fr", label: "Titre", type: "text", required: true, lang: "fr", max: 180 },
      { name: "title_en", label: "Title", type: "text", lang: "en", max: 180 },
      { name: "excerpt_fr", label: "Chapeau (résumé court)", type: "textarea", lang: "fr", help: "Deux phrases maximum, affichées dans les listes. Laissez vide pour utiliser le début de l'article.", max: 300 },
      { name: "excerpt_en", label: "Summary", type: "textarea", lang: "en", max: 300 },
      { name: "body_fr", label: "Texte de l'article", type: "rich", required: true, lang: "fr" },
      { name: "body_en", label: "Article text", type: "rich", lang: "en" },
      { name: "gallery", label: "Galerie photos", type: "gallery", help: "Ajoutez les photos de l'activité. Elles s'affichent sous l'article." },
      STATUS,
      { name: "published_at", label: "Date de publication", type: "datetime", side: true, required: true, help: "Une date future programme la publication." },
      { name: "category", label: "Catégorie", type: "select", side: true, options: opts(POST_CATEGORIES) },
      { name: "featured", label: "À la une sur l'accueil", type: "bool", side: true },
      { name: "cover_url", label: "Photo principale", type: "image", side: true },
      { name: "slug", label: "Adresse de la page", type: "slug", side: true, slugFrom: "title_fr", required: true },
      { name: "source_url", label: "Lien Facebook d'origine", type: "text", side: true, placeholder: "https://www.facebook.com/…" },
    ],
  },
  {
    key: "communiques", table: "communiques", label: "Communiqués", singular: "communiqué", icon: "megaphone", titleField: "title_fr", dateField: "published_at", hasStatus: true, order: ["published_at", false],
    badge: (r) => COMMUNIQUE_KINDS[r.kind as keyof typeof COMMUNIQUE_KINDS]?.fr ?? null,
    publicPath: (r) => `/communiques/${r.slug}`,
    intro: "Annonces officielles. Un communiqué « urgent » s'affiche en alerte sur tout le site pendant 30 jours ou jusqu'à son échéance.",
    defaults: () => ({ status: "draft", kind: "communique", urgent: false, published_at: now() }),
    fields: [
      { name: "title_fr", label: "Titre", type: "text", required: true, lang: "fr", max: 200 },
      { name: "title_en", label: "Title", type: "text", lang: "en", max: 200 },
      { name: "body_fr", label: "Texte du communiqué", type: "rich", required: true, lang: "fr" },
      { name: "body_en", label: "Notice text", type: "rich", lang: "en" },
      { name: "pdf_url", label: "Document signé (PDF ou image)", type: "file", help: "Le scan du communiqué signé, téléchargeable par les usagers." },
      STATUS,
      { name: "kind", label: "Type", type: "select", side: true, options: opts(COMMUNIQUE_KINDS) },
      { name: "urgent", label: "Urgent (alerte sur le site)", type: "bool", side: true },
      { name: "published_at", label: "Date de publication", type: "datetime", side: true, required: true },
      { name: "expires_at", label: "Échéance", type: "datetime", side: true, help: "Date limite (dépôt, régularisation…). Facultatif." },
      { name: "ref", label: "Référence", type: "text", side: true, placeholder: "N°…/C/CBGTE/…" },
      { name: "slug", label: "Adresse de la page", type: "slug", side: true, slugFrom: "title_fr", required: true },
    ],
  },
  {
    key: "agenda", table: "events", label: "Agenda", singular: "événement", icon: "calendar", titleField: "title_fr", imageField: "cover_url", dateField: "starts_at", hasStatus: true, order: ["starts_at", false],
    badge: (r) => EVENT_CATEGORIES[r.category as keyof typeof EVENT_CATEGORIES]?.fr ?? null,
    publicPath: (r) => `/agenda#${r.slug}`,
    intro: "Rendez-vous de la mairie et des partenaires. Pour un rendez-vous hebdomadaire, cochez « récurrent » et écrivez « Chaque jeudi » (par exemple) dans le libellé de date.",
    defaults: () => ({ status: "draft", category: "institutionnel", organizer: "mairie", recurring: false, featured: false, starts_at: now() }),
    fields: [
      { name: "title_fr", label: "Titre", type: "text", required: true, lang: "fr" },
      { name: "title_en", label: "Title", type: "text", lang: "en" },
      { name: "description_fr", label: "Description", type: "textarea", required: true, lang: "fr" },
      { name: "description_en", label: "Description", type: "textarea", lang: "en" },
      { name: "location_fr", label: "Lieu", type: "text", lang: "fr", placeholder: "Hôtel de ville" },
      { name: "location_en", label: "Venue", type: "text", lang: "en" },
      { name: "date_label_fr", label: "Libellé de date (facultatif)", type: "text", lang: "fr", help: "Remplace la date affichée : « Chaque jeudi, 7 h », « Juillet (à confirmer) »…" },
      { name: "date_label_en", label: "Date label", type: "text", lang: "en" },
      STATUS,
      { name: "starts_at", label: "Début", type: "datetime", side: true, required: true },
      { name: "ends_at", label: "Fin", type: "datetime", side: true },
      { name: "recurring", label: "Rendez-vous récurrent", type: "bool", side: true, help: "Annuel, ou hebdomadaire si le libellé dit « Chaque … »." },
      { name: "category", label: "Catégorie", type: "select", side: true, options: opts(EVENT_CATEGORIES) },
      { name: "organizer", label: "Organisateur", type: "select", side: true, options: [{ value: "mairie", label: "La mairie" }, { value: "partenaire", label: "Un partenaire" }] },
      { name: "cover_url", label: "Photo", type: "image", side: true },
      { name: "link", label: "Lien externe", type: "text", side: true, placeholder: "https://…" },
      { name: "slug", label: "Identifiant", type: "slug", side: true, slugFrom: "title_fr", required: true },
    ],
  },
  {
    key: "projets", table: "projects", label: "Projets", singular: "projet", icon: "hammer", titleField: "title_fr", imageField: "cover_url", hasStatus: true, order: ["updated_at", false],
    badge: (r) => PROJECT_STATUS[r.progress as keyof typeof PROJECT_STATUS]?.fr ?? null,
    publicPath: (r) => `/projets/${r.slug}`,
    defaults: () => ({ status: "draft", progress: "planned", gallery: [] }),
    fields: [
      { name: "title_fr", label: "Nom du projet", type: "text", required: true, lang: "fr" },
      { name: "title_en", label: "Project name", type: "text", lang: "en" },
      { name: "summary_fr", label: "Résumé", type: "textarea", required: true, lang: "fr" },
      { name: "summary_en", label: "Summary", type: "textarea", lang: "en" },
      { name: "body_fr", label: "Description détaillée", type: "rich", lang: "fr" },
      { name: "body_en", label: "Details", type: "rich", lang: "en" },
      { name: "gallery", label: "Photos du chantier", type: "gallery" },
      STATUS,
      { name: "progress", label: "Avancement", type: "select", side: true, options: opts(PROJECT_STATUS) },
      { name: "location", label: "Lieu", type: "text", side: true },
      { name: "funding", label: "Financement", type: "text", side: true, placeholder: "BIP 2026, FEICOM…" },
      { name: "budget", label: "Montant", type: "text", side: true, placeholder: "45 000 000 FCFA" },
      { name: "started_on", label: "Démarrage", type: "date", side: true },
      { name: "ended_on", label: "Réception", type: "date", side: true },
      { name: "cover_url", label: "Photo principale", type: "image", side: true },
      { name: "slug", label: "Adresse de la page", type: "slug", side: true, slugFrom: "title_fr", required: true },
    ],
  },
  {
    key: "albums", table: "albums", label: "Albums photos", singular: "album", icon: "image", titleField: "title_fr", imageField: "cover_url", dateField: "date", hasStatus: true, order: ["date", false],
    publicPath: () => "/galerie",
    intro: "Albums affichés dans la photothèque du site.",
    defaults: () => ({ status: "draft", photos: [] }),
    fields: [
      { name: "title_fr", label: "Titre de l'album", type: "text", required: true, lang: "fr" },
      { name: "title_en", label: "Album title", type: "text", lang: "en" },
      { name: "photos", label: "Photos", type: "gallery", required: true },
      STATUS,
      { name: "date", label: "Date", type: "date", side: true },
      { name: "cover_url", label: "Photo de couverture", type: "image", side: true },
      { name: "slug", label: "Identifiant", type: "slug", side: true, slugFrom: "title_fr", required: true },
    ],
  },
  {
    key: "personnes", table: "people", label: "Élus et responsables", singular: "personne", icon: "users", titleField: "name", imageField: "photo_url", hasStatus: false, order: ["rank", true],
    badge: (r) => ({ executif: "Exécutif", conseil: "Conseil", administration: "Administration" } as Record<string, string>)[r.body as string] ?? null,
    publicPath: (r) => (r.body === "executif" ? "/mairie/executif" : r.body === "conseil" ? "/mairie/conseil" : "/mairie/administration"),
    defaults: () => ({ body: "conseil", rank: 100, active: true }),
    fields: [
      { name: "name", label: "Nom complet", type: "text", required: true },
      { name: "role_fr", label: "Fonction", type: "text", required: true, lang: "fr", placeholder: "Conseiller municipal" },
      { name: "role_en", label: "Role", type: "text", lang: "en" },
      { name: "bio_fr", label: "Présentation", type: "textarea", lang: "fr" },
      { name: "bio_en", label: "Bio", type: "textarea", lang: "en" },
      { name: "body", label: "Instance", type: "select", side: true, options: [{ value: "executif", label: "Exécutif municipal" }, { value: "conseil", label: "Conseil municipal" }, { value: "administration", label: "Administration" }] },
      { name: "rank", label: "Ordre d'affichage", type: "number", side: true, help: "1 = en premier (le Maire)." },
      { name: "unit_id", label: "Service", type: "relation", side: true, relation: { table: "units", label: "name_fr" } },
      { name: "active", label: "Afficher sur le site", type: "bool", side: true },
      { name: "photo_url", label: "Photo officielle", type: "image", side: true },
      { name: "slug", label: "Identifiant", type: "slug", side: true, slugFrom: "name", required: true },
    ],
  },
  {
    key: "services", table: "units", label: "Services (organigramme)", singular: "service", icon: "grid", titleField: "name_fr", hasStatus: false, order: ["rank", true],
    publicPath: () => "/mairie/administration",
    defaults: () => ({ rank: 100, icon: "landmark" }),
    fields: [
      { name: "name_fr", label: "Nom du service", type: "text", required: true, lang: "fr" },
      { name: "name_en", label: "Department name", type: "text", lang: "en" },
      { name: "description_fr", label: "Missions", type: "textarea", lang: "fr" },
      { name: "description_en", label: "Remit", type: "textarea", lang: "en" },
      { name: "parent_id", label: "Rattaché à", type: "relation", side: true, relation: { table: "units", label: "name_fr" }, help: "Vide = directement sous le Maire." },
      { name: "head_id", label: "Responsable", type: "relation", side: true, relation: { table: "people", label: "name" } },
      { name: "icon", label: "Icône", type: "icon", side: true },
      { name: "rank", label: "Ordre", type: "number", side: true },
      { name: "slug", label: "Identifiant", type: "slug", side: true, slugFrom: "name_fr", required: true },
    ],
  },
  {
    key: "commissions", table: "commissions", label: "Commissions", singular: "commission", icon: "layers", titleField: "name_fr", hasStatus: false, order: ["rank", true],
    publicPath: () => "/mairie/conseil",
    defaults: () => ({ rank: 100 }),
    fields: [
      { name: "name_fr", label: "Nom", type: "text", required: true, lang: "fr" },
      { name: "name_en", label: "Name", type: "text", lang: "en" },
      { name: "description_fr", label: "Compétences", type: "textarea", lang: "fr" },
      { name: "description_en", label: "Remit", type: "textarea", lang: "en" },
      { name: "chair_id", label: "Président(e)", type: "relation", side: true, relation: { table: "people", label: "name" } },
      { name: "rank", label: "Ordre", type: "number", side: true },
    ],
  },
  {
    key: "demarches", table: "procedures", label: "Démarches", singular: "démarche", icon: "file", titleField: "title_fr", hasStatus: true, order: ["rank", true],
    badge: (r) => PROCEDURE_THEMES[r.theme as keyof typeof PROCEDURE_THEMES]?.fr ?? null,
    publicPath: (r) => `/services/${r.slug}`,
    intro: "Fiches pratiques. Cochez « fiche validée » quand le service a vérifié les pièces et les coûts : l'avertissement disparaît du site.",
    defaults: () => ({ status: "published", theme: "etat_civil", rank: 100, validated: false, documents_fr: [] }),
    fields: [
      { name: "title_fr", label: "Intitulé", type: "text", required: true, lang: "fr" },
      { name: "title_en", label: "Title", type: "text", lang: "en" },
      { name: "summary_fr", label: "En quelques mots", type: "textarea", required: true, lang: "fr" },
      { name: "summary_en", label: "Summary", type: "textarea", lang: "en" },
      { name: "documents_fr", label: "Pièces à fournir (une par ligne)", type: "list", lang: "fr" },
      { name: "documents_en", label: "Documents (one per line)", type: "list", lang: "en" },
      { name: "fees_fr", label: "Coût", type: "text", lang: "fr" },
      { name: "fees_en", label: "Fee", type: "text", lang: "en" },
      { name: "delay_fr", label: "Délai", type: "text", lang: "fr" },
      { name: "delay_en", label: "Timing", type: "text", lang: "en" },
      { name: "where_fr", label: "Où s'adresser", type: "text", lang: "fr" },
      { name: "where_en", label: "Where", type: "text", lang: "en" },
      STATUS,
      { name: "validated", label: "Fiche validée par le service", type: "bool", side: true },
      { name: "theme", label: "Thème", type: "select", side: true, options: opts(PROCEDURE_THEMES) },
      { name: "unit_id", label: "Service compétent", type: "relation", side: true, relation: { table: "units", label: "name_fr" } },
      { name: "form_url", label: "Formulaire (PDF)", type: "file", side: true },
      { name: "rank", label: "Ordre", type: "number", side: true },
      { name: "slug", label: "Adresse de la page", type: "slug", side: true, slugFrom: "title_fr", required: true },
    ],
  },
];

export const resourceByKey = (key: string) => RESOURCES.find((r) => r.key === key);

export const NAV_GROUPS: { label: string; keys: string[] }[] = [
  { label: "Publier", keys: ["actualites", "communiques", "agenda", "projets", "albums"] },
  { label: "La Mairie", keys: ["personnes", "services", "commissions", "demarches"] },
];

/** Libellés « nouveau / nouvelle » accordés. */
export const NEW_LABEL: Record<string, string> = {
  actualites: "Nouvelle actualité", communiques: "Nouveau communiqué", agenda: "Nouvel événement", projets: "Nouveau projet",
  albums: "Nouvel album", personnes: "Nouvelle personne", services: "Nouveau service", commissions: "Nouvelle commission", demarches: "Nouvelle démarche",
};
