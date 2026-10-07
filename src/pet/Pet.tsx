"use client";

import { useId, type CSSProperties, type ReactNode } from "react";
import { ANCHORS, PET_IMAGE, VIEWBOX } from "./config";
import { AccessoryArt, FOODS, HATS, INK, Misprint, PALETTE, TOYS, findAccessory, type Accessory } from "./accessories";
import type { Look, PetAction } from "./PetProvider";

const WHITE = PALETTE.white;
const SKIN = PALETTE.blue;
const line = { stroke: INK, strokeWidth: 3, strokeLinejoin: "round", strokeLinecap: "round" } as const;

/** An item that was just changed in the carousel: slides `from` out and the new item in. */
export type Swap = { slot: keyof Look; from: string; dir: 1 | -1; key: number };

const LISTS: Record<keyof Look, readonly Accessory[]> = { hat: HATS, toy: TOYS, food: FOODS };

/** Where items fly in from / out to (pet-box units). Hats swoop sideways, held items scroll vertically. */
const SLIDE: Record<keyof Look, (dir: 1 | -1) => { from: [number, number]; to: [number, number] }> = {
  hat: (d) => ({ from: [d * 130, -40], to: [-d * 130, -40] }),
  toy: (d) => ({ from: [0, -d * 55], to: [0, d * 55] }),
  food: (d) => ({ from: [0, -d * 55], to: [0, d * 55] }),
};

type Props = {
  look: Look;
  action: PetAction | null;
  swap?: Swap | null;
  walking?: boolean;
  sad?: boolean;
  className?: string;
};

/**
 * The pet: body, face, accessories in its hands and on its head, plus the
 * overlays for each action (eating, pooping, bath time, jumping, spinning).
 */
export function Pet({ look, action, swap = null, walking = false, sad = false, className = "" }: Props) {
  const maskId = useId();
  const type = action?.type;
  const hat = findAccessory(HATS, look.hat);
  const toy = findAccessory(TOYS, look.toy);
  const food = findAccessory(FOODS, look.food);
  const { head, leftHand, rightHand, mouth } = ANCHORS;

  const toMouth = { "--dx": `${mouth.x - rightHand.x}px`, "--dy": `${mouth.y - rightHand.y - 6}px` } as CSSProperties;

  return (
    <div className={`pet-root ${className}`}>
      <div key={action?.key ?? "idle"} className={`pet-anim ${type ? `pet-anim-${type}` : ""}`}>
        <div className={walking && !type ? "pet-walk" : ""}>
          <svg
            viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
            className="block h-full w-full overflow-visible"
            role="img"
            aria-label="A small blue pet with tall ears and a long snout"
          >
            <defs>
              <mask id={maskId} maskUnits="userSpaceOnUse" x={-60} y={-60} width={120} height={120}>
                <rect x={-60} y={-60} width={120} height={120} fill="white" />
                {type === "feed" &&
                  [
                    [22, -20, 13],
                    [26, 2, 14],
                    [6, -26, 15],
                    [-4, 4, 30],
                  ].map(([x, y, r], i) => (
                    <circle
                      key={i}
                      className="pet-bite"
                      style={{ animationDelay: `${0.5 + i * 0.45}s` }}
                      cx={x}
                      cy={y}
                      r={r}
                      fill="black"
                    />
                  ))}
              </mask>
            </defs>

            <g filter="url(#wobble)">
              {PET_IMAGE ? (
                <image href={PET_IMAGE} x={0} y={0} width={VIEWBOX.width} height={VIEWBOX.height} />
              ) : (
                <Body type={type} sad={sad} walking={walking} />
              )}

              {/* toy in the left hand, drawn behind the paw so it looks held */}
              <g transform={`translate(${leftHand.x - 2} ${leftHand.y - 20})`}>
                <SlideSwap slot="toy" swap={swap} current={<AccessoryArt item={toy} />} />
              </g>

              {/* food in the right hand; while eating it travels to the mouth and gets bitten */}
              <g transform={`translate(${rightHand.x + 2} ${rightHand.y - 20})`}>
                <SlideSwap
                  slot="food"
                  swap={swap}
                  current={
                    <g className={type === "feed" ? "pet-food-eat" : ""} style={toMouth}>
                      <g mask={`url(#${maskId})`}>
                        <AccessoryArt item={food} />
                      </g>
                    </g>
                  }
                />
              </g>

              {!PET_IMAGE && <Paws />}

              <g transform={`translate(${head.x} ${head.y})`}>
                <SlideSwap slot="hat" swap={swap} current={<AccessoryArt item={hat} />} />
              </g>
            </g>

            {type === "feed" && <Crumbs />}
            {type === "poo" && <StrainMarks />}
            {type === "bathe" && <Bath />}
            {(type === "jump" || type === "spin") && <Hearts />}
          </svg>
        </div>
      </div>
    </div>
  );
}

