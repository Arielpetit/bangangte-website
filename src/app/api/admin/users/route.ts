import { NextResponse } from "next/server";
import { serviceClient, staffFromToken } from "@/lib/supabase/service";

/** Invitation d'un agent (administrateurs uniquement) : e-mail Supabase + rôle attribué. */
export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? null;
  const me = await staffFromToken(token);
  if (!me || me.role !== "admin") return NextResponse.json({ error: "Réservé aux administrateurs." }, { status: 403 });
  const admin = serviceClient();
  if (!admin) return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY manquante côté serveur." }, { status: 503 });

  const { email, full_name, role } = (await req.json().catch(() => ({}))) as { email?: string; full_name?: string; role?: string };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "E-mail invalide." }, { status: 400 });
  if (!["admin", "editor", "contributor"].includes(role ?? "")) return NextResponse.json({ error: "Rôle invalide." }, { status: 400 });

  const origin = new URL(req.url).origin;
  const { data, error } = await admin.auth.admin.inviteUserByEmail(email, { data: { full_name }, redirectTo: `${origin}/admin/mot-de-passe` });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  const { error: e2 } = await admin.from("profiles").upsert({ id: data.user.id, email, full_name: full_name ?? null, role }, { onConflict: "id" });
  if (e2) return NextResponse.json({ error: e2.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
