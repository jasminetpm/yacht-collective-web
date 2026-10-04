import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Anchor, ArrowRight, ShieldCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Founded in Singapore in 2022, Yacht Collective pairs every guest with the right yacht for the occasion. 300+ charters, rated 5 stars on Google.",
};

const GOOGLE_REVIEWS_URL = "https://share.google/tGW9ZvLg7xgbOUqpt";

interface Stat {
  value: string;
  label: string;
  href?: string;
}

interface Value {
  number: string;
  title: string;
  description: string;
}

interface TeamRole {
  icon: LucideIcon;
  title: string;
  description: string;
}

const STATS: Stat[] = [
  { value: "300+", label: "Charters hosted" },
  { value: "5.0", label: "Google rating", href: GOOGLE_REVIEWS_URL },
  { value: "8", label: "Years on Singapore's waters" },
  { value: "Trusted", label: "By Singapore's leading companies" },
];

const VALUES: Value[] = [
  {
    number: "01",
    title: "Carefully Vetted",
    description:
      "Every partner yacht is checked for vessel condition, safety equipment and crew standards before it joins the collection. If it isn't right, it isn't listed.",
  },
  {
    number: "02",
    title: "Taken Care Of",
    description:
      "A dedicated coordinator handles catering, decorations, timing and every detail in between, with clear communication from your first enquiry to your final mooring.",
  },
  {
    number: "03",
    title: "Made to Be Remembered",
    description:
      "Every charter is matched to the occasion, whether a proposal, a milestone or an evening of client entertaining, never a standard package.",
  },
];

const TEAM_ROLES: TeamRole[] = [
  {
    icon: Users,
    title: "Charter Coordinators",
    description:
      "A single point of contact who plans the details with you and stays on hand throughout your charter.",
  },
  {
    icon: Anchor,
    title: "Licensed Captains",
    description:
      "Experienced, certified captains who know Singapore's waters intimately, from Marina Bay to the Southern Islands.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Crew & Partners",
    description:
      "Hospitality-minded crew and yacht owners who maintain our standards on every voyage.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[55vh] items-end bg-ocean-700 overflow-hidden">
        <Image
          src="/images/about/hero.jpeg"
          alt="A Yacht Collective charter on Singapore's waters"
          fill
          loading="eager"
          fetchPriority="high"
          className="object-cover object-[50%_72%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/90 via-ocean-900/60 to-ocean-900/30" />
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
            Unforgettable days on the water. <br className="hidden sm:block" />
            Every detail, taken care of.
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
                Yacht Collective was born from a genuine love of being on the
                water.
              </p>
              <p>
              Founded in Singapore in 2022 by Jasmine Tan after eight years spent 
              exploring Singapore&apos;s waters, Yacht Collective was created to make 
              chartering feel personal again: pairing each guest with the right yacht 
              for the occasion, rather than simply presenting a catalogue of boats.
              </p>
              <p>
                We work with a select collection of partner yachts and licensed
                captains, each vetted for condition, safety and the quality of
                their crew. Only yachts we would confidently recommend to our
                own family and friends make the collection.
              </p>
              <p>
                Over 300 charters later, the approach is unchanged. A dedicated
                team looks after every detail, from your first enquiry to the
                moment you step back onto the dock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Proof ── */}
      <section className="bg-alabaster border-y border-champagne-200/60">
        <div className="mx-auto max-w-content-xl px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, index) => {
              const content = (
                <>
                  <p className="font-serif text-4xl text-ocean-700 lg:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-xs font-sans tracking-[0.14em] uppercase text-charcoal-400">
                    {stat.label}
                  </p>
                </>
              );

              const borders = [
                index % 2 === 1 ? "border-l" : "",
                index > 1 ? "border-t lg:border-t-0" : "",
                index === 2 ? "lg:border-l" : "",
              ].join(" ");

              return (
                <div
                  key={stat.label}
                  className={`border-champagne-200/60 px-4 py-12 text-center lg:py-16 ${borders}`}
                >
                  {stat.href ? (
                    <a
                      href={stat.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block transition-all duration-500 ease-in-out hover:opacity-70"
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Founder's note ── */}
      <section className="bg-alabaster-dark py-20 lg:py-24">
        <div className="mx-auto max-w-content-md px-6 text-center lg:px-12">
          <p className="mb-2 text-champagne-500 text-4xl font-serif leading-none">
            &ldquo;
          </p>
          <blockquote className="font-serif text-2xl font-normal leading-relaxed text-ocean-700 lg:text-3xl">
            After years spent on Singapore&apos;s waters, I wanted to
            create a charter experience that felt more personal. Whether
            it&apos;s an intimate sunset cruise, a celebration with friends or
            a full-day escape, our promise is simple: time on the water
            that feels effortless, memorable and beautifully put together.
          </blockquote>
          <p className="mt-6 text-xs font-sans tracking-[0.14em] uppercase text-charcoal-400">
            — Jasmine Tan, Founder
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

      {/* ── Founder ── */}
      <section className="bg-alabaster py-24 lg:py-32">
        <div className="mx-auto max-w-content-xl px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20 items-center">
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-ocean-800 to-ocean-600">
                <Image
                  src="/images/about/founder.jpg"
                  alt="Jasmine Tan, Founder of Yacht Collective"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-sans tracking-[0.2em] uppercase text-champagne-600">
                The Founder
              </p>
              <h2 className="font-serif text-4xl font-normal text-ocean-700 lg:text-5xl">
                Jasmine Tan
              </h2>
              <p className="text-xs font-sans tracking-[0.12em] uppercase text-charcoal-400">
                Founder
              </p>
              <div className="h-px w-16 bg-champagne-400" />
              <p className="max-w-xl text-base leading-relaxed text-charcoal-500">
              A licensed boater with eight years of experience on Singapore&apos;s waters, 
              Jasmine founded Yacht Collective to bring a more personal, considered 
              approach to yacht chartering. She curates the collection, sets the standards 
              for every yacht and experience, and leads the team behind each charter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="bg-pearl py-24 lg:py-32">
        <div className="mx-auto max-w-content-xl px-6 lg:px-12">
          <div className="mb-16 max-w-2xl">
            <p className="mb-3 text-xs font-sans tracking-[0.2em] uppercase text-champagne-600">
              The People Behind Every Charter
            </p>
            <h2 className="font-serif text-4xl font-normal text-ocean-700">
              A dedicated team, on and off the water.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-charcoal-500">
              From the first message to the final mooring line, a dedicated
              team ensures every charter runs smoothly.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {TEAM_ROLES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="space-y-4 border-t border-champagne-200 pt-8"
              >
                <Icon
                  size={24}
                  strokeWidth={1.25}
                  className="text-champagne-500"
                  aria-hidden="true"
                />
                <h3 className="font-serif text-xl text-ocean-700">{title}</h3>
                <p className="text-sm leading-relaxed text-charcoal-500">
                  {description}
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
            Let&apos;s plan your day on the water.
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
              Speak with Our Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
