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
        <div className="w-full max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Back button skeleton (with matching ArrowArticle width & +10 height) */}
          <div className="flex-shrink-0 flex items-center ml-1 sm:ml-3">
            <div className="w-[124px] sm:w-[140px] h-[46px] rounded-xl uh-shimmer" />
          </div>
          {/* Right controls skeleton */}
          <div className="flex items-center gap-2 mr-1 sm:mr-3">
            <div className="w-[88px] h-8 rounded-lg uh-shimmer" />
            <div className="w-16 h-8 rounded-lg uh-shimmer" />
            <div className="w-8 h-8 rounded-lg uh-shimmer" />
          </div>
        </div>
      </div>

      {/* ── Hero section skeleton (centered horizontally in reading column) ── */}
      <div className="w-full max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 text-center flex flex-col items-center justify-center">
        {/* Category badge skeleton */}
        <div className="w-32 h-6 rounded-full uh-shimmer mb-4 mx-auto self-center" />

        {/* Title skeleton */}
        <div className="w-4/5 h-10 sm:h-12 rounded-lg uh-shimmer mx-auto self-center mb-3" />
        <div className="w-3/5 h-10 sm:h-12 rounded-lg uh-shimmer mx-auto self-center mb-4" />

        {/* Meta row skeleton */}
        <div className="flex items-center justify-center gap-4 mt-2 mb-4 mx-auto self-center">
          <div className="w-10 h-10 rounded-full uh-shimmer" />
          <div className="w-32 h-4 rounded uh-shimmer" />
          <div className="w-24 h-4 rounded uh-shimmer" />
        </div>

        {/* Listen CTA skeleton (matching updated width & rounded-xl) */}
        <div className="w-[185px] h-10 rounded-xl uh-shimmer mx-auto self-center mb-6" />

        {/* Hero image skeleton */}
        <div className="w-full aspect-[16/9] md:aspect-[21/9] max-h-[460px] rounded-2xl uh-shimmer mx-auto mb-8" />

        {/* Body content skeleton (Strictly centered in middle of column) */}
        <div className="w-full max-w-[680px] mx-auto space-y-4 pt-2 pb-24 flex flex-col items-center justify-center text-center">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="h-4 rounded-full uh-shimmer mx-auto self-center"
              style={{
                width: i % 4 === 0 ? "100%" : i % 4 === 1 ? "82%" : i % 4 === 2 ? "92%" : "68%",
                margin: "0 auto",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
