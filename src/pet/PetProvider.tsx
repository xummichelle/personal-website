"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { FOODS, HATS, TOYS, type FoodId, type HatId, type ToyId } from "./accessories";

export type Look = { hat: HatId; toy: ToyId; food: FoodId };
export type ActionType = "feed" | "poo" | "clean" | "bathe" | "jump" | "spin";
export type PetAction = { type: ActionType; key: number };
export type Poo = { id: number; x: number };
/** What mimi needs right now. Each one is fixed by a care button. */
export type Needs = {
  /** Fixed by Feed. */
  hungry: boolean;
  /** Poo is lying around. Fixed by Clean. */
  unhappy: boolean;
  /** Overdue for a bath. Fixed by Bathe. */
  dirty: boolean;
};

export const DEFAULT_LOOK: Look = { hat: "bow", toy: "yarn", food: "ice-cream" };

/** How long each action plays, in ms. Keep in sync with the CSS keyframes. */
export const ACTION_MS: Record<ActionType, number> = {
  feed: 2600,
  poo: 1700,
  clean: 1100,
  bathe: 2800,
  jump: 700,
  spin: 800,
};

const LOOK_KEY = "pet:look";
const POO_KEY = "pet:poos";
const CARE_KEY = "pet:care";
const MAX_POOS = 3;

/**
 * Tamagotchi timings, kept short because visitors only stay a few minutes.
 * Hunger and dirt are measured from the last meal / bath (saved, so coming
 * back later finds a hungry, smelly mimi). Poops happen while the tab is open.
 */
export const CARE = {
  hungryAfterMs: 45_000,
  dirtyAfterMs: 80_000,
  /** A brand-new visitor's first hunger shows up this soon. */
  firstHungerMs: 15_000,
  firstPoopMs: 30_000,
  poopEveryMs: [50_000, 80_000] as const,
};

type Care = { lastFed: number; lastBathed: number };

/** The to-do list on the home page note. Ticked off as the visitor does each one. */
export type Chores = { fed: boolean; cleaned: boolean; bathed: boolean; walked: boolean };
const NO_CHORES: Chores = { fed: false, cleaned: false, bathed: false, walked: false };
const CHORES_KEY = "pet:chores";
const ACTION_CHORE: Partial<Record<ActionType, keyof Chores>> = { feed: "fed", clean: "cleaned", bathe: "bathed" };

