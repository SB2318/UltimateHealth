import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  SITE_URL,
  BASE_PATH,
  FULL_SITE_URL,
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  BRAND_NAME,
  BRAND_MOTTO,
  BRAND_MISSION,
  MEDICAL_DISCLAIMER_TEXT,
  getCanonicalUrl,
  getHreflangAlternates,
  getRobotsNoIndex,
  getRobotsIndexable,
  buildBreadcrumbJsonLd,
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
  buildArticleJsonLd,
  buildHomeFaqJsonLd,
} from "../lib/seo-core.mjs";

const APP_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(APP_DIR, "../../..");
const WEB_DIR = join(APP_DIR, "../..");

const read = (filePath) => readFileSync(filePath, "utf8");

// ─── 1. Core SEO Configuration and Canonical / Hreflang Generation ───────────

test("SEO constants match production domain and brand specifications", () => {
  assert.equal(SITE_URL, "https://ultimatehealth.blog");
  assert.equal(BASE_PATH, "/web");
  assert.equal(FULL_SITE_URL, "https://ultimatehealth.blog/web");
  assert.equal(BRAND_NAME, "UltimateHealth");
  assert.equal(BRAND_MOTTO, "Minimal Information. Real Information.");
  assert.equal(
    BRAND_MISSION,
    "Make trustworthy, understandable health information accessible to everyone."
  );
  assert.equal(DEFAULT_LOCALE, "en");
  assert.deepEqual(SUPPORTED_LOCALES, [
    "en",
    "hi",
    "bn",
    "ta",
    "or",
    "de",
    "es",
    "fr",
    "hr",
  ]);
});

test("getCanonicalUrl produces valid absolute URLs including basePath and locale", () => {
  assert.equal(
    getCanonicalUrl("en", ""),
    "https://ultimatehealth.blog/web/en"
  );
  assert.equal(
    getCanonicalUrl("en", "/"),
    "https://ultimatehealth.blog/web/en"
  );
  assert.equal(
    getCanonicalUrl("en", "/articles"),
    "https://ultimatehealth.blog/web/en/articles"
  );
  assert.equal(
    getCanonicalUrl("hi", "articles/heart-health"),
    "https://ultimatehealth.blog/web/hi/articles/heart-health"
  );
  assert.equal(
    getCanonicalUrl("de", "/podcasts"),
    "https://ultimatehealth.blog/web/de/podcasts"
  );
});

test("getHreflangAlternates builds complete reciprocal alternates for all 9 locales plus x-default", () => {
  const alternates = getHreflangAlternates("/articles");

  // Verify x-default points to default locale (en)
  assert.equal(
    alternates["x-default"],
    "https://ultimatehealth.blog/web/en/articles"
  );

  // Verify all 9 locales are present with exact absolute URLs
  for (const locale of SUPPORTED_LOCALES) {
    assert.equal(
      alternates[locale],
      `https://ultimatehealth.blog/web/${locale}/articles`,
      `Missing or incorrect hreflang for ${locale}`
    );
  }

  assert.equal(Object.keys(alternates).length, SUPPORTED_LOCALES.length + 1);
});

test("getRobotsNoIndex returns strict disallow directives for private and auth routes", () => {
  const robots = getRobotsNoIndex();
  assert.equal(robots.index, false);
  assert.equal(robots.follow, false);
  assert.equal(robots.nocache, true);
  assert.equal(robots.googleBot.index, false);
  assert.equal(robots.googleBot.follow, false);
  assert.equal(robots.googleBot.noimageindex, true);
});

test("getRobotsIndexable returns permissive indexing directives with large snippet previews", () => {
  const robots = getRobotsIndexable();
  assert.equal(robots.index, true);
  assert.equal(robots.follow, true);
  assert.equal(robots.googleBot.index, true);
  assert.equal(robots.googleBot["max-image-preview"], "large");
});

// ─── 2. Schema.org Structured Data Builders ──────────────────────────────────

