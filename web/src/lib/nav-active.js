/**
 * Helpers for deciding which navigation entry is the one currently being viewed.
 *
 * An app route such as `/articles` is served behind two prefixes that never
 * appear in the `href` we hand to `<Link>`:
 *
 *   1. the deployment base path (`NEXT_PUBLIC_BASE_PATH`, e.g. `/frontend/v2`)
 *   2. the next-intl locale segment (e.g. `/en`)
 *
 * so `usePathname()` reports `/frontend/v2/en/articles`. Both are stripped
 * before comparing, which keeps the match correct in local development (no
 * base path, and often no locale segment yet) and in production alike.
 */

/**
 * Splits a URL path into its non-empty segments, ignoring query and hash.
 * @param {string} path
 * @returns {string[]}
 */
function toSegments(path) {
  return String(path ?? "")
    .split(/[?#]/)[0]
    .split("/")
    .filter(Boolean);
}

/**
 * Drops `prefix` from the front of `segments` when it is present.
 * @param {string[]} segments
 * @param {string[]} prefix
 * @returns {string[]}
 */
function stripPrefix(segments, prefix) {
  const hasPrefix = prefix.every((segment, index) => segments[index] === segment);
  return hasPrefix ? segments.slice(prefix.length) : segments;
}

/**
 * Whether `pathname` is `route` or one of its sub-routes, so the matching nav
 * item can be highlighted. Sub-routes count as active, which keeps "Read
 * Articles" highlighted while reading a single article (`/articles/<id>`).
 *
 * @param {string} pathname current location, e.g. from `usePathname()`
 * @param {string} route app-relative route, e.g. `/articles`
 * @param {{ basePath?: string, locales?: ReadonlyArray<string> }} [options]
 * @returns {boolean}
 */
export function isNavRouteActive(pathname, route, options = {}) {
  const { basePath = "", locales = [] } = options;
  const baseSegments = toSegments(basePath);

  const routeSegments = stripPrefix(toSegments(route), baseSegments);
  if (routeSegments.length === 0) return false;

  let pathSegments = stripPrefix(toSegments(pathname), baseSegments);
  if (pathSegments.length > 0 && locales.includes(pathSegments[0])) {
    pathSegments = pathSegments.slice(1);
  }

  return routeSegments.every((segment, index) => pathSegments[index] === segment);
}
