"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui";
import { useAdmin } from "../_components/AdminContext";
import { LangSwitch } from "../_components/LangSwitch";
import { useT } from "../_lib/i18n";

/** Page d'arrivée des liens d'invitation et de réinitialisation : choix du mot de passe. */
export default function MotDePasse() {
  const { sb, session, toast } = useAdmin();
  const router = useRouter();
  const t = useT();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [waited, setWaited] = useState(false);
  useEffect(() => { const id = setTimeout(() => setWaited(true), 2500); return () => clearTimeout(id); }, []);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const a = String(f.get("p1") ?? ""), b = String(f.get("p2") ?? "");
    if (a.length < 10) { setErr(t("Choisissez au moins 10 caractères.")); return; }
    if (a !== b) { setErr(t("Les deux mots de passe sont différents.")); return; }
    if (!sb) return;
    setBusy(true); setErr("");
    const { error } = await sb.auth.updateUser({ password: a });
    setBusy(false);
    if (error) { setErr(error.message); return; }
    toast(t("Mot de passe enregistré. Bienvenue !"));
    router.replace("/admin");
  };

  return (
    <div className="ad-auth">
      <div className="ad-auth-art" aria-hidden="true">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="" />
          <p className="ad-auth-k">Commune de Bangangté</p>
          <h1>{t("Bienvenue")}</h1>
          <p>{t("Choisissez votre mot de passe pour accéder à l'espace de publication.")}</p>
        </div>
      </div>
      {session ? (
        <form className="ad-auth-form" onSubmit={submit}>
          <div className="ad-auth-lang"><LangSwitch /></div>
          <h2>{t("Nouveau mot de passe")}</h2>
          <p className="ad-muted">{t("Compte : {x}", { x: session.user.email ?? "" })}</p>
          <label className="ad-field"><span>{t("Mot de passe (10 caractères minimum)")}</span><input type="password" name="p1" autoComplete="new-password" required autoFocus /></label>
          <label className="ad-field"><span>{t("Confirmation")}</span><input type="password" name="p2" autoComplete="new-password" required /></label>
          {err && <p className="ad-error"><Icon name="alert" />{err}</p>}
          <button className="ad-btn primary big" type="submit" disabled={busy}>{t(busy ? "Patientez…" : "Enregistrer")}</button>
        </form>
      ) : (
        <div className="ad-auth-form">
          {waited ? <><h2>{t("Lien expiré ou invalide")}</h2><p className="ad-muted">{t("Demandez un nouveau lien depuis la page de connexion (« Mot de passe oublié ? »).")}</p><Link className="ad-btn primary" href="/admin">{t("Aller à la connexion")}</Link></> : <span className="ad-spinner" />}
        </div>
      )}
    </div>
  );
}
