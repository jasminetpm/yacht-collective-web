"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Yacht } from "@/lib/data/yachts";
import YachtCard from "@/components/features/YachtCard";

export default function FeaturedVesselsCarousel({ yachts }: { yachts: Yacht[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  function updateArrows() {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }

  useEffect(() => {
    updateArrows();
  }, []);

  function scroll(dir: "left" | "right") {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("a")?.offsetWidth ?? 360;
    el.scrollBy({ left: dir === "left" ? -(cardWidth + 24) : cardWidth + 24, behavior: "smooth" });
  }

  const isScrollable = canLeft || canRight;

  return (
    <div>
      {/* Header row with arrows */}
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="mb-3 text-xs font-sans tracking-[0.2em] uppercase text-champagne-600">
            Featured Vessels
          </p>
          <h2 className="font-serif text-4xl font-normal text-ocean-700 lg:text-5xl">
            The Collective
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {/* Arrows — only visible when content overflows */}
          {isScrollable && (
            <>
              <button
                onClick={() => scroll("left")}
                disabled={!canLeft}
                className={cn(
                  "flex h-10 w-10 items-center justify-center border transition-all duration-300",
                  canLeft
                    ? "border-ocean-700 text-ocean-700 hover:bg-ocean-700 hover:text-white cursor-pointer"
                    : "border-charcoal-200 text-charcoal-300 cursor-not-allowed opacity-40"
                )}
                aria-label="Scroll left"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canRight}
                className={cn(
                  "flex h-10 w-10 items-center justify-center border transition-all duration-300",
                  canRight
                    ? "border-ocean-700 text-ocean-700 hover:bg-ocean-700 hover:text-white cursor-pointer"
                    : "border-charcoal-200 text-charcoal-300 cursor-not-allowed opacity-40"
                )}
                aria-label="Scroll right"
              >
                <ArrowRight size={16} />
              </button>
            </>
          )}
          <Link
            href="/fleet"
            className="hidden items-center gap-2 text-xs font-sans tracking-[0.12em] uppercase text-ocean-700 transition-all duration-300 hover:gap-4 sm:inline-flex"
          >
            View All Yachts
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Scroll track — cards fill row when few, scroll when many */}
      <div
        ref={trackRef}
        onScroll={updateArrows}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
      >
        {yachts.map((yacht) => (
          <div key={yacht.id} style={{ scrollSnapAlign: "start" }} className="shrink-0 w-[calc(100vw-3rem)] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
            <YachtCard yacht={yacht} />
          </div>
        ))}
      </div>
    </div>
  );
}
