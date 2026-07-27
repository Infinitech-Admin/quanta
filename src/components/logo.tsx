import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 shrink-0"
      aria-label="Quanta Paper Corporation home"
    >
      <span
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border",
          dark
            ? "border-cream/70 text-cream"
            : "border-forest text-forest"
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="M12 21c-4.5-2-7-5.5-7-10a7 7 0 0 1 14 0c0 4.5-2.5 8-7 10Z" />
          <path d="M12 21V9" />
          <path d="M12 13c-2-2-5-2-7-1" />
          <path d="M12 9c2-2 5-2 7-1" />
        </svg>
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-serif text-[1.05rem] tracking-wide",
            dark ? "text-cream" : "text-forest-deep"
          )}
        >
          Quanta Paper
        </span>
        <span
          className={cn(
            "text-[0.6rem] font-sans uppercase tracking-[0.25em]",
            dark ? "text-cream/60" : "text-bark/70"
          )}
        >
          Corporation
        </span>
      </span>
    </Link>
  );
}
