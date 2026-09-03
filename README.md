# საგანძურის მარათონი — Treasure Marathon

A scroll-driven landing page for the *Treasure Marathon* campaign, built in the
graphic-novel language of [santionispirits.com](https://santionispirits.com):
inked panels on grained paper, captions hung off panel edges, colour floods,
and sections that part on a hand-torn contour.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS · GSAP
ScrollTrigger · Framer Motion · Lenis**.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/
```

## Where the design comes from

`santionispirits.com` is unreachable from the build environment (its network
policy denies the host), so the design was reverse-engineered from 27
scroll-ordered screenshots supplied by the client. Those frames are kept in
`docs/design-references/`, and the extracted palette, type, structural devices
and interactions are written up in
[`docs/research/santionispirits/DESIGN-SPEC.md`](docs/research/santionispirits/DESIGN-SPEC.md).

Every value in the build traces back to that spec. Nothing was read from
computed CSS, so colours are sampled by eye and are close, not exact.

## The four structural devices

The whole page is assembled from these, matching the reference:

| Device | Component | What it does |
| --- | --- | --- |
| Panel | `ui/Panel` | Bordered rectangle holding artwork; panels overlap and bleed off the viewport |
| Caption box | `ui/Caption` | Off-white box with a hairline border, hung off a panel edge, never centred |
| Colour flood | section-level | A section abandons the paper ground and fills the viewport with one accent |
| Torn edge | `ui/TornEdge` | Sections part on a ragged contour. The tear paints the section it *introduces*, so it sits over the outgoing one and that band must stay transparent |

Plus `ui/HoldPuck` — the reference's signature press-and-drag affordance, which
reports 0 → 1 so a section can scrub artwork from the gesture.

## The artwork is video

The reference is frame-by-frame illustrated animation played back as video, not
CSS or SVG animation. `ui/ArtPlate` is the slot that holds it:

```tsx
<ArtPlate label="[Video: ...]" tone="oxblood" scrub={progressRef} />
<ArtPlate src="/media/shatter.mp4" tone="oxblood" scrub={progressRef} />
```

Pass `src` and it renders a `<video>`; pass `scrub` and playback follows that
0 → 1 ref instead of its own clock, easing toward the target so a fast scroll
does not stutter the decode. With no `src` it draws an inked stand-in captioned
with the shot it stands for.

**This is the one thing that cannot be built from screenshots.** Every
`[Video: …]` and `[Inset: …]` caption in `lib/houses.ts` and the sections names
a clip that needs to be produced.

## Structure

```
app/
  layout.tsx          Fonts, metadata
  page.tsx            Nav · Hero · Legend · Houses · CTA · Footer
  globals.css         Paper grain, panel, caption and tear primitives
  fonts/              DM Themestia (decorative majuscule Georgian)
components/
  Nav.tsx             Mark + bordered pill, both in mix-blend-difference so
                      they invert themselves over dark and flooded sections
  sections/           Hero · Legend · Houses · CTA
  ui/                 Panel · Caption · TornEdge · ArtPlate · HoldPuck ·
                      InkButton · Medallion · ProgressTicks
lib/houses.ts         All copy: four houses, three chapters as caption blocks
```

## Typography

- **Display:** DM Themestia, a decorative majuscule Georgian face — the
  structural analogue to the reference's condensed display serif. It carries
  Mkhedruli, digits and the Roman numerals I V X C M but **no Latin
  alphabet**, so Latin strings stay on the body sans and the serif behind it
  picks up anything it is missing.
- **Captions and labels:** Noto Sans Georgian, small, uppercase, tracked.

## Known gaps

- Colours are eyeballed from screenshots. If exact brand values matter, pull
  them from the live site's computed styles.
- The leaderboard bars in the CTA use illustrative numbers (`STANDINGS` in
  `sections/CTA.tsx`), labelled as placeholder data on the page.
- Both CTA buttons point at in-page anchors (`#leaderboard`, `#quiz-start`).

## Deployment

`next.config.mjs` sets `output: "export"`; `.github/workflows/deploy.yml`
publishes `out/` to GitHub Pages on every push. `basePath` is applied only when
`GITHUB_PAGES=true`, so local dev still serves from the root.
