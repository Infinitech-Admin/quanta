// components/sections/newsroom.tsx  (server component)
import { getNews } from "@/lib/news";
import { NewsroomUI, type NewsPost } from "@/components/sections/newsroom-ui";

// Pulls the latest articles from GET /api/news (same source as /news).
// No hardcoded content: if there are no articles, the section is hidden.
export async function Newsroom() {
  const articles = await getNews(); // already newest first

  // The design shows three cards; the newest one carries the "Featured" badge.
  const posts: NewsPost[] = articles.slice(0, 3).map((a, i) => ({
    id: String(a.id),
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    image: a.cover,
    date: a.date,
    featured: i === 0,
  }));

  return <NewsroomUI posts={posts} />;
}
