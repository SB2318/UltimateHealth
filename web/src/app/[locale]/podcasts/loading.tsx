export default function PodcastsLoading() {
  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero skeleton */}
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center animate-pulse mb-12">
        <div className="w-48 h-6 rounded-full bg-slate-200 dark:bg-slate-800 mb-6" />
        <div className="w-3/4 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 mb-4" />
        <div className="w-full h-16 rounded-xl bg-slate-200 dark:bg-slate-800 mb-8" />
        <div className="w-full max-w-xl h-12 rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4"
          >
            <div className="aspect-[16/10] bg-slate-200 dark:bg-slate-800 rounded-xl mb-4" />
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-2" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full mb-4" />
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
