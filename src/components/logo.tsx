import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center shrink-0"
      aria-label="Quanta Paper Corporation home"
    >
      <span
        className={cn(
          "inline-flex items-center rounded-lg px-3 py-2 transition-colors duration-300",
          dark ? "bg-transparent" : "bg-forest-deep",
        )}
      >
        <Image
          src="/header-logo-white.svg"
          alt="Quanta Paper Corporation"
          width={200}
          height={48}
          priority
          className="h-9 w-auto"
        />
      </span>
    </Link>
  );
}
