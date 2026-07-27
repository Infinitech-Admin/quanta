import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="section-green-gradient py-20 px-6 md:px-16 text-center">
      <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-cream)] max-w-2xl mx-auto mb-6">
        Let&apos;s grow something together.
      </h2>
      <p className="text-[var(--color-cream)]/70 max-w-xl mx-auto mb-8">
        Reach out for inquiries, partnerships, or product information.
      </p>
      <Button
        asChild
        className="bg-[var(--color-sun)] hover:bg-[var(--color-sun-light)] text-[var(--color-forest-deep)]"
      >
        <Link href="/contact">Get In Touch</Link>
      </Button>
    </section>
  );
}
