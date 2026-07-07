import { normalizeApiUrl } from "./api-url.mjs";

const DEFAULT_API_BASE_URL = "https://uhsocial.in/api";

export { normalizeApiUrl };

export function getApiUrl(path: string) {
  return normalizeApiUrl(
    process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL,
    path
  );
}
