import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBanner } from "@/components/sections/page-banner";

// TODO: replace with real subsidiary data
const companies = [
  { name: "Company A", industry: "Paper Manufacturing" },
  { name: "Company B", industry: "Logistics & Distribution" },
  { name: "Company C", industry: "Packaging Solutions" },
];

export default function GroupOfCompaniesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageBanner
          eyebrow="Our Network"
          title="Our Group of Companies"
          description="A family of businesses working together across the paper value chain."
        />

        <section className="py-20 px-6 md:px-16 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {companies.map((company) => (
            <div
              key={company.name}
              className="rounded-2xl bg-[#0d1f14] text-white p-8 flex flex-col gap-2"
            >
              <h3 className="font-serif text-xl">{company.name}</h3>
              <p className="text-sm text-white/70">{company.industry}</p>
            </div>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
