// lib/news.ts  (server-side helpers for the public news pages)
import { getApiUrl } from "@/lib/api-url";
import type { ApiNews, News } from "@/types/news";

export { formatDate } from "@/lib/news-format";

function abs(path: string | null): string | null {
  return path ? `${getApiUrl()}/${path}` : null;
}

function toNews(a: ApiNews): News {
  const gallery = a.images.map((i) => abs(i.image)!).filter(Boolean);
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    category: a.category,
    excerpt: a.excerpt,
    content: a.content,
    date: a.published_at.slice(0, 10),
    cover: abs(a.cover_image) ?? gallery[0] ?? null,
    gallery,
    isFeatured: Boolean(a.is_featured),
  };
}

export async function getNews(): Promise<News[]> {
  try {
    const res = await fetch(`${getApiUrl()}/api/news`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.success && Array.isArray(json.data)
      ? json.data.map(toNews)
      : [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
  try {
    const res = await fetch(
      `${getApiUrl()}/api/news/${encodeURIComponent(slug)}`,
      { headers: { Accept: "application/json" }, next: { revalidate: 60 } },
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json.success && json.data ? toNews(json.data) : null;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}
