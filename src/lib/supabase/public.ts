import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { hasSupabase, SUPABASE_ANON_KEY, SUPABASE_URL } from "./env";

let client: SupabaseClient | null = null;

/** Client de lecture publique (clé anonyme, sans session) : les règles RLS ne laissent voir que le contenu publié. */
export function publicClient(): SupabaseClient | null {
  if (!hasSupabase) return null;
  client ??= createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  return client;
}
