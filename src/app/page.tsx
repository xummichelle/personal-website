import { HomePet } from "@/components/HomePet";
import { RotatingText } from "@/components/RotatingText";

const DOING = ["is designing", "is developing software", "is working on games", "is crocheting"];

export default function Home() {
  return (
    <main className="page-pad flex-1 overflow-x-clip bg-card">
      <div className="mx-auto max-w-5xl px-5 pt-16 sm:px-8 sm:pt-24">
        {/* Sized so the longest phrase fits on one line on desktop; smaller screens reserve the lines the longest phrase needs so nothing jumps. */}
        <h1 className="fade-in min-h-[2.3em] font-hand text-[2rem] leading-[1.12] sm:text-5xl lg:min-h-0 lg:text-6xl lg:whitespace-nowrap">
          <span className="sr-only">Michelle Xu is designing, developing software, working on games and crocheting</span>
          <strong className="font-bold" aria-hidden>
            Michelle Xu
          </strong>{" "}
          <RotatingText phrases={DOING} />
        </h1>
        <HomePet />
      </div>
    </main>
  );
}
