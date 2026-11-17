"use client";

import { notFound, useParams } from "next/navigation";
import { ListView } from "../_components/ListView";
import { resourceByKey } from "../_lib/resources";

export default function ResourceList() {
  const { resource } = useParams<{ resource: string }>();
  const r = resourceByKey(resource);
  if (!r) notFound();
  return <ListView key={r.key} r={r} />;
}
