import { PaperRollMark } from "./ui";

export function ClosingCta() {
  return (
    <section className="section-green-gradient px-6 py-24 text-center text-[var(--color-cream)] sm:px-10">
      <div className="mx-auto max-w-6xl">
        <PaperRollMark className="mx-auto h-16 w-16 text-[var(--color-sun)]" />
        <h2 className="mx-auto mt-6 max-w-2xl font-[var(--font-display)] text-3xl leading-snug text-[var(--color-cream)] sm:text-4xl">
          Made from the heart of Filipinos, for the Filipino.
        </h2>
        <a
          href="/careers"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-sun)] px-7 py-3 text-sm font-semibold text-[var(--color-forest-deep)] transition-colors hover:bg-[var(--color-sun-light)]"
        >
          Work With Us
          <svg
            viewBox="0 0 16 16"
            className="h-4 w-4"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
