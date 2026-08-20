"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CompanyTabsSkeleton } from "@/components/skeleton/GroupCompaniesSkeleton";

type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "cards"; items: string[] }
  | { type: "heading"; eyebrow?: string; text: string }
  | { type: "image"; url: string; alt?: string };

type Company = {
  id: string;
  slug: string;
  shortName: string;
  fullName: string;
  tagline?: string | null;
  content: ContentBlock[];
};

type ApiGroupCompany = {
  id: number | string;
  slug: string;
  short_name: string;
  full_name: string;
  tagline?: string | null;
  content: ContentBlock[] | string | null;
};

const API_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8000/api/v1";

function toContentBlocks(
  value: ContentBlock[] | string | null | undefined,
): ContentBlock[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function normalize(company: ApiGroupCompany): Company {
  return {
    id: String(company.id),
    slug: company.slug,
    shortName: company.short_name,
    fullName: company.full_name,
    tagline: company.tagline ?? undefined,
    content: toContentBlocks(company.content),
  };
}

export function CompanyTabs() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchCompanies() {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}/group-companies`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Failed to load group companies (${res.status})`);
        }

        const json = await res.json();
        const raw: ApiGroupCompany[] = Array.isArray(json)
          ? json
          : (json.data ?? []);

        const normalized = raw.map(normalize);

        if (!isMounted) return;

        setCompanies(normalized);
        setActiveId(normalized[0]?.id ?? null);
      } catch (err) {
        if (!isMounted) return;
        setError(
          err instanceof Error ? err.message : "Failed to load group companies",
        );
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchCompanies();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <CompanyTabsSkeleton />;
  }

  if (error) {
    return (
      <section className="bg-[var(--paper)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-[var(--font-body)] text-sm text-red-600">
            {error}
          </p>
        </div>
      </section>
    );
  }

  if (companies.length === 0) {
    return (
      <section className="bg-[var(--paper)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-[var(--font-body)] text-sm text-[var(--ink)]/60">
            No companies to show yet.
          </p>
        </div>
      </section>
    );
  }

  const active = companies.find((c) => c.id === activeId) ?? companies[0];

  return (
    <section className="bg-[var(--paper)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Tab triggers */}
        <div
          role="tablist"
          aria-label="Our group of companies"
          className="flex flex-wrap justify-center gap-2 border-b border-[var(--leaf)]/25 pb-4"
        >
          {companies.map((company) => (
            <button
              key={company.id}
              role="tab"
              aria-selected={active.id === company.id}
              onClick={() => setActiveId(company.id)}
              className={cn(
                "rounded-full px-4 py-2 font-[var(--font-body)] text-sm font-medium tracking-wide transition-colors",
                active.id === company.id
                  ? "bg-[var(--color-forest-vivid)] text-[var(--paper)]"
                  : "text-[var(--ink)]/70 hover:bg-[var(--mist)] hover:text-[var(--forest-deep)]",
              )}
            >
              {company.shortName}
            </button>
          ))}
        </div>

        {/* Tab panel */}
        <div role="tabpanel" className="mt-12">
          <motion.div
            key={`${active.id}-title`}
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-[var(--font-display)] text-2xl italic text-[var(--color-forest)] sm:text-3xl">
              {active.fullName}
            </h2>
          </motion.div>

          {active.tagline ? (
            <motion.div
              key={`${active.id}-tagline`}
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="mt-3 font-[var(--font-display)] text-lg text-[var(--forest)]">
                {active.tagline}
              </p>
            </motion.div>
          ) : null}

          {/* Content blocks, rendered in the exact order set in the admin panel */}
          <div className="mt-6 font-[var(--font-body)] text-base leading-relaxed text-[var(--ink)]/80">
            {active.content.map((block, index) => (
              <motion.div
                key={`${active.id}-block-${index}`}
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 1,
                  delay: Math.min(index, 6) * 0.12,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.3 }}
                className={index > 0 ? "mt-6" : undefined}
              >
                {block.type === "paragraph" && <p>{block.text}</p>}

                {block.type === "bullets" && (
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {block.items.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 rounded-lg bg-[var(--mist)] px-4 py-3 font-[var(--font-body)] text-sm text-[var(--ink)]/85"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--leaf)]" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                {block.type === "cards" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {block.items.map((card) => (
                      <div
                        key={card}
                        className="rounded-lg bg-[var(--color-forest-vivid)] p-6 font-[var(--font-body)] text-sm leading-relaxed text-[var(--paper)]"
                      >
                        {card}
                      </div>
                    ))}
                  </div>
                )}

                {block.type === "heading" && (
                  <div>
                    {block.eyebrow ? (
                      <p className="font-[var(--font-body)] text-sm font-semibold uppercase tracking-wide text-[var(--kraft)]">
                        {block.eyebrow}
                      </p>
                    ) : null}
                    <h3 className="mt-1 font-[var(--font-display)] text-2xl font-semibold text-[var(--forest-deep)] sm:text-3xl">
                      {block.text}
                    </h3>
                  </div>
                )}

                {block.type === "image" && (
                  // These come from freeform admin content blocks with no
                  // known width/height (could be a logo, a screenshot, a
                  // portrait — anything an editor drops in). `next/image`
                  // needs either explicit dimensions or a `fill` parent
                  // with a fixed aspect ratio, and either would force a
                  // guessed ratio onto content we don't control, cropping
                  // or distorting it. Plain `<img>` lets each one render
                  // at its own natural size in the content flow.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={block.url}
                    alt={block.alt ?? ""}
                    loading="lazy"
                    className="w-full rounded-xl object-cover"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
