import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBanner } from "@/components/sections/page-banner";
import { Button } from "@/components/ui/button";

// TODO: replace with real openings (or fetch from Laravel API)
const openings = [
  {
    title: "Production Supervisor",
    location: "Metro Manila",
    type: "Full-time",
  },
  { title: "Sales Executive", location: "Cebu", type: "Full-time" },
  {
    title: "Logistics Coordinator",
    location: "Metro Manila",
    type: "Full-time",
  },
];

export default function WorkWithUsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageBanner
          eyebrow="Careers"
          title="Work With Us"
          description="Join a team that's been growing paper — and people — for over 20 years."
        />

        <section className="py-20 px-6 md:px-16 max-w-4xl mx-auto space-y-6">
          {openings.map((job) => (
            <div
              key={job.title}
              className="flex items-center justify-between border-b border-black/10 pb-6"
            >
              <div>
                <h3 className="font-serif text-lg">{job.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {job.location} · {job.type}
                </p>
              </div>
              <Button variant="outline">Apply Now</Button>
            </div>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
