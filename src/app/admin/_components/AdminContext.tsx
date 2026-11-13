"use client";

import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { createPortal } from "react-dom";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { browserClient } from "@/lib/supabase/browser";
import type { Profile, Role } from "@/lib/data/types";
import { translate, useLang } from "../_lib/i18n";

type Toast = { id: number; kind: "ok" | "err" | "info"; text: string };
type Confirm = { text: string; danger?: boolean; ok: string; resolve: (v: boolean) => void } | null;

type Ctx = {
  sb: SupabaseClient | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  role: Role;
  canPublish: boolean;
  isAdmin: boolean;
  toast: (text: string, kind?: Toast["kind"]) => void;
  confirm: (text: string, opts?: { danger?: boolean; ok?: string }) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
  newMessages: number;
  refreshCounts: () => void;
};

const AdminCtx = createContext<Ctx | null>(null);
export const useAdmin = () => {
  const c = useContext(AdminCtx);
  if (!c) throw new Error("useAdmin hors du tableau de bord");
  return c;
};

export function AdminProvider({ children }: { children: ReactNode }) {
  const sb = useMemo(() => browserClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(Boolean(sb));
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confirmState, setConfirm] = useState<Confirm>(null);
  const [newMessages, setNew] = useState(0);
  const seq = useRef(0);
  const lang = useLang();

  const loadProfile = useCallback(async (s: Session | null) => {
    if (!sb || !s) { setProfile(null); return; }
    const { data } = await sb.from("profiles").select("*").eq("id", s.user.id).maybeSingle();
    setProfile((data as Profile) ?? { id: s.user.id, email: s.user.email ?? "", full_name: null, role: "none", created_at: "" });
  }, [sb]);

  useEffect(() => {
    if (!sb) return;
    let alive = true;
    sb.auth.getSession().then(async ({ data }) => {
      if (!alive) return;
      setSession(data.session);
      await loadProfile(data.session);
      if (alive) setLoading(false);
    });
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => { setSession(s); loadProfile(s); });
    return () => { alive = false; sub.subscription.unsubscribe(); };
  }, [sb, loadProfile]);

  const role: Role = profile?.role ?? "none";
  const staff = role !== "none";

  const refreshCounts = useCallback(() => {
    if (!sb || !staff) return;
    sb.from("messages").select("id", { count: "exact", head: true }).eq("status", "new").then(({ count }) => setNew(count ?? 0));
  }, [sb, staff]);
  useEffect(() => { refreshCounts(); }, [refreshCounts]);

  const toast = useCallback((text: string, kind: Toast["kind"] = "ok") => {
    const id = ++seq.current;
    setToasts((t) => [...t, { id, kind, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);

  const confirm = useCallback((text: string, o?: { danger?: boolean; ok?: string }) => new Promise<boolean>((resolve) => setConfirm({ text, danger: o?.danger, ok: o?.ok ?? translate(lang, "Confirmer"), resolve })), [lang]);

  const value: Ctx = {
    sb, session, profile, loading, role,
    canPublish: role === "admin" || role === "editor",
    isAdmin: role === "admin",
    toast, confirm, refreshProfile: () => loadProfile(session), newMessages, refreshCounts,
  };

  return (
    <AdminCtx.Provider value={value}>
      {children}
      <div className="ad-toasts" aria-live="polite">
        {toasts.map((t) => <div key={t.id} className={`ad-toast t-${t.kind}`}>{t.text}</div>)}
      </div>
      {confirmState && createPortal(
        <div className="ad-modal-bg" onClick={() => { confirmState.resolve(false); setConfirm(null); }}>
          <div className="ad-modal ad-confirm" role="alertdialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <p>{confirmState.text}</p>
            <div className="ad-row-end">
              <button className="ad-btn ghost" type="button" onClick={() => { confirmState.resolve(false); setConfirm(null); }}>{translate(lang, "Annuler")}</button>
              <button className={`ad-btn ${confirmState.danger ? "danger" : "primary"}`} type="button" autoFocus onClick={() => { confirmState.resolve(true); setConfirm(null); }}>{confirmState.ok}</button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </AdminCtx.Provider>
  );
}
