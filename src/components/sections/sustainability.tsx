import Link from "next/link";
import { Button } from "@/components/ui/button";

// TODO: palitan ng totoong initiatives niyo
const initiatives = [
  {
    title: "Responsible Sourcing",
    text: "Raw materials sourced from certified, sustainably managed forests.",
  },
  {
    title: "Waste Reduction",
    text: "Recycling programs across all production facilities.",
  },
  {
    title: "Community Impact",
    text: "Partnerships with local communities to support reforestation.",
  },
];

export function Sustainability() {
  return (
    <section className="paper-grain py-24 px-6 md:px-16 bg-[var(--color-cream)]">
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block rounded-full border border-[var(--color-sun)]/40 px-4 py-1 text-xs tracking-widest uppercase text-[var(--color-sun)] mb-4">
            Resources
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-forest-deep)]">
            Made With the Forest in Mind
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {initiatives.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white border border-[var(--color-forest-light)]/25 p-8"
            >
              <h3 className="font-serif text-lg mb-3 text-[var(--color-forest-deep)]">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--color-forest-deep)]/70">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            className="border-[var(--color-sun)] text-[var(--color-forest-deep)] hover:bg-[var(--color-forest-deep)] hover:text-[var(--color-cream)]"
          >
            <Link href="/sustainability">Learn About Our Practices</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
