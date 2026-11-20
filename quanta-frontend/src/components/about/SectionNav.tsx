"use client";

import { useEffect, useRef, useState } from "react";
import { nav } from "./content";
import { Wrap } from "./ui";

// If your site has a fixed/sticky main header, set its height here (px)
// so this nav sits right below it. Use 0 if there is none.
const HEADER_OFFSET = 0;

export function SectionNav() {
  const holderRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [height, setHeight] = useState(0);
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState<string>(nav[0][1]);

  // Measure nav height (keeps layout from jumping when it becomes fixed).
  useEffect(() => {
    const measure = () => {
      if (navRef.current) setHeight(navRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Become fixed once the placeholder scrolls past the top.
  useEffect(() => {
    const onScroll = () => {
      const top = holderRef.current?.getBoundingClientRect().top ?? 1;
      setStuck(top <= HEADER_OFFSET);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const els = nav
      .map(([, id]) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      {
        rootMargin: `-${HEADER_OFFSET + height + 20}px 0px -60% 0px`,
        threshold: 0,
      },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [height]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const y =
      el.getBoundingClientRect().top +
      window.scrollY -
      (HEADER_OFFSET + height) +
      1;
    window.scrollTo({ top: y, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  return (
    // Placeholder keeps the page height steady while the nav is fixed.
    <div ref={holderRef} style={{ minHeight: height }}>
      <nav
        ref={navRef}
        aria-label="About sections"
        style={stuck ? { top: HEADER_OFFSET } : undefined}
        className={`z-40 border-b border-black/5 bg-white/95 backdrop-blur ${
          stuck ? "fixed left-0 right-0 shadow-sm" : "relative"
        }`}
      >
        <Wrap className="flex gap-8 overflow-x-auto py-4">
          {nav.map(([label, id]) => {
            const on = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => go(e, id)}
                aria-current={on ? "true" : undefined}
                className={`shrink-0 border-b-2 pb-1 text-[13px] font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--green)] ${
                  on
                    ? "border-[var(--green)] text-[var(--green)]"
                    : "border-transparent text-[var(--green)]/70 hover:text-[var(--ink)]"
                }`}
              >
                {label}
              </a>
            );
          })}
        </Wrap>
      </nav>
    </div>
  );
}
