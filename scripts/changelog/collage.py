# Usage: collage.py out.webp "#bg" shot1.png [shot2.png [shot3.png]]
# 1600x1000 WebP: phone screenshots on a brand colour, running off the bottom edge.
import sys
from PIL import Image, ImageDraw, ImageFilter
out, bg, shots = sys.argv[1], sys.argv[2], sys.argv[3:]
W, H = 1600, 1000
ph = 1080
gap = 72
canvas = Image.new("RGB", (W, H), bg)
phones = []
for f in shots:
    im = Image.open(f).convert("RGB")
    w = round(im.width * ph / im.height)
    im = im.resize((w, ph), Image.LANCZOS)
    r = 44
    mask = Image.new("L", im.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, w - 1, ph - 1], r, fill=255)
    phones.append((im, mask))
total = sum(p[0].width for p in phones) + gap * (len(phones) - 1)
if total > W - 160:  # three phones: shrink them all to fit the width
    k = (W - 160 - gap * (len(phones) - 1)) / (total - gap * (len(phones) - 1))
    phones = [(im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS), m.resize((round(m.width * k), round(m.height * k)))) for im, m in phones]
    total = sum(p[0].width for p in phones) + gap * (len(phones) - 1)
x = (W - total) // 2
y = 84
for im, mask in phones:
    ph = im.height
    sh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(sh).rounded_rectangle([x, y + 14, x + im.width, y + ph + 14], 44, fill=(46, 36, 64, 60))
    sh = sh.filter(ImageFilter.GaussianBlur(22))
    canvas.paste(sh, (0, 0), sh)
    border = Image.new("RGB", (im.width + 6, ph + 6), "#ffffff")
    bmask = Image.new("L", border.size, 0)
    ImageDraw.Draw(bmask).rounded_rectangle([0, 0, border.width - 1, border.height - 1], 47, fill=255)
    canvas.paste(border, (x - 3, y - 3), bmask)
    canvas.paste(im, (x, y), mask)
    x += im.width + gap
canvas.save(out, "WEBP", quality=82, method=6)
