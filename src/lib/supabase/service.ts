import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./env";

/** Client serveur avec la clé service_role : uniquement pour les routes d'administration (invitations). */
export function serviceClient(): SupabaseClient | null {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !key) return null;
  return createClient(SUPABASE_URL, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

/** Vérifie le jeton d'un agent et renvoie son profil (rôle compris). */
export async function staffFromToken(token: string | null) {
  if (!token || !SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { global: { headers: { Authorization: `Bearer ${token}` } }, auth: { persistSession: false } });
  const { data: u } = await sb.auth.getUser(token);
  if (!u.user) return null;
  const { data: p } = await sb.from("profiles").select("id,email,role").eq("id", u.user.id).single();
  return p as { id: string; email: string; role: string } | null;
}
