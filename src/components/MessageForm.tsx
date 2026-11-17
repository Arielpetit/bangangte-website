"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { Icon, T } from "./ui";
import { useLang } from "@/lib/useLang";

type Status = { ok: boolean; fr: string; en: string } | null;

const SUBJECTS = [
  { v: "question", fr: "Question générale", en: "General question" },
  { v: "demarche", fr: "Démarche administrative", en: "Administrative formality" },
  { v: "evenement", fr: "Proposer un événement", en: "Submit an event" },
  { v: "partenariat", fr: "Investissement, diaspora ou partenariat", en: "Investment, diaspora or partnership" },
  { v: "presse", fr: "Presse et communication", en: "Press and media" },
  { v: "autre", fr: "Autre", en: "Other" },
];
const PROBLEMS = [
  { v: "ordures", fr: "Dépôt d'ordures", en: "Dumped waste" },
  { v: "caniveau", fr: "Caniveau bouché, inondation", en: "Blocked drain, flooding" },
  { v: "eclairage", fr: "Lampadaire en panne", en: "Broken street light" },
  { v: "voirie", fr: "Route ou pont abîmé", en: "Damaged road or bridge" },
  { v: "eau", fr: "Borne-fontaine en panne", en: "Broken water point" },
  { v: "autre", fr: "Autre", en: "Other" },
];

/** Formulaire de contact ou de signalement : enregistré dans la boîte de réception du tableau de bord. */
export function MessageForm(props: { kind: "contact" | "signalement" }) {
  return <Suspense><Inner {...props} /></Suspense>;
}

function Inner({ kind }: { kind: "contact" | "signalement" }) {
  const sp = useSearchParams();
  const lang = useLang(); // les <option> ne peuvent contenir que du texte : traduites ici plutôt qu'avec <T>
  const [status, setStatus] = useState<Status>(null);
  const [busy, setBusy] = useState(false);
  const initialSubject = sp.get("objet") ?? "question";
  const initialText = sp.get("sujet") ? `${sp.get("sujet")} : ` : "";

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setStatus({ ok: false, fr: "Merci de remplir les champs obligatoires.", en: "Please fill in the required fields." });
      form.reportValidity();
      return;
    }
    setBusy(true);
    setStatus(null);
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, kind }) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "error");
      setStatus(kind === "signalement"
        ? { ok: true, fr: "Merci ! Votre signalement a été transmis au service compétent.", en: "Thank you! Your report has been passed to the department in charge." }
        : { ok: true, fr: "Message envoyé. L'équipe de la mairie vous répondra dans les meilleurs délais.", en: "Message sent. The council team will get back to you as soon as possible." });
      form.reset();
    } catch {
      setStatus({ ok: false, fr: "L'envoi n'a pas abouti. Réessayez ou appelez la mairie.", en: "Sending failed. Please try again or call the council." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="form" noValidate onSubmit={submit}>
      <label className="hp" aria-hidden="true">Site<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="row">
        <label><T fr="Nom complet *" en="Full name *" /><input type="text" name="name" autoComplete="name" required maxLength={120} /></label>
        <label><T fr="Téléphone" en="Phone" /><input type="tel" name="phone" autoComplete="tel" maxLength={40} placeholder="6XX XX XX XX" /></label>
      </div>
      <label><T fr={kind === "contact" ? "E-mail *" : "E-mail"} en={kind === "contact" ? "Email *" : "Email"} /><input type="email" name="email" autoComplete="email" required={kind === "contact"} maxLength={160} /></label>
      {kind === "contact" ? (
        <label><T fr="Objet" en="Subject" />
          <select name="subject" defaultValue={initialSubject}>
            {SUBJECTS.map((s) => <option key={s.v} value={s.v}>{s[lang]}</option>)}
          </select>
        </label>
      ) : (
        <div className="row">
          <label><T fr="Type de problème *" en="Type of problem *" />
            <select name="subject" defaultValue="ordures" required>
              {PROBLEMS.map((s) => <option key={s.v} value={s.v}>{s[lang]}</option>)}
            </select>
          </label>
          <label><T fr="Lieu précis *" en="Exact location *" /><input type="text" name="location" required maxLength={200} placeholder="Quartier, repère…" /></label>
        </div>
      )}
      <label><T fr={kind === "contact" ? "Message *" : "Description *"} en={kind === "contact" ? "Message *" : "Description *"} /><textarea name="body" required maxLength={4000} defaultValue={initialText} /></label>
      <div><button className="btn btn-solid" type="submit" disabled={busy}>{busy ? <T fr="Envoi…" en="Sending…" /> : kind === "contact" ? <T fr="Envoyer le message" en="Send message" /> : <T fr="Envoyer le signalement" en="Send report" />}<Icon name="arrow" /></button></div>
      <p className={`form-status${status && !status.ok ? " err" : ""}${status?.ok ? " ok-box" : ""}`} role="status" aria-live="polite">
        {status?.ok && <Icon name="check" />}{status && <T fr={status.fr} en={status.en} />}
      </p>
    </form>
  );
}
