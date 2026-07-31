"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function Logo({ dark = false }: { dark?: boolean }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      className="flex items-center shrink-0"
      aria-label="Quanta Paper Corporation home"
    >
      <span
        className={cn(
          "inline-flex items-center rounded-lg px-3 py-2 transition-colors duration-300",
          dark ? "bg-transparent" : "bg-forest-vivid",
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
    </button>
  );
}
