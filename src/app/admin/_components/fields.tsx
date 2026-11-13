"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/ui";
import { mediaUrl, slugify } from "@/lib/data/format";
import { IMG, type ImgKey } from "@/lib/images";
import type { Photo } from "@/lib/data/types";
import { ICONS, type Field } from "../_lib/resources";
import { listFiles, uploadFile, type StoredFile } from "../_lib/upload";
import { useAdmin } from "./AdminContext";
import { useLang, useT } from "../_lib/i18n";

const RichEditor = dynamic(() => import("./RichEditor").then((m) => m.RichEditor), { ssr: false, loading: () => <div className="ad-rich ad-skeleton" /> });

type Row = Record<string, unknown>;

/** Convertit une date ISO en valeur d'input « datetime-local » (heure du Cameroun). */
function toLocal(iso: unknown, dateOnly = false) {
  if (!iso || typeof iso !== "string") return "";
  if (dateOnly) return iso.slice(0, 10);
  const d = new Date(iso);
  const p = new Intl.DateTimeFormat("sv-SE", { timeZone: "Africa/Douala", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).format(d);
  return p.replace(" ", "T");
}
const fromLocal = (v: string) => (v ? new Date(`${v}:00+01:00`).toISOString() : null);

export function FieldInput({ f, row, set, slugTouched, onSlugTouch }: { f: Field; row: Row; set: (name: string, v: unknown) => void; slugTouched?: boolean; onSlugTouch?: () => void }) {
  const t = useT();
  const v = row[f.name];
  const id = `f-${f.name}`;
  const label = <span>{t(f.label)}{f.required && <em aria-hidden="true"> *</em>}</span>;
  const help = f.help ? <small className="ad-help">{t(f.help)}</small> : null;

  switch (f.type) {
    case "text":
      return <label className="ad-field" htmlFor={id}>{label}<input id={id} type="text" value={(v as string) ?? ""} maxLength={f.max} placeholder={f.placeholder && t(f.placeholder)} onChange={(e) => set(f.name, e.target.value)} />{help}</label>;
    case "number":
      return <label className="ad-field" htmlFor={id}>{label}<input id={id} type="number" value={(v as number) ?? ""} onChange={(e) => set(f.name, e.target.value === "" ? null : Number(e.target.value))} />{help}</label>;
    case "textarea":
      return <label className="ad-field" htmlFor={id}>{label}<textarea id={id} rows={f.name.startsWith("excerpt") ? 3 : 5} value={(v as string) ?? ""} maxLength={f.max} placeholder={f.placeholder && t(f.placeholder)} onChange={(e) => set(f.name, e.target.value)} />{f.max && <small className="ad-count">{((v as string) ?? "").length} / {f.max}</small>}{help}</label>;
    case "list":
      return <label className="ad-field" htmlFor={id}>{label}<textarea id={id} rows={6} value={((v as string[]) ?? []).join("\n")} onChange={(e) => set(f.name, e.target.value.split("\n").map((s) => s.replace(/^\s*[-•]\s*/, "")).filter((s, i, a) => s.trim() || i === a.length - 1))} placeholder={t("Une pièce par ligne")} />{help}</label>;
    case "slug":
      return (
        <label className="ad-field" htmlFor={id}>{label}
          <div className="ad-slug"><span>/…/</span><input id={id} type="text" value={(v as string) ?? ""} onChange={(e) => { onSlugTouch?.(); set(f.name, slugify(e.target.value)); }} /></div>
          <small className="ad-help">{t(slugTouched ? "Adresse personnalisée." : "Générée à partir du titre.")} {t("Évitez de la modifier après publication.")}</small>
        </label>
      );
    case "select":
      return <label className="ad-field" htmlFor={id}>{label}<select id={id} value={(v as string) ?? ""} onChange={(e) => set(f.name, e.target.value)}>{f.options!.map((o) => <option key={o.value} value={o.value}>{t(o.label)}</option>)}</select>{help}</label>;
    case "bool":
      return <label className="ad-switch"><input type="checkbox" checked={Boolean(v)} onChange={(e) => set(f.name, e.target.checked)} /><i aria-hidden="true" /><span>{t(f.label)}{help}</span></label>;
    case "date":
      return <label className="ad-field" htmlFor={id}>{label}<input id={id} type="date" value={toLocal(v, true)} onChange={(e) => set(f.name, e.target.value || null)} />{help}</label>;
    case "datetime":
      return <label className="ad-field" htmlFor={id}>{label}<input id={id} type="datetime-local" value={toLocal(v)} onChange={(e) => set(f.name, fromLocal(e.target.value))} />{help}</label>;
    case "rich":
      return <div className="ad-field">{label}<RichEditor value={(v as string) ?? ""} onChange={(html) => set(f.name, html)} />{help}</div>;
    case "image":
      return <div className="ad-field">{label}<ImageField value={(v as string) ?? null} onChange={(u) => set(f.name, u)} />{help}</div>;
    case "gallery":
      return <div className="ad-field">{label}<GalleryField value={(v as Photo[]) ?? []} onChange={(g) => set(f.name, g)} />{help}</div>;
    case "file":
      return <div className="ad-field">{label}<FileField value={(v as string) ?? null} onChange={(u) => set(f.name, u)} />{help}</div>;
    case "relation":
      return <div className="ad-field">{label}<RelationSelect f={f} value={(v as string) ?? null} onChange={(x) => set(f.name, x)} />{help}</div>;
    case "icon":
      return (
        <div className="ad-field">{label}
          <div className="ad-icons">{ICONS.map((ic) => <button key={ic} type="button" className={v === ic ? "on" : ""} onClick={() => set(f.name, ic)} aria-label={ic} title={ic}><Icon name={ic} /></button>)}</div>
        </div>
      );
  }
}

function RelationSelect({ f, value, onChange }: { f: Field; value: string | null; onChange: (v: string | null) => void }) {
  const { sb } = useAdmin();
  const [opts, setOpts] = useState<{ id: string; label: string }[]>([]);
  useEffect(() => {
    if (!sb || !f.relation) return;
    sb.from(f.relation.table).select(`id,${f.relation.label}`).order(f.relation.label).then(({ data }) => setOpts(((data ?? []) as unknown as Row[]).map((r) => ({ id: r.id as string, label: r[f.relation!.label] as string }))));
  }, [sb, f.relation]);
  return (
    <select value={value ?? ""} onChange={(e) => onChange(e.target.value || null)}>
      <option value="">—</option>
      {opts.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
    </select>
  );
}

// ---------- Images ----------
export function ImageField({ value, onChange }: { value: string | null; onChange: (v: string | null) => void }) {
  const t = useT();
  const [picker, setPicker] = useState(false);
  const src = mediaUrl(value, 500);
  return (
    <div className="ad-image">
      {src ? (
        <div className="ad-image-prev">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" />
          <div className="ad-image-acts">
            <button type="button" className="ad-btn sm" onClick={() => setPicker(true)}><Icon name="image" />{t("Changer")}</button>
            <button type="button" className="ad-icon-btn" aria-label={t("Retirer l'image")} onClick={() => onChange(null)}><Icon name="trash" /></button>
          </div>
        </div>
      ) : (
        <button type="button" className="ad-drop" onClick={() => setPicker(true)}><Icon name="image" /><span>{t("Choisir ou téléverser une photo")}</span></button>
      )}
      {picker && <MediaPicker onClose={() => setPicker(false)} onPick={(urls) => { onChange(urls[0] ?? null); setPicker(false); }} />}
    </div>
  );
}

export function GalleryField({ value, onChange }: { value: Photo[]; onChange: (v: Photo[]) => void }) {
  const t = useT();
  const [picker, setPicker] = useState(false);
  const move = (i: number, d: number) => { const n = [...value]; const [x] = n.splice(i, 1); n.splice(i + d, 0, x); onChange(n); };
  return (
    <div className="ad-gallery">
      {value.length > 0 && (
        <ul>
          {value.map((p, i) => (
            <li key={p.url + i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mediaUrl(p.url, 250) ?? ""} alt="" />
              <input type="text" placeholder={t("Légende (facultatif)")} value={p.alt_fr ?? ""} onChange={(e) => onChange(value.map((x, j) => (j === i ? { ...x, alt_fr: e.target.value } : x)))} />
              <div className="ad-g-acts">
                <button type="button" className="ad-icon-btn" disabled={i === 0} onClick={() => move(i, -1)} aria-label={t("Avancer")}><Icon name="arrow" className="icon flip" /></button>
                <button type="button" className="ad-icon-btn" disabled={i === value.length - 1} onClick={() => move(i, 1)} aria-label={t("Reculer")}><Icon name="arrow" /></button>
                <button type="button" className="ad-icon-btn" onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label={t("Retirer")}><Icon name="trash" /></button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button type="button" className="ad-drop" onClick={() => setPicker(true)}><Icon name="plus" /><span>{t("Ajouter des photos")} {value.length > 0 && t("({n} actuellement)", { n: value.length })}</span></button>
      {picker && <MediaPicker multiple onClose={() => setPicker(false)} onPick={(urls) => { onChange([...value, ...urls.map((url) => ({ url }))]); setPicker(false); }} />}
    </div>
  );
}

/** Fenêtre de choix d'images : téléversement, médiathèque Supabase, ou photos déjà présentes sur le site. */
export function MediaPicker({ onPick, onClose, multiple = false }: { onPick: (urls: string[]) => void; onClose: () => void; multiple?: boolean }) {
  const { sb, toast } = useAdmin();
  const t = useT();
  const lang = useLang();
  const [tab, setTab] = useState<"upload" | "media" | "site">("upload");
  const [files, setFiles] = useState<StoredFile[] | null>(null);
  const [sel, setSel] = useState<string[]>([]);
  const [busy, setBusy] = useState<{ done: number; total: number } | null>(null);
  const [drag, setDrag] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => { if (tab === "media" && sb && !files) listFiles(sb, "media").then(setFiles).catch(() => setFiles([])); }, [tab, sb, files]);
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }; document.addEventListener("keydown", k); return () => document.removeEventListener("keydown", k); }, [onClose]);

  const upload = async (list: FileList | File[]) => {
    if (!sb) return;
    const arr = Array.from(list).filter((f) => f.type.startsWith("image/")).slice(0, multiple ? 40 : 1);
    if (!arr.length) return;
    setBusy({ done: 0, total: arr.length });
    const urls: string[] = [];
    for (const f of arr) {
      try { urls.push(await uploadFile(sb, "media", f)); } catch (e) { toast(t("Échec pour {x} : {e}", { x: f.name, e: (e as Error).message }), "err"); }
      setBusy((b) => (b ? { ...b, done: b.done + 1 } : b));
    }
    setBusy(null);
    if (urls.length) { toast(t("{n} photo(s) téléversée(s).", { n: urls.length })); onPick(urls); }
  };
  const toggle = (u: string) => setSel((s) => (multiple ? (s.includes(u) ? s.filter((x) => x !== u) : [...s, u]) : [u]));

  return createPortal(
    <div className="ad-modal-bg" onClick={onClose}>
      <div className="ad-modal ad-picker" role="dialog" aria-modal="true" aria-label={t("Choisir une image")} onClick={(e) => e.stopPropagation()}>
        <header>
          <div className="ad-tabs">
            <button type="button" className={tab === "upload" ? "on" : ""} onClick={() => setTab("upload")}><Icon name="upload" />{t("Téléverser")}</button>
            <button type="button" className={tab === "media" ? "on" : ""} onClick={() => setTab("media")}><Icon name="image" />{t("Médiathèque")}</button>
            <button type="button" className={tab === "site" ? "on" : ""} onClick={() => setTab("site")}><Icon name="grid" />{t("Photos du site")}</button>
          </div>
          <button className="ad-icon-btn" type="button" aria-label={t("Fermer")} onClick={onClose}><Icon name="x" /></button>
        </header>
        <div className="ad-picker-body">
          {tab === "upload" && (
            <div className={`ad-dropzone${drag ? " drag" : ""}`} onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={(e) => { e.preventDefault(); setDrag(false); upload(e.dataTransfer.files); }}>
              <Icon name="upload" />
              {busy ? <p><b>{t("Envoi {a} / {b}…", { a: busy.done, b: busy.total })}</b><span className="ad-progress"><i style={{ width: `${(busy.done / busy.total) * 100}%` }} /></span></p> : <p><b>{t("Glissez vos photos ici")}</b><span>{t("ou")}</span></p>}
              <button className="ad-btn primary" type="button" disabled={!!busy} onClick={() => input.current?.click()}>{t(multiple ? "Choisir des photos" : "Choisir une photo")}</button>
              <small>{t("JPG, PNG ou WebP. Les photos sont redimensionnées et compressées automatiquement.")}</small>
              <input ref={input} type="file" accept="image/*" multiple={multiple} hidden onChange={(e) => e.target.files && upload(e.target.files)} />
            </div>
          )}
          {tab === "media" && (files === null ? <div className="ad-center-sm"><span className="ad-spinner" /></div> : files.length === 0 ? <p className="ad-muted ad-pad">{t("La médiathèque est vide. Téléversez vos premières photos.")}</p> : (
            <div className="ad-thumbs">{files.map((f) => (
              <button key={f.path} type="button" className={sel.includes(f.url) ? "on" : ""} onClick={() => toggle(f.url)} onDoubleClick={() => onPick([f.url])}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.url} alt={f.name} loading="lazy" />{sel.includes(f.url) && <Icon name="check" />}
              </button>
            ))}</div>
          ))}
          {tab === "site" && (
            <div className="ad-thumbs">{(Object.keys(IMG) as ImgKey[]).map((k) => {
              const u = `img:${k}`;
              return (
                <button key={k} type="button" className={sel.includes(u) ? "on" : ""} onClick={() => toggle(u)} onDoubleClick={() => onPick([u])} title={IMG[k][lang]}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={mediaUrl(u, 250) ?? ""} alt={IMG[k][lang]} loading="lazy" />{sel.includes(u) && <Icon name="check" />}
                </button>
              );
            })}</div>
          )}
        </div>
        {tab !== "upload" && (
          <footer>
            <span className="ad-muted">{sel.length ? t("{n} sélectionnée(s)", { n: sel.length }) : t(multiple ? "Cliquez pour sélectionner plusieurs photos" : "Cliquez sur une photo")}</span>
            <button className="ad-btn primary" type="button" disabled={!sel.length} onClick={() => onPick(sel)}>{t("Insérer")}</button>
          </footer>
        )}
      </div>
    </div>,
    document.body,
  );
}

export function FileField({ value, onChange }: { value: string | null; onChange: (v: string | null) => void }) {
  const { sb, toast } = useAdmin();
  const t = useT();
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const up = async (f: File) => {
    if (!sb) return;
    setBusy(true);
    try { onChange(await uploadFile(sb, "documents", f)); toast(t("Document téléversé.")); } catch (e) { toast((e as Error).message, "err"); }
    setBusy(false);
  };
  return (
    <div className="ad-filefield">
      {value ? (
        <div className="ad-file-row"><Icon name="file" /><a href={value} target="_blank" rel="noopener">{decodeURIComponent(value.split("/").pop() ?? "document")}</a><button type="button" className="ad-icon-btn" aria-label={t("Retirer")} onClick={() => onChange(null)}><Icon name="trash" /></button></div>
      ) : (
        <button type="button" className="ad-drop" disabled={busy} onClick={() => input.current?.click()}><Icon name="upload" /><span>{t(busy ? "Envoi en cours…" : "Téléverser un PDF ou une image")}</span></button>
      )}
      <input ref={input} type="file" accept="application/pdf,image/jpeg,image/png" hidden onChange={(e) => e.target.files?.[0] && up(e.target.files[0])} />
    </div>
  );
}