test("buildOrganizationJsonLd produces valid Organization schema with brand metadata and disambiguation", () => {
  const schema = buildOrganizationJsonLd();
  assert.equal(schema["@context"], "https://schema.org");
  assert.equal(schema["@type"], "Organization");
  assert.equal(schema.name, "UltimateHealth");
  assert.ok(Array.isArray(schema.alternateName));
  assert.ok(schema.alternateName.includes("UltimateHealth Blog"));
  assert.ok(schema.disambiguatingDescription.includes("open-source"));
  assert.ok(schema.disambiguatingDescription.includes("Respect Giver Protocol"));
  assert.equal(schema.url, "https://ultimatehealth.blog/web");
  assert.equal(schema.slogan, "Minimal Information. Real Information.");
  assert.ok(Array.isArray(schema.sameAs));
  assert.ok(schema.sameAs.some((url) => url.includes("github.com/SB2318")));
  assert.ok(schema.sameAs.some((url) => url.includes("linkedin.com")));
  assert.ok(Array.isArray(schema.knowsAbout));
  assert.ok(schema.knowsAbout.includes("Pulmonary & Respiratory Medicine"));
  assert.ok(schema.acknowledgment.includes("Dr. Moumita Debnath"));
  assert.ok(schema.acknowledgment.includes("Department of Pulmonary & Chest Medicine"));
  assert.ok(schema.acknowledgment.includes("Respect Giver Protocol"));
  assert.equal(schema.subjectOf["@type"], "SpecialAnnouncement");
  assert.ok(schema.subjectOf.description.includes("Dr. Moumita Debnath"));
});

test("Articles page structured data contains authentic on-site memorial dedication", () => {
  const articlesPagePath = join(APP_DIR, "[locale]/articles/page.tsx");
  assert.ok(existsSync(articlesPagePath));
  const content = read(articlesPagePath);

  assert.ok(content.includes("Dr. Moumita Debnath"));
  assert.ok(content.includes("Postgraduate Resident Doctor"));
  assert.ok(content.includes("Department of Pulmonary & Chest Medicine"));
  assert.ok(content.includes("Respect Giver Protocol"));
});

test("buildWebSiteJsonLd produces valid WebSite schema with SearchAction query-input", () => {
  const schema = buildWebSiteJsonLd("en");
  assert.equal(schema["@context"], "https://schema.org");
  assert.equal(schema["@type"], "WebSite");
  assert.equal(schema.name, "UltimateHealth");
  assert.ok(Array.isArray(schema.alternateName));
  assert.ok(schema.alternateName.includes("UltimateHealth Blog"));
  assert.ok(schema.disambiguatingDescription.includes("open-source"));
  assert.ok(schema.disambiguatingDescription.includes("Respect Giver Protocol"));
  assert.equal(schema.url, "https://ultimatehealth.blog/web/en");
  assert.equal(schema.potentialAction["@type"], "SearchAction");
  assert.equal(
    schema.potentialAction.target.urlTemplate,
    "https://ultimatehealth.blog/web/en/articles?q={search_term_string}"
  );
  assert.equal(
    schema.potentialAction["query-input"],
    "required name=search_term_string"
  );
});

test("buildArticleJsonLd produces valid MedicalWebPage schema with educational citation", () => {
  const schema = buildArticleJsonLd({
    title: "Understanding Hypertension",
    description: "A comprehensive guide to blood pressure symptoms and prevention.",
    url: "https://ultimatehealth.blog/web/en/articles/hypertension",
    authorName: "Dr. Jane Doe",
    category: "Cardiovascular",
    tags: ["heart", "hypertension", "wellness"],
    locale: "en",
    datePublished: "2026-01-15T00:00:00.000Z",
  });

  assert.equal(schema["@context"], "https://schema.org");
  assert.equal(schema["@type"], "MedicalWebPage");
  assert.equal(schema.name, "Understanding Hypertension");
  assert.equal(schema.headline, "Understanding Hypertension");
  assert.equal(schema.inLanguage, "en");
  assert.equal(schema.author.name, "Dr. Jane Doe");
  assert.equal(schema.publisher.name, "UltimateHealth");
  assert.equal(schema.about.name, "Cardiovascular");
  assert.equal(schema.citation, MEDICAL_DISCLAIMER_TEXT);
  assert.ok(schema.aspect.includes("Prevention"));
  assert.ok(schema.aspect.includes("Symptoms"));
});

test("buildBreadcrumbJsonLd produces structured BreadcrumbList with 1-based indexing", () => {
  const breadcrumbs = buildBreadcrumbJsonLd([
    { name: "Home", url: "https://ultimatehealth.blog/web/en" },
    { name: "Articles", url: "https://ultimatehealth.blog/web/en/articles" },
    { name: "Heart Health", url: "https://ultimatehealth.blog/web/en/articles/heart-health" },
  ]);

  assert.equal(breadcrumbs["@type"], "BreadcrumbList");
  assert.equal(breadcrumbs.itemListElement.length, 3);
  assert.equal(breadcrumbs.itemListElement[0].position, 1);
  assert.equal(breadcrumbs.itemListElement[0].name, "Home");
  assert.equal(breadcrumbs.itemListElement[2].position, 3);
  assert.equal(breadcrumbs.itemListElement[2].name, "Heart Health");
});

