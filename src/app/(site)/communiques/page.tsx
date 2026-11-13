import Link from "next/link";
import { CommuniqueList } from "@/components/mairie";
import { Icon, T } from "@/components/ui";
import { getCommuniques, getSettings } from "@/lib/data/content";
import { COMMUNIQUE_KINDS, type CommuniqueKind } from "@/lib/data/types";
import { meta } from "@/lib/meta";
import { Hero } from "@/components/Hero";

export const dynamic = "force-dynamic";
export const metadata = meta("Communiqués et avis", "Notices", "Communiqués officiels du Maire de Bangangté, avis au public, appels à candidatures, marchés publics, alertes et délibérations.");

export default async function Communiques({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const sp = await searchParams;
  const kind = sp.type && sp.type in COMMUNIQUE_KINDS ? (sp.type as CommuniqueKind) : undefined;
  const [items, all, settings] = await Promise.all([getCommuniques({ kind }), getCommuniques(), getSettings()]);
  return (
    <>
      <Hero page="communiques"
        crumb={{ fr: "Communiqués", en: "Notices" }}
        kicker={{ fr: "Informations officielles", en: "Official information" }}
        title={{ fr: "Communiqués", en: "Notices" }}
        lead={{ fr: "Les annonces officielles de la mairie : communiqués du Maire, avis au public, appels à candidatures, marchés publics et alertes.", en: "Official council announcements: the mayor's notices, public notices, calls for applications, tenders and alerts." }}
        img="hdv"
        landscape
        badge={{ big: String(all.length), small: { fr: "publications officielles", en: "official notices" } }}
      />
      <section className="sec">
        <div className="wrap">
          <nav className="cat-nav" aria-label="Types" data-reveal>
            <Link href="/communiques" aria-current={!kind ? "page" : undefined}><T fr="Tous" en="All" /></Link>
            {(Object.keys(COMMUNIQUE_KINDS) as CommuniqueKind[]).filter((k) => all.some((c) => c.kind === k)).map((k) => (
              <Link key={k} href={`/communiques?type=${k}`} aria-current={kind === k ? "page" : undefined}><T fr={COMMUNIQUE_KINDS[k].fr} en={COMMUNIQUE_KINDS[k].en} /></Link>
            ))}
          </nav>
          <CommuniqueList items={items} />
        </div>
      </section>
      <section className="sec sec-alt">
        <div className="wrap split">
          <div>
            <h2 data-reveal><T fr="Ne manquez aucune annonce" en="Never miss a notice" /></h2>
            <p className="lead" data-reveal><T fr="Les communiqués sont aussi publiés sur la page Facebook de la commune et lus sur les ondes locales." en="Notices are also posted on the council's Facebook page and read on local radio." /></p>
          </div>
          <div className="btn-row" data-reveal>
            <a className="btn btn-solid" href={settings.facebook} rel="noopener" target="_blank"><Icon name="fb" /><T fr="Suivre la commune" en="Follow the council" /></a>
            <a className="btn btn-line" href="https://pridesoft.armp.cm" rel="noopener" target="_blank"><T fr="Marchés publics (ARMP)" en="Public tenders (ARMP)" /></a>
          </div>
        </div>
      </section>
    </>
  );
}
