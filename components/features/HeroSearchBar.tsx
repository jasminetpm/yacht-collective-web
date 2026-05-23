"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const DURATIONS = [
  { label: "3 nights", value: "3" },
  { label: "5 nights", value: "5" },
  { label: "7 nights", value: "7" },
  { label: "10 nights", value: "10" },
  { label: "14 nights", value: "14" },
  { label: "21 nights", value: "21" },
  { label: "28 nights", value: "28" },
];

export default function HeroSearchBar() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("7");
  const [guests, setGuests] = useState(4);

  function handleSearch() {
    const params = new URLSearchParams({
      ...(date && { from: date }),
      duration,
      guests: String(guests),
    });
    router.push(`/fleet?${params}`);
  }

  return (
    <div className="w-full bg-white shadow-luxury-md">
      {/* Gold top rule */}
      <div className="h-px w-full bg-gradient-champagne" />

      <div className="grid grid-cols-1 divide-y divide-alabaster-dark sm:grid-cols-[1fr_1fr_auto_auto] sm:divide-x sm:divide-y-0">
        {/* Charter Date */}
        <div className="flex items-center gap-3 px-5 py-4 sm:px-6">
          <Calendar size={15} className="shrink-0 text-champagne-500" />
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-[0.6rem] font-sans tracking-[0.16em] uppercase text-charcoal-400">
              Charter Date
            </span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="mt-0.5 w-full bg-transparent text-sm text-charcoal-700 focus:outline-none cursor-pointer"
              aria-label="Charter start date"
            />
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-3 px-5 py-4 sm:px-6">
          <Clock size={15} className="shrink-0 text-champagne-500" />
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-[0.6rem] font-sans tracking-[0.16em] uppercase text-charcoal-400">
              Duration
            </span>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mt-0.5 w-full appearance-none bg-transparent text-sm text-charcoal-700 focus:outline-none cursor-pointer"
              aria-label="Charter duration"
            >
              {DURATIONS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Guests counter */}
        <div className="flex items-center gap-3 px-5 py-4 sm:px-6">
          <Users size={15} className="shrink-0 text-champagne-500" />
          <div className="flex flex-col">
            <span className="text-[0.6rem] font-sans tracking-[0.16em] uppercase text-charcoal-400">
              Guests
            </span>
            <div className="mt-1 flex items-center gap-3">
              <button
                type="button"
                aria-label="Decrease guest count"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className={cn(
                  "flex h-6 w-6 items-center justify-center border text-charcoal-400 transition-colors duration-300",
                  guests > 1
                    ? "border-charcoal-300 hover:border-ocean-700 hover:text-ocean-700"
                    : "border-charcoal-100 text-charcoal-200 cursor-default"
                )}
              >
                <span className="leading-none mb-px">−</span>
              </button>
              <span className="min-w-[1.5ch] text-center text-sm font-medium text-charcoal-700">
                {guests}
              </span>
              <button
                type="button"
                aria-label="Increase guest count"
                onClick={() => setGuests((g) => Math.min(30, g + 1))}
                className={cn(
                  "flex h-6 w-6 items-center justify-center border text-charcoal-400 transition-colors duration-300",
                  guests < 30
                    ? "border-charcoal-300 hover:border-ocean-700 hover:text-ocean-700"
                    : "border-charcoal-100 text-charcoal-200 cursor-default"
                )}
              >
                <span className="leading-none mb-px">+</span>
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2.5 bg-ocean-700 px-8 py-5 text-xs font-sans tracking-[0.12em] uppercase text-white transition-all duration-500 hover:bg-ocean-600 sm:min-w-[160px]"
        >
          Find Your Yacht
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
