import Image from "next/image";
import { Wrap } from "./ui";

export function ClosingCta() {
  return (
    <section className="relative isolate overflow-hidden bg-[#00683a] py-14 text-white">
      {/* Q background image: kasing-taas ng section, naka-right, buo ang Q. Ang fade ay nasa image mismo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-10 aspect-[2576/978] h-full opacity-60 md:opacity-100"
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
        />
      </div>

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
          className="rounded-full bg-[#04472a] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#033a22]"
        >
          Explore our group of companies ↗
        </a>
      </Wrap>
    </section>
  );
}
