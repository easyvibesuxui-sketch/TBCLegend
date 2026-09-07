# Santioni Spirits — extracted design language

Source: 27 scroll-ordered screenshots of santionispirits.com, supplied by the
client (the site itself is unreachable from this environment — the network
policy denies `santionispirits.com:443`, so every value below is read off the
reference frames in `docs/design-references/`, not from computed CSS).

Frames are named `NN_HHMMSS.png` in scroll order.

## 1. What the site actually is

A **graphic-novel scrollytelling page**. Not a "dark cinematic" site — an inked
comic book that the reader scrolls through. The client's note is the key
architectural fact:

> "საიტზე ყველაფერი ანიმირებულია და მოძრავი, ვიდეოებიტაა აწყობილი"
> (everything is animated and moving, it is built out of videos)

The illustrations are **frame-by-frame animation played back as video**, not CSS
or SVG animation. The page's job is to hold those videos in comic panels and
scrub/play them against scroll.

## 2. Palette

Read off the frames — approximate, sampled by eye, not from CSS:

| Role | Value | Where |
|---|---|---|
| Paper ground | `#F2F1EF` off-white, visibly grained | frames 03, 12, 27 |
| Ink | `#0E0E0E` near-black | linework, panel borders, type |
| Night flood | `#1C1C1C`–`#262626` | hero sky, shelf scene (01, 17) |
| Ochre / gold spot | `#B08D57`–`#C4A264` | the robe, every "sacred" object (02, 03, 05) |
| Oxblood flood | `#6E2020`–`#7A2525` | the door scene (08) |
| Signal red | `#CF2A20` | collection flood + nav accent (17, 25, 27) |
| Liquid blue | `#3FA9E0` | the spirit itself (17, 22) |

The palette is **monochrome plus one spot colour at a time**. A section commits
to a single accent and floods it edge to edge. Two accents never share a frame
except where the story explicitly mixes them.

## 3. Type

- **Display:** a high-contrast condensed serif with art-nouveau ligatures —
  the doubled `OO` in NOTTURNO, the swash `C` in EXPERIENCE (frame 01), and
  `INDULGE NOW / ATONE LATER` set enormous (frame 25). All caps, tight leading,
  optically centred, often two stacked lines.
- **Captions:** small uppercase grotesque, ~13px, generous letter-spacing,
  1.5 line-height, always inside a bordered box.
- **Nav / labels:** the same grotesque, bold, uppercase, ~13px.
- **Body:** a plain grotesque, justified, only appears in the collection
  section (frame 25).

## 4. The four structural devices

Everything on the page is built from these:

1. **Panel** — a rectangle with a 1–2px black border holding an illustration.
   Panels overlap each other and bleed off the viewport edges. Inset panels sit
   on top of a larger one at the corners (frame 02: two small panels flanking a
   full-width scene).
2. **Caption box** — off-white, 1px black border, 2 lines of uppercase text,
   dropped over a panel edge so it straddles the boundary (frames 02, 03, 08,
   22). Never centred; always hung off the left or right.
3. **Colour flood** — a section that abandons the paper ground entirely and
   fills the viewport with one accent (oxblood 08, red 17/25).
4. **Torn edge** — sections separate on a ragged hand-torn paper contour, not a
   straight line (frames 01, 25). The tear is part of the artwork.

## 5. Interactions

- **Hold pucks** — a white circle with 2 lines of bold uppercase text
  (`HOLD & MOVE` frame 08, `HOLD & POUR` frame 17) sitting next to the hand it
  refers to. A press-and-drag gesture, not a click.
- **Scroll scrubbing** — panel contents advance frame by frame with scroll.
- **Right-edge progress** — a small vertical tick indicator, bottom right of
  every frame.

## 6. Chrome

- **Logo** — top left, a circular saint medallion beside a script wordmark.
  Persistent, inverts to white over dark floods.
