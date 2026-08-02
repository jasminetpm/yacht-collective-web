import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Anchor, Users, BedDouble, Ruler, MapPin, Star } from "lucide-react";
import { YACHTS, getYachtBySlug } from "@/lib/data/yachts";
import YachtGallery from "@/components/features/YachtGallery";

/* ── Static params for build-time generation ── */
export function generateStaticParams() {
  return YACHTS.map((y) => ({ slug: y.id }));
}

/* ── Dynamic metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const yacht = getYachtBySlug(slug);
  if (!yacht) return {};
  return {
    title: yacht.name,
    description: yacht.tagline,
  };
}

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=yacht+collective+singapore&rlz=1C1MIZP_enSG1165SG1165&oq=yacht+collective+singapore&gs_lcrp=EgZjaHJvbWUyCAgAEEUYJxg5MgcIARAAGO8FMgcIAhAAGO8FMgoIAxAAGKIEGIkF0gEIMjc0M2owajeoAgCwAgA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x31da1f03c3fa1dc7:0x3a0f6ea1ae9ca73d,1,,,,";

export default async function YachtDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const yacht = getYachtBySlug(slug);
  if (!yacht) notFound();

  const specs = [
    { icon: Ruler, label: "Length", value: `${yacht.lengthFt} ft` },
    { icon: Users, label: "Up to", value: `${yacht.guests} guests` },
    { icon: BedDouble, label: "Cabins", value: `${yacht.cabins} cabins` },
    { icon: Anchor, label: "Crew", value: `${yacht.crew} crew` },
  ];

  return (
    <>
      {/* ── Gallery ── */}
      <div className="pt-16 lg:pt-20">
        <YachtGallery
          images={yacht.images}
          yachtName={yacht.name}
          gradient={yacht.gradient}
        />
      </div>

      {/* ── Body ── */}
      <div className="bg-alabaster">
        {/* Breadcrumb + back */}
        <div className="mx-auto max-w-content-xl px-6 lg:px-12 pt-8">
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.1em] uppercase text-charcoal-400 hover:text-ocean-700 transition-colors duration-300"
          >
            <ArrowLeft size={12} />
            Back to Fleet
          </Link>
        </div>

        <div className="mx-auto max-w-content-xl px-6 lg:px-12 py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px] lg:gap-20">

            {/* ── Left: details ── */}
            <div>
              {/* Category + name */}
              <p className="mb-2 text-xs font-sans tracking-[0.2em] uppercase text-champagne-600">
                {yacht.category}
              </p>
              <h1 className="font-serif text-4xl font-normal text-ocean-700 lg:text-5xl">
                {yacht.name}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-charcoal-500">
                {yacht.tagline}
              </p>

              {/* Location */}
              <div className="mt-4 flex items-center gap-2 text-sm text-charcoal-400">
                <MapPin size={13} className="text-champagne-500 shrink-0" />
                {yacht.location}
              </div>

              {/* Spec pills */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 border border-alabaster-dark bg-white py-5 px-3 text-center"
                  >
                    <Icon size={16} className="text-champagne-500" />
                    <div>
                      <p className="text-[0.6rem] font-sans tracking-[0.14em] uppercase text-charcoal-400">
                        {label}
                      </p>
                      <p className="mt-0.5 font-serif text-lg text-ocean-700">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="mt-10 h-px w-full bg-alabaster-dark" />

              {/* Description */}
              <div className="mt-8">
                <h2 className="font-serif text-2xl font-normal text-ocean-700 mb-4">
                  About this vessel
                </h2>
                <p className="text-base leading-relaxed text-charcoal-500">
                  {yacht.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="mt-8">
                <h2 className="font-serif text-2xl font-normal text-ocean-700 mb-4">
                  Highlights
                </h2>
                <ul className="space-y-3">
                  {yacht.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-charcoal-500">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-champagne-500" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Amenities */}
              <div className="mt-8">
                <h2 className="font-serif text-2xl font-normal text-ocean-700 mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {yacht.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-3 text-sm text-charcoal-500">
                      <span className="text-champagne-500">✓</span>
                      {a}
                    </div>
                  ))}
                </div>
              </div>

              {/* Google reviews note */}
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-10 inline-flex items-center gap-2 text-sm text-charcoal-400 hover:text-ocean-700 transition-colors duration-300"
              >
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className="fill-champagne-500 text-champagne-500" />
                  ))}
                </div>
                <span className="underline underline-offset-2 decoration-charcoal-300 group-hover:decoration-ocean-700">
                  5.0 · See our Google Reviews
                </span>
              </a>
            </div>

            {/* ── Right: booking sidebar ── */}
            <aside className="lg:sticky lg:top-28 self-start">
              <div className="border border-alabaster-dark bg-white p-8 shadow-luxury">
                {/* Price */}
                <p className="text-[0.65rem] font-sans tracking-[0.14em] uppercase text-charcoal-400">
                  Starting from
                </p>
                <p className="mt-1 font-serif text-4xl font-normal text-ocean-700">
                  S${yacht.rateFrom.toLocaleString()}
                </p>
                <p className="text-xs text-charcoal-400">for a 4-hour charter</p>

                <div className="my-6 h-px bg-alabaster-dark" />

                {/* Quick specs */}
                <div className="space-y-2.5 text-sm text-charcoal-500">
                  <div className="flex justify-between">
                    <span className="text-charcoal-400">Category</span>
                    <span className="font-medium text-charcoal-700">{yacht.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-400">Length</span>
                    <span className="font-medium text-charcoal-700">{yacht.lengthFt} ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-400">Max guests</span>
                    <span className="font-medium text-charcoal-700">{yacht.guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-400">Cabins</span>
                    <span className="font-medium text-charcoal-700">{yacht.cabins}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-400">Crew</span>
                    <span className="font-medium text-charcoal-700">{yacht.crew} included</span>
                  </div>
                </div>

                <div className="my-6 h-px bg-alabaster-dark" />

                {/* CTA */}
                <Link
                  href={`/contact?yacht=${encodeURIComponent(yacht.name)}`}
                  className="flex items-center justify-center gap-3 w-full bg-ocean-700 py-4 text-xs font-sans tracking-[0.12em] uppercase text-white transition-all duration-500 hover:bg-ocean-600"
                >
                  Enquire Now
                  <ArrowRight size={13} />
                </Link>
                <a
                  href="https://wa.me/6590509001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 w-full border border-charcoal-200 py-3.5 text-xs font-sans tracking-[0.12em] uppercase text-charcoal-600 transition-all duration-300 hover:border-ocean-700 hover:text-ocean-700"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp us
                </a>

                <p className="mt-5 text-center text-xs text-charcoal-400 leading-relaxed">
                  No commitment — our team will get back to you within a few hours.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* ── Similar vessels ── */}
      <section className="bg-pearl py-16 lg:py-20">
        <div className="mx-auto max-w-content-xl px-6 lg:px-12">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-serif text-2xl font-normal text-ocean-700">
              Other Vessels
            </h2>
            <Link
              href="/fleet"
              className="text-xs font-sans tracking-[0.1em] uppercase text-charcoal-400 hover:text-ocean-700 transition-colors duration-300"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {YACHTS.filter((y) => y.id !== yacht.id).map((y) => (
              <Link
                key={y.id}
                href={`/fleet/${y.id}`}
                className="group flex flex-col bg-white shadow-luxury transition-all duration-500 hover:shadow-luxury-lg hover:-translate-y-0.5"
              >
                <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${y.gradient}`}>
                  {y.image && (
                    <Image
                      src={y.image}
                      alt={y.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
                    <p className="font-serif text-lg text-white">{y.name}</p>
                    <p className="text-xs text-white/60">{y.category}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-xs text-charcoal-400">Up to {y.guests} guests</span>
                  <span className="text-xs font-sans tracking-[0.08em] uppercase text-champagne-600">
                    From S${y.rateFrom.toLocaleString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
