import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CareersCta() {
  return (
    <section className="bg-gradient-to-r from-[#e8eee3] to-[#f5f2e9] px-6 py-16 md:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0b7a43]">
            Quanta Paper Careers
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-[#1f2623] md:text-5xl">
            There&rsquo;s a place for your potential.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-[1.9] text-[#5b6460]">
            Explore the opportunities available today and find a role where you
            can make a meaningful contribution.
          </p>
        </div>
        <Link
          href="#positions"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#0b5a32] px-7 py-4 text-xs font-bold text-white transition-colors hover:bg-[#094a29] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a651] md:self-auto"
        >
          See All Open Positions <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
