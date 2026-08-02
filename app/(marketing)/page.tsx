import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Anchor, Globe, Star } from "lucide-react";
import HeroSearchBar from "@/components/features/HeroSearchBar";
import CorporateClients from "@/components/features/CorporateClients";
import InstagramCarousel from "@/components/features/InstagramCarousel";
import FeaturedVesselsCarousel from "@/components/features/FeaturedVesselsCarousel";
import { YACHTS } from "@/lib/data/yachts";

export const metadata: Metadata = {
  title: "Yacht Collective | Ultra-Luxury Charter Experiences",
  description:
    "Bespoke yacht charter experiences in the world's most exclusive destinations.",
};

/* ─────────────────────────────────────────────────────────── */
/*  Data                                                       */
/* ─────────────────────────────────────────────────────────── */

/* Featured yachts pulled from shared data file — edit lib/data/yachts.ts */
const FEATURED_YACHTS = YACHTS;

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=yacht+collective+singapore&rlz=1C1MIZP_enSG1165SG1165&oq=yacht+collective+singapore&gs_lcrp=EgZjaHJvbWUyCAgAEEUYJxg5MgcIARAAGO8FMgcIAhAAGO8FMgoIAxAAGKIEGIkF0gEIMjc0M2owajeoAgCwAgA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x31da1f03c3fa1dc7:0x3a0f6ea1ae9ca73d,1,,,,";

const TESTIMONIALS = [
  {
    quote:
      "Absolutely world-class experience from start to finish. The team at Yacht Collective went above and beyond — from the bespoke itinerary around the Southern Islands to the incredible spread of food on board. Already planning our next trip.",
    author: "Marcus T.",
    detail: "Sunset Charter, Singapore, May 2025",
    rating: 5,
  },
  {
    quote:
      "We booked for a corporate event and it exceeded every expectation. The yacht was stunning, the crew were professional and warm, and the whole experience felt genuinely exclusive. Our clients were blown away.",
    author: "Priscilla L.",
    detail: "Corporate Charter, Marina Bay, April 2025",
    rating: 5,
  },
  {
    quote:
      "Celebrated my husband's birthday on a private evening charter and it was magical. The attention to detail — the decorations, the menu, the timing of the sunset — everything was perfect. Highly, highly recommend.",
    author: "Rachel K.",
    detail: "Private Birthday Charter, June 2025",
    rating: 5,
  },
] as const;

