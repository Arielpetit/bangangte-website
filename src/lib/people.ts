import type { ImgKey } from "./images";
import type { Bi } from "./nav";

export type Person = {
  slug: string; // photo possible : public/images/people/<slug>.jpg
  name: string;
  initials: string;
  role: Bi;
  text: Bi;
  img?: ImgKey;
};

export type Tier = { id: string; icon: string; title: Bi; people: Person[]; badge?: Bi; cols?: number };

// ---------- 1. Vie politique et institutionnelle (du sommet de l'État à la mairie) ----------

const NIAT_NJIFENJI: Person = { slug: "marcel-niat-njifenji", name: "Marcel Niat Njifenji", initials: "MN", img: "niat", role: { fr: "Patriarche · 1er président du Sénat", en: "Patriarch · 1st President of the Senate" }, text: { fr: "Né à Bangangté en 1934, maire de 2002 à 2007 et premier président du Sénat du Cameroun.", en: "Born in Bangangté in 1934, mayor from 2002 to 2007 and first President of the Senate of Cameroon." } };

export const POLITICAL_TIERS: Tier[] = [
  { id: "etat", icon: "shield", title: { fr: "Sommet de l'État", en: "Top of the State" }, people: [NIAT_NJIFENJI] },
  { id: "gouvernement", icon: "landmark", title: { fr: "Membres du gouvernement", en: "Members of government" }, people: [
    { slug: "celestine-ketcha-courtes", name: "Célestine Ketcha Courtès", initials: "CK", img: "ketcha", role: { fr: "Reine mère · Ministre de l'Habitat", en: "Queen Mother · Minister of Housing" }, text: { fr: "Maire de 2007 à 2019, puis ministre de l'Habitat et du Développement urbain. Première femme Bangangté au gouvernement.", en: "Mayor from 2007 to 2019, then Minister of Housing and Urban Development. The first Bangangté woman in government." } },
    { slug: "tchouta-moussa", name: "Tchouta Moussa Mbatkam Jean", initials: "TM", role: { fr: "Ancien ministre, in memoriam", en: "Former minister, in memoriam" }, text: { fr: "Ministre du Plan en 1991, ancien directeur de l'Office national des ports, député du Ndé.", en: "Minister of Planning in 1991, former head of the National Ports Authority, MP for the Ndé." } },
    { slug: "jean-keutcha", name: "Jean Keutcha", initials: "JK", role: { fr: "In memoriam", en: "In memoriam" }, text: { fr: "Né à Bangangté en 1923, premier Bangangté membre du gouvernement du Cameroun.", en: "Born in Bangangté in 1923, the first Bangangté member of Cameroon's government." } },
  ] },
  { id: "parlement", icon: "layers", title: { fr: "Parlement", en: "Parliament" }, people: [
    { slug: "celestin-ketchanga", name: "Célestin Ketchanga", initials: "CK", role: { fr: "Sénateur", en: "Senator" }, text: { fr: "Homme d'affaires et homme politique originaire de Bangangté.", en: "Businessman and politician from Bangangté." } },
    { slug: "isaac-ngahane", name: "Isaac Ngahane", initials: "IN", role: { fr: "Ancien député du Wouri", en: "Former MP for Wouri" }, text: { fr: "Député de 2002 à 2005, l'un des premiers Bangangté élus à Douala.", en: "MP from 2002 to 2005, one of the first Bangangté elected in Douala." } },
    { slug: "emilie-kontchou", name: "Émilie Kontchou", initials: "ÉK", role: { fr: "Ancienne députée du Ndé", en: "Former MP for the Ndé" }, text: { fr: "Députée lors de la 5e législature, de 1992 à 1997.", en: "MP during the 5th legislature, from 1992 to 1997." } },
    { slug: "julienne-maveum", name: "Julienne Maveum Pettoun Pahane", initials: "JM", role: { fr: "Pionnière", en: "Pioneer" }, text: { fr: "Première femme originaire de Bangangté élue députée.", en: "The first woman from Bangangté elected to parliament." } },
  ] },
  { id: "mairie", icon: "users", title: { fr: "Mairie de Bangangté", en: "Bangangté town hall" }, people: [
    { slug: "eric-niat", name: "Éric Niat", initials: "ÉN", role: { fr: "Maire depuis 2021", en: "Mayor since 2021" }, text: { fr: "Surnommé le « maire des jeunes », il offre chaque 11 février un concert gratuit à la jeunesse.", en: "Known as «the young people's mayor», he hosts a free concert for young people every 11 February." } },
    { slug: "jonas-kouamouo", name: "Jonas Kouamouo", initials: "JK", role: { fr: "Maire de 2019 à 2021", en: "Mayor from 2019 to 2021" }, text: { fr: "Pharmacien et enseignant à l'Université des Montagnes.", en: "Pharmacist and lecturer at the Université des Montagnes." } },
  ] },
];

// ---------- 2. Autorité traditionnelle : les sept chefs, à égalité ----------

