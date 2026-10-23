/**
 * Get the basePath from environment variables
 * This is useful for apps deployed on a subdirectory like /web/
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Create a URL with the basePath prepended
 * Useful for internal navigation links
 *
 * @param path - The path relative to the app root (e.g., "/contribute")
 * @returns The path with basePath prepended (e.g., "/web/contribute")
 */
export function withBasePath(path: string): string {
  // Don't modify external URLs (http://, https://, mailto:, etc.)
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:")
  ) {
    return path;
  }

  // Don't modify hash-only links
  if (path.startsWith("#")) {
    return path;
  }

  // Prepend basePath to internal paths and collapse any duplicate basePaths
  let clean = path;
  if (BASE_PATH) {
    while (clean.startsWith(`${BASE_PATH}${BASE_PATH}`)) {
      clean = clean.slice(BASE_PATH.length);
    }
    if (!clean.startsWith(BASE_PATH)) {
      clean = `${BASE_PATH}${clean}`;
    }
  }

  return clean;
}

/**
 * Strips the basePath from an internal path if present
 */
export function stripBasePath(path: string): string {
  if (BASE_PATH && path.startsWith(BASE_PATH)) {
    return path.slice(BASE_PATH.length) || "/";
  }
  return path;
}
