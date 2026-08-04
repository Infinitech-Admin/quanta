export function Eyebrow({
  children,
  className = "text-[var(--mustard)]",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.2em] ${className}`}
    >
      <span className="h-px w-8 bg-current" />
      {children}
    </span>
  );
}

// Rolled-paper motif: concentric arcs standing in for a cross-section of a
// paper roll — the recurring signature graphic across the page.
export function PaperRollMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      {[54, 42, 30, 18, 8].map((r, i) => (
        <circle
          key={r}
          cx="60"
          cy="60"
          r={r}
          stroke="currentColor"
          strokeOpacity={0.16 + i * 0.14}
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

export type IconShape =
  | "star"
  | "shield"
  | "heart"
  | "target"
  | "people"
  | "leaf"
  | "storefront"
  | "route"
  | "compass"
  | "cart";

const iconPaths: Record<IconShape, React.ReactNode> = {
  star: (
    <path d="M16 4l3.5 7.5L27 14l-6 5 1.5 8L16 23l-6.5 4L11 19l-6-5 7.5-2.5L16 4z" />
  ),
  shield: (
    <path d="M16 4l10 4v8c0 7-4.5 11.5-10 13-5.5-1.5-10-6-10-13V8l10-4z" />
  ),
  heart: (
    <path d="M16 26s-9-5.6-9-12.4A5.6 5.6 0 0 1 16 10a5.6 5.6 0 0 1 9 3.6C25 20.4 16 26 16 26z" />
  ),
  target: <circle cx="16" cy="16" r="10" />,
  people: (
    <path d="M9 20a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm14 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM16 27c0-3 3-5.5 7-5.5s7 2.5 7 5.5M2 27c0-3 3-5.5 7-5.5" />
  ),
  leaf: (
    <path d="M16 27C9 27 5 22 5 16a11 11 0 0 1 21.5-3M27 5c0 8-6 12-13 12" />
  ),
  storefront: (
    <path d="M5 12l1.5-6h19L27 12M6 12v13h20V12M6 12a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
  ),
  route: (
    <path
      d="M6 26c0-4 4-4 4-8s-4-4-4-8M26 6c0 4-4 4-4 8s4 4 4 8"
      strokeDasharray="1 4"
    />
  ),
  compass: (
    <>
      <circle cx="16" cy="16" r="11" />
      <path d="M20 12l-3 7-6 3 3-7 6-3z" />
    </>
  ),
  cart: (
    <path d="M5 6h3l2.4 13.2A2 2 0 0 0 12.4 21H23a2 2 0 0 0 2-1.6L27 10H8M12 26a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm10 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
  ),
};

export function Icon({
  shape,
  className = "h-9 w-9 text-[var(--forest)]",
}: {
  shape: IconShape;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[shape]}
    </svg>
  );
}

// A quiet line of pine silhouettes — used as a faint horizontal band
// behind sections that talk about sustainability / the environment.
export function TreeLine({ className = "" }: { className?: string }) {
  const tree = (x: number, h: number) => (
    <path
      key={x}
      d={`M${x} ${100} L${x} ${100 - h * 0.35} 
          L${x - h * 0.22} ${100 - h * 0.35} L${x} ${100 - h * 0.62}
          L${x - h * 0.18} ${100 - h * 0.62} L${x} ${100 - h * 0.85}
          L${x - h * 0.14} ${100 - h * 0.85} L${x} ${100 - h}
          L${x + h * 0.14} ${100 - h * 0.85} L${x + h * 0.18} ${100 - h * 0.85}
          L${x + h * 0.22} ${100 - h * 0.62} L${x + h * 0.18} ${100 - h * 0.62}
          L${x + h * 0.22} ${100 - h * 0.35} L${x} ${100 - h * 0.35} Z`}
      fill="currentColor"
    />
  );

  const positions = [
    [4, 30],
    [12, 46],
    [20, 34],
    [30, 52],
    [40, 38],
    [50, 58],
    [60, 40],
    [70, 50],
    [80, 36],
    [88, 48],
    [96, 32],
  ] as const;

  return (
    <svg
      viewBox="0 0 100 60"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      {positions.map(([x, h]) => tree(x, h))}
    </svg>
  );
}

// A loose stack of rolled tissue — cross-section circles with a torn
// leading edge, used as a quiet corner accent near product-related copy.
export function TissueStackMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 120"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="40" cy="70" r="34" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="40" cy="70" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M40 36c3 2 3 6 0 8s-3 6 0 8 3 6 0 8"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle
        cx="104"
        cy="46"
        r="24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      <circle
        cx="104"
        cy="46"
        r="7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      <circle
        cx="128"
        cy="92"
        r="16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      <circle
        cx="128"
        cy="92"
        r="5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
    </svg>
  );
}
