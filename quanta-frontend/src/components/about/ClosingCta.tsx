import { Wrap, greenBg } from "./ui";

export function ClosingCta() {
  return (
    <section className={`relative overflow-hidden ${greenBg} py-14 text-white`}>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full border-[50px] border-white/[0.06]"
      />
      <Wrap className="relative flex flex-wrap items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get to know Quanta better.
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-7 text-white/85">
            Discover the businesses behind our products, or connect with our
            team to learn how we can work together.
          </p>
        </div>
        <a
          href="/group-of-companies"
          className="rounded-full bg-[var(--paper)] px-6 py-3.5 text-sm font-bold text-[var(--green)] transition hover:bg-white"
        >
          Explore our group of companies ↗
        </a>
      </Wrap>
    </section>
  );
}
