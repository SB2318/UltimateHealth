/**
 * Streaming skeleton for /articles/[id] route.
 * Shown immediately when navigating to an article while the server
 * fetches article data and HTML content.
 * Matches ArticlePageClient layout 1:1 to guarantee zero layout shift.
 */
export default function ArticleDetailLoading() {
  return (
    <div className="min-h-screen w-full bg-[#f8fafc] dark:bg-[#0c0c14] text-slate-800 dark:text-[#f1f5f9] flex flex-col">
      {/* ── Sticky top navigation bar skeleton (identical height and alignment) ── */}
      <div className="sticky top-0 z-50 w-full bg-white dark:bg-[#0c0c14] border-b border-slate-200 dark:border-[#252538] shadow-xs dark:shadow-md">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Back button skeleton */}
          <div className="w-24 h-9 rounded-xl bg-slate-200 dark:bg-slate-800/80 animate-pulse" />
          {/* Right controls skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-20 h-8 rounded-lg bg-slate-200 dark:bg-slate-800/80 animate-pulse" />
            <div className="w-16 h-8 rounded-lg bg-slate-200 dark:bg-slate-800/80 animate-pulse" />
            <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800/80 animate-pulse" />
          </div>
        </div>
      </div>

      {/* ── Hero section skeleton (identical top spacing and column width) ── */}
      <div className="w-full max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 text-center">
        {/* Category badge skeleton */}
        <div className="inline-block w-32 h-6 rounded-full bg-teal-100 dark:bg-teal-950/60 animate-pulse mb-4 mx-auto" />

        {/* Title skeleton */}
        <div className="w-4/5 h-10 sm:h-12 rounded-lg bg-slate-200 dark:bg-slate-800/80 animate-pulse mx-auto mb-3" />
        <div className="w-3/5 h-10 sm:h-12 rounded-lg bg-slate-200 dark:bg-slate-800/80 animate-pulse mx-auto mb-4" />

        {/* Meta row skeleton */}
        <div className="flex items-center justify-center gap-4 mt-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800/80 animate-pulse" />
          <div className="w-32 h-4 rounded bg-slate-200 dark:bg-slate-800/80 animate-pulse" />
          <div className="w-24 h-4 rounded bg-slate-200 dark:bg-slate-800/80 animate-pulse" />
        </div>

        {/* Listen CTA skeleton */}
        <div className="w-44 h-10 rounded-full bg-slate-200 dark:bg-slate-800/80 animate-pulse mx-auto mb-6" />

        {/* Hero image skeleton */}
        <div className="w-full aspect-[16/9] md:aspect-[21/9] max-h-[460px] rounded-2xl bg-slate-200 dark:bg-slate-800/80 animate-pulse mb-8" />

        {/* Body content skeleton */}
        <div className="space-y-3 pb-24 text-left">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-4 rounded bg-slate-200 dark:bg-slate-800/80 animate-pulse"
              style={{ width: i % 4 === 3 ? "60%" : "100%" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