// ─── 3. Static Robots and Crawl Policy Verification ──────────────────────────

test("root public/robots.txt allows Googlebot, Bingbot, OAI-SearchBot, and PerplexityBot", () => {
  const rootRobotsPath = join(ROOT_DIR, "public/robots.txt");
  assert.ok(existsSync(rootRobotsPath), "public/robots.txt must exist");
  const content = read(rootRobotsPath);

  assert.ok(content.includes("User-agent: Googlebot"), "Missing Googlebot rules");
  assert.ok(content.includes("User-agent: Bingbot"), "Missing Bingbot rules");
  assert.ok(content.includes("User-agent: OAI-SearchBot"), "Missing OAI-SearchBot rules");
  assert.ok(content.includes("User-agent: PerplexityBot"), "Missing PerplexityBot rules");
  assert.ok(
    content.includes("Sitemap: https://ultimatehealth.blog/web/sitemap.xml"),
    "Missing canonical sitemap declaration"
  );
  assert.ok(
    content.includes("Disallow: /web/*/admin-agreement"),
    "Must disallow admin agreement"
  );
  assert.ok(
    content.includes("Disallow: /web/*/login"),
    "Must disallow login route"
  );
  assert.ok(
    content.includes("Disallow: /web/*/register"),
    "Must disallow register route"
  );
});

test("web/src/app/robots.ts configures dynamic Next.js robots route correctly", () => {
  const robotsTsPath = join(APP_DIR, "robots.ts");
  assert.ok(existsSync(robotsTsPath), "robots.ts must exist");
  const content = read(robotsTsPath);

  assert.ok(content.includes('userAgent: "Googlebot"'));
  assert.ok(content.includes('userAgent: "Bingbot"'));
  assert.ok(content.includes('userAgent: "OAI-SearchBot"'));
  assert.ok(content.includes('userAgent: "PerplexityBot"'));
  assert.ok(content.includes("/web/sitemap.xml"));
});

test("web/src/app/sitemap.ts configures dynamic XML sitemap with 9 locales and article routes", () => {
  const sitemapTsPath = join(APP_DIR, "sitemap.ts");
  assert.ok(existsSync(sitemapTsPath), "sitemap.ts must exist");
  const content = read(sitemapTsPath);

  assert.ok(content.includes("SUPPORTED_LOCALES"));
  assert.ok(content.includes("getHreflangAlternates"));
  assert.ok(content.includes("/articles"));
  assert.ok(content.includes("/medical-glossary"));
  assert.ok(content.includes("/our-contributors"));
  assert.ok(content.includes("/podcasts"));
  assert.ok(content.includes("/contribute"));
});

// ─── 4. Private and Auth Route NoIndex Protection ────────────────────────────

const PRIVATE_ROUTES = [
  "admin-agreement",
  "login",
  "login-admin",
  "register",
  "forgot-password",
  "delete-account",
  "delete-account-admin",
  "goodbye",
];

for (const route of PRIVATE_ROUTES) {
  test(`private route "${route}" enforces server-level noindex, nofollow`, () => {
    const layoutPath = join(APP_DIR, `[locale]/${route}/layout.tsx`);
    assert.ok(existsSync(layoutPath), `Missing layout.tsx for private route: ${route}`);
    const content = read(layoutPath);

    assert.ok(
      content.includes("getRobotsNoIndex"),
      `${route}/layout.tsx must import getRobotsNoIndex`
    );
    assert.ok(
      content.includes("robots: getRobotsNoIndex()"),
      `${route}/layout.tsx must configure robots: getRobotsNoIndex()`
    );
  });
}

// ─── 5. Server Component & Structured Data Integrity on Public Pages ─────────

const PUBLIC_PAGES = [
  { dir: "medical-glossary", clientFile: "MedicalGlossaryClient.tsx" },
  { dir: "our-contributors", clientFile: "OurContributorsClient.tsx" },
  { dir: "podcasts", clientFile: "PodcastsClient.tsx" },
  { dir: "contribute", clientFile: "ContributeClient.tsx" },
];

