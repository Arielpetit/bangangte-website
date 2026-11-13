import type { ImgKey } from "./images";
import type { Bi } from "./nav";

export type EventItem = {
  id: string;
  month: number; // 1 à 12
  day?: number;
  date: Bi; // libellé de date
  freq: Bi;
  img: ImgKey;
  cat: Bi;
  t: Bi;
  d: Bi;
  place: Bi;
  warn?: Bi;
  link?: string;
};

/** Les autres rendez-vous : COMENGA a sa propre mise en avant (compte à rebours) et n'est pas répété dans les listes. */
export const FEATURED_ID = "comenga";

export const MONTHS: Bi[] = [
  { fr: "Janvier", en: "January" }, { fr: "Février", en: "February" }, { fr: "Mars", en: "March" }, { fr: "Avril", en: "April" },
  { fr: "Mai", en: "May" }, { fr: "Juin", en: "June" }, { fr: "Juillet", en: "July" }, { fr: "Août", en: "August" },
  { fr: "Septembre", en: "September" }, { fr: "Octobre", en: "October" }, { fr: "Novembre", en: "November" }, { fr: "Décembre", en: "December" },
];

export const MONTHS_SHORT: Bi[] = ["Janv.", "Févr.", "Mars", "Avr.", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."].map((fr, i) => ({ fr, en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i] }));

const B = (fr: string, en: string): Bi => ({ fr, en });

export const EVENTS: EventItem[] = [
  { id: "jeunesse", month: 2, day: 11, date: B("11 février", "11 February"), freq: B("Chaque année", "Every year"), img: "jeunesse_defile", cat: B("Jeunesse", "Youth"), t: B("Fête de la jeunesse", "Youth Day"), d: B("Défilé puis concert gratuit à l'hôtel de ville, offert par la mairie depuis plus de dix ans. En 2025 : Vanister, Joël la Fleur, Jumeau Km et Petit Bozard.", "A parade, then a free concert at the town hall, hosted by the council for over ten years. In 2025: Vanister, Joël la Fleur, Jumeau Km and Petit Bozard."), place: B("Hôtel de ville", "Town hall") },
  { id: "fete-nationale", month: 5, day: 20, date: B("20 mai", "20 May"), freq: B("Chaque année", "Every year"), img: "defile_eleves", cat: B("Fête nationale", "National Day"), t: B("Fête nationale", "National Day"), d: B("Défilé des écoles, des associations, des anciens combattants et des corps constitués devant les autorités du département.", "Schools, associations, veterans and public bodies parade before the division's authorities."), place: B("Centre-ville", "Town centre") },
  { id: "musique", month: 6, day: 21, date: B("21 juin", "21 June"), freq: B("Chaque année", "Every year"), img: "gacha2", cat: B("Musique", "Music"), t: B("Fête de la musique à la Fondation Gacha", "Music Day at the Gacha Foundation"), d: B("Concerts et animations au centre culturel de la Fondation Jean-Félicien Gacha.", "Concerts and events at the Jean-Félicien Gacha Foundation's cultural centre."), place: B("Bangoulap", "Bangoulap"), warn: B("Programme à confirmer", "Programme to confirm") },
  { id: "medumba", month: 7, date: B("Juillet", "July"), freq: B("Tous les deux ans", "Every two years"), img: "festival", cat: B("Festival", "Festival"), t: B("Festival des arts et de la culture medumba", "Medumba Arts and Culture Festival"), d: B("Depuis 1995, quinze jours de danses, de musiques, d'expositions, de cuisine et de rites traditionnels, du matin jusque tard dans la nuit.", "Since 1995, fifteen days of dance, music, exhibitions, food and traditional rites, from morning until late at night."), place: B("Bangangté", "Bangangté"), warn: B("Prochaine édition à confirmer", "Next edition to confirm") },
  { id: "vacances-gacha", month: 7, date: B("Juillet et août", "July and August"), freq: B("Chaque année", "Every year"), img: "gacha", cat: B("Jeunesse", "Youth"), t: B("Vacances utiles Gacha", "Gacha summer programme"), d: B("Programme éducatif et culturel pour les jeunes pendant les grandes vacances. 10e édition en 2025.", "An educational and cultural programme for young people over the summer holidays. 10th edition in 2025."), place: B("Bangoulap", "Bangoulap"), warn: B("Dates à confirmer", "Dates to confirm") },
  { id: "marche-bio", month: 8, day: 1, date: B("1er août", "1 August"), freq: B("Depuis 2026", "Since 2026"), img: "marche2", cat: B("Marché", "Market"), t: B("Marché bio de Bangangté", "Bangangté organic market"), d: B("Les producteurs bio du Ndé sur l'esplanade de l'ancienne mairie : légumes sans pesticides, huiles, épices et miel.", "Ndé organic growers on the old town hall square: pesticide-free vegetables, oils, spices and honey."), place: B("Ancienne mairie", "Old town hall"), warn: B("Fréquence à confirmer", "Frequency to confirm") },
  { id: "macabo", month: 11, date: B("Novembre", "November"), freq: B("Tous les deux ans", "Every two years"), img: "rituel", cat: B("Festival", "Festival"), t: B("Festival du macabo, Bangoua", "Macabo festival, Bangoua"), d: B("La chefferie voisine de Bangoua célèbre le macabo et le vivre-ensemble, avec danses rituelles et masques.", "The neighbouring Bangoua chiefdom celebrates the cocoyam and living together, with ritual dances and masks."), place: B("Bangoua", "Bangoua"), warn: B("Dates à confirmer", "Dates to confirm") },
  { id: "comenga", month: 11, day: 25, date: B("25 nov. au 6 déc. 2026", "25 Nov to 6 Dec 2026"), freq: B("5e édition", "5th edition"), img: "femme3", cat: B("Congrès", "Congress"), t: B("COMENGA 2026", "COMENGA 2026"), d: B("Le congrès mondial du peuple Bangangté réunit la diaspora et le terroir sur le thème « Un peuple, un roi, une culture ».", "The world congress of the Bangangté people brings the diaspora home around the theme “One people, one king, one culture”."), place: B("Chefferie supérieure", "Paramount chiefdom"), link: "https://www.chefferie-superieure-bangangte.com/comenga" },
  { id: "bangoulap-tour", month: 11, day: 28, date: B("Fin novembre", "Late November"), freq: B("Chaque année", "Every year"), img: "tagny", cat: B("Randonnée", "Hike"), t: B("Bangoulap Tour", "Bangoulap Tour"), d: B("16 km de randonnée culturelle : chute de Baba 1, forge traditionnelle, plateau sacré et danses folkloriques. 11e édition du 28 au 30 novembre 2025.", "A 16 km cultural hike: Baba 1 falls, a traditional forge, the sacred plateau and folk dances. 11th edition from 28 to 30 November 2025."), place: B("Bangoulap", "Bangoulap"), warn: B("Dates 2026 à confirmer", "2026 dates to confirm") },
  { id: "fetes-fin-annee", month: 12, date: B("Décembre", "December"), freq: B("Chaque année", "Every year"), img: "taro", cat: B("Gastronomie", "Food"), t: B("Foire gastronomique et fêtes des enfants", "Food fair and children's festivities"), d: B("La foire gastronomique du Ndé met en valeur la cuisine du département. Pendant les fêtes, la mairie offre jouets, concours et manèges aux enfants.", "The Ndé food fair showcases local cooking. Over the holidays, the council offers toys, contests and fairground rides for children."), place: B("Bangangté", "Bangangté"), warn: B("Dates à confirmer", "Dates to confirm") },
];

export const EVENTS_OTHER: EventItem[] = EVENTS.filter((e) => e.id !== FEATURED_ID);
