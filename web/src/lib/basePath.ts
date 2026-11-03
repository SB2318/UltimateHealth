/**
 * Get the basePath from environment variables
 * This is useful for apps deployed on a subdirectory like /web/
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Create a URL with the basePath prepended
 * Useful for internal navigation links and public static assets
 *
 * @param path - The path relative to the app root (e.g., "/contribute" or "/ap-asset/user-app-icon.png")
 * @returns The path with basePath prepended (e.g., "/web/contribute")
 */
export function withBasePath(path: string): string {
  if (!path) return path;

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
  // Determine effective basePath: from env variable, or auto-detect from browser location if running on /web
  const effectiveBasePath =
    BASE_PATH ||
    (typeof window !== "undefined" &&
    (window.location.pathname.startsWith("/web/") || window.location.pathname === "/web")
      ? "/web"
      : "");

  let clean = path;
  if (effectiveBasePath) {
    while (clean.startsWith(`${effectiveBasePath}${effectiveBasePath}`)) {
      clean = clean.slice(effectiveBasePath.length);
    }
    if (!clean.startsWith(effectiveBasePath)) {
      clean = `${effectiveBasePath}${clean.startsWith("/") ? clean : `/${clean}`}`;
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