type PetContextValue = {
  /** False until the saved look has been read from localStorage. */
  hydrated: boolean;
  /** What the pet is wearing/holding. Saved automatically whenever it changes. */
  look: Look;
  setLook: (patch: Partial<Look>) => void;
  action: PetAction | null;
  trigger: (type: ActionType) => void;
  poos: Poo[];
  addPoo: (x: number) => void;
  needs: Needs;
  chores: Chores;
  markChore: (chore: keyof Chores) => void;
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

const isChores = (v: unknown): v is Chores =>
  isObject(v) && (["fed", "cleaned", "bathed", "walked"] as const).every((k) => typeof v[k] === "boolean");

const isCare = (v: unknown): v is Care =>
  isObject(v) && typeof v.lastFed === "number" && typeof v.lastBathed === "number";

const randomBetween = ([min, max]: readonly [number, number]) => min + Math.random() * (max - min);

export function PetProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [look, setLookState] = useState<Look>(DEFAULT_LOOK);
  const [action, setAction] = useState<PetAction | null>(null);
  const [poos, setPoos] = useState<Poo[]>([]);
  const [care, setCare] = useState<Care | null>(null);
  const [needs, setNeeds] = useState({ hungry: false, dirty: false });
  const [chores, setChores] = useState<Chores>(NO_CHORES);
  const actionTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const stored = readStorage(LOOK_KEY, isObject);
    const storedPoos = readStorage(POO_KEY, isPooList);
    const storedCare = readStorage(CARE_KEY, isCare);
    const storedChores = readStorage(CHORES_KEY, isChores);
    const now = Date.now();
    /* eslint-disable react-hooks/set-state-in-effect -- one-time sync from localStorage after hydration */
    if (stored) setLookState(toLook(stored));
    if (storedPoos) setPoos(storedPoos.slice(0, MAX_POOS));
    if (storedChores) setChores(storedChores);
    setCare(
      storedCare ?? {
        lastFed: now - CARE.hungryAfterMs + CARE.firstHungerMs,
        lastBathed: now,
      },
    );
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Every change is saved straight away. Skipped until hydrated so the defaults
  // never overwrite a look that's already stored.
  useEffect(() => {
    if (hydrated) writeStorage(LOOK_KEY, look);
  }, [look, hydrated]);

  const setLook = useCallback((patch: Partial<Look>) => {
    setLookState((current) => ({ ...current, ...patch }));
  }, []);

  useEffect(() => {
    if (care) writeStorage(CARE_KEY, care);
  }, [care]);

  useEffect(() => {
    if (hydrated) writeStorage(CHORES_KEY, chores);
  }, [chores, hydrated]);

  const markChore = useCallback((chore: keyof Chores) => {
    setChores((c) => (c[chore] ? c : { ...c, [chore]: true }));
  }, []);

  // Check hunger and dirt once a second. Only re-renders when one flips.
  useEffect(() => {
    if (!care) return;
    const check = () => {
      const now = Date.now();
      const hungry = now - care.lastFed > CARE.hungryAfterMs;
      const dirty = now - care.lastBathed > CARE.dirtyAfterMs;
      setNeeds((n) => (n.hungry === hungry && n.dirty === dirty ? n : { hungry, dirty }));
    };
    check();
    const t = setInterval(check, 1000);
    return () => clearInterval(t);
  }, [care]);

  const trigger = useCallback((type: ActionType) => {
    clearTimeout(actionTimer.current);
    setAction({ type, key: Date.now() });
    actionTimer.current = setTimeout(() => setAction(null), ACTION_MS[type]);
    const chore = ACTION_CHORE[type];
    if (chore) setChores((c) => (c[chore] ? c : { ...c, [chore]: true }));
    // Each care action fixes its need partway through its animation.
    if (type === "feed") {
      setTimeout(() => setCare((c) => c && { ...c, lastFed: Date.now() }), ACTION_MS.feed * 0.8);
    }
    if (type === "bathe") {
      setTimeout(() => setCare((c) => c && { ...c, lastBathed: Date.now() }), ACTION_MS.bathe * 0.6);
    }
    if (type === "clean") {
      // flush! (the poos spin away in PooPile while this plays)
      setTimeout(() => {
        setPoos([]);
        writeStorage(POO_KEY, []);
      }, ACTION_MS.clean * 0.6);
    }
  }, []);

  // When the last chore gets ticked off, mimi does a happy spin. Only on the
  // transition, so a returning visitor with everything done doesn't get one.
  const allDone = chores.fed && chores.cleaned && chores.bathed && chores.walked;
  const wasAllDone = useRef<boolean | null>(null);
  useEffect(() => {
    if (!hydrated) return;
    if (wasAllDone.current === false && allDone) {
      const t = setTimeout(() => trigger("spin"), ACTION_MS.feed);
      wasAllDone.current = true;
      return () => clearTimeout(t);
    }
    wasAllDone.current = allDone;
  }, [allDone, hydrated, trigger]);

  // mimi poops on her own every so often, like a real tamagotchi, but only
  // while the tab is visible, not mid-action, and not past the poo limit.
  const busyRef = useRef(false);
  const pooCountRef = useRef(0);
  useEffect(() => {
    busyRef.current = action !== null;
    pooCountRef.current = poos.length;
  });
  useEffect(() => {
    if (!hydrated) return;
    let nextPoopAt = Date.now() + CARE.firstPoopMs;
    const t = setInterval(() => {
      if (document.hidden || busyRef.current || Date.now() < nextPoopAt) return;
      nextPoopAt = Date.now() + randomBetween(CARE.poopEveryMs);
      if (pooCountRef.current < MAX_POOS) trigger("poo");
    }, 1000);
    return () => clearInterval(t);
  }, [hydrated, trigger]);

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
        look,
        setLook,
        action,
        trigger,
        poos,
        addPoo,
        needs: { ...needs, unhappy: poos.length > 0 },
        chores,
        markChore,
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
