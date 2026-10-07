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
    id: "beret",
    label: "Artist beret",
    render: () => (
      <g transform="rotate(-12)">
        <path d="M-34 -6 C-36 -24 -12 -30 4 -28 C22 -27 38 -20 34 -6 C30 2 -30 4 -34 -6 Z" fill={P.red} {...line} />
        <path d="M-22 -10 C-10 -14 12 -14 24 -10" fill="none" {...line} strokeWidth={2} opacity={0.5} />
        <path d="M2 -28 L4 -38" fill="none" {...line} />
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
    id: "dumpling",
    label: "Dumpling",
    render: () => (
      <g>
        <path d="M-24 8 C-24 -12 -10 -20 0 -20 C10 -20 24 -12 24 8 C14 14 -14 14 -24 8 Z" fill={P.cream} {...line} />
        <path d="M-10 -17 C-8 -10 -8 -6 -9 -2 M0 -20 C1 -12 1 -8 0 -3 M10 -17 C8 -10 8 -6 9 -2" fill="none" {...line} strokeWidth={2.2} />
      </g>
    ),
  },
  {
    id: "strawberry",
    label: "Strawberry",
    render: () => (
      <g>
        <path d="M0 22 C-14 14 -22 0 -20 -8 C-18 -16 -8 -16 0 -12 C8 -16 18 -16 20 -8 C22 0 14 14 0 22 Z" fill={P.red} {...line} />
        <path d="M-12 -14 L-6 -22 L0 -15 L6 -22 L12 -14" fill={P.green} {...line} strokeWidth={2.8} />
        {[[-8, -2], [6, -4], [-2, 7], [9, 6], [-10, 8], [1, -6]].map(([x, y]) => (
          <ellipse key={`${x}${y}`} cx={x} cy={y} rx={1.4} ry={2} fill={P.butter} className="solid" />
        ))}
      </g>
    ),
  },
  {
    id: "boba",
    label: "Boba tea",
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
