export function ContactPageSkeleton() {
  return (
    <div
      className="relative overflow-hidden bg-[var(--paper)] text-[var(--ink)] font-[var(--font-body)]"
      style={
        {
          "--ink": "#16241B",
          "--forest": "#145C36",
          "--forest-deep": "#0B3B22",
          "--forest-light": "#4c8a55",
          "--forest-vivid": "#2ea043",
          "--paper": "#F6F2E7",
          "--kraft": "#B07A32",
          "--mustard": "#dbac6f",
          "--mist": "#E4EDE6",
        } as React.CSSProperties
      }
    >
      {/* decorative glow layers — kept static, matching real page */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 25% 20%, var(--sunlight) 0%, transparent 55%), " +
            "radial-gradient(ellipse 45% 40% at 80% 70%, var(--leaf) 0%, transparent 60%), " +
            "linear-gradient(135deg, var(--forest-vivid) 0%, var(--forest) 100%)",
          opacity: 0.55,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-24 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "var(--leaf)", opacity: 0.25 }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: "var(--sunlight)", opacity: 0.2 }}
        aria-hidden
      />

      {/* ── Header ── */}
      <section className="bg-[#4c8a55] pt-8 text-[var(--paper)]">
        <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-14 sm:px-6 sm:pt-16 sm:pb-16 lg:px-8 xl:px-0 lg:pt-24 lg:pb-12">
          <div className="h-3.5 w-20 rounded bg-[var(--mustard)]/25 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
          <div className="mt-3 h-9 w-48 rounded bg-[var(--paper)]/20 animate-pulse sm:h-11 md:h-12" />
          <div className="mt-3 max-w-xl space-y-1.5">
            <div className="h-3.5 w-full rounded bg-[var(--paper)]/15 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
            <div className="h-3.5 w-2/3 rounded bg-[var(--paper)]/15 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
          </div>
        </div>
      </section>

      {/* ── Departments ── */}
      <section className="bg-[#4c8a55] px-4 pb-12 text-[var(--paper)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl border-t border-[var(--paper)]/10 pt-10" />
        <div className="mx-auto max-w-6xl">
          <div className="h-5 w-32 rounded bg-[var(--paper)]/20 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
          <div className="mb-3 mt-2 h-3.5 w-44 rounded bg-[var(--paper)]/15 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl border border-[var(--paper)]/15 bg-[var(--paper)]/[0.06] px-5 py-6"
              >
                <div className="space-y-1.5">
                  <div className="h-2.5 w-28 rounded bg-[#E3B563]/30 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
                  <div className="h-3.5 w-36 rounded bg-[var(--paper)]/20 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
                </div>
                <div className="h-4 w-4 shrink-0 rounded bg-[#E3B563]/20 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Info + Form ── */}
      <section className="px-4 py-22 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          {/* Left: Direct Lines + Locations */}
          <div className="space-y-12">
            <div>
              <div className="h-5 w-28 rounded bg-[var(--forest-light)]/25 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
              <div className="mt-4 space-y-8 border-l-2 border-[var(--forest-vivid)]/15 pl-5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-start gap-3  mt-5">
                    <div className="mt-0.8 h-4 w-4 shrink-0 rounded bg-[var(--forest-vivid)]/25 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
                    <div className="space-y-1.5">
                      <div className="h-2.5 w-24 rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
                      <div className="h-3.5 w-32 rounded bg-[var(--ink)]/15 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mt-12 h-5 w-32 rounded bg-[var(--forest-light)]/25 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
              <div className="mt-4 space-y-4">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-[var(--forest)]/10 bg-white/40 p-4"
                  >
                    <div className="mt-0.8 h-4 w-4 shrink-0 rounded bg-[var(--forest-vivid)]/25 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-36 rounded bg-[var(--forest-deep)]/15 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
                      <div className="mt-5 h-3 w-full rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
                      <div className="h-3 w-2/3 rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
                      <div className="mt-4 h-3 w-24 rounded bg-[var(--forest)]/20 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <div className="h-5 w-40 rounded bg-[var(--forest-deep)]/15 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
            <div className="mt-2 h-3.5 w-64 rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />

            <div className="mt-5 space-y-4 rounded-xl border border-[var(--forest)]/10 bg-white/40 p-6">
              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="mt-2 h-3.5 w-64 rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
                <div className="mt-2 h-3.5 w-64 rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="h-10 w-full rounded-md bg-[var(--forest)]/10 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
                <div className="h-10 w-full rounded-md bg-[var(--forest)]/10 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
              </div>
              <div className="grid grid-cols-1 gap-3 mt-5">
                <div className="mt-2 h-3.5 w-64 rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
              </div>
              <div className="grid grid-cols-1 gap-3 mt-3">
                <div className="h-10 w-full rounded-md bg-[var(--forest)]/10 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
              </div>
              <div className="grid grid-cols-1 gap-3 mt-5">
                <div className="mt-2 h-3.5 w-64 rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
              </div>
              <div className="grid grid-cols-1 gap-3 mt-3">
                <div className="h-35 w-full rounded-md bg-[var(--forest)]/10 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
              </div>

              <div className="grid grid-cols-1 gap-3 mt-8">
                <div className="h-10 w-44 px-8 py-3 rounded-md rounded-full bg-[var(--forest-vivid)]/10 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="h-5 w-40 rounded bg-[var(--forest-deep)]/15 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
          <div className="mt-4 h-[360px] w-full rounded-xl border border-[var(--forest)]/10 bg-[var(--forest)]/10 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
          <div className="mt-2 h-3 w-56 rounded bg-[var(--ink)]/10 animate-pulse border border-[var(--color-sun)]/10 shadow-lg" />
        </div>
      </section>
    </div>
  );
}
