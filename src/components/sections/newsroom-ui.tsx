"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export type NewsPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string;
  image: string | null;
  date: string; // ISO date or datetime
  featured: boolean;
};

const NEWS_INDEX_HREF = "/news";
const newsPostHref = (slug: string) => `/news/${slug}`;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Manila",
  });
}

// Splits "23 Years of Care: Sharing Beyond the Workplace"
// into the lead ("23 Years of Care:") and the highlighted part after the colon.
function renderTitle(title: string, highlight: boolean) {
  const i = title.indexOf(":");
  if (!highlight || i === -1) return title; // not featured or no colon → plain title

  return (
    <>
      {title.slice(0, i + 1)}{" "}
      <span className="text-[#00a651]">{title.slice(i + 1).trim()}</span>
    </>
  );
}

function NewsCard({ post, index }: { post: NewsPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.15 }}
      className="h-full"
    >
      <Link
        href={newsPostHref(post.slug)}
        className="group flex h-full flex-col rounded-3xl bg-[#f7f6f2] p-3 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-28px_rgba(0,0,0,0.65)]"
      >
        {/* ── Image: same ratio on every card, rounded inside the card ── */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#2a8a57] to-[#0b5a32]">
          {post.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}

          {/* soft fade so the badge always reads on any photo */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/30 to-transparent" />

          {post.featured && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0b5a32] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00a651]" />
              Featured
            </span>
          )}
        </div>

        {/* ── Text ── */}
        <div className="flex flex-1 flex-col px-3 pb-2 pt-4">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-[#e3efe5] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0b6b3a]">
              {post.category}
            </span>
            <time
              dateTime={post.date}
              className="text-xs font-medium text-[#6b7a70]"
            >
              {formatDate(post.date)}
            </time>
          </div>

          <h3 className="mt-3 line-clamp-3 text-lg font-bold leading-[1.25] tracking-[-0.025em] text-[#1f2623]">
            {renderTitle(post.title, post.featured)}
          </h3>

          {post.excerpt && (
            <p className="mt-2 line-clamp-2 text-[13px] leading-[1.7] text-[#5b6460]">
              {post.excerpt}
            </p>
          )}

          {/* pinned to the bottom so all cards end on the same line */}
          <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-3">
            <span className="mt-3 text-[13px] font-bold text-[#0b5a32]">
              Read story
            </span>
            <span className="mt-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#0b5a32]/25 text-[#0b5a32] transition-colors duration-300 group-hover:border-[#00a651] group-hover:bg-[#00a651] group-hover:text-white">
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function NewsroomUI({ posts }: { posts: NewsPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="relative isolate overflow-hidden bg-[#00683a] px-6 pb-10 pt-10 text-white md:pb-12">
      {/* Q background image: kasing-taas ng section, naka-right, buo ang Q. Ang fade ay nasa image mismo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-10 aspect-[2576/978] h-full opacity-60 md:opacity-100"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 35%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 35%)",
        }}
      >
        <Image
          src="/images/MAIN-BANNER-2.png"
          alt=""
          fill
          sizes="(min-width: 768px) 1000px, 100vw"
          quality={90}
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.25em]">
            From the Quanta Newsroom
          </p>
          <h2 className="mt-3 max-w-[760px] text-3xl font-bold leading-[1.1] tracking-[-0.04em] md:text-[38px]">
            Our stories, our people, our impact.
          </h2>

          <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[640px] text-sm leading-[1.8] text-white/90">
              The latest news, milestones, and moments from across the Quanta
              family.
            </p>

            <Link
              href={NEWS_INDEX_HREF}
              className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-[#04472a] px-6 py-3 text-xs font-bold transition-colors hover:bg-[#033a22] md:self-auto"
            >
              View all news &amp; events
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* ── Up to three equal cards ── */}
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {posts.slice(0, 3).map((post, i) => (
            <NewsCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
