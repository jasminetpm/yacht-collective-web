import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Founded in Monaco in 2009, Yacht Collective was built on a single conviction: that a charter should be as considered as any great journey.",
};

const VALUES = [
  {
    number: "01",
    title: "Integrity in Curation",
    description:
      "We turn down more yachts than we accept. Every vessel in the collective passes a rigorous 40-point inspection covering safety, interior condition, crew standards, and mechanical integrity.",
  },
  {
    number: "02",
    title: "Radical Personalisation",
    description:
      "No two charters are alike. Your concierge spends time understanding you — your idea of rest, adventure, cuisine, and pace — before recommending a single vessel.",
  },
  {
    number: "03",
    title: "Discreet Excellence",
    description:
      "We serve guests who value privacy as much as luxury. Our team operates with absolute discretion, from initial enquiry through to the final night aboard.",
  },
];

const TEAM = [
  {
    name: "Élise Fontaine",
    role: "Founder & CEO",
    bio: "A former competitive sailor with 20 years in superyacht management across the Mediterranean and Caribbean.",
    image: "/images/about/team/elise.jpg",
    gradient: "from-ocean-800 to-ocean-600",
  },
  {
    name: "James Hartley",
    role: "Head of Fleet",
    bio: "Ex-Lloyd's surveyor with deep expertise in vessel certification, refit oversight, and crew vetting.",
    image: "/images/about/team/james.jpg",
    gradient: "from-charcoal-700 to-ocean-800",
  },
  {
    name: "Priya Menon",
    role: "Chief Charter Concierge",
    bio: "Previously with Belmond and Six Senses, Priya brings a hospitality philosophy that elevates every charter.",
    image: "/images/about/team/priya.jpg",
    gradient: "from-ocean-700 to-charcoal-700",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[55vh] items-end bg-ocean-700 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-900 via-ocean-800 to-ocean-700" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 60%, #C9A86C 0%, transparent 55%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-content-xl px-6 pb-20 lg:px-12 lg:pb-24">
          <p className="mb-4 text-xs font-sans tracking-[0.2em] uppercase text-champagne-400">
            Our Story
          </p>
          <h1 className="font-serif text-5xl font-normal text-white lg:text-6xl">
            Born from a love <br className="hidden sm:block" />
            of the open sea
          </h1>
        </div>
      </section>

      {/* ── Origin Story ── */}
      <section className="bg-pearl py-24 lg:py-32">
        <div className="mx-auto max-w-content-xl px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24 items-start">
            <div className="lg:sticky lg:top-28">
              <div className="relative h-96 w-full overflow-hidden bg-gradient-to-br from-ocean-800 to-ocean-600">
                <Image
                  src="/images/about/story.jpg"
                  alt="Yacht Collective — our story"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <p className="text-xs font-sans tracking-[0.2em] uppercase text-champagne-400">
                    Singapore
                  </p>
                  <p className="mt-1 font-serif text-3xl text-white">
                    Est. 2022
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-7 text-base leading-relaxed text-charcoal-500">
              <p className="font-serif text-2xl font-normal text-ocean-700 leading-snug">
                Yacht Collective was founded in Monaco with a single conviction:
                that a charter should be as considered as any great journey.
              </p>
              <p>
                Our founder, Élise Fontaine, spent over a decade as a
                professional sailor and superyacht manager before realising the
                charter market was defined by volume rather than
                discernment. In 2009, she quietly assembled a small fleet of
                vessels she would trust with her closest friends.
              </p>
              <p>
                Word spread. The collective grew. Today, Yacht Collective
                represents over 150 vessels across four ocean basins — yet the
                philosophy remains unchanged. We are not a booking platform. We
                are curators of exceptional voyages.
              </p>
              <p>
                Our team of twelve is based across Monaco, London, and
                Singapore. Every charter enquiry is handled personally, every
                recommendation considered in full.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider quote ── */}
      <section className="bg-alabaster-dark py-20">
        <div className="mx-auto max-w-content-md px-6 text-center lg:px-12">
          <p className="mb-2 text-champagne-500 text-4xl font-serif leading-none">
            &ldquo;
          </p>
          <blockquote className="font-serif text-2xl font-normal leading-relaxed text-ocean-700 lg:text-3xl">
            Nothing about how we work has changed since the first charter.
            Only the scale.
          </blockquote>
          <p className="mt-6 text-xs font-sans tracking-[0.14em] uppercase text-charcoal-400">
            — Élise Fontaine, Founder
          </p>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-pearl py-24 lg:py-32">
        <div className="mx-auto max-w-content-xl px-6 lg:px-12">
          <div className="mb-16">
            <p className="mb-3 text-xs font-sans tracking-[0.2em] uppercase text-champagne-600">
              How We Work
            </p>
            <h2 className="font-serif text-4xl font-normal text-ocean-700">
              Our Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {VALUES.map((value) => (
              <div key={value.number} className="space-y-4">
                <p className="font-serif text-4xl text-champagne-300 leading-none">
                  {value.number}
                </p>
                <h3 className="font-serif text-xl text-ocean-700">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-charcoal-500">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="bg-alabaster py-24 lg:py-32">
        <div className="mx-auto max-w-content-xl px-6 lg:px-12">
          <div className="mb-16">
            <p className="mb-3 text-xs font-sans tracking-[0.2em] uppercase text-champagne-600">
              The People
            </p>
            <h2 className="font-serif text-4xl font-normal text-ocean-700">
              Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {TEAM.map((member) => (
              <div key={member.name} className="group">
                <div className={`relative h-72 w-full overflow-hidden bg-gradient-to-b ${member.gradient} mb-5`}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <p className="font-serif text-xl text-ocean-700">
                  {member.name}
                </p>
                <p className="mt-0.5 text-xs font-sans tracking-[0.12em] uppercase text-champagne-600">
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-500">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-ocean-700 py-20 lg:py-28">
        <div className="mx-auto max-w-content-xl px-6 lg:px-12 flex flex-col items-center text-center gap-8">
          <h2 className="font-serif text-4xl font-normal text-white max-w-lg">
            Ready to plan your charter?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/fleet"
              className="inline-flex items-center gap-3 bg-champagne-500 px-8 py-4 text-xs font-sans tracking-[0.12em] uppercase text-ocean-900 transition-all duration-500 hover:bg-champagne-400"
            >
              Browse the Fleet
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-white/30 px-8 py-4 text-xs font-sans tracking-[0.12em] uppercase text-white transition-all duration-500 hover:border-white hover:bg-white/5"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
