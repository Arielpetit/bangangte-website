import type { ComponentProps } from "react";
import { PageHero } from "@/components/ui";
import { getSettings } from "@/lib/data/content";

/**
 * En-tête de page dont les photos peuvent être changées dans le tableau de bord
 * (Réglages > Photos des en-têtes). Sans réglage, les photos par défaut de la page s'affichent.
 */
export async function Hero({ page, ...props }: { page: string } & ComponentProps<typeof PageHero>) {
  const custom = (await getSettings()).page_heroes?.[page];
  return (
    <PageHero
      {...props}
      img={custom?.img || props.img}
      inset={custom?.inset || props.inset}
    />
  );
}
