/**
 * UltimateHealth Design System — Design Tokens
 *
 * PHILOSOPHY: One strong dark background, one primary accent (cyan),
 * pink only for CTAs, yellow only for highlights. Everything else is
 * shades of white/slate. No decoration for decoration's sake.
 *
 * SPACING: 4px base grid → 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128px
 * TYPE SCALE: 12, 14, 16, 18, 22, 28, 36, 48, 60px (never exceed 60px)
 * CARD PADDING: Always 32px (desktop), 24px (mobile)
 * BORDER RADIUS: Cards 16px, Buttons 10px, Pills 999px
 */

export const tokens = {
  /** ── Colour ── */
  color: {
    bg:         '#0c0c14',   // Page background — slightly warmer than pure black
    surface:    '#13131f',   // Card background
    surfaceAlt: '#1a1a2e',   // Hover/elevated surface
    border:     '#252538',   // Subtle border
    borderBright: '#2e2e50', // Focused border

    cyan:   '#00e5ff',       // Primary accent — slightly desaturated from #00f0ff
    pink:   '#f0006a',       // CTA / destructive — controlled
    yellow: '#f5c518',       // Highlights only — like IMDb gold
    green:  '#22c55e',       // Success / neon green toned down
    purple: '#7c3aed',       // Secondary — rarely used

    textPrimary:   '#f1f5f9',  // Main content text
    textSecondary: '#64748b',  // Metadata, captions
    textMuted:     '#374151',  // Disabled / placeholder
  },

  /** ── Spacing (px) ── */
  space: {
    xs:  4,
    sm:  8,
    md:  16,
    lg:  24,
    xl:  32,
    '2xl': 48,
    '3xl': 64,
    '4xl': 80,
    '5xl': 96,
    '6xl': 128,
  },

  /** ── Type sizes (rem) ── */
  fontSize: {
    xs:   '0.75rem',   // 12px — labels, captions
    sm:   '0.875rem',  // 14px — body small
    base: '1rem',      // 16px — body
    md:   '1.125rem',  // 18px — body large
    lg:   '1.375rem',  // 22px — subtitle
    xl:   '1.75rem',   // 28px — h3
    '2xl':'2.25rem',   // 36px — h2
    '3xl':'3rem',      // 48px — h1 section
    '4xl':'3.75rem',   // 60px — hero max
  },

  /** ── Border radius ── */
  radius: {
    sm:   '8px',
    md:   '12px',
    lg:   '16px',
    xl:   '20px',
    pill: '9999px',
  },
} as const;
