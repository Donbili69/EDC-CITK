import type { EventStatus } from "@/lib/types";

// UTC keeps ISO dates (YYYY-MM-DD) from shifting a day for visitors
// in other timezones.
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const statusLabels: Record<EventStatus, string> = {
  upcoming: "Upcoming",
  ongoing: "Ongoing",
  past: "Past",
};
