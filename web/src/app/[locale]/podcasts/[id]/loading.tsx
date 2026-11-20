export default function PodcastDetailLoading() {
  const S = ({ className }: { className: string }) => (
    <div className={`animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700 ${className}`} />
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* ── Sticky header skeleton — matches real 60px header ── */}
      <div className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm h-[60px]">
        <div className="max-w-[860px] mx-auto px-4 h-full flex items-center justify-between gap-3">
          <S className="h-[42px] w-36 rounded-xl flex-shrink-0" />
          <S className="h-5 flex-1 max-w-[460px]" />
          <S className="h-10 w-20 rounded-xl flex-shrink-0" />
        </div>
      </div>

      {/* ── Page content — matches real maxWidth 860px, padding 40px 24px 80px ── */}
      <div className="max-w-[860px] mx-auto px-6 pt-10 pb-20">

        {/* ── Main Audio Console Card ── */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[20px] shadow-sm overflow-hidden mb-8">

          {/* Cover + Info row — matches real: grid "auto 1fr", cover 220px fixed */}
          <div className="grid" style={{ gridTemplateColumns: "220px 1fr" }}>

            {/* Cover art */}
            <div className="animate-pulse bg-slate-200 dark:bg-slate-700 w-[220px] min-h-[220px]" />

            {/* Info panel — matches real padding 28px 28px 20px */}
            <div className="p-7 flex flex-col gap-3 min-w-0">
              {/* Badge pills */}
              <div className="flex gap-2 flex-wrap">
                <S className="h-6 w-24 rounded-full" />
                <S className="h-6 w-20 rounded-full" />
                <S className="h-6 w-24 rounded-full" />
              </div>

              {/* Title */}
              <S className="h-8 w-[85%]" />
              <S className="h-8 w-3/5" />

              {/* Author row */}
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <S className="h-9 w-9 rounded-full flex-shrink-0" />
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <S className="h-3.5 w-28" />
                  <S className="h-3 w-20" />
                </div>
                <S className="h-3 w-20 flex-shrink-0" />
              </div>
            </div>
          </div>

          {/* ── Audio player — matches real: borderTop, padding 20px 28px 24px, bg explorer-bg ── */}
          <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-7 pt-5 pb-6 flex flex-col gap-3">
            {/* Progress bar */}
            <S className="h-1.5 w-full rounded-full" />
            {/* Time labels */}
            <div className="flex justify-between">
              <S className="h-3 w-10" />
              <S className="h-3 w-10" />
            </div>
            {/* Controls row */}
            <div className="flex items-center justify-between gap-3 mt-1">
              <S className="h-9 w-9 rounded-full" />
              <S className="h-14 w-14 rounded-full" />
              <S className="h-9 w-9 rounded-full" />
              <S className="h-8 w-16 rounded-lg" />
              <S className="h-1.5 w-24 rounded-full" />
              <div className="flex gap-2">
                <S className="h-9 w-9 rounded-xl" />
                <S className="h-9 w-9 rounded-xl" />
                <S className="h-9 w-9 rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Description / notes card ── */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-7 mb-8 flex flex-col gap-3">
          <S className="h-5 w-40" />
          {[100, 90, 80, 95, 70].map((w, i) => (
            <S key={i} className={`h-3.5 w-[${w}%]`} style={{ width: `${w}%` } as any} />
          ))}
        </div>

        {/* ── Related podcasts ── */}
        <S className="h-6 w-44 mb-5" />
        <div className="grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
          {[1, 2, 3].map((i) => (
            <div key={i}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              <div className="animate-pulse bg-slate-200 dark:bg-slate-700" style={{ aspectRatio: "16/9" }} />
              <div className="p-4 flex flex-col gap-2">
                <S className="h-3 w-1/2" />
                <S className="h-4 w-4/5" />
                <S className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
