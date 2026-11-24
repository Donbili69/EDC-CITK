import type { ImpactStat, Member } from "@/lib/types";
import statsData from "@/lib/mock-data/stats.json";
import teamPreviewData from "@/lib/mock-data/team-preview.json";

export async function getImpactStats(): Promise<ImpactStat[]> {
  return statsData as ImpactStat[];
}

export async function getTeamPreview(): Promise<Member[]> {
  return teamPreviewData as Member[];
}
