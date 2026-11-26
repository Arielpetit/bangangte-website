import type { Bi } from "./nav";

export type BioSection = { id: string; title?: Bi; paragraphs: Bi[]; timeline?: { y: Bi; t: Bi }[] };

const P = (fr: string, en: string): Bi => ({ fr, en });

export const MAYOR_BIO: BioSection[] = [
  {
    id: "presentation",
    paragraphs: [
      P(
        "Éric Aimé NIAT est un homme politique, entrepreneur et dirigeant sportif camerounais. Né à Buea dans la région du Sud-Ouest du Cameroun. Il est maire de la Commune de Bangangté, dans le département du Ndé, région de l'Ouest, depuis le 19 mai 2021. Il est également, depuis juin 2023, président de la Zone IV Afrique de la FIBA, qui regroupe les fédérations de basketball d'Afrique centrale.",
        "Éric Aimé NIAT is a Cameroonian politician, entrepreneur and sports leader. He was born in Buea, in Cameroon's South-West Region. He has been mayor of the Bangangté council, in the Ndé division of the West Region, since 19 May 2021. Since June 2023 he has also been president of FIBA Africa Zone IV, which brings together the basketball federations of Central Africa.",
      ),
    ],
  },
  {
    id: "formation",
    title: P("Formation et débuts professionnels", "Education and early career"),
    paragraphs: [
      P(
        "Éric Aimé NIAT a effectué ses études supérieures aux États-Unis. En 2001, il obtient un diplôme en science politique à l'University of Massachusetts Boston. La même année, il effectue un stage auprès de la Mission permanente du Cameroun auprès des Nations unies à New York. Il est bilingue français-anglais.",
        "Éric Aimé NIAT studied in the United States. In 2001 he earned a degree in political science from the University of Massachusetts Boston. That same year he interned at the Permanent Mission of Cameroon to the United Nations in New York. He is bilingual in French and English.",
      ),
      P(
        "Il commence ensuite sa carrière professionnelle dans le secteur technologique. Il travaille chez Schlumberger de 2004 à 2008, notamment comme chef de projet intranet puis responsable commercial. Parallèlement, il rejoint AppsTech, entreprise spécialisée dans les logiciels de gestion d'entreprise, dont il devient Vice President International, fonction qu'il exerce de 2005 à 2021.",
        "He then began his career in the technology sector. He worked at Schlumberger from 2004 to 2008, notably as intranet project manager and then sales manager. At the same time he joined AppsTech, a company specialising in enterprise management software, where he served as Vice President International from 2005 to 2021.",
      ),
    ],
  },
  {
    id: "entrepreneuriat",
    title: P("L'ancrage dans le Ndé et l'entrepreneuriat", "Roots in the Ndé and entrepreneurship"),
    paragraphs: [
      P(
        "Son parcours entrepreneurial se développe également dans le département du Ndé. En 2014, il prend la direction de SIAP Kafeng, un complexe agro-pastoral et piscicole situé dans l'arrondissement de Bangangté. Il est également associé dans une agence de communication basée à Douala.",
        "His entrepreneurial career also grew in the Ndé division. In 2014 he took over the management of SIAP Kafeng, an agro-pastoral and fish-farming complex in the Bangangté subdivision. He is also a partner in a communications agency based in Douala.",
      ),
      P("Cet ancrage local précède son entrée dans la gestion municipale.", "This local base came before his entry into municipal management."),
    ],
  },
  {
    id: "maire",
    title: P("De conseiller municipal à maire de Bangangté", "From councillor to mayor of Bangangté"),
    paragraphs: [
      P(
        "Éric Aimé NIAT fait son entrée au sein du Conseil municipal de Bangangté en 2013, lorsqu'il est élu 4e adjoint au maire. Il devient ensuite 3e adjoint au maire en 2019 et est réélu conseiller municipal en 2020.",
        "Éric Aimé NIAT joined the Bangangté municipal council in 2013, when he was elected 4th deputy mayor. He became 3rd deputy mayor in 2019 and was re-elected councillor in 2020.",
      ),
      P(
        "À la suite du décès du maire Jonas Kouamouo, le Conseil municipal l'élit maire de Bangangté le 19 mai 2021. Il prête serment devant le tribunal de Bangangté.",
        "Following the death of mayor Jonas Kouamouo, the municipal council elected him mayor of Bangangté on 19 May 2021. He was sworn in before the Bangangté court.",
      ),
      P(
        "Depuis son accession à la tête de la commune, son action municipale s'inscrit notamment autour des questions de services de proximité, d'assainissement, d'accès à l'eau, d'éclairage public, d'infrastructures, d'éducation et de mobilisation citoyenne.",
        "Since taking the helm of the council, his municipal action has centred on local services, sanitation, access to water, public lighting, infrastructure, education and citizen mobilisation.",
      ),
    ],
  },
  {
    id: "basketball",
    title: P("Un engagement marqué dans le basketball", "A strong commitment to basketball"),
    paragraphs: [
      P("Le basketball constitue un autre axe important de son parcours public.", "Basketball is another important strand of his public career."),
      P(
        "Avant d'accéder à la présidence de la Zone IV de la FIBA, Éric Aimé NIAT a exercé des responsabilités au sein de la Fédération camerounaise de basketball. En tant que premier vice-président, il a notamment participé à l'organisation du premier Afrobasket féminin accueilli au Cameroun, à Yaoundé, en 2015. Il est également à l'origine de la Nzuimanto Academy, qui associe sport et éducation.",
        "Before becoming president of FIBA Zone IV, Éric Aimé NIAT held positions in the Cameroonian Basketball Federation. As first vice-president, he helped organise the first women's AfroBasket hosted in Cameroon, in Yaoundé in 2015. He is also behind the Nzuimanto Academy, which combines sport and education.",
      ),
      P(
        "Le 8 juin 2023, à Maputo, au Mozambique, il est élu président de la Zone IV Afrique de la FIBA. Cette zone couvre notamment le Cameroun, le Congo, le Gabon, la Guinée équatoriale, la République centrafricaine, la République démocratique du Congo, São Tomé-et-Príncipe et le Tchad.",
        "On 8 June 2023, in Maputo, Mozambique, he was elected president of FIBA Africa Zone IV. The zone covers Cameroon, Congo, Gabon, Equatorial Guinea, the Central African Republic, the Democratic Republic of the Congo, São Tomé and Príncipe and Chad.",
      ),
    ],
  },
  {
    id: "social",
    title: P("Engagement social et culturel", "Social and cultural commitment"),
    paragraphs: [
      P(
        "Éric Aimé NIAT est également présenté comme porte-parole et membre de la Fondation NIAT, qui mène des actions en faveur de la scolarisation d'enfants défavorisés et des campagnes de proximité dans les villages du Ndé. Il est par ailleurs vice-président de l'association culturelle « Kùm ntsi' Medumba », engagée dans la promotion de la culture medumba.",
        "Éric Aimé NIAT is also presented as spokesperson and member of the NIAT Foundation, which works to send disadvantaged children to school and runs outreach campaigns in the villages of the Ndé. He is also vice-president of the cultural association « Kùm ntsi' Medumba », which promotes Medumba culture.",
      ),
    ],
  },
  {
    id: "distinction",
    title: P("Distinction", "Distinction"),
    paragraphs: [
      P(
        "En mai 2023, Éric Aimé NIAT est élevé au grade d'Officier de l'Ordre de la Valeur camerounais.",
        "In May 2023, Éric Aimé NIAT was made an Officer of the Cameroonian Order of Valour.",
      ),
    ],
  },
  {
    id: "dates",
    title: P("Les grandes dates", "Key dates"),
    paragraphs: [],
    timeline: [
      { y: P("2013", "2013"), t: P("Élu conseiller municipal, 4e adjoint au Maire", "Elected councillor, 4th deputy mayor") },
      { y: P("2019", "2019"), t: P("3e adjoint au Maire", "3rd deputy mayor") },
      { y: P("2020", "2020"), t: P("Réélu conseiller municipal", "Re-elected councillor") },
      { y: P("2021", "2021"), t: P("Élu Maire le 19 mai, prête serment le 3 juin, installé avec ses adjoints le 31 juillet", "Elected mayor on 19 May, sworn in on 3 June, installed with his deputies on 31 July") },
      { y: P("Mai 2023", "May 2023"), t: P("Officier de l'Ordre de la Valeur camerounais", "Officer of the Cameroonian Order of Valour") },
      { y: P("Juin 2023", "June 2023"), t: P("Élu président de la Zone IV Afrique de la FIBA, à Maputo", "Elected president of FIBA Africa Zone IV, in Maputo") },
      { y: P("Oct. 2026", "Oct. 2026"), t: P("Ambassadeur Youth Connekt Cameroon pour la région de l'Ouest", "Youth Connekt Cameroon ambassador for the West Region") },
    ],
  },
  {
    id: "resume",
    title: P("En résumé", "In summary"),
    paragraphs: [
      P(
        "Le parcours d'Éric Aimé NIAT se situe à la croisée de l'entreprise, de la gestion municipale, du sport et de l'engagement social. Son passage du secteur privé à la gouvernance locale, après plusieurs années comme adjoint au maire, puis son accession à la présidence de la Zone IV de la FIBA, constituent les principales étapes de son parcours public.",
        "Éric Aimé NIAT's career sits at the crossroads of business, municipal management, sport and social commitment. His move from the private sector to local government, after several years as deputy mayor, and then to the presidency of FIBA Zone IV, are the main stages of his public career.",
      ),
    ],
  },
];
