import React from "react";

interface SkeletonCardProps {
  /** Optional Tailwind classes applied to the card for sizing or layout overrides. */
  className?: string;
  /** When true, omits the thumbnail block to match compact card layouts. */
  compact?: boolean;
}

/**
 * Extends React.HTMLAttributes<HTMLDivElement> so that shadcn/ui consumers
 * (e.g. sidebar.tsx) can pass `style`, `data-*`, and other standard div props
 * without TypeScript errors.
 *
 * Rendering modes:
 * - **Card mode**: activated when `count > 1` or `variant === "compact"` —
 *   renders one or more full SkeletonCard articles (thumbnail + content rows).
 * - **Simple mode** (default when no card-specific props): renders a single
 *   animated div, compatible with the shadcn/ui Skeleton API.
 */
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of card skeletons to render (card mode). Defaults to 1. */
  count?: number;
  /**
   * Controls the card structure (card mode):
   * - "full" (default) — includes a thumbnail placeholder.
   * - "compact" — omits the thumbnail; activates card mode even when count === 1.
   */
  variant?: "full" | "compact";
}

function SkeletonCard({ className = "", compact = false }: SkeletonCardProps) {
  return (
    <article
      aria-hidden="true"
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden animate-pulse ${className}`}
    >
      {/* Thumbnail placeholder — omitted in compact variant */}
      {!compact && <div className="h-48 w-full bg-gray-200 dark:bg-gray-700" />}

      <div className="p-5 space-y-4">
        {/* Title placeholders — two lines */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Metadata row — author pill + date pill */}
        <div className="flex gap-3">
          <div className="h-3 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Content preview — three lines */}
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </article>
  );
}

function Skeleton({ count = 1, className, variant = "full", ...rest }: SkeletonProps) {
  // Card mode: render one or more SkeletonCard articles.
  // Triggered when multiple cards are requested OR the compact variant is used.
  if (count > 1 || variant === "compact") {
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          // Stable string key — replace with real data IDs when backed by fetched content
          <SkeletonCard
            key={`skeleton-card-${index}`}
            className={className}
            compact={variant === "compact"}
          />
        ))}
      </>
    );
  }

  // Simple mode (shadcn-compatible): a single animated div that forwards all
  // remaining HTML attributes (style, data-*, aria-*, etc.).
  // Used by generated UI components such as sidebar.tsx.
  return (
    <div
      aria-hidden="true"
      data-slot="skeleton"
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
      {...rest}
    />
  );
}

export { Skeleton };
