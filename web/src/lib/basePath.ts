/**
 * Get the basePath from environment variables
 * This is useful for apps deployed on a subdirectory like /frontend/v2/
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Create a URL with the basePath prepended
 * Useful for internal navigation links
 *
 * @param path - The path relative to the app root (e.g., "/contribute")
 * @returns The path with basePath prepended (e.g., "/frontend/v2/contribute")
 */
export function withBasePath(path: string): string {
  // Don't modify external URLs (http://, https://, mailto:, etc.)
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("mailto:") || path.startsWith("tel:")) {
    return path;
  }

  // Don't modify hash-only links
  if (path.startsWith("#")) {
    return path;
  }

  // Prepend basePath to internal paths
  if (BASE_PATH && !path.startsWith(BASE_PATH)) {
    return `${BASE_PATH}${path}`;
  }

  return path;
}
