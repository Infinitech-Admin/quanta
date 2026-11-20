import Link from "next/link";
import { ContactForm } from "./contact-form";

export const metadata = {
  title: "Contact | Quanta Paper Corporation",
  description:
    "Questions about our products, business quotations, distribution opportunities, or customer support? Connect with the Quanta Paper team.",
};

export default function ContactUsPage() {
  return (
    <main className="bg-[#f8f7f3] text-[#1f2623]">
      {/* Header */}
      <header className="mx-auto max-w-6xl px-6 pt-16 md:pt-20">
        <nav aria-label="Breadcrumb" className="text-[11px] text-[#5b6460]">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          / <span aria-current="page">Contact</span>
        </nav>
        <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a651]">
          Let&rsquo;s connect
        </p>
        <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[1.02] tracking-[-0.045em] text-[#0b6b3a] md:text-7xl">
          Tell us what you need. We&rsquo;ll help you find the right team.
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-[1.9] text-[#5b6460]">
          For questions about our products, business quotations, distribution
          opportunities, or customer support, connect with our team here.
        </p>
      </header>

      {/* Info card + form */}
      <section className="mx-auto grid max-w-6xl items-stretch gap-8 px-6 py-14 md:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
        <aside className="rounded-[20px] bg-[#eff3e9] p-8 md:p-9">
          <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#1f2623] md:text-3xl">
            Let&rsquo;s make the next step simple.
          </h2>
          <p className="mt-3 max-w-md text-xs leading-[1.9] text-[#5b6460]">
            Choose your reason for reaching out and share a few details. Our
            team can direct you to the right information or person.
          </p>

          <dl className="mt-8 space-y-6 text-xs leading-[1.8] text-[#1f2623]">
            <div>
              <dt className="font-bold text-[#12392a]">Head Office</dt>
              <dd className="mt-1">
                149-A Rev. Aglipay St., Brgy. Old Zaniga,
                <br />
                Mandaluyong City, Philippines
              </dd>
            </div>
            <div>
              <dt className="font-bold text-[#12392a]">Email</dt>
              <dd className="mt-1">
                <a
                  href="mailto:wecare@quantapaper.com"
                  className="hover:underline"
                >
                  wecare@quantapaper.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-bold text-[#12392a]">Website</dt>
              <dd className="mt-1">
                <a
                  href="https://www.quantapaper.com.ph"
                  className="hover:underline"
                >
                  www.quantapaper.com.ph
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-8 border-l-4 border-[#00a651] py-1 pl-5">
            <p className="text-[11px] leading-[1.8] text-[#5b6460]">
              Your inquiry is sent securely to our team and routed to the right
              department. We typically reply within one to two business days.
            </p>
          </div>
        </aside>

        <ContactForm />
      </section>
    </main>
  );
}
