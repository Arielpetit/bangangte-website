"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GROUPS, SINGLE } from "@/lib/nav";
import { IMG, src } from "@/lib/images";
import { Icon, T } from "./ui";
import { setLang, toggleTheme } from "./Site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pill, setPill] = useState<{ x: number; w: number; on: boolean }>({ x: 0, w: 0, on: false });
  const navRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
    setDrawer(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setDrawer(false); } };
    document.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); document.removeEventListener("keydown", onKey); };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = drawer ? "hidden" : "";
  }, [drawer]);

  const movePill = (el: HTMLElement) => {
    const nav = navRef.current?.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    if (nav) setPill({ x: r.left - nav.left, w: r.width, on: true });
  };
  const enter = (key: string | null) => { if (timer.current) clearTimeout(timer.current); setOpen(key); };
  const leave = () => { timer.current = setTimeout(() => setOpen(null), 180); };

  const groupActive = (key: string) => GROUPS.find((g) => g.key === key)?.items.some((i) => { const h = i.href.split("#")[0]; return h === "/" ? pathname === "/" : pathname === h || pathname.startsWith(h + "/"); });
  const solid = scrolled || !!open;

  return (
    <>
      <a className="skip" href="#contenu"><T fr="Aller au contenu" en="Skip to content" /></a>
      <header className={`hd${solid ? " is-solid" : ""}`} onMouseLeave={leave} onMouseEnter={() => timer.current && clearTimeout(timer.current)}>
        <div className="wrap hd-in">
          <Link className="brand" href="/">
            <span className="brand-mark" aria-hidden="true" />
            <span><b>Bangangté</b><small><T fr="Commune · Ndé, Ouest Cameroun" en="Council · Ndé, West Cameroon" /></small></span>
          </Link>

          <nav className="hd-nav" aria-label="Navigation principale" ref={navRef} onMouseLeave={() => setPill((p) => ({ ...p, on: false }))}>
            <ul className="hd-list">
              {GROUPS.map((g) => (
                <li key={g.key}>
                  <button
                    type="button"
                    className={`hd-link${groupActive(g.key) ? " is-current" : ""}`}
                    aria-expanded={open === g.key}
                    aria-controls={`mega-${g.key}`}
                    onMouseEnter={(e) => { enter(g.key); movePill(e.currentTarget); }}
                    onFocus={(e) => movePill(e.currentTarget)}
                    onClick={() => setOpen(open === g.key ? null : g.key)}
                  >
                    <T fr={g.label.fr} en={g.label.en} />
                    <Icon name="chev" />
                  </button>
                </li>
              ))}
              {SINGLE.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className={`hd-link${pathname.startsWith(s.href) ? " is-current" : ""}`}
                    aria-current={pathname.startsWith(s.href) ? "page" : undefined}
                    onMouseEnter={(e) => { enter(null); movePill(e.currentTarget); }}
                    onFocus={(e) => movePill(e.currentTarget)}
                  >
                    <T fr={s.label.fr} en={s.label.en} />
                  </Link>
                </li>
              ))}
            </ul>
            <span className="hd-pill" aria-hidden="true" style={{ transform: `translateX(${pill.x}px)`, width: pill.w, opacity: pill.on ? 1 : 0 }} />
          </nav>

          <div className="hd-tools">
            <button className="tool tool-lang" type="button" onClick={() => setLang()} aria-label="Changer de langue / Change language">
              <Icon name="globe" /><span data-l="fr">EN</span><span data-l="en">FR</span>
            </button>
            <button className="tool tool-theme" type="button" onClick={toggleTheme} aria-label="Changer de thème / Change theme">
              <Icon name="moon" className="icon moon" /><Icon name="sun" className="icon sun" />
            </button>
            <Link className="btn btn-gold btn-sm hd-cta" href="/services"><Icon name="file" /><T fr="Démarches" en="Formalities" /></Link>
            <button className="tool burger" type="button" aria-expanded={drawer} aria-controls="drawer" aria-label="Menu" onClick={() => setDrawer(true)}>
              <Icon name="menu" />
            </button>
          </div>
        </div>

        {GROUPS.map((g) => (
          <div key={g.key} className={`mega${open === g.key ? " is-open" : ""}`} id={`mega-${g.key}`}>
            <div className="wrap mega-in">
              <div>
                <p className="mega-title"><T fr={g.intro.fr} en={g.intro.en} /></p>
                <ul className="mega-links">
                  {g.items.map((it) => (
                    <li key={it.href}>
                      <Link href={it.href} aria-current={pathname === it.href ? "page" : undefined}>
                        <span className="ic"><Icon name={it.icon} /></span>
                        <span><strong><T fr={it.label.fr} en={it.label.en} /></strong><span><T fr={it.desc.fr} en={it.desc.en} /></span></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <Link className="mega-feature" href={g.feature.href}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src(g.feature.img, 960)} alt={IMG[g.feature.img].fr} data-en-alt={IMG[g.feature.img].en} loading="lazy" />
                <div><strong><T fr={g.feature.title.fr} en={g.feature.title.en} /></strong><span><T fr={g.feature.text.fr} en={g.feature.text.en} /></span></div>
              </Link>
            </div>
          </div>
        ))}
      </header>

      <div className={`drawer${drawer ? " is-open" : ""}`} id="drawer" aria-hidden={!drawer}>
        <div className="drawer-hd">
          <Link className="brand" href="/"><span className="brand-mark" aria-hidden="true" /><span><b>Bangangté</b></span></Link>
          <button className="tool" type="button" aria-label="Fermer / Close" onClick={() => setDrawer(false)}><Icon name="x" /></button>
        </div>
        <nav className="drawer-body" aria-label="Menu mobile">
          {GROUPS.map((g, i) => (
            <details key={g.key} className="drawer-item" style={{ ["--i" as string]: i }} open={groupActive(g.key)}>
              <summary><T fr={g.label.fr} en={g.label.en} /><Icon name="chev" /></summary>
              <div>
                {g.items.map((it) => (
                  <Link key={it.href} href={it.href} aria-current={pathname === it.href ? "page" : undefined}><T fr={it.label.fr} en={it.label.en} /></Link>
                ))}
              </div>
            </details>
          ))}
          {[{ href: "/", label: { fr: "Accueil", en: "Home" } }, ...SINGLE].map((s, i) => (
            <Link key={s.href} className="drawer-item" style={{ ["--i" as string]: i + GROUPS.length }} href={s.href}>
              <T fr={s.label.fr} en={s.label.en} /><Icon name="arrow" />
            </Link>
          ))}
        </nav>
        <div className="drawer-ft">
          <button className="tool" type="button" onClick={() => setLang()}><Icon name="globe" /><span data-l="fr">English</span><span data-l="en">Français</span></button>
          <button className="tool" type="button" onClick={toggleTheme}><Icon name="moon" className="icon moon" /><Icon name="sun" className="icon sun" /><T fr="Thème" en="Theme" /></button>
          <Link className="btn btn-gold btn-sm" href="/services"><T fr="Vos démarches" en="Formalities" /></Link>
        </div>
      </div>
    </>
  );
}
