"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/ui";
import { fmtDate } from "@/lib/data/format";
import type { Message } from "@/lib/data/types";
import { useAdmin } from "../_components/AdminContext";
import { useLang, useT } from "../_lib/i18n";

const STATUS = { new: "Nouveau", in_progress: "En cours", closed: "Traité" } as const;
const SUBJECT: Record<string, string> = { question: "Question générale", demarche: "Démarche administrative", evenement: "Proposition d'événement", partenariat: "Investissement / diaspora", presse: "Presse", autre: "Autre", ordures: "Dépôt d'ordures", caniveau: "Caniveau bouché", eclairage: "Lampadaire en panne", voirie: "Route abîmée", eau: "Borne-fontaine" };

export default function MessagesPage() { return <Suspense><Inbox /></Suspense>; }

function Inbox() {
  const { sb, toast, confirm, isAdmin, refreshCounts } = useAdmin();
  const sp = useSearchParams();
  const t = useT();
  const lang = useLang();
  const [rows, setRows] = useState<Message[] | null>(null);
  const [kind, setKind] = useState<"all" | "contact" | "signalement">("all");
  const [st, setSt] = useState<"open" | "all" | "closed">("open");
  const [sel, setSel] = useState<string | null>(sp.get("id"));
  const [notes, setNotes] = useState("");

  const [tick, setTick] = useState(0);
  const load = useCallback(() => setTick((t) => t + 1), []);
  useEffect(() => {
    if (!sb) return;
    sb.from("messages").select("*").order("created_at", { ascending: false }).limit(500).then(({ data, error }) => {
      if (error) toast(error.message, "err");
      setRows((data ?? []) as Message[]);
    });
  }, [sb, toast, tick]);

  const list = (rows ?? []).filter((m) => (kind === "all" || m.kind === kind) && (st === "all" || (st === "open" ? m.status !== "closed" : m.status === "closed")));
  const cur = rows?.find((m) => m.id === sel) ?? null;
  const [lastSel, setLastSel] = useState<string | null>(null);
  if (cur && lastSel !== cur.id) { setLastSel(cur.id); setNotes(cur.notes ?? ""); }

  const update = async (m: Message, patch: Partial<Message>, msg?: string) => {
    if (!sb) return;
    const { error } = await sb.from("messages").update(patch).eq("id", m.id);
    if (error) { toast(error.message, "err"); return; }
    setRows((r) => r?.map((x) => (x.id === m.id ? { ...x, ...patch } : x)) ?? r);
    refreshCounts();
    if (msg) toast(msg);
  };
  const open = (m: Message) => { setSel(m.id); if (m.status === "new") update(m, { status: "in_progress" }); };
  const remove = async (m: Message) => {
    if (!sb || !(await confirm(t("Supprimer ce message ?"), { danger: true, ok: t("Supprimer") }))) return;
    const { error } = await sb.from("messages").delete().eq("id", m.id);
    if (error) toast(error.message, "err"); else { setSel(null); load(); refreshCounts(); }
  };

  return (
    <div className="ad-page">
      <div className="ad-head"><div><h1>{t("Messages")}</h1><p className="ad-muted">{t("Messages du formulaire de contact et signalements des habitants.")}</p></div></div>
      <div className="ad-toolbar">
        <div className="ad-seg">{([["all", "Tous"], ["contact", "Contact"], ["signalement", "Signalements"]] as const).map(([k, l]) => <button key={k} type="button" className={kind === k ? "on" : ""} onClick={() => setKind(k)}>{t(l)}</button>)}</div>
        <div className="ad-seg">{([["open", "À traiter"], ["closed", "Traités"], ["all", "Tout"]] as const).map(([k, l]) => <button key={k} type="button" className={st === k ? "on" : ""} onClick={() => setSt(k)}>{t(l)}</button>)}</div>
      </div>
      <div className={`ad-inbox${cur ? " has-sel" : ""}`}>
        <div className="ad-card ad-list ad-inbox-list">
          {rows === null ? <div className="ad-li ad-skeleton-row" /> : list.length === 0 ? <div className="ad-empty"><Icon name="inbox" /><p>{t("Rien à traiter. Bravo !")}</p></div> : list.map((m) => (
            <button key={m.id} type="button" className={`ad-msg${m.id === sel ? " on" : ""}${m.status === "new" ? " unread" : ""}`} onClick={() => open(m)}>
              <span className={`ad-pi sm ${m.kind === "signalement" ? "red" : ""}`}><Icon name={m.kind === "signalement" ? "alert" : "mail"} /></span>
              <span className="ad-msg-main"><b>{m.name}</b><small>{SUBJECT[m.subject ?? ""] ? t(SUBJECT[m.subject ?? ""]) : m.subject ?? ""}{m.location ? ` · ${m.location}` : ""}</small><span>{m.body.slice(0, 120)}</span></span>
              <span className="ad-msg-date">{fmtDate(m.created_at, lang, { day: "numeric", month: "short" })}</span>
            </button>
          ))}
        </div>
        <div className="ad-card ad-inbox-read">
          {!cur ? <div className="ad-empty"><Icon name="mail" /><p>{t("Sélectionnez un message.")}</p></div> : (
            <>
              <div className="ad-read-head">
                <button type="button" className="ad-icon-btn ad-read-back" aria-label={t("Retour")} onClick={() => setSel(null)}><Icon name="arrow" className="icon flip" /></button>
                <div>
                  <h2>{SUBJECT[cur.subject ?? ""] ? t(SUBJECT[cur.subject ?? ""]) : cur.subject ?? t(cur.kind === "signalement" ? "Signalement" : "Message")}</h2>
                  <p className="ad-muted">{t(cur.kind === "signalement" ? "Signalement reçu le {d}" : "Contact reçu le {d}", { d: fmtDate(cur.created_at, lang, { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) })}</p>
                </div>
                <select value={cur.status} onChange={(e) => update(cur, { status: e.target.value as Message["status"] }, t("État mis à jour."))}>{Object.entries(STATUS).map(([k, l]) => <option key={k} value={k}>{t(l)}</option>)}</select>
              </div>
              <dl className="ad-dl">
                <div><dt>{t("Nom")}</dt><dd>{cur.name}</dd></div>
                {cur.email && <div><dt>{t("E-mail")}</dt><dd><a href={`mailto:${cur.email}`}>{cur.email}</a></dd></div>}
                {cur.phone && <div><dt>{t("Téléphone")}</dt><dd><a href={`tel:${cur.phone.replace(/\s+/g, "")}`}>{cur.phone}</a> · <a href={`https://wa.me/${cur.phone.replace(/\D/g, "").replace(/^(?!237)/, "237")}`} target="_blank" rel="noopener">WhatsApp</a></dd></div>}
                {cur.location && <div><dt>{t("Lieu")}</dt><dd>{cur.location}</dd></div>}
              </dl>
              <div className="ad-msg-body">{cur.body}</div>
              <label className="ad-field"><span>{t("Notes internes")}</span><textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t("Suite donnée, service saisi…")} /></label>
              <div className="ad-row-end">
                {isAdmin && <button className="ad-btn danger-ghost" type="button" onClick={() => remove(cur)}><Icon name="trash" />{t("Supprimer")}</button>}
                {cur.email && <a className="ad-btn ghost" href={`mailto:${cur.email}?subject=${encodeURIComponent("Mairie de Bangangté")}`}><Icon name="mail" />{t("Répondre par e-mail")}</a>}
                <button className="ad-btn primary" type="button" onClick={() => update(cur, { notes, status: "closed" }, t("Message marqué comme traité."))}><Icon name="check" />{t("Marquer comme traité")}</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
