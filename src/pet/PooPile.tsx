import { INK, PooArt } from "./accessories";
import type { Poo } from "./PetProvider";

/** Renders poos along the bottom of a positioned container. */
export function PooPile({ poos, size = 34 }: { poos: Poo[]; size?: number }) {
  return (
    <>
      {poos.map((p) => (
        <div
          key={p.id}
          className="pointer-events-none absolute bottom-0"
          style={{ left: `${p.x * 100}%`, width: size, marginLeft: -size / 2 }}
        >
          <svg viewBox="-30 -46 60 62" className="poo-pop block w-full overflow-visible" aria-label="a little poo">
            <g fill="none" stroke={INK} strokeWidth={2.5} strokeLinecap="round" opacity={0.7}>
              <path className="stink" d="M-10 -26 c-4 -5 4 -8 0 -14" />
              <path className="stink" style={{ animationDelay: "0.5s" }} d="M8 -24 c-4 -5 4 -8 0 -14" />
            </g>
            <PooArt />
          </svg>
        </div>
      ))}
    </>
  );
}
