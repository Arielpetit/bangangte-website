import { redirect } from "next/navigation";

// Page fusionnée avec les actualités : on conserve l'ancienne adresse pour les liens déjà partagés.
export default async function Activites({ searchParams }: { searchParams: Promise<{ cat?: string; annee?: string }> }) {
  const sp = await searchParams;
  const q = new URLSearchParams(Object.entries(sp).filter(([, v]) => v) as [string, string][]).toString();
  redirect(`/actualites${q ? `?${q}` : ""}`);
}
