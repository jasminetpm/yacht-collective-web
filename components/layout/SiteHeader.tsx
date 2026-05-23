"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Fleet", href: "/fleet" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-pearl/95 backdrop-blur-sm shadow-luxury py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="mx-auto max-w-content-xl px-6 lg:px-12 flex items-center justify-between">
        <Link
          href="/"
          className={cn(
            "font-serif text-xl tracking-wide transition-colors duration-300",
            scrolled ? "text-ocean-700" : "text-white"
          )}
        >
          Yacht Collective
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs font-sans tracking-[0.12em] uppercase transition-colors duration-300",
                pathname === link.href
                  ? scrolled
                    ? "text-champagne-600"
                    : "text-champagne-400"
                  : scrolled
                    ? "text-charcoal-500 hover:text-ocean-700"
                    : "text-white/75 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className={cn(
              "px-6 py-2.5 text-xs font-sans tracking-[0.12em] uppercase border transition-all duration-500",
              scrolled
                ? "border-ocean-700 text-ocean-700 hover:bg-ocean-700 hover:text-white"
                : "border-white/50 text-white hover:border-white hover:bg-white/10"
            )}
          >
            Enquire Now
          </Link>
        </nav>

        <button
          className={cn(
            "md:hidden transition-colors duration-300",
            scrolled ? "text-ocean-700" : "text-white"
          )}
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-500 ease-luxury-out",
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="bg-ocean-700 px-6 pt-4 pb-8 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-sans tracking-[0.12em] uppercase transition-colors duration-300",
                pathname === link.href
                  ? "text-champagne-400"
                  : "text-white/70 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
