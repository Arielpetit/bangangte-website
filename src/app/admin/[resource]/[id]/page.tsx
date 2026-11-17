"use client";

import { notFound, useParams } from "next/navigation";
import { EditView } from "../../_components/EditView";
import { resourceByKey } from "../../_lib/resources";

export default function ResourceEdit() {
  const { resource, id } = useParams<{ resource: string; id: string }>();
  const r = resourceByKey(resource);
  if (!r) notFound();
  return <EditView key={`${r.key}-${id}`} r={r} id={id} />;
}
