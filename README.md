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
| Home page text + photo | `src/app/page.tsx`, `public/me.webp` |
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

- **Customising (home page):** the dropdowns change a *draft* look. **Save** stores it in
  `localStorage`, and leaving the page (or closing the tab) also saves whatever is picked.
- **Nav bar pet:** on every other page the pet shrinks onto the bar and wanders back and
  forth wearing the saved look. Clicking a nav link makes it jump or spin, and clicking
  the pet makes it hop.
- **Care buttons:**
  - **Feed:** the pet eats its favourite food bite by bite.
  - **Poo:** the pet leaves a poo behind (max 3). Two or more make it sad.
  - **Bathe:** a bath that washes the poos away.

## Still to fill in

- `craftyly` and `crochet-booth` in `src/data/projects.ts` are placeholders (`draft: true`).
- Project images were pulled from the portfolio PDF. Add more to each project's `gallery`.
