import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Site } from "@/components/Site";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Figtree({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Bangangté, ville du Ndé", template: "%s | Bangangté" },
  description: "Bangangté, chef-lieu du Ndé dans l'Ouest Cameroun : histoire, personnalités, sites, culture medumba, agenda et services de la mairie.",
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
      <body>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <Site />
      </body>
    </html>
  );
}
