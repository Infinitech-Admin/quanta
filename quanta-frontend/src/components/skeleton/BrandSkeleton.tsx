// BrandSkeleton.tsx

export function BrandsHeroSkeleton() {
  return (
    <section className="relative isolate overflow-hidden py-24 text-[var(--color-cream)] sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-forest-vivid)]/70 via-[var(--color-forest)]/88 to-[var(--color-forest-vivid)]/80  border border-[var(--color-forest-vivid)]/10 shadow-lg" />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <div className="h-3.5 w-40 rounded bg-[var(--color-sun)]/25 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />

        <div className="mt-4 max-w-2xl space-y-3">
          <div className="h-11 w-full rounded bg-[var(--color-cream)]/20 animate-pulse border border-[var(--color-cream)]/10 shadow-lg sm:h-14 md:h-16" />
          <div className="h-11 w-2/3 rounded bg-[var(--color-cream)]/20 animate-pulse border border-[var(--color-cream)]/10 shadow-lg sm:h-14 md:h-16" />
        </div>

        <div className="mt-6 max-w-lg space-y-2">
          <div className="h-4 w-full rounded bg-[var(--color-cream)]/15 animate-pulse border border-[var(--color-cream)]/10 shadow-lg" />
          <div className="h-4 w-full rounded bg-[var(--color-cream)]/15 animate-pulse border border-[var(--color-cream)]/10 shadow-lg" />
          <div className="h-4 w-1/2 rounded bg-[var(--color-cream)]/15 animate-pulse border border-[var(--color-cream)]/10 shadow-lg" />
        </div>
      </div>
    </section>
  );
}

export function BrandsShowcaseSkeleton() {
  return (
    <section className="py-24 px-6 md:px-16 bg-[var(--color-sage-light)]">
      <div className="max-w-5xl mx-auto">
        {/* eyebrow + heading */}
        <div className="text-center mb-10">
          <div className="mx-auto mb-4 h-6 w-32 rounded-full border border-[var(--color-sun)]/30 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
          <div className="mx-auto h-9 w-64 rounded bg-[var(--color-forest)]/15 animate-pulse border border-[var(--color-forest)]/15 shadow-lg md:h-10 md:w-72" />
        </div>

        {/* category tabs — 3 categories */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-9 w-28 rounded-full bg-white/60 animate-pulse border border-white/10 shadow-lg"
            />
          ))}
        </div>

        {/* intro line */}
        <div className="mx-auto mb-10 max-w-2xl space-y-1.5">
          <div className="mx-auto h-3.5 w-full rounded bg-[var(--color-forest-deep)]/10 animate-pulse border border-[var(--color-forest-deep)]/10 shadow-lg" />
          <div className="mx-auto h-3.5 w-3/4 rounded bg-[var(--color-forest-deep)]/10 animate-pulse border border-[var(--color-forest-deep)]/10 shadow-lg" />
        </div>

        {/* big preview panel */}
        <div className="h-80 w-full rounded-3xl bg-[var(--color-forest)]/15 animate-pulse border border-[var(--color-forest)]/10 shadow-lg sm:h-96" />

        {/* thumbnail selector — matches the largest category, 7 brands */}
        <div className="mt-10">
          <div className="flex flex-wrap justify-center gap-4 px-2">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-[110px] shrink-0 overflow-hidden rounded-2xl bg-white p-1.5 shadow-sm sm:w-[130px]"
              >
                <div className="aspect-[3/4] w-full rounded-xl bg-[var(--color-forest)]/15 animate-pulse border border-[var(--color-forest)]/10 shadow-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function BrandSlugHeroSkeleton() {
  return (
    <section className="relative isolate overflow-hidden text-[var(--color-cream)]">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-forest-vivid)] via-[var(--color-forest)] to-[var(--color-forest-deep)]" />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-16 sm:px-10 sm:pt-32 sm:pb-24">
        {/* back link */}
        <div className="h-9 w-44 rounded-full border border-white/20 bg-black/20 animate-pulse border border-white/10 shadow-lg" />

        {/* breadcrumb */}
        <div className="mt-8 mb-4 flex items-center gap-2">
          <div className="h-3 w-14 rounded bg-[var(--color-cream)]/20 animate-pulse border border-[var(--color-cream)]/10 shadow-lg" />
          <span className="text-[var(--color-cream)]/30" aria-hidden="true">
            /
          </span>
          <div className="h-3 w-20 rounded bg-[var(--color-cream)]/20 animate-pulse border border-[var(--color-cream)]/10 shadow-lg" />
          <span className="text-[var(--color-cream)]/30" aria-hidden="true">
            /
          </span>
          <div className="h-3 w-16 rounded bg-[var(--color-cream)]/15 animate-pulse border border-[var(--color-cream)]/10 shadow-lg" />
        </div>

        {/* eyebrow */}
        <div className="mt-8 h-3.5 w-28 rounded bg-[var(--color-sun)]/25 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />

        {/* h1 */}
        <div className="mt-4 max-w-2xl space-y-3">
          <div className="h-10 w-full rounded bg-[var(--color-cream)]/20 animate-pulse border border-[var(--color-cream)]/10 shadow-lg sm:h-12 md:h-14" />
          <div className="h-10 w-1/2 rounded bg-[var(--color-cream)]/20 animate-pulse border border-[var(--color-cream)]/10 shadow-lg sm:h-12 md:h-14" />
        </div>
      </div>
    </section>
  );
}