for (const page of PUBLIC_PAGES) {
  test(`public page "${page.dir}" is a Server Component exporting generateMetadata and JSON-LD`, () => {
    const pagePath = join(APP_DIR, `[locale]/${page.dir}/page.tsx`);
    const clientPath = join(APP_DIR, `[locale]/${page.dir}/${page.clientFile}`);

    assert.ok(existsSync(pagePath), `${page.dir}/page.tsx must exist`);
    assert.ok(existsSync(clientPath), `${page.dir}/${page.clientFile} must exist`);

    const pageContent = read(pagePath);
    const clientContent = read(clientPath);

    // Verify Server Component boundary: page.tsx must NOT contain 'use client'
    assert.ok(
      !pageContent.startsWith("'use client'") && !pageContent.startsWith('"use client"'),
      `${page.dir}/page.tsx must be a Server Component (no 'use client')`
    );

    // Verify client component boundary
    assert.ok(
      clientContent.includes("'use client'") || clientContent.includes('"use client"'),
      `${page.clientFile} must contain 'use client'`
    );

    // Verify metadata and structured data in page.tsx
    assert.ok(
      pageContent.includes("generateMetadata"),
      `${page.dir}/page.tsx must export generateMetadata`
    );
    assert.ok(
      pageContent.includes("application/ld+json"),
      `${page.dir}/page.tsx must render JSON-LD structured data`
    );
    assert.ok(
      pageContent.includes("getCanonicalUrl"),
      `${page.dir}/page.tsx must generate canonical URL`
    );
  });
}

// ─── 6. Visible Health Trust & Medical Disclaimer ────────────────────────────

test("Article footer renders prominent visible medical educational disclaimer", () => {
  const clientPagePath = join(
    WEB_DIR,
    "src/components/articles/ArticlePageClient.tsx"
  );
  assert.ok(existsSync(clientPagePath), "ArticlePageClient.tsx must exist");
  const content = read(clientPagePath);

  assert.ok(
    content.includes("Medical & Educational Disclaimer") ||
      content.includes("Medical Educational Disclaimer"),
    "ArticlePageClient must display visible Medical Educational Disclaimer title"
  );
  assert.ok(
    content.includes("intended solely for general educational, academic, and informational purposes"),
    "ArticlePageClient must display explicit disclaimer text"
  );
  assert.ok(
    content.includes("Always consult a licensed healthcare professional"),
    "ArticlePageClient must advise consulting a physician"
  );
});

test("buildHomeFaqJsonLd produces valid FAQPage schema prioritizing Dr. Moumita Debnath's clinical vision and roadmap", () => {
  const schema = buildHomeFaqJsonLd();
  assert.equal(schema["@context"], "https://schema.org");
  assert.equal(schema["@type"], "FAQPage");
  assert.ok(Array.isArray(schema.mainEntity));
  assert.ok(schema.mainEntity.length >= 5);

  // First item MUST prioritize Dr. Moumita Debnath's clinical vision and work
  const firstFaq = schema.mainEntity[0];
  assert.ok(firstFaq.name.includes("Dr. Moumita Debnath"));
  assert.ok(firstFaq.name.includes("vision"));
  assert.ok(firstFaq.acceptedAnswer.text.includes("Postgraduate Resident Doctor"));
  assert.ok(firstFaq.acceptedAnswer.text.includes("Department of Pulmonary & Chest Medicine"));
  assert.ok(firstFaq.acceptedAnswer.text.includes("Respect Giver Protocol"));
  assert.ok(firstFaq.acceptedAnswer.text.includes("30-article clinical respiratory education series"));
  
  // Strictly ensure no tragic or negative wording is present
  const firstFaqAnswerLower = firstFaq.acceptedAnswer.text.toLowerCase();
  assert.ok(!firstFaqAnswerLower.includes("tragedy"));
  assert.ok(!firstFaqAnswerLower.includes("tragic"));
  assert.ok(!firstFaqAnswerLower.includes("killed"));
  assert.ok(!firstFaqAnswerLower.includes("murder"));
  assert.ok(!firstFaqAnswerLower.includes("rape"));
  assert.ok(!firstFaqAnswerLower.includes("death"));

  const questions = schema.mainEntity.map((q) => q.name);
  assert.ok(questions.some((q) => q.includes("unique")));
  assert.ok(questions.some((q) => q.includes("safe space") || q.includes("content quality")));
  assert.ok(questions.some((q) => q.includes("upcoming") || q.includes("roadmap")));
  assert.ok(questions.some((q) => q.includes("languages")));

  const safeSpaceFaq = schema.mainEntity.find((q) => q.name.includes("safe space"));
  assert.ok(safeSpaceFaq);
  assert.ok(safeSpaceFaq.acceptedAnswer.text.includes("report-and-strike"));
  assert.ok(safeSpaceFaq.acceptedAnswer.text.includes("moderator"));

  // Verify homepage embeds FaqSection and FAQPage JSON-LD
  const homePath = join(APP_DIR, "[locale]/page.tsx");
  const homeContent = read(homePath);
  assert.ok(homeContent.includes("buildHomeFaqJsonLd"));
  assert.ok(homeContent.includes("FaqSection"));
});
