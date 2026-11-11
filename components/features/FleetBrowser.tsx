"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { Yacht } from "@/lib/data/yachts";
import YachtCard from "@/components/features/YachtCard";

const GUEST_BANDS = [
  { label: "Any size", min: 0, max: Infinity },
  { label: "Up to 12", min: 0, max: 12 },
  { label: "13–25", min: 13, max: 25 },
  { label: "26–40", min: 26, max: 40 },
  { label: "41+", min: 41, max: Infinity },
] as const;

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "border px-4 py-2 text-xs font-sans tracking-[0.1em] uppercase transition-colors duration-300",
        active
          ? "border-ocean-700 bg-ocean-700 text-white"
          : "border-charcoal-200 text-charcoal-500 hover:border-ocean-700 hover:text-ocean-700"
      )}
    >
      {children}
    </button>
  );
}

const SORT_OPTIONS = [
  { value: "featured", label: "Recommended" },
  { value: "guests-desc", label: "Capacity: most guests" },
  { value: "guests-asc", label: "Capacity: fewest guests" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "length-desc", label: "Size: longest first" },
  { value: "length-asc", label: "Size: shortest first" },
] as const;
type SortValue = (typeof SORT_OPTIONS)[number]["value"];

/** "Recommended" keeps the sheet order; ties in other sorts also fall back to it (stable sort). */
function sortYachts(list: Yacht[], sort: SortValue): Yacht[] {
  const by: Record<Exclude<SortValue, "featured">, (a: Yacht, b: Yacht) => number> = {
    "guests-desc": (a, b) => b.guests - a.guests,
    "guests-asc": (a, b) => a.guests - b.guests,
    "price-asc": (a, b) => a.rateFrom - b.rateFrom,
    "price-desc": (a, b) => b.rateFrom - a.rateFrom,
    "length-desc": (a, b) => b.lengthFt - a.lengthFt,
    "length-asc": (a, b) => a.lengthFt - b.lengthFt,
  };
  return sort === "featured" ? list : [...list].sort(by[sort]);
}

/** "ONE°15 Marina, Sentosa Cove, Singapore" -> "ONE°15 Marina" */
function marinaOf(location: string): string {
  return location.split(",")[0].trim();
}

/** Fleet grid with filters (type, marina, guests) and a sort control. */
export default function FleetBrowser({ yachts }: { yachts: Yacht[] }) {
  const [category, setCategory] = useState("All");
  const [marina, setMarina] = useState("All");
  const [bandIndex, setBandIndex] = useState(0);
  const [sort, setSort] = useState<SortValue>("featured");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(yachts.map((y) => y.category).filter(Boolean)))],
    [yachts]
  );
  const marinas = useMemo(
    () => ["All", ...Array.from(new Set(yachts.map((y) => marinaOf(y.location)).filter(Boolean)))],
    [yachts]
  );

  const band = GUEST_BANDS[bandIndex];
  const visible = sortYachts(
    yachts.filter(
      (y) =>
        (category === "All" || y.category === category) &&
        (marina === "All" || marinaOf(y.location) === marina) &&
        y.guests >= band.min &&
        y.guests <= band.max
    ),
    sort
  );

  return (
    <div>
      <div className="mb-10 flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-[0.65rem] font-sans tracking-[0.14em] uppercase text-charcoal-400">
            Type
          </span>
          {categories.map((c) => (
            <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
              {c}
            </Chip>
          ))}
        </div>
        {marinas.length > 2 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-[0.65rem] font-sans tracking-[0.14em] uppercase text-charcoal-400">
              Marina
            </span>
            {marinas.map((m) => (
              <Chip key={m} active={marina === m} onClick={() => setMarina(m)}>
                {m}
              </Chip>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-[0.65rem] font-sans tracking-[0.14em] uppercase text-charcoal-400">
            Guests
          </span>
          {GUEST_BANDS.map((b, i) => (
            <Chip key={b.label} active={bandIndex === i} onClick={() => setBandIndex(i)}>
              {b.label}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-charcoal-400" aria-live="polite">
            Showing {visible.length} of {yachts.length} vessels
          </p>
          <label className="flex items-center gap-3 text-[0.65rem] font-sans tracking-[0.14em] uppercase text-charcoal-400">
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortValue)}
              className="border border-charcoal-200 bg-white px-3 py-2 text-xs normal-case tracking-normal text-charcoal-600 focus:border-ocean-700 focus:outline-none"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((yacht) => (
            <YachtCard key={yacht.id} yacht={yacht} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-sm text-charcoal-500">
          No vessels match those filters. Try a different size or type, or speak to our concierge.
        </p>
      )}
    </div>
  );
}
