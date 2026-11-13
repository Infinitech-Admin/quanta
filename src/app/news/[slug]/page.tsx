// app/news/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsGallery } from "@/components/news/NewsGallery";
import { getNewsBySlug, formatDate } from "@/lib/news";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  return {
    title: article?.title ?? "Story not found",
    description: article?.excerpt ?? undefined,
  };
}

// Shared page container: same left edge as the header logo and the news list.
const CONTAINER = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

type Block =
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "p"; text: string };

// Body format (plain text from the admin textarea):
//   blank line          -> new paragraph
//   "## Text"           -> section heading
//   "> Text"            -> pull quote
//   short first line with no ending punctuation, followed by more lines
//                       -> treated as a heading, rest is a paragraph
function parseContent(content: string): Block[] {
  const blocks: Block[] = [];
  const chunks = content
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((c) => c.trim())
    .filter(Boolean);

  for (const chunk of chunks) {
    if (chunk.startsWith("## ")) {
      const [first, ...rest] = chunk.split("\n");
      blocks.push({ type: "h2", text: first.slice(3).trim() });
      if (rest.join("\n").trim()) {
        blocks.push({ type: "p", text: rest.join("\n").trim() });
      }
      continue;
    }
    if (chunk.startsWith("> ")) {
      blocks.push({ type: "quote", text: chunk.slice(2).trim() });
      continue;
    }

    const lines = chunk.split("\n");
    const first = lines[0].trim();
    const looksLikeHeading =
      lines.length > 1 && first.length <= 80 && !/[.!?:,;"”’)]$/.test(first);

    if (looksLikeHeading) {
      blocks.push({ type: "h2", text: first });
      blocks.push({ type: "p", text: lines.slice(1).join("\n").trim() });
    } else {
      blocks.push({ type: "p", text: chunk });
    }
  }
  return blocks;
}

// Bolds a leading "November 7, 2026 —" dateline in the lead paragraph.
function Lead({ text }: { text: string }) {
  const m = text.match(/^([A-Z][a-z]+ \d{1,2}, \d{4})\s*([—–-])\s*/);
  return (
    <p className="whitespace-pre-line text-lg leading-[1.8] text-[#1B3F34] sm:text-xl">
      {m ? (
        <>
          <strong className="font-bold">
            {m[1]} {m[2]}
          </strong>{" "}
          {text.slice(m[0].length)}
        </>
      ) : (
        text
      )}
    </p>
  );
}

function ArticleBody({ content }: { content: string }) {
  const blocks = parseContent(content);
  let leadDone = false;

  return (
    <div>
      {blocks.map((b, i) => {
        if (b.type === "h2") {
          return (
            <h2
              key={i}
              className="mb-3 mt-12 text-2xl font-bold tracking-tight text-[#1B3F34] sm:text-3xl"
            >
              {b.text}
            </h2>
          );
        }
        if (b.type === "quote") {
          return (
            <blockquote
              key={i}
              className="my-8 border-l-2 border-[#0B6E3E] bg-[#EEF4EA] px-6 py-5 text-lg italic leading-relaxed text-[#0B6E3E]"
            >
              {b.text}
            </blockquote>
          );
        }
        if (!leadDone) {
          leadDone = true;
          return (
            <div key={i} className="mb-6">
              <Lead text={b.text} />
            </div>
          );
        }
        return (
          <p
            key={i}
            className="mb-5 whitespace-pre-line text-[15px] leading-[2] text-[#1B3F34]/75"
          >
            {b.text}
          </p>
        );
      })}
    </div>
  );
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) notFound();

  return (
    <main className="min-h-screen bg-[#F7F5EC]">
      <header className="bg-[#E9F0E6] pb-12 pt-28 sm:pt-32">
        <div className={CONTAINER}>
          <Link
            href="/news"
            className="text-xs font-bold text-[#1B3F34] hover:text-[#0B6E3E]"
          >
            ← Back to News &amp; Events
          </Link>
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1B3F34]/60">
            News › {article.category}
          </p>
          <p className="mt-5 text-[11px] font-bold uppercase tracking-wider text-[#0B6E3E]">
            {article.category} &nbsp; {formatDate(article.date)}
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight text-[#1B3F34] sm:text-5xl">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#1B3F34]/60">
              {article.excerpt}
            </p>
          )}
        </div>
      </header>

      <article className={`${CONTAINER} py-10`}>
        {article.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.cover}
            alt=""
            className="mb-10 aspect-[16/9] w-full rounded-2xl object-cover shadow-sm"
          />
        )}
        {/* Text column is left-aligned with the image, not centered */}
        {article.content && (
          <div className="max-w-3xl">
            <ArticleBody content={article.content} />
          </div>
        )}
      </article>

      {article.gallery.length > 0 && (
        <section className="bg-[#EEF4EA] py-14">
          <div className={CONTAINER}>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0B6E3E]">
              Through the lens
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#1B3F34]">
              Photo gallery
            </h2>
            <p className="mt-1 text-xs text-[#1B3F34]/60">
              Browse the moments captured from this story.
            </p>
            <NewsGallery images={article.gallery} />
          </div>
        </section>
      )}

      {/* CTA card: sits inside the container so it never touches the footer */}
      <div className={`${CONTAINER} pb-16 pt-12 sm:pb-20`}>
        <div className="relative overflow-hidden rounded-3xl bg-[#1B3F34] px-6 py-10 text-white sm:px-10 sm:py-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 right-24 h-72 w-72 rounded-full border border-white/5"
          />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A651]">
                Stay connected
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">
                There’s always more to our story.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                Read more from the Quanta newsroom, or reach out to our team.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#00A651] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#00B85A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get in Touch ↗
              </Link>
              <Link
                href="/news"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                ← All Stories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
