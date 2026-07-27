import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBanner } from "@/components/sections/page-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageBanner
          eyebrow="Get In Touch"
          title="Let's Talk"
          description="Reach out for inquiries, partnerships, or product information."
        />

        <section className="py-20 px-6 md:px-16 max-w-3xl mx-auto space-y-6">
          {/* TODO: wire up to Laravel API endpoint */}
          <form className="space-y-4">
            <Input placeholder="Full Name" />
            <Input placeholder="Email Address" type="email" />
            <Input placeholder="Subject" />
            <Textarea placeholder="Message" rows={5} />
            <Button type="submit" className="bg-amber-500 hover:bg-amber-600">
              Send Message
            </Button>
          </form>

          <div className="pt-8 border-t border-black/10 text-sm text-muted-foreground">
            <p>Quanta Paper Corporation, Metro Manila, Philippines</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
