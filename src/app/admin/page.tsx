"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui";
import { fmtDate } from "@/lib/data/format";
import type { Message } from "@/lib/data/types";
import { useAdmin } from "./_components/AdminContext";
import { useLang, useT } from "./_lib/i18n";

type Recent = { id: string; title_fr: string; status: string; updated_at: string; table: string };

export default function Dashboard() {
  const { sb, profile } = useAdmin();
  const t = useT();
  const lang = useLang();
  const [stats, setStats] = useState<Record<string, number>>({});
  const [drafts, setDrafts] = useState<Recent[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!sb) return;
    const c = async (table: string, col: string, op: "eq" | "gte", val: string) => {
      const q = sb.from(table).select("id", { count: "exact", head: true });
      const { count } = await (op === "eq" ? q.eq(col, val) : q.gte(col, val));
      return count ?? 0;
    };
    const today = new Date().toISOString();
    Promise.all([
      c("posts", "status", "eq", "published"),
      c("posts", "status", "eq", "draft"),
      c("communiques", "status", "eq", "published"),
      c("events", "starts_at", "gte", today),
      c("messages", "status", "eq", "new"),
      c("projects", "progress", "eq", "ongoing"),
    ]).then(([posts, postDrafts, comms, events, msgs, projects]) => setStats({ posts, postDrafts, comms, events, msgs, projects }));
    Promise.all([
      sb.from("posts").select("id,title_fr,status,updated_at").eq("status", "draft").order("updated_at", { ascending: false }).limit(5),
      sb.from("communiques").select("id,title_fr,status,updated_at").eq("status", "draft").order("updated_at", { ascending: false }).limit(3),
    ]).then(([a, b]) => setDrafts([...(a.data ?? []).map((x) => ({ ...x, table: "actualites" })), ...(b.data ?? []).map((x) => ({ ...x, table: "communiques" }))] as Recent[]));
    sb.from("messages").select("*").order("created_at", { ascending: false }).limit(5).then(({ data }) => setMessages((data ?? []) as Message[]));
  }, [sb]);

  const h = new Date().getHours();
  const hello = t(h < 12 ? "Bonjour" : h < 18 ? "Bon après-midi" : "Bonsoir");
  const name = profile?.full_name?.split(" ")[0] ?? "";
  const CARDS = [
    { k: "posts", label: "Actualités publiées", icon: "news", href: "/admin/actualites" },
    { k: "postDrafts", label: "Brouillons en attente", icon: "edit", href: "/admin/actualites" },
    { k: "events", label: "Événements à venir", icon: "calendar", href: "/admin/agenda" },
    { k: "msgs", label: "Nouveaux messages", icon: "inbox", href: "/admin/messages", hot: true },
  ];
  const QUICK = [
    { href: "/admin/actualites/nouveau", icon: "news", t: "Publier une actualité", d: "Article, photos de l'activité" },
    { href: "/admin/communiques/nouveau", icon: "megaphone", t: "Diffuser un communiqué", d: "Avis, appel, alerte, PDF signé" },
    { href: "/admin/agenda/nouveau", icon: "calendar", t: "Annoncer un événement", d: "Date, lieu, photo" },
    { href: "/admin/albums/nouveau", icon: "image", t: "Créer un album photo", d: "Photothèque du site" },
  ];

  return (
    <div className="ad-page">
      <div className="ad-hello">
        <div>
          <p className="ad-kicker">{fmtDate(new Date().toISOString(), lang, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
          <h1>{hello}{name ? `, ${name}` : ""}</h1>
          <p className="ad-muted">{t("Que souhaitez-vous publier aujourd'hui ?")}</p>
        </div>
      </div>
      <div className="ad-stats">
        {CARDS.map((c) => (
          <Link key={c.k} href={c.href} className={`ad-stat${c.hot && stats[c.k] ? " hot" : ""}`}>
            <span className="ad-pi"><Icon name={c.icon} /></span>
            <b>{stats[c.k] ?? "–"}</b>
            <span>{t(c.label)}</span>
          </Link>
        ))}
      </div>
      <div className="ad-quick">
        {QUICK.map((q) => (
          <Link key={q.href} href={q.href}><span className="ad-pi"><Icon name={q.icon} /></span><span><b>{t(q.t)}</b><small>{t(q.d)}</small></span><Icon name="arrow" /></Link>
        ))}
      </div>
      <div className="ad-two">
        <section className="ad-card">
          <div className="ad-card-head"><h2>{t("Brouillons à finaliser")}</h2></div>
          {drafts.length === 0 ? <p className="ad-muted ad-pad">{t("Aucun brouillon. Tout est publié.")}</p> : (
            <ul className="ad-mini">{drafts.map((d) => <li key={d.id}><Link href={`/admin/${d.table}/${d.id}`}><Icon name={d.table === "communiques" ? "megaphone" : "news"} /><span><b>{d.title_fr}</b><small>{t("Modifié le {d}", { d: fmtDate(d.updated_at, lang, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) })}</small></span></Link></li>)}</ul>
          )}
        </section>
        <section className="ad-card">
          <div className="ad-card-head"><h2>{t("Derniers messages")}</h2><Link className="ad-link" href="/admin/messages">{t("Tout voir")}</Link></div>
          {messages.length === 0 ? <p className="ad-muted ad-pad">{t("Aucun message reçu pour le moment.")}</p> : (
            <ul className="ad-mini">{messages.map((m) => <li key={m.id}><Link href={`/admin/messages?id=${m.id}`}><Icon name={m.kind === "signalement" ? "alert" : "mail"} /><span><b>{m.name}{m.status === "new" && <em className="ad-tag gold">{t("Nouveau")}</em>}</b><small>{m.body.slice(0, 90)}</small></span></Link></li>)}</ul>
          )}
        </section>
      </div>
    </div>
  );
}
