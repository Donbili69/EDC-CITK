import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-start justify-center gap-4">
      <p className="text-small text-ink-600">404</p>
      <h1 className="text-display-md font-medium">That page doesn&rsquo;t exist.</h1>
      <p className="max-w-prose text-ink-600">
        The link might be outdated, or the content might have moved. Try the homepage.
      </p>
      <Button href="/" variant="primary">
        Back to home
      </Button>
    </div>
  );
}
