#!/usr/bin/env node
/**
 * Turns content/fleet-order.txt (one yacht id per line, top to bottom) into
 * the `order` numbers for the fleet sheet, so you can reorder "Recommended"
 * on the Fleet page without hand-renumbering every row.
 *
 * Edit content/fleet-order.txt (reorder the lines) to change the ranking,
 * then:
 *   node scripts/fleet-order-column.mjs            # prints id -> order, in the new order
 *   node scripts/fleet-order-column.mjs --csv      # prints "id,order" sorted A-Z by id
 *
 * To apply the --csv output: sort the Google Sheet by the `id` column (A-Z),
 * paste the order numbers into the `order` column in that same order, then
 * re-sort the sheet by `order` (cosmetic, but keeps the sheet readable).
 *
 * Yacht ids that exist in content/fleet-starter.csv but aren't listed in
 * fleet-order.txt keep their current relative order and are appended after
 * the ones listed, so adding a new row doesn't require editing this file.
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const asCsv = process.argv.includes("--csv");

function parseCsv(text) {
  // Mirrors lib/data/sheet.ts parseCsv: handles quoted cells, "" escapes, embedded newlines.
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;
  const input = text.replace(/^\uFEFF/, "");
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (inQuotes) {
      if (ch === '"') {
        if (input[i + 1] === '"') { cell += '"'; i++; } else { inQuotes = false; }
      } else cell += ch;
      continue;
    }
    if (ch === '"') inQuotes = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && input[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += ch;
  }
  if (cell !== "" || row.length > 0) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

const csvRows = parseCsv(readFileSync(join(root, "content", "fleet-starter.csv"), "utf-8"));
const [header, ...body] = csvRows;
const idIdx = header.indexOf("id");
const orderIdx = header.indexOf("order");
const known = body
  .map((r) => ({ id: r[idIdx], order: Number(r[orderIdx]) || Number.MAX_SAFE_INTEGER }))
  .sort((a, b) => a.order - b.order);

const orderFileLines = readFileSync(join(root, "content", "fleet-order.txt"), "utf-8")
  .split(/\r?\n/)
  .map((line) => line.split("#")[0].trim())
  .filter(Boolean);

const knownIds = new Set(known.map((k) => k.id));
const listed = orderFileLines.filter((id) => {
  if (!knownIds.has(id)) {
    console.error(`[fleet-order] "${id}" in fleet-order.txt is not a known yacht id — skipped.`);
    return false;
  }
  return true;
});
const listedSet = new Set(listed);
const leftovers = known.map((k) => k.id).filter((id) => !listedSet.has(id));
const finalOrder = [...listed, ...leftovers];

if (asCsv) {
  console.log("id,order");
  const byId = [...finalOrder.map((id, i) => [id, i + 1])].sort((a, b) => a[0].localeCompare(b[0]));
  for (const [id, order] of byId) console.log(`${id},${order}`);
} else {
  finalOrder.forEach((id, i) => console.log(`${i + 1}\t${id}`));
}
