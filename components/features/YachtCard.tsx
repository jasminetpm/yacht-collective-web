"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Ruler, Users, BedDouble, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Yacht } from "@/lib/data/yachts";

export default function YachtCard({ yacht }: { yacht: Yacht }) {
  /* Build the full photo list: hero image first, then gallery extras */
  const allImages = [
    ...(yacht.image ? [yacht.image] : []),
    ...yacht.images.filter((img) => img !== yacht.image),
  ];

  const [active, setActive] = useState(0);

  function prev(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setActive((i) => (i === 0 ? allImages.length - 1 : i - 1));
  }

  function next(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setActive((i) => (i === allImages.length - 1 ? 0 : i + 1));
  }

  function goTo(e: React.MouseEvent, idx: number) {
    e.preventDefault();
    e.stopPropagation();
    setActive(idx);
  }

  const hasMultiple = allImages.length > 1;

  return (
    <Link
      href={`/fleet/${yacht.id}`}
      className="group flex w-full flex-col bg-white shadow-luxury transition-all duration-500 hover:shadow-luxury-lg hover:-translate-y-0.5"
    >
      {/* ── Card image with mini carousel ── */}
      <div className={`relative h-64 overflow-hidden bg-gradient-to-br ${yacht.gradient}`}>

        {/* Images */}
        {allImages.length > 0 ? (
          allImages.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`${yacht.name} — photo ${i + 1}`}
              fill
              className={cn(
                "object-cover transition-all duration-500",
                i === active ? "opacity-100 scale-100" : "opacity-0 scale-105"
              )}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ))
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${yacht.accentGradient}`} />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        {/* Prev / Next arrows — only when multiple images */}
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/65 rounded-full"
              aria-label="Previous photo"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/65 rounded-full"
              aria-label="Next photo"
            >
              <ChevronRight size={16} />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-14 left-0 right-0 flex justify-center gap-1.5">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => goTo(e, i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === active ? "w-4 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                  )}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Category badge */}
        <div className="absolute left-4 top-4">
          <span className="inline-block border border-champagne-500/60 bg-ocean-950/50 px-3 py-1 text-[0.6rem] font-sans tracking-[0.16em] uppercase text-champagne-400 backdrop-blur-sm">
            {yacht.category}
          </span>
        </div>

        {/* Photo count badge — when multiple images */}
        {hasMultiple && (
          <div className="absolute right-4 top-4">
            <span className="inline-block bg-black/40 px-2 py-1 text-[0.6rem] text-white/70 backdrop-blur-sm">
              {active + 1} / {allImages.length}
            </span>
          </div>
        )}

        {/* Name overlay */}
        <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
          <p className="font-serif text-2xl font-normal text-white">{yacht.name}</p>
          <p className="mt-1 text-xs leading-relaxed text-white/60">{yacht.tagline}</p>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-1 flex-col px-5 py-5 gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-alabaster px-3 py-1.5 text-xs text-charcoal-600">
            <Ruler size={11} className="text-champagne-500" />
            {yacht.lengthFt}ft
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-alabaster px-3 py-1.5 text-xs text-charcoal-600">
            <Users size={11} className="text-champagne-500" />
            Up to {yacht.guests} guests
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-alabaster px-3 py-1.5 text-xs text-charcoal-600">
            <BedDouble size={11} className="text-champagne-500" />
            {yacht.cabins} cabins
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-charcoal-400">
          <MapPin size={11} className="text-champagne-500 shrink-0" />
          {yacht.location}
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-alabaster pt-4">
          <div>
            <p className="text-[0.65rem] font-sans tracking-[0.1em] uppercase text-charcoal-400">From</p>
            <p className="mt-0.5 font-serif text-2xl font-normal text-ocean-700">
              S${yacht.rateFrom.toLocaleString()}
            </p>
            <p className="text-[0.65rem] text-charcoal-400">for a 4 hour charter</p>
          </div>
          <span className="inline-flex items-center gap-2 border border-ocean-700 px-5 py-2.5 text-xs font-sans tracking-[0.1em] uppercase text-ocean-700 transition-all duration-500 group-hover:bg-ocean-700 group-hover:text-white">
            View Details
            <ArrowRight size={11} />
          </span>
        </div>
      </div>
    </Link>
  );
}
