// ──────────────────────────────────────────────────────────────────────────
// Pet configuration — this is the one file to edit when you swap in your own
// drawings.
//
// Everything is laid out in a 200 × 220 coordinate box (the SVG viewBox).
// To use your own PNG instead of the generated pet:
//   1. Drop it in /public/pet/ (e.g. /public/pet/pet.png). A transparent
//      background works best, and a 200:220 aspect ratio fits the box exactly.
//   2. Set PET_IMAGE below to "/pet/pet.png".
//   3. Nudge the ANCHORS so hats land on the head and items land in the hands.
//
// Accessories can also be PNGs: give an option an `image` (and width/height)
// in accessories.tsx instead of an SVG `render` function.
// ──────────────────────────────────────────────────────────────────────────

export const PET_NAME = "mimi";

/** Path to a PNG/SVG in /public to use as the pet body, or null for the generated one. */
export const PET_IMAGE: string | null = null;

export const VIEWBOX = { width: 200, height: 220 };

export type Point = { x: number; y: number };

export const ANCHORS = {
  /** Where the bottom-centre of a hat sits. */
  head: { x: 120, y: 52 },
  /** Viewer's left hand: holds the toy. */
  leftHand: { x: 44, y: 150 },
  /** Viewer's right hand: holds the food. */
  rightHand: { x: 150, y: 150 },
  /** Where food travels to while eating. */
  mouth: { x: 154, y: 96 },
} satisfies Record<string, Point>;
