interface SkeletonCardProps {
  className?: string;
  /** When true, omits the thumbnail block to match compact card layouts. */
  compact?: boolean;
}

interface SkeletonProps {
  /** Number of card skeletons to render. Defaults to 1. */
  count?: number;
  /** Optional Tailwind classes applied to each card for sizing or layout overrides. */
  className?: string;
  /**
   * Use "compact" for cards that have no image (e.g. feature highlight cards).
   * Defaults to "full" which includes a thumbnail placeholder.
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

function Skeleton({ count = 1, className, variant = "full" }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        // Stable string key — replace with real data IDs when integrating with actual fetched content
        <SkeletonCard
          key={`skeleton-card-${index}`}
          className={className}
          compact={variant === "compact"}
        />
      ))}
    </>
  );
}

export { Skeleton };
