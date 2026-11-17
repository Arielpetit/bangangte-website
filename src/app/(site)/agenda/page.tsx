import Link from "next/link";
import { Collage } from "@/components/Collage";
import { Countdown } from "@/components/Interactive";
import { EventTile, Empty } from "@/components/mairie";
import { Icon, SecHead, T } from "@/components/ui";
import { getSettings, getUpcomingEvents } from "@/lib/data/content";
import { dayMonth } from "@/lib/data/format";
import { MONTHS, MONTHS_SHORT } from "@/lib/events";
import type { CalEvent } from "@/lib/data/types";
import { meta } from "@/lib/meta";
import { Hero } from "@/components/Hero";

export const dynamic = "force-dynamic";
export const metadata = meta("Agenda", "Events", "Agenda de la Commune de Bangangté : Jeudi propre, sessions du conseil municipal, fêtes officielles, programmes jeunesse, COMENGA et festivals du Ndé.");

export default async function Agenda() {
  const [events, settings] = await Promise.all([getUpcomingEvents(), getSettings()]);
  const comenga = events.find((e) => e.slug.startsWith("comenga"));
  const weekly = events.filter((e) => /chaque\s+\w+/i.test(e.date_label_fr ?? ""));
  const rest = events.filter((e) => !weekly.includes(e) && e !== comenga);

  // Regroupement par mois (année-mois), dans l'ordre.
  const groups = new Map<string, CalEvent[]>();
  for (const e of rest) {
    const d = dayMonth(e.starts_at);
    const k = `${d.year}-${String(d.monthIndex).padStart(2, "0")}`;
    groups.set(k, [...(groups.get(k) ?? []), e]);
  }
  const now = new Date();
  const ribbon = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    return { k, m: d.getMonth(), n: groups.get(k)?.length ?? 0, now: i === 0 };
  });

  return (
    <>
      <Hero page="agenda"
        crumb={{ fr: "Agenda", en: "Events" }}
        kicker={{ fr: "Toute l'année à Bangangté", en: "All year round in Bangangté" }}
        title={{ fr: "Agenda", en: "Events" }}
        lead={{ fr: "Les rendez-vous de la mairie et de la commune : Jeudi propre, conseil municipal, fêtes officielles, programmes jeunesse, congrès et festivals.", en: "Council and community dates: Clean Thursday, council sessions, official celebrations, youth programmes, congresses and festivals." }}
        img="festival"
        inset="rituel"
        badge={{ big: String(events.length), small: { fr: "rendez-vous à venir", en: "upcoming events" } }}
      />

      {weekly.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <SecHead kicker={{ fr: "Chaque semaine", en: "Every week" }} title={{ fr: "Les rendez-vous réguliers de la mairie", en: "The council's weekly events" }} />
            <div className="upcoming-side" data-stagger>{weekly.map((e) => <EventTile key={e.id} e={e} />)}</div>
          </div>
        </section>
      )}

      {comenga && (
        <section className="sec sec-dark" id="comenga">
          <div className="wrap split">
            <div>
              <p className="kicker" data-reveal><T fr="Du 25 novembre au 6 décembre 2026" en="25 November to 6 December 2026" /></p>
              <h2 data-reveal>COMENGA 2026</h2>
              <p className="lead" data-reveal><T fr="5e Congrès mondial des fils et filles Bangangté, sous la présidence de Sa Majesté Nji Monluh Seidou Pokam, sur le thème « Un peuple, un roi, une culture »." en="The 5th World Congress of the Bangangté people, presided over by His Majesty Nji Monluh Seidou Pokam, on the theme “One people, one king, one culture”." /></p>
              <div data-reveal><Countdown /></div>
              {comenga.link && <a className="btn btn-gold" data-reveal href={comenga.link} rel="noopener" target="_blank"><T fr="Programme officiel" en="Official programme" /><Icon name="arrow" /></a>}
            </div>
            <Collage />
          </div>
        </section>
      )}

      <section className={`sec${weekly.length ? " sec-alt" : ""}`}>
        <div className="wrap">
          <SecHead kicker={{ fr: "Les douze prochains mois", en: "The next twelve months" }} title={{ fr: "Calendrier", en: "Calendar" }} text={{ fr: "Choisissez un mois pour aller directement à ses rendez-vous. Les dates marquées « à confirmer » seront précisées par les organisateurs.", en: "Pick a month to jump to its events. Dates marked “to be confirmed” will be set by the organisers." }} />
          <nav className="months" aria-label="Mois / Months" data-reveal>
            {ribbon.map((r) => r.n ? (
              <Link key={r.k} className={`month has${r.now ? " now" : ""}`} href={`#m${r.k}`}><span><T fr={MONTHS_SHORT[r.m].fr} en={MONTHS_SHORT[r.m].en} /></span><i>{r.n}</i></Link>
            ) : (
              <span key={r.k} className={`month${r.now ? " now" : ""}`}><span><T fr={MONTHS_SHORT[r.m].fr} en={MONTHS_SHORT[r.m].en} /></span></span>
            ))}
          </nav>
          {groups.size === 0 ? <Empty fr="Aucun rendez-vous programmé pour le moment." en="Nothing scheduled yet." /> : (
            <div className="cal-months">
              {[...groups.entries()].map(([k, list]) => {
                const [y, m] = k.split("-").map(Number);
                return (
                  <div key={k} className="cal-month" id={`m${k}`}>
                    <div className="cal-label" data-reveal>
                      <span className="cal-num">{String(m).padStart(2, "0")}</span>
                      <h3><T fr={`${MONTHS[m - 1].fr} ${y}`} en={`${MONTHS[m - 1].en} ${y}`} /></h3>
                      <span className="cal-count">{list.length} <T fr={list.length > 1 ? "rendez-vous" : "rendez-vous"} en={list.length > 1 ? "events" : "event"} /></span>
                    </div>
                    <div className="cal-events" data-stagger>{list.map((e) => <EventTile key={e.id} e={e} />)}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="sec">
        <div className="wrap split">
          <div>
            <h2 data-reveal><T fr="Vous organisez un événement ?" en="Organising an event?" /></h2>
            <p className="lead" data-reveal><T fr="Associations, quartiers, écoles, artistes : faites connaître votre événement sur le site de la commune." en="Associations, neighbourhoods, schools, artists: promote your event on the council website." /></p>
          </div>
          <div className="btn-row" data-reveal>
            <Link className="btn btn-solid" href="/contact?objet=evenement"><T fr="Proposer un événement" en="Submit an event" /><Icon name="arrow" /></Link>
            <a className="btn btn-line" href={settings.facebook} rel="noopener" target="_blank"><T fr="Suivre la commune" en="Follow the council" /></a>
          </div>
        </div>
      </section>
    </>
  );
}
