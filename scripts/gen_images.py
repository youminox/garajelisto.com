#!/usr/bin/env python3
"""
Genera imágenes de ambiente para garajelisto.com vía la Edge Function garajelisto-images
(Supabase charlielingan → OpenAI ChatGPT Image API con quality="medium") y las comprime en WebP
ligeros (< 68 KB, siempre < 100 KB) en public/img/.

Uso:
  python3 scripts/gen_images.py home        # genera imágenes de la Home y de los 10 silos
  python3 scripts/gen_images.py articles    # genera imágenes individuales por artículo
  python3 scripts/gen_images.py one <slug> "<prompt>"
"""
import json, sys, io, pathlib, urllib.request, concurrent.futures as cf
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
ENDPOINT = "https://ehwjvuhbimqakvzqbvvg.supabase.co/functions/v1/garajelisto-images"
TOKEN = "garajelisto-img-2026"
RAW = ROOT / "scripts/.cache/raw"
RAW.mkdir(parents=True, exist_ok=True)

HOME_PROMPTS = {
    "home-hero-garaje": "A rugged compact portable lithium car battery jump starter with heavy-duty copper clamps next to a sleek cordless digital tire inflator and a 4K dual dash cam on a modern residential garage workbench, with a modern dark grey SUV in the background, warm garage LED and morning sunlight",
    "og-default": "A curated automotive flat lay on a clean dark garage workbench featuring a compact 12V lithium jump starter, a cordless digital tire inflator showing 35 PSI, a 4K dash cam and a Bluetooth OBD2 scanner, editorial studio daylight",
    "home-arrancador-noco": "A compact rugged matte grey and orange 12V lithium car battery jump starter connected with heavy-duty spark-proof clamps to a car battery under an open hood in a bright residential garage",
    "home-inflador-fanttik": "A sleek black cordless digital portable tire inflator connected to a modern alloy car wheel tire valve showing 35 PSI on its bright LED screen on a clean driveway",
    "home-dash-cam-4k": "A compact black 4K dash cam mounted discreetly behind the rearview mirror on a car windshield looking out at a sunny American highway, clean modern dashboard interior",
    "home-escaner-obd2": "A driver holding a smartphone showing a clean automotive diagnostic gauge interface next to the steering wheel while a compact Bluetooth OBD2 adapter is plugged under the dashboard",
    "home-kit-emergencia": "A neatly organized SUV trunk compartment with a padded storage organizer holding a portable jump starter case, cordless tire inflator, LED roadside warning beacon and torque wrench",
    "home-aspiradora-auto": "A sleek brushed aluminum cordless handheld car vacuum cleaning a modern car center console and leather seat stitching in bright natural daylight",
    "home-pickup-diesel": "A powerful heavy-duty portable lithium jump starter and a metallic 12V portable air compressor placed on the tailgate of a modern pickup truck in a sunny driveway",
    "cat-resenas-accesorios-auto": "A modern residential garage workbench displaying a rugged portable lithium car jump starter, a digital cordless tire inflator, a 4K dash cam and an OBD2 scanner next to a car",
    "cat-comparativas": "Two different compact portable lithium car jump starters and two digital tire inflators placed side by side on a clean garage workbench for technical comparison, warm daylight",
    "cat-mejores-accesorios-auto": "An organized modern SUV trunk equipped with a portable car jump starter case, cordless digital tire inflator, roadside emergency kit and tools in a sunlit driveway",
    "cat-arrancadores-y-bateria-12v": "Close-up of heavy-duty copper jumper clamps from a compact lithium jump starter connected to a clean 12V car battery terminal under an open hood in a bright garage",
    "cat-infladores-y-neumaticos": "A compact cordless digital tire inflator connected to an alloy car wheel tire valve showing 35 PSI on its LED display in morning sunlight",
    "cat-camaras-dash-cam-y-seguridad": "A sleek compact 4K dash cam mounted discreetly behind a car rearview mirror on the windshield looking out over a highway from inside a clean cabin",
    "cat-diagnostico-obd2-y-codigos": "A smartphone on a car dashboard mount displaying an automotive diagnostic screen next to the steering wheel with a Bluetooth OBD2 scanner connected below",
    "cat-herramientas-y-mantenimiento-garaje": "A clean residential garage floor with a low-profile aluminum hydraulic floor jack, jack stands and a chrome torque wrench next to a car wheel",
    "cat-emergencias-en-carretera-y-viajes": "An open car trunk on a scenic highway pull-out showing a roadside emergency kit with glowing amber LED warning beacons, portable jump starter and tire inflator",
    "cat-cuidado-interior-y-organizacion": "A spotless modern car interior being vacuumed with a sleek cordless handheld car vacuum on the center console, warm natural daylight",
}


def call(slug, prompt):
    data = json.dumps({"slug": slug, "prompt": prompt}).encode()
    req = urllib.request.Request(
        ENDPOINT,
        data=data,
        headers={"Content-Type": "application/json", "x-garajelisto-token": TOKEN},
    )
    with urllib.request.urlopen(req, timeout=240) as r:
        res = json.loads(r.read())
    if not res.get("ok"):
        raise RuntimeError(res.get("error"))
    with urllib.request.urlopen(res["url"] + "?v=1", timeout=120) as r:
        return r.read()


def save_variants(slug, raw_bytes, outdir):
    outdir.mkdir(parents=True, exist_ok=True)
    im = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
    w, h = im.size
    target = 16 / 9
    if w / h > target:
        nw = int(h * target)
        im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:
        nh = int(w / target)
        im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    # Límite estricto: <= 68 KB para la imagen 1200x675 (siempre < 100 KB como pidió el usuario)
    sizes = {"": 1200, "-800": 800, "-400": 400}
    limits = {"": 68_000, "-800": 42_000, "-400": 18_000}
    out = {}
    for suf, width in sizes.items():
        r = im.resize((width, round(width * 9 / 16)), Image.LANCZOS)
        q = 78
        while True:
            buf = io.BytesIO()
            r.save(buf, "WEBP", quality=q, method=6)
            if buf.tell() <= limits[suf] or q <= 38:
                break
            q -= 5
        p = outdir / f"{slug}{suf}.webp"
        p.write_bytes(buf.getvalue())
        out[suf] = buf.tell()
    return out


def job(slug, prompt, outdir):
    final = outdir / f"{slug}.webp"
    if final.exists():
        return slug, f"skip ({final.stat().st_size // 1024}KB)"
    rawp = RAW / f"{slug}.webp"
    if rawp.exists():
        b = rawp.read_bytes()
    else:
        last = None
        for _ in range(3):
            try:
                b = call(slug, prompt)
                break
            except Exception as e:
                last = e
        else:
            return slug, f"ERROR {last}"
        rawp.write_bytes(b)
    sizes = save_variants(slug, b, outdir)
    return slug, f"ok {sizes[''] // 1024}KB"


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "home"
    tasks = []
    if mode == "home":
        for s, p in HOME_PROMPTS.items():
            tasks.append((s, p, ROOT / "public/img/ambiente"))
    elif mode == "articles":
        for f in sorted((ROOT / "src/content/articles").glob("*.json")):
            a = json.loads(f.read_text())
            tasks.append((a["slug"], a["image"]["prompt"], ROOT / "public/img/articulos"))
    elif mode == "one":
        tasks.append((sys.argv[2], sys.argv[3], ROOT / "public/img/ambiente"))
    with cf.ThreadPoolExecutor(max_workers=5) as ex:
        for slug, status in ex.map(lambda t: job(*t), tasks):
            print(slug, status, flush=True)


if __name__ == "__main__":
    main()
