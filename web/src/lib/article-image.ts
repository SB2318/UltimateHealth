// Curated high quality medical/health royalty-free verified images keyed by category/keyword
const HEALTH_FALLBACK_IMAGES: Record<string, string> = {
  yoga: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
  ai_medicine: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
  crohns: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
  autism: "https://images.unsplash.com/photo-1516627145497-ae6968895b74",
  alzheimer: "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/alzeimer-banner.jpg",
  arthritis: "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/arthritis-banner-final.jpg",
  kidney: "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/image_92fbfca0.jpeg",
  creatinine: "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/image_92fbfca0.jpeg",
  dialysis: "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/image_92fbfca0.jpeg",
  hemophilia: "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/hemophilia-general.jpg",
  blood: "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/hemophilia-general.jpg",
  hypertension: "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/hypertension-hn.png",
  stem_cell: "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/stem-cell-therapy-en.jpg",
  pediatric: "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/pediatric-health-english.jpeg",
  plague: "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/plague-en.jpg",
  diet: "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/Balanced_Diet_Chart_d4b91420ce-hn-banner.jpg",
  mental_health: "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/ghost-hn.png",
  default: "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/356561546-ddbcd3a4-8c14-449f-8fd8-c9eb63b65908.png",
};

/**
 * Robust image URL resolver:
 * 1. Checks if raw exists and is NOT broken/undefined.
 * 2. If it's a valid remote URL, returns it (decoding HTML entities like &amp; to &).
 * 3. If it's a backend relative filename, maps it to the topic/category visual asset.
 * 4. Gracefully falls back to topic/context keywords so cards never display broken images.
 */
