import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ClosingCta() {
  return (
    <section className="bg-[#1a4535] px-4 py-12 text-white sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center md:gap-10">
        <div className="max-w-3xl">
          {/* Single line on desktop; wraps naturally on small screens */}
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-tight tracking-[-0.03em] md:whitespace-nowrap">
            Let&rsquo;s grow something meaningful.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85">
            Looking for a business partnership, institutional hygiene solutions,
            or more information about our companies? We&rsquo;re here to
            connect.
          </p>
        </div>

        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#00A651] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#00B85A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a4535]"
        >
          Get in Touch
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
