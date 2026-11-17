import { NextResponse } from "next/server";
import { publicClient } from "@/lib/supabase/public";

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Enregistre un message de contact ou un signalement (insertion publique autorisée par RLS, lecture réservée aux agents). */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "invalid" }, { status: 400 }); }
  if (str(body.website, 10)) return NextResponse.json({ ok: true }); // pot de miel : robot

  const kind = body.kind === "signalement" ? "signalement" : "contact";
  const row = {
    kind,
    name: str(body.name, 120),
    email: str(body.email, 160) || null,
    phone: str(body.phone, 40) || null,
    subject: str(body.subject, 120) || null,
    location: str(body.location, 200) || null,
    body: str(body.body, 4000),
  };
  if (!row.name || !row.body || (kind === "contact" && !row.email) || (kind === "signalement" && !row.location)) {
    return NextResponse.json({ error: "missing" }, { status: 400 });
  }
  if (row.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) return NextResponse.json({ error: "email" }, { status: 400 });

  const sb = publicClient();
  if (!sb) return NextResponse.json({ error: "not-configured" }, { status: 503 });
  const { error } = await sb.from("messages").insert(row);
  if (error) {
    console.error("[messages]", error);
    return NextResponse.json({ error: "db" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
