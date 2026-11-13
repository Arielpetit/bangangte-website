"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { IMG, src, type ImgKey } from "@/lib/images";
import { currentLang } from "./Site";
import { Icon, T } from "./ui";

const START = new Date("2026-11-25T08:00:00+01:00").getTime();
const END = new Date("2026-12-06T23:59:00+01:00").getTime();

/** Compte à rebours jusqu'à l'ouverture du COMENGA 2026. */
export function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (now !== null && now >= START) {
    return (
      <p className="lead">
        {now <= END
          ? <T fr="Le COMENGA se déroule en ce moment à Bangangté." en="COMENGA is taking place in Bangangté right now." />
          : <T fr="L'édition 2026 est terminée. Rendez-vous à la prochaine édition." en="The 2026 edition is over. See you at the next one." />}
      </p>
    );
  }
  let s = now === null ? 0 : Math.floor((START - now) / 1000);
  const d = Math.floor(s / 86400); s -= d * 86400;
  const h = Math.floor(s / 3600); s -= h * 3600;
  const m = Math.floor(s / 60); s -= m * 60;
  const show = (v: number, pad = true) => (now === null ? "–" : pad ? String(v).padStart(2, "0") : String(v));
  return (
    <div className="countdown" aria-live="off">
      <div><b>{show(d, false)}</b><span><T fr="jours" en="days" /></span></div>
      <div><b>{show(h)}</b><span><T fr="heures" en="hours" /></span></div>
      <div><b>{show(m)}</b><span><T fr="minutes" en="minutes" /></span></div>
      <div><b>{show(s)}</b><span><T fr="secondes" en="seconds" /></span></div>
    </div>
  );
}

/** Galerie en mosaïque avec visionneuse plein écran. Prévue pour 7 photos : 1 grande + 2 larges + 4 petites = grille 4×3 sans trou. */
export function Gallery({ items }: { items: ImgKey[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [idx, setIdx] = useState(0);
  const [lang, setLangState] = useState<"fr" | "en">("fr");
  useEffect(() => {
    const on = () => setLangState(currentLang());
    on();
    window.addEventListener("langchange", on);
    return () => window.removeEventListener("langchange", on);
  }, []);
  const open = (i: number) => { setIdx((i + items.length) % items.length); if (!dialog.current?.open) dialog.current?.showModal(); };
  const k = items[idx];
  return (
    <>
      <div className="gallery-grid" data-stagger>
        {items.map((key, i) => (
          <button key={key} type="button" className={i === 0 ? "gg-big" : i === 3 || i === 6 ? "gg-wide" : undefined} onClick={() => open(i)} aria-label={IMG[key][lang]}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src(key, 500)} alt={IMG[key].fr} data-en-alt={IMG[key].en} loading="lazy" />
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        onClick={(e) => { if (e.target === dialog.current) dialog.current?.close(); }}
        onKeyDown={(e) => { if (e.key === "ArrowLeft") open(idx - 1); if (e.key === "ArrowRight") open(idx + 1); }}
      >
        <button className="car-btn lb-close" type="button" aria-label="Fermer / Close" onClick={() => dialog.current?.close()}><Icon name="x" /></button>
        <button className="car-btn lb-nav lb-prev prev" type="button" aria-label="Précédente / Previous" onClick={() => open(idx - 1)}><Icon name="arrow" /></button>
        <button className="car-btn lb-nav lb-next" type="button" aria-label="Suivante / Next" onClick={() => open(idx + 1)}><Icon name="arrow" /></button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={k} src={src(k, 1920)} alt={IMG[k][lang]} />
        <p>{IMG[k][lang]}</p>
      </dialog>
    </>
  );
}

/** Formulaire de contact. TODO : relier à l'adresse e-mail ou au service de formulaires de la mairie. */
export function ContactForm() {
  const [status, setStatus] = useState<{ ok: boolean; fr: string; en: string } | null>(null);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setStatus({ ok: false, fr: "Renseignez votre nom, un e-mail valide et votre message.", en: "Enter your name, a valid email and your message." });
      form.reportValidity();
      return;
    }
    setStatus({ ok: true, fr: "Message envoyé. L'équipe de la mairie vous répondra par e-mail.", en: "Message sent. The town hall team will reply by email." });
    form.reset();
  };
  return (
    <form className="form" noValidate onSubmit={submit}>
      <div className="row">
        <label><T fr="Nom complet" en="Full name" /><input type="text" name="nom" autoComplete="name" required /></label>
        <label><T fr="E-mail" en="Email" /><input type="email" name="email" autoComplete="email" required /></label>
      </div>
      <div className="row">
        <label><T fr="Téléphone (facultatif)" en="Phone (optional)" /><input type="tel" name="tel" autoComplete="tel" /></label>
        <label><T fr="Objet" en="Subject" />
          <select name="objet" defaultValue="Question générale">
            <option data-en="General question">Question générale</option>
            <option data-en="Administrative formality">Démarche administrative</option>
            <option data-en="Report a problem">Signaler un problème</option>
            <option data-en="Submit an event">Proposer un événement</option>
            <option data-en="Suggest a notable person">Proposer une personnalité</option>
            <option data-en="List a business">Référencer un établissement</option>
            <option data-en="Investment or diaspora">Investissement ou diaspora</option>
          </select>
        </label>
      </div>
      <label><T fr="Message" en="Message" /><textarea name="message" required /></label>
      <div><button className="btn btn-solid" type="submit"><T fr="Envoyer le message" en="Send message" /><Icon name="arrow" /></button></div>
      <p className={`form-status${status && !status.ok ? " err" : ""}`} role="status" aria-live="polite">
        {status && <T fr={status.fr} en={status.en} />}
      </p>
    </form>
  );
}
