/** URL du projet Supabase, nettoyée (on accepte aussi une URL copiée avec /rest/v1). */
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_URL = rawUrl.trim().replace(/\/(rest|auth|storage)\/v1\/?$/, "").replace(/\/+$/, "");
export const SUPABASE_ANON_KEY = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim();
/** Supabase est configuré si l'URL et la clé publique sont présentes (.env.local ou variables Cloudflare). */
export const hasSupabase = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
