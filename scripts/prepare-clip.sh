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
# Kling's 720p output is 1280x720; 632 trims the watermark band. Pass a third
# argument to keep the full frame (720) once a watermark-free download exists.
CROP_H=${3:-632}

FF=${FFMPEG:-ffmpeg}
OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/media"
mkdir -p "$OUT_DIR"

# iw is ffmpeg's input-width variable, so the crop adapts to whatever Kling
# delivered without a separate ffprobe call.
VF="crop=iw:${CROP_H}:0:0"

echo "→ $NAME  (full width, cropped to ${CROP_H}px tall)"

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
echo "Now point the plate at it:"
echo "   src=\"/media/$NAME.mp4\" srcWebm=\"/media/$NAME.webm\" poster=\"/media/$NAME.jpg\""
