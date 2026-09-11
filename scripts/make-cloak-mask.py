#!/usr/bin/env python3
"""
Build the tint mask for the cloak in `06-hall-cloak.jpg`.

Beat 02 tells the reader the cloak on the wall is their colour. The shotlist
offered two ways to make that true — draw the plate four times, once per
house, or draw it once and add a colour layer — and this is the second. One
mask serves all four houses, follows any later change to a house's accent for
free, and costs one small file instead of four large ones.

The cloak could not be separated from the wall automatically. Both are dense
black hatching on the same cream paper, so every tone-based approach tried
(luminance thresholds, Gaussian-averaged tone at three radii, flood fill from
inside the garment) put the coat and the wall in the same bucket: blurred at
r=7 the coat's interior reads 28-67 and the wall behind it 36-75. There is no
threshold between those. The silhouette below is therefore traced by hand
against a coordinate grid, which is also why it lives in a script and not in
a notebook somewhere.

The mask is drawn at 4x and downsampled so its edge lands with real
antialiasing; a hard 1-bit edge shimmers against the engraving's own grain.
"""

from PIL import Image, ImageDraw
from pathlib import Path

SRC = Path("public/media/06-hall-cloak.jpg")
OUT = Path("public/media/06-hall-cloak-mask.png")

# Traced against a 10px grid on the 1600x992 plate. The line runs a little
# wide on the left, where the coat meets near-black wall: multiplying a colour
# over black changes nothing, so erring outward there is free, while erring
# outward on the right would tint the lit doorway behind it.
CLOAK = [
    (352, 374), (372, 383), (392, 400), (406, 414), (417, 433), (424, 462),
    (427, 497), (430, 530), (434, 556), (437, 594), (437, 634), (433, 672),
    (426, 698), (416, 717), (402, 729), (380, 737), (352, 739), (328, 736),
    (310, 728), (299, 712), (290, 682), (285, 640), (284, 596), (286, 552),
    (288, 505), (293, 463), (302, 427), (316, 401), (334, 384),
]

SS = 4  # supersample factor


def main() -> None:
    w, h = Image.open(SRC).size
    big = Image.new("L", (w * SS, h * SS), 0)
    ImageDraw.Draw(big).polygon([(x * SS, y * SS) for x, y in CLOAK], fill=255)
    alpha = big.resize((w, h), Image.LANCZOS)

    # White throughout; only the alpha carries the shape, because CSS
    # mask-image reads the alpha channel by default.
    out = Image.new("RGBA", (w, h), (255, 255, 255, 0))
    out.putalpha(alpha)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    out.save(OUT, optimize=True)

    covered = sum(alpha.point(lambda v: 1 if v > 127 else 0).get_flattened_data())
    print(f"{OUT}  {w}x{h}  {OUT.stat().st_size / 1024:.1f} KB  "
          f"covers {covered / (w * h):.2%} of the plate")


if __name__ == "__main__":
    main()
