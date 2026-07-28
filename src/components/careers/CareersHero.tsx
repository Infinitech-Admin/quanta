const stats = [
  { label: "20+ Years", sub: "Serving Filipino homes" },
  { label: "Nationwide", sub: "Branches across the Philippines" },
  { label: "One Family", sub: "Built on care and trust" },
];

export function CareersHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--forest-deep)] px-4 pt-36 pb-20 text-[var(--paper)] sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 15%, var(--sunlight) 0%, transparent 55%), " +
            "radial-gradient(ellipse 45% 40% at 85% 75%, var(--leaf) 0%, transparent 60%), " +
            "linear-gradient(135deg, var(--forest-deep) 0%, var(--forest) 100%)",
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

      <div className="relative mx-auto max-w-4xl text-center">
        <span className="font-[var(--font-body)] text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sunlight)]">
          Careers At Quanta
        </span>
        <h1 className="mt-4 font-[var(--font-display)] text-4xl italic leading-tight sm:text-5xl">
          Be Part of the Quanta Family
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-[var(--font-body)] text-lg leading-relaxed text-[var(--paper)]/85">
          We offer opportunities to deserving individuals with the competencies
          and character of a Quanta employee — and the chance to grow, be
          recognized, and feel like family at every phase of your career.
        </p>
      </div>

      {/* Ticket-stub stat row — perforated dividers echo the paper-roll motif
          used again on the job cards below. */}
      <div className="relative mx-auto mt-14 flex max-w-3xl flex-col overflow-hidden rounded-2xl bg-[var(--paper)]/10 ring-1 ring-[var(--paper)]/15 backdrop-blur-sm sm:flex-row">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`relative flex-1 px-6 py-6 text-center ${
              i > 0
                ? "border-t border-[var(--paper)]/15 sm:border-t-0 sm:border-l sm:border-dashed"
                : ""
            }`}
          >
            <p className="font-[var(--font-display)] text-xl italic text-[var(--sunlight)] sm:text-2xl">
              {stat.label}
            </p>
            <p className="mt-1 font-[var(--font-body)] text-xs text-[var(--paper)]/70 sm:text-sm">
              {stat.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
