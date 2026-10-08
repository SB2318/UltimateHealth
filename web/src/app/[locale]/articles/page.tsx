import type { Metadata } from "next";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { withBasePath } from "@/lib/basePath";
import type { ApiArticle, ApiArticlesResponse } from "@/types/api-article";
import { Navbar, PageWrapper, Section } from "@/components/layout";
import { Footer } from "@/components/ui/footer";
import { Sparkles, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Health Articles | UltimateHealth",
  description:
    "Explore community-reviewed health and wellness guides inspired by Dr. Moumita Debnath's clinical research and patient dignity.",
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ArticlesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = typeof params.page === "string" ? parseInt(params.page, 10) : 1;
  const limit = 9;

  let data: ApiArticlesResponse = { articles: [], totalPages: 1, currentPage: 1 };
  let actualTotalPages = 1;

  try {
    const res = await fetch(`https://uhsocial.in/api/articles/?page=${page}&limit=${limit}`, {
      cache: "no-store",
    });
    if (res.ok) {
      data = await res.json();
    }

    actualTotalPages = data.totalPages || 1;

    // Fallback for API bug where totalPages is missing on page > 1
    if (page > 1 && !data.totalPages) {
      const p1Res = await fetch(`https://uhsocial.in/api/articles/?page=1&limit=${limit}`, {
        cache: "no-store",
      });
      if (p1Res.ok) {
        const p1Data = await p1Res.json();
        actualTotalPages = p1Data.totalPages || 1;
      }
    }
  } catch (error) {
    console.error("Failed to fetch articles:", error);
  }

  const articles = data.articles || (Array.isArray(data) ? data : []);
  const totalPages = actualTotalPages;
  const currentPage = page;

  return (
    <>
      <Navbar />
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
              Health Knowledge Hub
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
              Elevate Your <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #00e5ff 0%, #7c3aed 50%, #f0006a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Health Literacy
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
              Explore evidence-based health and wellness resources crafted by community contributors.
              From pulmonary wellness to mental resilience, discover insights to support your everyday well-being.
            </p>

            {/* ── Moumita Debnath Research Dedication & 30 Curated Articles Coming Soon Banner ── */}
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
                  Coming Soon
                </span>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#e2e8f0", letterSpacing: "0.04em" }}>
                  30+ Curated Clinical Articles
                </span>
              </div>
              <p style={{ fontSize: "0.92rem", color: "#94a3b8", lineHeight: 1.65, margin: 0 }}>
                Inspired by <strong style={{ color: "#f1f5f9" }}>Dr. Moumita Debnath&apos;s</strong> clinical life work and pulmonary medicine training at R.G. Kar Medical College, we are curating <strong style={{ color: "#f1f5f9" }}>30 foundational health guides</strong> covering chest medicine, respiratory wellness, preventive care, and patient dignity — launching across all 9 proposed Indian and global languages.
              </p>
            </div>
          </div>
        </section>

        {/* ── Articles Grid ── */}
        <section style={{ padding: "64px 24px 100px", maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #252538",
              paddingBottom: "20px",
              marginBottom: "40px",
            }}
          >
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: 800,
                color: "#f1f5f9",
                margin: 0,
                fontFamily: '"Orbitron", "Rajdhani", system-ui, sans-serif',
              }}
            >
              All Articles
            </h2>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#64748b",
              }}
            >
              Page {currentPage} of {totalPages}
            </span>
          </div>

          {articles.length === 0 ? (
            <div
              style={{
                background: "#13131f",
                border: "1.5px dashed #252538",
                borderRadius: "16px",
                padding: "64px 32px",
                textAlign: "center",
                color: "#94a3b8",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "12px" }}>📖</div>
              <p style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, color: "#f1f5f9" }}>
                Articles are preparing for publication.
              </p>
              <p style={{ fontSize: "0.9rem", color: "#64748b", marginTop: "6px" }}>
                Check back soon or explore our Medical Glossary.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "24px",
              }}
            >
              {articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          )}

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div
              style={{
                marginTop: "64px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {currentPage > 1 ? (
                <Link
                  href={withBasePath(`/articles?page=${currentPage - 1}`)}
                  style={{
                    padding: "10px 18px",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "#f1f5f9",
                    background: "#13131f",
                    border: "1px solid #252538",
                    borderRadius: "10px",
                    textDecoration: "none",
                  }}
                >
                  ← Previous
                </Link>
              ) : (
                <span
                  style={{
                    padding: "10px 18px",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "#475569",
                    background: "#0c0c14",
                    border: "1px solid #1a1a28",
                    borderRadius: "10px",
                    cursor: "not-allowed",
                  }}
                >
                  ← Previous
                </span>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={withBasePath(`/articles?page=${p}`)}
                  style={{
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    borderRadius: "10px",
                    textDecoration: "none",
                    background: p === currentPage ? "#7c3aed" : "#13131f",
                    color: p === currentPage ? "#ffffff" : "#94a3b8",
                    border: p === currentPage ? "1px solid #a78bfa" : "1px solid #252538",
                  }}
                >
                  {p}
                </Link>
              ))}

              {currentPage < totalPages ? (
                <Link
                  href={withBasePath(`/articles?page=${currentPage + 1}`)}
                  style={{
                    padding: "10px 18px",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "#f1f5f9",
                    background: "#13131f",
                    border: "1px solid #252538",
                    borderRadius: "10px",
                    textDecoration: "none",
                  }}
                >
                  Next →
                </Link>
              ) : (
                <span
                  style={{
                    padding: "10px 18px",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "#475569",
                    background: "#0c0c14",
                    border: "1px solid #1a1a28",
                    borderRadius: "10px",
                    cursor: "not-allowed",
                  }}
                >
                  Next →
                </span>
              )}
            </div>
          )}
        </section>

        <Footer />
      </main>
    </>
  );
}

