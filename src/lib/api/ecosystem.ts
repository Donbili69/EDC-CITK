import ecosystemNodesData from "@/lib/mock-data/ecosystem-nodes.json";
import ecosystemTopicsData from "@/lib/mock-data/ecosystem-topics.json";
import type { EcosystemNode, EcosystemTopic } from "@/lib/types";

const allEcosystemTopics = ecosystemTopicsData as EcosystemTopic[];
const ecosystemNodes = ecosystemNodesData as EcosystemNode[];

export async function getEcosystemTopics(): Promise<EcosystemTopic[]> {
  return allEcosystemTopics;
}

export async function getEcosystemTopicBySlug(slug: string): Promise<EcosystemTopic | null> {
  return allEcosystemTopics.find((topic) => topic.slug === slug) ?? null;
}

export async function getEcosystemNodes(): Promise<EcosystemNode[]> {
  return [...ecosystemNodes].sort((a, b) => a.order - b.order);
}
