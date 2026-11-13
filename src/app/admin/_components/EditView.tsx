"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/ui";
import { slugify } from "@/lib/data/format";
import { NEW_LABEL, type Resource } from "../_lib/resources";
import { useAdmin } from "./AdminContext";
import { FieldInput } from "./fields";
import { useT } from "../_lib/i18n";

type Row = Record<string, unknown>;

export function EditView({ r, id }: { r: Resource; id: string }) {
  const { sb, toast, confirm, canPublish } = useAdmin();
  const router = useRouter();
  const t = useT();
  const isNew = id === "nouveau";
  const [row, setRow] = useState<Row | null>(isNew ? (r.defaults?.() ?? {}) : null);
  const [saved, setSaved] = useState<string>(isNew ? JSON.stringify(r.defaults?.() ?? {}) : "");
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [busy, setBusy] = useState(false);
  const [slugTouched, setSlugTouched] = useState(!isNew);

  useEffect(() => {
    if (isNew || !sb) return;
    sb.from(r.table).select("*").eq("id", id).maybeSingle().then(({ data, error }) => {
      if (error || !data) { toast(t("Élément introuvable."), "err"); router.replace(`/admin/${r.key}`); return; }
      setRow(data as Row); setSaved(JSON.stringify(data));
    });
  }, [sb, id, isNew, r, router, toast, t]);

  const dirty = row !== null && JSON.stringify(row) !== saved;
  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => { if (dirty) { e.preventDefault(); } };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  const set = useCallback((name: string, v: unknown) => {
    setRow((prev) => {
      const next = { ...(prev ?? {}), [name]: v };
      const slugField = r.fields.find((f) => f.type === "slug");
      if (slugField && !slugTouched && slugField.slugFrom === name) next[slugField.name] = slugify(String(v ?? ""));
      return next;
    });
  }, [r.fields, slugTouched]);

  const main = useMemo(() => r.fields.filter((f) => !f.side), [r.fields]);
  const side = useMemo(() => r.fields.filter((f) => f.side && f.name !== "status"), [r.fields]);
  const hasEn = main.some((f) => f.lang === "en");

  const save = async (publish?: boolean) => {
    if (!sb || !row) return;
    const data: Row = { ...row };
    if (publish !== undefined && r.hasStatus) data.status = publish ? "published" : "draft";
    if (!canPublish && r.hasStatus) data.status = "draft";
    const missing = r.fields.filter((f) => f.required && (data[f.name] === undefined || data[f.name] === null || data[f.name] === "" || (Array.isArray(data[f.name]) && !(data[f.name] as unknown[]).length)));
    if (missing.length) { toast(t("Champ obligatoire : {x}", { x: missing.map((f) => t(f.label)).join(", ") }), "err"); if (missing.some((f) => f.lang === "en")) setLang("en"); else setLang("fr"); return; }
    for (const f of r.fields) if (f.type === "list" && Array.isArray(data[f.name])) data[f.name] = (data[f.name] as string[]).map((s) => s.trim()).filter(Boolean);
    for (const k of ["id", "created_at", "updated_at", "author_id"]) delete data[k];
    setBusy(true);
    const q = isNew ? sb.from(r.table).insert(data).select("*").single() : sb.from(r.table).update(data).eq("id", id).select("*").single();
    const { data: out, error } = await q;
    setBusy(false);
    if (error) {
      toast(error.code === "23505" ? t("Cette adresse (identifiant) est déjà utilisée : modifiez-la.") : error.message, "err");
      return;
    }
    setRow(out as Row); setSaved(JSON.stringify(out));
    toast(t(publish ? "Publié sur le site." : r.hasStatus && (out as Row).status === "draft" ? "Brouillon enregistré." : "Modifications enregistrées."));
    if (isNew) router.replace(`/admin/${r.key}/${(out as Row).id}`);
  };

  const remove = async () => {
    if (!sb || isNew) return;
    if (!(await confirm(t("Supprimer définitivement cet élément ? Cette action est irréversible."), { danger: true, ok: t("Supprimer") }))) return;
    const { error } = await sb.from(r.table).delete().eq("id", id);
    if (error) toast(error.message, "err"); else { toast(t("Supprimé.")); setSaved(JSON.stringify(row)); router.replace(`/admin/${r.key}`); }
  };

  if (!row) return <div className="ad-page"><div className="ad-card ad-skeleton" style={{ height: 420 }} /></div>;
  const published = row.status === "published";
  const title = String(row[r.titleField] || "") || t("Sans titre");

  return (
    <div className="ad-page">
      <div className="ad-head ad-head-edit">
        <div>
          <Link className="ad-back" href={`/admin/${r.key}`}><Icon name="arrow" className="icon flip" />{t(r.label)}</Link>
          <h1>{isNew ? t(NEW_LABEL[r.key] ?? "Nouvel élément") : title}</h1>
        </div>
        <div className="ad-row-end">
          {dirty && <span className="ad-dirty">{t("Modifications non enregistrées")}</span>}
          {!isNew && r.publicPath && (!r.hasStatus || published) && <a className="ad-btn ghost" href={r.publicPath(row)} target="_blank" rel="noopener"><Icon name="external" />{t("Voir")}</a>}
          {r.hasStatus ? (
            <>
              <button className="ad-btn ghost" type="button" disabled={busy} onClick={() => save(false)}>{t(published ? "Repasser en brouillon" : "Enregistrer le brouillon")}</button>
              {canPublish ? <button className="ad-btn primary" type="button" disabled={busy} onClick={() => save(true)}><Icon name="check" />{t(published ? "Mettre à jour" : "Publier")}</button>
                : <span className="ad-help">{t("Un éditeur publiera votre brouillon.")}</span>}
            </>
          ) : (
            <button className="ad-btn primary" type="button" disabled={busy} onClick={() => save()}><Icon name="check" />{t("Enregistrer")}</button>
          )}
        </div>
      </div>

      <div className="ad-editor">
        <div className="ad-card ad-editor-main">
          {hasEn && (
            <div className="ad-tabs ad-lang" role="tablist">
              <button type="button" role="tab" aria-selected={lang === "fr"} className={lang === "fr" ? "on" : ""} onClick={() => setLang("fr")}>Français</button>
              <button type="button" role="tab" aria-selected={lang === "en"} className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>English <small>{t("facultatif")}</small></button>
            </div>
          )}
          {lang === "en" && <p className="ad-note"><Icon name="globe" />{t("Laissez vide pour afficher le texte français aux visiteurs anglophones.")}</p>}
          {main.filter((f) => !f.lang || f.lang === lang).map((f) => <FieldInput key={f.name} f={f} row={row} set={set} />)}
        </div>
        <aside className="ad-editor-side">
          {r.hasStatus && (
            <div className="ad-card ad-pub">
              <p className="ad-side-title">{t("Publication")}</p>
              <span className={`ad-status s-${row.status}`}>{t(published ? "Publié" : "Brouillon")}</span>
              {!canPublish && <small className="ad-help">{t("Votre rôle permet de préparer des brouillons.")}</small>}
            </div>
          )}
          <div className="ad-card">
            {side.map((f) => <FieldInput key={f.name} f={f} row={row} set={set} slugTouched={slugTouched} onSlugTouch={() => setSlugTouched(true)} />)}
          </div>
          {!isNew && canPublish && <button className="ad-btn danger-ghost" type="button" onClick={remove}><Icon name="trash" />{t("Supprimer")}</button>}
        </aside>
      </div>
    </div>
  );
}
