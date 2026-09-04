/**
 * The site is fully static (no server data fetching, no route handlers), so it
 * exports to plain HTML for GitHub Pages. `GITHUB_PAGES=true` is set only by
 * the deploy workflow — locally `npm run dev` still serves from the root.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "/TBCLegend";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  // Project Pages are served from https://<user>.github.io/<repo>/
  basePath: isPages ? repo : undefined,
  assetPrefix: isPages ? repo : undefined,
  images: { unoptimized: true },
  // Raw asset URLs are not rewritten by basePath, so hand it to the client
  // and let lib/asset.ts prefix them. See that file for why.
  env: { NEXT_PUBLIC_BASE_PATH: isPages ? repo : "" },
  trailingSlash: true,
};

export default nextConfig;
