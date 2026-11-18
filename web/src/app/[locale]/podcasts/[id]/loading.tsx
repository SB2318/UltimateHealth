export default function PodcastDetailLoading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--explorer-bg, #f8fafc)",
        color: "var(--explorer-text-primary, #0f172a)",
      }}
    >
      {/* ── Sticky header skeleton (matches real 60px header) ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "var(--explorer-surface, #ffffff)",
          borderBottom: "1px solid var(--explorer-border, #e2e8f0)",
          boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
          height: "60px",
        }}
      >
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: "0 16px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          {/* Back button */}
          <div
            style={{
              width: "140px",
              height: "42px",
              borderRadius: "10px",
              background: "var(--explorer-border, #e2e8f0)",
              animation: "pulse 1.5s ease-in-out infinite",
              flexShrink: 0,
            }}
          />
          {/* Title */}
          <div
            style={{
              flex: 1,
              height: "20px",
              borderRadius: "8px",
              background: "var(--explorer-border, #e2e8f0)",
              animation: "pulse 1.5s ease-in-out infinite",
              maxWidth: "460px",
            }}
          />
          {/* Play button */}
          <div
            style={{
              width: "80px",
              height: "38px",
              borderRadius: "10px",
              background: "var(--explorer-border, #e2e8f0)",
              animation: "pulse 1.5s ease-in-out infinite",
              flexShrink: 0,
            }}
          />
        </div>
      </div>

      {/* ── Page content wrapper — matches real maxWidth 860px, padding 40px 24px 80px ── */}
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ── Main Audio Console Card skeleton ── */}
        <div
          style={{
            background: "var(--explorer-surface, #ffffff)",
            border: "1px solid var(--explorer-border, #e2e8f0)",
            borderRadius: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            overflow: "hidden",
            marginBottom: "32px",
          }}
        >
          {/* Cover + Info row — matches real: grid "auto 1fr", cover fixed 220px */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              alignItems: "stretch",
            }}
          >
            {/* Cover art — 220×220+ */}
            <div
              style={{
                width: "220px",
                minHeight: "220px",
                background: "var(--explorer-border, #e2e8f0)",
                animation: "pulse 1.5s ease-in-out infinite",
                flexShrink: 0,
              }}
            />

            {/* Info panel — matches real padding 28px 28px 20px */}
            <div
              style={{
                padding: "28px 28px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                minWidth: 0,
              }}
            >
              {/* Badge pills */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <div
                  style={{
                    width: "90px",
                    height: "22px",
                    borderRadius: "50px",
                    background: "var(--explorer-border, #e2e8f0)",
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
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

              {/* Title */}
              <div
                style={{
                  width: "85%",
                  height: "30px",
                  borderRadius: "8px",
                  background: "var(--explorer-border, #e2e8f0)",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
              <div
                style={{
                  width: "60%",
                  height: "30px",
                  borderRadius: "8px",
                  background: "var(--explorer-border, #e2e8f0)",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />

              {/* Author row — matches real: flex, border, padding 12px 14px, borderRadius 12px */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  background: "var(--explorer-bg, #f8fafc)",
                  border: "1px solid var(--explorer-border, #e2e8f0)",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "var(--explorer-border, #e2e8f0)",
                    animation: "pulse 1.5s ease-in-out infinite",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div
                    style={{
                      width: "120px",
                      height: "14px",
                      borderRadius: "6px",
                      background: "var(--explorer-border, #e2e8f0)",
                      animation: "pulse 1.5s ease-in-out infinite",
                    }}
                  />
                  <div
                    style={{
                      width: "90px",
                      height: "11px",
                      borderRadius: "6px",
                      background: "var(--explorer-border, #e2e8f0)",
                      animation: "pulse 1.5s ease-in-out infinite",
                    }}
                  />
                </div>
                {/* Date on right */}
                <div
                  style={{
                    width: "80px",
                    height: "12px",
                    borderRadius: "6px",
                    background: "var(--explorer-border, #e2e8f0)",
                    animation: "pulse 1.5s ease-in-out infinite",
                    flexShrink: 0,
                  }}
                />
              </div>
            </div>
          </div>

          {/* ── Audio player area — matches real: borderTop, padding 20px 28px 24px, bg explorer-bg ── */}
          <div
            style={{
              borderTop: "1px solid var(--explorer-border, #e2e8f0)",
              padding: "20px 28px 24px",
              background: "var(--explorer-bg, #f8fafc)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {/* Progress bar */}
            <div
              style={{
                width: "100%",
                height: "6px",
                borderRadius: "50px",
                background: "var(--explorer-border, #e2e8f0)",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
            {/* Time labels */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  width: "40px",
                  height: "11px",
                  borderRadius: "4px",
                  background: "var(--explorer-border, #e2e8f0)",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
              <div
                style={{
                  width: "40px",
                  height: "11px",
                  borderRadius: "4px",
                  background: "var(--explorer-border, #e2e8f0)",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
            </div>
            {/* Controls row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              {/* Skip back */}
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "var(--explorer-border, #e2e8f0)",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
              {/* Play button */}
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "var(--explorer-border, #e2e8f0)",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
              {/* Skip forward */}
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "var(--explorer-border, #e2e8f0)",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
              {/* Speed + volume */}
              <div
                style={{
                  width: "60px",
                  height: "30px",
                  borderRadius: "8px",
                  background: "var(--explorer-border, #e2e8f0)",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
              <div
                style={{
                  width: "90px",
                  height: "6px",
                  borderRadius: "50px",
                  background: "var(--explorer-border, #e2e8f0)",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
              {/* Action buttons */}
              <div style={{ display: "flex", gap: "8px" }}>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "var(--explorer-border, #e2e8f0)",
                      animation: "pulse 1.5s ease-in-out infinite",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Description / Notes card skeleton ── */}
        <div
          style={{
            background: "var(--explorer-surface, #ffffff)",
            border: "1px solid var(--explorer-border, #e2e8f0)",
            borderRadius: "16px",
            padding: "28px",
            marginBottom: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "160px",
              height: "20px",
              borderRadius: "8px",
              background: "var(--explorer-border, #e2e8f0)",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
          {[100, 90, 80, 95, 70].map((w, i) => (
            <div
              key={i}
              style={{
                width: `${w}%`,
                height: "14px",
                borderRadius: "6px",
                background: "var(--explorer-border, #e2e8f0)",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          ))}
        </div>

        {/* ── Related podcasts skeleton ── */}
        <div
          style={{
            width: "180px",
            height: "24px",
            borderRadius: "8px",
            background: "var(--explorer-border, #e2e8f0)",
            animation: "pulse 1.5s ease-in-out infinite",
            marginBottom: "20px",
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                background: "var(--explorer-surface, #ffffff)",
                border: "1px solid var(--explorer-border, #e2e8f0)",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  aspectRatio: "16/9",
                  background: "var(--explorer-border, #e2e8f0)",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
              <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div
                  style={{
                    width: "50%",
                    height: "12px",
                    borderRadius: "6px",
                    background: "var(--explorer-border, #e2e8f0)",
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
                <div
                  style={{
                    width: "80%",
                    height: "16px",
                    borderRadius: "6px",
                    background: "var(--explorer-border, #e2e8f0)",
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
                <div
                  style={{
                    width: "65%",
                    height: "12px",
                    borderRadius: "6px",
                    background: "var(--explorer-border, #e2e8f0)",
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
