import type { ReactNode } from "react";

// Shared doodle palette for the pet and its things.
export const INK = "#1d1d22";
export const PALETTE = {
  blue: "#6d7fc0",
  green: "#3e6b4c",
  butter: "#efdf8a",
  plum: "#6a4b63",
  red: "#a8434b",
  cream: "#f6efe0",
  pink: "#e9a9b4",
  white: "#ffffff",
};
const P = PALETTE;
const SW = 2.6; // stroke width

const line = { stroke: INK, strokeWidth: SW, strokeLinejoin: "round", strokeLinecap: "round" } as const;

/**
 * An accessory is drawn in its own little coordinate space, centred on the
 * anchor it attaches to. Hats: (0,0) is the bottom-centre of the hat.
 * Toys and food: (0,0) is the centre of the item.
 *
 * Provide either `render` (inline SVG) or `image` (a path in /public plus a
 * size in pet-box units) to swap in your own drawing.
 */
export type Accessory = {
  id: string;
  label: string;
  render?: () => ReactNode;
  image?: { src: string; width: number; height: number };
};

export const HATS = [
  {
    id: "bow",
    label: "Hair bow",
    render: () => (
      <g transform="translate(0 3) rotate(-12)">
        {/* ribbon tails */}
        <path d="M-3 -12 L-11 1 L-6 0 L-3 4 L1 -10 Z" fill={P.red} {...line} />
        <path d="M3 -12 L11 0 L6 -1 L4 3 L-1 -10 Z" fill={P.red} {...line} />
        {/* loops */}
        <path d="M0 -14 C-8 -28 -30 -30 -30 -15 C-30 -1 -10 -3 0 -14 Z" fill={P.red} {...line} />
        <path d="M0 -14 C8 -28 30 -30 30 -15 C30 -1 10 -3 0 -14 Z" fill={P.red} {...line} />
        <path d="M-7 -17 C-13 -22 -20 -21 -23 -16 M7 -17 C13 -22 20 -21 23 -16" fill="none" {...line} strokeWidth={1.8} />
        {/* knot */}
        <rect x={-6} y={-20} width={12} height={12} rx={4} fill={P.red} {...line} className="solid" />
      </g>
    ),
  },
  {
    id: "party",
    label: "Party hat",
    render: () => (
      <g transform="rotate(8)">
        <path d="M-24 0 L0 -56 L24 0 Z" fill={P.blue} {...line} />
        <path d="M-14 -22 L14 -22 M-19 -10 L19 -10 M-8 -38 L8 -38" fill="none" stroke={P.butter} strokeWidth={5} strokeLinecap="round" />
        <path d="M-24 0 L0 -56 L24 0 Z" fill="none" {...line} />
        <circle cx={0} cy={-60} r={8} fill={P.butter} {...line} />
      </g>
    ),
  },
  {
    id: "crown",
    label: "Tiny crown",
    render: () => (
      <g>
        <path d="M-26 0 L-28 -30 L-14 -16 L0 -36 L14 -16 L28 -30 L26 0 Z" fill={P.butter} {...line} />
        <circle cx={0} cy={-10} r={4.5} fill={P.butter} {...line} strokeWidth={2.5} />
        <circle cx={-15} cy={-7} r={3} fill={P.blue} {...line} strokeWidth={2.5} />
        <circle cx={15} cy={-7} r={3} fill={P.green} {...line} strokeWidth={2.5} />
      </g>
    ),
  },
] as const satisfies readonly Accessory[];

export const TOYS = [
  {
    id: "yarn",
    label: "Ball of yarn",
    render: () => (
      <g>
        <path d="M14 10 C26 20 30 30 22 38" fill="none" {...line} strokeWidth={2.5} />
        <circle r={19} fill={P.butter} {...line} />
        <path d="M-15 -8 C-4 -4 4 6 8 17 M-17 3 C-8 6 -2 12 0 19 M-6 -18 C4 -10 12 -2 17 8 M6 -18 C0 -6 -6 4 -16 10" fill="none" {...line} strokeWidth={2} />
      </g>
    ),
  },
  {
    id: "controller",
    label: "Game controller",
    render: () => (
      <g transform="rotate(-8)">
        <path d="M-26 -10 C-26 -16 -20 -18 -12 -16 L12 -16 C20 -18 26 -16 26 -10 L30 10 C31 18 22 20 18 12 L14 6 L-14 6 L-18 12 C-22 20 -31 18 -30 10 Z" fill={P.blue} {...line} />
        <path d="M-17 -10 V-1 M-21.5 -5.5 H-12.5" fill="none" {...line} strokeWidth={3} />
        <circle cx={13} cy={-8} r={3} fill={P.red} stroke={INK} strokeWidth={2} />
        <circle cx={19} cy={-3} r={3} fill={P.butter} stroke={INK} strokeWidth={2} />
      </g>
    ),
  },
  {
    id: "paintbrush",
    label: "Paintbrush",
    render: () => (
      <g transform="rotate(-28)">
        <rect x={-4} y={-6} width={8} height={36} rx={4} fill={P.butter} {...line} />
        <rect x={-6} y={-16} width={12} height={11} rx={2} fill={P.white} {...line} />
        <path d="M-6 -16 C-8 -28 -2 -38 0 -42 C2 -38 8 -28 6 -16 Z" fill={P.green} {...line} />
      </g>
    ),
  },
] as const satisfies readonly Accessory[];

