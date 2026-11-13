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

export const SectionHead = ({
  id,
  eyebrow,
  title,
  copy,
  center = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  copy?: string;
  center?: boolean;
}) => (
  <div
    id={id}
    className={`scroll-mt-16 ${center ? "mx-auto text-center" : ""} max-w-3xl`}
  >
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight text-[var(--ink)] sm:text-5xl">
      {title}
    </h2>
    {copy && (
      <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[var(--ink)]/65 [text-wrap:balance] mx-auto-if-center">
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
