// All project content lives here. Add/edit projects and they show up on the
// grid pages and get their own detail page automatically.
//
// Images go in /public/projects/<slug>/ and need their pixel width/height so
// Next.js can lay them out without jumping around.

export type Category = "tech" | "creative";

export type Img = { src: string; width: number; height: number; alt: string; caption?: string };

export type Project = {
  slug: string;
  category: Category;
  title: string;
  date: string;
  tags: string[];
  /** One or two sentences for the card. */
  blurb: string;
  /** Soft tint used behind the card art and on tags. */
  color: string;
  cover?: Img;
  /** Shown on the card when there's no cover image. */
  doodle?: string;
  links?: { label: string; href: string }[];
  sections: { heading: string; paragraphs?: string[]; bullets?: string[] }[];
  gallery?: Img[];
  /** True while the write-up still needs Michelle's real details. */
  draft?: boolean;
};

const img = (slug: string, file: string, width: number, height: number, alt: string, caption?: string): Img => ({
  src: `/projects/${slug}/${file}`,
  width,
  height,
  alt,
  caption,
});

export const PROJECTS: Project[] = [
  // ── Tech ────────────────────────────────────────────────────────────────
  {
    slug: "craftyly",
    category: "tech",
    title: "Craftyly",
    date: "Coming soon",
    tags: ["Web app"],
    blurb: "A crafty little app. The full write-up is on its way!",
    color: "#f2dade",
    doodle: "✂︎ craftyly",
    draft: true,
    sections: [
      {
        heading: "What is it?",
        paragraphs: [
          "Craftyly is a work in progress, and the full write-up is coming soon. Check back for the story behind it, how it was built, and what's next.",
        ],
      },
    ],
  },
  {
    slug: "nara",
    category: "tech",
    title: "Nara",
    date: "Nov 2021 – Jan 2022",
    tags: ["Unity", "C#", "Aseprite", "Pixel art"],
    blurb:
      "An escape-room puzzle game in Unity: movable characters, interactable objects, dialogue and multiple levels, with all the pixel art drawn by me.",
    color: "#dfe5f6",
    cover: img("nara", "level-1.webp", 1263, 707, "A pixel art level from Nara with a chalkboard and lockers"),
    links: [{ label: "GitHub repo", href: "https://github.com/nathan8255/Nara" }],
    sections: [
      {
        heading: "Summary",
        paragraphs: [
          "Nara is an escape-room style puzzle game built in Unity. Players move characters around each room, inspect and interact with objects, talk to other characters, and piece together clues to unlock the next level.",
        ],
      },
      {
        heading: "What I did",
        bullets: [
          "Programmed gameplay systems in C#: player movement, interactable objects, dialogue and level progression.",
          "Designed the puzzles and how each level's clues lead into one another.",
          "Created the UI and pixel art assets in Aseprite, including animated character sprite sheets.",
        ],
      },
    ],
    gallery: [
      img("nara", "level-1.webp", 1263, 707, "Classroom level", "Game level screenshots!"),
      img("nara", "level-2.webp", 1269, 713, "Convenience store level"),
      img("nara", "sprites-1.webp", 750, 150, "Character sprite sheet", "Pixel art animation sprite sheets"),
      img("nara", "sprites-2.webp", 600, 100, "Pet sprite sheet"),
    ],
  },
  {
    slug: "double-degree-club-website",
    category: "tech",
    title: "Double Degree Club Website",
    date: "May 2024 – May 2025",
    tags: ["Web dev", "Figma", "Design system"],
    blurb:
      "Redesigned and rebuilt ddclub.ca to match the club's new design system, creating one hub for double-degree students to find resources and program info.",
    color: "#dfe5f6",
    cover: img("ddc-website", "after.webp", 1086, 1228, "The redesigned Double Degree Club website"),
    links: [
      { label: "Visit ddclub.ca", href: "https://ddclub.ca/" },
      { label: "GitHub repo", href: "https://github.com/uw-wlu-ddc/website" },
    ],
    sections: [
      {
        heading: "What is Double Degree Club?",
        paragraphs: [
          "Double Degree Club is a student-run organization that hosts events and shares resources for students in the double degree program at the University of Waterloo and Wilfrid Laurier University.",
        ],
      },
      {
        heading: "What I did",
        bullets: [
          "Redesigned the site to follow the club's new, consistent design system (which I also created; see the design project!).",
          "Developed the new website so it works as one hub for students to find resources and program information.",
          "Built pages like the merch shop and \"who we are\" sections in the club's welcoming, youthful style.",
        ],
      },
      {
        heading: "Before → after",
        paragraphs: [
          "The old site was dark and text-heavy. The new one uses the club's purple and yellow palette, friendly illustrations, and a clear structure.",
        ],
      },
    ],
    gallery: [
      img("ddc-website", "before.webp", 1400, 664, "The old Double Degree Club website", "Before…"),
      img("ddc-website", "after.webp", 1086, 1228, "The new Double Degree Club website", "After!"),
      img("ddc-website", "merch-page.webp", 1206, 1022, "Merch section of the new site"),
    ],
  },
  {
    slug: "f1-stats-engine",
    category: "tech",
    title: "F1 Stats Engine",
    date: "Sep 2025 – Dec 2025",
    tags: ["Python", "FastAPI", "MySQL", "React", "Docker"],
    blurb:
      "A Formula 1 visualization app backed by a MySQL schema I designed, running complex queries to surface race and driver insights.",
    color: "#f0d6d3",
    doodle: "🏎 F1",
    links: [{ label: "GitHub repo", href: "https://github.com/JSiggelkow/Formula-1-Visualizer" }],
    sections: [
      {
        heading: "Summary",
        paragraphs: [
          "F1 Stats Engine turns decades of Formula 1 results into something you can explore. A FastAPI backend runs queries against a MySQL database, and a React front end turns the results into race and driver visualizations.",
        ],
      },
      {
        heading: "What I did",
        bullets: [
          "Designed and implemented the MySQL database schema for F1 data (drivers, constructors, races, results and more).",
          "Developed the visualization app that runs complex MySQL queries to display race and driver insights.",
          "Ran performance tests and optimized slow queries with indexes.",
          "Containerized the stack with Docker so it runs the same everywhere.",
        ],
      },
    ],
  },
  {
    slug: "stardew-mod",
    category: "tech",
    title: "Talk By Mail: Stardew Valley Mod",
    date: "July 2026 – Present",
    tags: ["C#", ".NET", "Azure OpenAI"],
    blurb:
      "An AI-augmented NPC dialogue mod for Stardew Valley. Write letters to villagers and get personality-consistent replies in the mail.",
    color: "#d6e4d8",
    doodle: "✉︎ dear abigail…",
    links: [{ label: "GitHub repo", href: "https://github.com/xummichelle/TalkByMailMod" }],
    sections: [
      {
        heading: "Summary",
        paragraphs: [
          "Talk By Mail is a Stardew Valley game extension that lets you write to the villagers of Pelican Town. Each reply arrives in your mailbox and stays true to that character's personality.",
        ],
      },
      {
        heading: "How it works",
        bullets: [
          "Built on .NET and C# as a Stardew Valley mod.",
          "Integrates Azure OpenAI to generate dialogue and mail responses.",
          "Uses NLP and sentiment analysis so replies stay consistent with each NPC's personality and how they feel about you.",
        ],
      },
      {
        heading: "Status",
        paragraphs: ["Actively in development!"],
      },
    ],
  },

  // ── Creative ────────────────────────────────────────────────────────────
  {
    slug: "crochet-booth",
    category: "creative",
    title: "Crochet Booth",
    date: "Coming soon",
    tags: ["Crochet", "Small business"],
    blurb: "Handmade crochet pieces and a booth to sell them. Photos and the full story are on their way!",
    color: "#f7efc4",
    doodle: "🧶 crochet",
    draft: true,
    sections: [
      {
        heading: "The booth",
        paragraphs: ["Photos and the full story of the crochet booth are coming soon."],
      },
    ],
  },
  {
    slug: "double-degree-club-design",
    category: "creative",
    title: "Double Degree Club Design",
    date: "May 2024 – May 2025",
    tags: ["Figma", "Procreate", "Illustrator"],
    blurb:
      "Built a consistent design system for the club and designed event posts that averaged 70 sign-ups per event.",
    color: "#dfe5f6",
    cover: img("ddc-design", "trivia.webp", 1296, 1294, "DDC trivia night Instagram post"),
    links: [{ label: "Visit ddclub.ca", href: "https://ddclub.ca/" }],
    sections: [
      {
        heading: "What I did",
        bullets: [
          "Created a consistent design system that future marketing and design leads can easily follow.",
          "Designed Instagram posts for events, attracting an average of 70 sign-ups per event.",
          "Carried the new style over to the club website (see the tech project!).",
        ],
      },
      {
        heading: "Before…",
        paragraphs: [
          "The club already used purple and yellow, but the branding still felt unclear because the fonts, saturation and design styles kept changing from post to post.",
        ],
      },
      {
        heading: "…and my thought process",
        paragraphs: [
          "Taking cues from similar clubs like CS Club and MathSoc at UWaterloo, I picked a specific set of colours, fonts and a style that match the club's welcoming, youthful and modern personality, then used them consistently everywhere.",
        ],
      },
    ],
    gallery: [
      img("ddc-design", "before.webp", 1400, 620, "Older DDC posts with mixed styles", "Before…"),
      img("ddc-design", "trivia.webp", 1296, 1294, "Trivia night post", "After!"),
      img("ddc-design", "bonfire.webp", 1294, 1286, "Bonfire event post"),
      img("ddc-design", "frisbee.webp", 1300, 1302, "Frisbee and friends post"),
      img("ddc-design", "merch.webp", 1286, 1286, "Merch summer sale post"),
    ],
  },
  {
    slug: "socratica",
    category: "creative",
    title: "Socratica Host: Design & Marketing",
    date: "Sept 2025 – Dec 2025",
    tags: ["Figma", "Procreate", "Illustration"],
    blurb:
      "Hand-illustrated weekly Instagram stories for Socratica co-working sessions (~80 sign-ups each), plus the Demo Day campaign that drew 270 attendees.",
    color: "#e8eefa",
    cover: img("socratica", "demo-day-post.webp", 1080, 1080, "Socratica Express demo day illustration"),
    links: [{ label: "socratica.info", href: "https://socratica.info" }],
    sections: [
      {
        heading: "What is Socratica?",
        paragraphs: [
          "Socratica is a student-made non-profit that hosts weekly co-working sessions for artists, builders, engineers and anyone else who wants to work on passion projects.",
        ],
      },
      {
        heading: "What I did",
        bullets: [
          "Designed stylized weekly Instagram stories in Figma and Procreate, attracting an average of 80 sign-ups per co-working session.",
          "Designed the marketing materials for the end-of-term Demo Day, \"Socratica Express\", which had 270 checked-in attendees.",
          "Designed a stamp card for Demo Day attendees.",
        ],
      },
    ],
    gallery: [
      img("socratica", "story-1.webp", 787, 1400, "Story: take shelter and get some work done", "Weekly co-working session stories"),
      img("socratica", "story-2.webp", 787, 1400, "Story: Act IV morning edition"),
      img("socratica", "story-3.webp", 787, 1400, "Story: it's been a rainy week"),
      img("socratica", "story-4.webp", 787, 1400, "Story: join us for another morning session"),
      img("socratica", "story-5.webp", 787, 1400, "Story: Socratica Act V"),
      img("socratica", "story-6.webp", 787, 1400, "Story: we're back again"),
      img("socratica", "story-7.webp", 787, 1400, "Story: Act VIII morning edition"),
      img("socratica", "story-8.webp", 787, 1400, "Story: wait, there's something inside"),
      img("socratica", "story-9.webp", 787, 1400, "Story: oh no my tomato"),
      img("socratica", "story-10.webp", 787, 1400, "Story: RSVP to receive the location"),
      img("socratica", "demo-day-post.webp", 1080, 1080, "Socratica Express Instagram post", "End of Term Demo Day: Socratica Express"),
      img("socratica", "demo-day-story-1.webp", 788, 1400, "Socratica Express story"),
      img("socratica", "demo-day-story-2.webp", 787, 1400, "You are invited story"),
      img("socratica", "demo-day-story-3.webp", 787, 1400, "We have something for you story"),
      img("socratica", "stamp-card.webp", 1400, 933, "Stamp card for attendees", "Stamp card design for attendees"),
    ],
  },
  {
    slug: "wellsprings",
    category: "creative",
    title: "Wellsprings: Game Jam",
    date: "Jun 2025",
    tags: ["Unity", "C#", "Procreate", "72-hour jam"],
    blurb:
      "A PvE survival-defense game made in 72 hours: a nymph fights oil-spill creatures to protect their wellsprings. I developed the game and drew its 2D art.",
    color: "#e8eefa",
    cover: img("wellsprings", "intro.webp", 1400, 821, "Wellsprings intro art: misty mountains over a lake"),
    links: [{ label: "Play on itch.io", href: "https://mark123m.itch.io/wellsprings" }],
    sections: [
      {
        heading: "Summary",
        paragraphs: [
          "Wellsprings is a PvE survival-defense Unity game where a nymph fights off oil-spill creatures to protect their wellsprings. It was made in 72 hours for the University of Waterloo S25 Game Jam.",
          "The main mechanics work, but the game as a whole is still unfinished (for example, the intro is a ~30-second placeholder).",
        ],
      },
      {
        heading: "What I did",
        bullets: [
          "Developed gameplay in Unity and C#.",
          "Drew the 2D assets in Procreate, including the intro art and health bar.",
        ],
      },
    ],
    gallery: [img("wellsprings", "intro.webp", 1400, 821, "Wellsprings intro art", "Intro art")],
  },
  {
    slug: "life-drawing",
    category: "creative",
    title: "Life Drawing",
    date: "2025",
    tags: ["Graphite", "Figure drawing", "Digital"],
    blurb: "Quick 5-minute gestures and longer 30–35 minute figure studies from life drawing sessions, plus some digital pieces.",
    color: "#ece7dc",
    cover: img("life-drawing", "35min.webp", 1400, 973, "35 minute figure sketch of a reclining model"),
    sections: [
      {
        heading: "About",
        paragraphs: [
          "Life drawing is how I practise seeing: quick 5-minute gestures to capture movement, and longer 30–35 minute studies to work on proportion, weight and light.",
        ],
      },
    ],
    gallery: [
      img("life-drawing", "35min.webp", 1400, 973, "Reclining figure", "35 min sketch"),
      img("life-drawing", "5min-1.webp", 1400, 973, "Gesture sketches", "5 min sketches"),
      img("life-drawing", "5min-2.webp", 1400, 973, "Gesture sketches"),
      img("life-drawing", "30min-1.webp", 1105, 792, "Figure lying on a bed", "30 min sketch"),
      img("life-drawing", "5min-3.webp", 1400, 933, "Gesture sketches", "5 min sketches"),
      img("life-drawing", "30min-2.webp", 1400, 933, "Seated figure", "30 min sketch"),
      img("life-drawing", "digital-1.webp", 1400, 1400, "Digital painting of a girl in a sweater", "Digital art"),
      img("life-drawing", "digital-2.webp", 1170, 913, "Digital painting with a crow"),
    ],
  },
];

export const projectsIn = (category: Category) => PROJECTS.filter((p) => p.category === category);

export const getProject = (category: Category, slug: string) =>
  PROJECTS.find((p) => p.category === category && p.slug === slug);

export const CATEGORY_INFO: Record<Category, { title: string; path: string; intro: string }> = {
  tech: {
    title: "Tech projects",
    path: "/tech-projects",
    intro: "Games, tools and websites I've built. Click a card for the full story!",
  },
  creative: {
    title: "Creative projects",
    path: "/creative-projects",
    intro: "Illustration, design, game art and things made with yarn. Click a card to see more!",
  },
};
