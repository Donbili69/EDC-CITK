import galleryData from "@/lib/mock-data/gallery-media.json";
import { getEvents } from "@/lib/api/events";
import type { EventSummary, GalleryMedia, GalleryYearSummary } from "@/lib/types";

const allGalleryMedia = galleryData as GalleryMedia[];

export async function getGalleryYears(): Promise<GalleryYearSummary[]> {
  const yearSummaries = new Map<string, Set<string>>();

  for (const media of allGalleryMedia) {
    const eventSlugs = yearSummaries.get(media.academicYear) ?? new Set<string>();
    eventSlugs.add(media.eventSlug);
    yearSummaries.set(media.academicYear, eventSlugs);
  }

  return [...yearSummaries.entries()]
    .map(([year, eventSlugs]) => ({
      year,
      eventCount: eventSlugs.size,
      mediaCount: allGalleryMedia.filter((media) => media.academicYear === year).length,
    }))
    .sort((a, b) => b.year.localeCompare(a.year));
}

export async function getGalleryEvents(yearId: string): Promise<EventSummary[]> {
  const eventSlugs = new Set(
    allGalleryMedia
      .filter((media) => media.academicYear === yearId)
      .map((media) => media.eventSlug),
  );
  const events = await getEvents({ year: yearId });

  return events.filter((event) => eventSlugs.has(event.slug));
}

export async function getGalleryMedia(yearId: string, eventSlug: string): Promise<GalleryMedia[]> {
  return allGalleryMedia.filter(
    (media) => media.academicYear === yearId && media.eventSlug === eventSlug,
  );
}
