import announcementsData from "@/lib/mock-data/announcements.json";
import type { Announcement } from "@/lib/types";

const allAnnouncements = announcementsData as Announcement[];

export async function getActiveAnnouncement(now: Date = new Date()): Promise<Announcement | null> {
  const timestamp = now.getTime();

  return (
    allAnnouncements.find(
      (announcement) =>
        new Date(announcement.startsAt).getTime() <= timestamp &&
        new Date(announcement.endsAt).getTime() >= timestamp,
    ) ?? null
  );
}
