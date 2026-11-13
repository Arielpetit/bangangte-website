import type { Bi } from "./nav";

// Les événements sont désormais gérés dans le tableau de bord (table « events », contenu de départ : src/content/seed/events.json).

export const MONTHS: Bi[] = [
  { fr: "Janvier", en: "January" }, { fr: "Février", en: "February" }, { fr: "Mars", en: "March" }, { fr: "Avril", en: "April" },
  { fr: "Mai", en: "May" }, { fr: "Juin", en: "June" }, { fr: "Juillet", en: "July" }, { fr: "Août", en: "August" },
  { fr: "Septembre", en: "September" }, { fr: "Octobre", en: "October" }, { fr: "Novembre", en: "November" }, { fr: "Décembre", en: "December" },
];

export const MONTHS_SHORT: Bi[] = ["Janv.", "Févr.", "Mars", "Avr.", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."].map((fr, i) => ({ fr, en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i] }));
