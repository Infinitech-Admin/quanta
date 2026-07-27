"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNav } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-cream/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-cream/80"
          : "bg-gradient-to-b from-forest-deep/70 via-forest-deep/20 to-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo dark={!scrolled} />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors",
                scrolled
                  ? "text-forest-deep hover:text-forest-light"
                  : "text-cream hover:text-sun-light"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button variant={scrolled ? "default" : "sun"} size="sm" asChild>
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>

        {/* Mobile nav trigger */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                  scrolled
                    ? "text-forest-deep hover:bg-forest/10"
                    : "text-cream hover:bg-cream/10"
                )}
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:w-80">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-forest-deep transition-colors hover:bg-forest/10"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 border-t border-border pt-6">
                <Button className="w-full" asChild>
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    Get In Touch
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
