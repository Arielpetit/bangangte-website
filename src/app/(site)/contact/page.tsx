import Link from "next/link";
import { MessageForm } from "@/components/MessageForm";
import { getSettings } from "@/lib/data/content";
import { Icon, SecHead, T } from "@/components/ui";
import { meta } from "@/lib/meta";
import { Hero } from "@/components/Hero";

export const dynamic = "force-dynamic";
export const metadata = meta("Contact", "Contact", "Contacter la mairie de Bangangté : adresse, plan d'accès Google Maps, horaires et formulaire de contact.");

export default async function Contact() {
  const s = await getSettings();
  const tel = s.phone.replace(/\s+/g, "");
  return (
    <>
      <Hero page="contact"
        crumb={{ fr: "Contact", en: "Contact" }}
        kicker={{ fr: "Hôtel de ville de Bangangté", en: "Bangangté town hall" }}
        title={{ fr: "Contact", en: "Contact" }}
        lead={{ fr: "Une question, une démarche, un événement à annoncer, une personnalité ou un établissement à référencer ? Écrivez-nous ou passez nous voir.", en: "A question, a formality, an event to announce, a person or business to list? Write to us or come and see us." }}
        img="hdv"
        landscape
        facts={[{ fr: "B.P. 18, Bangangté", en: "PO Box 18, Bangangté" }, { fr: s.phone, en: s.phone }]}
      />

      <section className="sec">
        <div className="wrap contact-grid">
          <div>
            <SecHead kicker={{ fr: "Coordonnées", en: "Details" }} title={{ fr: "Nous trouver", en: "Find us" }} />
            <ul className="info-list" data-stagger>
              <li><span className="pi"><Icon name="pin" /></span><div><small><T fr="Adresse" en="Address" /></small><strong><T fr={s.address_fr} en={s.address_en} /></strong></div></li>
              <li><span className="pi"><Icon name="phone" /></span><div><small><T fr="Téléphone et WhatsApp" en="Phone and WhatsApp" /></small><strong><a href={`tel:${tel}`}>{s.phone}</a></strong></div></li>
              <li><span className="pi"><Icon name="mail" /></span><div><small><T fr="E-mail" en="Email" /></small><strong><a href={`mailto:${s.email}`}>{s.email}</a></strong></div></li>
              <li><span className="pi"><Icon name="clock" /></span><div><small><T fr="Horaires" en="Opening hours" /></small><strong><T fr={s.hours_fr} en={s.hours_en} /></strong></div></li>
              <li><span className="pi"><Icon name="fb" /></span><div><small>Facebook</small><strong><a href={s.facebook} rel="noopener" target="_blank">Commune de Bangangté</a></strong></div></li>
            </ul>
          </div>
          <div className="form-card" data-reveal="right">
            <h2><T fr="Écrivez-nous" en="Write to us" /></h2>
            <p className="muted"><T fr="Votre message arrive directement dans la boîte de réception de la mairie." en="Your message goes straight to the council's inbox." /> <Link href="/services/signaler"><T fr="Un problème dans votre quartier ?" en="A problem in your area?" /></Link></p>
            <MessageForm kind="contact" />
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
