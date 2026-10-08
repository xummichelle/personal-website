"use client";

import { useEffect, useRef, useState } from "react";
import { Pet } from "@/pet/Pet";
import { PooPile } from "@/pet/PooPile";
import { usePet } from "@/pet/PetProvider";
import { usePooDrop } from "@/pet/usePooDrop";
import { useMounted } from "@/pet/useMounted";

const PET_WIDTH = 92;
const SPEED = 42; // px per second

/**
 * The small pet that lives on top of the nav bar, wandering back and forth.
 * It pauses now and then, turns around at the edges, and stops to play any
 * triggered action (feed, poo, bath, jump, spin).
 */
export function WalkingPet() {
  // The pet's look only exists in the browser, so don't server-render it.
  return useMounted() ? <Walker /> : null;
}

function Walker() {
  const { look, action, poos, trigger, needs, markChore } = usePet();

  // Being out on the nav bar counts as taking mimi for a walk (the note's to-do list).
  useEffect(() => markChore("walked"), [markChore]);
  const laneRef = useRef<HTMLDivElement>(null);
  const petRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);
  const x = useRef<number | null>(null);
  const dir = useRef<1 | -1>(1);
  const busy = useRef(false);
  const [walking, setWalking] = useState(false);

  useEffect(() => {
    busy.current = action !== null;
  }, [action]);

  usePooDrop(() => {
    const lane = laneRef.current?.clientWidth ?? 1;
    const behind = (x.current ?? 0) + PET_WIDTH / 2 - dir.current * (PET_WIDTH * 0.55);
    return Math.min(0.97, Math.max(0.03, behind / lane));
  });

  useEffect(() => {
    let frame = 0;
    let last = performance.now();
    let pausedUntil = last + 1100; // let the arrival animation finish first
    let nextPause = last + 3000 + Math.random() * 4000;
    let moving = false;

    const tick = (now: number) => {
      const lane = laneRef.current;
      const pet = petRef.current;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (lane && pet) {
        const max = Math.max(0, lane.clientWidth - PET_WIDTH);
        if (x.current === null) x.current = max / 2;

        const shouldMove = !busy.current && now > pausedUntil;
        if (shouldMove) {
          x.current += dir.current * SPEED * dt;
          if (x.current <= 0 || x.current >= max) {
            x.current = Math.min(max, Math.max(0, x.current));
            dir.current = dir.current === 1 ? -1 : 1;
          }
          if (now > nextPause) {
            pausedUntil = now + 900 + Math.random() * 2200;
            nextPause = pausedUntil + 3000 + Math.random() * 5000;
            if (Math.random() < 0.4) dir.current = dir.current === 1 ? -1 : 1;
          }
        }
        if (shouldMove !== moving) {
          moving = shouldMove;
          setWalking(shouldMove);
        }
        pet.style.transform = `translateX(${x.current}px)`;
        if (flipRef.current) flipRef.current.style.transform = `scaleX(${dir.current})`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div ref={laneRef} className="pointer-events-none absolute inset-x-2 bottom-full h-24 sm:inset-x-6">
      <PooPile poos={poos} size={30} flushing={action?.type === "clean"} />
      <div ref={petRef} className="absolute -bottom-1.25 left-0" style={{ width: PET_WIDTH }}>
        <div className="pet-arrive">
          <div ref={flipRef}>
            <button
              type="button"
              onClick={() => trigger("jump")}
              className="pointer-events-auto block w-full cursor-pointer"
              aria-label="Boop the pet"
            >
              <Pet look={look} action={action} walking={walking} needs={needs} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
