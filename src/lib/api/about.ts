import type { AboutContent, TimelineMilestone } from "@/lib/types";
import aboutData from "@/lib/mock-data/about.json";
import timelineData from "@/lib/mock-data/timeline.json";

export async function getAboutContent(): Promise<AboutContent> {
  return aboutData as AboutContent;
}

// Returned oldest-first. The first entry must remain 30 July 2022.
export async function getTimeline(): Promise<TimelineMilestone[]> {
  return [...(timelineData as TimelineMilestone[])].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
}
