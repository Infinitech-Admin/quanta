import { ArrowUpRight } from "lucide-react";
import { QSTORE_URL, INSTITUTIONAL_CONTACTS } from "./constants";

/** Green "Q STORE" shopping bag, drawn as SVG so no image file is needed. */
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
        stroke="#00a651"
        strokeWidth="11"
        strokeLinecap="round"
      />
      {/* body */}
      <rect x="6" y="46" width="128" height="140" rx="9" fill="#00a651" />
      {/* Q */}
      <text
        x="70"
        y="122"
        textAnchor="middle"
        fontSize="54"
        fontWeight="800"
        fill="#0b5a32"
        fontFamily="inherit"
      >
        Q
      </text>
      {/* STORE */}
      <text
        x="70"
        y="152"
        textAnchor="middle"
        fontSize="22"
        fontWeight="800"
        letterSpacing="0.5"
        fill="#0b5a32"
        fontFamily="inherit"
      >
        STORE
      </text>
    </svg>
  );
}

export function QStoreCta() {
  return (
    <section className="bg-[#f9f7f1] px-6 pb-10">
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 overflow-hidden rounded-[28px] bg-gradient-to-r from-[#14533a] via-[#1d5e40] to-[#4f8b5e] p-8 text-white shadow-[0_24px_50px_-20px_rgba(15,74,44,0.55)] md:min-h-[220px] md:flex-row md:items-center md:justify-between md:py-10 md:pl-[238px] md:pr-10">
        {/* soft light on the lower right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_110%,rgba(130,185,140,0.45),transparent_55%)]"
        />

        {/* decorative ring behind the bag */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-16 hidden h-[300px] w-[300px] rounded-full border border-white/15 md:block"
        />

        {/* bag */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-4px] left-[52px] top-[10px] hidden w-[140px] -rotate-6 md:block"
        >
          <QStoreBag />
        </div>

        {/* text */}
        <div className="relative max-w-xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0f7a47]">
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
            href={QSTORE_URL}
            className="inline-flex items-center justify-center gap-8 rounded-full bg-[#00a651] px-6 py-3.5 text-xs font-bold transition-colors hover:bg-[#009447]"
          >
            Visit QStore <ArrowUpRight className="h-3 w-3" />
          </a>
          <a
            href={INSTITUTIONAL_CONTACTS.email.href}
            className="inline-flex items-center justify-center gap-8 rounded-full border border-white/60 px-6 py-3.5 text-xs font-bold transition-colors hover:bg-white/10"
          >
            Talk to our team <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
