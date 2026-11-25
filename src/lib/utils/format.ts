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

export function formatAcademicYear(value: string): string {
  const match = /^(\d{4})-(\d{2})$/.exec(value);

  if (!match?.[1] || !match[2]) {
    return value;
  }

  return `${match[1]}–${match[2]}`;
}

export function formatTime(value: string): string {
  const match = /^([01]?\d|2[0-3]):([0-5]\d)$/.exec(value);

  if (!match?.[1] || !match[2]) {
    return value;
  }

  const hour = Number(match[1]);
  const minute = match[2];
  const period = hour < 12 ? "AM" : "PM";

  return `${hour % 12 || 12}:${minute} ${period}`;
}

export const statusLabels: Record<EventStatus, string> = {
  upcoming: "Upcoming",
  ongoing: "Ongoing",
  past: "Past",
};
