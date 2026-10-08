"use client";

import Link from "next/link";
import { useState, type CSSProperties, type ReactNode } from "react";
import { Pet, type Swap } from "@/pet/Pet";
import { PooPile } from "@/pet/PooPile";
import { usePet, type Chores, type Look } from "@/pet/PetProvider";
import { usePooDrop } from "@/pet/usePooDrop";
import { CrayonBacking } from "./Decorations";
import { ANCHORS, PET_NAME, VIEWBOX } from "@/pet/config";
import { FOODS, HATS, TOYS, findAccessory, type Accessory } from "@/pet/accessories";

const OPTIONS: Record<keyof Look, readonly Accessory[]> = { hat: HATS, toy: TOYS, food: FOODS };

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/** The pet on the home page: the note, and the pet with carousel arrows around it. Picks save automatically. */
export function HomePet() {
  const { hydrated, look, setLook, action, poos, trigger, needs, chores } = usePet();
  const [swap, setSwap] = useState<Swap | null>(null);

  usePooDrop(() => (Math.random() < 0.5 ? 0.1 + Math.random() * 0.1 : 0.8 + Math.random() * 0.1));

  const cycle = (slot: keyof Look, dir: 1 | -1) => {
    const options = OPTIONS[slot];
    const i = options.findIndex((o) => o.id === look[slot]);
    const next = options[(i + dir + options.length) % options.length];
    const key = Date.now();
    setSwap({ slot, from: look[slot], dir, key });
    setLook({ [slot]: next.id } as Partial<Look>);
    // Once the slide has played, drop it so later re-renders don't replay it.
    setTimeout(() => setSwap((s) => (s?.key === key ? null : s)), 600);
  };

  const name = (list: readonly Accessory[], id: string) => findAccessory(list, id).label.toLowerCase();
  const article = (word: string) => (/^[aeiou]/.test(word) ? "an" : "a");
  const toy = name(TOYS, look.toy);

  // Arrow positions, as percentages of the pet's box, so they follow the anchors.
  const hatY = pct(ANCHORS.head.y - 24, VIEWBOX.height);
  const handY = pct(ANCHORS.leftHand.y - 20, VIEWBOX.height);

  return (
    // Two columns on desktop: the note on the left, the pet on the right.
    <section aria-labelledby="pet-heading" className="mt-6 grid items-start gap-x-12 lg:mt-8 lg:grid-cols-2">
      {/* a note left on a scrap of torn notebook paper, taped down */}
      <div className="fade-in max-w-xl" style={{ animationDelay: "0.1s" }}>
        <div className="relative mt-3">
          <CrayonBacking className="translate-x-4 translate-y-4 rotate-1 sm:translate-x-5 sm:translate-y-5" />
          <div className="paper-shadow relative -rotate-[1.5deg]">
            <span className="scrap-tape" aria-hidden />
            <div className="scrap-note pt-6 pr-6 pb-6 pl-10 text-xl sm:pr-10 sm:pl-14 sm:text-2xl">
              <p>
                will you take care of {PET_NAME} while i&apos;m busy? their favourite food is{" "}
                <Pick slot="food" onCycle={(d) => cycle("food", d)}>
                  {name(FOODS, look.food)}
                </Pick>
                , their favourite toy is {article(toy)}{" "}
                <Pick slot="toy" onCycle={(d) => cycle("toy", d)}>
                  {toy}
                </Pick>
                , and they love wearing their{" "}
                <Pick slot="hat" onCycle={(d) => cycle("hat", d)}>
                  {name(HATS, look.hat)}
                </Pick>
                .
              </p>
              <ChoreList chores={chores} onChore={trigger} />
              <p className="text-right font-hand">– michelle</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-md lg:mt-0">
        <div className="relative">
          <h2 id="pet-heading" className="mb-6 text-center font-hand text-3xl">
            {PET_NAME}
          </h2>
          <div className="relative mx-auto w-[72%]">
            <div className={hydrated ? "pet-grow" : "opacity-0"}>
              <button type="button" onClick={() => trigger("spin")} className="block w-full cursor-pointer" aria-label={`Boop ${PET_NAME}`}>
                <Pet look={look} action={action} swap={swap} needs={needs} />
              </button>
            </div>

            {hydrated && (
              <>
                {/* hat: ‹ › either side of the head */}
                <Arrow dir="left" label="Previous hat" style={{ left: "6%", top: hatY }} onClick={() => cycle("hat", -1)} />
                <Arrow dir="right" label="Next hat" style={{ left: "94%", top: hatY }} onClick={() => cycle("hat", 1)} />

                {/* held items: ▲ ▼ beside each hand */}
                <HandStack label="toy" style={{ left: "-9%", top: handY }} onCycle={(d) => cycle("toy", d)} />
                <HandStack label="food" style={{ left: "109%", top: handY }} onCycle={(d) => cycle("food", d)} />
              </>
            )}
          </div>
          <div className="absolute inset-x-0 bottom-1 h-0">
            <PooPile poos={poos} size={44} flushing={action?.type === "clean"} />
          </div>
        </div>
      </div>
    </section>
  );
}

