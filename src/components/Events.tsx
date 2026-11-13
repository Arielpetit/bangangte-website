"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { EVENTS_OTHER, MONTHS, MONTHS_SHORT, type EventItem } from "@/lib/events";
import { IMG, src } from "@/lib/images";
import { Icon, T } from "./ui";

const noop = () => () => {};
/** Mois en cours côté visiteur ; null pendant le rendu serveur (évite tout écart d'hydratation). */
function useCurrentMonth(): number | null {
  return useSyncExternalStore(noop, () => new Date().getMonth() + 1, () => null);
}

/** Carte d'événement : image, pastille de date, catégorie et lieu. */
export function EventCard({ e, big = false }: { e: EventItem; big?: boolean }) {
  return (
    <article className={`ev${big ? " ev-big" : ""}`}>
      <div className="ev-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src(e.img, big ? 960 : 500)} alt={IMG[e.img].fr} data-en-alt={IMG[e.img].en} loading="lazy" />
        <div className="ev-date">
          <b>{e.day ?? <T fr={MONTHS_SHORT[e.month - 1].fr} en={MONTHS_SHORT[e.month - 1].en} />}</b>
          <span>{e.day ? <T fr={MONTHS[e.month - 1].fr} en={MONTHS[e.month - 1].en} /> : <T fr={e.freq.fr} en={e.freq.en} />}</span>
        </div>
        <span className="ev-cat"><T fr={e.cat.fr} en={e.cat.en} /></span>
      </div>
      <div className="ev-body">
        <p className="ev-meta"><Icon name="pin" /><T fr={e.place.fr} en={e.place.en} /> <span aria-hidden="true">/</span> <T fr={e.date.fr} en={e.date.en} /></p>
        <h3><T fr={e.t.fr} en={e.t.en} /></h3>
        <p className="ev-text"><T fr={e.d.fr} en={e.d.en} /></p>
        <ul className="tags">
          <li><T fr={e.freq.fr} en={e.freq.en} /></li>
          {e.warn && <li className="warn"><T fr={e.warn.fr} en={e.warn.en} /></li>}
        </ul>
        {e.link && <a className="link-arrow" href={e.link} rel="noopener" target="_blank"><T fr="Programme officiel" en="Official programme" /><Icon name="arrow" /></a>}
      </div>
    </article>
  );
}

/** Les prochains événements à partir du mois en cours (calculé chez le visiteur). */
export function UpcomingEvents({ count = 3 }: { count?: number }) {
  const m = useCurrentMonth() ?? 11;
  const sorted = [...EVENTS_OTHER].sort((a, b) => {
    const ka = ((a.month - m + 12) % 12) * 100 + (a.day ?? 29);
    const kb = ((b.month - m + 12) % 12) * 100 + (b.day ?? 29);
    return ka - kb;
  });
  const [first, ...rest] = sorted.slice(0, count);
  return (
    <div className="upcoming">
      <EventCard e={first} big />
      <div className="upcoming-side">{rest.map((e) => <EventCard key={e.id} e={e} />)}</div>
    </div>
  );
}

/** Ruban des douze mois avec les mois qui ont des rendez-vous. */
export function MonthRibbon() {
  const current = useCurrentMonth();
  return (
    <nav className="months" aria-label="Mois / Months">
      {MONTHS.map((mo, i) => {
        const n = EVENTS_OTHER.filter((e) => e.month === i + 1).length;
        const cls = `month${n ? " has" : ""}${current === i + 1 ? " now" : ""}`;
        return n ? (
          <Link key={i} className={cls} href={`#m${i + 1}`}><span><T fr={MONTHS_SHORT[i].fr} en={MONTHS_SHORT[i].en} /></span>{n > 0 && <i>{n}</i>}</Link>
        ) : (
          <span key={i} className={cls}><span><T fr={MONTHS_SHORT[i].fr} en={MONTHS_SHORT[i].en} /></span></span>
        );
      })}
    </nav>
  );
}
