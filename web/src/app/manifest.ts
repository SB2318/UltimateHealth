import type { MetadataRoute } from "next";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "UltimateHealth",
    short_name: "UltimateHealth",
    description: "Empowering Wellness Through Global Community",
    start_url: `${BASE_PATH}/`,
    display: "standalone",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    icons: [
      {
        src: `${BASE_PATH}/web-app-manifest-192x192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: `${BASE_PATH}/web-app-manifest-512x512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
