import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ClosingCta() {
  return (
    <section className="relative isolate flex min-h-[300px] items-center overflow-hidden bg-[#00683a] px-4 py-12 text-white sm:px-6 md:min-h-[340px] md:py-14 lg:px-8">
      {/* Image box: kasing-taas ng section, naka-right, buo ang Q. Ang fade ay nasa image mismo. */}
      <div
        className="absolute right-0 top-0 -z-10 aspect-[2576/978] h-full opacity-60 md:opacity-100"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 35%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 35%)",
        }}
      >
        <Image
          src="/images/MAIN-BANNER-2.png"
          alt=""
          fill
          sizes="(min-width: 768px) 900px, 100vw"
          quality={90}
          className="object-cover"
          aria-hidden
        />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center md:gap-10">
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
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#04472a] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#033a22] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#00683a]"
        >
          Get in Touch
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
