import type { ReactNode } from "react";

export const Eyebrow = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <p
    className={`text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--green)] ${className}`}
  >
    {children}
  </p>
);

const bigHeading =
  "text-4xl font-bold leading-[1.05] tracking-tight text-[var(--ink)] sm:text-5xl";

/**
 * Section header.
 * - With `title`: small eyebrow above a big title (original look).
 * - Without `title`: the eyebrow text itself becomes the big heading.
 * `copy` stays on one line on large screens.
 */
export const SectionHead = ({
  id,
  eyebrow,
  title,
  copy,
  center = false,
}: {
  id: string;
  eyebrow: string;
  title?: string;
  copy?: string;
  center?: boolean;
}) => (
  <div id={id} className={`scroll-mt-16 ${center ? "text-center" : ""}`}>
    {title ? (
      <>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className={`mt-3 ${bigHeading}`}>{title}</h2>
      </>
    ) : (
      <h2 className={bigHeading}>{eyebrow}</h2>
    )}
    {copy && (
      <p
        className={`mt-4 text-[15px] leading-7 text-[var(--ink)]/65 lg:whitespace-nowrap ${
          center ? "mx-auto" : ""
        }`}
      >
        {copy}
      </p>
    )}
  </div>
);

export const Wrap = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={`mx-auto max-w-6xl px-6 sm:px-10 ${className}`}>
    {children}
  </div>
);

export const card =
  "rounded-2xl border border-[var(--green)]/10 bg-white shadow-[0_8px_30px_-12px_rgba(0,60,30,.18)]";
export const greenBg =
  "bg-[radial-gradient(ellipse_at_30%_20%,#0b7a47,#006b3f_45%,#04512f)]";

/* ---------- Icons used by WhoWeAre ---------- */

export type IconShape = "leaf" | "roll" | "drop" | "heart";

const ICON_PATHS: Record<IconShape, ReactNode> = {
  leaf: (
    <>
      <path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z" />
      <path d="M5 19c3-4 6-7 10-9" />
    </>
  ),
  roll: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  drop: <path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z" />,
  heart: (
    <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
  ),
};

export const Icon = ({
  shape,
  className = "",
}: {
  shape: IconShape;
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    {ICON_PATHS[shape]}
  </svg>
);

export const PaperRollMark = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    stroke="currentColor"
    strokeWidth={6}
    aria-hidden="true"
    className={className}
  >
    <circle cx="100" cy="100" r="90" />
    <circle cx="100" cy="100" r="62" />
    <circle cx="100" cy="100" r="34" />
    <circle cx="100" cy="100" r="10" fill="currentColor" />
  </svg>
);
