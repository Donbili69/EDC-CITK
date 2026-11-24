import type { Metadata } from "next";
import { EventsExplorer } from "@/components/sections/EventsExplorer";
import { getEvents, getEventYears, getEventCategories } from "@/lib/api/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming, ongoing and past events by EDC CITK, archived by academic year.",
};

export default async function EventsPage() {
  const [events, years, categories] = await Promise.all([
    getEvents(),
    getEventYears(),
    getEventCategories(),
  ]);

  return (
    <div className="container-page py-16 md:py-24">
      <p className="text-small text-ink-600">Events</p>
      <h1 className="mt-2 max-w-[20ch] text-display-lg font-medium">
        What&rsquo;s happening, and everything that has.
      </h1>
      <p className="mt-4 max-w-prose text-ink-600">
        Every EDC event stays here as a permanent archive. Switch tabs for what&rsquo;s coming up,
        what&rsquo;s live, and what&rsquo;s behind us, then filter by academic year or category.
      </p>

      <div className="mt-10">
        <EventsExplorer events={events} years={years} categories={categories} />
      </div>
    </div>
  );
}
