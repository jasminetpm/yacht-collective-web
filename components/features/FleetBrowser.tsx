"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Yacht } from "@/lib/data/yachts";
import YachtCard from "@/components/features/YachtCard";
import { FLEET_URL_KEY } from "@/lib/fleet-url";


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

/** "Catamaran,Motor Yacht" -> Set{"Catamaran", "Motor Yacht"}, keeping only known values. */
function parseMultiValue(param: string, known: string[]): Set<string> {
  const knownSet = new Set(known);
  return new Set(
    param
      .split(",")
      .map((v) => v.trim())
      .filter((v) => knownSet.has(v))
  );
}

/** Plain grid of cards. Also the server-rendered fallback shown before the filters hydrate. */
export function FleetGrid({ yachts }: { yachts: Yacht[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {yachts.map((yacht) => (
        <YachtCard key={yacht.id} yacht={yacht} />
      ))}
    </div>
  );
}

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

const LABEL = "mr-2 text-[0.65rem] font-sans tracking-[0.14em] uppercase text-charcoal-400";

/**
 * Fleet grid with filters (type, marina, guests) and a sort control.
 *
 * Filter state lives in the URL (?type=&marina=&guests=&sort=), so the browser Back button and the
 * "Back to Fleet" link on a yacht page return to the same filtered view. Changes use replaceState,
 * so adjusting a filter does not add a history entry per click.
 *
 * Type and Marina are multi-select: ?type=Catamaran,Motor%20Yacht matches either. "All" clears the
 * selection for that filter (an empty selection also means "no filter", same result either way).
 */
export default function FleetBrowser({ yachts }: { yachts: Yacht[] }) {
  const searchParams = useSearchParams();

  const categories = useMemo(
    () => Array.from(new Set(yachts.map((y) => y.category).filter(Boolean))),
    [yachts]
  );
  const marinas = useMemo(
    () => Array.from(new Set(yachts.map((y) => marinaOf(y.location)).filter(Boolean))),
    [yachts]
  );
  const maxGuests = useMemo(() => Math.max(1, ...yachts.map((y) => y.guests)), [yachts]);

  // Read and validate state from the URL (unknown values are dropped silently).
  const typeParam = searchParams.get("type") ?? "";
  const marinaParam = searchParams.get("marina") ?? "";
  const sortParam = searchParams.get("sort") ?? "";
  const guestsParam = Number(searchParams.get("guests"));
  const selectedCategories = useMemo(() => parseMultiValue(typeParam, categories), [typeParam, categories]);
  const selectedMarinas = useMemo(() => parseMultiValue(marinaParam, marinas), [marinaParam, marinas]);
  const sort: SortValue = SORT_OPTIONS.some((o) => o.value === sortParam)
    ? (sortParam as SortValue)
    : "featured";
  const guests =
    Number.isFinite(guestsParam) && guestsParam >= 1 ? Math.min(Math.round(guestsParam), maxGuests) : 1;

  // Remember the current view so the yacht page can link back to it.
  const query = searchParams.toString();
  useEffect(() => {
    try {
      sessionStorage.setItem(FLEET_URL_KEY, query ? `/fleet?${query}` : "/fleet");
    } catch {
      /* storage unavailable (e.g. private mode): the browser Back button still works */
    }
  }, [query]);

  function update(changes: Record<string, string | null>) {
    const params = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(changes)) {
      if (value === null || value === "") params.delete(key);
      else params.set(key, value);
    }
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `${window.location.pathname}?${qs}` : window.location.pathname);
  }

  /** Toggles one value in a multi-select filter param (?type= / ?marina=). */
  function toggleMulti(key: "type" | "marina", value: string, current: Set<string>) {
    const next = new Set(current);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    update({ [key]: next.size === 0 ? null : Array.from(next).join(",") });
  }

  // The number input keeps its own draft text while focused, so a keystroke never gets fought by a
  // re-render of the clamped/derived `guests` value (that fight was turning e.g. "15" into "55").
  // The clamp + URL update only happens on blur / Enter; the slider still applies immediately.
  const [guestsInput, setGuestsInput] = useState(String(guests));
  const guestsInputFocused = useRef(false);
  useEffect(() => {
    if (!guestsInputFocused.current) setGuestsInput(String(guests));
  }, [guests]);

  function commitGuests(raw: string) {
    if (raw.trim() === "") {
      update({ guests: null });
      setGuestsInput("1");
      return;
    }
    const n = Math.round(Number(raw));
    if (!Number.isFinite(n)) {
      setGuestsInput(String(guests));
      return;
    }
    const clamped = Math.min(Math.max(n, 1), maxGuests);
    update({ guests: clamped <= 1 ? null : String(clamped) });
    setGuestsInput(String(clamped));
  }

  // Search box: same draft-text approach as the guests input, but applied live (replaceState, no history spam).
  const qParam = searchParams.get("q") ?? "";
  const [searchInput, setSearchInput] = useState(qParam);
  const searchFocused = useRef(false);
  useEffect(() => {
    if (!searchFocused.current) setSearchInput(qParam);
  }, [qParam]);
  const terms = qParam.toLowerCase().split(/\s+/).filter(Boolean);

  // "guests" is the size of your group: show yachts whose maximum capacity ("Up to N guests") is at least that.
  const visible = sortYachts(
    yachts.filter(
      (y) =>
        terms.every((t) =>
          [y.name, y.tagline, y.category, y.location].some((f) => f.toLowerCase().includes(t))
        ) &&
        (selectedCategories.size === 0 || selectedCategories.has(y.category)) &&
        (selectedMarinas.size === 0 || selectedMarinas.has(marinaOf(y.location))) &&
        y.guests >= guests
    ),
    sort
  );

  return (
    <div>
      <div className="mb-10 flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className={LABEL}>Type</span>
          <Chip active={selectedCategories.size === 0} onClick={() => update({ type: null })}>
            All
          </Chip>
          {categories.map((c) => (
            <Chip
              key={c}
              active={selectedCategories.has(c)}
              onClick={() => toggleMulti("type", c, selectedCategories)}
            >
              {c}
            </Chip>
          ))}
        </div>

        {marinas.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className={LABEL}>Marina</span>
            <Chip active={selectedMarinas.size === 0} onClick={() => update({ marina: null })}>
              All
            </Chip>
            {marinas.map((m) => (
              <Chip
                key={m}
                active={selectedMarinas.has(m)}
                onClick={() => toggleMulti("marina", m, selectedMarinas)}
              >
                {m}
              </Chip>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <label htmlFor="fleet-guests" className={LABEL}>
            Guests
          </label>
          <input
            id="fleet-guests"
            type="range"
            min={1}
            max={maxGuests}
            step={1}
            value={guests}
            onChange={(e) => update({ guests: Number(e.target.value) <= 1 ? null : e.target.value })}
            className="h-1 w-48 cursor-pointer accent-ocean-700 sm:w-72"
            aria-valuetext={guests <= 1 ? "Any group size" : `${guests} guests`}
          />
          <input
            type="number"
            min={1}
            max={maxGuests}
            value={guestsInput}
            onFocus={() => {
              guestsInputFocused.current = true;
            }}
            onChange={(e) => setGuestsInput(e.target.value)}
            onBlur={(e) => {
              guestsInputFocused.current = false;
              commitGuests(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.currentTarget.blur();
            }}
            aria-label="Number of guests"
            className="w-16 border border-charcoal-200 bg-white px-2 py-1.5 text-center text-xs text-charcoal-600 focus:border-ocean-700 focus:outline-none"
          />
          <span className="text-xs text-charcoal-400">
            {guests <= 1 ? "Any group size" : `Yachts that take ${guests} or more guests`}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-charcoal-400" aria-live="polite">
            Showing {visible.length} of {yachts.length} vessels
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="relative">
              <Search size={12} className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-charcoal-400" />
              <input
                type="search"
                value={searchInput}
                onFocus={() => {
                  searchFocused.current = true;
                }}
                onBlur={() => {
                  searchFocused.current = false;
                }}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  update({ q: e.target.value.trim() === "" ? null : e.target.value });
                }}
                placeholder="Search"
                aria-label="Search yachts"
                className="w-28 border-0 border-b border-charcoal-200 bg-transparent py-1.5 pl-5 pr-1 text-xs text-charcoal-600 placeholder:text-charcoal-400 transition-all duration-300 focus:w-48 focus:border-ocean-700 focus:outline-none"
              />
            </div>
            <label className="flex items-center gap-3 text-[0.65rem] font-sans tracking-[0.14em] uppercase text-charcoal-400">
              Sort by
              <select
                value={sort}
                onChange={(e) => update({ sort: e.target.value === "featured" ? null : e.target.value })}
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
      </div>

      {visible.length > 0 ? (
        <FleetGrid yachts={visible} />
      ) : (
        <p className="py-16 text-center text-sm text-charcoal-500">
          No vessels match your search or filters. Try a smaller group size or a different type, or speak to our concierge.
        </p>
      )}
    </div>
  );
}
