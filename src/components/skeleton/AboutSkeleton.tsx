export function HeroSkeleton() {
  return (
    <section className="relative overflow-hidden bg-[var(--forest-deep)] pt-24 sm:pt-32 md:pt-30 text-[var(--paper)]">
      <div className="absolute inset-0 bg-[var(--color-forest-vivid)]/85 animate-pulse border border-[var(--color-forest-vivid)]/10 shadow-lg" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest-deep)]/85 via-[var(--color-forest-deep)]/20 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
        {/* eyebrow */}
        <div className="h-4 w-56 rounded bg-[var(--color-sun)]/25 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />

        {/* h1 */}
        <div className="mt-6 space-y-3">
          <div className="h-12 w-64 rounded bg-[var(--color-cream)]/20 animate-pulse border border-[var(--color-cream)]/10 shadow-lg sm:h-14 sm:w-80 md:h-16 lg:h-[4.5rem] lg:w-96" />
        </div>

        {/* paragraph */}
        <div className="mt-6 max-w-lg space-y-2">
          <div className="h-4 w-full rounded bg-[var(--color-cream)]/15 animate-pulse border border-[var(--color-cream)]/10 shadow-lg" />
          <div className="h-4 w-full rounded bg-[var(--color-cream)]/15 animate-pulse border border-[var(--color-cream)]/10 shadow-lg" />
          <div className="h-4 w-2/3 rounded bg-[var(--color-cream)]/15 animate-pulse border border-[var(--color-cream)]/10 shadow-lg" />
        </div>
      </div>

      {/* torn-paper transition — kept static, not skeletal, since it's decorative chrome, not loading content */}
      <svg
        className="relative block w-full text-[var(--color-cream)]"
        viewBox="0 0 1200 16"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 16 L0 7 L40 10 L85 5 L130 9 L175 3 L220 8 L265 5 L310 10 L355 4 L400 8 L445 2 L490 9 L535 6 L580 11 L625 5 L670 8 L715 3 L760 9 L805 5 L850 8 L895 2 L940 9 L985 5 L1030 8 L1075 3 L1120 9 L1160 5 L1200 7 L1200 16 Z"
          fill="currentColor"
        />
      </svg>
    </section>
  );
}


