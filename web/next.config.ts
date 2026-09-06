import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/web";
const basePath =
  rawBasePath && rawBasePath.trim() !== "" && rawBasePath.startsWith("/")
    ? rawBasePath.trim()
    : undefined;

const nextConfig: NextConfig = {
  ...(basePath ? { basePath } : {}),
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
