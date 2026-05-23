export const SITE_CONFIG = {
  name: "Yacht Collective",
  description: "Ultra-luxury yacht chartering experiences",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const NAV_LINKS = [
  { label: "Fleet", href: "/fleet" },
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/experiences" },
  { label: "About", href: "/about" },
] as const;
