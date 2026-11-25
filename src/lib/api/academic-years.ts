import academicYearsData from "@/lib/mock-data/academic-years.json";
import type { AcademicYear } from "@/lib/types";

export async function getAcademicYears(): Promise<AcademicYear[]> {
  return [...academicYearsData].sort((a, b) => b.startYear - a.startYear);
}

export async function getCurrentAcademicYear(): Promise<AcademicYear> {
  const currentYear = academicYearsData.find((year) => year.isCurrent);

  if (!currentYear) {
    throw new Error("No current academic year is configured.");
  }

  return currentYear;
}
