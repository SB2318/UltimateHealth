import { withBasePath } from "./basePath";

// Curated high quality medical/health royalty-free fallback images keyed by category/keyword
const HEALTH_FALLBACK_IMAGES: Record<string, string> = {
  kidney: "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/356561546-ddbcd3a4-8c14-449f-8fd8-c9eb63b65908.png",
  creatinine: "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/356561546-ddbcd3a4-8c14-449f-8fd8-c9eb63b65908.png",
  dialysis: "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/356561546-ddbcd3a4-8c14-449f-8fd8-c9eb63b65908.png",
  hemophilia: "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/hemophilia-general.jpg",
  blood: "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/hemophilia-general.jpg",
  default: "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/356561546-ddbcd3a4-8c14-449f-8fd8-c9eb63b65908.png",
};

/**
 * Robust image URL resolver:
 * 1. Checks if raw exists and is NOT a broken/undefined string.
 * 2. If it's a valid remote URL, returns it (or decodes html entities if needed).
 * 3. If it's a backend filename (e.g. `*.webp`, `*.jpg`), routes through proxy-image.
 * 4. If invalid or missing, selects an appropriate category/title based medical fallback.
 */
export function resolveArticleImageUrl(
  imageUtils?: string[] | null,
  context?: { title?: string; category?: string }
): string {
  if (imageUtils && imageUtils.length > 0) {
    const raw = imageUtils[0];
    if (raw && typeof raw === "string" && raw.trim() !== "") {
      const trimmed = raw.trim();
      
      // Reject bad API data containing "undefined"
      if (!trimmed.toLowerCase().includes("undefined")) {
        if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
          // Fix unescaped HTML entities in API URLs (e.g. &amp;s=10)
          return trimmed.replace(/&amp;/g, "&");
        }
        return withBasePath(
          `/api/proxy-image?url=${encodeURIComponent(
            `https://ultimatehealth.blog/api/getFile/${trimmed}`
          )}`
        );
      }
    }
  }

  // Fallback heuristic based on title or category keywords
  const title = (context?.title || "").toLowerCase();
  const category = (context?.category || "").toLowerCase();

  if (title.includes("creatinine") || title.includes("डायलिसिस") || title.includes("क्रिएटिनिन") || title.includes("dialysis") || category.includes("kidney")) {
    return HEALTH_FALLBACK_IMAGES.kidney;
  }
  if (title.includes("hemo") || title.includes("हीमो") || title.includes("হিমো")) {
    return HEALTH_FALLBACK_IMAGES.hemophilia;
  }

  return HEALTH_FALLBACK_IMAGES.default;
}
