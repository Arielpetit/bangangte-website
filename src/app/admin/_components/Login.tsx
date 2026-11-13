"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui";
import { useAdmin } from "./AdminContext";
import { LangSwitch } from "./LangSwitch";
import { useT } from "../_lib/i18n";

export function Login() {
  const { sb, toast } = useAdmin();
  const t = useT();
  const [mode, setMode] = useState<"login" | "reset">("login");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sb) return;
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "").trim();
    setBusy(true); setErr("");
    if (mode === "login") {
      const { error } = await sb.auth.signInWithPassword({ email, password: String(f.get("password") ?? "") });
      if (error) setErr(error.message.includes("Invalid") ? t("E-mail ou mot de passe incorrect.") : error.message);
    } else {
      const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/admin/mot-de-passe` });
      if (error) setErr(error.message); else { toast(t("Si ce compte existe, un lien de réinitialisation vient d'être envoyé.")); setMode("login"); }
    }
    setBusy(false);
  };

  return (
    <div className="ad-auth">
      <div className="ad-auth-art" aria-hidden="true">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="" />
          <p className="ad-auth-k">Commune de Bangangté</p>
          <h1>{t("Espace agents")}</h1>
          <p>{t("Publiez les actualités, communiqués, événements et photos de la mairie.")}</p>
        </div>
      </div>
      <form className="ad-auth-form" onSubmit={submit}>
        <div className="ad-auth-lang"><LangSwitch /></div>
        <h2>{t(mode === "login" ? "Connexion" : "Mot de passe oublié")}</h2>
        <p className="ad-muted">{t(mode === "login" ? "Accès réservé au personnel habilité de la mairie." : "Saisissez votre e-mail : vous recevrez un lien pour choisir un nouveau mot de passe.")}</p>
        <label className="ad-field"><span>{t("E-mail")}</span><input type="email" name="email" autoComplete="username" required autoFocus /></label>
        {mode === "login" && <label className="ad-field"><span>{t("Mot de passe")}</span><input type="password" name="password" autoComplete="current-password" required /></label>}
        {err && <p className="ad-error"><Icon name="alert" />{err}</p>}
        <button className="ad-btn primary big" type="submit" disabled={busy}>{t(busy ? "Patientez…" : mode === "login" ? "Se connecter" : "Recevoir le lien")}</button>
        <button className="ad-link" type="button" onClick={() => { setMode(mode === "login" ? "reset" : "login"); setErr(""); }}>{t(mode === "login" ? "Mot de passe oublié ?" : "Retour à la connexion")}</button>
        <Link className="ad-link" href="/"><Icon name="arrow" className="icon flip" />{t("Retour au site")}</Link>
      </form>
    </div>
  );
}
