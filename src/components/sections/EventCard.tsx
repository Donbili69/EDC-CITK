import Link from "next/link";
import type { EventSummary } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EventStatusBadge } from "@/components/sections/EventStatusBadge";
import { formatDate } from "@/lib/utils/format";

// The single event card used on Home, the Events listing and related-events.
// Do not make another event card; extend this one with props instead.
export function EventCard({
  event,
  featured = false,
  showStatus = false,
}: {
  event: EventSummary;
  featured?: boolean;
  showStatus?: boolean;
}) {
  return (
    <Link href={`/events/${event.slug}`} className="block h-full">
      <Card featured={featured} className="h-full p-5 transition-colors hover:border-ink/40">
        <div className="mb-4 h-32 bg-ink/5" aria-hidden="true" />
        <div className="flex flex-wrap gap-2">
          <Badge tone="signal">{event.category}</Badge>
          {showStatus && <EventStatusBadge status={event.status} />}
        </div>
        <h3 className="mt-3 text-body font-medium">{event.title}</h3>
        <p className="mt-1 text-small text-ink-600">
          {formatDate(event.date)} &middot; {event.venue}
        </p>
      </Card>
    </Link>
  );
}
