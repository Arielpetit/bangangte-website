"use client";

import Link from "next/link";
import { useSyncExternalStore, useState } from "react";
import { Icon, T } from "./ui";

const KEY = "bg-alert-closed";
const read = () => { try { return sessionStorage.getItem(KEY) ?? ""; } catch { return ""; } };

export function AlertPop({ id, href, fr, en }: { id: string; href: string; fr: string; en: string }) {
  const closedId = useSyncExternalStore(() => () => {}, read, () => id);
  const [hidden, setHidden] = useState(false);
  if (hidden || closedId === id) return null;
  const close = () => { try { sessionStorage.setItem(KEY, id); } catch {} setHidden(true); };
  return (
    <aside className="alert-pop" role="status" aria-label="Alerte / Alert">
      <span className="ap-ic"><Icon name="megaphone" /></span>
      <Link href={href}><small><T fr="Information importante" en="Important notice" /></small><span><T fr={fr} en={en} /></span></Link>
      <button type="button" onClick={close} aria-label="Fermer / Close"><Icon name="x" /></button>
    </aside>
  );
}
