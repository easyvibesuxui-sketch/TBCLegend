# Kling shot list — საგანძურის მარათონი

Nine clips and one still, one per `ArtPlate` slot in the build. Story beats come
from [`STORY.md`](STORY.md); the look comes from
[`../research/santionispirits/DESIGN-SPEC.md`](../research/santionispirits/DESIGN-SPEC.md).

**Every prompt below is complete and ready to paste.** The shared style sentence
and the exclusions are already written into each one — nothing to assemble, no
placeholders to substitute.

## Connection status

The Kling MCP server is installed and authorised (`authMode: oauth`, user
`104206163`).

**The free daily credits cannot drive this MCP.** Kling grants free accounts 66
credits a day, but those are *bonus* credits: MCP and CLI accept only **paid**
credits from the Personal workspace. Submitting shot 03 — the cheapest job in
the set — returned `Insufficient credits` while the web account showed 66. So:

| Route | Cost | Who runs it |
| --- | --- | --- |
| **kling.ai web UI** | free, 66 credits/day | a person pastes each prompt below into the site |
| **This MCP** | paid credits only | the agent runs the calls in *Exact MCP calls* |

**Real cost, measured on the account: 10 s = 80 credits, so about 8 credits a
second.** 66 free credits a day therefore cannot buy a single 10 s clip. Every
shot in this list is consequently specified at **5 s (~40 credits)** — scroll
scrubbing maps a section's full height onto the clip whatever its length, so
shorter costs nothing in quality.

That puts the free route at **one clip a day**, plus the still on day one:

| Day | Shots | Credits |
| --- | --- | --- |
| 1 | 03 (still) + 01 | ~41 |
| 2–8 | one clip each | ~40 |

Roughly 8 days for a clean pass, longer with retries. The prompts are identical
on either route.

## Models

| Use | Model | Why |
| --- | --- | --- |
| Clips | `kling-video-v3_0_turbo` | Best value, and the only video model offering 3–15 s durations, so each clip can be cut to its panel |
| Stills | `kling-image-v3_0` | 2K output, strong multi-reference consistency |

Video resolution is fixed at `720p` on this tier. Aspect ratios allowed:
`16:9 / 9:16 / 1:1` for video, plus `4:3` and others for images.

## Two rules that hold the set together

1. **The opening sentence is identical in all nine prompts.** Do not paraphrase
   it between shots — it is the only thing keeping them in one visual world.
2. **One spot colour per frame.** Never two.

| Spot | Used by |
| --- | --- |
| `warm ochre gold (#B08D57)` | shots 01, 02, 03, 05, 08 — the treasure and House Dovlatia |
| `deep oxblood red (#6E2020)` | shots 04, 09 — the shattering and House Baratishvili |
| `bright signal red (#CF2A20)` | shot 06 — House Kharjiani |
| none, pure black and white | shot 07 — House Anabaridze |

The web UI has no negative-prompt field, which is why the exclusions are the
last two sentences of every prompt rather than a separate box. Kling renders
garbled lettering unless told not to, and the panels carry their own Georgian
captions in HTML — so "no text" matters more here than usual.

---

## Shot 01 — Hero

- **Slot:** `components/sections/Hero.tsx` → `ArtPlate tone="night"`
- **Tool:** `text_to_video` · **Model:** `kling-video-v3_0_turbo` · **Aspect:** `16:9` · **Duration:** `5` s · **Resolution:** `720p`
- **Spot colour:** ochre
- **Beat:** the kingdom before anything breaks. The treasure still whole.
- **Save as:** `public/media/01-hero-night.mp4`

```
Hand-inked graphic novel panel, bold black linocut and woodcut engraving with dense cross-hatching, very high contrast, printed on grained off-white paper, strictly two colours only: black ink plus warm ochre gold (#B08D57), flat matte fill, no gradients, 2D illustration, cinematic composition, visible paper grain and ink speckle.
A vast night sky of churning ink-brush clouds over a sleeping fantasy kingdom of towers and rooftops rendered in fine engraved hatching. At the centre, far below on a stone altar, one sealed ancient treasure chest glows faintly in warm ochre gold — the only colour in the frame. The clouds drift slowly from left to right; the glow pulses gently, like slow breathing. Very slow cinematic push-in toward the chest. Still, ominous, reverent.
No text, no letters, no words, no captions, no watermark, no signature, no logo. Not photorealistic, no photograph, no 3D render, no CGI, no smooth gradients, no pastel colours, no second accent colour, no colour bleed.
```

