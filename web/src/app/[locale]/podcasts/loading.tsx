export default function PodcastsLoading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--explorer-bg, #f8fafc)",
        color: "var(--explorer-text-primary, #0f172a)",
      }}
    >
      {/* ── Hero skeleton (matches real hero: paddingTop 130px) ── */}
      <section
        style={{
          paddingTop: "130px",
          paddingBottom: "80px",
          textAlign: "center",
          borderBottom: "1px solid var(--explorer-border, #e2e8f0)",
        }}
      >
        <div
          style={{
            maxWidth: "840px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0",
          }}
        >
          {/* Badge pill */}
          <div
            style={{
              width: "200px",
              height: "28px",
              borderRadius: "50px",
              background: "var(--explorer-border, #e2e8f0)",
              marginBottom: "20px",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />

          {/* H1 */}
          <div
            style={{
              width: "72%",
              height: "54px",
              borderRadius: "12px",
              background: "var(--explorer-border, #e2e8f0)",
              marginBottom: "16px",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />

          {/* Subtitle */}
          <div
            style={{
              width: "90%",
              height: "20px",
              borderRadius: "8px",
              background: "var(--explorer-border, #e2e8f0)",
              marginBottom: "8px",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
          <div
            style={{
              width: "65%",
              height: "20px",
              borderRadius: "8px",
              background: "var(--explorer-border, #e2e8f0)",
              marginBottom: "36px",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />

          {/* Trust pills row */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              marginBottom: "36px",
              flexWrap: "wrap",
            }}
          >
            {[100, 140, 120].map((w, i) => (
              <div
                key={i}
                style={{
                  width: `${w}px`,
                  height: "32px",
                  borderRadius: "50px",
                  background: "var(--explorer-border, #e2e8f0)",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
            ))}
          </div>

          {/* Search bar */}
          <div
            style={{
              maxWidth: "640px",
              width: "100%",
              height: "52px",
              borderRadius: "50px",
              background: "var(--explorer-border, #e2e8f0)",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </section>

      {/* ── Main content skeleton ── */}
      <section style={{ padding: "48px 24px 80px", maxWidth: "1280px", margin: "0 auto" }}>

        {/* Tabs + Sort row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "32px",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "240px",
              height: "46px",
              borderRadius: "14px",
              background: "var(--explorer-border, #e2e8f0)",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
          <div
            style={{
              width: "160px",
              height: "38px",
              borderRadius: "10px",
              background: "var(--explorer-border, #e2e8f0)",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        </div>

        {/* Filter bar skeleton */}
        <div
          style={{
            background: "var(--explorer-surface, #ffffff)",
            border: "1px solid var(--explorer-border, #e2e8f0)",
            borderRadius: "16px",
            padding: "20px 24px",
            marginBottom: "28px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {/* Category pills row */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[80, 110, 90, 130, 100, 110, 85, 120, 100].map((w, i) => (
              <div
                key={i}
                style={{
                  width: `${w}px`,
                  height: "30px",
                  borderRadius: "50px",
                  background: "var(--explorer-border, #e2e8f0)",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
            ))}
          </div>
          {/* Language pills row */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[110, 80, 75, 70, 70].map((w, i) => (
              <div
                key={i}
                style={{
                  width: `${w}px`,
                  height: "30px",
                  borderRadius: "50px",
                  background: "var(--explorer-border, #e2e8f0)",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
            ))}
          </div>
        </div>

        {/* Results header */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <div
            style={{
              width: "280px",
              height: "32px",
              borderRadius: "8px",
              background: "var(--explorer-border, #e2e8f0)",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
          <div
            style={{
              width: "80px",
              height: "24px",
              borderRadius: "50px",
              background: "var(--explorer-border, #e2e8f0)",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        </div>

        {/* Podcast card grid — matches real: auto-fill minmax(320px, 1fr) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              style={{
                background: "var(--explorer-surface, #ffffff)",
                border: "1px solid var(--explorer-border, #e2e8f0)",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              {/* Cover 16/9 */}
              <div
                style={{
                  aspectRatio: "16/9",
                  background: "var(--explorer-border, #e2e8f0)",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {/* Category tag */}
                <div
                  style={{
                    width: "60%",
                    height: "14px",
                    borderRadius: "8px",
                    background: "var(--explorer-border, #e2e8f0)",
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
                {/* Title */}
                <div
                  style={{
                    width: "80%",
                    height: "18px",
                    borderRadius: "8px",
                    background: "var(--explorer-border, #e2e8f0)",
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
                {/* Description */}
                <div
                  style={{
                    width: "100%",
                    height: "14px",
                    borderRadius: "8px",
                    background: "var(--explorer-border, #e2e8f0)",
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
                <div
                  style={{
                    width: "75%",
                    height: "14px",
                    borderRadius: "8px",
                    background: "var(--explorer-border, #e2e8f0)",
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
                {/* Meta row */}
                <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                  <div
                    style={{
                      width: "70px",
                      height: "22px",
                      borderRadius: "50px",
                      background: "var(--explorer-border, #e2e8f0)",
                      animation: "pulse 1.5s ease-in-out infinite",
                    }}
                  />
                  <div
                    style={{
                      width: "80px",
                      height: "22px",
                      borderRadius: "50px",
                      background: "var(--explorer-border, #e2e8f0)",
                      animation: "pulse 1.5s ease-in-out infinite",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
