import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EventCard } from "@/components/sections/EventCard";
import { EventStatusBadge } from "@/components/sections/EventStatusBadge";
import { getEvents, getEventBySlug, getRelatedEvents } from "@/lib/api/events";
import { formatDate } from "@/lib/utils/format";

// Next 15+/16: route params arrive as a Promise and must be awaited.
type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Event not found" };
  return { title: event.title, description: event.description.slice(0, 160) };
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-8">
      <h2 className="text-display-md font-medium">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const related = await getRelatedEvents(event.relatedEventSlugs);
  const canRegister = event.registrationUrl && event.status !== "past";

  return (
    <article className="container-page py-12 md:py-16">
      <Link href="/events" className="text-small text-ink-600 hover:text-ink">
        &larr; All events
      </Link>

      <div className="mt-6 h-48 bg-ink/5 md:h-72" aria-hidden="true" />

      <header className="mt-8">
        <div className="flex flex-wrap gap-2">
          <EventStatusBadge status={event.status} />
          <Badge tone="signal">{event.category}</Badge>
        </div>
        <h1 className="mt-4 max-w-[24ch] text-display-lg font-medium">{event.title}</h1>

        <dl className="mt-6 grid gap-4 text-small sm:grid-cols-3">
          <div>
            <dt className="text-ink-400">Date</dt>
            <dd className="mt-0.5 font-medium">{formatDate(event.date)}</dd>
          </div>
          <div>
            <dt className="text-ink-400">Venue</dt>
            <dd className="mt-0.5 font-medium">{event.venue}</dd>
          </div>
          <div>
            <dt className="text-ink-400">Academic year</dt>
            <dd className="mt-0.5 font-medium">{event.academicYear}</dd>
          </div>
        </dl>

        {canRegister && (
          <Button href={event.registrationUrl!} className="mt-6">
            Register
          </Button>
        )}
      </header>

      <div className="mt-10">
        <DetailSection title="About this event">
          <p className="max-w-prose text-ink-600">{event.description}</p>
        </DetailSection>

        {event.schedule.length > 0 && (
          <DetailSection title="Schedule">
            <ol className="divide-y divide-line border border-line">
              {event.schedule.map((s) => (
                <li key={s.time} className="flex gap-6 px-4 py-3 text-small">
                  <span className="w-24 shrink-0 font-medium">{s.time}</span>
                  <span className="text-ink-600">{s.item}</span>
                </li>
              ))}
            </ol>
          </DetailSection>
        )}

        {event.speakers.length > 0 && (
          <DetailSection title="Speakers & guests">
            <ul className="grid gap-4 sm:grid-cols-2">
              {event.speakers.map((s) => (
                <li key={s.name} className="border border-line p-4">
                  <div className="font-medium">{s.name}</div>
                  <div className="text-small text-ink-600">{s.role}</div>
                </li>
              ))}
            </ul>
          </DetailSection>
        )}

        <DetailSection title="Organizers">
          <p className="text-ink-600">{event.organizers.join(", ")}</p>
        </DetailSection>

        {event.gallery.length > 0 && (
          <DetailSection title="Photos">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {event.gallery.map((src) => (
                <div key={src} className="aspect-[4/3] bg-ink/5" aria-hidden="true" />
              ))}
            </div>
          </DetailSection>
        )}

        {event.report && (
          <DetailSection title="Event report">
            <p className="max-w-prose text-ink-600">{event.report}</p>
          </DetailSection>
        )}

        {related.length > 0 && (
          <DetailSection title="Related events">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((e) => (
                <EventCard key={e.slug} event={e} showStatus />
              ))}
            </div>
          </DetailSection>
        )}
      </div>
    </article>
  );
}
