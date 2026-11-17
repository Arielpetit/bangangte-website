import Link from "next/link";
import { getSettings } from "@/lib/data/content";
import { GROUPS } from "@/lib/nav";
import { Icon, T } from "./ui";

export async function Footer() {
  const s = await getSettings();
  const tel = s.phone.replace(/\s+/g, "");
  return (
    <footer className="ft">
      <div className="wrap">
        <p className="ft-big" aria-hidden="true">Bangangté</p>
        <div className="ft-grid ft-5">
          <div>
            <div className="ft-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.png" alt="Armoiries de la commune de Bangangté" data-en-alt="Coat of arms of the Bangangté council" /><div><b><T fr="Commune de Bangangté" en="Bangangté council" /></b><span><T fr="Département du Ndé, région de l'Ouest" en="Ndé division, West Region" /></span></div></div>
            <p className="ft-motto">Ba&apos;gha&apos;nte&apos;</p>
            <ul className="ft-contact">
              <li><Icon name="pin" /><T fr={s.address_fr} en={s.address_en} /></li>
              <li><Icon name="clock" /><T fr={s.hours_fr} en={s.hours_en} /></li>
              <li><Icon name="phone" /><a href={`tel:${tel}`}>{s.phone}</a></li>
              <li><Icon name="mail" /><a href={`mailto:${s.email}`}>{s.email}</a></li>
            </ul>
            <a className="ft-social" href={s.facebook} rel="noopener" target="_blank"><Icon name="fb" /><T fr="Suivre la commune" en="Follow the council" /></a>
          </div>
          {GROUPS.map((g) => (
            <div key={g.key}>
              <h4><T fr={g.label.fr} en={g.label.en} /></h4>
              <ul>
                {g.items.map((it) => <li key={it.href}><Link href={it.href}><T fr={it.label.fr} en={it.label.en} /></Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="ft-bottom">
          <span>© {new Date().getFullYear()} <T fr="Commune de Bangangté" en="Bangangté council" /></span>
          <span>
            <Link href="/credits"><T fr="Crédits photos" en="Photo credits" /></Link>
            {" · "}
            <a href="https://www.chefferie-superieure-bangangte.com/" rel="noopener" target="_blank"><T fr="Chefferie supérieure" en="Paramount chiefdom" /></a>
            {" · "}
            <Link href="/admin"><T fr="Espace agents" en="Staff area" /></Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
