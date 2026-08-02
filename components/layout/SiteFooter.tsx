import Link from "next/link";
import { Mail, ExternalLink, ArrowRight } from "lucide-react";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=yacht+collective+singapore&rlz=1C1MIZP_enSG1165SG1165&oq=yacht+collective+singapore&gs_lcrp=EgZjaHJvbWUyCAgAEEUYJxg5MgcIARAAGO8FMgcIAhAAGO8FMgoIAxAAGKIEGIkF0gEIMjc0M2owajeoAgCwAgA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x31da1f03c3fa1dc7:0x3a0f6ea1ae9ca73d,1,,,,";

const INSTAGRAM_URL = "https://www.instagram.com/yachtcollective.sg/";

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

const FOOTER_NAV = [
  { label: "Fleet", href: "/fleet" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-ocean-700 text-white/70">
      {/* ── Instagram Feature Strip ── */}
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group block border-b border-white/10 bg-ocean-800/60 transition-colors duration-300 hover:bg-ocean-800"
      >
        <div className="mx-auto max-w-content-xl px-6 lg:px-12 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-champagne-500/40 bg-champagne-500/10 text-champagne-400 transition-all duration-300 group-hover:border-champagne-400 group-hover:bg-champagne-500/20">
              <InstagramIcon size={22} />
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                Follow us on Instagram
              </p>
              <p className="text-xs text-white/50">
                @yachtcollective.sg &nbsp;·&nbsp; Latest charters, events &amp; updates
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-xs font-sans tracking-[0.1em] uppercase text-champagne-400 transition-all duration-300 group-hover:gap-3">
            Follow
            <ArrowRight size={13} />
          </div>
        </div>
      </a>

      {/* ── Main Footer ── */}
      <div className="mx-auto max-w-content-xl px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 pb-12 border-b border-white/10">

          {/* Brand column */}
          <div className="space-y-5">
            <p className="font-serif text-2xl text-white tracking-wide">
              Yacht Collective
            </p>
            <p className="text-sm leading-relaxed text-white/60 max-w-xs">
              Curating extraordinary charter experiences in Singapore&apos;s
              finest waters since 2022.
            </p>
            <div className="flex items-center gap-4 pt-1">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-champagne-500 hover:text-champagne-300 transition-colors duration-300"
                title="Follow @yachtcollective.sg"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href="mailto:hello@yachtcollective.sg"
                aria-label="Email"
                className="text-white/40 hover:text-champagne-400 transition-colors duration-300"
              >
                <Mail size={18} />
              </a>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Reviews"
                className="text-white/40 hover:text-champagne-400 transition-colors duration-300"
                title="See our Google Reviews"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-5">
            <p className="text-xs font-sans tracking-[0.14em] uppercase text-champagne-500">
              Navigation
            </p>
            <nav className="flex flex-col gap-3">
              {FOOTER_NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <p className="text-xs font-sans tracking-[0.14em] uppercase text-champagne-500">
              Contact
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/60">
              <a
                href="mailto:hello@yachtcollective.sg"
                className="hover:text-champagne-400 transition-colors duration-300"
              >
                hello@yachtcollective.sg
              </a>
              <a
                href="https://wa.me/6590509001"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-champagne-400 transition-colors duration-300"
              >
                <WhatsAppIcon size={14} />
                +65 9050 9001
              </a>
              <span className="mt-1 leading-relaxed">
                Sentosa Cove
                <br />
                1 Cove Dr, Singapore 098497
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Yacht Collective. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/30 hover:text-white/60 transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
