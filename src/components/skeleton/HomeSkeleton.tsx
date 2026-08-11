export function HeroSkeleton() {
  return (
    <section className="relative isolate flex min-h-[100vh] w-full items-center overflow-hidden bg-[var(--color-forest-vivid)] sm:min-h-[90vh]">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--color-forest-deep)]/30 animate-pulse shadow-lg" />

      <div className="relative z-10 mx-auto w-full max-w-7xl mt-20 px-4 pt-11.5 pb-30 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 mt-8">
          {/* Left Content */}
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="h-8 w-40 rounded-full bg-white/20 animate-pulse border border-white/10 shadow-lg" />

            {/* Heading */}
            <div className="mt-6 space-y-3 max-w-xl">
              <div className="h-13 w-full rounded bg-white/20 animate-pulse border border-white/10 shadow-lg" />
              <div className="h-13 w-full rounded bg-white/20 animate-pulse border border-white/10 shadow-lg" />
              <div className="h-13 w-5/6 rounded bg-white/20 animate-pulse border border-white/10 shadow-lg" />
            </div>

            {/* Description */}
            <div className="mt-13 space-y-3 max-w-lg">
              <div className="h-4 w-full rounded bg-white/15 animate-pulse border border-white/10 shadow-lg" />
              <div className="h-4 w-full rounded bg-white/15 animate-pulse border border-white/10 shadow-lg" />
              <div className="h-4 w-3/4 rounded bg-white/15 animate-pulse border border-white/10 shadow-lg" />
            </div>

            {/* Buttons */}
            <div className="mt-13 flex flex-wrap gap-4">
              <div className="h-11 w-44 rounded-md bg-white/20 animate-pulse border border-white/10 shadow-lg" />
              <div className="h-11 w-32 rounded-md bg-white/20 animate-pulse border border-white/10 shadow-lg" />
              <div className="h-11 w-36 rounded-md bg-white/20 animate-pulse border border-white/10 shadow-lg" />
            </div>
          </div>

          {/* Right Video Card */}
          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              {/* Video Preview */}
              <div className="aspect-video w-full bg-white/20 animate-pulse" />

              {/* Floating Buttons */}
              <div className="absolute bottom-4 left-4 h-9 w-24 rounded-full bg-white/25 animate-pulse" />
              <div className="absolute bottom-4 right-4 h-9 w-32 rounded-full bg-white/25 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUsSkeleton() {
  return (
    <section className="relative bg-[var(--color-cream)] overflow-hidden py-10">
      <div className="relative max-w-6xl mx-auto px-6 md:px-16 pt-12 pb-24">
        {/* Heading */}
        <div className="flex flex-col items-center">
          <div className="h-12 w-[30%] md:w-[60%] max-w-full rounded bg-[var(--color-forest-light)]/60 animate-pulse" />
          <div className="h-2 w-16 rounded-full bg-[var(--color-forest-light)]/30 mt-5 mb-10 animate-pulse" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-12">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-5"
            >
              {/* Icon circle */}
              <div className="h-32 w-32 rounded-full bg-[var(--color-forest-light)]/60 animate-pulse border border-[var(--color-forest-light)]/50 shadow-lg" />

              {/* Title */}
              <div className="h-6 w-48 rounded bg-[var(--color-forest-vivid)]/20 animate-pulse border border-[var(--color-forest-vivid)]/20 shadow-lg" />

              {/* Paragraph (3 lines, last one shorter) */}
              <div className="space-y-2 w-full max-w-xs">
                <div className="h-3 w-full rounded bg-[var(--color-forest-deep)]/10 animate-pulse border border-[var(--color-forest-deep)]/10 shadow-lg" />
                <div className="h-3 w-full rounded bg-[var(--color-forest-deep)]/10 animate-pulse border border-[var(--color-forest-deep)]/10 shadow-lg" />
                <div className="h-3 w-full rounded bg-[var(--color-forest-deep)]/10 animate-pulse border border-[var(--color-forest-deep)]/10 shadow-lg" />
                <div className="h-3 w-full rounded bg-[var(--color-forest-deep)]/10 animate-pulse border border-[var(--color-forest-deep)]/10 shadow-lg" />
                <div className="h-3 w-2/3 mx-auto rounded bg-[var(--color-forest-deep)]/10 animate-pulse border border-[var(--color-forest-deep)]/10 shadow-lg" />
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
    <section className="py-26 px-6 md:px-16 bg-[var(--color-sage-light)]">
      <div className="max-w-5xl mx-auto gap-5">
        {/* Header */}
        <div className="text-center mb-10 flex flex-col items-center gap-4">
          <div className="h-6 w-32 rounded-full bg-[var(--color-sun)]/20 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
          <div className="h-9 w-72 max-w-full rounded bg-[var(--color-forest)]/15 animate-pulse border border-[var(--color-forest)]/10 shadow-lg" />
        </div>

        {/* Category tabs */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-28 rounded-full bg-white/70 animate-pulse border border-white/10 shadow-lg"
            />
          ))}
        </div>

        {/* Intro text */}
        <div className="flex flex-col items-center gap-2 mb-10">
          <div className="h-3 w-full max-w-2xl rounded bg-[var(--color-forest-deep)]/10 animate-pulse border border-[var(--color-forest-deep)]/10 shadow-lg" />
          <div className="h-3 w-2/3 max-w-2xl rounded bg-[var(--color-forest-deep)]/10 animate-pulse border border-[var(--color-forest-deep)]/10 shadow-lg" />
          <div className="h-3 w-1/6 max-w-2xl rounded bg-[var(--color-forest-deep)]/10 animate-pulse border border-[var(--color-forest-deep)]/10 shadow-lg" />
        </div>

        {/* Big preview panel */}
        <div className="h-80 w-full rounded-3xl bg-[var(--color-forest)]/10 animate-pulse border border-[var(--color-forest)]/10 shadow-lg sm:h-96" />

        {/* Thumbnail selector */}
        <div className="mt-10 flex flex-wrap justify-center gap-4 px-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-[110px] shrink-0 rounded-2xl bg-white p-1.5 shadow-lg sm:w-[130px]"
            >
              <div className="aspect-[3/4] w-full rounded-xl bg-[var(--color-forest)]/10 animate-pulse border border-[var(--color-forest)]/10 shadow-lg" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FlagshipProductSkeleton() {
  return (
    <section className="section-green-gradient relative overflow-hidden py-14 md:pt-16 md:pb-44 px-6 md:px-16">
      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-32 items-center">
        {/* left: story */}
        <div className="z-10 ml-18 mt-8">
          {/* eyebrow */}
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px w-12 bg-white/30 border border-white/10 shadow-lg" />
            <div className="h-3 w-42 rounded bg-white/20 animate-pulse border border-white/10 shadow-lg" />
          </div>

          {/* logo mark placeholder */}
          <div className="h-36 w-44 mb-6 rounded-xl bg-white/10 animate-pulse border border-white/10 shadow-lg" />

          {/* heading */}
          <div className="space-y-2 mb-5">
            <div className="h-9 w-72 rounded bg-white/15 animate-pulse border border-white/10 shadow-lg" />
            <div className="h-9 w-48 rounded bg-white/15 animate-pulse border border-white/10 shadow-lg" />
          </div>

          {/* underline squiggle stand-in */}
          <div className="h-3 w-32 rounded-full bg-white/10 animate-pulse border border-white/10 shadow-lg mb-5" />

          {/* bordered label */}
          <div className="border-l-2 border-white/20 pl-3 mb-5">
            <div className="h-4 w-64 rounded bg-white/15 animate-pulse" />
          </div>

          {/* paragraph, 4 lines */}
          <div className="space-y-3 max-w-md mb-3">
            <div className="h-3 w-full rounded bg-white/10 animate-pulse border border-white/10 shadow-lg" />
            <div className="h-3 w-full rounded bg-white/10 animate-pulse border border-white/10 shadow-lg" />
            <div className="h-3 w-full rounded bg-white/10 animate-pulse border border-white/10 shadow-lg" />
            <div className="h-3 w-full rounded bg-white/10 animate-pulse border border-white/10 shadow-lg" />
            <div className="h-3 w-full rounded bg-white/10 animate-pulse border border-white/10 shadow-lg" />
            <div className="h-3 w-full rounded bg-white/10 animate-pulse border border-white/10 shadow-lg" />
            <div className="h-3 w-2/3 rounded bg-white/10 animate-pulse border border-white/10 shadow-lg" />
          </div>
        </div>

        {/* right: product image */}
        <div className="relative mt-44  ml-54 w-fit mx-auto">
          <div className="h-64 w-64 md:h-99 md:w-99 rounded-3xl bg-white/15 animate-pulse border border-white/10 shadow-lg" />

          <div className="absolute -left-32 -bottom-8 h-16 w-16 md:h-20 md:w-20 rounded-full bg-white/15 animate-pulse border border-white/10 shadow-lg" />
        </div>
      </div>
    </section>
  );
}