/** Renders a slot's item, animating the swap when this slot was just changed. */
function SlideSwap({ slot, swap, current }: { slot: keyof Look; swap: Swap | null; current: ReactNode }) {
  if (!swap || swap.slot !== slot) return <g>{current}</g>;
  const { from, to } = SLIDE[slot](swap.dir);
  const vars = {
    "--from-x": `${from[0]}px`,
    "--from-y": `${from[1]}px`,
    "--to-x": `${to[0]}px`,
    "--to-y": `${to[1]}px`,
    "--spin": `${swap.dir * 25}deg`,
  } as CSSProperties;
  return (
    <g style={vars}>
      <g key={`out-${swap.key}`} className="acc-out">
        <AccessoryArt item={findAccessory(LISTS[slot], swap.from)} />
      </g>
      <g key={`in-${swap.key}`} className="acc-in">
        {current}
      </g>
    </g>
  );
}

/**
 * A tall, lopsided Woset-style creature: one blue shape for head + body with
 * a long snout poking out to the right, two finger-like ears at the back,
 * tiny eyes up on the snout and a few freckles.
 */
function Body({ type, sad, walking }: { type?: string; sad: boolean; walking: boolean }) {
  const happy = type === "bathe" || type === "jump" || type === "spin";
  return (
    <g>
      {/* ears, rising from the back of the head */}
      <Misprint dx={4} dy={3}>
        <path d="M58 92 C52 62 50 30 58 14 C64 4 76 6 78 18 C80 36 78 62 82 84 Z" fill={SKIN} {...line} />
        <path d="M80 80 C78 52 80 24 92 12 C100 4 110 10 108 24 C104 44 100 62 102 78 Z" fill={SKIN} {...line} />
      </Misprint>

      {/* legs */}
      <g className={walking ? "pet-leg-l" : ""}>
        <path d="M74 178 L72 204 C72 212 94 212 94 204 L92 180" fill={WHITE} {...line} />
        <Misprint>
          <path d="M70 200 C70 214 96 214 96 202 Z" fill={PALETTE.green} {...line} />
        </Misprint>
      </g>
      <g className={walking ? "pet-leg-r" : ""}>
        <path d="M108 180 L106 204 C106 212 128 212 128 204 L126 178" fill={WHITE} {...line} />
        <Misprint>
          <path d="M104 202 C104 214 130 214 130 200 Z" fill={PALETTE.green} {...line} />
        </Misprint>
      </g>

      {/* head + body: one shape with the snout sticking out */}
      <Misprint dx={5} dy={3.5}>
        <path
          d="M62 192 C54 160 50 120 54 88 C56 62 68 48 92 46 C116 44 142 50 160 58 C176 65 180 84 170 93 C163 100 150 102 134 102 C128 102 126 108 127 118 C129 142 134 168 138 190 C116 198 82 198 62 192 Z"
          fill={SKIN}
          {...line}
        />
      </Misprint>

      {/* freckles (soft grey) + nostril */}
      <g fill={INK} opacity={0.35}>
        <circle cx={98} cy={74} r={1.8} />
        <circle cx={105} cy={70} r={1.8} />
        <circle cx={104} cy={79} r={1.8} />
      </g>
      <circle cx={168} cy={73} r={2} fill={INK} />

      {/* eyes, up on the snout */}
      {type === "poo" ? (
        <g fill="none" {...line} strokeWidth={3}>
          <path d="M124 60 L132 65 L124 70" />
          <path d="M152 57 L144 62 L152 67" />
        </g>
      ) : happy ? (
        <g fill="none" {...line} strokeWidth={3}>
          <path d="M123 67 Q128 58 133 67" />
          <path d="M142 64 Q147 55 152 64" />
        </g>
      ) : (
        <g className="pet-blink">
          <circle cx={128} cy={64} r={4} fill={INK} />
          <circle cx={147} cy={61} r={4} fill={INK} />
        </g>
      )}
      {sad && !type && (
        <g fill="none" {...line} strokeWidth={2.5}>
          <path d="M121 54 L132 57" />
          <path d="M154 51 L143 54" />
        </g>
      )}

      {/* mouth, along the snout */}
      {type === "feed" ? (
        <ellipse className="pet-chomp" cx={154} cy={89} rx={7} ry={5.5} fill={PALETTE.red} {...line} strokeWidth={2.5} />
      ) : type === "poo" ? (
        <path d="M140 88 q5 -4 10 0 q5 4 10 0" fill="none" {...line} strokeWidth={2.5} />
      ) : happy ? (
        <path d="M140 84 Q152 99 164 84 Z" fill={PALETTE.red} {...line} strokeWidth={2.5} />
      ) : sad ? (
        <path d="M142 92 Q152 84 162 92" fill="none" {...line} strokeWidth={2.5} />
      ) : (
        <path d="M140 85 Q152 95 164 85" fill="none" {...line} strokeWidth={2.5} />
      )}
    </g>
  );
}

