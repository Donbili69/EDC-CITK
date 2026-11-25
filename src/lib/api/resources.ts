import resourcesData from "@/lib/mock-data/resources.json";
import type { Resource, ResourceCategory } from "@/lib/types";

const allResources = resourcesData as Resource[];

export async function getResources(filters?: {
  category?: ResourceCategory;
  search?: string;
}): Promise<Resource[]> {
  const search = filters?.search?.trim().toLowerCase();

  return allResources
    .filter((resource) => !filters?.category || resource.category === filters.category)
    .filter(
      (resource) =>
        !search ||
        resource.title.toLowerCase().includes(search) ||
        resource.description.toLowerCase().includes(search) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(search)),
    );
}

export async function getResourcesByIds(ids: string[]): Promise<Resource[]> {
  return allResources.filter((resource) => ids.includes(resource.id));
}
