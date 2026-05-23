import Link from "next/link";
import { Globe, Mail, ExternalLink } from "lucide-react";

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
      <div className="mx-auto max-w-content-xl px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 pb-12 border-b border-white/10">
          <div className="space-y-4">
            <p className="font-serif text-2xl text-white tracking-wide">
              Yacht Collective
            </p>
            <p className="text-sm leading-relaxed text-white/60 max-w-xs">
              Curating extraordinary charter experiences in the world&apos;s
              most coveted waters since 2009.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="mailto:hello@yachtcollective.com"
                aria-label="Email"
                className="text-white/40 hover:text-champagne-400 transition-colors duration-300"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://yachtcollective.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="text-white/40 hover:text-champagne-400 transition-colors duration-300"
              >
                <Globe size={18} />
              </a>
              <a
                href="https://yachtcollective.com/press"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Press"
                className="text-white/40 hover:text-champagne-400 transition-colors duration-300"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

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

          <div className="space-y-5">
            <p className="text-xs font-sans tracking-[0.14em] uppercase text-champagne-500">
              Contact
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/60">
              <span>hello@yachtcollective.com</span>
              <span>+1 (212) 555 0190</span>
              <span className="mt-1 leading-relaxed">
                One Harbour View
                <br />
                Monaco MC 98000
              </span>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Yacht Collective. All rights
            reserved.
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
