# UltimateHealth — Ongoing SEO & AI Discoverability Maintenance Guide

**Document Purpose:** Operational runbook, editorial checklist, and 30-day roadmap for maintaining technical SEO hygiene, crawl health, and AI search visibility on UltimateHealth.

---

## 1. 30-Day Launch Roadmap

```
Day 1 - 3: Submission & Verification
 ├── Submit https://ultimatehealth.blog/web/sitemap.xml to Google Search Console
 ├── Submit sitemap to Bing Webmaster Tools
 └── Run URL Inspection Live Tests on landing page and top 5 articles

Day 7 - 10: Crawl Validation
 ├── Review GSC "Pages" coverage report for crawl anomalies or unindexed URLs
 ├── Check server Nginx access logs for OAI-SearchBot and PerplexityBot requests
 └── Confirm zero 404 or 500 status codes in crawler logs

Day 14 - 20: Multilingual & Schema Audit
 ├── Verify Google has detected reciprocal hreflang tags across all 9 locales
 ├── Test Schema.org Rich Results on new articles using Google Rich Results Test
 └── Check mobile usability and Core Web Vitals scores in GSC

Day 30: AI Search Citation & Organic Traffic Review
 ├── Benchmark organic impressions and query trends in GSC Performance report
 ├── Test test queries on ChatGPT Search and Perplexity to assess answer citations
 └── Run automated regression test suite: `pnpm --dir web test`
```

---

## 2. Editorial Checklist for Publishing New Articles

When publishing or updating health articles on UltimateHealth, follow this checklist to ensure immediate indexation, structured data validity, and high discoverability:

### Step 1: Content & Title Standards
- [ ] **Title:** Concise and accurate (50–65 characters). Clearly identify the topic, symptom, or condition. Avoid clickbait.
- [ ] **Excerpt:** 1–2 sentences summarizing the core takeaway (120–160 characters). This automatically becomes the `meta description` and AI summary snippet.
- [ ] **Header Hierarchy:**
  - One `H1` (the title).
  - Use `H2` for main sections (Overview, Symptoms, Causes, Prevention, When to Seek Care).
  - Use `H3` for subsections. Never skip header levels.
- [ ] **Bullet Points & Tables:** Use unordered lists for symptoms and prevention tips. AI answer engines (Google AI Overviews, Perplexity) prioritize structured bulleted lists for direct answer extraction.

### Step 2: E-E-A-T & Medical Trust Standards
- [ ] **Educational Tone:** Follow the brand motto: *"Minimal Information. Real Information."* Avoid diagnostic language.
- [ ] **Author Attribution:** Ensure the author's real display name is attached so `MedicalWebPage` schema populates `Person` author markup.
- [ ] **Sources & References:** Cite reputable health sources (e.g., WHO, CDC, NHS, peer-reviewed journals) within the article content.
- [ ] **Medical Disclaimer:** The visible Medical & Educational Disclaimer component renders automatically in `ArticleFooter`. Ensure no content attempts to override this disclaimer.

### Step 3: Verification & Sitemap Auto-Inclusion
- [ ] **Dynamic Sitemap Verification:**
  - When an article is saved to the database/API (`/api/articles/`), the dynamic sitemap (`/web/sitemap.xml`) automatically ingests the ID and `updatedAt` timestamp within 60 minutes (`revalidate = 3600`).
  - To verify, load `https://ultimatehealth.blog/web/sitemap.xml` and search for the new article ID.
- [ ] **Schema Rich Results Test:**
  - Paste the live article URL into [Google Rich Results Test](https://search.google.com/test/rich-results).
  - Verify `MedicalWebPage` and `BreadcrumbList` are recognized with 0 critical errors.

---

## 3. Crawler Health & Error Monitoring Runbook

### 3.1 Resolving Soft 404s
If GSC flags a URL as "Submitted URL not found (404)" or "Soft 404":
- Check if the article ID exists in the database.
- If the article was permanently deleted, ensure the server returns an actual HTTP 404 status via Next.js `notFound()`, rather than an empty page with a 200 status. In `web/src/app/[locale]/articles/[id]/page.tsx`, `notFound()` is automatically called when article data fails to resolve.

### 3.2 Monitoring AI Answer Engines & Search Bots
Check Nginx access logs monthly for AI crawler activity:
```bash
# Check ChatGPT Search crawler activity
grep "OAI-SearchBot" /var/log/nginx/access.log | tail -n 20

# Check Perplexity crawler activity
grep "PerplexityBot" /var/log/nginx/access.log | tail -n 20

# Check Googlebot smartphone activity
grep "Googlebot" /var/log/nginx/access.log | tail -n 20
```
- If crawlers encounter `403 Forbidden` responses, review Cloudflare or Nginx WAF rate-limiting rules to ensure search crawlers are not inadvertently blocked. Note: `OAI-SearchBot` and `PerplexityBot` are verified search indexers, distinct from bulk training bots.

---

## 4. Quarterly Maintenance Checklist

1. **Test Suite Execution:**
   Run the full automated test suite to guard against regressions:
   ```powershell
   pnpm --dir web test
   ```
2. **Hreflang Coverage Check:**
   If a new language locale is added to `SUPPORTED_LOCALES` in `web/src/lib/seo-core.mjs`, all canonical and sitemap entries will update automatically. Re-run `web/src/app/seo.test.mjs` to ensure reciprocity across all routes.
3. **Internal Broken Link Check:**
   Crawl the public site with a local tool (e.g., `wget --spider` or an open-source link checker) to verify no broken internal links exist in articles, glossary terms, or podcast episode links.
4. **Content Freshness:**
   Review articles with `updatedAt` older than 12 months. Refresh medical guidance based on recent clinical consensus and update the record; search engines and AI engines value high `lastmod` recency on health content.
