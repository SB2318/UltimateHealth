export default function PodcastsLoading() {
  // Shimmer block shorthand
  const S = ({ className }: { className: string }) => (
    <div className={`animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700 ${className}`} />
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* ── Hero skeleton — matches real: paddingTop 130px ── */}
      <section className="border-b border-slate-200 dark:border-slate-800 pb-20"
        style={{ paddingTop: "130px" }}>
        <div className="max-w-[840px] mx-auto px-6 flex flex-col items-center">

          {/* Badge pill */}
          <S className="h-7 w-48 rounded-full mb-5" />

          {/* H1 two lines */}
          <S className="h-12 w-3/4 mb-3" />
          <S className="h-12 w-1/2 mb-6" />

          {/* Subtitle */}
          <S className="h-5 w-full max-w-[520px] mb-2" />
          <S className="h-5 w-4/5 max-w-[420px] mb-9" />

          {/* Trust pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-9">
            {[100, 140, 118].map((w, i) => (
              <div key={i}
                className="animate-pulse rounded-full bg-slate-200 dark:bg-slate-700 h-8"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>

          {/* Search bar */}
          <div className="animate-pulse rounded-full bg-slate-200 dark:bg-slate-700 h-13 w-full max-w-[640px]"
            style={{ height: "52px" }} />
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="max-w-[1280px] mx-auto px-6 pt-12 pb-20">

        {/* Tabs + Sort row */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <S className="h-11 w-60 rounded-2xl" />
          <S className="h-10 w-40 rounded-xl" />
        </div>

        {/* Filter bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 mb-7 flex flex-col gap-3">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {[80, 110, 90, 130, 100, 110, 85, 120].map((w, i) => (
              <div key={i}
                className="animate-pulse rounded-full bg-slate-200 dark:bg-slate-700 h-8"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
          {/* Language pills */}
          <div className="flex flex-wrap gap-2">
            {[110, 80, 75, 70, 70].map((w, i) => (
              <div key={i}
                className="animate-pulse rounded-full bg-slate-200 dark:bg-slate-700 h-8"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
        </div>

        {/* Results header */}
        <div className="flex items-center gap-3 mb-6">
          <S className="h-8 w-72" />
          <S className="h-6 w-20 rounded-full" />
        </div>

        {/* Podcast card grid — matches real: auto-fill minmax(320px, 1fr) */}
        <div className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              {/* Cover 16/9 */}
              <div className="animate-pulse bg-slate-200 dark:bg-slate-700" style={{ aspectRatio: "16/9" }} />
              <div className="p-5 flex flex-col gap-2.5">
                <S className="h-3.5 w-3/5" />
                <S className="h-5 w-4/5" />
                <S className="h-3.5 w-full" />
                <S className="h-3.5 w-3/4" />
                <div className="flex gap-2 mt-1">
                  <S className="h-6 w-20 rounded-full" />
                  <S className="h-6 w-24 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
