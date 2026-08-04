"use client";

export function HeroSkeleton() {
  return (
    <section className="relative z-10 isolate flex min-h-[100vh] w-full items-center overflow-hidden bg-[var(--color-moss)] sm:min-h-[90vh]">
      <div className="absolute inset-0 bg-forest-deep/20 animate-pulse" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          {/* Left column skeleton */}
          <div className="max-w-2xl space-y-6">
            <div className="h-6 w-40 rounded-full bg-cream/20 animate-pulse" />
            <div className="space-y-3">
              <div className="h-10 w-full rounded bg-cream/20 animate-pulse" />
              <div className="h-10 w-3/4 rounded bg-cream/20 animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-cream/10 animate-pulse" />
              <div className="h-4 w-5/6 rounded bg-cream/10 animate-pulse" />
            </div>
            <div className="flex gap-4 pt-4">
              <div className="h-11 w-40 rounded-md bg-cream/20 animate-pulse" />
              <div className="h-11 w-32 rounded-md bg-cream/10 animate-pulse" />
            </div>
          </div>

          {/* Right column skeleton — video area */}
          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="aspect-video w-full rounded-2xl bg-cream/20 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}


export function WhyChooseUsSkeleton() {
  return (
    <section className="relative bg-[var(--color-cream)] overflow-hidden py-14">
      <div className="relative max-w-6xl mx-auto px-6 md:px-16 pt-20 pb-24">
        {/* Heading */}
        <div className="flex flex-col items-center">
          <div className="h-8 w-80 max-w-full rounded bg-[var(--color-forest-light)]/20 animate-pulse" />
          <div className="h-1 w-16 rounded-full bg-[var(--color-forest-light)]/30 mt-5 mb-14 animate-pulse" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-12">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-5"
            >
              {/* Icon circle */}
              <div className="h-32 w-32 rounded-full bg-[var(--color-forest-light)]/20 animate-pulse" />

              {/* Title */}
              <div className="h-6 w-48 rounded bg-[var(--color-forest-vivid)]/20 animate-pulse" />

              {/* Paragraph (3 lines, last one shorter) */}
              <div className="space-y-2 w-full max-w-xs">
                <div className="h-3 w-full rounded bg-[var(--color-forest-deep)]/10 animate-pulse" />
                <div className="h-3 w-full rounded bg-[var(--color-forest-deep)]/10 animate-pulse" />
                <div className="h-3 w-2/3 mx-auto rounded bg-[var(--color-forest-deep)]/10 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BrandsShowcaseSkeleton() {
  return (
    <section className="py-24 px-6 md:px-16 bg-[var(--color-sage-light)]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 flex flex-col items-center gap-4">
          <div className="h-6 w-32 rounded-full bg-[var(--color-sun)]/20 animate-pulse" />
          <div className="h-9 w-72 max-w-full rounded bg-[var(--color-forest)]/15 animate-pulse" />
        </div>

        {/* Category tabs */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-28 rounded-full bg-white/70 animate-pulse"
            />
          ))}
        </div>

        {/* Intro text */}
        <div className="flex flex-col items-center gap-2 mb-10">
          <div className="h-3 w-full max-w-2xl rounded bg-[var(--color-forest-deep)]/10 animate-pulse" />
          <div className="h-3 w-2/3 max-w-2xl rounded bg-[var(--color-forest-deep)]/10 animate-pulse" />
        </div>

        {/* Big preview panel */}
        <div className="h-80 w-full rounded-3xl bg-[var(--color-forest)]/10 animate-pulse sm:h-96" />

        {/* Thumbnail selector */}
        <div className="mt-10 flex flex-wrap justify-center gap-4 px-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-[110px] shrink-0 rounded-2xl bg-white p-1.5 shadow-sm sm:w-[130px]"
            >
              <div className="aspect-[3/4] w-full rounded-xl bg-[var(--color-forest)]/10 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export function FlagshipProductSkeleton() {
  return (
    <section className="section-green-gradient relative overflow-hidden py-14 md:py-16 px-6 md:px-16">
      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* left: story */}
        <div className="z-10">
          {/* eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-white/30" />
            <div className="h-3 w-40 rounded bg-white/20 animate-pulse" />
          </div>

          {/* logo mark placeholder */}
          <div className="h-36 w-44 mb-6 rounded-xl bg-white/10 animate-pulse" />

          {/* heading */}
          <div className="space-y-2 mb-4">
            <div className="h-9 w-64 rounded bg-white/15 animate-pulse" />
            <div className="h-9 w-48 rounded bg-white/15 animate-pulse" />
          </div>

          {/* underline squiggle stand-in */}
          <div className="h-3 w-32 rounded-full bg-white/10 animate-pulse mb-4" />

          {/* bordered label */}
          <div className="border-l-2 border-white/20 pl-3 mb-4">
            <div className="h-4 w-56 rounded bg-white/15 animate-pulse" />
          </div>

          {/* paragraph, 4 lines */}
          <div className="space-y-2 max-w-md mb-3">
            <div className="h-3 w-full rounded bg-white/10 animate-pulse" />
            <div className="h-3 w-full rounded bg-white/10 animate-pulse" />
            <div className="h-3 w-full rounded bg-white/10 animate-pulse" />
            <div className="h-3 w-2/3 rounded bg-white/10 animate-pulse" />
          </div>

          {/* feature chips */}
          <div className="flex flex-wrap gap-3 mt-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-36 rounded-full bg-white/10 animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* right: product image */}
        <div className="relative h-[260px] md:h-[400px]">
          <div className="absolute inset-0 rounded-3xl bg-white/10 animate-pulse" />
          {/* badge placeholder */}
          <div className="absolute bottom-[6%] left-[18%] h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-white/15 animate-pulse" />
        </div>
      </div>
    </section>
  );
}


export function CertificationsSkeleton() {
  return (
    <section className="paper-grain relative overflow-hidden bg-[var(--color-sage-light)] py-16 md:py-20 px-6 md:px-16">
      <div className="relative max-w-6xl mx-auto">
        {/* eyebrow */}
        <div className="mb-10 flex items-center justify-center gap-4">
          <div className="h-px w-10 bg-[var(--color-forest-vivid)]/30" />
          <div className="h-3 w-48 rounded bg-[var(--color-forest-vivid)]/20 animate-pulse" />
          <div className="h-px w-10 bg-[var(--color-forest-vivid)]/30" />
        </div>

        <div className="grid items-center gap-14 md:grid-cols-2">
          {/* plaque */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-full max-w-sm pt-10">
              <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 h-16 w-16 rounded-full bg-[var(--color-forest-deep)]/20 animate-pulse" />

              <div className="relative rounded-sm border border-[var(--color-forest-light)]/30 bg-white px-7 pb-7 pt-12 shadow-sm">
                <div className="h-3 w-24 mx-auto rounded bg-[var(--color-forest-deep)]/15 animate-pulse mb-4" />
                <div className="mx-auto mb-4 h-px w-16 bg-[var(--color-forest-light)]/30" />

                <div className="divide-y divide-dashed divide-[var(--color-forest-light)]/20">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
                    >
                      <div className="h-9 w-9 shrink-0 rounded-full bg-[var(--color-forest-vivid)]/15 animate-pulse" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3.5 w-32 rounded bg-[var(--color-forest-deep)]/15 animate-pulse" />
                        <div className="h-3 w-24 rounded bg-[var(--color-forest-deep)]/10 animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* copy */}
          <div className="space-y-5">
            <div className="h-9 w-64 rounded bg-[var(--color-forest)]/15 animate-pulse" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-full rounded bg-[var(--color-forest-deep)]/10 animate-pulse" />
                <div className="h-3 w-full rounded bg-[var(--color-forest-deep)]/10 animate-pulse" />
                <div className="h-3 w-3/4 rounded bg-[var(--color-forest-deep)]/10 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}