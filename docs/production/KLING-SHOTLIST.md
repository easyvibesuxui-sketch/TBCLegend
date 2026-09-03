# Kling shot list — საგანძურის მარათონი

Nine clips and one still, one per `ArtPlate` slot in the build. Story beats come
from [`STORY.md`](STORY.md); the look comes from
[`../research/santionispirits/DESIGN-SPEC.md`](../research/santionispirits/DESIGN-SPEC.md).

**Connection status.** The Kling MCP server is installed and authorised
(`authMode: oauth`, user `104206163`).

**The free daily credits cannot drive this MCP.** Kling grants free accounts 66
credits a day, but those are bonus credits: MCP and CLI accept only *paid*
credits from the Personal workspace, and a submission with bonus credits alone
fails with `Insufficient credits` (confirmed by submitting shot 03). So there
are two ways to produce these shots:

| Route | Cost | Who runs it |
| --- | --- | --- |
| **kling.ai web UI** | free, 66 credits/day | a person pastes each prompt below into the site |
| **This MCP** | paid credits only | the agent runs the calls in *Exact MCP calls* |

The web route is free but rations out at roughly two clips a day, so the full
set takes about a week including retries. The prompts are identical either
way — only the delivery differs.

**Models chosen**

| Use | Model | Why |
| --- | --- | --- |
| Clips | `kling-video-v3_0_turbo` | Best value, and the only video model offering 3–15 s durations, so each clip can be cut to its panel |
| Stills | `kling-image-v3_0` | 2K output, strong multi-reference consistency |

Both take `aspect_ratio` from `16:9 / 9:16 / 1:1` (video) and the full ladder
including `4:3` (image). Video resolution is fixed at `720p` on this tier.

---

## The style block

Every prompt below starts with the same sentence. **Do not paraphrase it
between shots** — it is the only thing holding the nine clips in one visual
world.

```
Hand-inked graphic novel panel, bold black linocut and woodcut engraving with
dense cross-hatching, very high contrast, printed on grained off-white paper,
strictly two colours only: black ink plus <SPOT>, flat matte fill, no gradients,
2D illustration, no photorealism, no 3D render, cinematic composition, visible
paper grain and ink speckle.
```

`<SPOT>` is replaced per shot and **only one spot colour appears in any frame**:

| Token | Colour |
| --- | --- |
| `warm ochre gold (#B08D57)` | the treasure, House Dovlatia |
| `deep oxblood red (#6E2020)` | the shattering, House Baratishvili |
| `bright signal red (#CF2A20)` | House Kharjiani, the finale |
| *(none — pure black and white)* | House Anabaridze |

## The negative prompt

Same for every shot. Kling renders garbled lettering unless told not to, and
the panels carry their own Georgian captions in HTML.

```
text, letters, words, captions, subtitles, watermark, signature, logo,
photorealistic, photograph, 3D render, CGI, smooth gradients, pastel colours,
multiple accent colours, colour bleed, blurry, low contrast, cluttered
```

---

## Shot 01 — Hero

- **Slot:** `components/sections/Hero.tsx` → `ArtPlate tone="night"`
- **Aspect:** `16:9` · **Duration:** `10` · **Spot:** ochre
- **Beat:** the kingdom before anything breaks. The treasure still whole.

```
<STYLE with warm ochre gold (#B08D57)>
A vast night sky of churning ink-brush clouds over a sleeping fantasy kingdom of
towers and rooftops rendered in fine engraved hatching. At the centre, far below
on a stone altar, one sealed ancient treasure chest glows faintly in warm ochre
gold — the only colour in the frame. The clouds drift slowly left to right; the
glow pulses gently like slow breathing. Very slow cinematic push-in toward the
chest. Still, ominous, reverent.
```

## Shot 02 — Chapter I, main panel

- **Slot:** `sections/Legend.tsx`, chapter I → `ArtPlate tone="paper"`
- **Aspect:** `16:9` · **Duration:** `8` · **Spot:** ochre
- **Beat:** the treasure that kept the balance.

```
<STYLE with warm ochre gold (#B08D57)>
Close on an ancient ornate treasure chest resting on a carved stone altar inside
a vaulted hall, drawn in heavy black engraving with deep cross-hatched shadows.
Ochre gold light seeps from the seams of the lid and pools on the stone. Dust
motes drift through the shafts of light. Slow parallax pan from left to right
across the altar, the carved relief sliding past in the foreground. Sacred,
still, weighty.
```

## Shot 03 — Chapter I, inset (STILL, not video)

- **Slot:** `sections/Legend.tsx`, inset panel → `ArtPlate tone="ochre"`
- **Tool:** `text_to_image` · **Aspect:** `4:3` · **Spot:** ochre

```
<STYLE with warm ochre gold (#B08D57)>
Wide establishing view of a fantasy kingdom from a high ridge: four distant
fortified estates on four horizons, connected by roads, drawn in fine engraved
linework. Ochre gold sky at the horizon line. No figures. Map-like, calm,
symmetrical.
```

## Shot 04 — Chapter II, the shattering

- **Slot:** `sections/Legend.tsx`, flood section → `ArtPlate tone="oxblood"`
- **Aspect:** `16:9` · **Duration:** `10` · **Spot:** oxblood
- **Beat:** the night it broke. **This is the hero clip of the whole page.**

```
<STYLE with deep oxblood red (#6E2020)>
The ancient treasure chest cracks apart and detonates into millions of gold
coins that erupt upward and outward, filling the whole frame, each coin drawn as
a hatched engraved disc tumbling and flipping. The background floods from pale
paper to deep oxblood red as the coins scatter. Debris and ink splinters fly
past the camera. Camera pushes in fast then holds as the coins rain outward past
frame. Violent, beautiful, catastrophic.
```

