"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/ui";
import { fmtDate, mediaUrl } from "@/lib/data/format";
import { NEW_LABEL, type Resource } from "../_lib/resources";
import { useAdmin } from "./AdminContext";
import { useLang, useT } from "../_lib/i18n";

type Row = Record<string, unknown> & { id: string };
const PAGE = 25;

export function ListView({ r }: { r: Resource }) {
  const { sb, toast, confirm, canPublish } = useAdmin();
  const t = useT();
  const lang = useLang();
  const [rows, setRows] = useState<Row[] | null>(null);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | "published" | "draft">("all");
  const [page, setPage] = useState(0);

  const [tick, setTick] = useState(0);
  const load = useCallback(() => setTick((t) => t + 1), []);
  useEffect(() => {
    if (!sb) return;
    let alive = true;
    sb.from(r.table).select("*").order(r.order[0], { ascending: r.order[1] }).limit(1000).then(({ data, error }) => {
      if (!alive) return;
      if (error) toast(error.message, "err");
      setRows((data ?? []) as Row[]);
    });
    return () => { alive = false; };
  }, [sb, r, toast, tick]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return (rows ?? []).filter((x) => (status === "all" || x.status === status) && (!needle || String(x[r.titleField] ?? "").toLowerCase().includes(needle) || String(x.slug ?? "").includes(needle)));
  }, [rows, q, status, r.titleField]);
  const shown = filtered.slice(page * PAGE, (page + 1) * PAGE);
  const pages = Math.ceil(filtered.length / PAGE);
  const count = (s: string) => (rows ?? []).filter((x) => x.status === s).length;

  const remove = async (row: Row) => {
    if (!sb) return;
    if (!(await confirm(t("Supprimer définitivement « {x} » ? Cette action est irréversible.", { x: String(row[r.titleField]) }), { danger: true, ok: t("Supprimer") }))) return;
    const { error } = await sb.from(r.table).delete().eq("id", row.id);
    if (error) toast(error.message, "err"); else { toast(t("Supprimé.")); load(); }
  };
  const togglePublish = async (row: Row) => {
    if (!sb) return;
    const next = row.status === "published" ? "draft" : "published";
    const { error } = await sb.from(r.table).update({ status: next }).eq("id", row.id);
    if (error) toast(error.message, "err"); else { toast(t(next === "published" ? "Publié sur le site." : "Repassé en brouillon.")); load(); }
  };

  return (
    <div className="ad-page">
      <div className="ad-head">
        <div><h1>{t(r.label)}</h1>{r.intro && <p className="ad-muted">{t(r.intro)}</p>}</div>
        <Link className="ad-btn primary" href={`/admin/${r.key}/nouveau`}><Icon name="plus" />{t(NEW_LABEL[r.key] ?? "Ajouter")}</Link>
      </div>
      <div className="ad-toolbar">
        <label className="ad-search"><Icon name="search" /><input type="search" placeholder={t("Rechercher…")} value={q} onChange={(e) => { setQ(e.target.value); setPage(0); }} /></label>
        {r.hasStatus && (
          <div className="ad-seg" role="tablist">
            {([["all", t("Tous ({n})", { n: rows?.length ?? 0 })], ["published", t("Publiés ({n})", { n: count("published") })], ["draft", t("Brouillons ({n})", { n: count("draft") })]] as const).map(([k, l]) => (
              <button key={k} type="button" role="tab" aria-selected={status === k} className={status === k ? "on" : ""} onClick={() => { setStatus(k); setPage(0); }}>{l}</button>
            ))}
          </div>
        )}
      </div>
      {rows === null ? (
        <div className="ad-card ad-list">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="ad-li ad-skeleton-row" />)}</div>
      ) : shown.length === 0 ? (
        <div className="ad-card ad-empty"><Icon name="inbox" /><p>{t(q ? "Aucun résultat." : "Aucun élément pour le moment.")}</p><Link className="ad-btn primary" href={`/admin/${r.key}/nouveau`}><Icon name="plus" />{t("Créer")}</Link></div>
      ) : (
        <div className="ad-card ad-list">
          {shown.map((row) => {
            const img = r.imageField ? mediaUrl(row[r.imageField] as string, 250) : null;
            const badge = r.badge?.(row);
            const date = r.dateField ? (row[r.dateField] as string) : null;
            return (
              <div key={row.id} className="ad-li">
                {r.imageField && (img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="ad-thumb" src={img} alt="" loading="lazy" />
                ) : <span className="ad-thumb ad-thumb-empty"><Icon name={r.icon} /></span>)}
                <Link className="ad-li-main" href={`/admin/${r.key}/${row.id}`}>
                  <strong>{String(row[r.titleField] ?? t("Sans titre"))}</strong>
                  <span>
                    {badge && <em className="ad-tag">{t(badge)}</em>}
                    {date && <span>{fmtDate(date, lang, { day: "numeric", month: "short", year: "numeric" })}</span>}
                    {Boolean(row.urgent) && <em className="ad-tag red">{t("Urgent")}</em>}
                    {Boolean(row.featured) && <em className="ad-tag gold">{t("À la une")}</em>}
                    {row.validated === false && <em className="ad-tag">{t("À valider")}</em>}
                  </span>
                </Link>
                {r.hasStatus && <span className={`ad-status s-${row.status}`}>{t(row.status === "published" ? "Publié" : "Brouillon")}</span>}
                <div className="ad-li-acts">
                  {r.hasStatus && canPublish && <button type="button" className="ad-icon-btn" title={t(row.status === "published" ? "Dépublier" : "Publier")} aria-label={t(row.status === "published" ? "Dépublier" : "Publier")} onClick={() => togglePublish(row)}><Icon name={row.status === "published" ? "eye" : "check"} /></button>}
                  {r.publicPath && (!r.hasStatus || row.status === "published") && <a className="ad-icon-btn" href={r.publicPath(row)} target="_blank" rel="noopener" title={t("Voir sur le site")} aria-label={t("Voir sur le site")}><Icon name="external" /></a>}
                  <Link className="ad-icon-btn" href={`/admin/${r.key}/${row.id}`} title={t("Modifier")} aria-label={t("Modifier")}><Icon name="edit" /></Link>
                  {canPublish && <button type="button" className="ad-icon-btn danger" title={t("Supprimer")} aria-label={t("Supprimer")} onClick={() => remove(row)}><Icon name="trash" /></button>}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {pages > 1 && (
        <div className="ad-pager">
          <button className="ad-btn ghost sm" type="button" disabled={page === 0} onClick={() => setPage(page - 1)}>{t("Précédent")}</button>
          <span>{page + 1} / {pages}</span>
          <button className="ad-btn ghost sm" type="button" disabled={page >= pages - 1} onClick={() => setPage(page + 1)}>{t("Suivant")}</button>
        </div>
      )}
    </div>
  );
}
