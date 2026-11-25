import alumniData from "@/lib/mock-data/alumni.json";
import type { AlumniProfile } from "@/lib/types";

const allAlumni = alumniData as AlumniProfile[];

export async function getAlumni(filters?: {
  search?: string;
  graduationYear?: number;
  department?: string;
}): Promise<AlumniProfile[]> {
  const search = filters?.search?.trim().toLowerCase();

  return allAlumni
    .filter(
      (profile) =>
        !search ||
        profile.name.toLowerCase().includes(search) ||
        profile.organization.toLowerCase().includes(search),
    )
    .filter(
      (profile) =>
        filters?.graduationYear === undefined || profile.graduationYear === filters.graduationYear,
    )
    .filter((profile) => !filters?.department || profile.department === filters.department);
}

export async function getAlumniById(id: string): Promise<AlumniProfile | null> {
  return allAlumni.find((profile) => profile.id === id) ?? null;
}

export async function getAlumniGraduationYears(): Promise<number[]> {
  return [...new Set(allAlumni.map((profile) => profile.graduationYear))].sort((a, b) => b - a);
}

export async function getAlumniDepartments(): Promise<string[]> {
  return [...new Set(allAlumni.map((profile) => profile.department))].sort();
}