export function OurHistorySkeleton() {
  return (
    <section className="relative isolate overflow-hidden py-30 text-[var(--color-cream)]">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-forest-deep)]/95 via-[var(--color-forest)]/92 to-[var(--color-forest-vivid)]/88" />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <div className="max-w-2xl">
          <div className="h-4 w-32 rounded bg-[var(--color-sun)]/25 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
          <div className="mt-4 space-y-2">
            <div className="h-7 w-full rounded bg-[var(--color-cream)]/20 animate-pulse border border-[var(--color-cream)]/10 shadow-lg sm:h-8" />
            <div className="h-7 w-2/3 rounded bg-[var(--color-cream)]/20 animate-pulse border border-[var(--color-cream)]/10 shadow-lg sm:h-8" />
          </div>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          {/* Timeline skeleton */}
          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--color-cream)]/20 border border-[var(--color-sun)]/10 shadow-lg" />
            <div className="space-y-10">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="relative pl-8">
                  <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--color-sun)]/40 bg-[var(--color-forest-deep)] animate-pulse" />
                  <div className="h-3 w-16 rounded bg-[var(--color-sun)]/25 animate-pulse border border-[var(--color-cream)]/10 shadow-lg" />
                  <div className="mt-2 h-5 w-40 rounded bg-[var(--color-cream)]/20 animate-pulse border border-[var(--color-cream)]/10 shadow-lg" />
                  <div className="mt-2 space-y-1.5">
                    <div className="h-3.5 w-full rounded bg-[var(--color-cream)]/10 animate-pulse border border-[var(--color-cream)]/10 shadow-lg" />
                    <div className="h-3.5 w-4/5 rounded bg-[var(--color-cream)]/10 animate-pulse border border-[var(--color-cream)]/10 shadow-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spec sheet skeleton */}
          <aside className="relative self-start overflow-hidden rounded-lg border border-[var(--color-cream)]/15 bg-[var(--color-cream)]/[0.06] p-8 backdrop-blur-sm">
            <div className="h-4 w-40 rounded bg-[var(--color-sun)]/25 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
            <dl className="mt-6 divide-y divide-[var(--color-cream)]/15">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 py-3.5"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-4 w-4 flex-none rounded bg-[var(--color-sun)]/25 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
                    <span className="h-3.5 w-24 rounded bg-[var(--color-cream)]/15 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
                  </div>
                  <span className="h-5 w-12 rounded bg-[var(--color-cream)]/20 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function WhoWeAreSkeleton() {
  return (
    <section className="section-green-gradient paper-grain relative overflow-hidden text-[var(--color-cream)]">
      <div className="relative mx-auto max-w-6xl border-x border-[var(--color-cream)]/10 px-6 sm:px-10">
        {/* header row */}
        <div className="flex flex-wrap items-end py-12 justify-between gap-4 border-b border-[var(--color-cream)]/15 py-8">
          <div>
            <div className="h-3.5 w-24 rounded bg-[var(--color-sun)]/25 animate-pulse" />
            <div className="mt-3 h-8 w-72 rounded bg-[var(--color-cream)]/20 animate-pulse sm:h-9 sm:w-80" />
          </div>
          <div className="max-w-[220px] space-y-2">
            <div className="ml-auto h-3.5 w-full rounded bg-[var(--color-cream)]/10 animate-pulse" />
            <div className="ml-auto h-3.5 w-3/4 rounded bg-[var(--color-cream)]/10 animate-pulse" />
          </div>
        </div>

        {/* vision / mission */}
        <div className="grid border-b border-[var(--color-cream)]/15 sm:grid-cols-12">
          <div className="py-10 sm:col-span-7 sm:border-r sm:border-[var(--color-cream)]/15 sm:pr-10">
            <div className="h-3.5 w-14 rounded bg-[var(--color-sun)]/25 animate-pulse" />
            <div className="mt-4 space-y-2.5">
              <div className="h-7 w-full rounded bg-[var(--color-cream)]/20 animate-pulse" />
              <div className="h-7 w-full rounded bg-[var(--color-cream)]/20 animate-pulse" />
              <div className="h-7 w-2/3 rounded bg-[var(--color-cream)]/20 animate-pulse" />
            </div>
          </div>
          <div className="py-10 sm:col-span-5 sm:pl-10">
            <div className="h-3.5 w-16 rounded bg-[var(--color-sun)]/25 animate-pulse" />
            <div className="mt-4 space-y-2">
              <div className="h-5 w-full rounded bg-[var(--color-cream)]/15 animate-pulse" />
              <div className="h-5 w-full rounded bg-[var(--color-cream)]/15 animate-pulse" />
              <div className="h-5 w-full rounded bg-[var(--color-cream)]/15 animate-pulse" />
              <div className="h-5 w-1/2 rounded bg-[var(--color-cream)]/15 animate-pulse" />
            </div>
          </div>
        </div>

        {/* brand promise label */}
        <div className="border-b border-[var(--color-cream)]/15 py-3">
          <div className="h-3 w-56 rounded bg-[var(--color-cream)]/10 animate-pulse" />
        </div>

        {/* brand promise rings — 5 columns */}
        <div className="grid divide-y divide-[var(--color-cream)]/15 border-b border-[var(--color-cream)]/15 sm:grid-cols-5 sm:divide-x sm:divide-y-0">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex flex-col gap-3 mx-5 py-12 pr-6 first:pl-0 sm:pl-6"
            >
              <div className="h-4 w-6 rounded bg-[var(--color-sun)]/25 animate-pulse" />
              <div className="space-y-1.5">
                <div className="h-3.5 w-full rounded bg-[var(--color-cream)]/15 animate-pulse" />
                <div className="h-3.5 w-full rounded bg-[var(--color-cream)]/15 animate-pulse" />
                <div className="h-3.5 w-2/3 rounded bg-[var(--color-cream)]/15 animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* growth model — 4 columns */}
        <div className="grid sm:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`mx-2 py-14 pr-6 first:pl-0 sm:pl-6 ${
                i !== 3
                  ? "border-b border-[var(--color-cream)]/15 sm:border-b-0 sm:border-r"
                  : ""
              }`}
            >
              <div className="h-7 w-7 rounded bg-[var(--color-sun)]/25 animate-pulse" />
              <div className="mt-4 h-5 w-24 rounded bg-[var(--color-cream)]/20 animate-pulse" />
              <div className="mt-2 space-y-1.5">
                <div className="h-3.5 w-full rounded bg-[var(--color-cream)]/10 animate-pulse" />
                <div className="h-3.5 w-full rounded bg-[var(--color-cream)]/10 animate-pulse" />
                <div className="h-3.5 w-3/4 rounded bg-[var(--color-cream)]/10 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CoreValuesSkeleton() {
  return (
    <section className="section-green-gradient py-24 text-[var(--color-cream)]">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="h-3.5 w-32 rounded bg-[var(--color-sun)]/25 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />

        <div className="mt-4 max-w-2xl space-y-2">
          <div className="h-7 w-full rounded bg-[var(--color-cream)]/20 animate-pulse border border-[var(--color-sun)]/10 shadow-lg sm:h-8" />
          <div className="h-7 w-1/2 rounded bg-[var(--color-cream)]/20 animate-pulse border border-[var(--color-sun)]/10 shadow-lg sm:h-8" />
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i}>
              <div className="h-9 w-9 rounded bg-[var(--color-sun)]/25 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
              <div className="mt-4 h-5 w-28 rounded bg-[var(--color-cream)]/20 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
              <div className="mt-2 space-y-1.5">
                <div className="h-3.5 w-full rounded bg-[var(--color-cream)]/10 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
                <div className="h-3.5 w-full rounded bg-[var(--color-cream)]/10 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
                <div className="h-3.5 w-2/3 rounded bg-[var(--color-cream)]/10 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutCertificationsSkeleton() {
  return (
    <section className="section-green-gradient py-24 text-[var(--color-cream)]">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="h-3.5 w-32 rounded bg-[var(--color-sun)]/25 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />

        <div className="mt-4 max-w-2xl space-y-2">
          <div className="h-7 w-full rounded bg-[var(--color-cream)]/20 animate-pulse border border-[var(--color-sun)]/10 shadow-lg sm:h-8" />
          <div className="h-7 w-1/2 rounded bg-[var(--color-cream)]/20 animate-pulse border border-[var(--color-sun)]/10 shadow-lg sm:h-8" />
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-[280px] md:h-[360px] xl:h-[290px] rounded-sm border border-[var(--color-cream)]/15 bg-[var(--color-cream)]/5 p-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <span className="h-12 w-12 flex-none rounded-full border border-[var(--color-sun)]/40 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
                <span className="h-3 w-20 rounded bg-[var(--color-cream)]/15 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
              </div>
              <div className="mt-5 h-5 w-3/4 rounded bg-[var(--color-cream)]/20 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
              <div className="mt-3 space-y-1.5">
                <div className="h-3.5 w-full rounded bg-[var(--color-cream)]/10 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
                <div className="h-3.5 w-full rounded bg-[var(--color-cream)]/10 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
                <div className="h-3.5 w-2/3 rounded bg-[var(--color-cream)]/10 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClosingCtaSkeleton() {
  return (
    <section className="section-green-gradient px-6 py-24 text-center text-[var(--color-cream)] sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto h-16 w-16 rounded-full bg-[var(--color-sun)]/25 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />

        <div className="mx-auto mt-6 max-w-2xl space-y-2">
          <div className="mx-auto h-8 w-full rounded bg-[var(--color-cream)]/20 animate-pulse border border-[var(--color-cream)]/10 shadow-lg sm:h-9" />
          <div className="mx-auto h-8 w-2/3 rounded bg-[var(--color-cream)]/20 animate-pulse border border-[var(--color-cream)]/10 shadow-lg sm:h-9" />
        </div>

        <div className="mx-auto mt-8 h-11 w-40 rounded-full bg-[var(--color-sun)]/30 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
      </div>
    </section>
  );
}