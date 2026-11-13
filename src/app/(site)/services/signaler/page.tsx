import { MessageForm } from "@/components/MessageForm";
import { Icon, T } from "@/components/ui";
import { meta } from "@/lib/meta";
import { Hero } from "@/components/Hero";

export const metadata = meta("Signaler un problème", "Report a problem", "Signalez à la Mairie de Bangangté un dépôt d'ordures, un caniveau bouché, un lampadaire en panne ou une route abîmée.");

const KINDS = [
  { icon: "leaf", fr: "Dépôt d'ordures", en: "Dumped waste" },
  { icon: "water", fr: "Caniveau bouché, inondation", en: "Blocked drain, flooding" },
  { icon: "bolt", fr: "Lampadaire en panne", en: "Broken street light" },
  { icon: "build", fr: "Route ou pont abîmé", en: "Damaged road or bridge" },
  { icon: "drop", fr: "Borne-fontaine en panne", en: "Broken water point" },
  { icon: "alert", fr: "Autre problème", en: "Other problem" },
];

export default function Signaler() {
  return (
    <>
      <Hero page="services/signaler"
        crumb={{ fr: "Signaler un problème", en: "Report a problem" }}
        kicker={{ fr: "Services municipaux", en: "Council services" }}
        title={{ fr: "Signaler", en: "Report" }}
        lead={{ fr: "Vous avez constaté un problème dans votre quartier ? Prévenez la mairie : votre signalement est transmis au service compétent.", en: "Spotted a problem in your neighbourhood? Tell the council: your report goes to the department in charge." }}
        img="aerial2"
        inset="marche2"
      />
      <section className="sec">
        <div className="wrap contact-grid">
          <div>
            <h2 data-reveal><T fr="Que pouvez-vous signaler ?" en="What can you report?" /></h2>
            <ul className="info-list" data-stagger>
              {KINDS.map((k) => <li key={k.icon + k.fr}><span className="pi"><Icon name={k.icon} /></span><strong><T fr={k.fr} en={k.en} /></strong></li>)}
            </ul>
            <p className="notice" style={{ marginTop: "1.4rem" }}><T fr="En cas d'urgence (incendie, accident), appelez le 118 (sapeurs-pompiers) ou le 117 (police)." en="In an emergency (fire, accident), call 118 (fire brigade) or 117 (police)." /></p>
          </div>
          <div className="form-card" data-reveal="right">
            <h2><T fr="Votre signalement" en="Your report" /></h2>
            <MessageForm kind="signalement" />
          </div>
        </div>
      </section>
    </>
  );
}
