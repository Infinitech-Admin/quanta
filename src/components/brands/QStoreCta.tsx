import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { CONTACT_PAGE_URL } from "./constants";

/** Green shopping bag, drawn as SVG. The Q-Store logo is placed on top of it. */
function QStoreBag() {
  return (
    <svg
      viewBox="0 0 140 190"
      className="h-full w-full drop-shadow-[0_14px_18px_rgba(0,0,0,0.28)]"
      aria-hidden="true"
    >
      {/* handle */}
      <path
        d="M38 52 C38 6, 102 6, 102 52"
        fill="none"
        stroke="#f9f7f1"
        strokeWidth="11"
        strokeLinecap="round"
      />
      {/* body */}
      <rect x="6" y="46" width="128" height="140" rx="9" fill="#f9f7f1" />
    </svg>
  );
}

export function QStoreCta() {
  return (
    <section className="bg-[#f9f7f1] px-6 pb-10">
      {/* isolate para hindi mapunta sa likod ng card background ang Q image */}
      <div className="relative isolate mx-auto flex max-w-6xl flex-col items-start gap-8 overflow-hidden rounded-[28px] bg-[#14533a] p-8 text-white shadow-[0_24px_50px_-20px_rgba(15,74,44,0.55)] md:min-h-[220px] md:flex-row md:items-center md:justify-between md:py-10 md:pl-[238px] md:pr-10">
        {/* Q background image: kasing-taas ng card, naka-right, buo ang Q. Ang fade ay nasa image mismo. */}
        <div
          aria-hidden="true"
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

        {/* decorative ring behind the bag */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-16 hidden h-[300px] w-[300px] rounded-full border border-white/15 md:block"
        />

        {/* bag with the Q-Store logo inside */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[56px] top-1/2 hidden h-[170px] w-[125px] -translate-y-1/2 -rotate-6 md:block"
        >
          <QStoreBag />
          <div className="absolute inset-x-[14%] top-[48%] h-[26%]">
            <Image
              src="/q-store-logo-no-bg.webp"
              alt=""
              fill
              sizes="110px"
              className="object-contain"
            />
          </div>
        </div>

        {/* text */}
        <div className="relative max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8ff0b8]">
            Your next stop
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] md:text-[44px] md:leading-[1.05]">
            Ready to browse products?
          </h2>
          <p className="mt-4 max-w-md text-sm leading-[1.8] text-white/90">
            Discover the Quanta brands that fit your needs and explore available
            products at QStore.
          </p>
        </div>

        {/* buttons */}
        <div className="relative flex w-full flex-col gap-3 md:w-[196px] md:shrink-0">
          <a
            href="https://tissuemarket.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-8 rounded-full bg-[#04472a] px-6 py-3.5 text-xs font-bold transition-colors hover:bg-[#033a22]"
          >
            Visit QStore <ArrowUpRight className="h-3 w-3" />
          </a>
          <Link
            href={CONTACT_PAGE_URL}
            className="inline-flex items-center justify-center gap-8 rounded-full bg-[#04472a] px-6 py-3.5 text-xs font-bold transition-colors hover:bg-[#033a22]"
          >
            Connect with us <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
