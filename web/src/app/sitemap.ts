import type { MetadataRoute } from "next";
import { articles as localArticles } from "@/lib/article-data";
import {
  FULL_SITE_URL,
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  getHreflangAlternates,
} from "@/lib/seo";

export const revalidate = 3600; // Regenerate sitemap once per hour

interface ApiArticleItem {
  _id?: number;
  id?: string;
  pb_recordId?: string;
  title?: string;
  updatedAt?: string;
  publishedDate?: string;
  lastUpdated?: string;
}

async function fetchDynamicArticles(): Promise<{ id: string; lastModified: Date }[]> {
  const articleMap = new Map<string, Date>();

  // 1. Add static fallback articles first
  for (const art of localArticles) {
    if (art.id) {
      articleMap.set(art.id, new Date(art.updatedAt || art.publishedAt || Date.now()));
    }
  }

  // 2. Fetch live articles from API
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await safeFetch(getApiUrl("/articles/?limit=200"), { next: { revalidate: 3600 } }, 2500);
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      const items: ApiArticleItem[] = Array.isArray(data)
        ? data
        : data.articles || data.items || [];

      for (const item of items) {
        const id = item.id || (item._id ? String(item._id) : item.pb_recordId);
        if (id) {
          const modStr = item.lastUpdated || item.updatedAt || item.publishedDate;
          const date = modStr ? new Date(modStr) : new Date();
          articleMap.set(id, isNaN(date.getTime()) ? new Date() : date);
        }
      }
    }
  } catch {
    // Graceful fallback to static article records
  }

  return Array.from(articleMap.entries()).map(([id, lastModified]) => ({
    id,
    lastModified,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticSections = [
    { path: "", changeFrequency: "daily" as const, priority: 1.0 },
    { path: "/articles", changeFrequency: "daily" as const, priority: 0.9 },
    { path: "/medical-glossary", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/our-contributors", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/podcasts", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/contribute", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/access-control", changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];
  const now = new Date();

  // 1. Generate localized entries for all core sections
  for (const section of staticSections) {
    const alternates = getHreflangAlternates(section.path);

    for (const locale of SUPPORTED_LOCALES) {
      const url = `${FULL_SITE_URL}/${locale}${section.path}`;
      sitemapEntries.push({
        url,
        lastModified: now,
        changeFrequency: section.changeFrequency,
        priority: locale === DEFAULT_LOCALE ? section.priority : Math.max(0.4, section.priority - 0.1),
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  // 2. Dynamic article pages
  const articles = await fetchDynamicArticles();
  for (const art of articles) {
    const articlePath = `/articles/${art.id}`;
    const alternates = getHreflangAlternates(articlePath);

    for (const locale of SUPPORTED_LOCALES) {
      const url = `${FULL_SITE_URL}/${locale}${articlePath}`;
      sitemapEntries.push({
        url,
        lastModified: art.lastModified,
        changeFrequency: "weekly",
        priority: locale === DEFAULT_LOCALE ? 0.8 : 0.7,
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  return sitemapEntries;
}
