"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Droplet,
  Factory,
  Heart,
  LayoutGrid,
  Leaf,
  Package,
  Plus,
  Store,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DispenserIcon, PILLARS, scrollToId } from "./pillars";
import {
  COMPANIES,
  type CardItem,
  type ChipItem,
  type Company,
  type IconKey,
  type Program,
  type Section,
} from "./companies";

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

type IconCmp = React.ComponentType<{
  className?: string;
  strokeWidth?: number;
  "aria-hidden"?: boolean;
}>;

const ICONS: Record<IconKey, IconCmp> = {
  factory: Factory,
  leaf: Leaf,
  people: Users,
  portfolio: LayoutGrid,
  store: Store,
  heart: Heart,
  check: Check,
  pallet: Package,
  droplet: Droplet,
  dispenser: DispenserIcon,
};

/* ------------------------------------------------------------------ */
/* Text helpers                                                        */
/* ------------------------------------------------------------------ */

/** **bold** and *italic* inside paragraph text. */
function renderInline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-[#16241B]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

/** Headline: text inside *asterisks* becomes the green italic second line. */
function renderHeadline(text: string): React.ReactNode[] {
  return text.split(/(\*[^*]+\*)/g).map((part, i) => {
    if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="block italic text-[#0a7a3d]">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2b7a4b]">
      {children}
    </p>
  );
}

function SectionHeading({
  eyebrow,
  heading,
}: {
  eyebrow: string;
  heading?: string;
}) {
  const bigClass =
    "text-[34px] font-extrabold leading-tight tracking-[-0.03em] text-[#16402B] sm:text-[42px]";

  // No heading: the eyebrow text itself becomes the (larger) heading.
  if (!heading) {
    return <h3 className={bigClass}>{eyebrow}</h3>;
  }

  return (
    <div>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h3 className={cn("mt-3", bigClass)}>{heading}</h3>
    </div>
  );
}

function IconTile({ icon }: { icon: IconKey }) {
  const Icon = ICONS[icon];
  return (
    <span className="flex h-[43px] w-[43px] items-center justify-center rounded-xl bg-[#E4EFE7] text-[#1F6B47]">
      <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden />
    </span>
  );
}

function StatsCard({ stats }: { stats: NonNullable<Company["stats"]> }) {
  return (
    <div className="rounded-3xl bg-[linear-gradient(135deg,#17493a_0%,#24704b_100%)] p-8 text-white shadow-xl shadow-[#17493a]/20">
      <dl className="grid grid-cols-2 gap-6">
        {stats.items.map((item) => (
          <div key={item.label}>
            <dd className="text-5xl font-medium leading-none tracking-tight">
              {item.value}
            </dd>
            <dt className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#bfe3c9]">
              {item.label}
            </dt>
          </div>
        ))}
      </dl>
      {stats.tags?.length ? (
        <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/20 pt-5 text-sm text-white/90">
          {stats.tags.map((tag, i) => (
            <React.Fragment key={tag}>
              {i > 0 ? (
                <span aria-hidden className="text-white/50">
                  /
                </span>
              ) : null}
              <span>{tag}</span>
            </React.Fragment>
          ))}
        </p>
      ) : null}
    </div>
  );
}

function ColumnsStrip({ items }: { items: { title: string; text: string }[] }) {
  return (
    <dl
      style={{ "--cols": items.length } as React.CSSProperties}
      className="grid overflow-hidden rounded-2xl border border-[#d4e0d1] bg-[#EFF6EC] sm:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
    >
      {items.map((item) => (
        <div
          key={item.title}
          className="border-t border-[#d4e0d1] px-6 py-6 first:border-t-0 sm:border-l sm:border-t-0 sm:first:border-l-0"
        >
          <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2b7a4b]">
            {item.title}
          </dt>
          <dd className="mt-3 text-[13px] leading-5 text-[#5b6660]">
            {item.text}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function InfoCards({ items }: { items: CardItem[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <li
          key={item.title}
          className="rounded-[22px] border border-[#7DB89E] bg-[#FBFBF8] p-7 shadow-[0_1px_2px_rgba(22,64,43,0.04)]"
        >
          <IconTile icon={item.icon} />
          <h4 className="mt-6 text-[18px] font-semibold tracking-[-0.01em] text-[#16402B]">
            {item.title}
          </h4>
          <p className="mt-3 text-[13px] leading-[24px] text-[#5B6B61]">
            {item.text}
          </p>
        </li>
      ))}
    </ul>
  );
}

function ChipsPanel({
  eyebrow,
  items,
}: {
  eyebrow: string;
  items: ChipItem[];
}) {
  return (
    <div className="rounded-3xl border border-[#DCE6DC] bg-[#EFF4EC] p-6 sm:p-[30px]">
      <Eyebrow>{eyebrow}</Eyebrow>
      <ul
        style={{ "--n": Math.min(items.length, 4) } as React.CSSProperties}
        className="mt-5 grid gap-3 sm:grid-cols-2 lg:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]"
      >
        {items.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <li
              key={item.text}
              className="flex items-center gap-3 rounded-xl border border-[#DCE6DC] bg-white px-4 py-[18px] text-[13px] font-bold leading-5 text-[#1B5E3F]"
            >
              <Icon
                className="h-4 w-4 shrink-0 text-[#2b7a4b]"
                strokeWidth={1.75}
                aria-hidden
              />
              <span>{item.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ProgramCard({ program }: { program: Program }) {
  const [open, setOpen] = React.useState(false);
  const panelId = React.useId();

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-[#e4e8e1] bg-white shadow-[0_20px_40px_-28px_rgba(0,0,0,0.35)]">
      <div className="relative aspect-[2/1] w-full">
        <Image
          src={program.image.src}
          alt={program.image.alt}
          fill
          sizes="(min-width: 1024px) 570px, 100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#0f3d2a]/85 via-[#0f3d2a]/20 to-transparent"
        />
        <p className="absolute bottom-4 left-5 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
          {program.label}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <Eyebrow>{program.eyebrow}</Eyebrow>
        <h3 className="mt-4 whitespace-pre-line text-[32px] font-bold leading-[1.1] tracking-[-0.03em] text-[#123d2b]">
          {program.heading}
        </h3>
        <div className="mt-5 space-y-3">
          {program.paragraphs.map((p) => (
            <p key={p} className="text-[14px] leading-7 text-[#5b6660]">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-6 border-t border-[#e4e8e1]">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
            className="flex w-full items-center justify-between gap-4 py-4 text-left text-[13px] font-bold text-[#0B6E3E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A651] focus-visible:ring-offset-2"
          >
            {program.toggleLabel}
            {open ? (
              <X className="h-4 w-4 shrink-0" aria-hidden />
            ) : (
              <Plus className="h-4 w-4 shrink-0" aria-hidden />
            )}
          </button>

          {open ? (
            <div id={panelId} className="space-y-4 pb-1">
              {program.quote ? (
                <blockquote className="border-l-4 border-[#00A651] bg-[#EFF4EC] px-5 py-4 text-[16px] leading-7 text-[#35453c]">
                  {program.quote}
                </blockquote>
              ) : null}
              {program.more.map((p) => (
                <p key={p} className="text-[13px] leading-6 text-[#5b6660]">
                  {p}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function CtaBanner({ cta }: { cta: Company["cta"] }) {
  return (
    <div className="flex flex-col items-start justify-between gap-6 rounded-[22px] border border-[#DCE6DC] bg-[#EEF3EC] px-7 py-7 sm:flex-row sm:items-center">
      <div>
        <h3 className="text-[22px] font-bold tracking-[-0.015em] text-[#16402B]">
          {cta.title}
        </h3>
        <p className="mt-2 text-[13px] text-[#5B6B61]">{cta.text}</p>
      </div>
      <Link
        href={cta.href}
        className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#046B3C] px-6 py-[18px] text-[13px] font-bold text-white transition-colors hover:bg-[#035A32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A651] focus-visible:ring-offset-2"
      >
        {cta.label}
        <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
      </Link>
    </div>
  );
}

function renderSection(section: Section, key: number) {
  switch (section.kind) {
    case "columns":
      return <ColumnsStrip key={key} items={section.items} />;
    case "chips":
      return (
        <ChipsPanel key={key} eyebrow={section.eyebrow} items={section.items} />
      );
    case "cards":
      return (
        <div key={key}>
          <SectionHeading eyebrow={section.eyebrow} heading={section.heading} />
          {section.intro ? (
            <p className="mt-3 max-w-3xl text-[14px] leading-7 text-[#5b6660]">
              {section.intro}
            </p>
          ) : null}
          <div className="mt-6">
            <InfoCards items={section.items} />
          </div>
        </div>
      );
    case "programs":
      return (
        <div key={key} className="grid items-start gap-6 md:grid-cols-2">
          {section.items.map((program) => (
            <ProgramCard key={program.label} program={program} />
          ))}
        </div>
      );
  }
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export function CompanyExplorer() {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = React.useState(COMPANIES[0].id);

  const activeIndex = Math.max(
    0,
    COMPANIES.findIndex((c) => c.id === activeId),
  );
  const active = COMPANIES[activeIndex];
  const hasAside = Boolean(active.stats || active.image);

  return (
    <>
      {/* ---------------- Meet the companies ---------------- */}
      <section
        id="companies"
        className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#2b7a4b]">
              Our Group of Companies
            </p>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COMPANIES.map((company, index) => {
              const pillar = PILLARS.find((p) => p.key === company.pillar)!;
              const isActive = company.id === active.id;

              return (
                <li key={company.id}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    aria-controls="company-detail"
                    onClick={() => {
                      setActiveId(company.id);
                      scrollToId("company-detail");
                    }}
                    className={cn(
                      "group flex h-full w-full flex-col rounded-3xl border bg-white p-5 text-left shadow-[0_10px_30px_-18px_rgba(0,0,0,0.25)] transition-all",
                      "hover:-translate-y-0.5 hover:border-[#0B8F4D]/60",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A651] focus-visible:ring-offset-2",
                      isActive
                        ? "border-[#0B8F4D] bg-[#F0F6F0] shadow-[inset_0_-3px_0_#00A651,0_14px_30px_-18px_rgba(0,0,0,0.3)]"
                        : "border-[#e4e8e1]",
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-xl font-bold text-[#b8963e]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E4EFE4] text-[#17603e]">
                        <pillar.Icon className="h-5 w-5" />
                      </span>
                    </div>

                    {company.logo ? (
                      <div className="relative mt-6 h-16 w-full">
                        {company.logo.tint ? (
                          // White/light logo: paint the logo's shape in `tint` using a CSS mask.
                          <div
                            role="img"
                            aria-label={company.logo.alt}
                            className="h-full w-full"
                            style={{
                              backgroundColor: company.logo.tint,
                              WebkitMaskImage: `url("${company.logo.src}")`,
                              maskImage: `url("${company.logo.src}")`,
                              WebkitMaskRepeat: "no-repeat",
                              maskRepeat: "no-repeat",
                              WebkitMaskSize: "contain",
                              maskSize: "contain",
                              WebkitMaskPosition: "left center",
                              maskPosition: "left center",
                            }}
                          />
                        ) : (
                          <Image
                            src={company.logo.src}
                            alt={company.logo.alt}
                            fill
                            sizes="(min-width: 1024px) 480px, 100vw"
                            className="object-contain object-left"
                            style={
                              company.logo.scale
                                ? {
                                    transform: `scale(${company.logo.scale})`,
                                    transformOrigin: "left center",
                                  }
                                : undefined
                            }
                          />
                        )}
                      </div>
                    ) : null}

                    <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#2b7a4b]">
                      {pillar.category}
                    </p>
                    <h3 className="mt-3 text-xl font-bold leading-tight tracking-tight text-[#16412e]">
                      {company.fullName}
                    </h3>
                    <p className="mt-4 text-[13px] leading-5 text-[#6b756f]">
                      {pillar.description}
                    </p>

                    <span className="mt-auto flex items-center justify-between pt-6 text-[13px] font-bold text-[#0B6E3E]">
                      Explore this company
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---------------- Selected company ---------------- */}
      <section
        id="company-detail"
        aria-live="polite"
        className="scroll-mt-24 bg-white px-4 pb-24 pt-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* Intro */}
              <div
                className={cn(
                  "grid gap-12",
                  hasAside && "items-center lg:grid-cols-[1.1fr_0.9fr]",
                )}
              >
                <div>
                  <Eyebrow>{active.fullName}</Eyebrow>
                  <h2 className="mt-6 text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.04em] text-[#123d2b]">
                    {renderHeadline(active.headline)}
                  </h2>
                  <div className="mt-8 space-y-5">
                    {active.paragraphs.map((p) => (
                      <p
                        key={p}
                        className="max-w-xl text-[15px] leading-8 text-[#5b6660]"
                      >
                        {renderInline(p)}
                      </p>
                    ))}
                  </div>
                </div>

                {active.stats ? (
                  <StatsCard stats={active.stats} />
                ) : active.image ? (
                  <div className="relative aspect-[7/5] overflow-hidden rounded-3xl shadow-[0_24px_40px_-24px_rgba(0,0,0,0.4)]">
                    <Image
                      src={active.image.src}
                      alt={active.image.alt}
                      fill
                      sizes="(min-width: 1024px) 486px, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </div>

              {/* Sections */}
              <div className="mt-14 space-y-14">
                {active.sections.map((section, i) => renderSection(section, i))}
              </div>

              {/* Closing banner */}
              <div className="mt-9">
                <CtaBanner cta={active.cta} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
