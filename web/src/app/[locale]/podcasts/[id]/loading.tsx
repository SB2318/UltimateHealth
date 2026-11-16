export default function PodcastDetailLoading() {
  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Back button skeleton */}
      <div className="w-36 h-6 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse mb-6" />

      {/* Main console card skeleton */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-pulse">
        {/* Cover */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="aspect-square w-full max-w-[320px] rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* Content */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex gap-2">
            <div className="w-24 h-6 rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="w-20 h-6 rounded-full bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="w-4/5 h-10 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="w-2/3 h-10 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="w-1/2 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 mt-4" />
          <div className="w-full h-24 rounded-2xl bg-slate-200 dark:bg-slate-800 mt-6" />
        </div>
      </div>
    </div>
  );
}
