import Image from "next/image";

/**
 * Corporate clients marquee.
 *
 * HOW TO ADD LOGOS:
 *   1. Drop the file in /public/images/logos/  (SVG preferred, PNG/WebP also fine)
 *   2. Set the `logo` field to the path, e.g. "/images/logos/dbs.svg"
 *   3. The component will show the image; if logo is null it shows the name as text.
 *
 * HOW TO ADD / REMOVE CLIENTS:
 *   Just edit the CLIENTS array below.
 */
const CLIENTS: { name: string; logo: string | null }[] = [
  { name: "Tiktok",             logo: "/images/logos/tiktok.svg" },
  { name: "Grab",             logo: "/images/logos/grab.svg" },
  { name: "Rajah & Tann",             logo: "/images/logos/rajah&tann.webp" },
  { name: "Twilio",             logo: "/images/logos/twilio.webp" },
  { name: "Olayan",             logo: "/images/logos/olayan.webp" },
  { name: "Charles & Keith",             logo: "/images/logos/charles&keith.svg" },
  { name: "Docusign",             logo:  "/images/logos/docusign.webp" },
  { name: "Intralinks",             logo: "/images/logos/intralinks.png" },
  { name: "d&b Audiotechnik",             logo: "/images/logos/d&b.svg" },
  { name: "PCF",          logo: "/images/logos/pcf.webp" },
  { name: "Alps",          logo: "/images/logos/alps.svg" },
  { name: "Singtel",              logo: "/images/logos/singtel.webp" }
];

export default function CorporateClients() {
  /* Duplicate for seamless infinite loop */
  const items = [...CLIENTS, ...CLIENTS];

  return (
    <section className="bg-pearl py-20 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-content-xl px-6 lg:px-12 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-sans tracking-[0.2em] uppercase text-champagne-600">
              Trusted By
            </p>
            <h2 className="font-serif text-4xl font-normal text-ocean-700">
              Singapore&apos;s Leading Companies
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-charcoal-500 max-w-xs sm:text-right">
            From intimate company retreats to large-scale corporate events —
            we know how to impress.
          </p>
        </div>
      </div>

      {/* "Our Customers" label above logos */}
      <div className="mx-auto max-w-content-xl px-6 lg:px-12 mb-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-champagne-200" />
        <p className="text-xs font-sans tracking-[0.2em] uppercase text-charcoal-400 shrink-0">
          Our Customers
        </p>
        <div className="h-px flex-1 bg-champagne-200" />
      </div>

      {/* Marquee track */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-pearl to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-pearl to-transparent" />

        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-0">
            {items.map((client, i) => (
              <div key={i} className="flex shrink-0 items-center gap-0">
                <div className="px-10 py-4 flex items-center justify-center h-20 opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105">
                  {client.logo ? (
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={160}
                      height={56}
                      style={{ width: "auto", height: "48px" }}
                      className="object-contain transition-all duration-300"
                    />
                  ) : (
                    <span className="whitespace-nowrap font-serif text-2xl text-charcoal-400 hover:text-champagne-600 transition-colors duration-300 select-none">
                      {client.name}
                    </span>
                  )}
                </div>
                <span className="shrink-0 text-champagne-300 text-xs select-none" aria-hidden="true">
                  ◆
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Corporate CTA */}
      <div className="mx-auto max-w-content-xl px-6 lg:px-12 mt-14">
        <div className="border border-champagne-200 bg-champagne-50/50 p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-sans tracking-[0.2em] uppercase text-champagne-600 mb-2">
              Corporate Charters
            </p>
            <h3 className="font-serif text-2xl font-normal text-ocean-700">
              Elevate your next corporate event
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-500 max-w-md">
              Client entertaining, team incentives, product launches, or
              company offsites — we create experiences that no conference
              room ever could. Fully customisable, fully catered, fully crewed.
            </p>
          </div>
          <a
            href="/contact"
            className="shrink-0 inline-flex items-center gap-3 bg-ocean-700 px-8 py-4 text-xs font-sans tracking-[0.12em] uppercase text-white transition-all duration-500 hover:bg-ocean-600"
          >
            Plan a Corporate Charter
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
