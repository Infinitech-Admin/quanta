import Image from "next/image";
import { greenBg } from "./ui";

export function Hero() {
  return (
    <section
      className={`relative overflow-hidden ${greenBg} pt-40 pb-10 text-white`}
    >
      {/* Image 1: background art */}
      <Image
        src="/images/MAIN-BANNER.png"
        alt=""
        fill
        priority
        aria-hidden
        className="pointer-events-none object-cover"
      />

      {/*
        Wider container (1240px) and a bigger right column.
        This is what makes the photo card large, like the reference.
      */}
      <div className="relative mx-auto grid w-full max-w-[1240px] items-center gap-12 px-6 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em]">
            About us
          </p>
          <h1 className="mt-5 text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
            A closer look at the people, purpose, and progress behind Quanta.
          </h1>
          <p className="mt-6 max-w-md text-base leading-8 text-white/85">
            We&apos;re committed to delivering quality products and exceptional
            service that stand out — trusted by customers, partners, and
            communities alike.
          </p>
          <a
            href="#history"
            className="mt-8 inline-flex rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold transition hover:bg-white/20"
          >
            Explore the Quanta story ↗
          </a>
        </div>

        {/* Image 2: photo inside the card */}
        <div className="rounded-3xl border border-white/20 bg-white/5 p-4 sm:p-5">
          <div className="relative aspect-[1.45] overflow-hidden rounded-2xl">
            <Image
              src="/images/our-group/OPS-4.png"
              alt="Quanta Paper technicians operating a converting line"
              fill
              priority
              sizes="(min-width: 1024px) 700px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
