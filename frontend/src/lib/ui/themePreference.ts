/**
 * Theme preference model for UltimateHealth.
 *
 * Data model (mirrors the dark-mode-toggle guidance: system default, explicit
 * override stored, control lives in Settings): 'system' follows the OS colour
 * scheme; 'light' / 'dark' pin a scheme; 'high-contrast' is the WCAG AAA
 * tier from issue #2043 — true pitch-black backgrounds, white text and
 * high-visibility yellow accents, for low-vision users.
 */

export type ThemePreference = 'system' | 'light' | 'dark' | 'high-contrast';

export type ResolvedTheme = 'light' | 'dark' | 'high-contrast';

export const THEME_PREFERENCES: readonly ThemePreference[] = [
  'system',
  'light',
  'dark',
  'high-contrast',
] as const;

export const DEFAULT_THEME_PREFERENCE: ThemePreference = 'system';

export function isValidThemePreference(
  value: unknown,
): value is ThemePreference {
  return (
    typeof value === 'string' &&
    (THEME_PREFERENCES as readonly string[]).includes(value)
  );
}

/**
 * Pure resolution: explicit preference wins; 'system' follows the OS scheme
 * (null/undefined system scheme falls back to light, matching
 * useColorScheme's behaviour of returning null when unknown).
 */
export function resolveThemeMode(
  preference: ThemePreference,
  systemScheme: 'light' | 'dark' | 'unspecified' | null | undefined,
): ResolvedTheme {
  if (preference !== 'system') {
    return preference;
  }
  return systemScheme === 'dark' ? 'dark' : 'light';
}

/**
 * WCAG AAA high-contrast palette. Every text colour below is verified
 * against #000000 in themePreference.test.ts (AAA needs >= 7:1 for
 * normal text). The blue primary used by the light/dark themes (#0F52BA)
 * is ~2.9:1 on black, so the accent is high-visibility yellow instead.
 */
export const HIGH_CONTRAST_COLORS = {
  background: '#000000',
  surface: '#000000',
  card: '#000000',
  text: '#FFFFFF',
  textSecondary: '#E5E5E5',
  border: '#FFFFFF',
  primary: '#FFD700',
  link: '#FFD700',
  onPrimary: '#000000',
} as const;

/**
 * Article reader overrides for high contrast, keyed exactly like
 * ArticleScreen's `themeColors` palette — spread over the light/dark
 * palette when the resolved theme is high contrast. Text-bearing pairs
 * are verified against #000000 in themePreference.test.ts (AAA >= 7:1).
 */
export const HIGH_CONTRAST_ARTICLE_COLORS = {
  background: '#000000',
  card: '#000000',
  border: '#FFFFFF',
  text: '#FFFFFF',
  textSecondary: '#E5E5E5',
  iconBackground: '#000000',
  floatingButtonBg: 'rgba(0, 0, 0, 0.88)',
  readabilityBadgeBg: '#000000',
  readabilityBadgeText: '#FFD700',
  scoreBadgeBg: '#000000',
  scoreBadgeText: '#FFD700',
  approvedBg: '#000000',
  approvedText: '#FFFFFF',
  needsImprovementBg: '#000000',
  needsImprovementText: '#FFD700',
  buttonBorder: '#FFFFFF',
  buttonBg: '#000000',
  buttonText: '#FFFFFF',
  avatarBorder: '#000000',
  avatarBg: '#000000',
  footerBackground: '#000000',
  footerBorder: '#FFFFFF',
  footerPillBackground: '#000000',
  // Active pill stays black; its label is yellow (footerColors.activeText),
  // because the default blue label would be unreadable on a yellow pill.
  footerActivePillBackground: '#000000',
  footerText: '#FFFFFF',
  ttsBg: '#000000',
  ttsBorder: '#FFFFFF',
  ttsText: '#FFFFFF',
} as const;

// --- WCAG contrast-ratio helpers (relative luminance, WCAG 2.x) ---

function relativeLuminance(hex: string): number {
  const channels = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
  const linear = channels.map(c =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4),
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

/** WCAG contrast ratio between two hex colours (1–21). */
export function getContrastRatio(foreground: string, background: string): number {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}
