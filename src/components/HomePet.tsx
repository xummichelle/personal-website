"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Pet, type Swap } from "@/pet/Pet";
import { PooPile } from "@/pet/PooPile";
import { usePet, type Look } from "@/pet/PetProvider";
import { usePooDrop } from "@/pet/usePooDrop";
import { ANCHORS, PET_NAME, VIEWBOX } from "@/pet/config";
import { FOODS, HATS, TOYS, findAccessory, type Accessory } from "@/pet/accessories";

const OPTIONS: Record<keyof Look, readonly Accessory[]> = { hat: HATS, toy: TOYS, food: FOODS };

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/** The pet on the home page: a caption, the pet with carousel arrows around it, and Save. */
export function HomePet() {
  const { hydrated, draft, setDraft, save, isDirty, action, poos, trigger } = usePet();
  const [justSaved, setJustSaved] = useState(false);
  const [swap, setSwap] = useState<Swap | null>(null);

  // Leaving the page (or closing the tab) keeps whatever is picked.
  const saveRef = useRef(save);
  useEffect(() => {
    saveRef.current = save;
  });
  useEffect(() => {
    const onHide = () => saveRef.current();
    window.addEventListener("pagehide", onHide);
    return () => {
      window.removeEventListener("pagehide", onHide);
      saveRef.current();
    };
  }, []);

  usePooDrop(() => (Math.random() < 0.5 ? 0.1 + Math.random() * 0.1 : 0.8 + Math.random() * 0.1));

  const cycle = (slot: keyof Look, dir: 1 | -1) => {
    const options = OPTIONS[slot];
    const i = options.findIndex((o) => o.id === draft[slot]);
    const next = options[(i + dir + options.length) % options.length];
    const key = Date.now();
    setSwap({ slot, from: draft[slot], dir, key });
    setDraft({ [slot]: next.id } as Partial<Look>);
    // Once the slide has played, drop it so later re-renders don't replay it.
    setTimeout(() => setSwap((s) => (s?.key === key ? null : s)), 600);
  };

  const onSave = () => {
    save();
    setJustSaved(true);
    trigger("jump");
    setTimeout(() => setJustSaved(false), 1800);
  };

  const name = (list: readonly Accessory[], id: string) => findAccessory(list, id).label.toLowerCase();
  const article = (word: string) => (/^[aeiou]/.test(word) ? "an" : "a");
  const toy = name(TOYS, draft.toy);

  // Arrow positions, as percentages of the pet's box, so they follow the anchors.
  const hatY = pct(ANCHORS.head.y - 24, VIEWBOX.height);
  const handY = pct(ANCHORS.leftHand.y - 20, VIEWBOX.height);

  return (
    // Two columns on desktop: the note with Save under it on the left, the pet on the right.
    <section aria-labelledby="pet-heading" className="mt-6 grid items-start gap-x-12 lg:mt-8 lg:grid-cols-2 lg:grid-rows-[auto_1fr]">
      {/* a note left on a scrap of torn notebook paper, taped down */}
      <div className="fade-in max-w-xl" style={{ animationDelay: "0.1s" }}>
        <div className="scrap-note-wrap relative mt-3 -rotate-[1.5deg]">
          <span className="scrap-tape" aria-hidden />
          <div className="scrap-note pt-6 pr-6 pb-6 pl-10 text-xl sm:pr-10 sm:pl-14 sm:text-2xl">
            <p>
              will you take care of {PET_NAME} while i&apos;m busy? their favourite food is{" "}
              <Pick slot="food" onCycle={(d) => cycle("food", d)}>
                {name(FOODS, draft.food)}
              </Pick>
              , their favourite toy is {article(toy)}{" "}
              <Pick slot="toy" onCycle={(d) => cycle("toy", d)}>
                {toy}
              </Pick>
              , and they love wearing their{" "}
              <Pick slot="hat" onCycle={(d) => cycle("hat", d)}>
                {name(HATS, draft.hat)}
              </Pick>
              .
            </p>
            <p className="text-right font-hand">– michelle</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-md lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0">
        <div className="relative">
          <h2 id="pet-heading" className="mb-2 text-center font-hand text-3xl">
            {PET_NAME}
          </h2>
          <div className="relative mx-auto w-[72%]">
            <div className={hydrated ? "pet-grow" : "opacity-0"}>
              <button type="button" onClick={() => trigger("spin")} className="block w-full cursor-pointer" aria-label={`Boop ${PET_NAME}`}>
                <Pet look={draft} action={action} swap={swap} sad={poos.length >= 2} />
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
            <PooPile poos={poos} size={44} />
          </div>
        </div>
      </div>

      {/* Save: under the note on desktop, under the pet on phones */}
      <div className="mt-6 flex flex-col items-center gap-2 lg:col-start-1 lg:row-start-2 lg:mt-10 lg:flex-row lg:items-center lg:gap-4">
        <button
          type="button"
          onClick={onSave}
          disabled={!isDirty && !justSaved}
          className="pill px-7! py-2.5! cursor-pointer disabled:cursor-default disabled:opacity-40 disabled:hover:bg-card"
        >
          {justSaved ? "Saved ♥" : "Save"}
        </button>
        <span className="text-xs text-ink-soft" aria-live="polite">
          {isDirty ? "unsaved changes" : `${PET_NAME} will remember this look`}
        </span>
      </div>
    </section>
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
