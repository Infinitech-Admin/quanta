import { nav } from "./content";
import { Wrap } from "./ui";

export function SectionNav() {
  return (
    <nav
      aria-label="About sections"
      className="sticky top-0 z-30 border-b border-black/5 bg-white/95 backdrop-blur"
    >
      <Wrap className="flex gap-8 overflow-x-auto py-4">
        {nav.map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            className="shrink-0 text-[13px] font-bold text-[var(--green)] hover:text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--green)]"
          >
            {label}
          </a>
        ))}
      </Wrap>
    </nav>
  );
}
