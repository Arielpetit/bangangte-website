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

export const FIGURES: Person[] = [
  { slug: "celestine-ketcha-courtes", name: "Célestine Ketcha Courtès", initials: "CK", img: "ketcha", role: { fr: "Reine mère du royaume", en: "Queen Mother of the kingdom" }, text: { fr: "Maire de 2007 à 2018, puis ministre de l'Habitat et du Développement urbain. Première femme Bangangté au gouvernement.", en: "Mayor from 2007 to 2018, then Minister of Housing and Urban Development. The first Bangangté woman in government." } },
  { slug: "marcel-niat-njifenji", name: "Marcel Niat Njifenji", initials: "MN", img: "niat", role: { fr: "Patriarche", en: "Patriarch" }, text: { fr: "Né à Bangangté en 1934, maire de 2002 à 2007 et premier président du Sénat du Cameroun.", en: "Born in Bangangté in 1934, mayor from 2002 to 2007 and first President of the Senate of Cameroon." } },
  { slug: "claude-njike-bergeret", name: "Claude Njiké-Bergeret", initials: "CN", role: { fr: "Écrivaine", en: "Writer" }, text: { fr: "La « Reine blanche », autrice de Ma passion africaine, récit de sa vie au sein du royaume.", en: "The “White Queen”, author of Ma passion africaine, an account of her life in the kingdom." } },
  { slug: "jean-keutcha", name: "Jean Keutcha", initials: "JK", role: { fr: "In memoriam", en: "In memoriam" }, text: { fr: "Né à Bangangté en 1923, premier Bangangté membre du gouvernement du Cameroun.", en: "Born in Bangangté in 1923, the first Bangangté member of Cameroon's government." } },
];

export const POLITICS: Person[] = [
  { slug: "eric-niat", name: "Éric Niat", initials: "ÉN", role: { fr: "Maire depuis 2021", en: "Mayor since 2021" }, text: { fr: "Surnommé le « maire des jeunes », il offre chaque 11 février un concert gratuit à la jeunesse.", en: "Known as the “young people's mayor”, he hosts a free concert for young people every 11 February." } },
  { slug: "jonas-kouamouo", name: "Jonas Kouamouo", initials: "JK", role: { fr: "Maire de 2019 à 2021", en: "Mayor from 2019 to 2021" }, text: { fr: "Pharmacien et enseignant à l'Université des Montagnes.", en: "Pharmacist and lecturer at the Université des Montagnes." } },
  { slug: "celestin-ketchanga", name: "Célestin Ketchanga", initials: "CK", role: { fr: "Sénateur", en: "Senator" }, text: { fr: "Homme d'affaires et homme politique originaire de Bangangté.", en: "Businessman and politician from Bangangté." } },
  { slug: "tchouta-moussa", name: "Tchouta Moussa Mbatkam Jean", initials: "TM", role: { fr: "Ancien ministre, in memoriam", en: "Former minister, in memoriam" }, text: { fr: "Ministre du Plan en 1991, ancien directeur de l'Office national des ports, député du Ndé.", en: "Minister of Planning in 1991, former head of the National Ports Authority, MP for the Ndé." } },
  { slug: "isaac-ngahane", name: "Isaac Ngahane", initials: "IN", role: { fr: "Ancien député du Wouri", en: "Former MP for Wouri" }, text: { fr: "Député de 2002 à 2005, l'un des premiers Bangangté élus à Douala.", en: "MP from 2002 to 2005, one of the first Bangangté elected in Douala." } },
  { slug: "julienne-maveum", name: "Julienne Maveum Pettoun Pahane", initials: "JM", role: { fr: "Pionnière", en: "Pioneer" }, text: { fr: "Première femme originaire de Bangangté élue députée.", en: "The first woman from Bangangté elected to parliament." } },
  { slug: "emilie-kontchou", name: "Émilie Kontchou", initials: "EK", role: { fr: "Ancienne députée du Ndé", en: "Former MP for the Ndé" }, text: { fr: "Députée lors de la 5e législature, de 1992 à 1997.", en: "MP during the 5th legislature, from 1992 to 1997." } },
];

