import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users, Ruler, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "The Fleet",
  description:
    "Explore our curated collection of ultra-luxury motor yachts, sailing yachts, and superyachts available for private charter.",
};

interface Yacht {
  id: string;
  name: string;
  lengthM: number;
  guests: number;
  cabins: number;
  location: string;
  category: string;
  rateFrom: number;
  description: string;
  gradient: string;
}

const YACHTS: Yacht[] = [
  {
    id: "seraph",
    name: "Seraph",
    lengthM: 45,
    guests: 10,
    cabins: 5,
    location: "Monaco, France",
    category: "Motor Yacht",
    rateFrom: 95000,
    description:
      "A masterpiece of naval engineering with sweeping teak decks and panoramic glass saloons.",
    gradient: "from-ocean-800 to-ocean-600",
  },
  {
    id: "aurelian",
    name: "Aurelian",
    lengthM: 38,
    guests: 8,
    cabins: 4,
    location: "Amalfi Coast, Italy",
    category: "Sailing Yacht",
    rateFrom: 72000,
    description:
      "Elegant twin-mast schooner with a deep keel, perfect for exploring windward islands.",
    gradient: "from-charcoal-800 to-charcoal-600",
  },
  {
    id: "calypso",
    name: "Calypso",
    lengthM: 52,
    guests: 12,
    cabins: 6,
    location: "Santorini, Greece",
    category: "Superyacht",
    rateFrom: 130000,
    description:
      "A full-beam master stateroom and a beach club that transforms into an al-fresco dining deck.",
    gradient: "from-ocean-900 to-ocean-700",
  },
  {
    id: "delos",
    name: "Delos",
    lengthM: 41,
    guests: 10,
    cabins: 5,
    location: "Mykonos, Greece",
    category: "Motor Yacht",
    rateFrom: 88000,
    description:
      "Sleek Ferretti design with a flybridge hot tub and submersible water scooters on board.",
    gradient: "from-ocean-700 to-charcoal-700",
  },
  {
    id: "nordic-pearl",
    name: "Nordic Pearl",
    lengthM: 34,
    guests: 6,
    cabins: 3,
    location: "Dubrovnik, Croatia",
    category: "Sailing Yacht",
    rateFrom: 48000,
    description:
      "A fast, bluewater sloop offering pure sailing with immaculate Scandinavian interior design.",
    gradient: "from-charcoal-700 to-ocean-800",
  },
  {
    id: "levante",
    name: "Levante",
    lengthM: 60,
    guests: 14,
    cabins: 7,
    location: "Ibiza, Spain",
    category: "Superyacht",
    rateFrom: 175000,
    description:
      "Helipad, infinity pool, and a dedicated spa suite — the pinnacle of charter opulence.",
    gradient: "from-ocean-900 to-ocean-800",
  },
];

const CATEGORIES = ["All", "Motor Yacht", "Sailing Yacht", "Superyacht"];

export default function FleetPage() {
  return (
    <>
      {/* ── Page Hero ── */}
      <section className="relative flex min-h-[55vh] items-end bg-ocean-700 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-900 via-ocean-700 to-ocean-800" />
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

      {/* ── Filter Hint ── */}
      <section className="bg-pearl border-b border-alabaster-dark">
        <div className="mx-auto max-w-content-xl px-6 lg:px-12 py-5 flex items-center gap-6 overflow-x-auto">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              className={
                i === 0
                  ? "shrink-0 text-xs font-sans tracking-[0.12em] uppercase text-ocean-700 border-b border-ocean-700 pb-0.5"
                  : "shrink-0 text-xs font-sans tracking-[0.12em] uppercase text-charcoal-400 hover:text-ocean-700 transition-colors duration-300"
              }
            >
              {cat}
            </button>
          ))}
          <p className="ml-auto shrink-0 text-xs text-charcoal-400">
            {YACHTS.length} vessels
          </p>
        </div>
      </section>

      {/* ── Fleet Grid ── */}
      <section className="bg-alabaster py-20 lg:py-28">
        <div className="mx-auto max-w-content-xl px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {YACHTS.map((yacht) => (
              <article
                id={yacht.id}
                key={yacht.id}
                className="group flex flex-col bg-white shadow-luxury hover:shadow-luxury-md transition-shadow duration-500"
              >
                <div
                  className={`relative h-60 w-full bg-gradient-to-br ${yacht.gradient} overflow-hidden`}
                >
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="inline-block text-xs font-sans tracking-[0.14em] uppercase text-champagne-400">
                      {yacht.category}
                    </span>
                    <p className="mt-1 font-serif text-2xl text-white">
                      {yacht.name}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-6 gap-4">
                  <p className="text-sm leading-relaxed text-charcoal-500">
                    {yacht.description}
                  </p>

                  <div className="mt-auto space-y-3 border-t border-alabaster pt-4">
                    <div className="flex items-center gap-5 text-xs text-charcoal-400">
                      <span className="flex items-center gap-1.5">
                        <Ruler size={12} className="text-champagne-500" />
                        {yacht.lengthM}m
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users size={12} className="text-champagne-500" />
                        {yacht.guests} guests · {yacht.cabins} cabins
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-charcoal-400">
                      <MapPin size={12} className="text-champagne-500" />
                      {yacht.location}
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <p className="text-xs text-charcoal-400">
                        From{" "}
                        <span className="text-sm font-medium text-ocean-700">
                          €{yacht.rateFrom.toLocaleString()}
                        </span>
                        <span className="text-charcoal-400"> /week</span>
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-sans tracking-[0.1em] uppercase text-champagne-600 hover:gap-3 transition-all duration-300"
                      >
                        Enquire
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-ocean-700 py-20">
        <div className="mx-auto max-w-content-xl px-6 lg:px-12 flex flex-col items-center text-center gap-6">
          <h2 className="font-serif text-3xl font-normal text-white lg:text-4xl max-w-lg">
            Can&apos;t find exactly what you need?
          </h2>
          <p className="text-sm leading-relaxed text-white/60 max-w-md">
            Our concierge team has access to over 150 additional vessels not
            listed publicly. Tell us what you have in mind.
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
