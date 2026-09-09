# Kling image shot list — საგანძურის მარათონი

Twenty stills, covering every beat in [`STORY.md`](STORY.md). Stills rather
than clips because the mechanic that carries this page is the **panel flight** —
a drawing travelling toward the camera in 3D — and that needs an image, not
footage. Only the beats where a scene actually *plays* need video, and shot 00
(the cover) is already done.

**Cost — measured, not estimated.** Credits were read before and after every
call on this account, so these are prices, not guesses:

| Call | Price |
| --- | --- |
| `text_to_image`, `kling-image-v3_0`, 2k | **1 credit per image** |
| `image_to_image`, `kling-image-v3_0`, 2k | **1 credit per image** |
| `image_to_image`, `kling-image-v3_0_omni`, 2k | **2 credits per image** |
| `text_to_video`, 10s | **80 credits** |

The whole still set — twenty shots plus the two extra hero views the Element
needed — came to **27 credits**.

---

## 0. Still or clip — decided per beat

The first draft of this list made everything a still. That under-read the
recording, which contains **two different motions**, not one:

| | What moves | Needs |
| --- | --- | --- |
| **Panel flight** | the panel travels toward the camera | a 3D transform — works on anything, already built, costs nothing |
| **Content animation** | the scene itself redraws — the traveller crosses from far to the portal, coins erupt, the wheel turns | real footage |

Measured across the portal approach at 6 fps, frame-to-frame change runs 6–22.
A transform on a still cannot produce numbers that size: the drawing is being
redrawn between frames. So for the beats where **motion is the content**, a
still genuinely cannot stand in — the flight would move the frame while the
picture inside it sat dead.

But the reverse is just as true. For an establishing beat — a hall, a gate, an
altar — the flight already supplies the motion, and a clip buys almost nothing
for roughly twenty times the credits.

### The route: stills first, then animate the few that need it

Kling has `image_to_video`. So rather than choosing up front:

1. Generate **all twenty as stills**. Cheap, composable, and the Element
   binding keeps one face across the set.
2. Approve the compositions.
3. Run `image_to_video` **only on the beats where motion is the story**,
   starting from the exact approved frame.

That buys composition control, character consistency, and a poster frame for
free — the still is the `poster` the clip loads behind.

### Which beats earn a clip

| Beat | Verdict | Why |
| --- | --- | --- |
| `12-shattering` | **clip, essential** | The whole point is coins erupting. A still here is a dead centre to the page. |
| `17-house-kharjiani` | **clip** | The house *is* motion — banner thrashing, sparks climbing. Still it, and the character is gone. |
| `19-house-dovlatia` | **clip** | A wheel that does not turn is a circle. |
| `20-house-baratishvili` | **clip** | The seal pressing and lifting is one deliberate motion; that motion is the house. |
| `09-gate-night` | **clip, worth it** | The hero walking out is the departure. |
| `18-house-anabaridze` | still is fine | One ring rotating a notch reads as well held. Its character is stillness. |
| `08-altar-treasure` | still is fine | The flight carries it; a slow glow can be done in CSS. |
| `06-hall-cloak`, `16-four-banners`, `13`–`15` insets | **still** | Establishing and evidence shots. The flight is the motion. |
| `10-hand-reaching`, `11-seal-liquid` | **still, required** | These must stay separate layers so the drag moves them independently. A flat clip cannot be taken apart. |
| `01`–`05` crests, medallion | **SVG** | Heraldry, used small, recoloured per house. |
| `07-hero-cloak` | **still, required** | This is the character reference the Element is built from. |

**Five clips, fifteen stills.**

### What that costs

Measured on this account: ten seconds of video is 80 credits, so a five-second
clip is around 40. Stills are unmeasured but published figures put them near a
credit.

| | Credits |
| --- | --- |
| All twenty as clips | **~800** |
| All twenty as stills | **~20–40** |
| **Five clips + fifteen stills** | **~215–235** |

The hybrid costs roughly a quarter of all-video and puts the spend where the
page actually moves.

---

## 1. The style block

Every prompt below opens with the same sentence, verbatim. It is the only thing
holding twenty separate generations in one world — **do not paraphrase it
between shots**.

```
Hand-inked graphic novel panel, bold black linocut and woodcut engraving with dense cross-hatching, extremely high contrast, printed on grained off-white paper, strictly two colours only: black ink plus {SPOT}, flat matte fill, no gradients, 2D illustration, cinematic composition, visible paper grain and ink speckle.
```

And every prompt closes with the same exclusions, because the image UI has no
negative field:

