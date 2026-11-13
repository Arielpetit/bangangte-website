"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Icon } from "./ui";

const store = {
  set(k: string, v: string) { try { localStorage.setItem(k, v); } catch {} },
};

/** Applique les textes alternatifs et le titre de la langue active. */
function syncLang() {
  const root = document.documentElement;
  const l = root.dataset.lang === "en" ? "en" : "fr";
  root.lang = l;
  document.querySelectorAll<HTMLImageElement>("img[data-en-alt]").forEach((im) => {
    if (im.dataset.frAlt === undefined) im.dataset.frAlt = im.alt;
    im.alt = l === "en" ? im.dataset.enAlt ?? im.alt : im.dataset.frAlt;
  });
  document.querySelectorAll<HTMLOptionElement>("option[data-en]").forEach((o) => {
    if (o.dataset.fr === undefined) o.dataset.fr = o.textContent ?? "";
    o.textContent = l === "en" ? o.dataset.en ?? "" : o.dataset.fr;
  });
  const t = document.querySelector<HTMLMetaElement>(`meta[name="title-${l}"]`);
  if (t) document.title = t.content;
}

export function setLang(next?: "fr" | "en") {
  const root = document.documentElement;
  const l = next ?? (root.dataset.lang === "en" ? "fr" : "en");
  root.dataset.lang = l;
  store.set("bg-lang", l);
  syncLang();
  window.dispatchEvent(new Event("langchange"));
}

export function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  store.set("bg-theme", next);
}

export function currentLang(): "fr" | "en" {
  return typeof document !== "undefined" && document.documentElement.dataset.lang === "en" ? "en" : "fr";
}

/** Effets globaux : progression, révélations, compteurs, haut de page. Relancés à chaque page. */
export function Site() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    syncLang();

    document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((g) => {
      Array.from(g.children).forEach((c, i) => {
        if (!c.hasAttribute("data-reveal")) c.setAttribute("data-reveal", "");
        (c as HTMLElement).style.setProperty("--d", `${i * 90}ms`);
      });
    });

    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)");
    let io: IntersectionObserver | null = null;
    if (!reduce && "IntersectionObserver" in window) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io?.unobserve(en.target); } });
      }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });
      reveals.forEach((el) => io!.observe(el));
    } else reveals.forEach((el) => el.classList.add("in"));

    const runCount = (el: HTMLElement) => {
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix ?? "";
      const fmt = (n: number) => n.toLocaleString(currentLang() === "en" ? "en-GB" : "fr-FR").replace(/ /g, " ") + suffix;
      if (reduce) { el.textContent = fmt(target); return; }
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / 1600, 1);
        el.textContent = fmt(Math.round(target * (1 - Math.pow(1 - p, 4))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const co = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { runCount(en.target as HTMLElement); co.unobserve(en.target); } });
    }, { threshold: 0.6 });
    document.querySelectorAll<HTMLElement>("[data-count]").forEach((c) => co.observe(c));

    return () => { io?.disconnect(); co.disconnect(); };
  }, [pathname]);

  useEffect(() => {
    const progress = document.querySelector<HTMLElement>(".progress");
    const top = document.querySelector<HTMLElement>(".to-top");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ticking = false;
    // Parallaxe douce des photos encadrées : l'image glisse légèrement dans son cadre.
    const parallax = () => {
      ticking = false;
      if (reduce) return;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>(".arch img, .frame img, .zz-media img, .mosaic figure:first-child img").forEach((img) => {
        const r = img.parentElement!.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const ratio = (r.top + r.height / 2 - vh / 2) / vh;
        img.style.setProperty("--py", `${(ratio * -7).toFixed(2)}%`);
      });
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(parallax); }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (progress) progress.style.transform = `scaleX(${p})`;
      if (top) { top.classList.toggle("show", window.scrollY > 700); top.style.setProperty("--p", p.toFixed(3)); }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [pathname]);

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <button className="to-top" type="button" aria-label="Haut de page / Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <svg className="ring" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" /></svg>
        <Icon name="arrow" />
      </button>
    </>
  );
}
