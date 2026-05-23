import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/features/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Speak with our charter concierge team. We respond to all enquiries within one business day.",
};

const CONTACT_DETAILS = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@yachtcollective.com",
    href: "mailto:hello@yachtcollective.com",
  },
  {
    icon: Phone,
    label: "Telephone",
    value: "+1 (212) 555 0190",
    href: "tel:+12125550190",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "One Harbour View, Monaco MC 98000",
    href: null,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Fri, 09:00 – 18:00 CET",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[50vh] items-end bg-ocean-700 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-900 via-ocean-800 to-ocean-700" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 30%, #C9A86C 0%, transparent 55%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-content-xl px-6 pb-20 lg:px-12 lg:pb-24">
          <p className="mb-4 text-xs font-sans tracking-[0.2em] uppercase text-champagne-400">
            Get in Touch
          </p>
          <h1 className="font-serif text-5xl font-normal text-white lg:text-6xl">
            Begin Your Charter
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
            Our concierge team responds to all enquiries within one business day.
            There is no obligation — only a conversation.
          </p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="bg-pearl py-24 lg:py-32">
        <div className="mx-auto max-w-content-xl px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
            {/* Left: Contact details */}
            <aside className="space-y-10">
              <div>
                <p className="mb-3 text-xs font-sans tracking-[0.2em] uppercase text-champagne-600">
                  Our Offices
                </p>
                <h2 className="font-serif text-3xl font-normal text-ocean-700">
                  Contact Details
                </h2>
              </div>

              <div className="space-y-7">
                {CONTACT_DETAILS.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-champagne-200">
                      <Icon size={15} className="text-champagne-600" />
                    </div>
                    <div>
                      <p className="text-xs font-sans tracking-[0.1em] uppercase text-charcoal-400">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="mt-0.5 text-sm text-charcoal-700 hover:text-ocean-700 transition-colors duration-300"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm text-charcoal-700 leading-relaxed">
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-alabaster-dark pt-8 space-y-3">
                <p className="text-xs font-sans tracking-[0.1em] uppercase text-charcoal-400">
                  Also in
                </p>
                <div className="space-y-1.5 text-sm text-charcoal-500">
                  <p>London · United Kingdom</p>
                  <p>Singapore · Republic of Singapore</p>
                  <p>New York · United States</p>
                </div>
              </div>
            </aside>

            {/* Right: Form */}
            <div>
              <div className="mb-10">
                <p className="mb-3 text-xs font-sans tracking-[0.2em] uppercase text-champagne-600">
                  Charter Enquiry
                </p>
                <h2 className="font-serif text-3xl font-normal text-ocean-700">
                  Tell Us Your Vision
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-500 max-w-md">
                  The more detail you share, the better we can match you with the
                  right vessel and destination. All information is kept strictly
                  confidential.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
