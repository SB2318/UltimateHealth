/**
 * Unified Typography scale for Article Authoring & Studio screens
 * Keeps headers, subheaders, body text, badges, and controls consistent and maintainable.
 */
export const EDITOR_TYPOGRAPHY = {
  // Headings
  h1: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '700' as const,
  },
  h2: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '700' as const,
  },
  h3: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600' as const,
  },

  // Titles & Section headers
  screenTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700' as const,
  },
  sectionTitle: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '700' as const,
  },
  sectionSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
  },

  // Navigation & Tabs
  tabLabel: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600' as const,
  },

  // Body & Inputs
  body: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '400' as const,
  },
  bodyLarge: {
    fontSize: 17,
    lineHeight: 26,
    fontWeight: '500' as const,
  },
  input: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400' as const,
  },
  code: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400' as const,
  },

  // Secondary, Badges & Micro-copy
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600' as const,
  },
  badge: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700' as const,
  },
  button: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700' as const,
  },
  buttonSmall: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700' as const,
  },
};
