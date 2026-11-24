import type { EventSummary } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { EventCard } from "@/components/sections/EventCard";

export function UpcomingEvents({ events }: { events: EventSummary[] }) {
  return (
    <section className="border-b border-line py-16 md:py-20">
      <div className="container-page">
        <div className="flex items-end justify-between">
          <h2 className="text-display-md font-medium">Upcoming events</h2>
          <Button href="/events" variant="ghost" className="hidden px-0 md:inline-flex">
            View all events
          </Button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {events.map((event, i) => (
            <EventCard key={event.slug} event={event} featured={i === 0} />
          ))}
        </div>

        <Button href="/events" variant="ghost" className="mt-6 w-full md:hidden">
          View all events
        </Button>
      </div>
    </section>
  );
}
