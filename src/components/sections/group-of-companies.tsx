import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Factory, Store, Building2, HeartHandshake } from "lucide-react";

const companies = [
  {
    name: "Quanta Paper Corporation",
    industry: "Paper Manufacturing",
    description:
      "Produces eco-friendly tissue, napkins, and paper towels from recycled fiber, plus premium tissue from FSC-certified virgin pulp.",
    icon: Factory,
  },
  {
    name: "Quanta Paper Marketing, Inc.",
    industry: "Retail Distribution & Marketing",
    description:
      "Moves a broad portfolio — tissue, baby and feminine care, oral care, and cleaning products — through a nationwide retail network.",
    icon: Store,
  },
  {
    name: "Eco Hygiene Institutional Sales Corp.",
    industry: "Institutional Sales",
    description:
      "Supplies hotels, hospitals, and government offices with customized tissue, hygiene, and cleaning solutions.",
    icon: Building2,
  },
  {
    name: "Quanta Foundation, Inc.",
    industry: "Corporate Social Responsibility",
    description:
      "Funds school feeding and scholarship programs alongside environmental initiatives, backed by a share of Quanta's sales.",
    icon: HeartHandshake,
  },
];

export function GroupOfCompanies() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-cream)] py-24 px-6 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-[var(--color-sun)]/50 px-4 py-1 text-xs uppercase tracking-widest text-[var(--color-forest-deep)]">
            Our Network
          </span>
          <h2 className="font-serif text-3xl text-[var(--color-forest-deep)] md:text-4xl">
            Our Group of Companies
          </h2>
        </div>

        {/* connector line + node markers, giving literal shape to "network" */}
        <div className="relative">
          <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[15px] hidden h-px border-t border-dashed border-[var(--color-sun)]/50 md:block" />

          <div className="grid items-start gap-8 sm:grid-cols-2 md:grid-cols-4">
            {companies.map((company) => {
              const Icon = company.icon;
              return (
                <div key={company.name} className="flex flex-col items-center">
                  <span className="relative z-10 mb-6 h-[9px] w-[9px] rounded-full bg-[var(--color-sun)]" />

                  <div className="group flex w-full flex-col gap-3 rounded-2xl bg-[var(--color-forest-deep)] p-7 text-left shadow-lg transition-transform duration-300 hover:-translate-y-1">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-sun)]/40 bg-white/5">
                      <Icon className="h-5 w-5 text-[var(--color-sun-light)]" />
                    </span>
                    <h3 className="font-serif text-lg leading-snug text-[var(--color-cream)]">
                      {company.name}
                    </h3>
                    <p className="text-sm font-medium text-[var(--color-sun-light)]">
                      {company.industry}
                    </p>
                    <p className="text-sm leading-relaxed text-[var(--color-cream)]/70">
                      {company.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-14 text-center">
          <Button
            asChild
            variant="outline"
            className="border-[var(--color-sun)] text-[var(--color-forest-deep)] hover:bg-[var(--color-forest-deep)] hover:text-[var(--color-cream)]"
          >
            <Link href="/our-group-of-companies">See Full Group</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
