import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Site } from "@/components/Site";
import { AlertBar } from "@/components/AlertBar";

// Coordonnées, alertes et contenus viennent de la base : chaque page est rendue à la demande pour rester à jour.
export const dynamic = "force-dynamic";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AlertBar />
      <Header />
      <main id="contenu">{children}</main>
      <Footer />
      <Site />
    </>
  );
}
