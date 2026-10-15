import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { ApiArticle, ApiArticlesResponse } from "@/types/api-article";
import SiteHeader from "@/components/home/SiteHeader";
import { Footer } from "@/components/ui/footer";
import { Sparkles, BookOpen } from "lucide-react";
import ArticlesExplorer from "@/components/articles/ArticlesExplorer";

export const metadata: Metadata = {
  title: "Health Articles | UltimateHealth",
  description:
    "Explore admin-reviewed health and wellness guides. Dedicated memorial clinical guides in honour of Dr. Moumita Debnath are arriving separately.",
};

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ArticlesPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "articles" });

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

  return (
    <>
      <SiteHeader />
      <main style={{ minHeight: "100vh", background: "#0c0c14", color: "#f1f5f9" }}>
        {/* ── Hero Section ── */}
        <section
          style={{
            paddingTop: "130px",
            paddingBottom: "80px",
            textAlign: "center",
            borderBottom: "1px solid #252538",
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
              transform: "translateX(-50%)",
              width: "700px",
              height: "400px",
              background: "radial-gradient(ellipse, rgba(124, 58, 237, 0.16) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ maxWidth: "880px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
            {/* Knowledge Hub Tag */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(124, 58, 237, 0.14)",
                border: "1px solid rgba(124, 58, 237, 0.35)",
                borderRadius: "50px",
                padding: "6px 18px",
                marginBottom: "20px",
                color: "#a78bfa",
                fontSize: "0.75rem",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "monospace",
              }}
            >
              <BookOpen size={14} color="#a78bfa" />
              {t("badge")}
            </div>

            <h1
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
                color: "#f1f5f9",
                fontFamily: '"Orbitron", "Rajdhani", system-ui, sans-serif',
                marginBottom: "18px",
              }}
            >
              {t("titlePart1")} <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #00e5ff 0%, #7c3aed 50%, #f0006a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("titleHighlight")}
              </span>
            </h1>

            <p
              style={{
                fontSize: "1.08rem",
                lineHeight: 1.75,
                color: "#94a3b8",
                maxWidth: "680px",
                margin: "0 auto",
              }}
            >
              {t("description")}
            </p>

            {/* ── Moumita Debnath Research Dedication Banner ── */}
            <div
              style={{
                background: "#13131f",
                border: "1px solid #252538",
                borderRadius: "20px",
                padding: "24px 28px",
                maxWidth: "720px",
                margin: "32px auto 0",
                textAlign: "left",
                boxShadow: "0 12px 36px rgba(0,0,0,0.35)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 12px",
                    borderRadius: "50px",
                    background: "rgba(240, 0, 106, 0.16)",
                    border: "1px solid rgba(240, 0, 106, 0.4)",
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
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#e2e8f0", letterSpacing: "0.04em" }}>
                  {t("memorialTitle")}
                </span>
              </div>
              <p style={{ fontSize: "0.92rem", color: "#94a3b8", lineHeight: 1.65, margin: 0 }}>
                {t("memorialDesc")}
              </p>
            </div>
          </div>
        </section>

        {/* ── Articles Directory with Instant Search, Language Filter & Pagination ── */}
        <section style={{ padding: "64px 24px 100px", maxWidth: "1280px", margin: "0 auto" }}>
          <ArticlesExplorer initialArticles={articles} locale={locale} />
        </section>

        <Footer />
      </main>
    </>
  );
}
