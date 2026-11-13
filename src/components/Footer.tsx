import Link from "next/link";
import { GROUPS } from "@/lib/nav";
import { Icon, T } from "./ui";

export function Footer() {
  return (
    <footer className="ft">
      <div className="wrap">
        <p className="ft-big" aria-hidden="true">Bangangté</p>
        <div className="ft-grid">
          <div>
            <div className="ft-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.png" alt="Armoiries de la commune de Bangangté" data-en-alt="Coat of arms of the Bangangté council" /><div><b><T fr="Commune de Bangangté" en="Bangangté council" /></b><span><T fr="Département du Ndé" en="Ndé division" /></span></div></div>
            <p className="ft-motto">Ba&apos;gha&apos;nte&apos;</p>
            <p><T fr="Ceux qui refusent la domination. Chef-lieu du département du Ndé, région de l'Ouest, Cameroun." en="Those who refuse domination. Capital of the Ndé division, West Region, Cameroon." /></p>
            <a className="ft-social" href="https://www.facebook.com/commune.bangangte/" rel="noopener" target="_blank"><Icon name="fb" /><T fr="Commune de Bangangté" en="Bangangté council" /></a>
          </div>
          {GROUPS.map((g) => (
            <div key={g.key}>
              <h4><T fr={g.label.fr} en={g.label.en} /></h4>
              <ul>
                {g.items.map((it) => <li key={it.href}><Link href={it.href}><T fr={it.label.fr} en={it.label.en} /></Link></li>)}
              </ul>
            </div>
          ))}
          <div>
            <h4><T fr="Mairie" en="Town hall" /></h4>
            <ul>
              <li><Link href="/mairie"><T fr="Services municipaux" en="Council services" /></Link></li>
              <li><Link href="/contact"><T fr="Contact et plan d'accès" en="Contact and map" /></Link></li>
              <li><a href="https://www.chefferie-superieure-bangangte.com/" rel="noopener" target="_blank"><T fr="Chefferie supérieure" en="Paramount chiefdom" /></a></li>
              <li><Link href="/credits"><T fr="Crédits photos" en="Photo credits" /></Link></li>
            </ul>
          </div>
        </div>
        <div className="ft-bottom">
          <span>© 2026 <T fr="Commune de Bangangté" en="Bangangté council" /></span>
          <span><T fr="Radio municipale 92.7 FM" en="Municipal radio 92.7 FM" /></span>
        </div>
      </div>
    </footer>
  );
}
