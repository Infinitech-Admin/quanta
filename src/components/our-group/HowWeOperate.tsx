import Link from "next/link";
import { ArrowUpRight, Factory, Leaf, LayoutGrid, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Pillar = {
  title: string;
  body: string;
  icon: LucideIcon;
};

const pillars: Pillar[] = [
  {
    title: "Technology & innovation",
    body: "We invest in top-of-the-line equipment and world-class research and development to keep our manufacturing capabilities competitive.",
    icon: Factory,
  },
  {
    title: "Environmental responsibility",
    body: "Protecting the environment is as important to our business as achieving commercial success.",
    icon: Leaf,
  },
  {
    title: "Investing in our people",
    body: "We provide a workplace that encourages both personal and professional growth.",
    icon: Users,
  },
  {
    title: "Thoughtful material choices",
    body: "We use post-consumer fiber and wastepaper to create eco-friendly tissue products, while also offering premium-grade tissue made with virgin pulp from FSC-certified, responsibly managed man-made tree farms.",
    icon: LayoutGrid,
  },
];

export function HowWeOperate() {
  return (
    <section
      aria-labelledby="how-we-operate-heading"
      className="mx-auto w-full max-w-[1160px] px-5 py-16 sm:px-6 md:py-20"
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2E7D55]">
        How we operate
      </p>
      <h2
        id="how-we-operate-heading"
        className="mt-3 text-[34px] font-extrabold leading-tight tracking-[-0.03em] text-[#16402B] sm:text-[42px]"
      >
        Built to do more, responsibly.
      </h2>

      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {pillars.map(({ title, body, icon: Icon }) => (
          <li
            key={title}
            className="rounded-[22px] border border-[#7DB89E] bg-[#FBFBF8] p-7 shadow-[0_1px_2px_rgba(22,64,43,0.04)]"
          >
            <span className="flex h-[43px] w-[43px] items-center justify-center rounded-xl bg-[#E4EFE7] text-[#1F6B47]">
              <Icon
                className="h-[18px] w-[18px]"
                strokeWidth={1.5}
                aria-hidden
              />
            </span>
            <h3 className="mt-6 text-[18px] font-semibold tracking-[-0.01em] text-[#16402B]">
              {title}
            </h3>
            <p className="mt-3 text-[13px] leading-[24px] text-[#5B6B61]">
              {body}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-9 flex flex-col gap-5 rounded-[22px] border border-[#DCE6DC] bg-[#EEF3EC] px-7 py-7 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-[22px] font-bold tracking-[-0.015em] text-[#16402B]">
            Discover the Quanta story
          </h3>
          <p className="mt-2 text-[13px] text-[#5B6B61]">
            Learn more about our history, operations, values and standards.
          </p>
        </div>
        {/* TODO: point href at the real About page route */}
        <Link
          href="/about"
          className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#046B3C] px-6 py-[18px] text-[13px] font-bold text-white transition-colors hover:bg-[#035A32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#046B3C]"
        >
          About Quanta Paper
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
