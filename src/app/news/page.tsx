// app/news/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { NewsList } from "@/components/news/NewsList";
import { getNews, formatDate } from "@/lib/news";

export const metadata: Metadata = { title: "News & Events" };

// The article shown in the "Featured story" block (matched by title).
const FEATURED_TITLE = "beyond the workplace";

export default async function NewsPage() {
  const articles = await getNews();
  // Pick the article whose title contains the text above; fall back to the newest.
  const featured =
    articles.find((a) =>
      a.title.toLowerCase().includes(FEATURED_TITLE.toLowerCase()),
    ) ?? articles[0];

  return (
    <main className="min-h-screen bg-[#F7F5EC]">
      {/* Hero */}
      <section className="relative isolate flex min-h-[520px] items-center bg-[#4f7a6b] px-4 pb-24 pt-44 text-white sm:px-6 md:min-h-[600px] lg:min-h-[680px] lg:px-8">
        <Image
          src="/images/MAIN-BANNER-2.png"
          alt="Quanta Paper Corporation factory building surrounded by greenery"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-right"
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em]">
            News &amp; Events
          </p>
          <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-6xl">
            Quanta Newsroom
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90">
            Updates from Quanta Paper—from company milestones and celebrations
            to community initiatives and employee moments worth sharing.
          </p>
          <a
            href="#stories"
            className="mt-8 inline-flex rounded-full bg-[#00A651] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#00B85A]"
          >
            Explore Our Stories ↗
          </a>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="mx-auto -mt-0 max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0B6E3E]">
            <span>Featured story</span>
            <span className="h-px flex-1 bg-[#0B6E3E]/25" />
            <span>
              {featured.category} · {formatDate(featured.date)}
            </span>
          </div>

          <Link
            href={`/news/${featured.slug}`}
            className="group mt-5 grid overflow-hidden rounded-3xl border border-[#1B3F34]/10 bg-white shadow-sm transition-shadow hover:shadow-lg md:grid-cols-[1.35fr_1fr]"
          >
            <div className="aspect-[4/3] bg-[#E9F0E6] md:aspect-auto">
              {featured.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.cover}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#E9F0E6] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#1B3F34]">
                  {featured.category}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B3F34]/60">
                  {formatDate(featured.date)}
                </span>
              </div>
              <h2 className="mt-5 text-3xl font-bold leading-tight text-[#1B3F34] group-hover:text-[#0B6E3E] sm:text-4xl">
                {featured.title}
              </h2>
              {featured.excerpt && (
                <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-[#1B3F34]/65">
                  {featured.excerpt}
                </p>
              )}
            </div>
          </Link>
        </section>
      )}

      {/* The featured story is pinned first in the list below, with a badge. */}
      <NewsList articles={articles} featuredId={featured?.id} />

      {/* CTA */}
      <section className="bg-[#1B3F34] px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A651]">
              Stay connected
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              There’s always more to our story.
            </h2>
            <p className="mt-3 text-sm text-white/80">
              Follow Quanta Paper’s milestones, our brands, and the people and
              communities we serve.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-[#00A651] px-6 py-3.5 text-sm font-bold hover:bg-[#00B85A]"
            >
              Get in Touch ↗
            </Link>
            <Link
              href="/brands"
              className="rounded-full border border-white/40 px-6 py-3.5 text-sm font-bold hover:bg-white/10"
            >
              Explore Our Brands ↗
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
