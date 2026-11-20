// components/news/NewsList.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { formatDate } from "@/lib/news-format";
import type { News } from "@/types/news";

const PAGE_SIZE = 6;

export function NewsList({ articles }: { articles: News[] }) {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Categories come from the data itself (typed manually in the admin).
  const categories = useMemo(
    () => Array.from(new Set(articles.map((a) => a.category))).sort(),
    [articles],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return articles.filter((a) => {
      if (active !== "All" && a.category !== active) return false;
      if (!q) return true;
      return [a.title, a.excerpt ?? "", a.category].some((s) =>
        s.toLowerCase().includes(q),
      );
    });
  }, [articles, active, search]);

  const visible = filtered.slice(0, visibleCount);

  function pick(cat: string) {
    setActive(cat);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <section
      id="stories"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 lg:px-8"
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0B6E3E]">
        From the Quanta Newsroom
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1B3F34] sm:text-4xl">
        More stories from Quanta
      </h2>
      <p className="mt-3 text-sm text-[#1B3F34]/60">
        Discover the people, achievements, and celebrations that shape our
        story.
      </p>

      <div className="mt-6 flex flex-col gap-4 border-t border-[#1B3F34]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => pick(cat)}
              className={[
                "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                active === cat
                  ? "border-[#0B6E3E] bg-[#0B6E3E] text-white"
                  : "border-[#1B3F34]/10 bg-[#E9F0E6] text-[#1B3F34] hover:border-[#0B6E3E]/40",
              ].join(" ")}
            >
              {cat === "All" ? "All Stories" : cat}
            </button>
          ))}
        </div>

        <div className="relative sm:w-72">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#1B3F34]/50" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            placeholder="Search stories…"
            className="w-full rounded-full border border-[#1B3F34]/10 bg-white py-2.5 pl-10 pr-4 text-xs text-[#1B3F34] placeholder:text-[#1B3F34]/40 focus:border-[#0B6E3E] focus:outline-none"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-24 text-center text-sm text-[#1B3F34]/40">
          No stories found.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {visible.map((a) => (
            <NewsCard key={a.id} article={a} />
          ))}
        </div>
      )}

      {visibleCount < filtered.length && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="rounded-full border border-[#1B3F34]/15 px-6 py-2 text-sm font-medium text-[#1B3F34]/70 transition-colors hover:border-[#0B6E3E]/50 hover:text-[#1B3F34]"
          >
            View More
          </button>
        </div>
      )}
    </section>
  );
}

function NewsCard({ article }: { article: News }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group block overflow-hidden rounded-2xl border border-[#1B3F34]/10 bg-white shadow-sm transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-[#0B6E3E]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#E9F0E6]">
        {article.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.cover}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
        <span className="absolute bottom-3 left-4 rounded-full bg-[#1B3F34] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
          {article.category}
        </span>
      </div>
      <div className="p-6 sm:p-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1B3F34]/60">
          {article.category} &nbsp; {formatDate(article.date)}
        </p>
        <h3 className="mt-3 text-xl font-bold leading-snug text-[#1B3F34] group-hover:text-[#0B6E3E] sm:text-2xl">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#1B3F34]/65">
            {article.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
