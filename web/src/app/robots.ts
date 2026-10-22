import type { MetadataRoute } from "next";

const SITE_URL = "https://ultimatehealth.blog";
const SITEMAP_URL = `${SITE_URL}/web/sitemap.xml`;

const DISALLOWED_PATHS = [
  "/admin-agreement",
  "/login",
  "/login-admin",
  "/register",
  "/forgot-password",
  "/delete-account",
  "/delete-account-admin",
  "/goodbye",
  "/api/",
  "/*?*", // Avoid crawling duplicate search filter query variants
  // Localized and basePath permutations
  "/web/*/admin-agreement",
  "/web/*/login",
  "/web/*/login-admin",
  "/web/*/register",
  "/web/*/forgot-password",
  "/web/*/delete-account",
  "/web/*/delete-account-admin",
  "/web/*/goodbye",
  "/web/api/",
];

const ALLOWED_ASSET_PATHS = [
  "/",
  "/web/",
  "/_next/static/",
  "/_next/image/",
  "/web/_next/static/",
  "/web/_next/image/",
  "/assets/",
  "/web/assets/",
  "/*.css$",
  "/*.js$",
  "/*.png$",
  "/*.jpg$",
  "/*.jpeg$",
  "/*.webp$",
  "/*.svg$",
  "/*.ico$",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ALLOWED_ASSET_PATHS,
        disallow: DISALLOWED_PATHS,
      },
      {
        userAgent: "Googlebot",
        allow: ALLOWED_ASSET_PATHS,
        disallow: DISALLOWED_PATHS,
      },
      {
        userAgent: "Bingbot",
        allow: ALLOWED_ASSET_PATHS,
        disallow: DISALLOWED_PATHS,
      },
      {
        userAgent: "Applebot",
        allow: ALLOWED_ASSET_PATHS,
        disallow: DISALLOWED_PATHS,
      },
      // Explicitly optimize for AI Answer & Search Engines (Search discovery, not training)
      {
        userAgent: "OAI-SearchBot",
        allow: ALLOWED_ASSET_PATHS,
        disallow: DISALLOWED_PATHS,
      },
      {
        userAgent: "PerplexityBot",
        allow: ALLOWED_ASSET_PATHS,
        disallow: DISALLOWED_PATHS,
      },
    ],
    sitemap: [SITEMAP_URL, `${SITE_URL}/sitemap.xml`],
    host: SITE_URL,
  };
}
