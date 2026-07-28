import Link from "next/link";

export function JoinCta() {
  return (
    <section className="relative overflow-hidden bg-[var(--forest-deep)] px-4 py-20 text-center text-[var(--paper)] sm:px-6 lg:px-8">
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
        <h2 className="font-[var(--font-display)] text-3xl italic sm:text-4xl">
          Don&apos;t see the right fit yet?
        </h2>
        <p className="mt-4 font-[var(--font-body)] text-base text-[var(--paper)]/80">
          We&apos;re always looking for deserving individuals to grow with the
          Quanta family. Reach out and let&apos;s talk about where you could fit
          in.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--leaf)] px-8 py-3 font-[var(--font-body)] text-sm font-semibold text-[var(--forest-deep)] transition-transform hover:scale-[1.02]"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
