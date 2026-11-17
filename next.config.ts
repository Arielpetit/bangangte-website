import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Next.js exécuté sur Cloudflare Workers via OpenNext (voir open-next.config.ts et wrangler.jsonc).
const nextConfig: NextConfig = {
  images: { unoptimized: true },
};

export default nextConfig;

initOpenNextCloudflareForDev();
