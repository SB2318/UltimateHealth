/**
 * Streaming skeleton for the /articles route.
 * Shown instantly when navigating to this page while the server
 * fetches article data — eliminates blank-screen wait.
 * Fully theme-adaptive (Light mode default, Dark mode supported).
 */
export default function ArticlesLoading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--explorer-bg, #f8fafc)",
        color: "var(--explorer-text-primary, #0f172a)",
      }}
    >
      {/* Hero skeleton */}
      <div
        style={{
          padding: "80px 24px 48px",
          textAlign: "center",
          borderBottom: "1px solid var(--explorer-border, #e2e8f0)",
        }}
      >
        <div
          className="skeleton-bar"
          style={{
            width: 120,
            height: 20,
            borderRadius: 8,
            margin: "0 auto 16px",
          }}
        />
        <div
          className="skeleton-bar"
          style={{
            width: 280,
            height: 36,
            borderRadius: 10,
            margin: "0 auto 12px",
          }}
        />
        <div
          className="skeleton-bar"
          style={{
            width: 220,
            height: 16,
            borderRadius: 6,
            margin: "0 auto",
          }}
        />
      </div>

      {/* Article grid skeleton */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "48px 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
        }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            style={{
              background: "var(--explorer-surface, #ffffff)",
              border: "1px solid var(--explorer-border, #e2e8f0)",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "var(--explorer-card-shadow, 0 4px 16px rgba(0,0,0,0.04))",
            }}
          >
            {/* Thumbnail */}
            <div
              className="skeleton-bar"
              style={{
                aspectRatio: "16/9",
                borderRadius: 0,
              }}
            />
            {/* Text lines */}
            <div style={{ padding: "20px 20px 24px" }}>
              <div
                className="skeleton-bar"
                style={{
                  height: 20,
                  borderRadius: 6,
                  marginBottom: 10,
                }}
              />
              <div
                className="skeleton-bar"
                style={{
                  height: 14,
                  width: "80%",
                  borderRadius: 6,
                  marginBottom: 8,
                }}
              />
              <div
                className="skeleton-bar"
                style={{
                  height: 14,
                  width: "60%",
                  borderRadius: 6,
                }}
              />
            </div>
          </div>
        ))}
      </div>

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
