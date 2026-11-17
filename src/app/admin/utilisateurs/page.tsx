"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui";
import { fmtDate } from "@/lib/data/format";
import type { Profile, Role } from "@/lib/data/types";
import { useAdmin } from "../_components/AdminContext";
import { useLang, useT } from "../_lib/i18n";

const ROLES: { v: Role; l: string; d: string }[] = [
  { v: "admin", l: "Administrateur", d: "Tout, y compris les comptes et les réglages" },
  { v: "editor", l: "Éditeur", d: "Publie et modifie tous les contenus" },
  { v: "contributor", l: "Contributeur", d: "Prépare des brouillons" },
  { v: "none", l: "Sans accès", d: "Compte désactivé" },
];

export default function Utilisateurs() {
  const { sb, session, toast, isAdmin, confirm } = useAdmin();
  const t = useT();
  const lang = useLang();
  const [rows, setRows] = useState<Profile[] | null>(null);
  const [busy, setBusy] = useState(false);

  const [tick, setTick] = useState(0);
  const load = useCallback(() => setTick((t) => t + 1), []);
  useEffect(() => {
    if (!sb) return;
    sb.from("profiles").select("*").order("created_at").then(({ data }) => setRows((data ?? []) as Profile[]));
  }, [sb, tick]);

  if (!isAdmin) return <div className="ad-page"><div className="ad-card ad-empty"><Icon name="lock" /><p>{t("Réservé aux administrateurs.")}</p></div></div>;

  const setRole = async (p: Profile, role: Role) => {
    if (!sb) return;
    if (p.id === session?.user.id && role !== "admin" && !(await confirm(t("Vous allez retirer vos propres droits d'administrateur. Continuer ?"), { danger: true }))) return;
    const { error } = await sb.from("profiles").update({ role }).eq("id", p.id);
    if (error) toast(error.message, "err"); else { toast(t("Rôle mis à jour.")); load(); }
  };

  const invite = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setBusy(true);
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token}` },
      body: JSON.stringify({ email: f.get("email"), full_name: f.get("full_name"), role: f.get("role") }),
    });
    const j = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { toast(j.error || t("Invitation impossible."), "err"); return; }
    toast(t("Invitation envoyée par e-mail."));
    form.reset();
    load();
  };

  return (
    <div className="ad-page">
      <div className="ad-head"><div><h1>{t("Utilisateurs")}</h1><p className="ad-muted">{t("Les agents qui peuvent se connecter à l'espace de publication.")}</p></div></div>
      <div className="ad-two wide-first">
        <section className="ad-card">
          <div className="ad-card-head"><h2>{t("Comptes")}</h2></div>
          {rows === null ? <div className="ad-li ad-skeleton-row" /> : (
            <ul className="ad-users">
              {rows.map((p) => (
                <li key={p.id}>
                  <span className="ad-avatar">{(p.full_name || p.email).slice(0, 1).toUpperCase()}</span>
                  <span className="ad-u-main"><b>{p.full_name || p.email}{p.id === session?.user.id && <em className="ad-tag">{t("vous")}</em>}</b><small>{p.email} · {t("depuis le {d}", { d: fmtDate(p.created_at, lang) })}</small></span>
                  <select value={p.role} onChange={(e) => setRole(p, e.target.value as Role)} aria-label={t("Rôle de {x}", { x: p.email })}>{ROLES.map((r) => <option key={r.v} value={r.v}>{t(r.l)}</option>)}</select>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="ad-card">
          <div className="ad-card-head"><h2><Icon name="mail" />{t("Inviter un agent")}</h2></div>
          <form className="ad-form" onSubmit={invite}>
            <label className="ad-field"><span>{t("Nom complet")}</span><input name="full_name" required /></label>
            <label className="ad-field"><span>{t("E-mail")}</span><input name="email" type="email" required /></label>
            <label className="ad-field"><span>{t("Rôle")}</span><select name="role" defaultValue="editor">{ROLES.filter((r) => r.v !== "none").map((r) => <option key={r.v} value={r.v}>{t(r.l)} : {t(r.d)}</option>)}</select></label>
            <button className="ad-btn primary" type="submit" disabled={busy}>{t(busy ? "Envoi…" : "Envoyer l'invitation")}</button>
            <small className="ad-help">{t("L'agent reçoit un e-mail de Supabase pour choisir son mot de passe.")}</small>
          </form>
          <div className="ad-roles">{ROLES.map((r) => <p key={r.v}><b>{t(r.l)}</b> {t(r.d)}</p>)}</div>
        </section>
      </div>
    </div>
  );
}
