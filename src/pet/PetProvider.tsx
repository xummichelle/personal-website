"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { FOODS, HATS, TOYS, type FoodId, type HatId, type ToyId } from "./accessories";

export type Look = { hat: HatId; toy: ToyId; food: FoodId };
export type ActionType = "feed" | "poo" | "bathe" | "jump" | "spin";
export type PetAction = { type: ActionType; key: number };
export type Poo = { id: number; x: number };

export const DEFAULT_LOOK: Look = { hat: "bow", toy: "yarn", food: "ice-cream" };

/** How long each action plays, in ms. Keep in sync with the CSS keyframes. */
export const ACTION_MS: Record<ActionType, number> = {
  feed: 2600,
  poo: 1700,
  bathe: 2800,
  jump: 700,
  spin: 800,
};

const LOOK_KEY = "pet:look";
const POO_KEY = "pet:poos";
const MAX_POOS = 3;

type PetContextValue = {
  /** False until saved state has been read from localStorage. */
  hydrated: boolean;
  /** What's saved, and what the pet wears outside the home page. */
  saved: Look;
  /** What's currently picked in the customiser. */
  draft: Look;
  setDraft: (patch: Partial<Look>) => void;
  save: () => void;
  isDirty: boolean;
  action: PetAction | null;
  trigger: (type: ActionType) => void;
  poos: Poo[];
  addPoo: (x: number) => void;
};

const PetContext = createContext<PetContextValue | null>(null);

const isObject = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object";

/** Keeps each saved pick that still exists; anything removed falls back to the default. */
function toLook(v: Record<string, unknown>): Look {
  const pick = <T extends string>(list: readonly { id: T }[], id: unknown, fallback: T) =>
    list.find((o) => o.id === id)?.id ?? fallback;
  return {
    hat: pick(HATS, v.hat, DEFAULT_LOOK.hat),
    toy: pick(TOYS, v.toy, DEFAULT_LOOK.toy),
    food: pick(FOODS, v.food, DEFAULT_LOOK.food),
  };
}

function readStorage<T>(key: string, validate: (v: unknown) => v is T): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return validate(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private mode or storage disabled: the pet just won't remember.
  }
}

const isPooList = (v: unknown): v is Poo[] =>
  Array.isArray(v) && v.every((p) => typeof p?.id === "number" && typeof p?.x === "number");

export function PetProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [saved, setSaved] = useState<Look>(DEFAULT_LOOK);
  const [draft, setDraftState] = useState<Look>(DEFAULT_LOOK);
  const [action, setAction] = useState<PetAction | null>(null);
  const [poos, setPoos] = useState<Poo[]>([]);
  const actionTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const stored = readStorage(LOOK_KEY, isObject);
    const look = stored && toLook(stored);
    const storedPoos = readStorage(POO_KEY, isPooList);
    /* eslint-disable react-hooks/set-state-in-effect -- one-time sync from localStorage after hydration */
    if (look) {
      setSaved(look);
      setDraftState(look);
    }
    if (storedPoos) setPoos(storedPoos.slice(0, MAX_POOS));
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const setDraft = useCallback((patch: Partial<Look>) => {
    setDraftState((d) => ({ ...d, ...patch }));
  }, []);

  const save = useCallback(() => {
    // Before hydration the draft is just the defaults; don't clobber real saved data.
    if (!hydrated) return;
    setSaved(draft);
    writeStorage(LOOK_KEY, draft);
  }, [draft, hydrated]);

  const trigger = useCallback((type: ActionType) => {
    clearTimeout(actionTimer.current);
    setAction({ type, key: Date.now() });
    actionTimer.current = setTimeout(() => setAction(null), ACTION_MS[type]);
    if (type === "bathe") {
      // Bath time washes the poos away, like cleaning up in a tamagotchi.
      setTimeout(() => {
        setPoos([]);
        writeStorage(POO_KEY, []);
      }, ACTION_MS.bathe * 0.6);
    }
  }, []);

  const addPoo = useCallback((x: number) => {
    setPoos((list) => {
      const next = [...list, { id: Date.now(), x }].slice(-MAX_POOS);
      writeStorage(POO_KEY, next);
      return next;
    });
  }, []);

  return (
    <PetContext.Provider
      value={{
        hydrated,
        saved,
        draft,
        setDraft,
        save,
        isDirty: saved.hat !== draft.hat || saved.toy !== draft.toy || saved.food !== draft.food,
        action,
        trigger,
        poos,
        addPoo,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}

export function usePet() {
  const ctx = useContext(PetContext);
  if (!ctx) throw new Error("usePet must be used inside <PetProvider>");
  return ctx;
}