export function BrandSlugDetailSkeleton() {
  return (
    <section className="bg-[var(--color-sage-light)] px-6 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-16">
        {/* Product card */}
        <div className="mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none">
          <div className="aspect-[3/4] w-full rounded-2xl bg-[var(--color-forest)]/15 animate-pulse border border-[var(--color-forest)]/10 shadow-lg" />
        </div>

        {/* Copy */}
        <div>
          <div className="mb-6 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-forest-deep)]/20 animate-pulse border border-[var(--color-forest-deep)]/10 shadow-lg" />
            <div className="h-3 w-24 rounded bg-[var(--color-forest-deep)]/15 animate-pulse border border-[var(--color-forest-deep)]/10 shadow-lg" />
          </div>

          <div className="h-9 w-56 rounded bg-[var(--color-forest-deep)]/20 animate-pulse border border-[var(--color-forest-deep)]/10 shadow-lg sm:h-10 sm:w-64" />

          <div className="mt-6 max-w-xl space-y-2">
            <div className="h-4 w-full rounded bg-[var(--color-forest-deep)]/10 animate-pulse border border-[var(--color-forest-deep)]/10 shadow-lg" />
            <div className="h-4 w-full rounded bg-[var(--color-forest-deep)]/10 animate-pulse border border-[var(--color-forest-deep)]/10 shadow-lg" />
            <div className="h-4 w-2/3 rounded bg-[var(--color-forest-deep)]/10 animate-pulse border border-[var(--color-forest-deep)]/10 shadow-lg" />
          </div>

          <ul className="mt-8 flex flex-col gap-3">
            {[0, 1, 2, 3].map((i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-[var(--color-forest-deep)]/10 animate-pulse border border-[var(--color-forest-deep)]/10 shadow-lg" />
                <span className="h-3.5 w-2/3 rounded bg-[var(--color-forest-deep)]/10 animate-pulse border border-[var(--color-forest-deep)]/10 shadow-lg" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function SlugRelatedBrandsSkeleton() {
  return (
    <section className="border-t border-[var(--color-forest-deep)]/10 bg-white px-6 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 h-8 w-64 rounded bg-[var(--color-forest-deep)]/15 animate-pulse border border-[var(--color-forest-deep)]/10 shadow-lg sm:h-9 sm:w-72" />

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-xl bg-[var(--color-sage-light)] p-1.5 ring-1 ring-black/5"
            >
              <div className="aspect-[3/4] w-full rounded-lg bg-[var(--color-forest)]/15 animate-pulse border border-[var(--color-forest)]/10 shadow-lg" />
              <div className="mt-3 px-1 pb-2">
                <div className="h-3.5 w-3/4 rounded bg-[var(--color-forest-deep)]/15 animate-pulse border border-[var(--color-forest-deep)]/10 shadow-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}