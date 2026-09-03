# საგანძურის მარათონი — Treasure Marathon

A cinematic, scroll-driven one-page experience for the *Treasure Marathon* campaign:
an ancient treasure shatters into millions of golden coins, and four great houses race
to collect them.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS · GSAP ScrollTrigger ·
Framer Motion · Lenis**.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## The experience

| Section | What happens |
| --- | --- |
| **Hero — The Shattering** | A hoard of coins rests along the horizon on an HTML canvas. Scrolling scrubs one GSAP timeline that launches the coins across the frame under gravity while the headline breaks apart glyph by glyph, each on its own vector, blurring out as three background plates parallax at different speeds. |
| **Legend — Scrollytelling** | Three chapters reveal on scroll (lift + unblur + stagger). A sticky illustration column crossfades to match whichever chapter owns the middle of the viewport, over a parallaxing, hue-shifting background. |
| **Houses — Horizontal rail** | On desktop the viewport pins and the four house crests translate sideways, with a progress rail beneath. Each card tilts in 3D toward the cursor, lights a pointer-tracking glow, and unfurls its description and trait bars on hover. On mobile it degrades to a vertical stack with everything visible. |
| **CTA — The Marathon Continues** | A closing act with a gentle coin drift, a leaderboard teaser, and two magnetic buttons that chase the cursor and sweep a gilded sheen. |

## Structure

```
app/
  layout.tsx          Fonts (Noto Serif/Sans Georgian), metadata, grain overlay
  page.tsx            Composes the four sections inside <SmoothScroll>
  globals.css         Tokens, gilded text, glass surfaces, film grain
components/
  SmoothScroll.tsx    Lenis wired into GSAP's ticker (one RAF loop, no pin jitter)
  Nav.tsx / Footer.tsx
  sections/           Hero · Legend · Houses · CTA
  ui/                 CoinField · HouseCard · MagneticButton · Placeholder ·
                      Starfield · ScrollCue · SectionLabel
lib/
  gsap.ts             Single ScrollTrigger registration point
  motion.ts           Shared easing + Framer variants
  houses.ts           All copy: the four houses and the three legend chapters
hooks/                useIsomorphicLayoutEffect · usePrefersReducedMotion
```

## Editing content

All Georgian copy lives in `lib/houses.ts` — `HOUSES` (name, motto, description,
traits, accent colour, sigil) and `LEGEND_CHAPTERS` (kicker, title, body). The hero
headline and CTA paragraph sit in their own section components.

## Swapping in the real artwork

Illustrations are stylized placeholders — a gilded frame, an ambient glow tinted by
the section's accent colour, and the descriptive caption. To use final art, replace
the body of `components/ui/Placeholder.tsx` with a `next/image` `<Image />` (keeping
the wrapper's aspect ratio), or drop an `<Image />` in place of the `<Placeholder />`
call sites in `Legend.tsx` and the crest plate in `HouseCard.tsx`. Each placeholder's
caption names the shot it stands in for.

The CTA leaderboard bars use illustrative numbers (`STANDINGS` in `CTA.tsx`), labelled
as placeholder data on the page — wire them to the real leaderboard before launch.
Both CTA buttons currently point at in-page anchors (`#leaderboard`, `#quiz-start`).

## Notes on the animation layer

- **One scroll driver.** Lenis emits scroll, GSAP's ticker drives Lenis, and
  `ScrollTrigger.update` runs off the same tick — pinned sections stay rock steady.
- **Canvas outside React.** `CoinField` reads progress from a ref that GSAP and
  Framer write to directly, so scrubbing never re-renders the tree.
- **Cleanup.** Every effect runs inside `gsap.context(...)` and reverts on unmount, so
  Strict Mode's double-invoke and route changes don't leave triggers behind.
- **Reduced motion is honoured throughout:** Lenis is not started, the coin canvas
  paints a single composed frame, and CSS transitions collapse — all content still
  renders in its final state.

## Responsive behaviour

Verified from 390px to 1440px with no horizontal overflow. The houses rail switches
from pinned-horizontal to stacked at the `lg` breakpoint, hover-only reveals become
always-visible on touch, and the hoard thins out on small screens.
