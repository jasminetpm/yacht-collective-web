import type { Yacht } from "@/lib/data/yachts";

/**
 * Parses CSV text (as exported by Google Sheets "Publish to web") into rows.
 * Handles quoted cells, escaped quotes (""), commas and line breaks inside cells.
 */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;
  const input = text.replace(/^\uFEFF/, "");

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];

    if (inQuotes) {
      if (ch === '"') {
        if (input[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && input[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += ch;
    }
  }

  if (cell !== "" || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

/** Turns CSV rows into objects keyed by the (lower-cased) header row. */
export function rowsToRecords(rows: string[][]): Record<string, string>[] {
  const [header, ...body] = rows;
  if (!header) return [];
  const keys = header.map((h) => h.trim().toLowerCase());
  return body.map((r) =>
    Object.fromEntries(keys.map((key, i) => [key, (r[i] ?? "").trim()]))
  );
}

/**
 * Converts Google Drive share links into a URL that can be loaded as an image.
 * Supports /file/d/<id>/..., open?id=<id> and uc?id=<id> formats.
 * Other URLs and local paths are returned unchanged.
 */
export function toImageUrl(raw: string): string {
  const value = raw.trim();
  if (!/drive\.google\.com|docs\.google\.com/.test(value)) return value;

  const match =
    value.match(/\/d\/([a-zA-Z0-9_-]+)/) ??
    value.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return match ? `https://lh3.googleusercontent.com/d/${match[1]}` : value;
}

/** Splits a multi-line cell (Alt+Enter in Sheets) into a clean list. */
function toList(value: string | undefined): string[] {
  return (value ?? "")
    .split(/\r?\n/)
    .map((v) => v.trim())
    .filter(Boolean);
}

function toNumber(value: string | undefined): number {
  const cleaned = (value ?? "").replace(/[^0-9.]/g, "");
  return cleaned === "" ? NaN : Number(cleaned);
}

function isPublished(value: string | undefined): boolean {
  const v = (value ?? "").trim().toLowerCase();
  return v === "" || ["true", "yes", "y", "1"].includes(v);
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Gradient presets — Tailwind needs class names to exist in source, so the sheet picks a preset by name. */
const GRADIENT_PRESETS: Record<string, { gradient: string; accentGradient: string }> = {
  navy: {
    gradient: "from-[#0A1E3F] via-[#0E2B58] to-[#122440]",
    accentGradient: "from-champagne-700/30 to-transparent",
  },
  charcoal: {
    gradient: "from-[#1C1C2E] via-[#2C2C40] to-[#1A1A2E]",
    accentGradient: "from-champagne-600/20 to-transparent",
  },
  midnight: {
    gradient: "from-[#050D1F] via-[#091630] to-[#0A1128]",
    accentGradient: "from-champagne-500/25 to-transparent",
  },
};

export interface SheetYacht {
  yacht: Yacht;
  order: number;
}

/**
 * PRIVACY: the sheet also holds private back-office columns (originalName,
 * owner*, cost, costNotes, listedOn, sourceUrls, reviewNotes). recordToYacht
 * below builds the Yacht object from an explicit whitelist of PUBLIC columns
 * only, so those columns can never reach a page, even though they are in the
 * CSV. Never spread `record` into the Yacht object. See docs/fleet-sheet.md.
 */
export const PUBLIC_COLUMNS = [
  "id",
  "name",
  "tagline",
  "category",
  "location",
  "lengthft",
  "guests",
  "cabins",
  "crew",
  "ratefrom",
  "description",
  "highlights",
  "amenities",
  "images",
  "published",
  "order",
  "gradient",
] as const;

/**
 * Maps one sheet row to a Yacht. Returns null (and logs why) for rows that
 * are unpublished or missing required data, so a bad row never breaks a page.
 */
export function recordToYacht(record: Record<string, string>, index: number): SheetYacht | null {
  if (!isPublished(record.published)) return null;

  const name = record.name;
  const id = toSlug(record.id || name || "");
  if (!id || !name) {
    console.warn(`[fleet sheet] Row ${index + 2} skipped: missing id or name.`);
    return null;
  }

  const required = {
    lengthFt: toNumber(record.lengthft),
    guests: toNumber(record.guests),
    rateFrom: toNumber(record.ratefrom),
  };
  const invalid = Object.entries(required)
    .filter(([, n]) => Number.isNaN(n))
    .map(([key]) => key);
  if (invalid.length > 0) {
    console.warn(`[fleet sheet] Row ${index + 2} (${name}) skipped: invalid ${invalid.join(", ")}.`);
    return null;
  }

  // Cabins and crew are optional: blank means "unknown" (0) and the UI hides them.
  const optionalCount = (value: string | undefined) => {
    const n = toNumber(value);
    return Number.isNaN(n) ? 0 : n;
  };
  const numbers = {
    ...required,
    cabins: optionalCount(record.cabins),
    crew: optionalCount(record.crew),
  };

  const images = toList(record.images).map(toImageUrl);
  const preset = GRADIENT_PRESETS[(record.gradient ?? "").toLowerCase()] ?? GRADIENT_PRESETS.navy;
  const order = toNumber(record.order);

  return {
    yacht: {
      id,
      name,
      tagline: record.tagline ?? "",
      category: record.category ?? "",
      location: record.location ?? "",
      ...numbers,
      image: images[0] ?? null,
      images,
      description: record.description ?? "",
      highlights: toList(record.highlights),
      amenities: toList(record.amenities),
      gradient: preset.gradient,
      accentGradient: preset.accentGradient,
    },
    order: Number.isNaN(order) ? Number.MAX_SAFE_INTEGER : order,
  };
}

/** Parses the published CSV into published, valid, ordered yachts. */
export function parseFleetCsv(text: string): Yacht[] {
  const records = rowsToRecords(parseCsv(text));
  const seen = new Set<string>();

  return records
    .map(recordToYacht)
    .filter((entry): entry is SheetYacht => {
      if (!entry) return false;
      if (seen.has(entry.yacht.id)) {
        console.warn(`[fleet sheet] Duplicate id "${entry.yacht.id}" skipped.`);
        return false;
      }
      seen.add(entry.yacht.id);
      return true;
    })
    .sort((a, b) => a.order - b.order)
    .map((entry) => entry.yacht);
}
