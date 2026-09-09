#!/usr/bin/env python3
"""Turn an ink-on-paper plate into a transparent layer.

    python3 scripts/unmix-layer.py assets/masters/10-hand-reaching.jpg \
        public/media/10-hand-reaching.png

Most plates in this set composite fine under `mix-blend-mode: multiply`: the
paper darkens to whatever is behind it and the ink keeps its grain. That only
holds while the plate's paper is at least as light as the ground it lands on.
Measured, it is not — the plates come back warm and slightly dark
(#EDDCD0, #FAEFDC) against the page's #FAFAF8 — so a multiplied plate leaves a
visible warm rectangle where its paper should have disappeared.

The two gesture layers are the ones that matter, because they move over each
other and over whatever ground the section happens to use. So rather than
tuning a background to match them, this recovers a real alpha channel.

The plate is treated as ink laid over its own paper:

    pixel = colour x alpha + paper x (1 - alpha)

which is underdetermined, so it takes the usual reading: alpha is how far the
darkest channel has been pulled away from the paper, and the colour is what
must have been there to land on the pixel at that alpha. Bare paper solves to
alpha 0 and drops out; black ink solves to alpha 1; the ochre in the seal
solves to a saturated gold at partial alpha, which is what a real ink glaze
does — so it stays gold on a light ground and reads correctly on a dark one.
"""

import sys
from PIL import Image


def unmix(src: str, dst: str) -> None:
    im = Image.open(src).convert("RGB")
    w, h = im.size

    # The paper colour, read from the corners, where every plate in this set is
    # bare. The median resists the ink speckle that the style block asks for.
    sample = []
    for x0, y0 in ((0, 0), (w - 40, 0), (0, h - 40), (w - 40, h - 40)):
        for dx in range(0, 40, 2):
            for dy in range(0, 40, 2):
                sample.append(im.getpixel((x0 + dx, y0 + dy)))
    sample.sort(key=sum)
    paper = sample[len(sample) // 2]
    pr, pg, pb = (max(1, c) for c in paper)

    out = Image.new("RGBA", (w, h))
    src_px = im.load()
    out_px = out.load()

    # The style block asks for visible paper grain and ink speckle, so no paper
    # pixel sits exactly on the median: each is off by a few levels, which
    # solves to a small non-zero alpha across the entire plate. Left alone that
    # is a grey veil over whatever is behind, and it also means the file has no
    # flat transparent region to compress. Everything under the floor is paper;
    # what survives is rescaled so the ink keeps its full weight.
    FLOOR = 0.12

    for y in range(h):
        for x in range(w):
            r, g, b = src_px[x, y]
            # How far the most-pulled channel has moved off the paper.
            a = 1.0 - min(r / pr, g / pg, b / pb)
            if a <= FLOOR:
                out_px[x, y] = (0, 0, 0, 0)
                continue
            a = min((a - FLOOR) / (1.0 - FLOOR), 1.0)
            inv = 1.0 - a

            def ch(v: int, p: int) -> int:
                return max(0, min(255, round((v - p * inv) / a)))

            out_px[x, y] = (ch(r, pr), ch(g, pg), ch(b, pb), round(a * 255))

    out.save(dst, optimize=True)
    print(f"{src} -> {dst}  paper #{pr:02X}{pg:02X}{pb:02X}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    unmix(sys.argv[1], sys.argv[2])