export const FOODS = [
  {
    id: "ice-cream",
    label: "Ice cream",
    render: () => (
      <g>
        <path d="M-14 -2 L0 28 L14 -2 Z" fill={P.butter} {...line} />
        <path d="M-9 8 L9 8 M-5 16 L5 16 M-6 -2 L5 22 M6 -2 L-5 22" fill="none" {...line} strokeWidth={1.8} />
        <path
          d="M-18 -1 C-24 -6 -19 -17 -10 -15 C-8 -27 8 -27 10 -15 C19 -17 24 -6 18 -1 C10 3 -10 3 -18 -1 Z"
          fill={P.pink}
          {...line}
        />
        <path d="M2 -27 C2 -32 5 -35 8 -36" fill="none" {...line} strokeWidth={2} />
        <circle cx={1} cy={-24} r={4.5} fill={P.red} {...line} strokeWidth={2.4} />
      </g>
    ),
  },
  {
    id: "milk-tea",
    label: "Milk tea",
    render: () => (
      <g>
        <path d="M4 -30 L10 -44" fill="none" stroke={INK} strokeWidth={6} strokeLinecap="round" />
        <path d="M4 -30 L10 -44" fill="none" stroke={P.butter} strokeWidth={2.5} strokeLinecap="round" />
        <path d="M-16 -22 L16 -22 L12 24 C12 26 -12 26 -12 24 Z" fill={P.cream} {...line} />
        <path d="M-19 -24 H19" fill="none" {...line} />
        {[[-6, 18], [2, 19], [8, 15], [-3, 12], [5, 9]].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r={3} fill={INK} className="solid" />
        ))}
      </g>
    ),
  },
  {
    id: "cake",
    label: "Cake",
    render: () => (
      <g>
        {/* a slice: front face, side face, frosted top */}
        <path d="M-22 -4 L12 -4 L12 18 L-22 18 Z" fill={P.cream} {...line} />
        <path d="M12 -4 L22 -14 L22 8 L12 18 Z" fill={P.cream} {...line} />
        <path d="M-22 -4 L-10 -14 L22 -14 L12 -4 Z" fill={P.white} {...line} />
        <path d="M-22 7 L12 7 L22 -3" fill="none" stroke={P.red} strokeWidth={3} strokeLinecap="round" />
        <circle cx={4} cy={-16} r={5} fill={P.red} {...line} strokeWidth={2.4} />
        <path d="M2 -21 L4 -24 L7 -21" fill="none" stroke={P.green} strokeWidth={2.2} strokeLinecap="round" />
      </g>
    ),
  },
] as const satisfies readonly Accessory[];

export type HatId = (typeof HATS)[number]["id"];
export type ToyId = (typeof TOYS)[number]["id"];
export type FoodId = (typeof FOODS)[number]["id"];

export function findAccessory(list: readonly Accessory[], id: string): Accessory {
  return list.find((a) => a.id === id) ?? list[0];
}

/** Draws an accessory (SVG or image) at its origin. */
export function AccessoryArt({ item }: { item: Accessory }) {
  if (item.image) {
    const { src, width, height } = item.image;
    return <image href={src} x={-width / 2} y={-height / 2} width={width} height={height} />;
  }
  return <Misprint>{item.render?.()}</Misprint>;
}

/**
 * Draws its children twice, Woset-style: flat colour fills nudged off-register,
 * then the ink lines on top. Shapes marked className="solid" keep their fill
 * in the line layer (eyes, seeds, dots).
 */
export function Misprint({ children, dx = 3, dy = 2.5 }: { children: ReactNode; dx?: number; dy?: number }) {
  return (
    <g>
      <g className="misprint-fill" transform={`translate(${dx} ${dy})`}>
        {children}
      </g>
      <g className="misprint-line">{children}</g>
    </g>
  );
}

/** Little standalone preview of an accessory, used next to the dropdowns. */
export function AccessoryIcon({ item, kind }: { item: Accessory; kind: "hat" | "item" }) {
  const box = kind === "hat" ? "-40 -70 80 80" : "-40 -46 80 86";
  return (
    <svg viewBox={box} className="h-10 w-10 shrink-0" aria-hidden>
      <AccessoryArt item={item} />
    </svg>
  );
}

/** Tamagotchi-style poo. */
export function PooArt() {
  return (
    <Misprint>
      <path
        d="M-20 14 C-26 14 -26 4 -18 3 C-22 -4 -14 -10 -8 -8 C-10 -16 -2 -22 4 -18 C6 -24 12 -22 10 -14 C18 -14 20 -4 14 2 C24 2 26 14 18 14 Z"
        fill="#8a6248"
        {...line}
        strokeWidth={3}
      />
      <circle cx={-6} cy={4} r={2} fill={INK} className="solid" />
      <circle cx={6} cy={4} r={2} fill={INK} className="solid" />
    </Misprint>
  );
}