const EXPERIENCES = [
  {
    name: "Sunset Cruises",
    description:
      "Watch the Singapore skyline turn gold from the water. The perfect private evening for two or twenty.",
    image: "/images/occasions/sunset-cruise.jpg",
  },
  {
    name: "Corporate & Events",
    description:
      "Impress clients and reward teams with an exclusive charter that no boardroom can replicate.",
    image: "/images/occasions/corporate.jpg",
  },
  {
    name: "Birthdays & Celebrations",
    description:
      "Milestone moments deserve extraordinary settings. We handle every detail so you simply enjoy.",
    image: "/images/occasions/birthdays.jpg",
  },
  {
    name: "Fishing Trips",
    description:
      "Cast off into Singapore's rich waters. A relaxed, rewarding day out for anglers of all levels.",
    image: "/images/occasions/fishing.jpg",
  },
  {
    name: "Weddings & Proposals",
    description:
      "Say your vows or pop the question on the open water — with the Singapore skyline as your backdrop.",
    image: "/images/occasions/proposal.jpg",
  },
  {
    name: "Photography & Film",
    description:
      "A stunning floating stage for content shoots, brand campaigns, and film productions.",
    image: "/images/occasions/photography.jpg",
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
    title: "Singapore Specialists",
    description:
      "We know Singapore waters intimately — from Marina Bay to the Southern Islands — and bring that local expertise to every charter.",
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
        {/* Hero video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay so text stays legible over the video */}
        <div className="absolute inset-0 bg-ocean-950/60" />

        {/* Content */}
        <div className="relative z-10 flex flex-1 items-center">
          <div className="mx-auto w-full max-w-content-xl px-6 pt-32 pb-12 lg:px-12 lg:pt-40">
            <p className="mb-5 text-xs font-sans tracking-[0.22em] uppercase text-champagne-400">
              Since 2022 &nbsp;·&nbsp; Singapore
            </p>
            <h1 className="font-serif text-5xl font-normal leading-[1.05] text-white sm:text-6xl lg:text-[5.25rem]">
              The Sea,{" "}
              <em className="not-italic text-champagne-400">Entirely</em> Yours
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/55">
              Exceptional yacht charter experiences aboard Singapore&apos;s
              finest private yachts.
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
              ["150+", "Curated Vessels", null],
              ["2,400+", "Charters Completed", null],
              ["5.0", "Average Guest Rating", GOOGLE_REVIEWS_URL],
            ].map(([stat, label, href]) => (
              <div key={label} className="min-w-[80px]">
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <p className="font-serif text-2xl text-white group-hover:text-champagne-400 transition-colors duration-300">{stat}</p>
                    <p className="mt-0.5 text-[0.65rem] font-sans tracking-[0.12em] uppercase text-white/35 group-hover:text-white/55 transition-colors duration-300 underline underline-offset-2 decoration-white/20">
                      {label}
                    </p>
                  </a>
                ) : (
                  <>
                    <p className="font-serif text-2xl text-white">{stat}</p>
                    <p className="mt-0.5 text-[0.65rem] font-sans tracking-[0.12em] uppercase text-white/35">
                      {label}
                    </p>
                  </>
                )}
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
          <FeaturedVesselsCarousel yachts={FEATURED_YACHTS} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  CORPORATE CLIENTS                                  */}
      {/* ════════════════════════════════════════════════════ */}
      <CorporateClients />

      {/* ════════════════════════════════════════════════════ */}
      {/*  INSTAGRAM FEED                                     */}
      {/* ════════════════════════════════════════════════════ */}
      <InstagramCarousel />

      {/* ════════════════════════════════════════════════════ */}
      {/*  TESTIMONIALS                                       */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="bg-ocean-950 pt-12 pb-24 lg:pt-16 lg:pb-32">
        <div className="mx-auto max-w-content-xl px-6 lg:px-12">
          {/* Header */}
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-sans tracking-[0.2em] uppercase text-champagne-400">
              Guest Experiences
            </p>
            <h2 className="font-serif text-4xl font-normal text-white">
              What Our Guests Say
            </h2>
            <div className="mt-5 flex justify-center">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/8 px-5 py-2.5 text-sm text-white/70 transition-all duration-300 hover:border-champagne-500/60 hover:bg-champagne-500/10 hover:text-white"
              >
                {/* Google G icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-champagne-400">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Read our Google Reviews
                <span className="text-white/30 transition-colors duration-300 group-hover:text-champagne-400">↗</span>
              </a>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <a
                key={i}
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-6 border border-white/8 bg-white/4 px-7 py-8 backdrop-blur-sm transition-all duration-500 hover:border-champagne-500/30 hover:bg-white/8 cursor-pointer"
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
                <div className="border-t border-white/10 pt-5 flex items-end justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{t.author}</p>
                    <p className="mt-0.5 text-xs text-white/40">{t.detail}</p>
                  </div>
                  <span className="text-[0.6rem] font-sans tracking-[0.1em] uppercase text-white/20 group-hover:text-champagne-500/60 transition-colors duration-300">
                    View on Google ↗
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Aggregate rating */}
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-12 flex flex-col items-center gap-2 text-center"
          >
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
              <span className="ml-2 font-serif text-lg text-white group-hover:text-champagne-400 transition-colors duration-300">5.0</span>
            </div>
            <p className="text-xs font-sans tracking-[0.1em] uppercase text-white/35 group-hover:text-white/55 transition-colors duration-300 underline underline-offset-2 decoration-white/20">
              Based on verified charters · View on Google
            </p>
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  EXPERIENCES                                        */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="bg-ocean-800 py-24 lg:py-32">
        <div className="mx-auto max-w-content-xl px-6 lg:px-12">
          <div className="mb-12">
            <p className="mb-3 text-xs font-sans tracking-[0.2em] uppercase text-champagne-400">
              Every Occasion
            </p>
            <h2 className="font-serif text-4xl font-normal text-white">
              What Will You Celebrate?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EXPERIENCES.map((exp) => (
              <div key={exp.name} className="group relative h-64 overflow-hidden cursor-default">
                {/* Photo */}
                <Image
                  src={exp.image}
                  alt={exp.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Gradient overlay — heavier at bottom for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
                {/* Content pinned to bottom */}
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <div className="mb-3 h-px w-8 bg-champagne-500 transition-all duration-500 group-hover:w-14" />
                  <p className="font-serif text-xl text-white">{exp.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
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
      {/*  EDITORIAL INTRO                                    */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="bg-alabaster py-24 lg:py-32">
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
