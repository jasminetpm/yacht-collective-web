/**
 * Yacht data — used by homepage cards, the fleet page and detail pages.
 *
 * HOW TO ADD / EDIT A YACHT:
 *   Edit the "Yacht Collective - Fleet" Google Sheet (one row per yacht).
 *   The site reads it via the FLEET_SHEET_CSV_URL env var and refreshes
 *   every 5 minutes. See README.md for the column guide.
 *
 *   If the sheet is not configured or unreachable, the built-in fleet in
 *   lib/data/yachts.fallback.ts is shown instead.
 */

import { FALLBACK_YACHTS } from "@/lib/data/yachts.fallback";
import { parseFleetCsv } from "@/lib/data/sheet";

export interface Yacht {
  id: string;
  name: string;
  tagline: string;
  category: string;
  location: string;
  lengthFt: number;
  guests: number;
  cabins: number;
  crew: number;
  rateFrom: number;
  /** Hero image shown on the card. Use first image in the gallery ideally. */
  image: string | null;
  /** All gallery images — shown on the detail page. */
  images: string[];
  description: string;
  highlights: string[];
  amenities: string[];
  /** Tailwind gradient classes — used as fallback when no image is set. */
  gradient: string;
  accentGradient: string;
}

/** Seconds between automatic refreshes of the sheet data. */
export const FLEET_REVALIDATE_SECONDS = 300;

/** Cache tag used by /api/revalidate for instant refreshes. */
export const FLEET_CACHE_TAG = "fleet";

export async function getYachts(): Promise<Yacht[]> {
  const url = process.env.FLEET_SHEET_CSV_URL;
  if (!url) return FALLBACK_YACHTS;

  try {
    const res = await fetch(url, {
      next: { revalidate: FLEET_REVALIDATE_SECONDS, tags: [FLEET_CACHE_TAG] },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const yachts = parseFleetCsv(await res.text());
    if (yachts.length === 0) throw new Error("sheet contains no valid published yachts");
    return yachts;
  } catch (error) {
    console.error("[fleet sheet] Falling back to built-in fleet:", error);
    return FALLBACK_YACHTS;
  }
}

export async function getYachtBySlug(slug: string): Promise<Yacht | undefined> {
  const yachts = await getYachts();
  return yachts.find((y) => y.id === slug);
}
