import type { Metadata } from "next";
import {
  SITE_URL,
  BASE_PATH,
  FULL_SITE_URL,
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  BRAND_NAME,
  BRAND_MOTTO,
  BRAND_MISSION,
  BRAND_DISAMBIGUATION,
  MEDICAL_DISCLAIMER_TEXT,
  MOUMITA_MEMORIAL_INFO,
  getCanonicalUrl,
  getHreflangAlternates,
  getRobotsNoIndex as getRobotsNoIndexCore,
  getRobotsIndexable as getRobotsIndexableCore,
  buildBreadcrumbJsonLd as buildBreadcrumbJsonLdCore,
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
  buildArticleJsonLd as buildArticleJsonLdCore,
  buildHomeFaqJsonLd,
} from "./seo-core.mjs";

export {
  SITE_URL,
  BASE_PATH,
  FULL_SITE_URL,
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  BRAND_NAME,
  BRAND_MOTTO,
  BRAND_MISSION,
  BRAND_DISAMBIGUATION,
  MEDICAL_DISCLAIMER_TEXT,
  MOUMITA_MEMORIAL_INFO,
  getCanonicalUrl,
  getHreflangAlternates,
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
  buildHomeFaqJsonLd,
};

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export function getRobotsNoIndex(): Metadata["robots"] {
  return getRobotsNoIndexCore() as Metadata["robots"];
}

export function getRobotsIndexable(): Metadata["robots"] {
  return getRobotsIndexableCore() as Metadata["robots"];
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return buildBreadcrumbJsonLdCore(items);
}

export interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  imageUrl?: string | null;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  category?: string;
  tags?: string[];
  locale?: string;
}

export function buildArticleJsonLd(props: ArticleJsonLdProps) {
  return buildArticleJsonLdCore(props);
}
