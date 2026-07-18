/**
 * Build a consistent API URL from a configured base URL and request path.
 *
 * @param {string} baseUrl
 * @param {string} path
 */
export function normalizeApiUrl(baseUrl, path) {
  const normalizedBaseUrl = baseUrl.trim().replace(/\/+$/, "");
  const apiBaseUrl = normalizedBaseUrl.endsWith("/api")
    ? normalizedBaseUrl
    : `${normalizedBaseUrl}/api`;
  const normalizedPath = path
    .trim()
    .replace(/^\/+/, "")
    .replace(/^api(?:\/+|$)/, "");

  return normalizedPath ? `${apiBaseUrl}/${normalizedPath}` : apiBaseUrl;
}