## Shot 02 — Chapter I — the treasure

- **Slot:** `sections/Legend.tsx`, chapter I → `ArtPlate tone="paper"`
- **Tool:** `text_to_video` · **Model:** `kling-video-v3_0_turbo` · **Aspect:** `16:9` · **Duration:** `5` s · **Resolution:** `720p`
- **Spot colour:** ochre
- **Beat:** the treasure that kept the balance.
- **Save as:** `public/media/02-treasure-altar.mp4`

```
Hand-inked graphic novel panel, bold black linocut and woodcut engraving with dense cross-hatching, very high contrast, printed on grained off-white paper, strictly two colours only: black ink plus warm ochre gold (#B08D57), flat matte fill, no gradients, 2D illustration, cinematic composition, visible paper grain and ink speckle.
Close on an ancient ornate treasure chest resting on a carved stone altar inside a vaulted hall, drawn in heavy black engraving with deep cross-hatched shadows. Ochre gold light seeps from the seams of the lid and pools on the stone. Dust motes drift through the shafts of light. Slow parallax pan from left to right across the altar, carved relief sliding past in the foreground. Sacred, still, weighty.
No text, no letters, no words, no captions, no watermark, no signature, no logo. Not photorealistic, no photograph, no 3D render, no CGI, no smooth gradients, no pastel colours, no second accent colour, no colour bleed.
```

## Shot 03 — Chapter I — inset (STILL)

- **Slot:** `sections/Legend.tsx`, inset panel → `ArtPlate tone="ochre"`
- **Tool:** `text_to_image` · **Model:** `kling-image-v3_0` · **Aspect:** `4:3` · **Resolution:** `2k`
- **Spot colour:** ochre
- **Beat:** the kingdom the four houses shared.
- **Save as:** `public/media/03-kingdom-view.jpg`

```
Hand-inked graphic novel panel, bold black linocut and woodcut engraving with dense cross-hatching, very high contrast, printed on grained off-white paper, strictly two colours only: black ink plus warm ochre gold (#B08D57), flat matte fill, no gradients, 2D illustration, cinematic composition, visible paper grain and ink speckle.
Wide establishing view of a fantasy kingdom seen from a high ridge: four distant fortified estates on four horizons, connected by winding roads, drawn in fine engraved linework. Ochre gold sky along the horizon line. No figures. Map-like, calm, symmetrical.
No text, no letters, no words, no captions, no watermark, no signature, no logo. Not photorealistic, no photograph, no 3D render, no CGI, no smooth gradients, no pastel colours, no second accent colour, no colour bleed.
```

## Shot 04 — Chapter II — the shattering

- **Slot:** `sections/Legend.tsx`, flood section → `ArtPlate tone="oxblood"`
- **Tool:** `text_to_video` · **Model:** `kling-video-v3_0_turbo` · **Aspect:** `16:9` · **Duration:** `5` s · **Resolution:** `720p`
- **Spot colour:** oxblood
- **Beat:** the night it broke. **This is the hero clip of the whole page.**
- **Save as:** `public/media/04-shattering.mp4`

```
Hand-inked graphic novel panel, bold black linocut and woodcut engraving with dense cross-hatching, very high contrast, printed on grained off-white paper, strictly two colours only: black ink plus deep oxblood red (#6E2020), flat matte fill, no gradients, 2D illustration, cinematic composition, visible paper grain and ink speckle.
The ancient treasure chest cracks apart and detonates into millions of gold coins that erupt upward and outward, filling the whole frame, each coin drawn as a hatched engraved disc tumbling and flipping. The background floods from pale paper to deep oxblood red as the coins scatter. Debris and ink splinters fly past the camera. Camera pushes in fast, then holds as the coins rain outward past frame. Violent, beautiful, catastrophic.
No text, no letters, no words, no captions, no watermark, no signature, no logo. Not photorealistic, no photograph, no 3D render, no CGI, no smooth gradients, no pastel colours, no second accent colour, no colour bleed.
```

