import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Eyebrow } from "@/components/about/ui";
import { allBrands, findBrandBySlug, getRelatedBrands } from "@/data/brands";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allBrands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = findBrandBySlug(slug);
  if (!brand) return {};
  return {
    title: `${brand.name} — Quanta Paper`,
    description: brand.description,
  };
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;
  const brand = findBrandBySlug(slug);

  if (!brand) notFound();

  const related = getRelatedBrands(slug);

  return (
    <main>
      {/* ── Hero — normal top-down flow with generous, explicit spacing.
          Nothing is pinned to an edge with justify-between anymore. ── */}
      <section className="relative isolate overflow-hidden text-[var(--color-cream)]">
        <Image
          src="/bg-innerpage.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${brand.color}f7 0%, ${brand.color}e8 45%, var(--color-forest-deep)f2 100%)`,
          }}
        />
        {/* Extra darkening wash so text stays legible over lighter brand colors */}
        <div className="absolute inset-0 bg-black/20" />

        <div
          className="relative mx-auto max-w-6xl px-6 pt-24 pb-16 sm:px-10 sm:pt-32 sm:pb-24"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.35)" }}
        >
          {/* Back link */}
          <Link
            href="/brands"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-black/20 px-4 py-2 text-sm font-semibold backdrop-blur-sm transition hover:bg-black/30"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all brands
          </Link>

          {/* Breadcrumb */}
          <nav className="mt-8 mb-4 flex flex-wrap items-center gap-2 text-xs text-[var(--color-cream)]/80">
            <Link
              href="/brands"
              className="hover:text-[var(--color-cream)] transition"
            >
              Brands
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={`/brands?category=${brand.categoryId}`}
              className="hover:text-[var(--color-cream)] transition"
            >
              {brand.categoryLabel}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[var(--color-cream)]">{brand.name}</span>
          </nav>

          <Eyebrow>{brand.categoryLabel}</Eyebrow>
          <h1 className="mt-4 max-w-2xl font-[var(--font-display)] text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            {brand.name}
          </h1>
        </div>
      </section>
      {/* ── Detail — product card + copy + features, stacks on mobile ── */}
      <section className="bg-[var(--color-sage-light)] px-6 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-16">
          {/* Product card */}
          <div className="mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none">
            <div
              className={`relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gradient-to-br ${brand.gradient} shadow-[0_25px_50px_-15px_rgba(0,0,0,0.35)]`}
            >
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "14px 14px",
                }}
              />
              {brand.image ? (
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="relative z-10 object-contain p-8"
                  sizes="(min-width: 1024px) 380px, 320px"
                />
              ) : (
                <div className="relative z-10 flex h-full w-full items-center justify-center">
                  <span className="font-serif text-6xl font-bold text-white/90">
                    {brand.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Copy */}
          <div>
            <div className="mb-6 flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: brand.color }}
                aria-hidden="true"
              />
              <span className="text-xs uppercase tracking-widest text-[var(--color-forest-deep)]/60">
                {brand.categoryLabel}
              </span>
            </div>

            <h2 className="font-serif text-3xl text-[var(--color-forest-deep)] sm:text-4xl">
              {brand.name}
            </h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-forest-deep)]/80 sm:text-lg">
              {brand.description}
            </p>

            {brand.features && brand.features.length > 0 && (
              <ul className="mt-8 flex flex-col gap-3">
                {brand.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${brand.color}1a` }}
                    >
                      <Check
                        className="h-3 w-3"
                        style={{ color: brand.color }}
                      />
                    </span>
                    <span className="text-sm text-[var(--color-forest-deep)]/80 sm:text-base">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* ── Related brands — same category, responsive grid ── */}
      {related.length > 0 && (
        <section className="border-t border-[var(--color-forest-deep)]/10 bg-white px-6 py-16 sm:px-10 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <h3 className="mb-8 font-serif text-2xl text-[var(--color-forest-deep)] sm:text-3xl">
              More from {brand.categoryLabel}
            </h3>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/brands/${item.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl bg-[var(--color-sage-light)] p-1.5 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gradient-to-br ${item.gradient}`}
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-4"
                        sizes="(min-width: 768px) 25vw, 45vw"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center font-serif text-2xl font-bold text-white/90">
                        {item.name.charAt(0)}
                      </span>
                    )}
                    <div className="absolute bottom-2 right-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100">
                      <ArrowUpRight className="h-3 w-3 text-slate-700" />
                    </div>
                  </div>
                  <p className="mt-3 px-1 pb-2 text-sm font-semibold text-[var(--color-forest-deep)]">
                    {item.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
