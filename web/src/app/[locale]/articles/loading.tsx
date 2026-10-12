/**
 * Streaming skeleton for the /articles route.
 * Shown instantly when navigating to this page while the server
 * fetches article data — eliminates blank-screen wait.
 */
export default function ArticlesLoading() {
  return (
    <div style={{ minHeight: "100vh", background: "#0c0c14", color: "#f1f5f9" }}>
      {/* Hero skeleton */}
      <div
        style={{
          padding: "80px 24px 48px",
          textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            width: 120,
            height: 20,
            borderRadius: 8,
            background: "rgba(255,255,255,0.08)",
            margin: "0 auto 16px",
            animation: "skeleton-pulse 1.4s ease-in-out infinite",
          }}
        />
        <div
          style={{
            width: 280,
            height: 36,
            borderRadius: 10,
            background: "rgba(255,255,255,0.10)",
            margin: "0 auto 12px",
            animation: "skeleton-pulse 1.4s ease-in-out infinite",
          }}
        />
        <div
          style={{
            width: 220,
            height: 16,
            borderRadius: 6,
            background: "rgba(255,255,255,0.06)",
            margin: "0 auto",
            animation: "skeleton-pulse 1.4s ease-in-out infinite",
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
              background: "#13131f",
              border: "1px solid #252538",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {/* Thumbnail */}
            <div
              style={{
                aspectRatio: "16/9",
                background: "rgba(255,255,255,0.05)",
                animation: "skeleton-pulse 1.4s ease-in-out infinite",
              }}
            />
            {/* Text lines */}
            <div style={{ padding: "20px 20px 24px" }}>
              <div
                style={{
                  height: 20,
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.08)",
                  marginBottom: 10,
                  animation: "skeleton-pulse 1.4s ease-in-out infinite",
                }}
              />
              <div
                style={{
                  height: 14,
                  width: "80%",
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.05)",
                  marginBottom: 8,
                  animation: "skeleton-pulse 1.4s ease-in-out infinite",
                }}
              />
              <div
                style={{
                  height: 14,
                  width: "60%",
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.04)",
                  animation: "skeleton-pulse 1.4s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes skeleton-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