```
No text, no letters, no words, no captions, no watermark, no signature, no logo. Not photorealistic, no photograph, no 3D render, no CGI, no smooth gradients, no pastel colours, no second accent colour, no colour bleed.
```

Spot colours, one per image, never two:

| Token | Hex | Belongs to |
| --- | --- | --- |
| `warm ochre gold` | `#B08D57` | the treasure, House Dovlatia |
| `deep oxblood red` | `#6E2020` | the shattering, House Baratishvili |
| `bright signal red` | `#CF2A20` | House Kharjiani, the finale |
| *(none)* | — | House Anabaridze, and every neutral plate |

## 2. Keeping the hero the same person — done

Twenty independent generations will produce twenty different faces unless
the character is pinned. Kling's **Elements** exist for exactly this, and the
Element now exists:

```
element id: 320915877667232      name: Legend Hero — ink woodcut traveller
```

Every shot with the hero in it goes through **`image_to_image`**, not
`text_to_image`, carrying `elements: [{"id":"320915877667232","bindName":"hero"}]`
and writing `<<<hero>>>` where the hero appears in the prompt. `text_to_image`
accepts no elements at all, so a hero shot sent there silently loses the
likeness. Shots below are marked **[element]** where this applies.

### Two things the API enforces that the first draft of this doc missed

- **`element_create` requires 1–3 secondary images, not just a cover.** The
  four `07-hero-cloak` candidates could not serve as each other's secondaries —
  they are four *different people*, not four views of one — so the winner was
  run back through `image_to_image` twice to produce a three-quarter face and a
  full-figure walking profile of the *same* character. Those two are the
  secondaries. Budget two extra generations for this.
- **`image_to_image` still requires `image_1` even when an element is bound.**
  The element is the identity; `image_1` is an auxiliary reference. Pass the
  view whose pose is closest to the shot and say in the prompt that it is a
  character reference, not a composition to copy — otherwise the model
  reproduces the reference's framing.

### On the cover URL

`element_create` wants a publicly accessible cover URL, and Kling's own CDN
(`s15-kling.klingai.com`) qualifies. It is blocked from this container by the
network policy, but that does not matter: the URL has to be reachable by
**Kling**, not by the machine making the call. Result URLs from a prior
generation can be passed straight back in.

## 3. Neutral plates and the tint trick

Two beats need to exist in all four house colours. Rather than drawing each
four times, they are generated **in pure black and white** and tinted in code.

Black ink on off-white paper composites cleanly under `mix-blend-mode: multiply`
— the paper drops out and the ink keeps its texture — so a flat colour laid
behind a neutral plate reads as if it were printed in that colour. The same
trick gives the layered gesture assets their transparency for free: no alpha
channel needed, just ink on paper and a multiply blend.

Shots marked **[neutral]** must therefore contain **no accent colour at all**.

---

## 4. The shots

### Beat 01 — the choice

Four crests plus an empty medallion. Square, small on screen, so they must read
as marks rather than scenes: heavy silhouette, no fine detail.

> **Cheaper and sharper alternative:** these five are pure heraldry and would be
> better as hand-drawn SVG — crisp at any size and instantly recolourable, like
> the existing `components/ui/Medallion.tsx`. The prompts are here because they
> were asked for, but SVG is the recommendation.

**`01-crest-kharjiani`** · 1:1 · spot `bright signal red` · `text_to_image`
```
{STYLE with bright signal red} A heraldic house crest carved as a single bold seal: a flame rising from an open hand, enclosed in a thick circular border of engraved rope. Heavy black silhouette, minimal internal detail, perfectly centred, filling the frame, flat on bare paper. {NEG}
```

**`02-crest-anabaridze`** · 1:1 · **[neutral]** · `text_to_image`
```
{STYLE, strictly black and white with no colour at all} A heraldic house crest carved as a single bold seal: a closed vault door of concentric geometric rings, enclosed in a thick circular border of engraved rope. Heavy black silhouette, minimal internal detail, perfectly centred, filling the frame, flat on bare paper. {NEG}
```

**`03-crest-dovlatia`** · 1:1 · spot `warm ochre gold` · `text_to_image`
```
{STYLE with warm ochre gold} A heraldic house crest carved as a single bold seal: a spoked wheel of fortune with coins along its rim, enclosed in a thick circular border of engraved rope. Heavy black silhouette, minimal internal detail, perfectly centred, filling the frame, flat on bare paper. {NEG}
```

