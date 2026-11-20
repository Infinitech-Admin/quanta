import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Commitment | Quanta Paper Corporation",
  description:
    "Our approach to business includes attention to environmental responsibility and meaningful engagement with the communities around us.",
};

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

/* Put the images in /public/images/our-commitment/ with these names
   (or change the paths). Use a wide banner, about 1014 × 392 px (≈2.6 : 1),
   with the pale background colour included in the picture. */
const PILLARS = [
  {
    title: "Environmental Responsibility",
    text: "Our approach places importance on responsible materials, resource awareness, and the environmental impact of the products we make.",
    image: "/images/our-commitment/environmental-responsibility.png",
    alt: "Illustration of a leaf growing from the ground",
    artBg: "bg-[#DDE8DC]",
  },
  {
    title: "Community Impact",
    text: "Through Quanta Foundation and other community initiatives, we aim to contribute meaningfully to the people and communities around us.",
    image: "/images/our-commitment/community-impact.png",
    alt: "Illustration of two people with a heart between them",
    artBg: "bg-[#EEECE0]",
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function SustainabilityPage() {
  return (
    <main className="overflow-x-hidden bg-[#F9F8F4] px-4 pb-16 pt-32 text-[#1b1f1c] sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:pb-24 lg:pt-44">
      <div className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="text-xs text-[#5b6660]">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          / <span aria-current="page">Our Commitment</span>
        </nav>

        <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a8f45]">
          Beyond our products
        </p>

        <h1 className="mt-4 max-w-[560px] text-[clamp(2.25rem,7vw,4.25rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[#046B3C]">
          Making care part of how we grow.
        </h1>

        <p className="mt-5 max-w-3xl text-[15px] leading-7 text-[#4a554e] sm:mt-6 sm:text-[16px] sm:leading-8">
          Our approach to business includes attention to environmental
          responsibility and meaningful engagement with the communities around
          us.
        </p>

        <ul className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2 md:gap-6 lg:mt-24">
          {PILLARS.map((pillar) => (
            <li
              key={pillar.title}
              className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white"
            >
              {/* bg colour shows while the image loads */}
              <div className={`relative h-40 sm:h-[196px] ${pillar.artBg}`}>
                <Image
                  src={pillar.image}
                  alt={pillar.alt}
                  fill
                  sizes="(min-width: 768px) 570px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="px-5 pb-7 pt-6 sm:px-7 sm:pb-8 sm:pt-8">
                <h2 className="text-xl font-bold tracking-tight text-[#1b1f1c] sm:text-2xl">
                  {pillar.title}
                </h2>
                <p className="mt-4 text-[14px] leading-6 text-[#4a554e]">
                  {pillar.text}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* TODO: the screenshot cuts off below the two cards. Add whatever
            comes next (more sections, links, CTA) once you send it. */}
      </div>
    </main>
  );
}
