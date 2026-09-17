import os
from PIL import Image
import numpy as np

# Load source sprite image provided by user
src_path = 'public/singers/new update singers images.png'
if not os.path.exists(src_path):
    raise FileNotFoundError(f"Source sprite not found: {src_path}")

img = Image.open(src_path)

female_boxes = [
    ('female_0',   (85, 21, 291, 442)),
    ('female_45',  (417, 22, 623, 442)),
    ('female_90',  (766, 18, 963, 444)),
    ('female_135', (1096, 22, 1318, 443)),
    ('female_180', (1435, 17, 1638, 441)),
]

male_boxes = [
    ('male_225', (71, 464, 294, 852)),
    ('male_270', (407, 463, 629, 853)),
    ('male_300', (757, 465, 962, 851)),
    ('male_315', (1090, 466, 1283, 852)),
    ('male_350', (1453, 464, 1660, 855)),
]

CANVAS_W = 340
CANVAS_H = 480
BASELINE_Y = 460  # Y coordinate where the bottom of the base/feet touches
CENTER_X = 170    # X coordinate of the center of rotation

os.makedirs('public/singers', exist_ok=True)

# Process female frames (target height ~421px)
for name, box in female_boxes:
    crop = img.crop(box)
    w, h = crop.size
    arr = np.array(crop)
    pts = np.where(arr[:, :, 3] > 40)
    center_x = np.mean(pts[1]) if len(pts[1]) > 0 else w / 2

    canvas = Image.new('RGBA', (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    paste_x = int(round(CENTER_X - center_x))
    paste_y = int(round(BASELINE_Y - h))
    canvas.paste(crop, (paste_x, paste_y), crop)
    canvas.save(f'public/singers/{name}.png')
    print(f'Saved public/singers/{name}.png: paste=({paste_x}, {paste_y}), crop_size=({w}, {h})')

# Process male frames: scale slightly to match head height of ~421px for seamless continuity
target_male_h = 421.0
for name, box in male_boxes:
    crop = img.crop(box)
    w, h = crop.size
    scale = target_male_h / h
    new_w = int(round(w * scale))
    new_h = int(round(h * scale))
    crop_scaled = crop.resize((new_w, new_h), Image.Resampling.LANCZOS)

    arr = np.array(crop_scaled)
    pts = np.where(arr[:, :, 3] > 40)
    center_x = np.mean(pts[1]) if len(pts[1]) > 0 else new_w / 2

    canvas = Image.new('RGBA', (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    paste_x = int(round(CENTER_X - center_x))
    paste_y = int(round(BASELINE_Y - new_h))
    canvas.paste(crop_scaled, (paste_x, paste_y), crop_scaled)
    canvas.save(f'public/singers/{name}.png')
    print(f'Saved public/singers/{name}.png: scale={scale:.3f}, paste=({paste_x}, {paste_y}), scaled_size=({new_w}, {new_h})')

print("All 10 singer frames successfully generated with standardized canvas alignment!")
