import initiativesData from "@/lib/mock-data/initiatives.json";
import type { Initiative } from "@/lib/types";

const allInitiatives = initiativesData as Initiative[];

export async function getInitiatives(filters?: { academicYear?: string }): Promise<Initiative[]> {
  return allInitiatives.filter(
    (initiative) => !filters?.academicYear || initiative.academicYear === filters.academicYear,
  );
}

export async function getInitiativeBySlug(slug: string): Promise<Initiative | null> {
  return allInitiatives.find((initiative) => initiative.slug === slug) ?? null;
}

export async function getFeaturedInitiatives(limit: number): Promise<Initiative[]> {
  return allInitiatives.slice(0, limit);
}
