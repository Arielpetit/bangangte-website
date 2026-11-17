"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { hasSupabase, SUPABASE_ANON_KEY, SUPABASE_URL } from "./env";

let client: SupabaseClient | null = null;

/** Client du tableau de bord : session de l'agent connecté (stockée dans le navigateur). */
export function browserClient(): SupabaseClient | null {
  if (!hasSupabase) return null;
  client ??= createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: true, autoRefreshToken: true, storageKey: "bg-admin-auth" } });
  return client;
}
