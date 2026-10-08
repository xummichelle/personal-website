import type { SVGProps } from "react";

// Hand-drawn-ish icons, all on a 32×32 grid using the current text colour.
const base = {
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

type IconProps = SVGProps<SVGSVGElement>;

const artStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Rice bowl with chopsticks, on the 32×32 grid. Shared by the Feed button and mimi's hungry thought bubble. */
export function BowlArt() {
  return (
    <g {...artStroke}>
      <path d="M12 7c-1.5-1.5 1.5-2.5 0-4.5M17 7c-1.5-1.5 1.5-2.5 0-4.5" opacity={0.6} />
      <path d="M19 12 29 4M21 13l9-6" />
      <path d="M6 15c1-4 5-6 10-6s9 2 10 6" fill="#fff" />
      <path d="M4 15h24c0 7-5 12-12 12S4 22 4 15Z" fill="#6d7fc0" />
      <path d="M8 19h16" stroke="#efdf8a" strokeWidth={2.4} />
    </g>
  );
}

/** Broken heart, on the 32×32 grid: mimi's "unhappy" thought. */
export function BrokenHeartArt() {
  return (
    <g {...artStroke}>
      <path d="M16 27C9 22 4 17 4 11.5 4 8 6.8 5 10.3 5c2.4 0 4.4 1.3 5.7 3.3C17.3 6.3 19.3 5 21.7 5 25.2 5 28 8 28 11.5 28 17 23 22 16 27Z" fill="#a8434b" />
      <path d="M16 8.3 13.5 14l4 2.5-2.5 5.5" stroke="#fff" strokeWidth={2.4} />
    </g>
  );
}

export function BowlIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden {...props}>
      <BowlArt />
    </svg>
  );
}

/** A toilet (side view: tall tank, seat, bowl, pedestal), for flushing mimi's poos away. */
export function ToiletIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x={4.5} y={2.5} width={10.5} height={13} rx={2} fill="#fff" />
      <path d="M7.5 6h4" />
      <path d="M6.5 16h19.5c0 4.3-3.4 7-7.5 7.4l1.2 5.6h-8.4l1-5.7c-3.6-.9-5.8-3.5-5.8-7.3Z" fill="#fff" />
      <path d="M4 16h23.5" strokeWidth={2.8} />
      <path d="M25 4.5l1.2 1.2M28.5 8h1.5M24.5 8.5l-.8.8" stroke="#6d7fc0" />
    </svg>
  );
}

export function BathIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 15V7a3 3 0 0 1 6 0" />
      <path d="M3 15h26l-2 8c-1 3-3 4-6 4H11c-3 0-5-1-6-4Z" fill="#6d7fc0" />
      <path d="M9 27l-1 3M23 27l1 3" />
      <circle cx={19} cy={9} r={2} fill="#fff" />
      <circle cx={24} cy={6} r={1.5} fill="#fff" />
      <circle cx={23} cy={11} r={1} fill="#fff" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 15 16 5l11 10" />
      <path d="M8 13v13h16V13" />
      <path d="M13 26v-7h6v7" />
    </svg>
  );
}

export function CodeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M11 9 4 16l7 7M21 9l7 7-7 7M18 6l-4 20" />
    </svg>
  );
}

export function BrushIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M27 4 14 17" />
      <path d="M14 17c-3-2-7 0-7 4 0 3-2 5-4 5 4 2 10 2 12-2 1-2 1-5-1-7Z" />
    </svg>
  );
}

export function ResumeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 4h12l5 5v19H8Z" />
      <path d="M20 4v5h5M12 15h9M12 20h9M12 25h5" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x={4} y={4} width={24} height={24} rx={5} />
      <path d="M10 14v9M10 10v.5M15 23v-9M15 18c0-3 2-4 4-4s3 1 3 4v5" />
    </svg>
  );
}

export function GitHubIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 26c-5 1.5-5-2.5-7-3M19 28v-4c0-1.5.2-2.5-1-3.5 4-.5 7-2 7-7.5 0-1.5-.5-3-1.5-4 .3-1 .4-2.5-.2-4 0 0-1.3-.4-4.2 1.5a14 14 0 0 0-7.2 0C7 5.6 5.8 6 5.8 6c-.6 1.5-.5 3-.2 4-1 1-1.5 2.5-1.5 4 0 5.5 3 7 7 7.5-.8.7-1 1.7-1 3V28" />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M26 16H7M14 8l-8 8 8 8" />
    </svg>
  );
}

export function ExternalIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M18 5h9v9M27 5 14 18M23 19v8H5V9h8" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x={4} y={7} width={24} height={18} rx={3} />
      <path d="m5 9 11 8 11-8" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx={16} cy={11} r={5} />
      <path d="M6 27c1-6 5-9 10-9s9 3 10 9" />
    </svg>
  );
}
