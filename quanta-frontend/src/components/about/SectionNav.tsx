"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { nav } from "./content";
import { Wrap } from "./ui";

/**
 * Height of the site's fixed/sticky main header (logo + menu), measured live.
 * The section nav sticks right BELOW it, so the two never overlap.
 * Returns 0 if the main header is not fixed/sticky.
 */
function getHeaderOffset(): number {
  const header = document.querySelector("header");
  if (!header) return 0;
  const pos = getComputedStyle(header).position;
  if (pos !== "fixed" && pos !== "sticky") return 0;
  return Math.max(0, Math.round(header.getBoundingClientRect().bottom));
}

export function SectionNav() {
  const holderRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const heightRef = useRef(0);
  const offsetRef = useRef(0);
  const [height, setHeight] = useState(0);
  const [offset, setOffset] = useState(0);
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState<string>(nav[0][1]);

  // A clicked item is "locked" as active until the user scrolls by themselves.
  const lockedRef = useRef<string | null>(null);

  // Measure nav height (re-measure when it switches between inline and fixed).
  useEffect(() => {
    const measure = () => {
      const h = navRef.current?.offsetHeight ?? 0;
      if (h > 0) {
        heightRef.current = h;
        setHeight(h);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [stuck]);

  // Open on the section from the URL hash, if there is one.
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (id && nav.some(([, navId]) => navId === id)) setActive(id);
  }, []);

  // One scroll handler: sticky behaviour + scroll spy.
  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;

      const off = getHeaderOffset();
      offsetRef.current = off;
      setOffset(off);

      // The placeholder stays in the page, so its position tells us when to stick.
      const top = holderRef.current?.getBoundingClientRect().top ?? off + 1;
      setStuck(top <= off);

      if (lockedRef.current) return;

      const line = off + heightRef.current + 24;
      let current: string = nav[0][1];
      for (const [, id] of nav) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = nav[nav.length - 1][1];

      setActive(current);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const release = () => {
      lockedRef.current = null;
    };
    const onKey = (e: KeyboardEvent) => {
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "PageUp",
          "PageDown",
          "Home",
          "End",
          " ",
        ].includes(e.key)
      ) {
        release();
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchmove", release, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchmove", release);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    e.currentTarget.blur(); // no leftover focus outline after clicking

    lockedRef.current = id; // keep this item active
    setActive(id);

    const y =
      el.getBoundingClientRect().top +
      window.scrollY -
      (getHeaderOffset() + heightRef.current) +
      1;
    window.scrollTo({ top: y, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  const bar = (
    <nav
      ref={navRef}
      aria-label="About sections"
      style={stuck ? { top: offset } : undefined}
      className={`border-b border-black/5 bg-white/95 backdrop-blur ${
        stuck ? "fixed left-0 right-0 z-40 shadow-sm" : "relative z-40"
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
              className={`shrink-0 border-b-2 pb-1 text-[13px] font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--green,#00693e)] ${
                on
                  ? "border-[var(--green,#00693e)] text-[var(--green,#00693e)]"
                  : "border-transparent text-[var(--green,#00693e)]/70 hover:text-[var(--ink,#1a2a22)]"
              }`}
            >
              {label}
            </a>
          );
        })}
      </Wrap>
    </nav>
  );

  return (
    // The placeholder keeps the page height steady while the nav is fixed.
    <div ref={holderRef} style={{ minHeight: height }}>
      {/* When stuck, render into <body> so no parent can clip or hide it. */}
      {stuck ? createPortal(bar, document.body) : bar}
    </div>
  );
}
