/**
 * Streaming skeleton for /articles/[id] route.
 * Shown immediately when navigating to an article while the server
 * fetches article data and HTML content.
 * Fully theme-adaptive (Light mode default, Dark mode supported).
 */
export default function ArticleDetailLoading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--explorer-bg, #f8fafc)",
        color: "var(--explorer-text-primary, #0f172a)",
        maxWidth: 800,
        margin: "0 auto",
        padding: "80px 24px 64px",
      }}
    >
      {/* Back link */}
      <div
        className="skeleton-bar"
        style={{
          width: 100,
          height: 16,
          borderRadius: 6,
          marginBottom: 40,
        }}
      />

      {/* Tags */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[60, 80, 50].map((w, i) => (
          <div
            key={i}
            style={{
              width: w,
              height: 22,
              borderRadius: 99,
              background: "rgba(13,148,136,0.12)",
              animation: "skeleton-pulse 1.4s ease-in-out infinite",
            }}
          />
        ))}
      </div>

      {/* Title */}
      <div
        className="skeleton-bar"
        style={{
          height: 40,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />
      <div
        className="skeleton-bar"
        style={{
          height: 40,
          width: "70%",
          borderRadius: 8,
          marginBottom: 24,
        }}
      />

      {/* Meta row */}
      <div style={{ display: "flex", gap: 16, marginBottom: 40 }}>
        {[120, 80, 100].map((w, i) => (
          <div
            key={i}
            className="skeleton-bar"
            style={{
              width: w,
              height: 14,
              borderRadius: 6,
            }}
          />
        ))}
      </div>

      {/* Hero image */}
      <div
        className="skeleton-bar"
        style={{
          aspectRatio: "16/9",
          borderRadius: 16,
          marginBottom: 40,
        }}
      />

      {/* Body lines */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="skeleton-bar"
          style={{
            height: 16,
            width: i % 4 === 3 ? "55%" : "100%",
            borderRadius: 6,
            marginBottom: 12,
          }}
        />
      ))}

      <style>{`
        .skeleton-bar {
          background: rgba(0, 0, 0, 0.06);
          animation: skeleton-pulse 1.4s ease-in-out infinite;
        }
        html.dark .skeleton-bar {
          background: rgba(255, 255, 255, 0.08);
        }
        @keyframes skeleton-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
