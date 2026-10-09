import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath =
  rawBasePath && rawBasePath.trim() !== "" && rawBasePath.startsWith("/")
    ? rawBasePath.trim()
    : undefined;

const nextConfig: NextConfig = {
  ...(basePath ? { basePath } : {}),

  experimental: {
    cpus: 1,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // ── Fallback redirects ──────────────────────────────────────────────────
  // next-intl middleware handles locale routing. When basePath is active (e.g. /web),
  // Next.js handles /web natively. Returning /web -> /web/:path* redirects when basePath is set
  // causes infinite 307 redirect loops on production servers.
  async redirects() {
    if (basePath) {
      return [];
    }

    return [
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
      },
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/user-attachments/assets/**",
      },
      {
        protocol: "https",
        hostname: "user-images.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
