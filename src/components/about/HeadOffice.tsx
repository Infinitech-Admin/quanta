// components/about/HeadOffice.tsx
//
// "Head Office" section — two facilities (Paper Mill in Mabalacat,
// Head Office in Mandaluyong) plus the customer service contact block.
//
// Signature idea: the two locations are joined by a perforated line —
// the tear-line between tissue sheets — instead of a generic map pin
// graphic. It's the one visual detail here that's specific to a tissue
// manufacturer rather than any company with two addresses.

const LOCATIONS = [
  {
    tag: "Paper Mill",
    caption: "Where the paper is made",
    title: "Brgy. Paralayunan",
    place: "City of Mabalacat, Pampanga",
    icon: "factory",
  },
  {
    tag: "Head Office",
    caption: "Where orders are managed",
    title: "149-A Rev. Aglipay St.",
    place: "Brgy. Old Zaniga, Mandaluyong City",
    icon: "building",
  },
] as const;

export function HeadOffice() {
  return (
    <section className="relative border-t border-[var(--forest)]/10 bg-[var(--paper)] px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="max-w-xl">
          <p className="font-[var(--font-body)] text-xs font-semibold uppercase tracking-[0.2em] text-[var(--forest)]">
            Where to find us
          </p>
          <h2 className="mt-2 font-[var(--font-display)] text-3xl font-medium leading-[1.05] text-[var(--ink)] sm:text-4xl">
            Head Office
          </h2>
          <p className="mt-1.5 font-[var(--font-body)] text-sm font-medium text-[var(--ink)]/60">
            City of Mabalacat&nbsp;–&nbsp;City of Mandaluyong
          </p>
          <span className="mt-3 block h-[3px] w-14 rounded-full bg-[var(--forest)]" />
        </div>

        {/* Body: perforated route + address cards */}
        <div className="mt-8 grid gap-x-8 gap-y-6 lg:grid-cols-[140px_1fr]">
          {/* Perforated connector column */}
          <div className="hidden lg:flex lg:flex-col lg:items-center">
            <RouteNode icon="factory" />
            <PerforatedLine />
            <RouteNode icon="building" />
          </div>

          {/* Address cards + contact block */}
          <div className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {LOCATIONS.map((loc) => (
                <div
                  key={loc.tag}
                  className="group relative rounded-xl border border-[var(--forest)]/12 bg-white/40 p-4 transition-colors hover:border-[var(--forest)]/30"
                >
                  <div className="flex items-center gap-3 lg:hidden">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--forest-deep)] text-[var(--paper)]">
                      <Icon name={loc.icon} className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <p className="mt-2 font-[var(--font-body)] text-xs font-semibold uppercase tracking-wide text-[var(--kraft)] lg:mt-0">
                    {loc.tag}
                  </p>
                  <p className="mt-1 font-[var(--font-display)] text-lg font-medium leading-snug text-[var(--ink)]">
                    {loc.title}
                  </p>
                  <p className="mt-0.5 font-[var(--font-body)] text-sm text-[var(--ink)]/65">
                    {loc.place}
                  </p>
                  <p className="mt-2 font-[var(--font-body)] text-xs italic text-[var(--forest)]/70">
                    {loc.caption}
                  </p>
                </div>
              ))}
            </div>

            {/* Contact strip */}
            <div className="rounded-xl bg-[var(--forest-deep)] px-5 py-4 sm:px-6 sm:py-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--forest-vivid)]/15 text-[var(--forest-vivid)]">
                  <Icon name="phone" className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0 font-[var(--font-body)] text-sm leading-snug text-[var(--paper)]">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--forest-vivid)]">
                    Customer Service&nbsp;|&nbsp;Order Processing
                  </p>
                  <div className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
                    <p className="text-[var(--paper)]/90">
                      (02) 3404193
                      <br />
                      (02) 533-9250
                      <br />
                      (02) 533-9832
                      <br />
                      (02) 5310161 &nbsp;·&nbsp; (02) 5310160
                    </p>
                    <p className="text-[var(--paper)]/90">
                      Globe: 09175649957
                      <br />
                      Sun: 09228796191
                      <br />
                      Mobile: 09328655843
                      <br />
                      Fax: (02) 533 7295
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RouteNode({ icon }: { icon: "factory" | "building" }) {
  return (
    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--paper)] bg-[var(--forest)] text-[var(--paper)] shadow-sm shadow-[var(--forest-deep)]/20">
      <Icon name={icon} className="h-4 w-4" />
    </div>
  );
}

// The tear-line: a dashed spine with a small punched "hole" at the
// midpoint, the way a roll of tissue perforates between sheets.
function PerforatedLine() {
  return (
    <div className="relative my-1 flex-1" style={{ minHeight: 90 }}>
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, var(--forest) 0, var(--forest) 6px, transparent 6px, transparent 14px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[var(--forest)]/50 bg-[var(--paper)]"
      />
    </div>
  );
}

function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: "factory" | "building" | "phone";
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  if (name === "factory") {
    return (
      <svg {...common}>
        <path d="M3 21V10l6 4v-4l6 4v-4l6 4v7H3Z" />
        <path d="M7 21v-4M12 21v-4M17 21v-4" />
        <path d="M17 6c0-1.5 1-2 1-3.5" />
      </svg>
    );
  }
  if (name === "building") {
    return (
      <svg {...common}>
        <rect x="5" y="3" width="14" height="18" rx="1" />
        <path d="M9 7h.01M12 7h.01M15 7h.01M9 11h.01M12 11h.01M15 11h.01M9 15h.01M12 15h.01M15 15h.01" />
        <path d="M9 21v-3h6v3" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M3 5c0 8.5 7.5 16 16 16l2-4-5-3-2 2c-2-1-4-3-5-5l2-2-3-5-4 1Z" />
    </svg>
  );
}
