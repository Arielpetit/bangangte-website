import type { NextConfig } from "next";

// Site 100 % statique : « next build » produit le dossier out/, servi par Cloudflare Workers (static assets).
const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
