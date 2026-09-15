import os
from PIL import Image
from rembg import remove

os.makedirs('public/singers', exist_ok=True)
img = Image.open('public/login_background_image/Selection_Image.png').convert('RGB')

# Bounding boxes (left, top, right, bottom)
slices = [
    ("female_0",   (10,   10,  310,  439)),
    ("female_45",  (330,  10,  630,  439)),
    ("female_90",  (650,  10,  920,  439)),
    ("female_135", (920,  5,   1180, 439)),
    ("female_180", (1200, 10,  1500, 439)),
    ("male_225",   (50,   490, 360,  925)),
    ("male_270",   (430,  490, 720,  925)),
    ("male_315",   (820,  490, 1100, 925)),
    ("male_350",   (1190, 490, 1500, 925)),
]

for name, box in slices:
    print(f"Extracting and removing background for {name} from {box}...")
    cropped = img.crop(box)
    out = remove(cropped)
    # Trim empty transparent borders
    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)
    out_path = f'public/singers/{name}.png'
    out.save(out_path)
    print(f"-> Saved {out_path} ({out.size})")

print("All 9 singer frames successfully generated!")
