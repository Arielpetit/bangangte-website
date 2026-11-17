// Next.js sur Cloudflare Workers (OpenNext).
// Pages statiques : servies depuis les assets. Pages alimentées par Supabase : rendues à la demande.
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
