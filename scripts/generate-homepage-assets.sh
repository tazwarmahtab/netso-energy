#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="$ROOT_DIR/src/assets/generated/home"
FONT_DIR="$ROOT_DIR/public/fonts"

mkdir -p "$OUTPUT_DIR" "$FONT_DIR"

generate_avif() {
  local input="$1"
  local max_width="$2"
  local output="$3"
  sips -Z "$max_width" "$input" -s format avif --out "$output" >/dev/null
}

generate_jpeg() {
  local input="$1"
  local max_width="$2"
  local output="$3"
  sips -Z "$max_width" "$input" -s format jpeg --out "$output" >/dev/null
}

generate_avif "$ROOT_DIR/src/assets/custom/hero-background-reference-optimized.jpg" 640 "$OUTPUT_DIR/hero-background-640.avif"
generate_avif "$ROOT_DIR/src/assets/custom/hero-background-reference-optimized.jpg" 960 "$OUTPUT_DIR/hero-background-960.avif"
generate_avif "$ROOT_DIR/src/assets/custom/hero-background-reference-optimized.jpg" 1440 "$OUTPUT_DIR/hero-background-1440.avif"
generate_jpeg "$ROOT_DIR/src/assets/custom/hero-background-reference-optimized.jpg" 640 "$OUTPUT_DIR/hero-background-640.jpg"
generate_jpeg "$ROOT_DIR/src/assets/custom/hero-background-reference-optimized.jpg" 960 "$OUTPUT_DIR/hero-background-960.jpg"

generate_avif "$ROOT_DIR/src/assets/hero-rooftop.jpg" 480 "$OUTPUT_DIR/hero-poster-480.avif"
generate_avif "$ROOT_DIR/src/assets/hero-rooftop.jpg" 960 "$OUTPUT_DIR/hero-poster-960.avif"
generate_jpeg "$ROOT_DIR/src/assets/hero-rooftop.jpg" 480 "$OUTPUT_DIR/hero-poster-480.jpg"

generate_avif "$ROOT_DIR/src/assets/custom/problem-urban-rooftops-optimized.jpg" 640 "$OUTPUT_DIR/problem-rooftops-640.avif"
generate_avif "$ROOT_DIR/src/assets/custom/problem-urban-rooftops-optimized.jpg" 960 "$OUTPUT_DIR/problem-rooftops-960.avif"
generate_avif "$ROOT_DIR/src/assets/custom/problem-urban-rooftops-optimized.jpg" 1280 "$OUTPUT_DIR/problem-rooftops-1280.avif"
generate_jpeg "$ROOT_DIR/src/assets/custom/problem-urban-rooftops-optimized.jpg" 640 "$OUTPUT_DIR/problem-rooftops-640.jpg"
generate_jpeg "$ROOT_DIR/src/assets/custom/problem-urban-rooftops-optimized.jpg" 960 "$OUTPUT_DIR/problem-rooftops-960.jpg"

generate_avif "$ROOT_DIR/src/assets/new/logo-optimized.png" 160 "$OUTPUT_DIR/logo-160.avif"
generate_avif "$ROOT_DIR/src/assets/new/logo-optimized.png" 224 "$OUTPUT_DIR/logo-224.avif"

curl -L "https://godaylight.com/_next/static/media/ce50667cae3f791b-s.p.woff2" -o "$FONT_DIR/aeonikPro-400.woff2"
curl -L "https://godaylight.com/_next/static/media/1d56e343625edc89-s.p.woff2" -o "$FONT_DIR/socialMono-400.woff2"
curl -L "https://godaylight.com/_next/static/media/a28bc5cb4f594492-s.p.woff2" -o "$FONT_DIR/featureDeck-700.woff2"