function ArticleCard({ article }: { article: ApiArticle }) {
  const date = article.publishedDate ? format(parseISO(article.publishedDate), "MMM d, yyyy") : "Unknown date";

  const rawImg = article.imageUtils && article.imageUtils.length > 0 ? article.imageUtils[0] : null;
  const imageUrl = rawImg
    ? rawImg.startsWith("http")
      ? rawImg
      : withBasePath(`/api/proxy-image?url=${encodeURIComponent(`https://uhsocial.in/api/getFile/${rawImg}`)}`)
    : null;

  return (
    <a
      href={withBasePath(`/articles/${article._id}`)}
      style={{
        background: "#13131f",
        border: "1px solid #252538",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        transition: "border-color 0.2s ease, transform 0.2s ease",
      }}
      className="group hover:-translate-y-1 hover:border-[#7c3aed]"
    >
      {/* Thumbnail */}
      <div
        style={{
          position: "relative",
          aspectRatio: "16/9",
          overflow: "hidden",
          background: "#0c0c14",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {imageUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={imageUrl}
            alt={`Cover image for article: ${article.title}`}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(0, 229, 255, 0.1))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
            }}
          >
            📋
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
          {article.tags?.length > 0 ? (
            article.tags.map((tag) => (
              <span
                key={tag._id}
                style={{
                  display: "inline-block",
                  padding: "3px 10px",
                  borderRadius: "50px",
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  background: "rgba(124, 58, 237, 0.15)",
                  color: "#a78bfa",
                  border: "1px solid rgba(124, 58, 237, 0.3)",
                }}
              >
                {tag.name}
              </span>
            ))
          ) : (
            <span
              style={{
                display: "inline-block",
                padding: "3px 10px",
                borderRadius: "50px",
                fontSize: "11px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                background: "rgba(255, 255, 255, 0.05)",
                color: "#94a3b8",
              }}
            >
              General
            </span>
          )}
        </div>

        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 800,
            color: "#f1f5f9",
            lineHeight: 1.35,
            marginBottom: "10px",
          }}
        >
          {article.title}
        </h3>

        <p
          style={{
            fontSize: "0.875rem",
            color: "#94a3b8",
            lineHeight: 1.6,
            flex: 1,
            marginBottom: "20px",
          }}
        >
          {article.description}
        </p>

        {/* Footer (Author & Meta) */}
        <div
          style={{
            paddingTop: "16px",
            borderTop: "1px solid #252538",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.78rem",
            color: "#64748b",
          }}
        >
          <span style={{ fontWeight: 600, color: "#cbd5e1" }}>
            {article.authorId?.user_name || "Community Medical Contributor"}
          </span>
          <time dateTime={article.publishedDate}>{date}</time>
        </div>
      </div>
    </a>
  );
}
