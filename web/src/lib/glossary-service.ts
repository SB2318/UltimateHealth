export interface LocalizedGlossaryEntry {
  _id?: string;
  term: string;
  slug?: string;
  definition: string;
  shortDescription?: string;
  category: string;
  relatedTerms: string[];
  language: string; // "en" | "hi" | "bn" etc.
  languageName: string;
}

export interface ApiGlossaryCategory {
  _id: string;
  name: string;
}

export interface ApiGlossaryTerm {
  _id: string;
  term: string;
  slug: string;
  language?: string;
  languageName?: string;
  synonyms?: string[];
  shortDescription?: string;
  definition: string;
  categories?: ApiGlossaryCategory[];
  category?: string;
  relatedTerms?: string[];
  status?: string;
  createdAt?: string;
}

export interface ApiGlossaryResponse {
  data?: ApiGlossaryTerm[];
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

/**
 * Maps raw API term to the UI's LocalizedGlossaryEntry format
 */
export function mapApiGlossaryTerm(item: ApiGlossaryTerm): LocalizedGlossaryEntry {
  const category =
    item.category ||
    item.categories?.[0]?.name ||
    "General";

  // Use relatedTerms if provided, else fall back to synonyms
  const rawRelated =
    Array.isArray(item.relatedTerms) && item.relatedTerms.length > 0
      ? item.relatedTerms
      : Array.isArray(item.synonyms) && item.synonyms.length > 0
      ? item.synonyms
      : [];

  const langCode = item.language || "en";
  const langName =
    item.languageName ||
    (langCode === "hi"
      ? "हिन्दी (Hindi)"
      : langCode === "bn"
      ? "বাংলা (Bengali)"
      : langCode === "ta"
      ? "தமிழ் (Tamil)"
      : "English");

  return {
    _id: item._id,
    term: item.term,
    slug: item.slug,
    definition: item.definition || item.shortDescription || "",
    shortDescription: item.shortDescription,
    category,
    relatedTerms: rawRelated,
    language: langCode,
    languageName: langName,
  };
}

/**
 * Server-side / Client fetch helper: Fetches up to 500 published glossary terms
 * from the live API (https://ultimatehealth.blog/api/glossary).
 */
export async function fetchGlossaryTerms(): Promise<LocalizedGlossaryEntry[]> {
  try {
    const res = await fetch("https://ultimatehealth.blog/api/glossary?limit=500", {
      next: { revalidate: 3600 }, // Cache with Next.js ISR (1 hour)
    });

    if (res.ok) {
      const json: ApiGlossaryResponse = await res.json();
      const items = Array.isArray(json.data) ? json.data : Array.isArray(json) ? json : [];
      if (items.length > 0) {
        return items.map(mapApiGlossaryTerm);
      }
    }
  } catch (error) {
    console.error("Failed to fetch glossary terms from API:", error);
  }

  return [];
}
