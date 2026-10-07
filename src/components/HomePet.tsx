"use client";

import { useEffect, useRef, useState } from "react";
import { Pet } from "@/pet/Pet";
import { PooPile } from "@/pet/PooPile";
import { usePet, type Look } from "@/pet/PetProvider";
import { usePooDrop } from "@/pet/usePooDrop";
import { PET_NAME } from "@/pet/config";
import { AccessoryIcon, FOODS, HATS, TOYS, findAccessory, type Accessory } from "@/pet/accessories";

const PICKERS: { key: keyof Look; label: string; options: readonly Accessory[]; kind: "hat" | "item" }[] = [
  { key: "food", label: "Favourite food", options: FOODS, kind: "item" },
  { key: "toy", label: "Favourite toy", options: TOYS, kind: "item" },
  { key: "hat", label: "Hat", options: HATS, kind: "hat" },
];

/** The big pet on the home page, with the dress-up controls beside it. */
export function HomePet() {
  const { hydrated, draft, setDraft, save, isDirty, action, poos, trigger } = usePet();
  const [justSaved, setJustSaved] = useState(false);

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

  const onSave = () => {
    save();
    setJustSaved(true);
    trigger("jump");
    setTimeout(() => setJustSaved(false), 1800);
  };

  const name = (list: readonly Accessory[], id: string) => {
    const label = findAccessory(list, id).label.toLowerCase();
    return `${/^[aeiou]/.test(label) ? "an" : "a"} ${label}`;
  };

  return (
    <section aria-labelledby="pet-heading" className="page-pad flex-1 bg-sheet">
      <div className="mx-auto grid max-w-6xl items-center gap-x-10 gap-y-6 px-5 pt-10 sm:px-8 lg:grid-cols-[1fr_300px]">
        <div className="relative">
          <h2 id="pet-heading" className="mx-auto max-w-xl text-center font-hand text-3xl leading-snug sm:text-4xl">
            {PET_NAME} is wearing {name(HATS, draft.hat)} and holding {name(TOYS, draft.toy)} and{" "}
            {name(FOODS, draft.food)}
          </h2>

          <div className="relative mx-auto mt-4 w-full max-w-lg">
            <div className="relative mx-auto w-[72%]">
              <div className={hydrated ? "pet-grow" : "opacity-0"}>
                <button type="button" onClick={() => trigger("spin")} className="block w-full cursor-pointer" aria-label={`Boop ${PET_NAME}`}>
                  <Pet look={draft} action={action} sad={poos.length >= 2} />
                </button>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-1 h-0">
              <PooPile poos={poos} size={44} />
            </div>
          </div>
        </div>

        <div className="space-y-5 lg:pt-16">
          <p className="text-sm leading-relaxed text-ink-soft">
            Dress {PET_NAME} up! Then use the buttons in the bar below to feed, potty or bathe them.
          </p>
          {PICKERS.map(({ key, label, options, kind }) => {
            const selected = findAccessory(options, draft[key]);
            return (
              <label key={key} className="block">
                <span className="text-xs font-semibold tracking-[0.08em] uppercase">{label}</span>
                <span className="mt-1.5 flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-white py-0.5 pr-4 pl-1.5 transition focus-within:ring-4 focus-within:ring-paper">
                  <AccessoryIcon item={selected} kind={kind} />
                  <select
                    value={draft[key]}
                    onChange={(e) => setDraft({ [key]: e.target.value } as Partial<Look>)}
                    className="w-full cursor-pointer appearance-none bg-transparent py-2 font-medium outline-none"
                  >
                    {options.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" aria-hidden>
                    <path d="M4 7 L10 13 L16 7" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </label>
            );
          })}

          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              onClick={onSave}
              disabled={!isDirty && !justSaved}
              className="pill pill-filled px-7! py-3! cursor-pointer disabled:cursor-default disabled:opacity-40"
            >
              {justSaved ? "Saved ♥" : "Save"}
            </button>
            <span className="text-xs text-ink-soft" aria-live="polite">
              {isDirty ? "unsaved changes" : `${PET_NAME} will remember this look`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
