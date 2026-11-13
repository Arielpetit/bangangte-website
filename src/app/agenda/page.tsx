import Link from "next/link";
import { Collage } from "@/components/Collage";
import { EventCard, MonthRibbon } from "@/components/Events";
import { Countdown } from "@/components/Interactive";
import { Icon, PageHero, SecHead, T } from "@/components/ui";
import { EVENTS, EVENTS_OTHER, MONTHS } from "@/lib/events";
import { meta } from "@/lib/meta";

export const metadata = meta("Agenda", "Events", "COMENGA 2026, Fête de la jeunesse, fête nationale, festival medumba, Fondation Gacha, Bangoulap Tour et fêtes de Bangangté au fil de l'année.");

export default function Agenda() {
  const months = [...new Set(EVENTS_OTHER.map((e) => e.month))].sort((a, b) => a - b);
  return (
    <>
      <PageHero
        crumb={{ fr: "Agenda", en: "Events" }}
        kicker={{ fr: "Toute l'année à Bangangté", en: "All year round in Bangangté" }}
        title={{ fr: "Agenda", en: "Events" }}
        lead={{ fr: "Congrès, festivals, concerts, marchés et randonnées : les grands rendez-vous de la ville et du Ndé.", en: "Congresses, festivals, concerts, markets and hikes: the big dates in town and across the Ndé." }}
        img="festival"
        inset="rituel"
        badge={{ big: String(EVENTS.length), small: { fr: "rendez-vous par an", en: "events a year" } }}
      />

      <section className="sec sec-dark" id="comenga">
        <div className="wrap split">
          <div>
            <p className="kicker" data-reveal><T fr="Du 25 novembre au 6 décembre 2026" en="25 November to 6 December 2026" /></p>
            <h2 data-reveal>COMENGA 2026</h2>
            <p className="lead" data-reveal><T fr="5e Congrès mondial des fils et filles Bangangté, sous la présidence de Sa Majesté Nji Monluh Seidou Pokam, sur le thème « Un peuple, un roi, une culture »." en="The 5th World Congress of the Bangangté people, presided over by His Majesty Nji Monluh Seidou Pokam, on the theme “One people, one king, one culture”." /></p>
            <div data-reveal><Countdown /></div>
            <p data-reveal><T fr="Le premier congrès s'est tenu en décembre 2017. Depuis, la diaspora et le terroir s'y retrouvent pour la culture, le développement et l'unité." en="The first congress was held in December 2017. Since then, the diaspora and the home community have met there for culture, development and unity." /></p>
            <a className="btn btn-gold" data-reveal href="https://www.chefferie-superieure-bangangte.com/comenga" rel="noopener" target="_blank"><T fr="Programme officiel" en="Official programme" /><Icon name="arrow" /></a>
          </div>
          <Collage />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead kicker={{ fr: "L'année à Bangangté", en: "The year in Bangangté" }} title={{ fr: "Les autres rendez-vous de l'année", en: "The rest of the year" }} text={{ fr: "Après le COMENGA, retrouvez le calendrier du reste de l'année. Choisissez un mois pour aller directement à ses événements ; les dates sont confirmées par les organisateurs.", en: "Beyond COMENGA, here is the calendar for the rest of the year. Pick a month to jump to its events; dates are confirmed by the organisers." }} />
          <div data-reveal><MonthRibbon /></div>

          <div className="cal-months">
            {months.map((m) => (
              <div key={m} className="cal-month" id={`m${m}`}>
                <div className="cal-label" data-reveal>
                  <span className="cal-num">{String(m).padStart(2, "0")}</span>
                  <h3><T fr={MONTHS[m - 1].fr} en={MONTHS[m - 1].en} /></h3>
                  <span className="cal-count">{EVENTS_OTHER.filter((e) => e.month === m).length} <T fr="événement(s)" en="event(s)" /></span>
                </div>
                <div className="cal-events" data-stagger>
                  {EVENTS_OTHER.filter((e) => e.month === m).map((e) => <EventCard key={e.id} e={e} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap split">
          <div>
            <h2 data-reveal><T fr="Vous organisez un événement ?" en="Organising an event?" /></h2>
            <p className="lead" data-reveal><T fr="Associations, quartiers, écoles, artistes : faites connaître votre événement sur le site de la ville." en="Associations, neighbourhoods, schools, artists: promote your event on the town's website." /></p>
          </div>
          <div className="btn-row" data-reveal>
            <Link className="btn btn-solid" href="/contact"><T fr="Proposer un événement" en="Submit an event" /><Icon name="arrow" /></Link>
            <a className="btn btn-line" href="https://www.facebook.com/commune.bangangte/" rel="noopener" target="_blank"><T fr="Suivre la commune" en="Follow the council" /></a>
          </div>
        </div>
      </section>
    </>
  );
}