> Scrubbed by scroll — see `scrub` in `ArtPlate`. 5 s is enough: the scrub maps the section's whole scroll height onto the clip, however long it is.

## Shot 05 — Chapter III — the four houses set out

- **Slot:** `sections/Legend.tsx`, chapter III → `ArtPlate tone="ochre"`
- **Tool:** `text_to_video` · **Model:** `kling-video-v3_0_turbo` · **Aspect:** `9:16` · **Duration:** `5` s · **Resolution:** `720p`
- **Spot colour:** ochre
- **Beat:** the marathon begins.
- **Save as:** `public/media/05-four-banners.mp4`

```
Hand-inked graphic novel panel, bold black linocut and woodcut engraving with dense cross-hatching, very high contrast, printed on grained off-white paper, strictly two colours only: black ink plus warm ochre gold (#B08D57), flat matte fill, no gradients, 2D illustration, cinematic composition, visible paper grain and ink speckle.
Four tall heraldic banners on long poles carried away from the viewer along four diverging roads across an engraved landscape, each banner bearing a different abstract sigil. The banners ripple in wind. Scattered ochre gold coins glint in the dirt of the road in the foreground. Slow vertical tilt from the road up to the horizon. Determined, outbound, competitive.
No text, no letters, no words, no captions, no watermark, no signature, no logo. Not photorealistic, no photograph, no 3D render, no CGI, no smooth gradients, no pastel colours, no second accent colour, no colour bleed.
```

## Shot 06 — ხარჯიანი / House Kharjiani

- **Slot:** `sections/Houses.tsx` → house 1
- **Tool:** `text_to_video` · **Model:** `kling-video-v3_0_turbo` · **Aspect:** `9:16` · **Duration:** `5` s · **Resolution:** `720p`
- **Spot colour:** signal red
- **Beat:** action, appetite, everything in motion.
- **Save as:** `public/media/06-kharjiani.mp4`

```
Hand-inked graphic novel panel, bold black linocut and woodcut engraving with dense cross-hatching, very high contrast, printed on grained off-white paper, strictly two colours only: black ink plus bright signal red (#CF2A20), flat matte fill, no gradients, 2D illustration, cinematic composition, visible paper grain and ink speckle.
A heraldic banner whipping hard in strong wind, its fabric torn at the edge, mounted above a brazier of leaping flame rendered in sharp engraved tongues. Sparks and embers stream upward across the frame. Everything is in motion. Camera holds steady while the banner and fire thrash. Restless, generous, alive.
No text, no letters, no words, no captions, no watermark, no signature, no logo. Not photorealistic, no photograph, no 3D render, no CGI, no smooth gradients, no pastel colours, no second accent colour, no colour bleed.
```

## Shot 07 — ანაბარიძე / House Anabaridze

- **Slot:** `sections/Houses.tsx` → house 2
- **Tool:** `text_to_video` · **Model:** `kling-video-v3_0_turbo` · **Aspect:** `9:16` · **Duration:** `5` s · **Resolution:** `720p`
- **Spot colour:** none — pure black and white
- **Beat:** foresight, restraint, the sealed future.
- **Save as:** `public/media/07-anabaridze.mp4`

```
Hand-inked graphic novel panel, bold black linocut and woodcut engraving with dense cross-hatching, very high contrast, printed on grained off-white paper, strictly black and white with no colour at all, flat matte fill, no gradients, 2D illustration, cinematic composition, visible paper grain and ink speckle.
A massive sealed vault door of concentric geometric rings and heavy bolts, drawn in precise engraved linework, perfectly centred and symmetrical. The outermost ring rotates one slow notch and locks with finality. Nothing else moves. Cold, patient, impenetrable.
No text, no letters, no words, no captions, no watermark, no signature, no logo. Not photorealistic, no photograph, no 3D render, no CGI, no smooth gradients, no pastel colours, no second accent colour, no colour bleed.
```

