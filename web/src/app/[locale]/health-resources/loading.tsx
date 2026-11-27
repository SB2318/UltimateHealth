/**
 * Loading state for the health-resources directory: a fixed-height
 * skeleton so the page never shifts layout while the list is fetched.
 */
export default function HealthResourcesLoading() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="border-b border-slate-200 bg-white px-4 pb-10 pt-28 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto h-7 w-56 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="mx-auto mt-4 h-11 w-96 max-w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="min-h-[220px] animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>
    </main>
  );
}
