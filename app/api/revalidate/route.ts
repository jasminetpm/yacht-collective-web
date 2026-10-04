import { revalidatePath, revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { FLEET_CACHE_TAG } from "@/lib/data/yachts";

/**
 * Instantly refreshes fleet data from the Google Sheet.
 * Usage: GET /api/revalidate?secret=<REVALIDATE_SECRET>
 */
export async function GET(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const provided = request.nextUrl.searchParams.get("secret");

  if (!secret || provided !== secret) {
    return Response.json({ revalidated: false, message: "Invalid secret" }, { status: 401 });
  }

  revalidateTag(FLEET_CACHE_TAG, { expire: 0 });
  revalidatePath("/");
  revalidatePath("/fleet");
  revalidatePath("/fleet/[slug]", "page");

  return Response.json({
    revalidated: true,
    message: "Fleet refreshed — reload the site to see your changes.",
    now: Date.now(),
  });
}
