import { cn } from "@/lib/utils";
import React from "react";

interface SkeletonCardProps {
  /** Optional Tailwind classes applied to the card for sizing or layout overrides. */
  className?: string;
  /** When true, omits the thumbnail block to match compact card layouts. */
  compact?: boolean;
}

/**
 * Extends React.ComponentProps<"div"> so that shadcn/ui consumers
 * (e.g. sidebar.tsx) can pass `style`, `data-*`, and other standard div props
 * without TypeScript errors.
 *
 * Rendering modes:
 * - **Card mode**: activated when `count` or `variant` is provided —
 *   renders one or more full SkeletonCard articles (thumbnail + content rows).
 * - **Simple mode** (default when no card-specific props): renders a single
 *   animated div, compatible with the shadcn/ui Skeleton API.
 */
interface SkeletonProps extends React.ComponentProps<"div"> {
  /** Number of card skeletons to render. If provided, renders SkeletonCard. */
  count?: number;
  /**
   * Controls the card structure:
   * - "full" — includes a thumbnail placeholder, suited for article/content cards.
   * - "compact" — omits the thumbnail, suited for smaller feature cards.
   * If not provided and count is also not provided, renders a generic skeleton div.
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

function Skeleton({ count, className, variant, ...props }: SkeletonProps) {
  if (variant || count !== undefined) {
    return (
      <>
        {Array.from({ length: count ?? 1 }).map((_, index) => (
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
  return (
    <div
      aria-hidden="true"
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-gray-200 dark:bg-gray-700", className)}
      {...props}
    />
  );
}

export { Skeleton };
