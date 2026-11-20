import type { CSSProperties } from "react";
import Image from "next/image";
import { certs } from "@/components/about/content";
import { Wrap, Eyebrow, card } from "@/components/about/ui";

// The about-page components read these colours from CSS variables that are
// only defined on the About page, so they are set here for the home page.
const vars = {
  "--ink": "#222826",
  "--green": "#006b3f",
  "--green-deep": "#0b3b22",
  "--paper": "#f7f6f2",
} as CSSProperties;

// Put these files in /public/certifications/. Keys match each cert's `mark`.
// If a cert has no logo here, the old green circle with its mark is shown.
const LOGOS: Record<string, string> = {
  ISO: "/certifications/iso-9001.png",
  GC: "/certifications/green-choice.png",
  FSC: "/certifications/fsc.png",
  HAL: "/certifications/halal-idcp.png",
};

export function Certifications() {
  return (
    <section style={vars} className="bg-[#f2f4ef] py-24 text-[var(--ink)]">
      <Wrap>
        <div id="certifications" className="scroll-mt-16 text-center">
          <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-[var(--ink)] sm:text-5xl">
            Certifications
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[var(--ink)]/65 xl:max-w-none xl:whitespace-nowrap">
            Quality and responsible practices are central to our work, supported
            by the standards and certifications relevant to our products and
            operations.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certs.map((c) => {
            const logo = LOGOS[c.mark];
            return (
              <li
                key={c.title}
                className={`${card} flex flex-col items-center p-7 text-center`}
              >
                {logo ? (
                  <div className="relative h-[88px] w-full">
                    <Image
                      src={logo}
                      alt={`${c.title} logo`}
                      fill
                      sizes="(min-width: 1024px) 240px, 50vw"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[var(--green)] text-lg font-bold text-white ring-2 ring-[#1ea05c] ring-offset-2 ring-offset-white">
                    {c.mark}
                  </span>
                )}
                <Eyebrow className="mt-6 !text-[10px]">{c.tag}</Eyebrow>
                <h3 className="mt-3 text-xl font-bold text-[var(--green-deep)]">
                  {c.title}
                </h3>
                <p className="mt-3 text-xs leading-6 text-[var(--ink)]/65">
                  {c.copy}
                </p>
              </li>
            );
          })}
        </ul>
      </Wrap>
    </section>
  );
}