**`04-crest-baratishvili`** · 1:1 · spot `deep oxblood red` · `text_to_image`
```
{STYLE with deep oxblood red} A heraldic house crest carved as a single bold seal: an ancient signet ring pressed into a pool of wax, enclosed in a thick circular border of engraved rope. Heavy black silhouette, minimal internal detail, perfectly centred, filling the frame, flat on bare paper. {NEG}
```

**`05-medallion-empty`** · 1:1 · **[neutral]** · `text_to_image`
```
{STYLE, strictly black and white with no colour at all} An empty circular medallion of engraved rope and rays, its centre blank bare paper waiting to be struck. Heavy black border, hollow middle, perfectly centred, filling the frame. {NEG}
```

---

### Beat 02 — the house

**`06-hall-cloak`** · 3:2 · **[neutral]** — tinted per house · `text_to_image`
```
{STYLE, strictly black and white with no colour at all} Interior of an ancient family hall drawn in deep engraved shadow: a long stone chamber, a heavy banner hanging on the far wall, and a travelling cloak on a hook in the foreground, waiting to be taken. Empty of people. Wide symmetrical composition, strong cross-hatched darkness in the corners. {NEG}
```

**`07-hero-cloak`** · 3:4 · **[neutral]** — **generate first, make the Element from this** · `text_to_image`
```
{STYLE, strictly black and white with no colour at all} Full-length portrait of a lone traveller facing the viewer, hood down, a heavy hooded travelling cloak falling to the floor, a lantern hanging from one hand. Calm, resolute, unremarkable face — an ordinary person, not a warrior. Standing centred against bare paper with no background scene. {NEG}
```

---

### Beat 03 — the balance

**`08-altar-treasure`** · 16:9 · spot `warm ochre gold` · `text_to_image`
```
{STYLE with warm ochre gold} An ancient ornate treasure chest resting on a carved stone altar at the centre of a vaulted hall, drawn in heavy black engraving with deep cross-hatched shadow. Warm ochre gold light seeps from the seams of its lid and pools across the stone. Dust drifting in the shafts of light. Wide, still, reverent, perfectly symmetrical. {NEG}
```

---

### Beat 04 — departure

**`09-gate-night`** · 16:9 · **[neutral]** — tinted per house · `text_to_image` **[element]**
```
{STYLE, strictly black and white with no colour at all} <<<hero>>> seen from behind, small in the frame, walking out through a great open stone gate into a night landscape of engraved hills. The gate's shadow falls long across the road. Behind him the windows of the house go dark. Wide establishing shot, the figure occupying less than a fifth of the frame. {NEG}
```

---

### Beat 05 — the gesture

Two layered assets. They must be generated **separately on bare paper** so the
hand and the seal can move independently under the drag; the multiply blend
knocks the paper out.

**`10-hand-reaching`** · 3:2 · **[neutral]** · `text_to_image`
```
{STYLE, strictly black and white with no colour at all} A single human hand and forearm reaching in from the left edge of the frame, fingers extended, hesitant, drawn in fine engraved linework with cross-hatched shadow along the underside. Nothing else in the frame — no background, no scene, only the hand on bare paper. {NEG}
```

**`11-seal-liquid`** · 1:1 · spot `warm ochre gold` · `text_to_image`
```
{STYLE with warm ochre gold} A thick blot of molten liquid gold shaped like an ancient seal, its edge swelling and drawing back into tendrils as if alive and recoiling. Glossy, viscous, sitting alone at the centre of bare paper with nothing else in the frame — no hand, no door, no background. {NEG}
```

---

### Beat 06 — the shattering

**`12-shattering`** · 16:9 · spot `deep oxblood red` · `text_to_image`
```
{STYLE with deep oxblood red} The ancient treasure chest bursting apart into millions of coins that erupt upward and outward and fill the entire frame, each coin an engraved hatched disc tumbling end over end. The background floods deep oxblood red behind them. Ink splinters and torn debris streak outward from the centre. Violent, catastrophic, beautiful. {NEG}
```

---

### Beat 07 — the doubt

Three small insets, sharing one composition language: a single object, centred,
shallow, drawn like evidence laid on a table.

**`13-inset-accident`** · 4:3 · **[neutral]** · `text_to_image`
```
{STYLE, strictly black and white with no colour at all} A snapped iron bar lying alone on stone, its break fresh and jagged, drawn in close engraved detail like a piece of evidence. Nothing else in the frame. {NEG}
```

**`14-inset-betrayal`** · 4:3 · **[neutral]** · `text_to_image`
```
{STYLE, strictly black and white with no colour at all} A human shadow cast across a closed door from the far side, only the silhouette visible, drawn in heavy engraved black. Nothing else in the frame. {NEG}
```