export const TRADITIONAL_TIERS: Tier[] = [
  { id: "degre1", icon: "mask", badge: { fr: "1er degré", en: "1st degree" }, title: { fr: "Chef supérieur de 1er degré", en: "Paramount chief of the 1st degree" }, people: [
  { slug: "roi-bangangte", name: "S.M. Nji Monluh Seidou Pokam", initials: "NS", img: "roi", role: { fr: "Roi des Bangangté · 1er degré", en: "King of the Bangangté · 1st degree" }, text: { fr: "15e roi de la dynastie Mveun Nga', sur le trône depuis 1987 et initiateur du COMENGA.", en: "15th king of the Mveun Nga' dynasty, on the throne since 1987 and founder of COMENGA." } },
  ] },
  { id: "degre2", icon: "landmark", cols: 3, badge: { fr: "2e degré", en: "2nd degree" }, title: { fr: "Chefs de 2e degré, à égalité", en: "2nd-degree chiefs, on equal footing" }, people: [
  { slug: "roi-bahouoc", name: "S.M. Nkamajou Roger II", initials: "NR", img: "roi_bahouoc", role: { fr: "Roi des Bahouoc · 2e degré", en: "King of the Bahouoc · 2nd degree" }, text: { fr: "Le plus petit royaume de la commune, réputé le plus ancien du Ndé. Dynastie Mfeunghaze, « le chef qui ouvre le chemin ».", en: "The council's smallest kingdom, said to be the oldest in the Ndé. The Mfeunghaze dynasty, «the chief who opens the way»." } },
  { slug: "roi-bamena", name: "S.M. Njoukwe Alexandre", initials: "NA", img: "roi_bamena", role: { fr: "Roi des Bamena · 2e degré", en: "King of the Bamena · 2nd degree" }, text: { fr: "Sur le trône depuis 1995, à la tête d'un peuple d'éleveurs connu pour sa fête de la Chèvre.", en: "On the throne since 1995, leading a herding people known for its Festival of the Goat." } },
  { slug: "roi-bangang-fokam", name: "S.M. Kouatchou Jules Roland", initials: "KJ", img: "roi_bangang_fokam", role: { fr: "Roi des Bangang-Fokam · 2e degré", en: "King of the Bangang-Fokam · 2nd degree" }, text: { fr: "Royaume fondé au XVIIe siècle par Kammi, frère jumeau de Ngami, fondateur de Bangangté.", en: "Kingdom founded in the 17th century by Kammi, twin brother of Ngami, founder of Bangangté." } },
  { slug: "roi-bangoua", name: "S.M. Djampou Tchatchouang Anick Julio", initials: "DT", img: "roi_bangoua", role: { fr: "Roi des Bangoua · 2e degré", en: "King of the Bangoua · 2nd degree" }, text: { fr: "Sur le trône depuis 2001, gardien de la fête du macabo et de son musée royal.", en: "On the throne since 2001, keeper of the macabo festival and its royal museum." } },
  { slug: "roi-bangoulap", name: "S.M. Yonkeu Jean Marie", initials: "YJ", img: "roi_bangoulap", role: { fr: "Roi des Bangoulap · 2e degré", en: "King of the Bangoulap · 2nd degree" }, text: { fr: "Gardien du plateau sacré de Tagni et de la chefferie de Bangoulap, sur le trône depuis 2004.", en: "Guardian of the Tagni sacred plateau and the Bangoulap chiefdom, on the throne since 2004." } },
  { slug: "roi-batchingou", name: "S.M. Nana André Flaubert", initials: "NF", img: "roi_batchingou", role: { fr: "Roi des Batchingou · 2e degré", en: "King of the Batchingou · 2nd degree" }, text: { fr: "12e souverain de sa lignée, sur le trône depuis 1982, au pied du massif de Batchingou.", en: "12th sovereign of his line, on the throne since 1982, at the foot of the Batchingou massif." } },
  ] },
];

// ---------- 3. Culture, sport et société civile ----------

