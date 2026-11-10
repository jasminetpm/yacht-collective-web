#!/usr/bin/env node
/**
 * Rebuilds the `images` column for the fleet sheet from the photo folders in
 * public/images/yachts/<id>/.
 *
 * Use after reviewing/deleting photos:
 *   node scripts/fleet-images-column.mjs            # prints id + images per yacht
 *   node scripts/fleet-images-column.mjs --csv      # prints a CSV (id,images) you can paste/import
 *
 * Paste each yacht's `images` value into the sheet (one path per line).
 * Yachts whose folder is empty or missing print an empty list, which the site
 * renders with the gradient fallback.
 */
import { readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images", "yachts");
const asCsv = process.argv.includes("--csv");
const IMG = /\.(jpe?g|png|webp|avif)$/i;

const ids = readdirSync(root)
  .filter((d) => statSync(join(root, d)).isDirectory())
  .sort();

if (asCsv) console.log("id,images");
for (const id of ids) {
  const dir = join(root, id);
  const files = existsSync(dir) ? readdirSync(dir).filter((f) => IMG.test(f)).sort() : [];
  const paths = files.map((f) => `/images/yachts/${id}/${f}`);
  if (asCsv) {
    console.log(`${id},"${paths.join("\n")}"`);
  } else {
    console.log(`${id} (${paths.length} photos)`);
    for (const p of paths) console.log(`  ${p}`);
  }
}