export function resolveArticleImageUrl(
  imageUtils?: string[] | null,
  context?: { title?: string; category?: string }
): string {
  const title = (context?.title || "").toLowerCase();
  const category = (context?.category || "").toLowerCase();

  if (imageUtils && imageUtils.length > 0) {
    const raw = imageUtils[0];
    if (raw && typeof raw === "string" && raw.trim() !== "") {
      const trimmed = raw.trim();

      // Reject bad API data containing "undefined"
      if (!trimmed.toLowerCase().includes("undefined")) {
        // Direct remote URLs (Google Thumbnails, GitHub raw, etc.)
        if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
          return trimmed.replace(/&amp;/g, "&");
        }

        // Handle backend upload storage filenames (e.g. filename-12345.webp)
        if (/\.(webp|jpg|jpeg|png|gif|svg)$/i.test(trimmed)) {
          return `https://ultimatehealth.blog/api/getFile/${trimmed}`;
        }

        // Handle specific known filenames from PocketBase/Backend database
        const lowerRaw = trimmed.toLowerCase();
        if (lowerRaw.includes("yoga")) return HEALTH_FALLBACK_IMAGES.yoga;
        if (lowerRaw.includes("ai-in-medical") || lowerRaw.includes("diagnosis")) return HEALTH_FALLBACK_IMAGES.ai_medicine;
        if (lowerRaw.includes("chron-disease") || lowerRaw.includes("crohn")) return HEALTH_FALLBACK_IMAGES.crohns;
        if (lowerRaw.includes("autism") || lowerRaw.includes("asd")) return HEALTH_FALLBACK_IMAGES.autism;
        if (lowerRaw.includes("alzeimer") || lowerRaw.includes("alzheimer")) return HEALTH_FALLBACK_IMAGES.alzheimer;
        if (lowerRaw.includes("arthritis")) return HEALTH_FALLBACK_IMAGES.arthritis;
        if (lowerRaw.includes("hemophilia") || lowerRaw.includes("hemphilia")) return HEALTH_FALLBACK_IMAGES.hemophilia;
        if (lowerRaw.includes("stem-cell")) return HEALTH_FALLBACK_IMAGES.stem_cell;
        if (lowerRaw.includes("pediatric")) return HEALTH_FALLBACK_IMAGES.pediatric;
        if (lowerRaw.includes("plague")) return HEALTH_FALLBACK_IMAGES.plague;
        if (lowerRaw.includes("diet") || lowerRaw.includes("fasting")) return HEALTH_FALLBACK_IMAGES.diet;
        if (lowerRaw.includes("ghost")) return HEALTH_FALLBACK_IMAGES.mental_health;
      }
    }
  }

  // Fallback heuristic based on title or category keywords (multilingual: English, Hindi, Bengali, Tamil, etc.)
  if (
    title.includes("yoga") ||
    title.includes("योग") ||
    title.includes("যোগ") ||
    title.includes("யோகா") ||
    category.includes("yoga")
  ) {
    return HEALTH_FALLBACK_IMAGES.yoga;
  }

  if (
    title.includes("ai") ||
    title.includes("artificial intelligence") ||
    title.includes("इंटेलिजेंस") ||
    title.includes("डायग्नॉस्टिक्स") ||
    title.includes("diagnosis") ||
    category.includes("technology") ||
    category.includes("ai")
  ) {
    return HEALTH_FALLBACK_IMAGES.ai_medicine;
  }

  if (
    title.includes("crohn") ||
    title.includes("क्रोहन") ||
    title.includes("क्रोन") ||
    title.includes("bowel") ||
    title.includes("gut") ||
    title.includes("digestive")
  ) {
    return HEALTH_FALLBACK_IMAGES.crohns;
  }

  if (
    title.includes("autism") ||
    title.includes("ऑटिज़्म") ||
    title.includes("অটিজম") ||
    title.includes("asd") ||
    title.includes("spectrum")
  ) {
    return HEALTH_FALLBACK_IMAGES.autism;
  }

  if (
    title.includes("alzheimer") ||
    title.includes("dementia") ||
    title.includes("अल्जाइमर") ||
    title.includes("डिमेंशिया")
  ) {
    return HEALTH_FALLBACK_IMAGES.alzheimer;
  }

  if (
    title.includes("arthritis") ||
    title.includes("आर्थराइटिस") ||
    title.includes("आर्थ्राइटिस") ||
    title.includes("বাত")
  ) {
    return HEALTH_FALLBACK_IMAGES.arthritis;
  }

  if (
    title.includes("creatinine") ||
    title.includes("डायलिसिस") ||
    title.includes("क्रिएटिनिन") ||
    title.includes("dialysis") ||
    title.includes("गुर्दा") ||
    title.includes("kidney") ||
    category.includes("kidney")
  ) {
    return HEALTH_FALLBACK_IMAGES.kidney;
  }

  if (
    title.includes("hemo") ||
    title.includes("हीमो") ||
    title.includes("হিমো") ||
    title.includes("blood")
  ) {
    return HEALTH_FALLBACK_IMAGES.hemophilia;
  }

  if (
    title.includes("hypertension") ||
    title.includes("हाइपरटेंशन") ||
    title.includes("रक्तचाप")
  ) {
    return HEALTH_FALLBACK_IMAGES.hypertension;
  }

  if (
    title.includes("stem cell") ||
    title.includes("स्टेम सेल") ||
    title.includes("স্টেম সেল")
  ) {
    return HEALTH_FALLBACK_IMAGES.stem_cell;
  }

  if (
    title.includes("pediatric") ||
    title.includes("बाल स्वास्थ्य") ||
    title.includes("শিশু স্বাস্থ্য")
  ) {
    return HEALTH_FALLBACK_IMAGES.pediatric;
  }

  if (title.includes("plague") || title.includes("प्लेग")) {
    return HEALTH_FALLBACK_IMAGES.plague;
  }

  if (
    title.includes("fasting") ||
    title.includes("diet") ||
    title.includes("उपवास") ||
    title.includes("डाइट") ||
    category.includes("nutrition")
  ) {
    return HEALTH_FALLBACK_IMAGES.diet;
  }

  if (
    title.includes("mental") ||
    title.includes("मानसिक") ||
    title.includes("মন") ||
    title.includes("ghost") ||
    title.includes("भूत") ||
    category.includes("mental")
  ) {
    return HEALTH_FALLBACK_IMAGES.mental_health;
  }

  return HEALTH_FALLBACK_IMAGES.default;
}