## Shot 08 — დოვლათია / House Dovlatia

- **Slot:** `sections/Houses.tsx` → house 3
- **Tool:** `text_to_video` · **Model:** `kling-video-v3_0_turbo` · **Aspect:** `9:16` · **Duration:** `5` s · **Resolution:** `720p`
- **Spot colour:** ochre
- **Beat:** fortune, glory, the pull of wealth.
- **Save as:** `public/media/08-dovlatia.mp4`

```
Hand-inked graphic novel panel, bold black linocut and woodcut engraving with dense cross-hatching, very high contrast, printed on grained off-white paper, strictly two colours only: black ink plus warm ochre gold (#B08D57), flat matte fill, no gradients, 2D illustration, cinematic composition, visible paper grain and ink speckle.
An ornate wheel of fortune spinning steadily, its spokes and rim carved with engraved symbols, ochre gold coins cascading off the rim and tumbling down through the frame. The wheel slows almost to a stop. Camera locked off, centred. Lucky, opulent, theatrical.
No text, no letters, no words, no captions, no watermark, no signature, no logo. Not photorealistic, no photograph, no 3D render, no CGI, no smooth gradients, no pastel colours, no second accent colour, no colour bleed.
```

## Shot 09 — ბარათიშვილი / House Baratishvili

- **Slot:** `sections/Houses.tsx` → house 4
- **Tool:** `text_to_video` · **Model:** `kling-video-v3_0_turbo` · **Aspect:** `9:16` · **Duration:** `5` s · **Resolution:** `720p`
- **Spot colour:** oxblood
- **Beat:** tradition, order, the old glory.
- **Save as:** `public/media/09-baratishvili.mp4`

```
Hand-inked graphic novel panel, bold black linocut and woodcut engraving with dense cross-hatching, very high contrast, printed on grained off-white paper, strictly two colours only: black ink plus deep oxblood red (#6E2020), flat matte fill, no gradients, 2D illustration, cinematic composition, visible paper grain and ink speckle.
An ancient heavy signet seal pressing down slowly into a pool of oxblood red wax on a stone table, the wax spreading outward in engraved ripples as the seal lands and lifts, leaving a crisp crest impression. Fine hatched shadow under the seal. Slow, deliberate, a single motion. Traditional, immovable, authoritative.
No text, no letters, no words, no captions, no watermark, no signature, no logo. Not photorealistic, no photograph, no 3D render, no CGI, no smooth gradients, no pastel colours, no second accent colour, no colour bleed.
```

---

## Running these on the web UI

1. Pick the model from the shot's header line — **Video 3.0 Turbo** for clips,
   **Image 3.0** for the still.
2. Paste the whole fenced prompt. It is already complete.
3. Set aspect ratio and duration from the header line.
4. Download immediately and save under the given filename. Renders expire.

## Exact MCP calls

With paid credits on the account, each shot is one call instead. Video
(shot 04):

```json
{
  "model": "kling-video-v3_0_turbo",
  "arguments": [
    { "name": "prompt",       "value": "<the full fenced prompt from shot 04>" },
    { "name": "duration",     "value": "5" },
    { "name": "aspect_ratio", "value": "16:9" },
    { "name": "resolution",   "value": "720p" }
  ]
}
```

Still (shot 03):

```json
{
  "model": "kling-image-v3_0",
  "arguments": [
    { "name": "prompt",         "value": "<the full fenced prompt from shot 03>" },
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

## If a shot comes back wrong

- **Coins read as discs of light rather than engraved metal** — add "each coin
  clearly drawn with an engraved rim and a cross-hatched face".
- **A second colour leaks in** — repeat the spot colour and its hex once more at
  the end of the prompt, and name the offending colour in the exclusions.
- **Motion too fast to scrub** — regenerate at a longer duration rather than
  slowing playback; the scrub eases toward its target and stutters if the source
  is already frantic.
- **It looks rendered rather than printed** — push "linocut", "woodcut" and
  "visible paper grain" earlier in the sentence; they carry the most weight.
