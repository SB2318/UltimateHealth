/**
 * Open-redirect payloads for `safeRedirectPath`, kept beside the tests so the
 * list is easy to extend when a new bypass shape turns up.
 *
 * Every hostile entry below was confirmed in a real browser: the backslash and
 * control-character shapes reached an off-site origin under a naive
 * `startsWith("/") && !startsWith("//")` check.
 */

/** Must all be rejected. */
export const HOSTILE_REDIRECTS = [
  { input: "//evil.example.com", why: "protocol-relative" },
  { input: "/\\evil.example.com", why: "backslash reads as a path separator" },
  { input: "/\\/evil.example.com", why: "backslash then slash" },
  { input: "/\t/evil.example.com", why: "tab is stripped during URL parsing" },
  { input: "/\n/evil.example.com", why: "newline is stripped during URL parsing" },
  { input: "/\r//evil.example.com", why: "carriage return is stripped" },
  { input: "https://evil.example.com", why: "absolute URL" },
  { input: "http:/\\evil.example.com", why: "scheme with backslashes" },
  { input: "/..//evil.example.com", why: "resolves to a protocol-relative path" },
  { input: "", why: "empty" },
  { input: null, why: "absent" },
];

/** Must all be preserved exactly. */
export const SAFE_REDIRECTS = [
  { input: "/en/articles", expected: "/en/articles" },
  { input: "/articles?page=2", expected: "/articles?page=2" },
  { input: "/articles?page=2#top", expected: "/articles?page=2#top" },
  { input: "/frontend/v2/en/medical-glossary", expected: "/frontend/v2/en/medical-glossary" },
];
