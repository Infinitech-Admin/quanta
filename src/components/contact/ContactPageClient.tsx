"use client";

import { Fraunces, Inter } from "next/font/google";
import Link from "next/link";
import {
  Mail,
  Phone,
  Printer,
  Factory,
  Building2,
  ExternalLink,
} from "lucide-react";
import { ContactForm } from "./contact-form";
import { motion } from "framer-motion";



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

// ————————————————————————————————————————————————————————————————
// Data
// ————————————————————————————————————————————————————————————————
const locations = [
  {
    icon: Building2,
    title: "Corporate Office",
    address:
      "149-A Rev. Aglipay St., Bgy. Old Zaniga, Mandaluyong City, Philippines",
    mapsUrl: "https://www.google.com/maps/place/Quanta+Paper+Marketing+Inc",
  },
  {
    icon: Factory,
    title: "Manufacturing Plant",
    address:
      "Ninoy Aquino Highway beside TIPCO Gate 3, Barangay, Paralayunan, Mabalacat City, Pampanga",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Ninoy+Aquino+Highway+Mabalacat+City+Pampanga",
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

// Basic embed, no API key required.
const mapEmbedSrc =
  "https://www.google.com/maps?q=Quanta+Paper+Marketing+Inc,149-A+Rev.+Aglipay+St.,Mandaluyong+City&output=embed";

export default function ContactUsPage() {
  return (
    <div
      className={`${display.variable} ${body.variable} relative overflow-hidden bg-[var(--paper)] text-[var(--ink)] font-[var(--font-body)]`}
      style={
        {
          "--ink": "#16241B",
          "--forest": "#145C36",
          "--forest-deep": "#0B3B22",
          "--forest-light": "#4c8a55",
          "--forest-vivid": "#2ea043",
          "--paper": "#F6F2E7",
          "--kraft": "#B07A32",
          "--mustard": "#dbac6f",
          "--mist": "#E4EDE6",
        } as React.CSSProperties
      }
    >
      {/* Organic "sunlight through leaves" glow layer */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 25% 20%, var(--sunlight) 0%, transparent 55%), " +
            "radial-gradient(ellipse 45% 40% at 80% 70%, var(--leaf) 0%, transparent 60%), " +
            "linear-gradient(135deg, var(--forest-vivid) 0%, var(--forest) 100%)",
          opacity: 0.55,
        }}
        aria-hidden
      />

      {/* Soft blurred leaf-shaped blobs for depth */}
      <div
        className="pointer-events-none absolute  -top-24 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "var(--leaf)", opacity: 0.25 }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: "var(--sunlight)", opacity: 0.2 }}
        aria-hidden
      />

      {/* ———————————————————————— Compact page header ———————————————————————— */}
      <section className="bg-[#4c8a55] pt-8 text-[var(--paper)]">
        <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-14 sm:px-6 sm:pt-16 sm:pb-16 lg:px-8 xl:px-0 lg:pt-24 lg:pb-12">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="font-[var(--font-display)] text-sm uppercase tracking-[0.3em] text-[var(--mustard)]">
              Contact
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h1 className="mt-3 font-[var(--font-display)] text-3xl italic sm:text-4xl md:text-5xl">
              Get In Touch
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--paper)]/70">
              Questions, feedback, or a partnership inquiry — reach us directly
              below or send a message and we&apos;ll route it to the right team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ———————————————————————— Departments, right up top since it's the info people look for first ———————————————————————— */}
      <section className="bg-[#4c8a55] px-4 pb-12 text-[var(--paper)] sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="mx-auto max-w-6xl border-t border-[var(--paper)]/10 pt-10" />
        </motion.div>
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-[var(--font-display)] text-lg">
              By Department
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="mb-3 text-sm text-[var(--paper)]/60">
              Reach the right team directly.
            </p>
          </motion.div>
          <div className="flex  items-center justify-between  items-center justify-center grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -200 }}
                whileInView={{ opacity: 1, y: 0 }}
                // transition={{ duration: 0.5 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Link
                  key={dept.label}
                  href={`mailto:${dept.email}`}
                  className="group flex items-center justify-between rounded-xl border border-[var(--paper)]/25 bg-[var(--paper)]/[0.06] px-5 py-5 transition-colors hover:border-[#E3B563] hover:bg-[var(--paper)]/[0.12]"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#E3B563]">
                      {dept.label}
                    </p>
                    <p className="mt-1 text-sm font-medium text-[var(--paper)]">
                      {dept.email}
                    </p>
                  </div>
                  <Mail className="h-4 w-4 shrink-0 text-[#E3B563] opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ———————————————————————— Info + Form, side by side ———————————————————————— */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          {/* ---- Left: Direct Lines + Locations ---- */}
          <div className="space-y-12">
            {/* Direct lines */}
            <div>
              <h2 className="font-[var(--font-display)] text-lg text-[var(--forest-light)]">
                Direct Lines
              </h2>
              <div className="mt-4 space-y-8 border-l-2 border-[var(--forest-vivid)]/25 pl-5">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--forest-vivid)]" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-[var(--ink)]/50">
                      Trunk Line
                    </p>
                    <Link
                      href="tel:+63285339250"
                      className="text-sm font-medium text-[var(--ink)] transition-colors hover:text-[var(--forest-vivid)]"
                    >
                      (632) 8533.9250
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Printer className="mt-0.5 h-4 w-4 shrink-0 text-[var(--forest-vivid)]" />
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
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--forest-vivid)]" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-[var(--ink)]/50">
                      General Inquiries
                    </p>
                    <Link
                      href="mailto:wecare@quantapaper.com"
                      className="text-sm font-medium text-[var(--ink)] transition-colors hover:text-[var(--forest-vivid)]"
                    >
                      wecare@quantapaper.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Locations */}
            <div>
              <h2 className="font-[var(--font-display)] text-lg text-[var(--forest-light)]">
                Our Locations
              </h2>
              <div className="mt-4 space-y-4">
                {locations.map((loc) => (
                  <div
                    key={loc.title}
                    className="flex items-start gap-3 rounded-xl border border-[var(--forest)]/12 bg-white/50 p-4"
                  >
                    <loc.icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--forest-vivid)]" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[var(--forest-deep)]">
                        {loc.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--ink)]/70">
                        {loc.address}
                      </p>
                      <Link
                        href={loc.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[var(--forest)] transition-colors hover:text-[var(--forest-deep)]"
                      >
                        Get Directions
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
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

      {/* ———————————————————————— Map, full width ———————————————————————— */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-[var(--font-display)] text-lg text-[var(--forest-deep)]">
            Find Us On The Map
          </h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-[var(--forest)]/12">
            <iframe
              title="Quanta Paper Corporation — Corporate Office location"
              src={mapEmbedSrc}
              width="100%"
              height="360"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-2 text-xs text-[var(--ink)]/50">
            Showing Corporate Office, Mandaluyong City.
          </p>
        </div>
      </section>
    </div>
  );
}
