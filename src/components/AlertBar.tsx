import { getActiveUrgent, getSettings } from "@/lib/data/content";
import { AlertPop } from "./AlertPop";

/** Alerte du moment : texte saisi dans les réglages, sinon dernier communiqué urgent encore valable. */
export async function AlertBar() {
  const [settings, urgent] = await Promise.all([getSettings(), getActiveUrgent()]);
  if (settings.alert_fr) {
    return <AlertPop id={`s-${settings.alert_fr.length}-${settings.alert_fr.slice(0, 12)}`} href={settings.alert_link || "/communiques"} fr={settings.alert_fr} en={settings.alert_en || settings.alert_fr} />;
  }
  if (!urgent) return null;
  return <AlertPop id={urgent.id} href={`/communiques/${urgent.slug}`} fr={urgent.title_fr} en={urgent.title_en || urgent.title_fr} />;
}