export const OTHERS: Person[] = [
  { slug: "guy-sandjong", name: "Dr Guy Sandjong", initials: "GS", role: { fr: "Gynécologue-obstétricien", en: "Obstetrician-gynaecologist" }, text: { fr: "Président de l'Ordre national des médecins du Cameroun.", en: "President of the National Medical Council of Cameroon." } },
  { slug: "pierre-marie-noundou", name: "Dr Pierre Marie Noundou", initials: "PN", role: { fr: "Chirurgien", en: "Surgeon" }, text: { fr: "Proctologie, traumatologie du sport et médecine tropicale, promoteur de la Clinique du Golf à Yaoundé.", en: "Proctology, sports trauma and tropical medicine; founder of the Clinique du Golf in Yaoundé." } },
  { slug: "christopher-kwekoua", name: "Christopher Kwekoua", initials: "CK", role: { fr: "Éducation", en: "Education" }, text: { fr: "Ancien délégué régional des Enseignements secondaires de l'Ouest.", en: "Former regional head of secondary education for the West." } },
  { slug: "roland-tankouan", name: "S.E. Roland Tankouan", initials: "RT", role: { fr: "Diplomatie", en: "Diplomacy" }, text: { fr: "Consul honoraire de Suède.", en: "Honorary Consul of Sweden." } },
  { slug: "moise-nzemen", name: "Moïse Nzemen", initials: "MN", role: { fr: "Diaspora", en: "Diaspora" }, text: { fr: "Président du premier Congrès mondial du peuple Bangangté, en décembre 2017.", en: "Chair of the first World Congress of the Bangangté people, in December 2017." } },
  { slug: "nana-gonga", name: "Nana Gonga", initials: "NG", img: "defile", role: { fr: "Chef de bataillon retraité", en: "Retired major" }, text: { fr: "Photographié en uniforme lors du défilé de la fête nationale du 20 mai 2002 à Bangangté.", en: "Pictured in uniform at the 20 May 2002 National Day parade in Bangangté." } },
];

export const ARTS: Person[] = [
  { slug: "blanche-bailly", name: "Blanche Bailly", initials: "BB", img: "bailly", role: { fr: "Chanteuse", en: "Singer" }, text: { fr: "Artiste et chanteuse camerounaise liée à Bangangté.", en: "Cameroonian singer and artist with roots in Bangangté." } },
  { slug: "cabrel-nanjip", name: "Cabrel Nanjip", initials: "CN", img: "nanjip", role: { fr: "Comédien", en: "Actor and comedian" }, text: { fr: "Né à Bangangté en 1990.", en: "Born in Bangangté in 1990." } },
  { slug: "hilaire-mbakop", name: "Hilaire Mbakop", initials: "HM", role: { fr: "Écrivain", en: "Writer" }, text: { fr: "Écrivain camerounais, né à Bangangté en 1973.", en: "Cameroonian writer, born in Bangangté in 1973." } },
  { slug: "theophile-kouamouo", name: "Théophile Kouamouo", initials: "TK", role: { fr: "Journaliste", en: "Journalist" }, text: { fr: "Journaliste, il a vécu à Bangangté.", en: "A journalist who lived in Bangangté." } },
];

export const SPORT: Person[] = [
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
];

export const ROIS: Person[] = [
  { slug: "roi-bangoua", name: "S.M. Djampou Tchatchouang Anick Julio", initials: "DT", img: "roi_bangoua", role: { fr: "Roi des Bangoua", en: "King of the Bangoua" }, text: { fr: "Chef de deuxième degré de Bangoua, sur le trône depuis 2001, célèbre pour son musée royal.", en: "Second-degree chief of Bangoua, on the throne since 2001, known for its royal museum." } },
  { slug: "roi-bangoulap", name: "S.M. Yonkeu Jean Marie", initials: "YJ", img: "roi_bangoulap", role: { fr: "Roi des Bangoulap", en: "King of the Bangoulap" }, text: { fr: "Gardien du plateau sacré de Tagni et de la chefferie de Bangoulap.", en: "Guardian of the Tagni sacred plateau and the Bangoulap chiefdom." } },
  { slug: "roi-bazou", name: "S.M. Tchoua Kemajou Vincent", initials: "TK", img: "roi_bazou", role: { fr: "Roi des Bazou", en: "King of the Bazou" }, text: { fr: "Chef de la chefferie voisine de Bazou, dans le Ndé.", en: "Chief of the neighbouring Bazou chiefdom, in the Ndé." } },
];
