export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--forest-deep)] px-4 pt-36 pb-20 text-[var(--paper)] sm:px-6 lg:px-8">
      {/* Organic "sunlight through leaves" glow layer */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 25% 20%, var(--sunlight) 0%, transparent 55%), " +
            "radial-gradient(ellipse 45% 40% at 80% 70%, var(--leaf) 0%, transparent 60%), " +
            "linear-gradient(135deg, var(--forest-deep) 0%, var(--forest) 100%)",
          opacity: 0.55,
        }}
        aria-hidden
      />

      {/* Soft blurred leaf-shaped blobs for depth */}
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

      {/* Fine dot texture on top, dialed down so it reads as grain, not a grid */}
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
          Who We Are
        </span>
        <h1 className="mt-4 font-[var(--font-display)] text-4xl italic leading-tight sm:text-5xl">
          Our Group of Companies
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-[var(--font-body)] text-base leading-relaxed text-[var(--paper)]/85 sm:text-lg">
          Four companies, one guiding principle: to build a sustainable future
          through the triple bottom line of Profit, People, and Planet.
        </p>
      </div>
    </section>
  );
}
