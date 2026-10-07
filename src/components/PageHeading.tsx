import { Scallop } from "./Decorations";

/** Blue Plume-style header band that scallops into the page below. */
export function PageHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="fade-in">
      <div className="mx-auto max-w-5xl px-5 pt-14 pb-12 text-center sm:px-8 sm:pt-20">
        <h1 className="font-hand text-5xl leading-none sm:text-7xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-xl text-ink-soft">{subtitle}</p>}
      </div>
      <Scallop />
    </header>
  );
}
