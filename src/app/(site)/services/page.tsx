import Link from "next/link";
import { ProcedureLink, themeOf } from "@/components/mairie";
import { Icon, T } from "@/components/ui";
import { getProcedures, getSettings } from "@/lib/data/content";
import { PROCEDURE_THEMES, type ProcedureTheme } from "@/lib/data/types";
import { meta } from "@/lib/meta";
import { Hero } from "@/components/Hero";

export const dynamic = "force-dynamic";
export const metadata = meta("Démarches et services", "Formalities and services", "Démarches à la Mairie de Bangangté : état civil, urbanisme, marchés, hygiène, aide sociale, emploi des jeunes. Pièces à fournir, coûts, délais.");

export default async function Services() {
  const [procs, s] = await Promise.all([getProcedures(), getSettings()]);
  const themes = (Object.keys(PROCEDURE_THEMES) as ProcedureTheme[]).filter((t) => procs.some((p) => p.theme === t));
  return (
    <>
      <Hero page="services"
        crumb={{ fr: "Démarches", en: "Formalities" }}
        kicker={{ fr: "Services municipaux", en: "Council services" }}
        title={{ fr: "Vos démarches", en: "Formalities" }}
        lead={{ fr: "Pièces à fournir, coûts, délais et service compétent : préparez votre passage à l'Hôtel de ville. Munissez-vous de votre carte nationale d'identité.", en: "Documents, fees, timing and the department in charge: prepare your visit to the town hall. Bring your national identity card." }}
        img="hdv"
        landscape
        facts={themes.map((t) => ({ fr: PROCEDURE_THEMES[t].fr, en: PROCEDURE_THEMES[t].en }))}
      />
      <section className="sec">
        <div className="wrap">
          <div className="proc-themes">
            {themes.map((t) => {
              const th = themeOf(t);
              return (
                <section key={t} className="proc-theme" id={t} data-reveal>
                  <header><span className="pi"><Icon name={th.icon} /></span><h2><T fr={th.fr} en={th.en} /></h2></header>
                  <ul>{procs.filter((p) => p.theme === t).map((p) => <ProcedureLink key={p.id} p={p} />)}</ul>
                </section>
              );
            })}
          </div>
        </div>
      </section>
      <section className="sec sec-dark">
        <div className="wrap g3" data-stagger>
          <article className="panel"><div className="pi"><Icon name="clock" /></div><h3><T fr="Horaires d'ouverture" en="Opening hours" /></h3><p><T fr={s.hours_fr} en={s.hours_en} /></p></article>
          <article className="panel"><div className="pi"><Icon name="pin" /></div><h3><T fr="Où nous trouver" en="Where to find us" /></h3><p><T fr={s.address_fr} en={s.address_en} /></p></article>
          <Link className="panel" href="/services/signaler" style={{ textDecoration: "none" }}><div className="pi"><Icon name="alert" /></div><h3><T fr="Signaler un problème" en="Report a problem" /></h3><p><T fr="Ordures, caniveau bouché, lampadaire en panne, route abîmée : prévenez la mairie en ligne." en="Waste, blocked drain, broken street light, damaged road: tell the council online." /></p></Link>
        </div>
      </section>
    </>
  );
}
