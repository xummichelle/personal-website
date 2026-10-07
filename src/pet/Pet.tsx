"use client";

import { useId, type CSSProperties } from "react";
import { ANCHORS, PET_IMAGE, VIEWBOX } from "./config";
import { AccessoryArt, FOODS, HATS, INK, Misprint, PALETTE, TOYS, findAccessory } from "./accessories";
import type { Look, PetAction } from "./PetProvider";

const BODY = PALETTE.white;
const EARS = PALETTE.blue;
const line = { stroke: INK, strokeWidth: 3, strokeLinejoin: "round", strokeLinecap: "round" } as const;

type Props = {
  look: Look;
  action: PetAction | null;
  walking?: boolean;
  sad?: boolean;
  className?: string;
};

/**
 * The pet: body, face, accessories in its hands and on its head, plus the
 * overlays for each action (eating, pooping, bath time, jumping, spinning).
 */
export function Pet({ look, action, walking = false, sad = false, className = "" }: Props) {
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
            aria-label="A small cream-coloured pet with cat ears"
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
                <AccessoryArt item={toy} />
              </g>

              {/* food in the right hand; while eating it travels to the mouth and gets bitten */}
              <g transform={`translate(${rightHand.x + 2} ${rightHand.y - 20})`}>
                <g className={type === "feed" ? "pet-food-eat" : ""} style={toMouth}>
                  <g mask={`url(#${maskId})`}>
                    <AccessoryArt item={food} />
                  </g>
                </g>
              </g>

              {!PET_IMAGE && <Paws />}

              <g transform={`translate(${head.x} ${head.y})`}>
                <AccessoryArt item={hat} />
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

function Body({ type, sad, walking }: { type?: string; sad: boolean; walking: boolean }) {
  const happy = type === "bathe" || type === "jump" || type === "spin";
  return (
    <g>
      {/* ears */}
      <Misprint dx={4} dy={3}>
        <path d="M58 98 C52 70 50 46 56 30 C70 38 88 56 96 74 Z" fill={EARS} {...line} />
        <path d="M142 98 C148 70 150 46 144 30 C130 38 112 56 104 74 Z" fill={EARS} {...line} />
      </Misprint>

      {/* legs */}
      <g className={walking ? "pet-leg-l" : ""}>
        <path d="M74 178 L72 204 C72 212 94 212 94 204 L92 180" fill={BODY} {...line} />
        <Misprint>
          <path d="M70 200 C70 214 96 214 96 202 Z" fill={PALETTE.green} {...line} />
        </Misprint>
      </g>
      <g className={walking ? "pet-leg-r" : ""}>
        <path d="M108 180 L106 204 C106 212 128 212 128 204 L126 178" fill={BODY} {...line} />
        <Misprint>
          <path d="M104 202 C104 214 130 214 130 200 Z" fill={PALETTE.green} {...line} />
        </Misprint>
      </g>

      {/* body blob */}
      <path
        d="M100 66 C146 64 168 98 166 136 C164 176 136 194 100 194 C64 194 36 176 34 136 C32 98 54 68 100 66 Z"
        fill={BODY}
        {...line}
      />

      {/* blush */}
      <ellipse cx={66} cy={141} rx={9} ry={5} fill={PALETTE.red} opacity={0.35} />
      <ellipse cx={134} cy={141} rx={9} ry={5} fill={PALETTE.red} opacity={0.35} />

      {/* eyes */}
      {type === "poo" ? (
        <g fill="none" {...line} strokeWidth={3.5}>
          <path d="M72 116 L82 122 L72 128" />
          <path d="M128 116 L118 122 L128 128" />
        </g>
      ) : happy ? (
        <g fill="none" {...line} strokeWidth={3.5}>
          <path d="M70 126 C74 116 82 116 86 126" />
          <path d="M114 126 C118 116 126 116 130 126" />
        </g>
      ) : (
        <g className="pet-blink">
          <ellipse cx={80} cy={122} rx={4.5} ry={5.5} fill={INK} />
          <ellipse cx={120} cy={122} rx={4.5} ry={5.5} fill={INK} />
        </g>
      )}
      {sad && !type && (
        <g fill="none" {...line} strokeWidth={3}>
          <path d="M68 108 L84 112" />
          <path d="M132 108 L116 112" />
        </g>
      )}

      {/* mouth */}
      {type === "feed" ? (
        <ellipse className="pet-chomp" cx={100} cy={142} rx={7} ry={6} fill={PALETTE.red} {...line} strokeWidth={3} />
      ) : type === "poo" ? (
        <path d="M90 142 q5 -4 10 0 q5 4 10 0" fill="none" {...line} strokeWidth={3} />
      ) : happy ? (
        <path d="M90 138 Q100 152 110 138 Z" fill={PALETTE.red} {...line} strokeWidth={3} />
      ) : sad ? (
        <path d="M92 144 Q100 136 108 144" fill="none" {...line} strokeWidth={3} />
      ) : (
        <path d="M91 138 q4.5 6 9 0 q4.5 6 9 0" fill="none" {...line} strokeWidth={3} />
      )}
    </g>
  );
}

function Paws() {
  const { leftHand, rightHand } = ANCHORS;
  return (
    <g>
      <ellipse cx={leftHand.x} cy={leftHand.y} rx={13} ry={11} fill={BODY} {...line} />
      <ellipse cx={rightHand.x} cy={rightHand.y} rx={13} ry={11} fill={BODY} {...line} />
    </g>
  );
}

function Crumbs() {
  return (
    <g fill={PALETTE.butter} stroke={INK} strokeWidth={1.5}>
      {[
        [92, 150, 0.7],
        [108, 152, 1.1],
        [100, 148, 1.5],
        [86, 154, 1.9],
        [114, 150, 2.1],
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
        <circle cx={84} cy={78} r={9} />
        <circle cx={98} cy={72} r={11} />
        <circle cx={114} cy={78} r={9} />
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
