import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";
import "./mairie.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Figtree({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://bangangte.skyengpro.site"),
  title: { default: "Commune de Bangangté", template: "%s | Commune de Bangangté" },
  description: "Site officiel de la Commune de Bangangté (Ndé, Ouest Cameroun) : actualités de la mairie, communiqués, agenda, démarches administratives, projets et découverte de la ville.",
  // Version de travail : à retirer (ou passer à true) quand le contenu est validé par la mairie.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#1B2550" };

// Langue et thème appliqués avant l'affichage pour éviter tout clignotement.
const boot = `(function(){var d=document.documentElement,l=null,t=null;try{l=localStorage.getItem("bg-lang");t=localStorage.getItem("bg-theme")}catch(e){}var s=new URLSearchParams(location.search),q=s.get("lang"),qt=s.get("theme");d.dataset.lang=(q==="en"||q==="fr")?q:(l||"fr");d.lang=d.dataset.lang;d.dataset.theme=(qt==="dark"||qt==="light")?qt:(t||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"));d.classList.add("js")})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-lang="fr" data-theme="light" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
