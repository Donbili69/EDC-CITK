// Next.js App Router convention: shown automatically while a page's async
// server component (e.g. page.tsx's data fetching) is in flight. Every
// route segment can have its own loading.tsx — add one inside app/events/
// once that page fetches real data with noticeable latency.
export default function Loading() {
  return (
    <div className="container-page py-24">
      <div className="h-6 w-40 animate-pulse bg-ink/10" />
      <div className="mt-4 h-10 w-80 max-w-full animate-pulse bg-ink/10" />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="h-48 animate-pulse bg-ink/5" />
        <div className="h-48 animate-pulse bg-ink/5" />
        <div className="h-48 animate-pulse bg-ink/5" />
      </div>
    </div>
  );
}
