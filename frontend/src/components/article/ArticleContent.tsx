import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import AutoHeightWebView from '@brown-bear/react-native-autoheight-webview';
import { handleExternalClick } from '../../helper/Utils';
import type { ArticleContentProps } from './types';

const BASE_FONT_SIZE = 16;

/**
 * buildContentCSS
 *
 * Generates a rich CSS string injected into the WebView so the article HTML
 * looks great without any pre-processing.
 *
 * Callout classes supported out-of-the-box (no JavaScript needed):
 *   .tip / .callout-tip / .health-tip  → green left-border + 💡 prefix
 *   .warning / .callout-warning        → amber left-border + ⚠️ prefix
 *   .note / .callout-note              → blue left-border + 📝 prefix
 *   .important / .callout-info         → purple left-border
 *   .glossary-term                     → dashed underline (future: tap → definition)
 *
 * Future glossary hook: Add a `window.postMessage` listener that calls
 * `highlightTerm()` from GlossaryProvider when a .glossary-term is tapped.
 */
const buildContentCSS = (fontSize: number, isDark: boolean): string => {
  const text = isDark ? '#E5E7EB' : '#1F2937';
  const heading = isDark ? '#F9FAFB' : '#111827';
  const h4 = isDark ? '#D1D5DB' : '#374151';
  const divider = isDark ? '#374151' : '#E5E7EB';
  const caption = isDark ? '#9CA3AF' : '#6B7280';
  const quoteText = isDark ? '#9CA3AF' : '#4B5563';
  const quoteBar = '#00BFFF';
  const quoteBg = isDark ? 'rgba(0,191,255,0.08)' : 'rgba(0,191,255,0.05)';
  const tipBg = isDark ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.07)';
  const warnBg = isDark ? 'rgba(245,158,11,0.12)' : 'rgba(245,158,11,0.07)';
  const noteBg = isDark ? 'rgba(59,130,246,0.12)' : 'rgba(59,130,246,0.06)';
  const impBg = isDark ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.06)';
  const codeBg = isDark ? '#1F2937' : '#F3F4F6';
  const tableBorder = isDark ? '#374151' : '#E5E7EB';
  const tableHead = isDark ? '#1F2937' : '#F3F4F6';
  const tableEven = isDark ? '#111827' : '#F9FAFB';
  const linkColor = '#00BFFF';

  return `
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

    body {
      font-family: -apple-system, 'Helvetica Neue', sans-serif;
      font-size: ${fontSize}px;
      line-height: 1.78;
      color: ${text};
      background: transparent;
      margin: 0;
      padding: 0 0 8px 0;
      word-wrap: break-word;
      -webkit-text-size-adjust: 100%;
    }

    /* ── Headings ─────────────────────────────────────────── */
    h1, h2, h3, h4, h5, h6 {
      font-weight: 700;
      margin-top: 1.6em;
      margin-bottom: 0.5em;
      line-height: 1.3;
      color: ${heading};
    }
    h1 { font-size: 2em; }
    h2 {
      font-size: 1.5em;
      border-bottom: 1px solid ${divider};
      padding-bottom: 0.3em;
    }
    h3 { font-size: 1.25em; }
    h4 { font-size: 1.05em; color: ${h4}; }
    h5, h6 { font-size: 1em; }

    /* ── Body text ────────────────────────────────────────── */
    p { margin-top: 0; margin-bottom: 1.15em; }
    strong, b { font-weight: 700; }
    em, i { font-style: italic; }
    u { text-decoration: underline; }
    s, del { text-decoration: line-through; }
    small { font-size: 0.85em; }
    sub { vertical-align: sub; font-size: 0.75em; }
    sup { vertical-align: super; font-size: 0.75em; }

    /* ── Links ────────────────────────────────────────────── */
    a {
      color: ${linkColor};
      text-decoration: none;
    }
    a:hover { text-decoration: underline; }
    /* External link indicator */
    a[href^="http"]::after {
      content: " ↗";
      font-size: 0.8em;
      opacity: 0.7;
    }
    /* Internal link — no indicator */
    a[href^="/"]::after { content: ""; }

    /* ── Lists ────────────────────────────────────────────── */
    ul, ol {
      padding-left: 1.6em;
      margin-top: 0;
      margin-bottom: 1.15em;
    }
    li { margin-bottom: 0.45em; }
    li > ul, li > ol { margin-bottom: 0; margin-top: 0.3em; }

    /* ── Media ────────────────────────────────────────────── */
    img {
      max-width: 100%;
      height: auto;
      border-radius: 10px;
      display: block;
      margin: 1.2em auto;
    }
    figure { margin: 1.4em 0; }
    figcaption {
      text-align: center;
      font-size: 0.85em;
      color: ${caption};
      margin-top: 6px;
      font-style: italic;
    }
    video, iframe {
      max-width: 100%;
      height: auto;
      border-radius: 10px;
      display: block;
      margin: 1.2em auto;
    }

    /* ── Blockquote ────────────────────────────────────────── */
    blockquote {
      border-left: 4px solid ${quoteBar};
      margin: 1.8em 0;
      padding: 0.8em 1.2em;
      background: ${quoteBg};
      border-radius: 0 10px 10px 0;
      font-style: italic;
      color: ${quoteText};
    }
    blockquote p { margin-bottom: 0; }
    blockquote cite {
      display: block;
      margin-top: 0.6em;
      font-size: 0.88em;
      font-style: normal;
      opacity: 0.75;
    }

    /* ── Callout: Health Tip ──────────────────────────────── */
    .tip, .callout-tip, .health-tip {
      background: ${tipBg};
      border: 1px solid rgba(16,185,129,0.3);
      border-left: 4px solid #10B981;
      border-radius: 0 10px 10px 0;
      padding: 12px 16px 12px 16px;
      margin: 1.6em 0;
    }
    .tip::before, .health-tip::before {
      content: "💡  Health Tip";
      display: block;
      font-weight: 700;
      font-size: 0.88em;
      color: #10B981;
      margin-bottom: 6px;
      font-style: normal;
      letter-spacing: 0.2px;
    }
    .callout-tip::before {
      content: "💡  Tip";
      display: block;
      font-weight: 700;
      font-size: 0.88em;
      color: #10B981;
      margin-bottom: 6px;
    }

    /* ── Callout: Warning ─────────────────────────────────── */
    .warning, .callout-warning {
      background: ${warnBg};
      border: 1px solid rgba(245,158,11,0.3);
      border-left: 4px solid #F59E0B;
      border-radius: 0 10px 10px 0;
      padding: 12px 16px;
      margin: 1.6em 0;
    }
    .warning::before, .callout-warning::before {
      content: "⚠️  Warning";
      display: block;
      font-weight: 700;
      font-size: 0.88em;
      color: #D97706;
      margin-bottom: 6px;
    }

    /* ── Callout: Note ────────────────────────────────────── */
    .note, .callout-note {
      background: ${noteBg};
      border: 1px solid rgba(59,130,246,0.3);
      border-left: 4px solid #3B82F6;
      border-radius: 0 10px 10px 0;
      padding: 12px 16px;
      margin: 1.6em 0;
    }
    .note::before, .callout-note::before {
      content: "📝  Note";
      display: block;
      font-weight: 700;
      font-size: 0.88em;
      color: #3B82F6;
      margin-bottom: 6px;
    }

    /* ── Callout: Important ───────────────────────────────── */
    .important, .callout-info {
      background: ${impBg};
      border: 1px solid rgba(139,92,246,0.3);
      border-left: 4px solid #8B5CF6;
      border-radius: 0 10px 10px 0;
      padding: 12px 16px;
      margin: 1.6em 0;
    }
    .important::before {
      content: "📌  Important";
      display: block;
      font-weight: 700;
      font-size: 0.88em;
      color: #8B5CF6;
      margin-bottom: 6px;
    }

    /* ── Glossary term — future interactive highlighting ──── */
    .glossary-term {
      border-bottom: 1.5px dashed #00BFFF;
      cursor: pointer;
      color: inherit;
      padding-bottom: 1px;
    }

    /* ── Code ─────────────────────────────────────────────── */
    code {
      font-family: 'Courier New', Courier, monospace;
      font-size: 0.9em;
      background: ${codeBg};
      padding: 2px 6px;
      border-radius: 4px;
    }
    pre {
      background: ${codeBg};
      padding: 14px 16px;
      border-radius: 10px;
      overflow-x: auto;
      margin: 1.4em 0;
    }
    pre code {
      background: transparent;
      padding: 0;
      font-size: 0.88em;
    }

    /* ── Table ────────────────────────────────────────────── */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5em 0;
      font-size: 0.92em;
    }
    th, td {
      border: 1px solid ${tableBorder};
      padding: 8px 12px;
      text-align: left;
    }
    th {
      background: ${tableHead};
      font-weight: 700;
    }
    tr:nth-child(even) td { background: ${tableEven}; }

    /* ── Horizontal rule ──────────────────────────────────── */
    hr {
      border: none;
      border-top: 1px solid ${divider};
      margin: 2em 0;
    }
  `;
};

export const ArticleContent = ({
  htmlContent,
  fontScale = 1,
  isDarkMode = false,
}: ArticleContentProps) => {
  const fontSize = BASE_FONT_SIZE * fontScale;

  const customStyle = useMemo(
    () => buildContentCSS(fontSize, isDarkMode),
    [fontSize, isDarkMode],
  );

  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel="Article body"
      accessibilityRole="none"
    >
      <AutoHeightWebView
        style={styles.webView}
        customStyle={customStyle}
        originWhitelist={['*']}
        source={{ html: htmlContent || '<p>Content unavailable.</p>' }}
        scalesPageToFit={false}
        viewportContent="width=device-width, user-scalable=no"
        onShouldStartLoadWithRequest={handleExternalClick}
        // Prevent over-scroll bounce from interfering with parent ScrollView
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    // Max content width for comfortable long-form reading (mirrors 700-800 px web guidance)
    // On narrow phones the full width is used; on tablets this keeps lines short.
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  webView: {
    width: '100%',
    margin: 0,
    padding: 0,
  },
});
