/** Plume-style scalloped "cloud" edge between sections. */
export function Scallop({ color = "var(--sheet)", className = "" }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 240 20" preserveAspectRatio="none" className={`block h-6 w-full sm:h-9 ${className}`} aria-hidden>
      <path
        d="M0 20 V12 Q15 -4 30 12 Q45 -4 60 12 Q75 -4 90 12 Q105 -4 120 12 Q135 -4 150 12 Q165 -4 180 12 Q195 -4 210 12 Q225 -4 240 12 V20 Z"
        fill={color}
      />
    </svg>
  );
}

/**
 * A patch of waxy crayon colour, Woset-style, to sit slightly offset behind a
 * photo or a scrap of paper. Put it inside a `relative` parent before the
 * content. Drawn in real pixels so the texture looks the same at any size.
 */
export function CrayonBacking({ color = "var(--blue)", className = "" }: { color?: string; className?: string }) {
  return (
    <svg className={`pointer-events-none absolute inset-0 h-full w-full overflow-visible ${className}`} aria-hidden>
      <rect width="100%" height="100%" rx={30} style={{ fill: color }} filter="url(#crayon-fill)" />
    </svg>
  );
}
