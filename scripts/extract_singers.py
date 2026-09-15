import os
from PIL import Image

os.makedirs('public/singers', exist_ok=True)
img = Image.open('public/singers/all singers.png')

slices = [
    ('female_0',   (30, 0, 316, 488)),
    ('female_45',  (370, 0, 665, 488)),
    ('female_90',  (668, 0, 921, 488)),
    ('female_135', (938, 0, 1175, 488)),
    ('female_180', (1226, 0, 1533, 488)),
    ('male_225',   (60, 520, 345, 1024)),
    ('male_270',   (450, 520, 726, 1024)),
    ('male_315',   (840, 520, 1100, 1024)),
    ('male_350',   (1228, 520, 1486, 1024)),
]

for name, box in slices:
    cropped = img.crop(box)
    bbox = cropped.getbbox()
    if bbox:
        cropped = cropped.crop(bbox)
    cropped.save(f'public/singers/{name}.png')
    print(f"Saved public/singers/{name}.png size: {cropped.size}")

print("All 9 singer frames successfully generated directly from all singers.png!")

