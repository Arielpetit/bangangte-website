import { ContactForm } from "@/components/Interactive";
import { Icon, PageHero, SecHead, T } from "@/components/ui";
import { meta } from "@/lib/meta";

export const metadata = meta("Contact", "Contact", "Contacter la mairie de Bangangté : adresse, plan d'accès Google Maps, horaires et formulaire de contact.");

export default function Contact() {
  return (
    <>
      <PageHero
        crumb={{ fr: "Contact", en: "Contact" }}
        kicker={{ fr: "Hôtel de ville de Bangangté", en: "Bangangté town hall" }}
        title={{ fr: "Contact", en: "Contact" }}
        lead={{ fr: "Une question, une démarche, un événement à annoncer, une personnalité ou un établissement à référencer ? Écrivez-nous ou passez nous voir.", en: "A question, a formality, an event to announce, a person or business to list? Write to us or come and see us." }}
        img="hdv"
        landscape
        facts={[{ fr: "B.P. 18, Bangangté", en: "PO Box 18, Bangangté" }, { fr: "Radio 92.7 FM", en: "Radio 92.7 FM" }]}
      />

      <section className="sec">
        <div className="wrap contact-grid">
          <div>
            <SecHead kicker={{ fr: "Coordonnées", en: "Details" }} title={{ fr: "Nous trouver", en: "Find us" }} />
            <ul className="info-list" data-stagger>
              <li><span className="pi"><Icon name="pin" /></span><div><small><T fr="Adresse" en="Address" /></small><strong><T fr="Hôtel de ville, B.P. 18, Bangangté, département du Ndé, région de l'Ouest, Cameroun" en="Town hall, PO Box 18, Bangangté, Ndé division, West Region, Cameroon" /></strong></div></li>
              <li><span className="pi"><Icon name="phone" /></span><div><small><T fr="Téléphone" en="Phone" /></small><strong><T fr="À compléter par la mairie" en="To be added by the town hall" /></strong></div></li>
              <li><span className="pi"><Icon name="mail" /></span><div><small><T fr="E-mail" en="Email" /></small><strong><T fr="À compléter par la mairie" en="To be added by the town hall" /></strong></div></li>
              <li><span className="pi"><Icon name="clock" /></span><div><small><T fr="Horaires" en="Opening hours" /></small><strong><T fr="Du lundi au vendredi, horaires à compléter" en="Monday to Friday, hours to be added" /></strong></div></li>
              <li><span className="pi"><Icon name="fb" /></span><div><small>Facebook</small><strong><a href="https://www.facebook.com/commune.bangangte/" rel="noopener" target="_blank">Commune de Bangangté</a></strong></div></li>
            </ul>
          </div>
          <div className="form-card" data-reveal="right">
            <h2><T fr="Écrivez-nous" en="Write to us" /></h2>
            <p className="muted"><T fr="Nous répondons par e-mail dans les meilleurs délais." en="We reply by email as soon as we can." /></p>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <SecHead kicker={{ fr: "Plan d'accès", en: "Map" }} title={{ fr: "Venir à l'hôtel de ville", en: "Getting to the town hall" }} text={{ fr: "L'hôtel de ville se trouve au centre de Bangangté, près des grands axes vers Bafoussam, Bafang et Tonga.", en: "The town hall is in central Bangangté, near the main roads to Bafoussam, Bafang and Tonga." }} />
          <div className="gmap" data-reveal>
            <iframe title="Hôtel de ville de Bangangté sur Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=H%C3%B4tel%20de%20ville%20de%20Bangangt%C3%A9%2C%20Cameroun&z=15&output=embed" />
          </div>
          <p className="note"><a href="https://www.google.com/maps/search/?api=1&query=H%C3%B4tel+de+ville+de+Bangangt%C3%A9" rel="noopener" target="_blank"><T fr="Ouvrir l'itinéraire dans Google Maps" en="Open directions in Google Maps" /></a></p>
        </div>
      </section>
    </>
  );
}
