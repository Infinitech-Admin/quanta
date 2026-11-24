// components/sections/newsroom.tsx  (server component)
import { getNews } from "@/lib/news";
import { NewsroomUI, type NewsPost } from "@/components/sections/newsroom-ui";

// Pulls the latest articles from GET /api/news (same source as /news).
// No hardcoded content: if there are no articles, the section is hidden.
export async function Newsroom() {
  const articles = await getNews();

  // Sort here so we never depend on the API's order: newest first.
  // Invalid dates are pushed to the end instead of breaking the sort.
  const time = (iso: string) => {
    const t = new Date(iso).getTime();
    return Number.isNaN(t) ? 0 : t;
  };
  const newest = [...articles].sort((a, b) => time(b.date) - time(a.date));

  // The article marked "Featured" in the admin goes first (the backend allows
  // only one). The rest follow, newest first. If none is featured, no badge.
  const featured = newest.find((a) => a.isFeatured);
  const ordered = featured
    ? [featured, ...newest.filter((a) => a.id !== featured.id)]
    : newest;

  const posts: NewsPost[] = ordered.slice(0, 3).map((a) => ({
    id: String(a.id),
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    image: a.cover,
    date: a.date,
    featured: a.isFeatured,
  }));

  return <NewsroomUI posts={posts} />;
}
