# Michelle Xu — portfolio

A Next.js portfolio with a little pet that lives on the nav bar.

```bash
npm install     # first time only
npm run dev     # http://localhost:3000
npm run build   # production build check
```

## Where things live

| What | File |
| --- | --- |
| Colours (CSS variables) | `src/app/globals.css` → `:root` |
| Fonts (Fraunces / DM Sans / Schoolbell) | `src/app/layout.tsx` |
| Home page (rotating headline + pet) | `src/app/page.tsx`, `src/components/HomePet.tsx` |
| About me (bio + photo) | `src/app/about/page.tsx`, `public/me.webp` |
| Projects (cards + detail pages) | `src/data/projects.ts`, images in `public/projects/<slug>/` |
| Links (email, LinkedIn, GitHub, resume) | `src/data/site.ts`, `public/resume.pdf` |
| Nav bar | `src/components/NavBar.tsx` |
| Pet drawing + animations | `src/pet/Pet.tsx`, keyframes at the bottom of `globals.css` |
| Hats / toys / foods | `src/pet/accessories.tsx` |
| Pet name, PNG swap, anchor points | `src/pet/config.ts` |

## Swapping in your own pet drawing

1. Save your drawing as a transparent PNG in `public/pet/` (e.g. `public/pet/pet.png`).
   It is drawn into a 200 × 220 box, so that aspect ratio fits best.
2. In `src/pet/config.ts`, set `PET_IMAGE = "/pet/pet.png"`.
3. Adjust `ANCHORS` in the same file so hats land on the head (`head`), the toy sits in
   the left hand (`leftHand`) and the food sits in the right hand (`rightHand`). The
   coordinates use the same 200 × 220 box.

Accessories can be PNGs too. In `src/pet/accessories.tsx`, replace an item's `render`
with `image: { src: "/pet/crown.png", width: 60, height: 40 }`. The image is centred
on its anchor point.

When `PET_IMAGE` is set, the generated face expressions (eating, straining, happy eyes)
switch off, but every animation (shake, squat, jump, spin, bath, walking jitter) still
works because those animate the whole drawing.

## How the pet works

- **Customising (home page):** the carousel arrows around the pet (‹ › for the hat, ▲ ▼ beside each
  hand), or the little ‹ › arrows in the note, change mimi's look. Every change is saved to
  `localStorage` straight away, so it's still there after a reload or on other pages.
- **Nav bar pet:** on every other page the pet shrinks onto the bar and wanders back and
  forth wearing the same look. Clicking a nav link makes it jump or spin, and clicking
  the pet makes it hop.
- **Tamagotchi care:** mimi has three needs, each fixed by a button in the middle of the nav bar:
  - **Hungry** (rice bowl in a thought bubble) → **Feed**: mimi eats her favourite food bite by bite.
  - **Unhappy** (broken heart in a thought bubble) → **Clean up**: mimi poops on her own every
    minute or so, and is unhappy (sad face) while any poo is lying around. Clean flushes it away.
  - **Dirty** (mud smudges + stink lines) → **Bathe**.

  The timings live in `CARE` in `src/pet/PetProvider.tsx`. When she last ate / bathed is saved,
  so coming back later finds a hungry, smelly mimi.

- **To-do list:** the home page note has a "p.s." checklist (feed, clean up, bath, walk through the
  portfolio). Each line ticks itself off when the visitor does it, from the nav bar or by clicking the
  line, and is saved in `localStorage`. Finishing the list makes mimi do a happy spin.

## Adding a project

Add an entry to `PROJECTS` in `src/data/projects.ts` and put its images in
`public/projects/<slug>/`. Set `draft: true` to show a "still being sketched out" note on its
page, and `coverFit: "contain"` for covers that shouldn't be cropped (like a logo).
