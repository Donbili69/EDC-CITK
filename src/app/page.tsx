import { Hero } from "@/components/sections/Hero";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { UpcomingEvents } from "@/components/sections/UpcomingEvents";
import { EcosystemStrip } from "@/components/sections/EcosystemStrip";
import { TeamPreview, FinalCta } from "@/components/sections/TeamPreview";
import { getUpcomingEvents } from "@/lib/api/events";
import { getImpactStats, getTeamPreview } from "@/lib/api/home";

export default async function HomePage() {
  const [stats, events, team] = await Promise.all([
    getImpactStats(),
    getUpcomingEvents(3),
    getTeamPreview(),
  ]);

  return (
    <>
      <Hero />
      <ImpactStats stats={stats} />
      <UpcomingEvents events={events} />
      <EcosystemStrip />
      <TeamPreview members={team} />
      <FinalCta />
    </>
  );
}
