/**
 * Streaming skeleton for /articles/[id] route.
 * Shown immediately when navigating to an article while the server
 * fetches article data and HTML content.
 */
export default function ArticleDetailLoading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0c0c14",
        color: "#f1f5f9",
        maxWidth: 800,
        margin: "0 auto",
        padding: "80px 24px 64px",
      }}
    >
      {/* Back link */}
      <div
        style={{
          width: 100,
          height: 16,
          borderRadius: 6,
          background: "rgba(255,255,255,0.07)",
          marginBottom: 40,
          animation: "skeleton-pulse 1.4s ease-in-out infinite",
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
              background: "rgba(45,212,191,0.12)",
              animation: "skeleton-pulse 1.4s ease-in-out infinite",
            }}
          />
        ))}
      </div>

      {/* Title */}
      <div
        style={{
          height: 40,
          borderRadius: 8,
          background: "rgba(255,255,255,0.10)",
          marginBottom: 12,
          animation: "skeleton-pulse 1.4s ease-in-out infinite",
        }}
      />
      <div
        style={{
          height: 40,
          width: "70%",
          borderRadius: 8,
          background: "rgba(255,255,255,0.08)",
          marginBottom: 24,
          animation: "skeleton-pulse 1.4s ease-in-out infinite",
        }}
      />

      {/* Meta row */}
      <div style={{ display: "flex", gap: 16, marginBottom: 40 }}>
        {[120, 80, 100].map((w, i) => (
          <div
            key={i}
            style={{
              width: w,
              height: 14,
              borderRadius: 6,
              background: "rgba(255,255,255,0.06)",
              animation: "skeleton-pulse 1.4s ease-in-out infinite",
            }}
          />
        ))}
      </div>

      {/* Hero image */}
      <div
        style={{
          aspectRatio: "16/9",
          borderRadius: 16,
          background: "rgba(255,255,255,0.05)",
          marginBottom: 40,
          animation: "skeleton-pulse 1.4s ease-in-out infinite",
        }}
      />

      {/* Body lines */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 16,
            width: i % 4 === 3 ? "55%" : "100%",
            borderRadius: 6,
            background: "rgba(255,255,255,0.05)",
            marginBottom: 12,
            animation: "skeleton-pulse 1.4s ease-in-out infinite",
          }}
        />
      ))}

      <style>{`
        @keyframes skeleton-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