export const CULTURAL_TIERS: Tier[] = [
  { id: "lettres", icon: "book", title: { fr: "Arts, lettres et médias", en: "Arts, letters and media" }, people: [
    { slug: "claude-njike-bergeret", name: "Claude Njiké-Bergeret", initials: "CN", role: { fr: "Écrivaine", en: "Writer" }, text: { fr: "La « Reine blanche », autrice de Ma passion africaine, récit de sa vie au sein du royaume.", en: "The «White Queen», author of Ma passion africaine, an account of her life in the kingdom." } },
    { slug: "blanche-bailly", name: "Blanche Bailly", initials: "BB", img: "bailly", role: { fr: "Chanteuse", en: "Singer" }, text: { fr: "Artiste et chanteuse camerounaise liée à Bangangté.", en: "Cameroonian singer and artist with roots in Bangangté." } },
    { slug: "cabrel-nanjip", name: "Cabrel Nanjip", initials: "CN", img: "nanjip", role: { fr: "Comédien", en: "Actor and comedian" }, text: { fr: "Né à Bangangté en 1990.", en: "Born in Bangangté in 1990." } },
    { slug: "hilaire-mbakop", name: "Hilaire Mbakop", initials: "HM", role: { fr: "Écrivain", en: "Writer" }, text: { fr: "Écrivain camerounais, né à Bangangté en 1973.", en: "Cameroonian writer, born in Bangangté in 1973." } },
    { slug: "theophile-kouamouo", name: "Théophile Kouamouo", initials: "TK", role: { fr: "Journaliste", en: "Journalist" }, text: { fr: "Journaliste, il a vécu à Bangangté.", en: "A journalist who lived in Bangangté." } },
  ] },
  { id: "sport", icon: "ball", title: { fr: "Sport : internationaux et champions", en: "Sport: internationals and champions" }, people: [
    { slug: "jackson-tchatchoua", name: "Jackson Tchatchoua", initials: "JT", img: "tchatchoua", role: { fr: "Football", en: "Football" }, text: { fr: "International camerounais, photographié avec Wolverhampton en 2025.", en: "Cameroon international, pictured with Wolverhampton in 2025." } },
    { slug: "olivier-kemen", name: "Olivier Kemen", initials: "OK", img: "kemen", role: { fr: "Football", en: "Football" }, text: { fr: "Milieu international camerounais.", en: "Cameroon international midfielder." } },
    { slug: "bernard-tchoutang", name: "Bernard Tchoutang", initials: "BT", img: "tchoutang", role: { fr: "Football", en: "Football" }, text: { fr: "Ancien international camerounais.", en: "Former Cameroon international." } },
    { slug: "bill-tchato", name: "Bill Tchato", initials: "BT", role: { fr: "Football", en: "Football" }, text: { fr: "Ancien international camerounais, père du footballeur Enzo Tchato.", en: "Former Cameroon international, father of footballer Enzo Tchato." } },
    { slug: "charley-fomen", name: "Charley Fomen", initials: "CF", role: { fr: "Football", en: "Football" }, text: { fr: "Footballeur international camerounais.", en: "Cameroon international footballer." } },
    { slug: "rene-ndjeya", name: "René N'Djeya", initials: "RN", role: { fr: "Football", en: "Football" }, text: { fr: "Footballeur international camerounais.", en: "Cameroon international footballer." } },
    { slug: "guy-noel-tapoko", name: "Guy-Noël Tapoko", initials: "GT", role: { fr: "Football", en: "Football" }, text: { fr: "Footballeur né à Bangangté en 1968.", en: "Footballer born in Bangangté in 1968." } },
    { slug: "augustine-simo", name: "Augustine Simo", initials: "AS", role: { fr: "Football", en: "Football" }, text: { fr: "Footballeur né à Bangangté en 1978.", en: "Footballer born in Bangangté in 1978." } },
    { slug: "maxwell-nana-djantou", name: "Maxwell Nana Djantou", initials: "MD", role: { fr: "Sambo", en: "Sambo" }, text: { fr: "Pratiquant d'arts martiaux mixtes, champion du monde de sambo.", en: "Mixed martial artist and world Sambo champion." } },
    { slug: "junior-ngadja-nyabeheu", name: "Junior Ngadja Nyabeheu", initials: "JN", role: { fr: "Haltérophilie", en: "Weightlifting" }, text: { fr: "Champion d'Afrique et médaillé d'or aux Jeux du Commonwealth.", en: "African champion and Commonwealth Games gold medallist." } },
  ] },
  { id: "societe", icon: "users", title: { fr: "Médecine, éducation, diplomatie et diaspora", en: "Medicine, education, diplomacy and diaspora" }, people: [
    { slug: "guy-sandjong", name: "Dr Guy Sandjong", initials: "GS", role: { fr: "Gynécologue-obstétricien", en: "Obstetrician-gynaecologist" }, text: { fr: "Président de l'Ordre national des médecins du Cameroun.", en: "President of the National Medical Council of Cameroon." } },
    { slug: "pierre-marie-noundou", name: "Dr Pierre Marie Noundou", initials: "PN", role: { fr: "Chirurgien", en: "Surgeon" }, text: { fr: "Proctologie, traumatologie du sport et médecine tropicale, promoteur de la Clinique du Golf à Yaoundé.", en: "Proctology, sports trauma and tropical medicine; founder of the Clinique du Golf in Yaoundé." } },
    { slug: "christopher-kwekoua", name: "Christopher Kwekoua", initials: "CK", role: { fr: "Éducation", en: "Education" }, text: { fr: "Ancien délégué régional des Enseignements secondaires de l'Ouest.", en: "Former regional head of secondary education for the West." } },
    { slug: "roland-tankouan", name: "S.E. Roland Tankouan", initials: "RT", role: { fr: "Diplomatie", en: "Diplomacy" }, text: { fr: "Consul honoraire de Suède.", en: "Honorary Consul of Sweden." } },
    { slug: "moise-nzemen", name: "Moïse Nzemen", initials: "MN", role: { fr: "Diaspora", en: "Diaspora" }, text: { fr: "Président du premier Congrès mondial du peuple Bangangté, en décembre 2017.", en: "Chair of the first World Congress of the Bangangté people, in December 2017." } },
  ] },
];
