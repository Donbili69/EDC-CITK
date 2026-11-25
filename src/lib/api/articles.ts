import articlesData from "@/lib/mock-data/articles.json";
import type { Article } from "@/lib/types";

const allArticles = articlesData as Article[];

export async function getArticles(filters?: { tag?: string; search?: string }): Promise<Article[]> {
  const search = filters?.search?.trim().toLowerCase();

  return allArticles
    .filter((article) => !filters?.tag || article.tags.includes(filters.tag))
    .filter(
      (article) =>
        !search ||
        article.title.toLowerCase().includes(search) ||
        article.excerpt.toLowerCase().includes(search) ||
        article.body.some((paragraph) => paragraph.toLowerCase().includes(search)),
    );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return allArticles.find((article) => article.slug === slug) ?? null;
}

export async function getRelatedArticles(slug: string, limit: number): Promise<Article[]> {
  const article = allArticles.find((item) => item.slug === slug);

  if (!article) {
    return [];
  }

  return allArticles
    .filter((item) => item.slug !== slug)
    .map((item) => ({
      article: item,
      sharedTagCount: item.tags.filter((tag) => article.tags.includes(tag)).length,
    }))
    .filter((item) => item.sharedTagCount > 0)
    .sort(
      (a, b) =>
        b.sharedTagCount - a.sharedTagCount ||
        new Date(b.article.publishedAt).getTime() - new Date(a.article.publishedAt).getTime(),
    )
    .slice(0, limit)
    .map((item) => item.article);
}

export async function getArticleTags(): Promise<string[]> {
  return [...new Set(allArticles.flatMap((article) => article.tags))].sort();
}