export function CertificationsSkeleton() {
  return (
    <section className="paper-grain relative overflow-hidden bg-[var(--color-sage-light)] py-24 md:py-32 px-6 md:px-16">
      <div className="relative max-w-6xl mx-auto">
        {/* eyebrow */}
        <div className="mb-10 flex items-center justify-center gap-4">
          <div className="h-px w-10 bg-[var(--color-forest-vivid)]/40 border border-white/10 shadow-lg" />
          <div className="h-3 w-48 rounded bg-[var(--color-forest-vivid)]/40 animate-pulse border border-white/10 shadow-lg" />
          <div className="h-px w-10 bg-[var(--color-forest-vivid)]/40 border border-white/10 shadow-lg" />
        </div>

        <div className="grid items-center gap-14 md:grid-cols-2">
          {/* plaque */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-full max-w-sm pt-10">
              <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 h-16 w-16 rounded-full bg-[var(--color-forest-deep)]/40 animate-pulse border border-white/10 shadow-lg" />

              <div className="relative rounded-sm border border-[var(--color-forest-light)]/30 bg-white px-7 pb-7 pt-12 border border-white/10 shadow-lg">
                <div className="h-3 w-24 mx-auto rounded bg-[var(--color-forest-deep)]/15 animate-pulse mb-4 border border-white/10 shadow-lg" />
                <div className="mx-auto mb-4 h-px w-16 bg-[var(--color-forest-light)]/30 border border-white/10 shadow-lg" />

                <div className="divide-y divide-dashed divide-[var(--color-forest-light)]/20">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
                    >
                      <div className="h-9 w-9 shrink-0 rounded-full bg-[var(--color-forest-vivid)]/15 animate-pulse  border border-white/10 shadow-lg" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3.5 w-32 rounded bg-[var(--color-forest-deep)]/15 animate-pulse  border border-white/10 shadow-lg" />
                        <div className="h-3 w-24 rounded bg-[var(--color-forest-deep)]/10 animate-pulse  border border-white/10 shadow-lg" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* copy */}
          <div className="space-y-5">
            <div className="h-9 w-[70%] rounded bg-[var(--color-forest)]/15 animate-pulse" />
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-full rounded bg-[var(--color-forest-deep)]/10 animate-pulse border border-white/10 shadow-xl" />
                <div className="h-3 w-full rounded bg-[var(--color-forest-deep)]/10 animate-pulse border border-white/10 shadow-xl" />
                <div className="h-3 w-full rounded bg-[var(--color-forest-deep)]/10 animate-pulse border border-white/10 shadow-xl" />
                <div className="h-3 w-full rounded bg-[var(--color-forest-deep)]/10 animate-pulse border border-white/10 shadow-xl" />
                <div className="h-3 w-3/4 rounded bg-[var(--color-forest-deep)]/10 animate-pulse border border-white/10 shadow-xl" />
              </div>
            ))}
             <div className="space-y-2">
                <div className="h-3 w-full rounded bg-[var(--color-forest-deep)]/10 animate-pulse border border-white/10 shadow-xl" />
                <div className="h-3 w-full rounded bg-[var(--color-forest-deep)]/10 animate-pulse border border-white/10 shadow-xl" />
                <div className="h-3 w-3/4 rounded bg-[var(--color-forest-deep)]/10 animate-pulse border border-white/10 shadow-xl" />
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GroupOfCompaniesSkeleton() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-cream)] py-24 px-6 md:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center">
          <div className="mb-4 h-6 w-28 rounded-full bg-[var(--color-forest)]/10 animate-pulse border border-white/10 shadow-lg" />
          <div className="h-10 w-72 rounded bg-[var(--color-forest)]/15 animate-pulse border border-white/10 shadow-lg" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Network Dot */}
              <div className="mb-6 h-[9px] w-[9px] rounded-full bg-[var(--color-sun)]/30 animate-pulse border border-white/10 shadow-lg" />

              {/* Card */}
              <div className="h-[300px] w-full rounded-2xl bg-[var(--color-forest)]/10 p-7 shadow-lg border border-white/10 shadow-lg">
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-full bg-[var(--color-cream)]/40 animate-pulse border border-white/10 shadow-lg" />

                  <div className="h-5 w-3/4 rounded bg-[var(--color-cream)]/40 animate-pulse border border-white/10 shadow-lg" />

                  <div className="h-4 w-1/2 rounded bg-[var(--color-cream)]/30 animate-pulse border border-white/10 shadow-lg" />

                  <div className="space-y-2 pt-2">
                    <div className="h-3 w-full rounded bg-[var(--color-cream)]/25 animate-pulse border border-white/10 shadow-lg" />
                    <div className="h-3 w-full rounded bg-[var(--color-cream)]/25 animate-pulse border border-white/10 shadow-lg" />
                    <div className="h-3 w-4/5 rounded bg-[var(--color-cream)]/25 animate-pulse border border-white/10 shadow-lg" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-14 flex justify-center">
          <div className="h-10 w-40 rounded-md bg-[var(--color-forest)]/15 animate-pulse border border-white/10 shadow-lg" />
        </div>
      </div>
    </section>
  );
}

export function CtaBannerSkeleton() {
  return (
    <section className="section-green-gradient py-20 px-6 md:px-16 text-center">
      <div className="mx-auto mb-6 h-9 w-full max-w-2xl rounded bg-[var(--color-cream)]/20 animate-pulse md:h-10 border-[var(--color-cream)]/10 shadow-lg" />

      <div className="mx-auto mb-8 max-w-xl space-y-2">
        <div className="mx-auto h-4 w-2/3 rounded bg-[var(--color-cream)]/15 animate-pulse border border-[var(--color-cream)]/10 shadow-lg" />
      </div>

      <div className="mx-auto h-10 w-36 rounded-md bg-[var(--color-sun)]/30 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
    </section>
  );
}
