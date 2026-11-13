"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui";
import { toggleTheme } from "@/components/Site";
import { hasSupabase } from "@/lib/supabase/env";
import { NAV_GROUPS, resourceByKey } from "../_lib/resources";
import { useAdmin } from "./AdminContext";
import { Login } from "./Login";
import { LangSwitch } from "./LangSwitch";
import { useT } from "../_lib/i18n";

const ROLE_LABEL = { admin: "Administrateur", editor: "Éditeur", contributor: "Contributeur", none: "Sans accès" };

export function Shell({ children }: { children: ReactNode }) {
  const { session, profile, loading, role, sb, newMessages, isAdmin } = useAdmin();
  const pathname = usePathname();
  const t = useT();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) { setLastPath(pathname); setOpen(false); }
  useEffect(() => { document.title = `${t("Espace agents")} | ${t("Commune de Bangangté")}`; }, [pathname, t]);

  if (pathname.startsWith("/admin/mot-de-passe")) return <>{children}</>;
  if (!hasSupabase) return <NotConfigured />;
  if (loading) return <div className="ad-center"><span className="ad-spinner" aria-label={t("Chargement")} /></div>;
  if (!session) return <Login />;
  if (role === "none") {
    return (
      <div className="ad-center">
        <div className="ad-card ad-narrow">
          <h2>{t("Compte en attente")}</h2>
          <p className="ad-muted">{t("Votre compte ({x}) est créé, mais aucun rôle ne vous a encore été attribué. Un administrateur de la mairie doit vous donner l'accès.", { x: profile?.email ?? "" })}</p>
          <button className="ad-btn ghost" type="button" onClick={() => sb?.auth.signOut()}><Icon name="logout" />{t("Se déconnecter")}</button>
        </div>
      </div>
    );
  }


  return (
    <div className={`ad-app${open ? " nav-open" : ""}`}>
      <aside className="ad-side">
        <Link className="ad-brand" href="/admin">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="" />
          <span><b>Bangangté</b><small>{t("Espace agents")}</small></span>
        </Link>
        <nav className="ad-nav" aria-label={t("Tableau de bord")}>
          <NavItem path={pathname} href="/admin" icon="grid" label="Tableau de bord" />
          <NavItem path={pathname} href="/admin/messages" icon="inbox" label="Messages" badge={newMessages} />
          {NAV_GROUPS.map((g) => (
            <div key={g.label} className="ad-nav-group">
              <p>{t(g.label)}</p>
              {g.keys.map((k) => { const r = resourceByKey(k)!; return <NavItem key={k} path={pathname} href={`/admin/${k}`} icon={r.icon} label={r.label} />; })}
            </div>
          ))}
          <div className="ad-nav-group">
            <p>{t("Fichiers")}</p>
            <NavItem path={pathname} href="/admin/medias" icon="upload" label="Médiathèque" />
          </div>
          {isAdmin && (
            <div className="ad-nav-group">
              <p>{t("Administration")}</p>
              <NavItem path={pathname} href="/admin/reglages" icon="settings" label="Réglages du site" />
              <NavItem path={pathname} href="/admin/utilisateurs" icon="lock" label="Utilisateurs" />
            </div>
          )}
        </nav>
        <div className="ad-me">
          <span className="ad-avatar">{(profile?.full_name || profile?.email || "?").slice(0, 1).toUpperCase()}</span>
          <span><b>{profile?.full_name || profile?.email}</b><small>{t(ROLE_LABEL[role])}</small></span>
          <button className="ad-icon-btn" type="button" title={t("Se déconnecter")} aria-label={t("Se déconnecter")} onClick={() => sb?.auth.signOut()}><Icon name="logout" /></button>
        </div>
      </aside>
      <div className="ad-scrim" onClick={() => setOpen(false)} />
      <div className="ad-main">
        <header className="ad-top">
          <button className="ad-icon-btn ad-burger" type="button" aria-label="Menu" onClick={() => setOpen(true)}><Icon name="menu" /></button>
          <div className="ad-top-tools">
            <LangSwitch />
            <button className="ad-icon-btn" type="button" title={t("Thème clair / sombre")} aria-label={t("Thème")} onClick={toggleTheme}><Icon name="moon" className="icon moon" /><Icon name="sun" className="icon sun" /></button>
            <a className="ad-btn ghost sm" href="/" target="_blank" rel="noopener"><Icon name="external" /><span className="ad-hide-sm">{t("Voir le site")}</span></a>
          </div>
        </header>
        <main className="ad-content">{children}</main>
      </div>
    </div>
  );
}

function NavItem({ path, href, icon, label, badge }: { path: string; href: string; icon: string; label: string; badge?: number }) {
  const t = useT();
  const on = href === "/admin" ? path === "/admin" : path.startsWith(href);
  return (
    <Link href={href} className={`ad-nav-item${on ? " is-active" : ""}`} aria-current={on ? "page" : undefined}>
      <Icon name={icon} /><span>{t(label)}</span>{badge ? <i>{badge}</i> : null}
    </Link>
  );
}

function NotConfigured() {
  return (
    <div className="ad-center">
      <div className="ad-card ad-narrow">
        <span className="ad-pi"><Icon name="settings" /></span>
        <h2>Base de données à connecter</h2>
        <p className="ad-muted">Le tableau de bord a besoin de Supabase. Ajoutez ces variables dans <code>.env.local</code> (et dans Cloudflare pour la mise en ligne), puis relancez le site :</p>
        <pre className="ad-code">NEXT_PUBLIC_SUPABASE_URL=…{"\n"}NEXT_PUBLIC_SUPABASE_ANON_KEY=…{"\n"}SUPABASE_SERVICE_ROLE_KEY=…</pre>
        <p className="ad-muted">La marche à suivre complète est dans le fichier README du projet.</p>
        <Link className="ad-btn ghost" href="/">Retour au site</Link>
      </div>
    </div>
  );
}