**`15-inset-prophecy`** · 4:3 · **[neutral]** · `text_to_image`
```
{STYLE, strictly black and white with no colour at all} An ancient manuscript page, cracked and water-stained, bearing an engraved illustration of a chest breaking apart. The writing on it is unreadable scratches, not letters. Nothing else in the frame. {NEG}
```

---

### Beat 08 — four horizons

**`16-four-banners`** · 21:9 · spot `warm ochre gold` · `text_to_image`
```
{STYLE with warm ochre gold} Four tall heraldic banners on long poles, planted far apart along a single wide horizon of engraved hills, each bearing a different abstract sigil, all rippling in the same wind. Scattered ochre gold coins glinting in the dirt of the road across the foreground. Very wide panoramic composition, no figures. {NEG}
```

---

### Beat 09 — four truths

Portrait panels, one per house. Same framing discipline throughout: one
emblematic object, centred, filling the frame.

**`17-house-kharjiani`** · 3:4 · spot `bright signal red` · `text_to_image`
```
{STYLE with bright signal red} A heraldic banner whipping hard in strong wind above a brazier of leaping flame, its fabric torn at the edge, sparks streaming upward across the frame. Everything caught mid-motion. Centred, filling the frame. {NEG}
```

**`18-house-anabaridze`** · 3:4 · **[neutral]** · `text_to_image`
```
{STYLE, strictly black and white with no colour at all} A massive sealed vault door of concentric geometric rings and heavy bolts, drawn in precise engraved linework, perfectly centred and symmetrical, shut and immovable. Cold, patient, impenetrable. {NEG}
```

**`19-house-dovlatia`** · 3:4 · spot `warm ochre gold` · `text_to_image`
```
{STYLE with warm ochre gold} An ornate wheel of fortune, its spokes and rim carved with engraved symbols, ochre gold coins cascading off the rim and tumbling down through the frame. Centred, theatrical, opulent. {NEG}
```

**`20-house-baratishvili`** · 3:4 · spot `deep oxblood red` · `text_to_image`
```
{STYLE with deep oxblood red} An ancient heavy signet seal pressed into a spreading pool of oxblood red wax on a stone table, the wax rippling outward in engraved ridges around it. Centred, deliberate, authoritative. {NEG}
```

---

## 5. The MCP calls

Plain shot:

```json
{
  "model": "kling-image-v3_0",
  "arguments": [
    { "name": "prompt",         "value": "<the full prompt, style block and exclusions included>" },
    { "name": "aspect_ratio",   "value": "16:9" },
    { "name": "img_resolution", "value": "2k" },
    { "name": "imageCount",     "value": "2" }
  ]
}
```

`imageCount: 2` on the first pass of each shot — two candidates for barely more
than one, and the ink style varies enough between seeds to be worth the choice.

Hero shot, once the element exists — note the different tool:

```json
{
  "model": "kling-image-v3_0",
  "arguments": [
    { "name": "prompt",       "value": "... <<<ELEMENT_ID>>> seen from behind ..." },
    { "name": "elements",     "value": "[{\"id\":\"ELEMENT_ID\",\"bindName\":\"hero\"}]" },
    { "name": "aspect_ratio", "value": "16:9" }
  ]
}
```

Both return a `generation_id`; poll `query_tasks` for the URLs. **Results expire
in 24 hours — download immediately.**

## 6. Order of work

1. **`07-hero-cloak`** alone, `imageCount: 4`. Everything downstream depends on
   this face, so choose deliberately, then `element_create` from the winner.
2. The four **[neutral]** plates — `06`, `09`, `10`, `18` — to confirm the tint
   trick reads correctly before committing to the coloured shots.
3. Everything else, in batches by spot colour so the eye can judge consistency
   within a colour.

**Status: all twenty stills are generated.** Step 1 produced four candidates,
one was chosen, and the Element was built from it. Steps 2 and 3 were then run
as a single batch of nineteen — one image per shot rather than the two
candidates this doc originally suggested, because at a credit each a
regeneration of a shot that disappoints is cheaper than doubling the set and
doubling what has to be reviewed and downloaded.

Result URLs **expire 24 hours after generation**, so they are not recorded
here — by the time anyone reads this they would be dead links. Download on
generation and commit the files.

Files land in `public/media/` as `.jpg`, wired the same way as the clips:

```tsx
<ArtPlate src="/media/12-shattering.jpg" tone="oxblood" label="დამსხვრევა" />
```
