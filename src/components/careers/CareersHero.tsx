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
        <p className="mx-auto mt-6 max-w-2xl font-[var(--font-body)] text-base leading-relaxed text-[var(--paper)]/85 sm:text-lg">
          At Quanta, we offer employment opportunities to deserving individuals
          who possess the required competencies and character expected of a
          Quanta employee. We provide professional development opportunities
          that allow you to learn and grow at every phase of your career here.
        </p>
        <p className="mx-auto mt-4 max-w-2xl font-[var(--font-body)] text-base leading-relaxed text-[var(--paper)]/85 sm:text-lg">
          When you join us, you become part of the family. You will share in
          every milestone, every achievement and every victory — and feel the
          genuine concern, care and love of your colleagues and superiors. Your
          commitment and dedication will be rewarded: you will be nurtured and
          celebrated.
        </p>
      </div>
    </section>
  );
}
