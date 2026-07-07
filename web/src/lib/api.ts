const DEFAULT_API_BASE_URL = "https://uhsocial.in/api";

export function normalizeApiUrl(baseUrl: string, path: string) {
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

export function getApiUrl(path: string) {
  return normalizeApiUrl(
    process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL,
    path
  );
}
