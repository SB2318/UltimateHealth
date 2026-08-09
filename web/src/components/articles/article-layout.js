/** Height of the sticky article navigation bar (px). */
export const ARTICLE_STICKY_HEADER_HEIGHT_PX = 85;

/**
 * Bottom inset for the TOC IntersectionObserver active zone, as a percentage
 * of the viewport height. A smaller value yields a taller active zone so headings
 * must scroll further into view before becoming active.
 */
export const ARTICLE_TOC_OBSERVER_BOTTOM_MARGIN_PERCENT = 25;

/** Minimum visible ratio before a heading is marked active in the TOC. */
export const ARTICLE_TOC_INTERSECTION_THRESHOLD = 0.5;

/**
 * Builds the IntersectionObserver rootMargin string for TOC active-state tracking.
 * Top margin excludes the sticky header; bottom margin shrinks the root so the
 * "current section" band sits below the header rather than spanning the full viewport.
 * @param {number} [headerHeightPx]
 * @param {number} [bottomMarginPercent]
 */
export function getArticleTocObserverRootMargin(
  headerHeightPx = ARTICLE_STICKY_HEADER_HEIGHT_PX,
  bottomMarginPercent = ARTICLE_TOC_OBSERVER_BOTTOM_MARGIN_PERCENT,
) {
  return `-${headerHeightPx}px 0px -${bottomMarginPercent}% 0px`;
}

/**
 * Computes the document Y coordinate to scroll to for a heading anchor.
 * @param {number} elementTop
 * @param {number} scrollY
 * @param {number} [headerHeightPx]
 */
export function getArticleScrollTargetY(
  elementTop,
  scrollY,
  headerHeightPx = ARTICLE_STICKY_HEADER_HEIGHT_PX,
) {
  return elementTop + scrollY - headerHeightPx;
}

/**
 * Returns h2/h3 heading blocks suitable for the table of contents.
 * @param {import("@/types/article").ContentBlock[]} blocks
 * @returns {import("@/types/article").HeadingBlock[]}
 */
export function extractTocHeadings(blocks) {
  return blocks.filter(
    (block) =>
      block.type === "heading" && (block.level === 2 || block.level === 3),
  );
}
