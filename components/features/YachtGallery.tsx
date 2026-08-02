"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X, Expand } from "lucide-react";
import { cn } from "@/lib/utils";

interface YachtGalleryProps {
  images: string[];
  yachtName: string;
  /** Gradient fallback when no images are provided */
  gradient: string;
}

export default function YachtGallery({ images, yachtName, gradient }: YachtGalleryProps) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const hasImages = images.length > 0;

  function prev() {
    setActive((i) => (i === 0 ? images.length - 1 : i - 1));
  }
  function next() {
    setActive((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  /* ── No images yet — show gradient placeholder ── */
  if (!hasImages) {
    return (
      <div className={`relative h-[55vh] min-h-[400px] w-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <p className="text-white/30 text-sm font-sans tracking-widest uppercase">
          Photos coming soon
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ── Main gallery ── */}
      <div className="relative w-full bg-ocean-950">
        {/* Main image — click anywhere to open lightbox */}
        <div
          className="group relative h-[55vh] min-h-[400px] w-full overflow-hidden cursor-zoom-in"
          onClick={() => setLightbox(true)}
        >
          <Image
            src={images[active]}
            alt={`${yachtName} — photo ${active + 1}`}
            fill
            priority
            className="object-cover transition-all duration-500 group-hover:scale-[1.02]"
            sizes="100vw"
          />
          {/* Gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/60 via-transparent to-transparent" />

          {/* Hover hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2 bg-black/50 px-4 py-2 backdrop-blur-sm text-white text-xs font-sans tracking-[0.1em] uppercase">
              <Expand size={13} />
              Click to expand
            </div>
          </div>

          {/* Nav arrows — stop propagation so they don't open lightbox */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center bg-black/40 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/70"
                aria-label="Previous photo"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center bg-black/40 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/70"
                aria-label="Next photo"
              >
                <ArrowRight size={18} />
              </button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 right-4">
            <span className="bg-black/50 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
              {active + 1} / {images.length}
            </span>
          </div>
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto bg-ocean-950 px-4 py-3 scrollbar-hide">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "relative h-16 w-24 shrink-0 overflow-hidden transition-all duration-300",
                  i === active
                    ? "ring-2 ring-champagne-500 opacity-100"
                    : "opacity-50 hover:opacity-80"
                )}
              >
                <Image
                  src={src}
                  alt={`${yachtName} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
          onClick={() => setLightbox(false)}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(false)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center text-white/60 hover:text-white"
            aria-label="Close"
          >
            <X size={22} />
          </button>

          {/* Image */}
          <div
            className="relative h-[85vh] w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active]}
              alt={`${yachtName} — photo ${active + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {/* Lightbox nav */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-all"
                aria-label="Previous"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-all"
                aria-label="Next"
              >
                <ArrowRight size={20} />
              </button>
            </>
          )}

          {/* Counter */}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/40">
            {active + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
