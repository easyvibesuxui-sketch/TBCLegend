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
