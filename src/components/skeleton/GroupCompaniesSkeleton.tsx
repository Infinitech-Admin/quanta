export function GroupCompaniesHeroSkeleton() {
  return (
    <section className="relative overflow-hidden bg-[var(--forest-deep)] pt-24 text-[var(--paper)]">
      {/* Organic "sunlight through leaves" glow layer — decorative, kept static */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 25% 20%, var(--sunlight) 0%, transparent 55%), " +
            "radial-gradient(ellipse 45% 40% at 80% 70%, var(--forest-vivid) 0%, transparent 60%), " +
            "linear-gradient(135deg, var(--forest-light) 0%, var(--forest-vivid) 100%)",
          opacity: 0.55,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "var(--leaf)", opacity: 0.25 }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-16 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: "var(--sunlight)", opacity: 0.2 }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--paper) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 py-22 sm:px-10 sm:py-32 text-center">
        {/* eyebrow */}
        <div className="mx-auto h-3.5 w-32 rounded bg-[var(--sunlight)]/25 animate-pulse border border-[var(--sunlight)]/10 shadow-lg" />

        {/* h1 */}
        <div className="mx-auto mt-4 max-w-2xl space-y-3">
          <div className="mx-auto h-9 w-full rounded bg-[var(--paper)]/20 animate-pulse border border-[var(--paper)]/10 shadow-lg sm:h-12 md:h-16" />
          <div className="mx-auto h-9 w-2/3 rounded bg-[var(--paper)]/20 animate-pulse border border-[var(--paper)]/10 shadow-lg sm:h-12 md:h-16" />
        </div>

        {/* paragraph */}
        <div className="mx-auto mt-6 max-w-2xl space-y-2">
          <div className="mx-auto h-4 w-full rounded bg-[var(--paper)]/15 animate-pulse border border-[var(--paper)]/10 shadow-lg" />
          <div className="mx-auto h-4 w-2/3 rounded bg-[var(--paper)]/15 animate-pulse border border-[var(--paper)]/10 shadow-lg" />
        </div>
      </div>
    </section>
  );
}

export function CompanyTabsSkeleton() {
  return (
    <section className="bg-[var(--paper)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Tab triggers — 4 companies */}
        <div className="flex flex-wrap justify-center gap-2 border-b border-[var(--leaf)]/25 pb-4">
          {[
            "w-44",
            "w-48",
            "w-56",
            "w-40",
          ].map((w, i) => (
            <div
              key={i}
              className={`h-9 ${w} rounded-full bg-[var(--mist)] animate-pulse border border-[var(--color-forest)]/10 shadow-lg`}
            />
          ))}
        </div>

        {/* Tab panel — matches the default-active company (has tagline, 5 paragraphs, no bullets) */}
        <div className="mt-12">
          <div className="h-7 w-72 rounded bg-[var(--color-forest)]/15 animate-pulse border border-[var(--color-forest)]/10 shadow-lg sm:h-8" />

          <div className="mt-3 h-5 w-96 max-w-full rounded bg-[var(--forest)]/15 animate-pulse border border-[var(--forest)]/10 shadow-lg" />

          <div className="mt-6 space-y-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-1.5">
                <div className="h-3.5 w-full rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--ink)]/10 shadow-lg" />
                <div className="h-3.5 w-full rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--ink)]/10 shadow-lg" />
                <div className="h-3.5 w-2/3 rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--ink)]/10 shadow-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FoundationFundsSkeleton() {
  return (
    <section className="bg-[var(--mist)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <div className="mx-auto h-3.5 w-44 rounded bg-[var(--kraft)]/25 animate-pulse border border-[var(--kraft)]/10 shadow-lg" />
          <div className="mx-auto mt-4 h-8 w-56 rounded bg-[var(--color-forest)]/15 animate-pulse border border-[var(--color-forest)]/10 shadow-lg sm:h-9" />
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          {/* Educational Support Fund */}
          <div className="rounded-2xl bg-[var(--paper)] p-8 shadow-sm ring-1 ring-[var(--leaf)]/15">
            <div className="h-3 w-52 rounded bg-[var(--forest)]/20 animate-pulse border border-[var(--forest)]/10 shadow-lg" />
            <div className="mt-3 h-7 w-64 rounded bg-[var(--forest-deep)]/15 animate-pulse border border-[var(--forest-deep)]/10 shadow-lg" />

            {/* blockquote */}
            <div className="mt-5 space-y-2 border-l-2 border-[var(--kraft)]/40 pl-4">
              <div className="h-3.5 w-full rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--ink)]/10 shadow-lg" />
              <div className="h-3.5 w-full rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--ink)]/10 shadow-lg" />
              <div className="h-3.5 w-2/3 rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--ink)]/10 shadow-lg" />
              <div className="mt-2 h-3 w-40 rounded bg-[var(--ink)]/5 animate-pulse border border-[var(--ink)]/10 shadow-lg" />
            </div>

            {/* 3 paragraphs */}
            <div className="mt-5 space-y-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-3.5 w-full rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--ink)]/10 shadow-lg" />
                  <div className="h-3.5 w-full rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--ink)]/10 shadow-lg" />
                  <div className="h-3.5 w-3/4 rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--ink)]/10 shadow-lg" />
                </div>
              ))}
            </div>
          </div>

          {/* Environmental Care Fund */}
          <div className="rounded-2xl bg-[var(--paper)] p-8 shadow-sm ring-1 ring-[var(--leaf)]/15">
            <div className="h-3 w-52 rounded bg-[var(--forest)]/20 animate-pulse border border-[var(--forest)]/10 shadow-lg" />
            <div className="mt-3 h-7 w-56 rounded bg-[var(--forest-deep)]/15 animate-pulse border border-[var(--forest-deep)]/10 shadow-lg" />

            {/* 3 paragraphs — no blockquote in this card */}
            <div className="mt-5 space-y-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-3.5 w-full rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--ink)]/10 shadow-lg" />
                  <div className="h-3.5 w-full rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--ink)]/10 shadow-lg" />
                  <div className="h-3.5 w-3/4 rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--ink)]/10 shadow-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GroupClosingCtaSkeleton() {
  return (
    <section className="relative overflow-hidden bg-[var(--forest-light)] px-4 py-20 text-center text-[var(--paper)] sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 85% 30%, var(--leaf) 0%, transparent 55%)",
          opacity: 0.3,
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-2xl">
        <div className="mx-auto h-8 w-full rounded bg-[var(--paper)]/20 animate-pulse border border-[var(--paper)]/10 shadow-lg sm:h-9" />
        <div className="mx-auto mt-2 h-8 w-2/3 rounded bg-[var(--paper)]/20 animate-pulse border border-[var(--paper)]/10 shadow-lg sm:h-9" />

        <div className="mx-auto mt-4 max-w-lg space-y-2">
          <div className="mx-auto h-4 w-full rounded bg-[var(--paper)]/15 animate-pulse border border-[var(--paper)]/10 shadow-lg" />
          <div className="mx-auto h-4 w-3/4 rounded bg-[var(--paper)]/15 animate-pulse border border-[var(--paper)]/10 shadow-lg" />
        </div>

        <div className="mx-auto mt-8 h-11 w-36 rounded-full bg-[var(--color-sun)]/30 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
      </div>
    </section>
  );
}