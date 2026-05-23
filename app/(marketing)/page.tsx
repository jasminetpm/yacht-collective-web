import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Anchor, Globe, Star, Ruler, Users, BedDouble, MapPin } from "lucide-react";
import HeroSearchBar from "@/components/features/HeroSearchBar";

export const metadata: Metadata = {
  title: "Yacht Collective | Ultra-Luxury Charter Experiences",
  description:
    "Bespoke yacht charter experiences in the world's most exclusive destinations.",
};

/* ─────────────────────────────────────────────────────────── */
/*  Data                                                       */
/* ─────────────────────────────────────────────────────────── */

const FEATURED_YACHTS = [
  {
    id: "seraph",
    name: "Seraph",
    tagline: "Panoramic saloons and sweeping teak decks.",
    lengthM: 45,
    guests: 10,
    cabins: 5,
    location: "Monaco, France",
    rateFrom: 95000,
    category: "Motor Yacht",
    gradient: "from-[#0A1E3F] via-[#0E2B58] to-[#122440]",
    accentGradient: "from-champagne-700/30 to-transparent",
  },
  {
    id: "aurelian",
    name: "Aurelian",
    tagline: "Elegant twin-mast schooner for windward islands.",
    lengthM: 38,
    guests: 8,
    cabins: 4,
    location: "Amalfi Coast, Italy",
    rateFrom: 72000,
    category: "Sailing Yacht",
    gradient: "from-[#1C1C2E] via-[#2C2C40] to-[#1A1A2E]",
    accentGradient: "from-champagne-600/20 to-transparent",
  },
  {
    id: "calypso",
    name: "Calypso",
    tagline: "Full-beam master suite with a private beach club.",
    lengthM: 52,
    guests: 12,
    cabins: 6,
    location: "Santorini, Greece",
    rateFrom: 130000,
    category: "Superyacht",
    gradient: "from-[#050D1F] via-[#091630] to-[#0A1128]",
    accentGradient: "from-champagne-500/25 to-transparent",
  },
] as const;

const TESTIMONIALS = [
  {
    quote:
      "The most extraordinary thing about Yacht Collective is that the yacht is only the beginning. Every detail — from the chef's tasting menus to the hidden anchorages — was beyond anything we could have imagined.",
    author: "Lady Sarah H.",
    detail: "Mediterranean charter, July 2024",
    rating: 5,
  },
  {
    quote:
      "We've chartered with other brokers. None come close. The level of curation, the quality of the crew on Calypso, the way every preference was anticipated — it was, simply, flawless.",
    author: "Alexander & Petra R.",
    detail: "Santorini to Mykonos, June 2024",
    rating: 5,
  },
  {
    quote:
      "I asked for a sailing yacht that could carry eight guests, cook extraordinary food, and feel like a private home. They found us Aurelian. It was everything I asked for, and then some.",
    author: "Dr. James W.",
    detail: "Croatia to Montenegro, August 2024",
    rating: 5,
  },
] as const;

const DESTINATIONS = [
  {
    name: "The Mediterranean",
    description: "Adriatic coves, Amalfi cliffs, and the Côte d'Azur.",
    gradient: "from-ocean-700/70 to-ocean-950/95",
  },
  {
    name: "The Caribbean",
    description: "Crystal waters from St. Barts to the British Virgin Islands.",
    gradient: "from-charcoal-700/70 to-ocean-900/95",
  },
  {
    name: "South East Asia",
    description: "Andaman Sea, Phang Nga Bay, and beyond.",
    gradient: "from-ocean-800/70 to-charcoal-900/95",
  },
] as const;

const VALUES = [
  {
    icon: Anchor,
    title: "Curated Fleet",
    description:
      "Every vessel is personally inspected and certified against our exacting standards before joining the collective.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "From the Mediterranean to South East Asia, we hold exclusive berths in the most coveted waters on earth.",
  },
  {
    icon: Star,
    title: "White-Glove Service",
    description:
      "Your dedicated concierge handles every detail — provisioning, itineraries, crew briefings, and beyond.",
  },
] as const;

