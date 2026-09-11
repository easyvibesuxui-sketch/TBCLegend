#!/usr/bin/env bash
# Turn a Kling download into the three files a plate needs.
#
#   ./scripts/prepare-clip.sh ~/Downloads/kling_xyz.mp4 04-shattering
#
# Kling ships ~15 MB at ~24 Mb/s with an audio track and a watermark in the
# bottom-right corner. The plates are full-bleed cover backgrounds, so cropping
# the foot of the frame to lose the watermark costs nothing visually.
set -euo pipefail

SRC=${1:?usage: prepare-clip.sh <downloaded.mp4> <output-name> [crop-height]}
NAME=${2:?usage: prepare-clip.sh <downloaded.mp4> <output-name> [crop-height]}
# Kling does not always return 1280x720 -- the plates in this set came back
# 1324x696, matching the aspect of the still they were animated from. So the
# watermark band is a proportion of the frame, not a fixed pixel count: it was
# measured at ~7.6% of the height up from the bottom, so trimming 10% clears it
# with margin at any size ffmpeg hands us. Pass a third argument to override,
# including the full height once a watermark-free download exists.
CROP_H=${3:-}

FF=${FFMPEG:-ffmpeg}
OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/media"
mkdir -p "$OUT_DIR"

# ih is ffmpeg's input-height variable, so the trim scales with the input and
# needs no separate ffprobe call. floor to an even number: H.264 and VP9 both
# require even dimensions with yuv420p.
VF="crop=iw:${CROP_H:-floor(ih*0.90/2)*2}:0:0"

echo "→ $NAME  (full width, cropped to ${CROP_H:-90% of input height})"

# H.264: the universal fallback, and what Safari needs. faststart moves the
# index to the front so the first frame paints during download.
"$FF" -v error -y -i "$SRC" -vf "$VF" -an \
  -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p -movflags +faststart \
  "$OUT_DIR/$NAME.mp4"

# VP9: offered first where it is supported.
"$FF" -v error -y -i "$SRC" -vf "$VF" -an \
  -c:v libvpx-vp9 -crf 40 -b:v 0 -row-mt 1 -speed 2 \
  "$OUT_DIR/$NAME.webm"

# Poster, so the panel is never blank while the video decodes.
"$FF" -v error -y -i "$SRC" -vf "$VF" -frames:v 1 -q:v 4 "$OUT_DIR/$NAME.jpg"

du -h "$OUT_DIR/$NAME".{mp4,webm,jpg} |
  awk '{ n = $2; sub(/.*\//, "", n); printf "   %-6s %s\n", $1, n }'
echo

# VP9 usually loses on this material, and that is expected rather than a
# fault to fix. The plates are dense engraving -- high-frequency detail across
# the whole frame -- which x264 handles well and libvpx does not: measured on
# the well clip, x264 crf 27 came out 1.58 MB at SSIM 0.9675 against VP9 crf
# 40 at 2.24 MB and SSIM 0.9412. So the MP4 is the one ArtPlate offers first,
# and the WebM ships as the fallback for a build without H.264. A larger WebM
# is therefore fine; it is rarely the file anyone downloads.
MP4_B=$(stat -c%s "$OUT_DIR/$NAME.mp4")
WEBM_B=$(stat -c%s "$OUT_DIR/$NAME.webm")
if [ "$WEBM_B" -ge "$MP4_B" ]; then
  echo "   (WebM is larger than the MP4, $((WEBM_B/1024))K vs $((MP4_B/1024))K -- expected here; the MP4 is served first.)"
  echo
fi
echo "Now point the plate at it:"
echo "   clip(\"$NAME\", \"...\")"rst, so a larger one means nearly every reader downloads the bigger file
# for nothing. Check rather than assume.
MP4_B=$(stat -c%s "$OUT_DIR/$NAME.mp4")
WEBM_B=$(stat -c%s "$OUT_DIR/$NAME.webm")
if [ "$WEBM_B" -ge "$MP4_B" ]; then
  echo "   ! the WebM is larger than the MP4 ($((WEBM_B/1024))K vs $((MP4_B/1024))K)."
  echo "     Delete it and register the plate with { webm: false }:"
  echo
  echo "     rm public/media/$NAME.webm"
  echo "     clip(\"$NAME\", \"...\", { webm: false })"
else
  echo "Now point the plate at it:"
  echo "   clip(\"$NAME\", \"...\")"
fi
