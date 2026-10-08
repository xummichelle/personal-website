// All project content lives here. Add/edit projects and they show up on the
// grid pages and get their own detail page automatically.
//
// Images go in /public/projects/<slug>/ and need their pixel width/height so
// Next.js can lay them out without jumping around.

export type Category = "tech" | "creative";

export type Img = { src: string; width: number; height: number; alt: string; caption?: string };

export type Project = {
  slug: string;
  /** The list this project belongs to; its page lives under that list's URL. */
  category: Category;
  /** Also show the card in these other lists (it still links to the one page). */
  alsoIn?: Category[];
  title: string;
  date: string;
  tags: string[];
  /** One or two sentences for the card. */
  blurb: string;
  /** Soft tint used behind the card art and on tags. */
  color: string;
  cover?: Img;
  /** "contain" shows the whole cover on the card (e.g. a logo) instead of cropping it. */
  coverFit?: "cover" | "contain";
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
    slug: "sparkle",
    category: "tech",
    alsoIn: ["creative"],
    title: "sparkle",
    date: "Fall 2026 · in progress",
    tags: ["Stage lighting", "Light show", "Live event"],
    blurb:
      "The light show I'm programming for the Socratica Symposium, a 2000-attendee community demo day. My first time working with stage lighting!",
    color: "#f7efc4",
    doodle: "✨ sparkle",
    draft: true,
    sections: [
      {
        heading: "What is it?",
        paragraphs: [
          "Right now, sparkle is the light show I'm programming for the Socratica Symposium, a 2000 attendee community demo day. I've never worked with stage lighting before, but I couldn't resist the chance to work with technology that can impact a physical room.",
          "This page will fill up as the show comes together, so check back for progress, sketches and (hopefully) footage.",
        ],
      },
    ],
  },
  {
    slug: "bioadaptive-interface-lab",
    category: "tech",
    title: "Bioadaptive Interface Lab: Exercise & VR Rhythm Games",
    date: "May 2026 – Aug 2026",
    tags: ["Unity", "C#", "Meta Quest 3", "MediaPipe", "Python"],
    blurb:
      "As a game developer and designer intern, I built motion-controlled exercise games and a hand-tracked VR rhythm game for research on movement and play for older adults, from game feel to the tools researchers use.",
    color: "#d6e4d8",
    doodle: "🥁 ♪ VR drums",
    sections: [
      {
        heading: "Summary",
        paragraphs: [
          "Over the summer I designed and developed games for research into how play can keep people moving: three camera-based exercise games (cornhole, pickleball and air hockey) controlled with full-body pose tracking, and a VR drumming rhythm game for Meta Quest 3 played with your bare hands.",
          "The players were mostly older adults, many of them new to games and to this kind of tech, so a lot of the work was making controls feel forgiving and obvious, then testing that with real players and iterating.",
        ],
      },
      {
        heading: "Exercise games",
        bullets: [
          "Redesigned the cornhole throw so it reads intent, not accidents: a throw needs a quick, full arm motion from below the hip to above the shoulder, you raise your hand to pick up each new bag, and aiming locks while you throw so arm movement doesn't nudge your aim.",
          "Built automatic difficulty adjustment: the game notices when someone keeps almost making a throw and adapts the threshold to their range of motion, plus a calibration step at the start.",
          "Reworked the pickleball physics so every paddle hit calculates a shot that clears the net, fixed serve-state bugs, and tuned swing detection to use both speed and distance so slower movers still feel powerful.",
          "Studied how commercial motion games onboard players (interactive calibration, clear progress cues, \"raise your hand\" prompts) and built tutorials, animations and particle effects across all three games.",
          "Took part in co-design playtesting sessions with older adults and turned the feedback into changes, like adjustable difficulty and solo play over multiplayer.",
        ],
      },
      {
        heading: "VR rhythm game",
        bullets: [
          "Built hand-tracked drumming in Unity for Meta Quest 3, with raycast-based hit detection and tunable settings (resting threshold, minimum hit height, cooldown) so the game works whether someone lifts their whole arm or taps with their wrist resting on the table.",
          "Wrote a Python pipeline that turns a song's MIDI file into note timings on chosen beats of each measure, and fixed audio-sync issues along the way. Adding a new song now takes about 75% less work.",
          "Refactored one-scene-per-song into a single data-driven level scene backed by a song database, so new levels don't need new code.",
          "Polished the game feel: notes that burst at the hit line, \"good\" / \"almost\" pop-ups, scorecards, beach and forest environments, sound and volume options, and support for hands and controllers at the same time.",
          "Added the tools researchers need: a metronome practice mode with pause and timer, CSV logging of every hit and miss for movement-to-music timing metrics, settings menus, and documentation so future developers can keep adding songs.",
        ],
      },
      {
        heading: "What I took away",
        paragraphs: [
          "Designing for people who don't usually play games changed how I think about game feel: the best controls are the ones players never have to think about. I also loved owning games end to end, from the first prototype through playtesting to the tools other people build on.",
        ],
      },
    ],
  },
  {
    slug: "craftyly",
    category: "tech",
    title: "Craftyly",
    date: "Jan 2021 – Apr 2021",
    tags: ["Java", "Android", "Firebase", "Figma"],
    blurb:
      "An Android app for artists stuck in art block: swipe through art prompts, save ideas as notes and theme the app your way. Built for Technovation Girls 2021.",
    color: "#ece4f6",
    cover: img("craftyly", "logo.webp", 512, 512, "Craftyly logo: a lightbulb made of colourful paint swirls"),
    coverFit: "contain",
    links: [
      { label: "GitHub repo", href: "https://github.com/xummichelle/craftyly-app" },
      {
        label: "Figma prototype",
        href: "https://www.figma.com/proto/me5lQx8MGw3p8vHpCa56EM/Craftyly-Project?node-id=2-3&node-type=canvas&t=q18ZVkBnquqWuO58-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A3",
      },
      { label: "1-min demo video", href: "https://youtu.be/BBWoRHR6wrU" },
    ],
    sections: [
      {
        heading: "Summary",
        paragraphs: [
          "Craftyly is a personalized space for artists and their ideas. It helps visual artists push through art block with a stream of fresh prompts and challenges, and gives them somewhere to keep the ideas that come out of it.",
          "It started as my team's submission to the Technovation Girls 2021 challenge, where you get 12 weeks to build an app, write a business plan and pitch it to solve a real-world problem. I taught myself everything along the way.",
        ],
      },
      {
        heading: "Features",
        bullets: [
          "A prompt generator shown as a stack of cards: swipe right to save a prompt, left to pass. Prompts can be filtered by category (characters, environments…) and there's a full prompt history underneath.",
          "Notes for accepted and rejected prompts, plus your own quick notes, with swipe-to-delete.",
          "A gentle lightbulb message the first time you open the app each day, reminding you to take care of yourself.",
          "Colour themes that restyle the whole interface, including the lightbulb designs.",
          "Google sign-in or guest sign-in.",
        ],
      },
      {
        heading: "How I built it",
        bullets: [
          "Developed the Android app in Java with Firebase Authentication and Firestore as the backend (prompts live in Firestore).",
          "Used the MVVM architecture and object-oriented design so the code stays easy to extend.",
          "Designed the UI and a full clickable prototype in Figma.",
          "Wrote a business plan and a pitch alongside the app, all in under 3 months.",
        ],
      },
    ],
    gallery: [
      img("craftyly", "sign-in.webp", 486, 1005, "Craftyly sign-in screen", "Sign in"),
      img("craftyly", "prompts.webp", 247, 512, "Prompt generator card with prompt history", "Prompt generator"),
      img("craftyly", "notes.webp", 240, 512, "Notes screen with accepted and rejected prompts", "Notes"),
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
    title: "meelle crafts: Crochet Booth",
    date: "Fall 2025",
    tags: ["Crochet", "Small business", "Crafts 4 Charity"],
    blurb:
      "I crocheted a sheep bag, a giant strawberry plush and more, then sold them at my own booth at the Crafts 4 Charity fair, and learned a lot about pricing for pop-up markets.",
    color: "#f7efc4",
    cover: img("crochet-booth", "booth.webp", 1400, 991, "Michelle at her crochet booth with a strawberry plush, sheep bag and crochet flowers"),
    links: [{ label: "Full SLICC report (PDF)", href: "/projects/crochet-booth/slicc-report.pdf" }],
    sections: [
      {
        heading: "Summary",
        paragraphs: [
          "For my SLICC (a self-led course) I set out to run my own craft booth: crochet enough products, apply for a Crafts 4 Charity booth, and find a partner to share it with. I gave myself at least 5 hours of crocheting a week and checked in with crocheters I knew for advice along the way.",
          "By the end of the term I'd made a sheep bag, a giant strawberry plush and a sheep AirPod case, teamed up with a partner I met at the UW crochet club (who brought a big batch of crochet flowers), and we sold at the Crafts 4 Charity fair on Nov 24–25, 2025.",
        ],
      },
      {
        heading: "The booth",
        bullets: [
          "My pieces: sheep bag ($30), strawberry plush ($45) and sheep AirPod case ($15). My partner's flowers were $10 each or $45 a bouquet.",
          "I researched prices on Etsy and other booths, and sold 2 of my 3 pieces.",
          "Our \"Dance for $5 off\" sign was a last-minute idea that ended up pulling in a lot of attention (and delight).",
        ],
      },
      {
        heading: "What I learned",
        bullets: [
          "Pricing: my prices were fair for the size, but at a student pop-up people reach for small, cheap, impulse buys. Next time I'd make more ~$10 items.",
          "Time management: making big pieces takes ages. Scheduling real breaks (and time with friends) is what kept me going.",
          "Communication: as someone soft-spoken, I picked up simple ways to start conversations and draw people over, partly by watching my much more outgoing partner.",
          "Networking: taking a break from schoolwork to visit crochet club is how I found my booth partner.",
        ],
      },
      {
        heading: "What's next",
        paragraphs: [
          "Crocheting takes a long time, so next I want to write crochet patterns and sell them on Etsy: make something once, and share it with lots of people.",
        ],
      },
    ],
    gallery: [
      img("crochet-booth", "sheep-bag-1.webp", 946, 1261, "Sheep bag in progress: the first rows of bobble stitches", "Sheep bag: Oct 27"),
      img("crochet-booth", "sheep-bag-2.webp", 946, 1261, "Sheep bag in progress with a face and ears", "Nov 4"),
      img("crochet-booth", "sheep-bag-3.webp", 946, 1261, "Finished sheep bag with arms and legs", "Nov 16, ready for the fair!"),
      img("crochet-booth", "strawberry-plush.webp", 636, 844, "Giant pink strawberry plush with green leaves", "Strawberry plush"),
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

/** Projects whose page lives under this category (used to build the pages). */
export const pagesIn = (category: Category) => PROJECTS.filter((p) => p.category === category);

/** Every card shown on a category's list, including ones that live elsewhere. */
export const projectsIn = (category: Category) =>
  PROJECTS.filter((p) => p.category === category || p.alsoIn?.includes(category));

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