/* ─────────────────────────────────────────────────────────── */
/*  Page                                                       */
/* ─────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════ */}
      {/*  HERO                                               */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-ocean-950">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-950 via-ocean-800 to-ocean-900" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 55%, #C9A86C 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, #1A3058 0%, transparent 45%)
            `,
          }}
        />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%), linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-1 items-center">
          <div className="mx-auto w-full max-w-content-xl px-6 pt-32 pb-12 lg:px-12 lg:pt-40">
            <p className="mb-5 text-xs font-sans tracking-[0.22em] uppercase text-champagne-400">
              Since 2009 &nbsp;·&nbsp; Monaco
            </p>
            <h1 className="font-serif text-5xl font-normal leading-[1.05] text-white sm:text-6xl lg:text-[5.25rem]">
              The Sea,{" "}
              <em className="not-italic text-champagne-400">Entirely</em> Yours
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/55">
              Yacht Collective pairs discerning travellers with the world&apos;s
              finest private yachts. Every charter is bespoke — shaped around
              your itinerary, your pace, your vision.
            </p>
          </div>
        </div>

        {/* Search widget — anchored above fold line */}
        <div className="relative z-10 mx-auto w-full max-w-content-xl px-6 pb-0 lg:px-12">
          <HeroSearchBar />
        </div>

        {/* Stats strip */}
        <div className="relative z-10 mx-auto w-full max-w-content-xl px-6 py-8 lg:px-12">
          <div className="flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-8">
            {[
              ["150+", "Curated Vessels"],
              ["40+", "Destinations"],
              ["2,400+", "Charters Completed"],
              ["4.97", "Average Guest Rating"],
            ].map(([stat, label]) => (
              <div key={label} className="min-w-[80px]">
                <p className="font-serif text-2xl text-white">{stat}</p>
                <p className="mt-0.5 text-[0.65rem] font-sans tracking-[0.12em] uppercase text-white/35">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  FEATURED FLEET                                     */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="bg-alabaster py-24 lg:py-32">
        <div className="mx-auto max-w-content-xl px-6 lg:px-12">
          {/* Section header */}
          <div className="mb-14 flex items-end justify-between">
            <div>
              <p className="mb-3 text-xs font-sans tracking-[0.2em] uppercase text-champagne-600">
                Featured Vessels
              </p>
              <h2 className="font-serif text-4xl font-normal text-ocean-700 lg:text-5xl">
                The Collective
              </h2>
            </div>
            <Link
              href="/fleet"
              className="hidden items-center gap-2 text-xs font-sans tracking-[0.12em] uppercase text-ocean-700 transition-all duration-300 hover:gap-4 sm:inline-flex"
            >
              View all {`>`} 150 yachts
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Yacht cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_YACHTS.map((yacht) => (
              <article
                key={yacht.id}
                className="group flex flex-col bg-white shadow-luxury transition-all duration-500 hover:shadow-luxury-lg hover:-translate-y-0.5"
              >
                {/* Image placeholder */}
                <div
                  className={`relative h-64 overflow-hidden bg-gradient-to-br ${yacht.gradient}`}
                >
                  {/* Champagne accent glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${yacht.accentGradient}`}
                  />
                  {/* Category badge */}
                  <div className="absolute left-4 top-4">
                    <span className="inline-block border border-champagne-500/60 bg-ocean-950/50 px-3 py-1 text-[0.6rem] font-sans tracking-[0.16em] uppercase text-champagne-400 backdrop-blur-sm">
                      {yacht.category}
                    </span>
                  </div>
                  {/* Yacht name overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-5 pb-5 pt-12">
                    <p className="font-serif text-2xl font-normal text-white">
                      {yacht.name}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-white/60">
                      {yacht.tagline}
                    </p>
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col px-5 py-5 gap-4">
                  {/* Spec pills */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-sm bg-alabaster px-3 py-1.5 text-xs text-charcoal-600">
                      <Ruler size={11} className="text-champagne-500" />
                      {yacht.lengthM}m
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-sm bg-alabaster px-3 py-1.5 text-xs text-charcoal-600">
                      <Users size={11} className="text-champagne-500" />
                      {yacht.guests} guests
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-sm bg-alabaster px-3 py-1.5 text-xs text-charcoal-600">
                      <BedDouble size={11} className="text-champagne-500" />
                      {yacht.cabins} cabins
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1.5 text-xs text-charcoal-400">
                    <MapPin size={11} className="text-champagne-500 shrink-0" />
                    {yacht.location}
                  </div>

                  {/* Price + CTA */}
                  <div className="mt-auto flex items-end justify-between border-t border-alabaster pt-4">
                    <div>
                      <p className="text-[0.65rem] font-sans tracking-[0.1em] uppercase text-charcoal-400">
                        From
                      </p>
                      <p className="mt-0.5 font-serif text-2xl font-normal text-ocean-700">
                        €{yacht.rateFrom.toLocaleString()}
                      </p>
                      <p className="text-[0.65rem] text-charcoal-400">
                        per week
                      </p>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 border border-ocean-700 px-5 py-2.5 text-xs font-sans tracking-[0.1em] uppercase text-ocean-700 transition-all duration-500 hover:bg-ocean-700 hover:text-white"
                    >
                      Enquire
                      <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 sm:hidden">
            <Link
              href="/fleet"
              className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.12em] uppercase text-ocean-700"
            >
              View all yachts
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  DESTINATIONS                                       */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="bg-ocean-800 py-24 lg:py-32">
        <div className="mx-auto max-w-content-xl px-6 lg:px-12">
          <div className="mb-12">
            <p className="mb-3 text-xs font-sans tracking-[0.2em] uppercase text-champagne-400">
              Where We Sail
            </p>
            <h2 className="font-serif text-4xl font-normal text-white">
              The World&apos;s Finest Waters
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {DESTINATIONS.map((dest) => (
              <div key={dest.name} className="group relative overflow-hidden cursor-default">
                <div
                  className={`h-72 w-full bg-gradient-to-b ${dest.gradient} flex flex-col justify-end p-7`}
                >
                  <div className="mb-3 h-px w-8 bg-champagne-500 transition-all duration-500 group-hover:w-14" />
                  <p className="font-serif text-2xl text-white">{dest.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {dest.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  EDITORIAL INTRO                                    */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="bg-pearl py-24 lg:py-32">
        <div className="mx-auto max-w-content-xl px-6 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="mb-4 text-xs font-sans tracking-[0.2em] uppercase text-champagne-600">
                Our Philosophy
              </p>
              <h2 className="font-serif text-4xl font-normal leading-snug text-ocean-700 lg:text-5xl">
                Extraordinary voyages begin with extraordinary craft
              </h2>
              <div className="mt-8 h-px w-12 bg-champagne-400" />
            </div>
            <div className="space-y-5 text-base leading-relaxed text-charcoal-500">
              <p>
                We believe a yacht is not merely a vessel — it is a lens through
                which the world&apos;s most extraordinary coastlines, islands,
                and seascapes become deeply, intimately personal.
              </p>
              <p>
                Every yacht in our collective has been selected for its design
                integrity, crew excellence, and the particular quality of
                experience it enables. Nothing is catalogued. Everything is
                curated.
              </p>
              <Link
                href="/about"
                className="mt-3 inline-flex items-center gap-2 text-xs font-sans tracking-[0.12em] uppercase text-champagne-600 transition-all duration-300 hover:gap-4"
              >
                Our story
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  TESTIMONIALS                                       */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="bg-ocean-950 py-24 lg:py-32">
        <div className="mx-auto max-w-content-xl px-6 lg:px-12">
          {/* Header */}
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-sans tracking-[0.2em] uppercase text-champagne-400">
              Guest Experiences
            </p>
            <h2 className="font-serif text-4xl font-normal text-white">
              What Our Guests Say
            </h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="flex flex-col gap-6 border border-white/8 bg-white/4 px-7 py-8 backdrop-blur-sm transition-colors duration-500 hover:border-champagne-500/30"
              >
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <svg
                      key={s}
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 0.75L7.545 4.095L11.25 4.605L8.625 7.155L9.29 10.845L6 9.12L2.71 10.845L3.375 7.155L0.75 4.605L4.455 4.095L6 0.75Z"
                        fill="#C9A86C"
                      />
                    </svg>
                  ))}
                </div>

                {/* Quote mark */}
                <p className="font-serif text-4xl leading-none text-champagne-600/40">
                  &ldquo;
                </p>

                {/* Text */}
                <blockquote className="flex-1 font-serif text-[1.05rem] font-normal leading-relaxed text-white/80">
                  {t.quote}
                </blockquote>

                {/* Attribution */}
                <div className="border-t border-white/10 pt-5">
                  <p className="text-sm font-medium text-white">{t.author}</p>
                  <p className="mt-0.5 text-xs text-white/40">{t.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Aggregate rating */}
          <div className="mt-12 flex flex-col items-center gap-2 text-center">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, s) => (
                <svg
                  key={s}
                  width="16"
                  height="16"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 0.75L7.545 4.095L11.25 4.605L8.625 7.155L9.29 10.845L6 9.12L2.71 10.845L3.375 7.155L0.75 4.605L4.455 4.095L6 0.75Z"
                    fill="#C9A86C"
                  />
                </svg>
              ))}
              <span className="ml-2 font-serif text-lg text-white">4.97</span>
            </div>
            <p className="text-xs font-sans tracking-[0.1em] uppercase text-white/35">
              Based on 2,400+ verified charters
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  WHY YACHT COLLECTIVE                               */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="bg-pearl py-24 lg:py-32">
        <div className="mx-auto max-w-content-xl px-6 lg:px-12">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-sans tracking-[0.2em] uppercase text-champagne-600">
              Why Choose Us
            </p>
            <h2 className="font-serif text-4xl font-normal text-ocean-700">
              The Collective Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center border border-champagne-300 bg-champagne-50">
                  <Icon size={18} className="text-champagne-600" />
                </div>
                <h3 className="font-serif text-xl text-ocean-700">{title}</h3>
                <p className="text-sm leading-relaxed text-charcoal-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  CTA BANNER                                         */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="relative bg-ocean-800 py-24 lg:py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 60% 50%, #C9A86C 0%, transparent 55%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-content-xl px-6 lg:px-12 flex flex-col items-center text-center gap-8">
          <p className="text-xs font-sans tracking-[0.2em] uppercase text-champagne-400">
            Begin Your Charter
          </p>
          <h2 className="font-serif text-4xl font-normal text-white lg:text-5xl max-w-xl">
            Your next voyage is waiting
          </h2>
          <p className="max-w-md text-base leading-relaxed text-white/50">
            Speak with a concierge today. No obligation — only an honest
            conversation about the charter of your life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-champagne-500 px-10 py-4 text-xs font-sans tracking-[0.12em] uppercase text-ocean-900 transition-all duration-500 hover:bg-champagne-400"
            >
              Speak to a Concierge
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/fleet"
              className="inline-flex items-center gap-3 border border-white/25 px-10 py-4 text-xs font-sans tracking-[0.12em] uppercase text-white transition-all duration-500 hover:border-white/50 hover:bg-white/5"
            >
              Browse the Fleet
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
