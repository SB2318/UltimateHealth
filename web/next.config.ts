import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "node:path";
import fs from "node:fs";

// Preload mock fonts for offline / Docker builds to prevent getaddrinfo ENOTFOUND fonts.googleapis.com
if (!process.env.NEXT_FONT_GOOGLE_MOCKED_RESPONSES) {
  const mockPath = path.resolve(__dirname, "src/lib/fonts-mock.json");
  if (fs.existsSync(mockPath)) {
    process.env.NEXT_FONT_GOOGLE_MOCKED_RESPONSES = mockPath;
  }
}

const withNextIntl = createNextIntlPlugin();

const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath =
  rawBasePath && rawBasePath.trim() !== "" && rawBasePath.startsWith("/")
    ? rawBasePath.trim()
    : undefined;

const nextConfig: NextConfig = {
  output: "standalone",
  ...(basePath ? { basePath } : {}),

  experimental: {
    cpus: 1,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // ── Fallback redirects ──────────────────────────────────────────────────
  async redirects() {
    const localeSitemapRedirects = [
      {
        source: "/:locale(en|hi|bn|ta|or|de|es|fr|hr)/sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
    ];

    if (basePath) {
      return localeSitemapRedirects;
    }

    return [
      ...localeSitemapRedirects,
      {
        source: "/web",
        destination: "/en",
        permanent: false,
        basePath: false,
      },
      {
        source: "/web/",
        destination: "/en",
        permanent: false,
        basePath: false,
      },
      {
        source: "/web/:path*",
        destination: "/:path*",
        permanent: false,
        basePath: false,
      },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [25, 50, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "user-images.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ultimatehealth.blog",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
