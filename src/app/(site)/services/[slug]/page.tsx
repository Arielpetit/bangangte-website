import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { B, DetailHero, ProcedureLink, themeOf } from "@/components/mairie";
import { Icon, T } from "@/components/ui";
import { getProcedure, getProcedures, getSettings, getUnits } from "@/lib/data/content";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProcedure((await params).slug);
  if (!p) return { title: "Démarche introuvable" };
  return { title: p.title_fr, description: p.summary_fr, other: { "title-fr": `${p.title_fr} | Commune de Bangangté`, "title-en": `${p.title_en || p.title_fr} | Bangangté council` } };
}

export default async function ProcedurePage({ params }: Props) {
  const slug = (await params).slug;
  const p = await getProcedure(slug);
  if (!p) notFound();
  const [all, units, s] = await Promise.all([getProcedures(), getUnits(), getSettings()]);
  const unit = units.find((u) => u.id === p.unit_id);
  const th = themeOf(p.theme);
  const docsEn = p.documents_en?.length ? p.documents_en : p.documents_fr;
  const siblings = all.filter((x) => x.theme === p.theme && x.slug !== slug);
  return (
    <>
      <DetailHero crumbs={[{ href: "/services", fr: "Démarches", en: "Formalities" }, { href: `/services#${p.theme}`, fr: th.fr, en: th.en }]} kicker={<span className="kchip"><Icon name={th.icon} /><T fr={th.fr} en={th.en} /></span>} title={{ fr: p.title_fr, en: p.title_en || p.title_fr }}>
        <p className="lead" style={{ color: "#C8CEE4", maxWidth: "60ch" }}><B fr={p.summary_fr} en={p.summary_en} /></p>
      </DetailHero>
      <section className="sec">
        <div className="wrap sheet">
          <div>
            {!p.validated && <p className="notice warn" style={{ marginBottom: "1.4rem" }} data-reveal><T fr="Fiche indicative en cours de validation par la mairie. Vérifiez les pièces et les coûts auprès du service avant de vous déplacer." en="Guidance sheet being checked by the council. Confirm documents and fees with the department before you come." /></p>}
            <div className="sheet-block" data-reveal>
              <h2><Icon name="file" /><T fr="Pièces à fournir" en="Documents required" /></h2>
              <ol className="docs" data-l="fr">{p.documents_fr.map((d, i) => <li key={i}>{d}</li>)}</ol>
              <ol className="docs" data-l="en">{docsEn.map((d, i) => <li key={i}>{d}</li>)}</ol>
            </div>
            {siblings.length > 0 && (
              <div className="sheet-block" data-reveal>
                <h2><Icon name="layers" /><T fr="Démarches liées" en="Related formalities" /></h2>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>{siblings.map((x) => <ProcedureLink key={x.id} p={x} />)}</ul>
              </div>
            )}
          </div>
          <aside className="article-aside">
            <div className="aside-card">
              <h4><T fr="En pratique" en="In practice" /></h4>
              <ul className="facts-list">
                {p.fees_fr && <li><Icon name="store" /><span><small><T fr="Coût" en="Fee" /></small><strong><B fr={p.fees_fr} en={p.fees_en} /></strong></span></li>}
                {p.delay_fr && <li><Icon name="clock" /><span><small><T fr="Délai" en="Timing" /></small><strong><B fr={p.delay_fr} en={p.delay_en} /></strong></span></li>}
                {(p.where_fr || unit) && <li><Icon name="pin" /><span><small><T fr="Où" en="Where" /></small><strong>{p.where_fr ? <B fr={p.where_fr} en={p.where_en} /> : <B fr={unit!.name_fr} en={unit!.name_en} />}</strong></span></li>}
                <li><Icon name="clock" /><span><small><T fr="Horaires" en="Hours" /></small><strong><B fr={s.hours_fr} en={s.hours_en} /></strong></span></li>
              </ul>
            </div>
            {p.form_url && <a className="btn btn-gold" href={p.form_url} rel="noopener" target="_blank"><Icon name="download" /><T fr="Télécharger le formulaire" en="Download the form" /></a>}
            <Link className="btn btn-line" href={`/contact?objet=demarche&sujet=${encodeURIComponent(p.title_fr)}`}><T fr="Poser une question" en="Ask a question" /><Icon name="arrow" /></Link>
          </aside>
        </div>
      </section>
    </>
  );
}
