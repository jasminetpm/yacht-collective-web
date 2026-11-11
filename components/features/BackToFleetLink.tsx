"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FLEET_URL_KEY } from "@/lib/fleet-url";

/** Reads the last Fleet URL (with its filters) saved by FleetBrowser; "/fleet" on the server and first paint. */
function readLastFleetUrl(): string {
  try {
    const url = sessionStorage.getItem(FLEET_URL_KEY);
    return url && url.startsWith("/fleet") ? url : "/fleet";
  } catch {
    return "/fleet";
  }
}

const subscribe = () => () => {};

/** "Back to Fleet" that returns to the filtered/sorted view the visitor came from. */
export default function BackToFleetLink({ className }: { className?: string }) {
  const href = useSyncExternalStore(subscribe, readLastFleetUrl, () => "/fleet");
  return (
    <Link href={href} className={className}>
      <ArrowLeft size={12} />
      Back to Fleet
    </Link>
  );
}
