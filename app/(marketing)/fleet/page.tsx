import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getYachts } from "@/lib/data/yachts";
import FleetBrowser, { FleetGrid } from "@/components/features/FleetBrowser";

export const metadata: Metadata = {
  title: "The Fleet",
  description:
    "Explore our curated collection of luxury yachts available for private charter in Singapore.",
};

export default async function FleetPage() {
  const yachts = await getYachts();

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="relative flex min-h-[55vh] items-end bg-ocean-700 overflow-hidden">
        <Image
          src="/images/fleet/hero.webp"
          alt="Private charter yachts moored in Singapore"
          fill
          loading="eager"
          fetchPriority="high"
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/90 via-ocean-900/60 to-ocean-900/30" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 40%, #C9A86C 0%, transparent 55%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-content-xl px-6 pb-20 lg:px-12 lg:pb-24">
          <p className="mb-4 text-xs font-sans tracking-[0.2em] uppercase text-champagne-400">
            Our Fleet
          </p>
          <h1 className="font-serif text-5xl font-normal text-white lg:text-6xl">
            The Collective
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/60">
            Every vessel personally selected for design integrity, crew
            excellence, and the quality of experience it enables.
          </p>
        </div>
      </section>

      {/* ── Vessel count bar ── */}
      <section className="bg-pearl border-b border-alabaster-dark">
        <div className="mx-auto max-w-content-xl px-6 lg:px-12 py-5 flex items-center">
          <p className="text-xs text-charcoal-400 font-sans">
            <span className="text-ocean-700 font-medium">{yachts.length} {yachts.length === 1 ? "vessel" : "vessels"}</span>
            &nbsp;available for charter in Singapore
          </p>
        </div>
      </section>

      {/* ── Fleet Grid ── */}
      <section className="bg-alabaster py-20 lg:py-28">
        <div className="mx-auto max-w-content-xl px-6 lg:px-12">
          <Suspense fallback={<FleetGrid yachts={yachts} />}>
            <FleetBrowser yachts={yachts} />
          </Suspense>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-ocean-700 py-20">
        <div className="mx-auto max-w-content-xl px-6 lg:px-12 flex flex-col items-center text-center gap-6">
          <h2 className="font-serif text-3xl font-normal text-white lg:text-4xl max-w-lg">
            Looking for something specific?
          </h2>
          <p className="text-sm leading-relaxed text-white/60 max-w-md">
            Speak with our concierge — we have access to additional vessels not listed here and can match you with the perfect yacht for your occasion.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-champagne-500 px-8 py-4 text-xs font-sans tracking-[0.12em] uppercase text-ocean-900 transition-all duration-500 hover:bg-champagne-400"
          >
            Speak to a Concierge
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}
