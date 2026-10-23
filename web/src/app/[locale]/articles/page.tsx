import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import type { ApiArticle, ApiArticlesResponse } from "@/types/api-article";
import SiteHeader from "@/components/home/SiteHeader";
import { Footer } from "@/components/ui/footer";
import { Sparkles, BookOpen } from "lucide-react";
import ArticlesExplorer from "@/components/articles/ArticlesExplorer";
import {
  BRAND_NAME,
  FULL_SITE_URL,
  getCanonicalUrl,
  getHreflangAlternates,
  buildBreadcrumbJsonLd,
} from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const canonical = getCanonicalUrl(locale, "/articles");
  const alternates = getHreflangAlternates("/articles");

  return {
    title: "Health Articles & Clinical Guides",
    description:
      "Explore evidence-based health guides and the upcoming 30-guide respiratory series honoring Dr. Moumita Debnath's clinical patient dignity ethos.",
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title: `Health Articles & Clinical Guides | ${BRAND_NAME} Blog`,
      description:
        "Explore open-source, evidence-based health and wellness guides reviewed for clarity and accessibility.",
      url: canonical,
      siteName: `${BRAND_NAME} Blog`,
      locale: locale,
      type: "website",
      images: [
        {
          url: `${FULL_SITE_URL}/icon1.png`,
          width: 512,
          height: 512,
          alt: `${BRAND_NAME} Articles Directory`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Health Articles & Clinical Guides | ${BRAND_NAME} Blog`,
      description:
        "Open-source, evidence-based health guides and accessible wellness articles.",
      images: [`${FULL_SITE_URL}/icon1.png`],
    },
  };
}

export default async function ArticlesPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "articles" });
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  const BASE = "https://ultimatehealth.blog/api/articles";
  const ISR = { next: { revalidate: 300 } } as const;

  let articles: ApiArticle[] = [];

  try {
    // Fetch all library articles to enable instant client-side search & language filtering
    const res = await fetch(`${BASE}/?limit=100`, ISR);
    if (res.ok) {
      const d: ApiArticlesResponse = await res.json();
      articles = d.articles ?? [];
    }
  } catch (error) {
    console.error("Failed to fetch articles:", error);
  }

  const breadcrumbsJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: getCanonicalUrl(locale) },
    { name: "Articles", url: getCanonicalUrl(locale, "/articles") },
  ]);

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "UltimateHealth Articles Directory",
    description:
      "Explore open-source, evidence-based health and wellness guides reviewed for clarity and accessibility.",
    url: getCanonicalUrl(locale, "/articles"),
    isPartOf: {
      "@type": "WebSite",
      name: BRAND_NAME,
      url: `${FULL_SITE_URL}/${locale}`,
    },
    about: [
      {
        "@type": "Thing",
        name: "Health Education & Literacy",
      },
      {
        "@type": "Person",
        name: "Dr. Moumita Debnath",
        jobTitle: "Postgraduate Resident Doctor",
        worksFor: {
          "@type": "MedicalOrganization",
          name: "Department of Pulmonary & Chest Medicine",
        },
        description:
          "Postgraduate resident doctor in Pulmonary & Chest Medicine whose dedication to compassionate care and patient dignity inspired the platform's Respect Giver Protocol and upcoming 30-article memorial respiratory series.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <SiteHeader />
      <main
        style={{
          minHeight: "100vh",
          background: "var(--explorer-bg, #f8fafc)",
          color: "var(--explorer-text-primary, #0f172a)",
        }}
      >
        {/* ── Hero Section ── */}
        <section
          style={{
            paddingTop: "130px",
            paddingBottom: "80px",
            textAlign: "center",
            borderBottom: "1px solid var(--explorer-border, #e2e8f0)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              height: "350px",
              background:
                "radial-gradient(circle, rgba(13, 148, 136, 0.08) 0%, rgba(6, 182, 212, 0.03) 50%, transparent 70%)",
              filter: "blur(50px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <div
            style={{
              maxWidth: "840px",
              margin: "0 auto",
              padding: "0 24px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Pill Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "50px",
                background: "var(--explorer-badge-bg, rgba(13, 148, 136, 0.10))",
                border: "1px solid var(--explorer-badge-border, rgba(13, 148, 136, 0.25))",
                color: "#0d9488",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              <BookOpen size={14} />
              <span>{t("badge")}</span>
            </div>

            {/* H1 Heading */}
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--explorer-text-primary, #0f172a)",
                lineHeight: 1.15,
                margin: "0 0 16px 0",
              }}
            >
              {t("titlePart1")} {t("titleHighlight")}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.125rem)",
                lineHeight: 1.75,
                color: "var(--explorer-text-secondary, #475569)",
                maxWidth: "680px",
                margin: "0 auto",
              }}
            >
              {t("description")}
            </p>

            {/* ── Moumita Debnath Research Dedication Banner ── */}
            <div
              style={{
                background: "var(--explorer-surface, #ffffff)",
                border: "1px solid var(--explorer-border, #e2e8f0)",
                borderRadius: "20px",
                padding: "24px 28px",
                maxWidth: "720px",
                margin: "32px auto 0",
                textAlign: "left",
                boxShadow:
                  "var(--explorer-card-shadow, 0 4px 20px rgba(0,0,0,0.05))",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "10px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 12px",
                    borderRadius: "50px",
                    background: "rgba(240, 0, 106, 0.12)",
                    border: "1px solid rgba(240, 0, 106, 0.3)",
                    color: "#f0006a",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  <Sparkles size={12} />
                  {t("memorialBadge")}
                </span>
                <span
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "var(--explorer-text-primary, #0f172a)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {t("memorialTitle")}
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.92rem",
                  color: "var(--explorer-text-secondary, #475569)",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {t("memorialDesc")}
              </p>
            </div>
          </div>
        </section>

        {/* ── Articles Directory with Instant Search, Language Filter & Pagination ── */}
        <section
          style={{
            padding: "64px 24px 100px",
            maxWidth: "1280px",
            margin: "0 auto",
          }}
        >
          <ArticlesExplorer initialArticles={articles} locale={locale} />
        </section>

        <Footer />
      </main>
    </>
  );
}
