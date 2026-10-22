# UltimateHealth — Search Console & Webmaster Tools Setup Guide

**Domain:** `https://ultimatehealth.blog`  
**Base URL:** `https://ultimatehealth.blog/web/en`  
**Target Search Engines:** Google (Search & AI Overviews), Bing, ChatGPT Search (OAI-SearchBot), Perplexity AI  

---

## 1. Google Search Console Setup

### 1.1 Property Creation (Recommended: Domain Property)
1. Navigate to [Google Search Console](https://search.google.com/search-console).
2. Click **Add Property**.
3. Select **Domain** property (covers `https://ultimatehealth.blog`, all subdomains, protocols, and `/web` paths).
4. Enter `ultimatehealth.blog`.
5. Add the provided DNS `TXT` verification record to your DNS provider (e.g., Cloudflare, Namecheap, Route53):
   ```text
   google-site-verification=<YOUR_VERIFICATION_TOKEN>
   ```
6. Click **Verify**.

> [!NOTE]
> If DNS verification cannot be completed immediately, create a **URL Prefix Property** for `https://ultimatehealth.blog/web/` and verify using an HTML file upload or HTML tag.

---

### 1.2 Sitemap Submission
Once verified:
1. In the left navigation, select **Sitemaps**.
2. Under "Add a new sitemap", submit:
   ```text
   https://ultimatehealth.blog/web/sitemap.xml
   ```
3. Click **Submit**.
4. Confirm the status turns **Success**. Google will automatically read the 9 locale alternate URLs and discover dynamic article endpoints.

---

### 1.3 URL Inspection & Live Testing
To verify that Googlebot renders the Next.js App Router Server Components and reads Schema.org JSON-LD correctly:
1. Open the **URL Inspection** tool at the top of GSC.
2. Enter the primary English URL: `https://ultimatehealth.blog/web/en`.
3. Click **Test Live URL**.
4. Check the following:
   - **HTTP Status:** `200 OK`.
   - **Page fetch:** Successful.
   - **User-Agent:** Googlebot smartphone.
   - **Detected Structured Data:** Check that `Organization` and `WebSite` appear with 0 errors and 0 warnings.
5. Inspect an individual article URL: `https://ultimatehealth.blog/web/en/articles/<article-id>`.
   - Check that `MedicalWebPage` and `BreadcrumbList` appear with 0 errors.
   - Confirm canonical URL points exactly to `https://ultimatehealth.blog/web/en/articles/<article-id>`.

---

### 1.4 Hreflang & International Targeting Verification
1. Inspect localized URLs (e.g., `/web/hi/articles`, `/web/de/articles`).
2. Verify that Google detects reciprocal alternate links for all 9 supported languages:
   - English (`en`), Hindi (`hi`), Bengali (`bn`), Tamil (`ta`), Odia (`or`), German (`de`), Spanish (`es`), French (`fr`), Croatian (`hr`), and `x-default`.
3. Ensure no `hreflang` error reports ("no return tags") appear in the GSC Page Indexing reports.

---

## 2. Bing Webmaster Tools & IndexNow Setup

### 2.1 Bing Webmaster Tools Setup
1. Navigate to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Sign in and select **Import from Google Search Console** (fastest, requires no duplicate DNS verification).
3. If importing is not possible, add `https://ultimatehealth.blog/` and verify via DNS TXT record or HTML meta tag.
4. Navigate to **Sitemaps** and submit:
   ```text
   https://ultimatehealth.blog/web/sitemap.xml
   ```

### 2.2 Bing IndexNow (Optional Instant Indexing)
Bing, Yandex, and select search engines support IndexNow for instant crawling upon new article publication.
When new articles are published in UltimateHealth:
- An API POST request can notify the IndexNow endpoint (`https://api.indexnow.org/IndexNow`) with the newly published URL and API key.

---

## 3. AI Search & Answer Engine Visibility Verification

UltimateHealth is architected to be discoverable and citeable by AI search engines without using blackhat techniques.

### 3.1 ChatGPT Search (OAI-SearchBot)
- **Crawler:** `OAI-SearchBot` (User-agent used exclusively for ChatGPT Search discovery and real-time citations).
- **Robots Verification:**
  Visit `https://ultimatehealth.blog/web/robots.txt` in a browser or curl:
  ```http
  User-agent: OAI-SearchBot
  Allow: /
  Allow: /web/
  Allow: /_next/static/
  Disallow: /web/*/login
  Disallow: /web/*/register
  ```
- **Live Search Check:** In ChatGPT Search, search for distinct educational phrases from published articles (e.g., `"UltimateHealth Minimal Information. Real Information."`). ChatGPT Search fetches live HTML, executes JS where needed, and parses semantic headings (`h1`, `h2`) and `MedicalWebPage` structured data.

### 3.2 Perplexity AI (PerplexityBot)
- **Crawler:** `PerplexityBot`.
- **Robots Verification:** PerplexityBot is explicitly granted access in `web/src/app/robots.ts` and `public/robots.txt`.
- **Live Citation Verification:** Query Perplexity:
  ```text
  site:ultimatehealth.blog/web/en/articles
  ```
  Perplexity reads the concise summary paragraphs, bulleted advice, and citations in `MedicalWebPage` markup to formulate referenced answers.

---

## 4. Privacy-Preserving Performance Monitoring

In keeping with UltimateHealth's "Zero Third-Party Tracking" standard:
- **Do NOT install Google Analytics 4 (GA4) or Google Tag Manager (GTM).**
- **Do NOT set tracking cookies or consent banners.**

Instead, monitor discoverability using:
1. **Google Search Console Performance Report:**
   - Aggregated organic impressions, clicks, search queries, and average rank without tracking individuals or IP addresses.
2. **Server Access Logs (Nginx/Cloudflare):**
   - Monitor crawl hits by User-Agent:
     - `grep -E "Googlebot|Bingbot|OAI-SearchBot|PerplexityBot" /var/log/nginx/access.log`
   - Verify HTTP `200` responses on article and glossary pages.
