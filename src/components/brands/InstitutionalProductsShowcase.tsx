"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import {
  INSTITUTIONAL_FAMILIES,
  type InstitutionalItem,
} from "./institutional-data";
import {
  CONTACT_PAGE_URL,
  INSTITUTIONAL_CONTACTS,
  INSTITUTIONAL_HERO_IMAGE,
} from "./constants";

const pad = (n: number) => String(n).padStart(2, "0");
const mailto = (subject: string) =>
  `${INSTITUTIONAL_CONTACTS.email.href}?subject=${encodeURIComponent(subject)}`;

export function InstitutionalProductsShowcase() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<{
    product: InstitutionalItem;
    itemNumber: number;
    description: string;
  } | null>(null);

  // Filter by search. Item numbers stay stable because they are precomputed.
  const families = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return INSTITUTIONAL_FAMILIES;
    return INSTITUTIONAL_FAMILIES.map((f) => ({
      ...f,
      items: f.items.filter(({ product }) =>
        product.name.toLowerCase().includes(q),
      ),
    })).filter((f) => f.items.length > 0);
  }, [query]);

  // Close the viewer with Escape
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section className="bg-[#f7f6f2] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* ── Eco Hygiene feature card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="grid items-center gap-10 rounded-[32px] bg-[#00673c] p-8 text-white shadow-[0_24px_60px_-24px_rgba(0,80,45,0.6)] md:grid-cols-[1.1fr_0.9fr] md:p-12"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
              Eco Hygiene • Institutional Sales Corp.
            </p>
            <h2 className="mt-6 text-4xl font-bold leading-[1.05] tracking-[-0.045em] md:text-5xl">
              Everyday hygiene.
              <br />
              Built for busy spaces.
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-[1.9] text-white/85">
              Explore Eco Hygiene&rsquo;s complete flyer selection—from washroom
              tissue systems and paper essentials to napkin solutions, hand soap
              dispensers, and hygiene supplies for your facility.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#institutional-range"
                className="inline-flex items-center gap-4 rounded-full bg-[#00a651] px-6 py-3.5 text-xs font-bold hover:bg-[#009447]"
              >
                Explore full range <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={mailto("Request a quotation")}
                className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3.5 text-xs font-bold hover:bg-white/10"
              >
                Request a quotation <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="relative aspect-[1.2/1] overflow-hidden rounded-[28px] border-[5px] border-white shadow-xl">
            <Image
              src={INSTITUTIONAL_HERO_IMAGE}
              alt="Eco Hygiene wall-mounted tissue dispenser in a washroom"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* ── Product range ── */}
        <div
          id="institutional-range"
          className="scroll-mt-24 rounded-[28px] bg-white p-6 shadow-[0_12px_40px_-24px_rgba(15,74,44,0.4)] md:p-10"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0f4a2c]">
            Our institutional range
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#12392a] md:text-5xl">
            Explore our institutional product range.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-[1.9] text-[#5b6460]">
            Browse Eco Hygiene products by family, or search for a specific
            item. Select any product photo to see a larger view and request
            information.
          </p>

          <label className="relative mt-7 block max-w-lg">
            <span className="sr-only">Search institutional products</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#5b6460]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search institutional products"
              className="w-full rounded-full border border-black/10 bg-white py-3.5 pl-10 pr-4 text-xs outline-none placeholder:text-[#7a847f] focus:border-[#00a651] focus:ring-2 focus:ring-[#00a651]/20"
            />
          </label>

          <div className="mt-6 border-t border-black/10" />

          {families.length === 0 && (
            <p className="py-12 text-center text-sm text-[#5b6460]">
              No products match &ldquo;{query}&rdquo;. Try a shorter search, or
              clear it to see the full range.
            </p>
          )}

          {families.map((family) => (
            <div key={family.title} className="mt-10">
              <h3 className="text-2xl font-medium tracking-[-0.02em] text-[#12392a]">
                {family.title}
              </h3>
              <p className="mt-2 max-w-2xl text-xs leading-[1.8] text-[#5b6460]">
                {family.description}
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {family.items.map(({ product, itemNumber }) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() =>
                      setSelected({
                        product,
                        itemNumber,
                        description: family.description,
                      })
                    }
                    className="group overflow-hidden rounded-2xl border border-black/[0.08] bg-white text-left transition-shadow hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a651]"
                  >
                    <div className="flex aspect-[1.1/1] items-center justify-center bg-white p-6">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-105"
                        draggable={false}
                      />
                    </div>
                    <div className="border-t border-black/5 bg-[#f6f9f6] px-4 pb-4 pt-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#0b7a43]">
                        Item {pad(itemNumber)}
                      </p>
                      <p className="mt-2 text-[13px] font-bold text-[#12392a]">
                        {product.name}
                      </p>
                      <p className="mt-5 flex items-center justify-between text-[11px] font-bold text-[#0b7a43]">
                        View details <ArrowUpRight className="h-3 w-3" />
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-10 flex flex-col gap-4 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#5b6460]">
              Product availability, variants, and specifications can be
              confirmed with Eco Hygiene Institutional Sales.
            </p>
            <a
              href={mailto("Inquiry: complete institutional range")}
              className="inline-flex items-center gap-2 self-start rounded-full bg-[#00a651] px-6 py-3.5 text-xs font-bold text-white hover:bg-[#009447] sm:self-auto"
            >
              Ask about the complete range{" "}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* ── Contacts ── */}
        <div className="grid gap-8 rounded-[28px] border border-[#cfe3d3] bg-gradient-to-br from-[#e7f2e9] to-[#f1f6ee] p-8 md:grid-cols-2 md:p-10">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0f4a2c]">
              Institutional sales contacts
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.04em] text-[#12392a] md:text-4xl">
              Let&rsquo;s find the right solution for your facility.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-[1.9] text-[#5b6460]">
              We offer customized hygiene solutions designed to align with your
              facility&rsquo;s operational needs. Reach out to request a quote
              or confirm availability.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {Object.values(INSTITUTIONAL_CONTACTS).map((c) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="group rounded-2xl border border-black/[0.08] bg-white p-4 transition-shadow hover:shadow-md"
              >
                <span className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.15em] text-[#0b7a43]">
                  {c.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
                <span className="mt-3 block break-words text-xs font-bold text-[#12392a]">
                  {c.value}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Product preview ── */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-preview-title"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f2a1d]/60 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative grid max-h-[90vh] w-full max-w-4xl gap-6 overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl sm:p-9 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-9"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close preview"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f2ea] text-[#12392a] transition-colors hover:bg-[#d6e8da] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00a651]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex aspect-square max-h-[380px] w-full items-center justify-center rounded-3xl border border-black/10 bg-white p-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selected.product.image}
                alt={selected.product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="md:pr-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0b7a43]">
                Eco Hygiene • Product preview
              </p>
              <h3
                id="product-preview-title"
                className="mt-4 text-3xl font-bold leading-tight tracking-[-0.035em] text-[#12392a] sm:text-4xl"
              >
                {selected.product.name}
              </h3>
              <p className="mt-4 text-sm leading-[1.8] text-[#5b6460]">
                {selected.description}
              </p>
              <p className="mt-5 border-l-[3px] border-[#c9dccd] pl-4 text-xs leading-[1.9] text-[#6b756f]">
                For product specifications, variants, and availability, please
                contact our institutional sales team.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {/* Goes to the contact page, with the product pre-filled */}
                <Link
                  href={`${CONTACT_PAGE_URL}?${new URLSearchParams({
                    subject: `Inquiry: ${selected.product.name}`,
                    product: selected.product.name,
                  }).toString()}`}
                  onClick={() => setSelected(null)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#00a651] px-6 py-3.5 text-xs font-bold text-white transition-colors hover:bg-[#009447]"
                >
                  Ask about this product{" "}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-full border border-[#cfe3d3] bg-[#eef5ef] px-6 py-3.5 text-xs font-bold text-[#0f4a2c] transition-colors hover:bg-[#e1eee4]"
                >
                  Continue browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
