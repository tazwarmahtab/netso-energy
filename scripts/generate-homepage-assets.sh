#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

python3 - "$ROOT_DIR" <<'PY'
from pathlib import Path
from PIL import Image
import sys

root = Path(sys.argv[1])
output_dir = root / "src/assets/generated/home"
font_dir = root / "public/fonts"
output_dir.mkdir(parents=True, exist_ok=True)

def resize_and_save(input_path: Path, width: int, output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(input_path) as original:
        image = original.copy()
        image.thumbnail((width, 9999), Image.Resampling.LANCZOS)

        suffix = output_path.suffix.lower()
        if suffix in {".jpg", ".jpeg"}:
            if image.mode not in ("RGB", "L"):
                image = image.convert("RGB")
            image.save(
                output_path,
                format="JPEG",
                quality=84,
                optimize=True,
                progressive=True,
            )
            return

        if suffix == ".avif":
            image.save(output_path, format="AVIF", quality=58)
            return

        raise RuntimeError(f"Unsupported output format for {output_path}")

variants = [
    ("src/assets/custom/hero-background-reference-optimized.jpg", 640, "hero-background-640.avif"),
    ("src/assets/custom/hero-background-reference-optimized.jpg", 960, "hero-background-960.avif"),
    ("src/assets/custom/hero-background-reference-optimized.jpg", 1440, "hero-background-1440.avif"),
    ("src/assets/custom/hero-background-reference-optimized.jpg", 640, "hero-background-640.jpg"),
    ("src/assets/custom/hero-background-reference-optimized.jpg", 960, "hero-background-960.jpg"),
    ("src/assets/custom/hero-video-poster-reference.jpg", 480, "hero-poster-480.avif"),
    ("src/assets/custom/hero-video-poster-reference.jpg", 960, "hero-poster-960.avif"),
    ("src/assets/custom/hero-video-poster-reference.jpg", 480, "hero-poster-480.jpg"),
    ("src/assets/custom/problem-urban-rooftops-optimized.jpg", 640, "problem-rooftops-640.avif"),
    ("src/assets/custom/problem-urban-rooftops-optimized.jpg", 960, "problem-rooftops-960.avif"),
    ("src/assets/custom/problem-urban-rooftops-optimized.jpg", 1280, "problem-rooftops-1280.avif"),
    ("src/assets/custom/problem-urban-rooftops-optimized.jpg", 640, "problem-rooftops-640.jpg"),
    ("src/assets/custom/problem-urban-rooftops-optimized.jpg", 960, "problem-rooftops-960.jpg"),
    ("src/assets/new/logo-optimized.png", 160, "logo-160.avif"),
    ("src/assets/new/logo-optimized.png", 224, "logo-224.avif"),
]

for input_rel, width, output_name in variants:
    resize_and_save(root / input_rel, width, output_dir / output_name)

required_fonts = [
    "aeonikPro-400.woff2",
    "featureDeck-700.woff2",
    "socialMono-400.woff2",
]

missing_fonts = [name for name in required_fonts if not (font_dir / name).exists()]
if missing_fonts:
    raise SystemExit(
        "Missing vendored fonts in public/fonts: " + ", ".join(missing_fonts)
    )
PY