- **Nav** — top right, a white pill with a black border: `EXPERIENCE`, a small
  red glyph, `COLLECTION`. The active item is black-on-white, the inactive one
  greyed (frame 27).
- **Footer** — full black, logo left, `INSTAGRAM` / e-mail right, credits
  bottom right.

## 6b. Mechanics, read from a 90-second screen recording

The static frames gave the composition; a screen capture of the site being
scrolled gave the behaviour. Key frames are in `docs/design-references/motion/`.
Method: frames sampled every 3 s for the structure, then bursts at 6 fps across
two transitions, with frame-to-frame pixel differences measured to separate
scrubbing from playback.

**1. The artwork is scroll-scrubbed, not autoplaying.** Across a 6 fps burst the
frame-to-frame difference drops to 0.4 and 0.0 at points — the illustration
stops dead. Video left to its own clock cannot do that. Playback is bound to
scroll position, which is what `ArtPlate`'s `scrub` already assumes.

**2. Panels fly in through 3D, they do not just appear.** On the paper page a
panel is a visible **trapezoid** — narrower at the top, wider at the bottom —
sitting low in the frame with the previous panel leaving at the top. As the
reader scrolls it grows and its edges straighten until the border passes the
viewport and the art goes full-bleed. It reads as a card travelling toward the
camera: perspective plus translate-Z, scrubbed. See `panel-flight-far.png` →
`panel-flight-near.png` → `rec-018s.png`.

**3. Full-bleed is a takeover, not a layout.** Once a panel has arrived it stops
being a panel on paper and becomes the whole screen, and the scene plays there.
The paper page returns between beats.

**4. Captions belong to the frame, not to the panel.** They sit in screen
corners — bottom-left, top-left, top-right — and hold position while the art
moves underneath. They are not pinned to the artwork they describe.

**5. Inset panels survive the takeover.** A small bordered inset stays in a
corner during a full-bleed scene, showing a detail of the same moment
(`hold-and-move.png`, lower left).

**6. The gesture puck has two states.** Idle it is a labelled circle
(`HOLD & MOVE`, `HOLD & POUR`). Grabbed it collapses to a small plain white dot
that sits at the point of contact and leads the illustration — the hand, the
bottle, the pour all follow it.

**7. Reactive elements deform under the gesture.** The red mark on the portal
door is a liquid blob that swells and splashes as the hand nears it, not a
static drawing being translated.

**8. One accent per scene, confirmed in motion.** Ochre for the traveller,
oxblood for the portal, signal red for the columns and the collection, liquid
blue for the spirit itself. The palette never mixes mid-scene; it changes when
the scene changes.

**9. Chrome never moves.** The medallion top-left and the pill nav top-right
hold through every transition, including the full-bleed takeovers.

### Where this build currently falls short

| Reference | This build |
| --- | --- |
| Panels fly in through perspective, scrubbed | Panels are static, with a small parallax drift |
| Panel border passes the viewport into full-bleed | No takeover; panels stay panels |
| Captions hold in frame corners during a scene | Captions scroll away with the content |
| Puck collapses to a dot and drives the art | `HoldPuck` reports progress but nothing consumes it |
| Reactive liquid deforms under the gesture | Nothing reactive |

## 7. What this means for Treasure Marathon

The story maps cleanly onto the same spine — a lone figure, a sacred object, a
shattering, a quest — so the structure carries over intact. Two adjustments:

- Santioni's ochre is, for our purposes, gold. Keeping the paper/ink/ochre
  system therefore serves the treasure story without inventing anything: the
  gold stays, it simply stops glowing and becomes printed ink.
- The Georgian display face already in the project (DM Themestia) is a
  decorative majuscule — the correct structural analogue to Santioni's
  condensed display serif.

**Not reproducible from screenshots:** the illustrated video sequences. Those
are the site's whole substance and are illustration work, not front-end work.
The build must therefore ship the panel/scrub framework with drop-in slots and
labelled placeholders, ready for real footage.
