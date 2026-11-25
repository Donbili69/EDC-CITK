import { getCurrentAcademicYear } from "@/lib/api/academic-years";
import modulesData from "@/lib/mock-data/modules.json";
import teamData from "@/lib/mock-data/team.json";
import type { Member, Module, TeamTier } from "@/lib/types";

const allMembers = teamData as Member[];
const allModules = modulesData as Module[];

export async function getTeam(
  yearId: string,
  filters?: { moduleSlug?: string },
): Promise<Member[]> {
  return allMembers
    .filter((member) => member.academicYear === yearId)
    .filter((member) => !filters?.moduleSlug || member.moduleSlug === filters.moduleSlug);
}

export async function getModules(): Promise<Module[]> {
  return allModules;
}

export async function getMemberById(id: string): Promise<Member | null> {
  return allMembers.find((member) => member.id === id) ?? null;
}

export async function getLeadershipPreview(limit: number): Promise<Member[]> {
  const currentYear = await getCurrentAcademicYear();

  return allMembers
    .filter((member) => member.academicYear === currentYear.id)
    .filter((member) => member.tier === "chief" || member.tier === "convener")
    .slice(0, limit);
}

export async function getAdvisorsPreview(limit: number): Promise<Member[]> {
  const currentYear = await getCurrentAcademicYear();

  const advisorTiers: TeamTier[] = ["faculty-mentor", "advisor"];

  return allMembers
    .filter((member) => member.academicYear === currentYear.id)
    .filter((member) => advisorTiers.includes(member.tier))
    .slice(0, limit);
}
