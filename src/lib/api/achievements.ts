import achievementsData from "@/lib/mock-data/achievements.json";
import type { Achievement, AchievementCategory } from "@/lib/types";

const allAchievements = achievementsData as Achievement[];

export async function getAchievements(filters?: {
  category?: AchievementCategory;
  year?: string;
}): Promise<Achievement[]> {
  return allAchievements
    .filter((achievement) => !filters?.category || achievement.category === filters.category)
    .filter((achievement) => !filters?.year || achievement.academicYear === filters.year);
}

export async function getAchievementCategories(): Promise<AchievementCategory[]> {
  return [...new Set(allAchievements.map((achievement) => achievement.category))].sort();
}

export async function getFeaturedAchievements(limit: number): Promise<Achievement[]> {
  return [...allAchievements]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
