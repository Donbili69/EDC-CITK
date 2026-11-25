import type { EventDetail, EventStatus, EventSummary } from "@/lib/types";
import eventsData from "@/lib/mock-data/events.json";

// The mock file holds full detail records. The list functions return the
// lighter EventSummary shape, mirroring how a real API would separate
// "list" and "detail" endpoints. When the backend is ready, replace the
// bodies with fetch calls and keep these signatures unchanged.
const allEvents = eventsData as unknown as EventDetail[];

function toSummary(e: EventDetail): EventSummary {
  return {
    slug: e.slug,
    title: e.title,
    status: e.status,
    date: e.date,
    venue: e.venue,
    coverImage: e.coverImage,
    category: e.category,
    academicYear: e.academicYear,
  };
}

export async function getEvents(filters?: {
  status?: EventStatus;
  year?: string;
  category?: string;
}): Promise<EventSummary[]> {
  return allEvents
    .filter((e) => !filters?.status || e.status === filters.status)
    .filter((e) => !filters?.year || e.academicYear === filters.year)
    .filter((e) => !filters?.category || e.category === filters.category)
    .map(toSummary);
}

export async function getUpcomingEvents(limit = 3): Promise<EventSummary[]> {
  const events = await getEvents({ status: "upcoming" });
  return events
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
}

export async function getRecentEvents(limit: number): Promise<EventSummary[]> {
  const events = await getEvents({ status: "past" });

  return events
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export async function getEventBySlug(slug: string): Promise<EventDetail | null> {
  return allEvents.find((e) => e.slug === slug) ?? null;
}

export async function getRelatedEvents(slugs: string[]): Promise<EventSummary[]> {
  return allEvents.filter((e) => slugs.includes(e.slug)).map(toSummary);
}

export async function getEventYears(): Promise<string[]> {
  return [...new Set(allEvents.map((e) => e.academicYear))].sort().reverse();
}

export async function getEventCategories(): Promise<string[]> {
  return [...new Set(allEvents.map((e) => e.category))].sort();
}
