"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui";
import { fmtDate } from "@/lib/data/format";
import { listFiles, uploadFile, type StoredFile } from "../_lib/upload";
import { useAdmin } from "../_components/AdminContext";
import { useLang, useT } from "../_lib/i18n";

export default function Medias() {
  const { sb, toast, confirm, canPublish } = useAdmin();
  const t = useT();
  const lang = useLang();
  const [bucket, setBucket] = useState<"media" | "documents">("media");
  const [files, setFiles] = useState<StoredFile[] | null>(null);
  const [busy, setBusy] = useState<{ done: number; total: number } | null>(null);
  const [drag, setDrag] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const [tick, setTick] = useState(0);
  const load = useCallback(() => setTick((t) => t + 1), []);
  useEffect(() => {
    if (!sb) return;
    let alive = true;
    listFiles(sb, bucket).catch(() => [] as StoredFile[]).then((f) => { if (alive) setFiles(f); });
    return () => { alive = false; };
  }, [sb, bucket, tick]);

  const upload = async (list: FileList | File[]) => {
    if (!sb) return;
    const arr = Array.from(list);
    setBusy({ done: 0, total: arr.length });
    for (const f of arr) {
      try { await uploadFile(sb, bucket, f); } catch (e) { toast(`${f.name} : ${(e as Error).message}`, "err"); }
      setBusy((b) => (b ? { ...b, done: b.done + 1 } : b));
    }
    setBusy(null); toast(t("Téléversement terminé.")); load();
  };
  const remove = async (f: StoredFile) => {
    if (!sb || !(await confirm(t("Supprimer {x} ? Les pages qui l'utilisent n'afficheront plus l'image.", { x: f.name }), { danger: true, ok: t("Supprimer") }))) return;
    const { error } = await sb.storage.from(bucket).remove([f.path]);
    if (error) toast(error.message, "err"); else { toast(t("Fichier supprimé.")); load(); }
  };
  const copy = async (u: string) => { try { await navigator.clipboard.writeText(u); toast(t("Lien copié.")); } catch {} };

  return (
    <div className="ad-page">
      <div className="ad-head">
        <div><h1>{t("Médiathèque")}</h1><p className="ad-muted">{t("Photos et documents stockés pour le site.")}</p></div>
        <button className="ad-btn primary" type="button" disabled={!!busy} onClick={() => input.current?.click()}><Icon name="upload" />{t("Téléverser")}</button>
        <input ref={input} type="file" multiple hidden accept={bucket === "media" ? "image/*" : "application/pdf,image/*"} onChange={(e) => e.target.files && upload(e.target.files)} />
      </div>
      <div className="ad-toolbar">
        <div className="ad-seg"><button type="button" className={bucket === "media" ? "on" : ""} onClick={() => { setFiles(null); setBucket("media"); }}>{t("Photos")}</button><button type="button" className={bucket === "documents" ? "on" : ""} onClick={() => { setFiles(null); setBucket("documents"); }}>{t("Documents")}</button></div>
        {busy && <span className="ad-progress inline"><i style={{ width: `${(busy.done / busy.total) * 100}%` }} /></span>}
      </div>
      <div className={`ad-card ad-media-zone${drag ? " drag" : ""}`} onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={(e) => { e.preventDefault(); setDrag(false); upload(e.dataTransfer.files); }}>
        {files === null ? <div className="ad-center-sm"><span className="ad-spinner" /></div> : files.length === 0 ? (
          <div className="ad-empty"><Icon name="upload" /><p>{t("Glissez des fichiers ici pour les téléverser.")}</p></div>
        ) : bucket === "media" ? (
          <div className="ad-thumbs big">{files.map((f) => (
            <figure key={f.path}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.url} alt={f.name} loading="lazy" />
              <figcaption><span>{fmtDate(f.created, lang, { day: "numeric", month: "short", year: "numeric" })} · {Math.round(f.size / 1024)} {t("Ko")}</span>
                <span><button type="button" className="ad-icon-btn" aria-label={t("Copier le lien")} onClick={() => copy(f.url)}><Icon name="external" /></button>{canPublish && <button type="button" className="ad-icon-btn danger" aria-label={t("Supprimer")} onClick={() => remove(f)}><Icon name="trash" /></button>}</span>
              </figcaption>
            </figure>
          ))}</div>
        ) : (
          <ul className="ad-mini">{files.map((f) => (
            <li key={f.path}><a href={f.url} target="_blank" rel="noopener"><Icon name="file" /><span><b>{f.name}</b><small>{fmtDate(f.created, lang)} · {Math.round(f.size / 1024)} {t("Ko")}</small></span></a>
              <span className="ad-li-acts"><button type="button" className="ad-icon-btn" aria-label={t("Copier le lien")} onClick={() => copy(f.url)}><Icon name="external" /></button>{canPublish && <button type="button" className="ad-icon-btn danger" aria-label={t("Supprimer")} onClick={() => remove(f)}><Icon name="trash" /></button>}</span></li>
          ))}</ul>
        )}
      </div>
    </div>
  );
}