const CHORES: { key: keyof Chores; label: string; action?: "feed" | "clean" | "bathe"; href?: string }[] = [
  { key: "fed", label: `feed ${PET_NAME}`, action: "feed" },
  { key: "cleaned", label: "clean up after them", action: "clean" },
  { key: "bathed", label: "give them a bath", action: "bathe" },
  { key: "walked", label: "take them on a walk through my portfolio", href: "/tech-projects" },
];

/**
 * The p.s. to-do list on the note. Each line ticks itself off when the visitor
 * does that chore (from here or the nav bar), and clicking a line does it.
 */
function ChoreList({ chores, onChore }: { chores: Chores; onChore: (action: "feed" | "clean" | "bathe") => void }) {
  const allDone = CHORES.every((c) => chores[c.key]);
  return (
    <div style={{ marginTop: "var(--lh)" }}>
      <p>p.s. while i&apos;m busy, could you:</p>
      <ul>
        {CHORES.map(({ key, label, action, href }) => {
          const done = chores[key];
          const text: ReactNode = (
            <span className={`transition-colors ${done ? "text-ink-soft line-through decoration-red/70 decoration-2" : "group-hover/chore:text-blue"}`}>
              {label}
            </span>
          );
          return (
            <li key={key} className="flex items-baseline gap-2">
              <Checkbox done={done} />
              {href ? (
                <Link href={href} className="group/chore cursor-pointer text-left">
                  {text}
                </Link>
              ) : (
                <button type="button" onClick={() => onChore(action!)} className="group/chore cursor-pointer text-left">
                  {text}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {allDone && <p className="font-hand text-blue">you&apos;re the best, thank you!! ♥</p>}
    </div>
  );
}

/** A wobbly hand-drawn box, with a red scribbled tick that draws itself in when done. */
function Checkbox({ done }: { done: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[0.8em] w-[0.8em] shrink-0 translate-y-[0.08em] overflow-visible" aria-hidden>
      <path
        d="M4 5 C9 4 15 4.6 20 4 C20.6 9 20 15 20.5 20 C15 20.6 9 20 4 20.5 C3.4 15 4 9 4 5 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {done && (
        <path
          className="check-draw"
          d="M6 12 L10.5 17.5 L23 1"
          pathLength={1}
          fill="none"
          stroke="var(--red)"
          strokeWidth={3.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      <title>{done ? "done" : "not done yet"}</title>
    </svg>
  );
}

/**
 * A highlighted pick inside the note, with faint ‹ › arrows either side so the
 * favourites can be changed right from the text. Clicking the word itself
 * moves to the next option. Only the arrow being pointed at lights up.
 */
function Pick({ children, slot, onCycle }: { children: string; slot: string; onCycle: (dir: 1 | -1) => void }) {
  return (
    <span className="whitespace-nowrap">
      <PickArrow dir="left" label={`Previous ${slot}`} onClick={() => onCycle(-1)} />
      <button
        type="button"
        onClick={() => onCycle(1)}
        title={`Change ${slot}`}
        className="peer/word cursor-pointer font-bold text-blue underline decoration-butter decoration-[5px] underline-offset-[3px] transition-colors hover:decoration-blue/40"
      >
        {children}
      </button>
      <PickArrow dir="right" label={`Next ${slot}`} onClick={() => onCycle(1)} />
    </span>
  );
}

function PickArrow({ dir, label, onClick }: { dir: "left" | "right"; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`cursor-pointer align-middle text-ink opacity-25 transition hover:text-blue hover:opacity-100 active:scale-90 ${
        // the word itself steps forward, so hovering it lights up only the › arrow
        dir === "left" ? "mr-0.5" : "ml-0.5 peer-hover/word:text-blue peer-hover/word:opacity-100"
      }`}
    >
      <svg viewBox="0 0 24 24" className="inline-block h-[0.7em] w-[0.7em] -translate-y-[0.06em]" aria-hidden>
        <path d={CHEVRON[dir]} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

// Wide, open chevrons on a 24×24 grid.
const CHEVRON = {
  left: "M15 2 L8 12 L15 22",
  right: "M9 2 L16 12 L9 22",
  up: "M2 15 L12 8 L22 15",
  down: "M2 9 L12 16 L22 9",
};

function Arrow({
  dir,
  label,
  onClick,
  style,
}: {
  dir: keyof typeof CHEVRON;
  label: string;
  onClick: () => void;
  style?: CSSProperties;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      style={style}
      className={`fade-in grid h-10 w-10 cursor-pointer place-items-center transition hover:scale-115 hover:text-blue active:scale-90 ${
        style ? "absolute -translate-x-1/2 -translate-y-1/2" : ""
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
        <path d={CHEVRON[dir]} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function HandStack({ label, onCycle, style }: { label: string; onCycle: (dir: 1 | -1) => void; style: CSSProperties }) {
  return (
    <div className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center" style={style}>
      <Arrow dir="up" label={`Previous ${label}`} onClick={() => onCycle(-1)} />
      <span className="text-xs leading-tight font-semibold tracking-[0.08em] uppercase">{label}</span>
      <Arrow dir="down" label={`Next ${label}`} onClick={() => onCycle(1)} />
    </div>
  );
}
