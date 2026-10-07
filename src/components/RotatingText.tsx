"use client";

import { useEffect, useState } from "react";

/** Cycles through phrases, sliding each new one up into place. */
export function RotatingText({ phrases, interval = 2200 }: { phrases: string[]; interval?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % phrases.length), interval);
    return () => clearInterval(t);
  }, [phrases.length, interval]);

  return (
    <span key={i} className="rotate-in inline-block" aria-hidden>
      {phrases[i]}
    </span>
  );
}