function Paws() {
  const { leftHand, rightHand } = ANCHORS;
  return (
    <g>
      <ellipse cx={leftHand.x} cy={leftHand.y} rx={13} ry={11} fill={WHITE} {...line} />
      <ellipse cx={rightHand.x} cy={rightHand.y} rx={13} ry={11} fill={WHITE} {...line} />
    </g>
  );
}

function Crumbs() {
  return (
    <g fill={PALETTE.butter} stroke={INK} strokeWidth={1.5}>
      {[
        [146, 98, 0.7],
        [160, 100, 1.1],
        [152, 96, 1.5],
        [140, 102, 1.9],
        [166, 98, 2.1],
      ].map(([x, y, d], i) => (
        <rect key={i} className="pet-crumb" style={{ animationDelay: `${d}s` }} x={x} y={y} width={5} height={5} rx={1} />
      ))}
    </g>
  );
}

function StrainMarks() {
  return (
    <g fill="none" {...line} strokeWidth={3} className="pet-strain">
      <path d="M30 70 L20 60" />
      <path d="M26 86 L14 84" />
      <path d="M170 70 L180 60" />
      <path d="M174 86 L186 84" />
    </g>
  );
}

function Bath() {
  return (
    <g className="pet-bath">
      {/* bubbles floating up */}
      {[
        [50, 0, 7],
        [80, 0.4, 5],
        [126, 0.2, 8],
        [150, 0.7, 5],
        [100, 0.9, 6],
        [64, 1.2, 4],
        [138, 1.4, 6],
      ].map(([x, d, r], i) => (
        <circle
          key={i}
          className="pet-bubble"
          style={{ animationDelay: `${d}s` }}
          cx={x}
          cy={160}
          r={r}
          fill="white"
          stroke={INK}
          strokeWidth={2}
        />
      ))}
      {/* foam on head */}
      <g fill="white" stroke={INK} strokeWidth={2.5}>
        <circle cx={104} cy={48} r={9} />
        <circle cx={118} cy={42} r={11} />
        <circle cx={134} cy={48} r={9} />
      </g>
      {/* the tub */}
      <Misprint dx={5} dy={3}>
        <path d="M8 160 H192 L182 204 C178 214 22 214 18 204 Z" fill={PALETTE.blue} {...line} />
      </Misprint>
      <path d="M4 158 H196" fill="none" {...line} strokeWidth={6} />
      <path d="M36 218 L40 210 M164 218 L160 210" fill="none" {...line} />
      <g fill="white" stroke={INK} strokeWidth={2.5}>
        <circle cx={34} cy={156} r={10} />
        <circle cx={52} cy={152} r={12} />
        <circle cx={72} cy={156} r={9} />
        <circle cx={128} cy={156} r={9} />
        <circle cx={148} cy={152} r={12} />
        <circle cx={168} cy={156} r={10} />
      </g>
      {/* sparkles once clean */}
      <g className="pet-sparkle" fill={PALETTE.butter} stroke={INK} strokeWidth={2}>
        <path d="M28 54 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 Z" />
        <path d="M170 40 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 Z" />
      </g>
    </g>
  );
}

function Hearts() {
  return (
    <g className="pet-hearts" fill={PALETTE.red} stroke={INK} strokeWidth={2.5}>
      <path d="M30 60 c-6 -8 -18 -2 -12 8 l12 12 l12 -12 c6 -10 -6 -16 -12 -8 Z" />
      <path d="M172 48 c-4 -6 -13 -1 -9 6 l9 9 l9 -9 c4 -7 -5 -12 -9 -6 Z" />
    </g>
  );
}
