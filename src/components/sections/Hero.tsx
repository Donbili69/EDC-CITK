import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config/site";
import { formatDate } from "@/lib/utils/format";

export function Hero() {
  return (
    <section className="grid-field border-b border-line">
      <div className="container-page flex min-h-[70vh] flex-col justify-center py-20 md:py-28">
        <p className="text-small text-ink-600">Est. {formatDate(siteConfig.established)} &middot; CITK</p>
        <h1 className="mt-4 max-w-[18ch] text-display-lg font-medium md:text-display-xl">
          Where student ideas become ventures.
        </h1>
        <p className="mt-5 max-w-prose text-body text-ink-600">
          The Entrepreneurship Development Club builds CITK&rsquo;s startup ecosystem &mdash;
          connecting students, mentors, and industry through events, initiatives, and a
          community that takes ideas seriously.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/events" variant="primary">
            Explore events
          </Button>
          <Button href="/connect" variant="secondary">
            Collaborate with us
          </Button>
        </div>
      </div>
    </section>
  );
}
