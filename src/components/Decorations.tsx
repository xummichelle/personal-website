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

/** A couple of little paw prints. */
export function Paws({ className = "" }: { className?: string }) {
  const paw = (x: number, y: number, r: number, s: number) => (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <ellipse cx={0} cy={6} rx={9} ry={8} />
      <ellipse cx={-10} cy={-6} rx={3.6} ry={4.6} />
      <ellipse cx={-3.5} cy={-12} rx={3.6} ry={4.6} />
      <ellipse cx={3.5} cy={-12} rx={3.6} ry={4.6} />
      <ellipse cx={10} cy={-6} rx={3.6} ry={4.6} />
    </g>
  );
  return (
    <svg viewBox="0 0 120 80" className={className} fill="white" aria-hidden>
      {paw(30, 34, -20, 1.4)}
      {paw(88, 54, 15, 1.1)}
    </svg>
  );
}
