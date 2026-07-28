import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Link from "next/link";
import { Mail, Phone, Printer, Factory, Building2 } from "lucide-react";
import { ContactForm } from "./contact-form";

// ————————————————————————————————————————————————————————————————
// Type system
// Fraunces: warm display serif for headlines only.
// Inter: body workhorse for everything people actually read.
// ————————————————————————————————————————————————————————————————
const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Contact Us | Quanta Paper Corporation",
  description:
    "Get in touch with Quanta Paper Corporation — trunk line, fax, office locations, and department contacts for customer care, sales, credit, and HR.",
};

// ————————————————————————————————————————————————————————————————
// Data
// ————————————————————————————————————————————————————————————————
const locations = [
  {
    icon: Building2,
    title: "Corporate Office",
    address:
      "149-A Rev. Aglipay St., Bgy. Old Zaniga, Mandaluyong City, Philippines",
  },
  {
    icon: Factory,
    title: "Manufacturing Plant",
    address:
      "Ninoy Aquino Highway beside TIPCO Gate 3, Barangay, Paralayunan, Mabalacat City, Pampanga",
  },
];

const departments = [
  { label: "Customer Care", email: "wecare@quantapaper.com" },
  { label: "Credit and Collection", email: "cnc@quantapaper.com" },
  { label: "Consumer Sales", email: "salesadmin@quantapaper.com" },
  {
    label: "Institutional Sales",
    email: "quanta.institutionals@quantapaper.com",
  },
  { label: "Human Resources", email: "human.resources@quantapaper.com" },
];

export default function ContactUsPage() {
  return (
    <main
      className={`${display.variable} ${body.variable} bg-[var(--paper)] text-[var(--ink)] font-[var(--font-body)]`}
      style={
        {
          "--ink": "#16241B",
          "--forest": "#145C36",
          "--forest-deep": "#0B3B22",
          "--paper": "#F6F2E7",
          "--kraft": "#B07A32",
          "--mist": "#E4EDE6",
        } as React.CSSProperties
      }
    >
      {/* ———————————————————————— Compact page header ———————————————————————— */}
      <section className="bg-[var(--forest-deep)] px-4 py-14 text-[var(--paper)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="font-[var(--font-display)] text-sm uppercase tracking-[0.3em] text-[var(--kraft)]">
            Contact
          </p>
          <h1 className="mt-3 font-[var(--font-display)] text-4xl italic sm:text-5xl">
            Get In Touch
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--paper)]/70">
            Questions, feedback, or a partnership inquiry — reach us directly
            below or send a message and we&apos;ll route it to the right team.
          </p>
        </div>
      </section>

      {/* ———————————————————————— Info + Form, side by side ———————————————————————— */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          {/* ---- Left: everything you need to know, one column ---- */}
          <div className="space-y-10">
            {/* Direct lines */}
            <div>
              <h2 className="font-[var(--font-display)] text-lg text-[var(--forest-deep)]">
                Direct Lines
              </h2>
              <div className="mt-4 space-y-4 border-l-2 border-[var(--forest)]/15 pl-5">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--forest)]" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-[var(--ink)]/50">
                      Trunk Line
                    </p>
                    <Link
                      href="tel:+63285339250"
                      className="text-sm font-medium text-[var(--ink)] transition-colors hover:text-[var(--forest)]"
                    >
                      (632) 8533.9250
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Printer className="mt-0.5 h-4 w-4 shrink-0 text-[var(--forest)]" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-[var(--ink)]/50">
                      Fax
                    </p>
                    <p className="text-sm font-medium text-[var(--ink)]">
                      (632) 8533.7295
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--forest)]" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-[var(--ink)]/50">
                      General Inquiries
                    </p>
                    <Link
                      href="mailto:wecare@quantapaper.com"
                      className="text-sm font-medium text-[var(--ink)] transition-colors hover:text-[var(--forest)]"
                    >
                      wecare@quantapaper.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Locations */}
            <div>
              <h2 className="font-[var(--font-display)] text-lg text-[var(--forest-deep)]">
                Our Locations
              </h2>
              <div className="mt-4 space-y-4">
                {locations.map((loc) => (
                  <div
                    key={loc.title}
                    className="flex items-start gap-3 rounded-xl border border-[var(--forest)]/12 bg-white/50 p-4"
                  >
                    <loc.icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--forest)]" />
                    <div>
                      <p className="text-sm font-semibold text-[var(--forest-deep)]">
                        {loc.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--ink)]/70">
                        {loc.address}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Departments */}
            <div>
              <h2 className="font-[var(--font-display)] text-lg text-[var(--forest-deep)]">
                By Department
              </h2>
              <ul className="mt-4 divide-y divide-[var(--forest)]/10 overflow-hidden rounded-xl border border-[var(--forest)]/12 bg-white/50">
                {departments.map((dept) => (
                  <li key={dept.label}>
                    <Link
                      href={`mailto:${dept.email}`}
                      className="flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-[var(--mist)]"
                    >
                      <span className="text-[var(--ink)]/70">{dept.label}</span>
                      <span className="font-medium text-[var(--forest-deep)]">
                        {dept.email}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ---- Right: the form ---- */}
          <div>
            <h2 className="font-[var(--font-display)] text-lg text-[var(--forest-deep)]">
              Send A Message
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/60">
              We typically reply within one to two business days.
            </p>
            <div className="mt-5">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
