"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui";
import type { Settings } from "@/lib/data/types";
import seed from "@/content/seed/settings.json";
import { useAdmin } from "../_components/AdminContext";
import { ImageField } from "../_components/fields";
import { useT } from "../_lib/i18n";

// Pages dont la photo d'en-tête peut être changée (clé = chemin de la page).
const HERO_PAGES: { k: string; label: string }[] = [
  { k: "actualites", label: "Actualités" }, { k: "communiques", label: "Communiqués" }, { k: "agenda", label: "Agenda" },
  { k: "galerie", label: "Galerie" }, { k: "projets", label: "Projets" }, { k: "services", label: "Services et démarches" },
  { k: "services/signaler", label: "Signaler un problème" }, { k: "contact", label: "Contact" },
  { k: "mairie", label: "La Mairie" }, { k: "mairie/maire", label: "Le Maire" }, { k: "mairie/executif", label: "L'exécutif" },
  { k: "mairie/conseil", label: "Conseil municipal" }, { k: "mairie/administration", label: "Administration" }, { k: "mairie/historique", label: "Historique" },
  { k: "ville", label: "Découvrir : la ville" }, { k: "histoire", label: "Découvrir : histoire" }, { k: "personnalites", label: "Découvrir : personnalités" },
  { k: "nature", label: "Découvrir : nature" }, { k: "culture", label: "Découvrir : culture" }, { k: "sejourner", label: "Découvrir : séjourner" },
];

const GROUPS: { title: string; icon: string; fields: { k: Exclude<keyof Settings, "page_heroes">; label: string; area?: boolean; help?: string }[] }[] = [
  { title: "Coordonnées de la mairie", icon: "phone", fields: [
    { k: "phone", label: "Téléphone" }, { k: "whatsapp", label: "WhatsApp (format international, sans espaces)" }, { k: "email", label: "E-mail" },
    { k: "address_fr", label: "Adresse (français)" }, { k: "address_en", label: "Address (English)" },
    { k: "hours_fr", label: "Horaires d'ouverture (français)" }, { k: "hours_en", label: "Opening hours (English)" },
    { k: "facebook", label: "Page Facebook" },
  ] },
  { title: "Mot du Maire", icon: "users", fields: [
    { k: "mayor_message_fr", label: "Message (français)", area: true, help: "Affiché sur l'accueil et la page du Maire. Laissez vide pour afficher sa biographie." },
    { k: "mayor_message_en", label: "Message (English)", area: true },
  ] },
  { title: "Alerte du moment", icon: "megaphone", fields: [
    { k: "alert_fr", label: "Texte de l'alerte (français)", help: "S'affiche en encart sur tout le site. Laissez vide pour la retirer (les communiqués urgents s'affichent alors automatiquement)." },
    { k: "alert_en", label: "Alert text (English)" },
    { k: "alert_link", label: "Lien de l'alerte", help: "Par exemple /communiques/… ou /agenda" },
  ] },
];

export default function Reglages() {
  const { sb, toast, isAdmin } = useAdmin();
  const t = useT();
  const [s, setS] = useState<Settings | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!sb) return;
    sb.from("settings").select("key,value").then(({ data }) => {
      const merged: Record<string, unknown> = { ...seed };
      for (const r of (data ?? []) as { key: string; value: unknown }[]) merged[r.key] = r.value;
      setS(merged as Settings);
    });
  }, [sb]);

  if (!isAdmin) return <div className="ad-page"><div className="ad-card ad-empty"><Icon name="lock" /><p>{t("Réservé aux administrateurs.")}</p></div></div>;
  if (!s) return <div className="ad-page"><div className="ad-card ad-skeleton" style={{ height: 400 }} /></div>;

  const save = async () => {
    if (!sb) return;
    setBusy(true);
    const { error } = await sb.from("settings").upsert(Object.entries(s).map(([key, value]) => ({ key, value })), { onConflict: "key" });
    setBusy(false);
    toast(error ? error.message : t("Réglages enregistrés. Ils sont en ligne."), error ? "err" : "ok");
  };

  return (
    <div className="ad-page">
      <div className="ad-head">
        <div><h1>{t("Réglages du site")}</h1><p className="ad-muted">{t("Coordonnées, mot du Maire, alerte et photos d’en-tête affichés sur le site public.")}</p></div>
        <button className="ad-btn primary" type="button" disabled={busy} onClick={save}><Icon name="check" />{t("Enregistrer")}</button>
      </div>
      <div className="ad-settings">
        {GROUPS.map((g) => (
          <section key={g.title} className="ad-card">
            <div className="ad-card-head"><h2><Icon name={g.icon} />{t(g.title)}</h2></div>
            <div className="ad-grid2">
              {g.fields.map((f) => (
                <label key={f.k} className={`ad-field${f.area ? " wide" : ""}`}>
                  <span>{t(f.label)}</span>
                  {f.area ? <textarea rows={5} value={s[f.k] ?? ""} onChange={(e) => setS({ ...s, [f.k]: e.target.value })} /> : <input type="text" value={s[f.k] ?? ""} onChange={(e) => setS({ ...s, [f.k]: e.target.value })} />}
                  {f.help && <small className="ad-help">{t(f.help)}</small>}
                </label>
              ))}
            </div>
          </section>
        ))}
        <section className="ad-card">
          <div className="ad-card-head"><h2><Icon name="image" />{t("Photos des en-têtes de page")}</h2></div>
          <p className="ad-muted ad-heroes-intro">{t("La grande photo et la petite photo en haut de chaque page. Laissez vide pour garder la photo par défaut, puis cliquez sur « Enregistrer ».")}</p>
          <div className="ad-heroes">
            {HERO_PAGES.map((pg) => {
              const cur = s.page_heroes?.[pg.k] ?? {};
              const set = (patch: { img?: string | null; inset?: string | null }) => {
                const next = { ...cur, ...patch };
                const all = { ...(s.page_heroes ?? {}) };
                if (!next.img && !next.inset) delete all[pg.k]; else all[pg.k] = next;
                setS({ ...s, page_heroes: all });
              };
              return (
                <div key={pg.k} className="ad-hero-row">
                  <div className="ad-hero-name"><b>{t(pg.label)}</b><small>/{pg.k}</small>{cur.img || cur.inset ? <span className="ad-tag gold">{t("Personnalisée")}</span> : <span className="ad-tag">{t("Par défaut")}</span>}</div>
                  <div className="ad-hero-pics">
                    <div><span className="ad-help">{t("Grande photo")}</span><ImageField value={cur.img ?? null} onChange={(v) => set({ img: v })} /></div>
                    <div><span className="ad-help">{t("Petite photo (médaillon)")}</span><ImageField value={cur.inset ?? null} onChange={(v) => set({ inset: v })} /></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
