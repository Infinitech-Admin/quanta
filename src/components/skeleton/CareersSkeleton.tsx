
export function CareersHeroSkeleton() {
  return (
    <section className="relative overflow-hidden bg-[var(--forest-deep)] px-4 py-10 text-[var(--paper)] sm:px-6 lg:px-8">
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

      <div className="relative mx-auto max-w-6xl px-6 pt-12 sm:px-10 sm:pt-18 sm:pb-12 mb-6 text-center">
        <div className="mx-auto h-3.5 w-40 rounded bg-[var(--sunlight)]/25 animate-pulse border border-[var(--sunlight)]/10 shadow-lg" />
        <div className="mx-auto mt-4 h-10 w-80 max-w-full rounded bg-[var(--paper)]/20 animate-pulse border border-[var(--paper)]/10 shadow-lg sm:h-12" />
        <div className="mx-auto mt-6 max-w-xl space-y-2">
          <div className="mx-auto h-4 w-full rounded bg-[var(--paper)]/15 animate-pulse border border-[var(--paper)]/10 shadow-lg" />
          <div className="mx-auto h-4 w-full rounded bg-[var(--paper)]/15 animate-pulse border border-[var(--paper)]/10 shadow-lg" />
          <div className="mx-auto h-4 w-2/3 rounded bg-[var(--paper)]/15 animate-pulse border border-[var(--paper)]/10 shadow-lg" />
        </div>
      </div>

      {/* stat row — 3 stats */}
      <div className="relative mx-auto flex max-w-3xl flex-col overflow-hidden rounded-2xl bg-[var(--paper)]/10 ring-1 ring-[var(--paper)]/15 backdrop-blur-sm sm:flex-row">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`relative flex-1 ml-7 px-6 py-6 text-center ${
              i > 0
                ? "border-t border-[var(--paper)]/15 sm:border-t-0 sm:border-l sm:border-dashed"
                : ""
            }`}
          >
            <div className="mx-auto h-6 w-24 rounded bg-[var(--sunlight)]/25 animate-pulse border border-[var(--sunlight)]/10 shadow-lg" />
            <div className="mx-auto mt-2 h-3 w-32 rounded bg-[var(--paper)]/15 animate-pulse border border-[var(--paper)]/10 shadow-lg" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function CareersCultureSkeleton() {
  return (
    <section className="bg-[var(--paper)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <div className="mx-auto h-3.5 w-32 rounded bg-[var(--mustard)]/25 animate-pulse border border-[var(--mustard)]/10 shadow-lg" />
          <div className="mx-auto mt-4 h-8 w-72 rounded bg-[var(--color-forest)]/15 animate-pulse border border-[var(--color-forest)]/10 shadow-lg sm:h-9" />
        </div>

        {/* 4 value cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl bg-[var(--mist)] p-6 ring-1 ring-[var(--leaf)]/15"
            >
              <div className="h-11 w-11 rounded-full bg-[var(--color-forest-light)]/40 animate-pulse border border-[var(--forest-light)]/10 shadow-lg" />
              <div className="mt-4 h-4.5 w-28 rounded bg-[var(--forest-deep)]/15 animate-pulse border border-[var(--forest-deep)]/10 shadow-lg" />
              <div className="mt-2 space-y-1.5">
                <div className="h-3 w-full rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--ink)]/10 shadow-lg" />
                <div className="h-3 w-3/4 rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--ink)]/10 shadow-lg" />
              </div>
            </div>
          ))}
        </div>

        {/* perks strip — 4 perks */}
        <div className="mt-14 rounded-2xl bg-[var(--forest-light)] px-6 py-8 sm:px-10">
          <div className="mx-auto h-3 w-40 rounded bg-[var(--sunlight)]/25 animate-pulse border border-[var(--sunlight)]/10 shadow-lg" />
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl bg-[var(--paper)]/5 px-4 py-3 ring-1 ring-[var(--paper)]/10"
              >
                <div className="h-5 w-5 shrink-0 rounded bg-[var(--sunlight)]/25 animate-pulse border border-[var(--sunlight)]/10 shadow-lg" />
                <div className="h-3.5 w-32 rounded bg-[var(--paper)]/20 animate-pulse border border-[var(--paper)]/10 shadow-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function JobListingsSkeleton() {
  return (
    <section className="bg-[var(--mist)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <div className="mx-auto h-3.5 w-36 rounded bg-[var(--mustard)]/25 animate-pulse border border-[var(--mustard)]/10 shadow-lg" />
          <div className="mx-auto mt-4 h-8 w-64 rounded bg-[var(--color-forest)]/15 animate-pulse border border-[var(--color-forest)]/10 shadow-lg sm:h-9" />
        </div>

        {/* filter tabs — All + 2 departments */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {["w-14", "w-24", "w-48"].map((w, i) => (
            <div
              key={i}
              className={`h-9 ${w} rounded-full bg-[var(--paper)] ring-1 ring-[var(--leaf)]/15 animate-pulse border border-[var(--paper)]/10 shadow-lg`}
            />
          ))}
        </div>

        {/* job cards — 6 jobs */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex overflow-hidden rounded-2xl bg-[var(--paper)] ring-1 ring-[var(--leaf)]/15"
            >
              <div className="w-3 shrink-0 bg-[var(--color-forest-light)]/40 animate-pulse border border-[var(--forest-light)]/10 shadow-lg" />
              <div className="flex flex-1 items-center justify-between gap-4 p-6">
                <div className="flex-1">
                  <div className="h-2.5 w-20 rounded bg-[var(--mustard)]/25 animate-pulse border border-[var(--mustard)]/10 shadow-lg" />
                  <div className="mt-1.5 h-4.5 w-32 rounded bg-[var(--forest-deep)]/15 animate-pulse border border-[var(--forest-deep)]/10 shadow-lg" />
                  <div className="mt-1.5 h-3 w-24 rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--ink)]/10 shadow-lg" />
                </div>
                <div className="h-5 w-5 shrink-0 rounded bg-[var(--forest)]/15 animate-pulse border border-[var(--forest)]/10 shadow-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function JoinCtaSkeleton() {
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
        <div className="mx-auto h-8 w-80 max-w-full rounded bg-[var(--paper)]/20 animate-pulse border border-[var(--paper)]/10 shadow-lg sm:h-9" />

        <div className="mx-auto mt-4 max-w-lg space-y-2">
          <div className="mx-auto h-4 w-full rounded bg-[var(--paper)]/15 animate-pulse border border-[var(--paper)]/10 shadow-lg" />
          <div className="mx-auto h-4 w-3/4 rounded bg-[var(--paper)]/15 animate-pulse border border-[var(--paper)]/10 shadow-lg" />
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="h-11 w-32 rounded-full bg-[var(--color-sun)]/30 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
          <div className="h-4 w-48 rounded bg-[var(--paper)]/15 animate-pulse border border-[var(--paper)]/10 shadow-lg" />
        </div>
      </div>
    </section>
  );
}

export function JobDetailSkeleton() {
  return (
    <>
      {/* Header banner */}
      <section className="relative isolate overflow-hidden px-4 pt-40 pb-32 sm:pt-48 sm:pb-40 text-[var(--paper)] sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--forest-deep)] via-[var(--forest)] to-[var(--forest-deep)]" />
        <div className="pointer-events-none absolute inset-0 bg-black/10" aria-hidden />

        <div className="relative mx-auto max-w-4xl">
          <div className="h-4 w-36 rounded bg-[var(--paper)]/20 animate-pulse border border-[var(--paper)]/10 shadow-lg" />
          <div className="mt-6 h-9 w-72 max-w-full rounded bg-[var(--paper)]/20 animate-pulse border border-[var(--paper)]/10 shadow-lg sm:h-10" />
          <div className="mt-3 flex items-center gap-1.5">
            <div className="h-4 w-4 rounded bg-[var(--sunlight)]/30 animate-pulse border border-[var(--sunlight)]/10 shadow-lg" />
            <div className="h-3.5 w-28 rounded bg-[var(--sunlight)]/25 animate-pulse border border-[var(--sunlight)]/10 shadow-lg" />
          </div>
        </div>
      </section>

      {/* Job content */}
      <section className="bg-[var(--paper)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-10">
            {/* Job Summary */}
            <div>
              <div className="h-6 w-36 rounded bg-[var(--forest-deep)]/15 animate-pulse border border-[var(--forest-deep)]/10 shadow-lg" />
              <div className="mt-3 space-y-1.5">
                <div className="h-3.5 w-full rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--ink)]/10 shadow-lg" />
                <div className="h-3.5 w-full rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--ink)]/10 shadow-lg" />
                <div className="h-3.5 w-2/3 rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--ink)]/10 shadow-lg" />
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="h-6 w-28 rounded bg-[var(--forest-deep)]/15 animate-pulse border border-[var(--forest-deep)]/10 shadow-lg" />
              <ul className="mt-4 space-y-3">
                {[0, 1].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--leaf)]/40 animate-pulse border border-[var(--leaf)]/10 shadow-lg" />
                    <div className="h-3.5 w-2/3 rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--leaf)]/10 shadow-lg" />
                  </li>
                ))}
              </ul>
            </div>

            {/* Work Experience */}
            <div>
              <div className="h-6 w-40 rounded bg-[var(--forest-deep)]/15 animate-pulse border border-[var(--forest-deep)]/10 shadow-lg" />
              <ul className="mt-4 space-y-3">
                {[0, 1, 2].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--leaf)]/40 animate-pulse border border-[var(--leaf)]/10 shadow-lg" />
                    <div className="h-3.5 w-3/4 rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--ink)]/10 shadow-lg" />
                  </li>
                ))}
              </ul>
            </div>

            {/* Competencies and Skills — grid layout */}
            <div>
              <div className="h-6 w-52 rounded bg-[var(--forest-deep)]/15 animate-pulse border border-[var(--forest-deep)]/10 shadow-lg" />
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--leaf)]/40 animate-pulse border border-[var(--leaf)]/10 shadow-lg" />
                    <div className="h-3.5 w-2/3 rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--ink)]/10 shadow-lg" />
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Responsibilities */}
            <div>
              <div className="h-6 w-48 rounded bg-[var(--forest-deep)]/15 animate-pulse border border-[var(--forest-deep)]/10 shadow-lg" />
              <ul className="mt-4 space-y-3">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--leaf)]/40 animate-pulse border border-[var(--leaf)]/10 shadow-lg" />
                    <div className="h-3.5 w-full rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--ink)]/10 shadow-lg" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Application form */}
          <div className="mt-16 border-t border-[var(--leaf)]/15 pt-16">
            <div className="h-6 w-56 rounded bg-[var(--forest-deep)]/15 animate-pulse border border-[var(--forest-deep)]/10 shadow-lg" />
            <div className="mt-6 space-y-4">
              <div className="h-10 w-full rounded-md bg-[var(--forest)]/10 animate-pulse border border-[var(--forest)]/10 shadow-lg" />
              <div className="h-10 w-full rounded-md bg-[var(--forest)]/10 animate-pulse border border-[var(--forest)]/10 shadow-lg" />
              <div className="h-10 w-full rounded-md bg-[var(--forest)]/10 animate-pulse border border-[var(--forest)]/10 shadow-lg" />
              <div className="h-28 w-full rounded-md bg-[var(--forest)]/10 animate-pulse border border-[var(--forest)]/10 shadow-lg" />
              <div className="h-11 w-40 rounded-md bg-[var(--color-sun)]/30 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}