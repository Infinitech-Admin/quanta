import { cn } from "@/lib/utils";

/**
 * A torn / deckled paper edge — the signature motif tying the brand
 * (paper) to the surrounding nature imagery. Sits between sections.
 * `flip` mirrors it vertically so it can cap either the top or bottom
 * of a section.
 */
export function PaperEdge({
  className,
  fill = "fill-cream",
  flip = false,
}: {
  className?: string;
  fill?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn(
        "block h-[42px] w-full sm:h-[60px]",
        flip && "rotate-180",
        className
      )}
    >
      <path
        className={fill}
        d="M0,0 L0,34 C40,50 80,10 130,26 C180,42 220,6 270,22 C320,38 360,4 410,18 C460,32 500,52 550,36 C600,20 640,4 690,20 C740,36 780,54 830,38 C880,22 920,2 970,16 C1020,30 1060,50 1110,34 C1140,24 1170,16 1200,24 L1200,0 Z"
      />
    </svg>
  );
}
