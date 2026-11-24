"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

// Next.js App Router convention: catches errors thrown while rendering a
// route segment (including failed data fetches once Phase 2's real API is
// wired in) so one broken page can't blank the whole site.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Phase 2: send this to an error-logging service instead of console.
    console.error(error);
  }, [error]);

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-start justify-center gap-4">
      <p className="text-small text-ink-600">Something went wrong</p>
      <h1 className="text-display-md font-medium">This page couldn&rsquo;t load.</h1>
      <p className="max-w-prose text-ink-600">
        Try again, or head back to the homepage if the problem continues.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset} variant="primary">
          Try again
        </Button>
        <Button href="/" variant="secondary">
          Back to home
        </Button>
      </div>
    </div>
  );
}
