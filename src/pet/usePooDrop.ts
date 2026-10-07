"use client";

import { useEffect, useRef } from "react";
import { ACTION_MS, usePet } from "./PetProvider";

/**
 * When the "poo" action plays, drop a poo partway through the squat.
 * `getX` returns where it lands, as a 0–1 fraction across the poo area.
 */
export function usePooDrop(getX: () => number) {
  const { action, addPoo } = usePet();
  const getXRef = useRef(getX);
  useEffect(() => {
    getXRef.current = getX;
  });

  useEffect(() => {
    if (action?.type !== "poo") return;
    const t = setTimeout(() => addPoo(getXRef.current()), ACTION_MS.poo * 0.55);
    return () => clearTimeout(t);
  }, [action, addPoo]);
}
