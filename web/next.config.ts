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

  // ── Fallback redirects ──────────────────────────────────────────────────
  // next-intl middleware handles most locale routing, but these cover edge
  // cases: bare root visits that miss the middleware (e.g. static host
  // configs, direct IP access, or crawler bots ignoring redirects).
  async redirects() {
    return [
      // If someone visits /web or /web/ locally (without basePath set), redirect them to /en
      {
        source: "/web",
        destination: basePath ? `${basePath}/en` : "/en",
        permanent: false,
        basePath: false,
      },
      {
        source: "/web/",
        destination: basePath ? `${basePath}/en` : "/en",
        permanent: false,
        basePath: false,
      },
      // If visiting /web/:path* locally, strip /web and redirect directly to /:path*
      {
        source: "/web/:path*",
        destination: basePath ? `${basePath}/:path*` : "/:path*",
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
