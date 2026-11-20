import type { CSSProperties } from "react";
import { certs } from "@/components/about/content";
import { Wrap, SectionHead, Eyebrow, card } from "@/components/about/ui";

// The about-page components read these colours from CSS variables that are
// only defined on the About page, so they are set here for the home page.
const vars = {
  "--ink": "#222826",
  "--green": "#006b3f",
  "--green-deep": "#0b3b22",
  "--paper": "#f7f6f2",
} as CSSProperties;

export function Certifications() {
  return (
    <section style={vars} className="bg-[#f2f4ef] py-24 text-[var(--ink)]">
      <Wrap>
        <SectionHead
          id="certifications"
          center
          eyebrow="Certifications"
          title="Certified. Trusted. Assured."
          copy="Quality and responsible practices are central to our work, supported by the standards and certifications relevant to our products and operations."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certs.map((c) => (
            <li
              key={c.title}
              className={`${card} flex flex-col items-center p-7 text-center`}
            >
              <span className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[var(--green)] text-lg font-bold text-white ring-2 ring-[#1ea05c] ring-offset-2 ring-offset-white">
                {c.mark}
              </span>
              <Eyebrow className="mt-6 !text-[10px]">{c.tag}</Eyebrow>
              <h3 className="mt-3 text-xl font-bold text-[var(--green-deep)]">
                {c.title}
              </h3>
              <p className="mt-3 text-xs leading-6 text-[var(--ink)]/65">
                {c.copy}
              </p>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}