> Scrubbed by scroll — see `scrub` in `ArtPlate`. Generate at `10` s so there is
> enough footage to scrub across the section's full height.

## Shot 05 — Chapter III, the four houses set out

- **Slot:** `sections/Legend.tsx`, chapter III → `ArtPlate tone="ochre"`
- **Aspect:** `9:16` · **Duration:** `8` · **Spot:** ochre

```
<STYLE with warm ochre gold (#B08D57)>
Four tall heraldic banners on long poles carried away from the viewer along four
diverging roads across an engraved landscape, each banner bearing a different
abstract sigil. The banners ripple in wind. Scattered ochre gold coins glint in
the dirt of the road in the foreground. Slow vertical tilt from the road up to
the horizon. Determined, outbound, competitive.
```

## Shots 06–09 — The four houses

Portrait panels, one per house. Each keeps the same framing discipline: a single
emblematic object, centred, slow motion, one colour.

### 06 — ხარჯიანი / House Kharjiani

- **Aspect:** `9:16` · **Duration:** `5` · **Spot:** bright signal red

```
<STYLE with bright signal red (#CF2A20)>
A heraldic banner whipping hard in strong wind, its fabric torn at the edge,
mounted above a brazier of leaping flame rendered in sharp engraved tongues.
Sparks and embers stream upward across the frame. Everything is in motion.
Camera holds steady while the banner and fire thrash. Restless, generous,
alive.
```

### 07 — ანაბარიძე / House Anabaridze

- **Aspect:** `9:16` · **Duration:** `5` · **Spot:** none — pure black and white

```
Hand-inked graphic novel panel, bold black linocut and woodcut engraving with
dense cross-hatching, very high contrast, printed on grained off-white paper,
strictly black and white with no colour at all, flat matte fill, no gradients,
2D illustration, no photorealism, no 3D render, cinematic composition, visible
paper grain and ink speckle.
A massive sealed vault door of concentric geometric rings and heavy bolts, drawn
in precise engraved linework, perfectly centred and symmetrical. The outermost
ring rotates one slow notch and locks with finality. Nothing else moves. Cold,
patient, impenetrable.
```

### 08 — დოვლათია / House Dovlatia

- **Aspect:** `9:16` · **Duration:** `5` · **Spot:** ochre

```
<STYLE with warm ochre gold (#B08D57)>
An ornate wheel of fortune spinning steadily, its spokes and rim carved with
engraved symbols, ochre gold coins cascading off the rim and tumbling down
through the frame. The wheel slows almost to a stop. Camera locked off, centred.
Lucky, opulent, theatrical.
```

### 09 — ბარათიშვილი / House Baratishvili

- **Aspect:** `9:16` · **Duration:** `5` · **Spot:** oxblood

```
<STYLE with deep oxblood red (#6E2020)>
An ancient heavy signet seal pressing down slowly into a pool of oxblood red wax
on a stone table, the wax spreading outward in engraved ripples as the seal
lands and lifts, leaving a crisp crest impression. Fine hatched shadow under the
seal. Slow, deliberate, single motion. Traditional, immovable, authoritative.
```

---

## Running these on the web UI

The site takes no negative-prompt field, which is why the negative list is
folded into the prompt text above rather than kept separate. For each shot:

1. Pick the model — **Video 3.0 Turbo** for clips, **Image 3.0** for the still.
2. Paste the style block and the shot text together as one prompt.
3. Set aspect ratio and duration from the shot's header line.
4. Download the result. Bonus-credit renders still expire — save immediately.

Name the files as in *Wiring the results in* below and the wiring step is a
one-line change per shot.

## Exact MCP calls

With paid credits on the account, each shot is one call instead. Video example
(shot 04):

```json
{
  "model": "kling-video-v3_0_turbo",
  "arguments": [
    { "name": "prompt",       "value": "<full prompt text from shot 04>" },
    { "name": "duration",     "value": "10" },
    { "name": "aspect_ratio", "value": "16:9" },
    { "name": "resolution",   "value": "720p" }
  ]
}
```

Still example (shot 03):

```json
{
  "model": "kling-image-v3_0",
  "arguments": [
    { "name": "prompt",         "value": "<full prompt text from shot 03>" },
    { "name": "aspect_ratio",   "value": "4:3" },
    { "name": "img_resolution", "value": "2k" },
    { "name": "imageCount",     "value": "1" }
  ]
}
```

Both return a `generation_id`; poll `query_tasks` for the URL. **Result URLs
expire in 24 hours — download immediately.**

## Wiring the results in

Drop the files in `public/media/`, then pass `src` on the matching plate:

```tsx
<ArtPlate
  src="/media/04-shattering.mp4"
  tone="oxblood"
  scrub={shatter}
  label="[Video: დამსხვრევა — მონეტები იფანტება]"
/>
```

`label` stays as the accessible description. With `src` present the stand-in
hatching is replaced by the clip, and `scrub` ties playback to scroll.

Suggested filenames, matching the slots:

```
public/media/01-hero-night.mp4
public/media/02-treasure-altar.mp4
public/media/03-kingdom-view.jpg
public/media/04-shattering.mp4
public/media/05-four-banners.mp4
public/media/06-kharjiani.mp4
public/media/07-anabaridze.mp4
public/media/08-dovlatia.mp4
public/media/09-baratishvili.mp4
```

## If a shot comes back wrong

- **Coins look like discs of light rather than engraved metal** — add
  "each coin clearly drawn with engraved rim and cross-hatched face".
- **Colour leaks into a second hue** — repeat the spot colour hex once more at
  the end of the prompt and lengthen the negative to name the offending colour.
- **Motion too fast for scrubbing** — regenerate at a longer duration rather
  than slowing playback; the scrub eases toward its target and stutters if the
  source is already frantic.
