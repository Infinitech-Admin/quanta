// import { SiteHeader } from "@/components/site-header";
// import { SiteFooter } from "@/components/site-footer";
import { PageBanner } from "@/components/sections/page-banner";

export default function SustainabilityPage() {
  return (
    <>
      {/* <SiteHeader /> */}
      <main>
        <PageBanner
          eyebrow="Resources"
          title="Sustainability"
          description="Environment-friendly paper products, grown from responsible sourcing and manufacturing."
        />

        <section className="py-20 px-6 md:px-16 max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {/* TODO: replace with real initiatives */}
          {[
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
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-black/10 p-8"
            >
              <h3 className="font-serif text-lg mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </section>
      </main>
      {/* <SiteFooter /> */}
    </>
  );
}
