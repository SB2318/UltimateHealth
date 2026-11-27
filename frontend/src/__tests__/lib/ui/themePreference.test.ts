import {
  resolveThemeMode,
  isValidThemePreference,
  getContrastRatio,
  HIGH_CONTRAST_COLORS,
  HIGH_CONTRAST_ARTICLE_COLORS,
  DEFAULT_THEME_PREFERENCE,
} from '@/src/lib/ui/themePreference';
import { generateArticleStyles } from '@/src/lib/ui/dyslexiaStyles';

describe('resolveThemeMode', () => {
  it('defaults to system, which follows the OS light scheme', () => {
    expect(DEFAULT_THEME_PREFERENCE).toBe('system');
    expect(resolveThemeMode('system', 'light')).toBe('light');
  });

  it('follows the OS dark scheme when set to system', () => {
    expect(resolveThemeMode('system', 'dark')).toBe('dark');
  });

  it('falls back to light when the OS scheme is unknown', () => {
    expect(resolveThemeMode('system', null)).toBe('light');
    expect(resolveThemeMode('system', undefined)).toBe('light');
    expect(resolveThemeMode('system', 'unspecified')).toBe('light');
  });

  it('pins light/dark regardless of the OS scheme', () => {
    expect(resolveThemeMode('light', 'dark')).toBe('light');
    expect(resolveThemeMode('dark', 'light')).toBe('dark');
  });

  it('pins high contrast regardless of the OS scheme', () => {
    expect(resolveThemeMode('high-contrast', 'light')).toBe('high-contrast');
    expect(resolveThemeMode('high-contrast', 'dark')).toBe('high-contrast');
  });
});

describe('isValidThemePreference', () => {
  it('accepts the four known preferences and rejects the rest', () => {
    expect(isValidThemePreference('system')).toBe(true);
    expect(isValidThemePreference('light')).toBe(true);
    expect(isValidThemePreference('dark')).toBe(true);
    expect(isValidThemePreference('high-contrast')).toBe(true);
    expect(isValidThemePreference('sepia')).toBe(false);
    expect(isValidThemePreference('')).toBe(false);
    expect(isValidThemePreference(null)).toBe(false);
    expect(isValidThemePreference(42)).toBe(false);
  });
});

describe('WCAG AAA contrast for the high-contrast palette (#2043)', () => {
  it('text, secondary text and accent are >= 7:1 on pitch black', () => {
    const bg = HIGH_CONTRAST_COLORS.background;
    expect(bg).toBe('#000000');
    for (const key of ['text', 'textSecondary', 'primary', 'link'] as const) {
      expect(getContrastRatio(HIGH_CONTRAST_COLORS[key], bg)).toBeGreaterThanOrEqual(7);
    }
  });

  it('every text-bearing article colour is >= 7:1 on pitch black', () => {
    const bg = HIGH_CONTRAST_ARTICLE_COLORS.background;
    for (const key of [
      'text',
      'textSecondary',
      'readabilityBadgeText',
      'scoreBadgeText',
      'approvedText',
      'needsImprovementText',
      'buttonText',
      'footerText',
      'ttsText',
    ] as const) {
      expect(
        getContrastRatio(HIGH_CONTRAST_ARTICLE_COLORS[key], bg),
      ).toBeGreaterThanOrEqual(7);
    }
  });

  it('documents why the blue primary is not reused: it fails AAA on black', () => {
    // #0F52BA is the light/dark theme primary; ~2.9:1 on #000000.
    expect(getContrastRatio('#0F52BA', '#000000')).toBeLessThan(7);
  });

  it('white on black is the maximum 21:1', () => {
    expect(getContrastRatio('#FFFFFF', '#000000')).toBeCloseTo(21, 0);
  });
});

describe('generateArticleStyles high contrast', () => {
  it('renders pitch-black background, white text and yellow links', () => {
    const css = generateArticleStyles(false, false, 16, true);
    expect(css).toContain('background-color: #000000');
    expect(css).toContain('color: #FFFFFF');
    expect(css).toContain('color: #FFD700');
  });

  it('is unchanged without the flag (light and dark paths intact)', () => {
    expect(generateArticleStyles(false, false, 16)).toContain(
      'background-color: #FFFFFF',
    );
    expect(generateArticleStyles(false, true, 16)).toContain(
      'background-color: #121212',
    );
  });
});
