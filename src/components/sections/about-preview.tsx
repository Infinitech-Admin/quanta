import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AboutPreview() {
  return (
    <section className="py-24 px-6 md:px-16 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center bg-[var(--color-cream)]">
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/about-preview.jpg" // TODO: palitan ng totoong image path
          alt="Quanta Paper Corporation facility"
          className="rounded-2xl w-full h-[360px] object-cover"
        />
      </div>
      <div>
        <span className="inline-block rounded-full border border-[var(--color-sun)]/40 px-4 py-1 text-xs tracking-widest uppercase text-[var(--color-sun)] mb-4">
          Who We Are
        </span>
        <h2 className="font-serif text-3xl md:text-4xl mb-4 text-[var(--color-forest-deep)]">
          Rooted in over two decades of care.
        </h2>
        <p className="text-[var(--color-forest-deep)]/70 mb-6 leading-relaxed">
          {/* TODO: palitan ng totoong copy */}
          We are aiming to build high-quality, affordable, and hygienic paper
          products while protecting the forests we depend on. From our first
          plant in 2003 to a growing group of companies today, our commitment to
          people and the planet remains the same.
        </p>
        <Button
          asChild
          className="bg-[var(--color-sun)] hover:bg-[var(--color-sun-light)] text-[var(--color-forest-deep)]"
        >
          <Link href="/about-us">Learn More</Link>
        </Button>
      </div>
    </section>
  );
}
