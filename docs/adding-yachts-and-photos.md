# Runbook: adding a yacht (or new photos)

Photos are served as-is (`images.unoptimized: true` in `next.config.ts`) to stay inside
Vercel's free Image Optimization limit (5,000 transformations/month). That means **every
photo must be compressed before it is committed**. Target: WebP, max 1920px wide, quality 82.

Tip: tell Hermes "I added photos for `<yacht-id>`, run the image runbook" and it will do steps 2-6.

## 1. Add the files
- Create `public/images/yachts/<id>/` and drop the photos in (jpg, jpeg, png, avif or webp).
- `<id>` must match the `id` column in the Sheet (lowercase, hyphens, e.g. `azimut-55`).
- Name them `01`, `02`, `03`... (the first is the card cover).

## 2. Compress (from the repo root)
```bash
~/.hermes/cache/scratch/imgenv/bin/python scripts/compress-images.py
```
(Any Python with Pillow works.) It is safe to re-run: it converts every `.jpg/.jpeg/.png/.avif`
under `public/images` (except `logos/`) to `.webp`, skips ones already done, and recompresses
`.webp` files over 400 KB in place. It writes the old-to-new map to
`../fleet-private/image-rename-map.json`.

## 3. Remove the originals
Once the `.webp` copies look right, delete the matching `.jpg/.jpeg/.png/.avif` files so the repo
stays small. Keep a backup of originals you care about in `../fleet-private/`.
Never delete an original while the live Sheet still links to it (see step 6).

## 4. Regenerate the `images` column
```bash
node scripts/fleet-images-column.mjs --csv     # id,images (prefers .webp)
```
Paste the new list into the `images` cell for that yacht in the Sheet (one path per line,
e.g. `/images/yachts/azimut-55/01.webp`). The private master `../fleet-private/fleet-full.csv`
and `content/fleet-starter.csv` should get the same value.

## 5. Verify locally
```bash
npm run lint
rm -rf .next && FLEET_SHEET_CSV_URL=<csv url or local server> npm run build
```
- Page count = number of published rows.
- Every `/images/...` path in the CSV exists in `public/` (a missing file shows a broken image).
- No file in `public/images` over ~700 KB: `find public/images -size +700k`.

## 6. Deploy in this order
1. Commit and push the photos + code (`git add public/images ...`). Vercel redeploys.
2. **Then** update the Sheet (new yachts / `images` column). Photos must be live before the Sheet links to them.
3. Open yachtcollective.sg, check the new yacht's card and gallery.
4. Deleting old files: only after the Sheet no longer references them.

## Other image types
- **Logos** (`public/images/logos/`): prefer SVG, otherwise WebP at about 800px wide. The compress
  script skips this folder, so convert by hand.
- **Sheet-linked remote photos** (Drive or other https URLs) are not compressed or optimized.
  Download and compress them into `public/images/yachts/<id>/` instead.
- **Video** (`public/videos/hero.mp4`) is not touched by any of this.

## Pitfalls
- Pillow isn't in the repo's `package.json`; use the venv above.
- A `.avif` and `.jpg` with the same stem convert to the same `.webp` name; the script keeps the first one made.
- Don't re-save the same `.webp` over and over; each lossy pass loses a little quality.
