/**
 * Yacht data — single source of truth used by homepage cards + detail pages.
 *
 * HOW TO ADD PHOTOS:
 *   Drop files in /public/images/yachts/<yacht-id>/
 *   e.g. /public/images/yachts/lagoon-62/01.jpg
 *   Then add the path to the `images` array below.
 *
 * HOW TO ADD / EDIT A YACHT:
 *   Copy one of the entries below and fill in the details.
 *   The `id` becomes the URL slug: /fleet/lagoon-62
 */

export interface Yacht {
  id: string;
  name: string;
  tagline: string;
  category: string;
  location: string;
  lengthFt: number;
  guests: number;
  cabins: number;
  crew: number;
  rateFrom: number;
  /** Hero image shown on the card. Use first image in the gallery ideally. */
  image: string | null;
  /** All gallery images — shown on the detail page. */
  images: string[];
  description: string;
  highlights: string[];
  amenities: string[];
  /** Tailwind gradient classes — used as fallback when no image is set. */
  gradient: string;
  accentGradient: string;
}

export const YACHTS: Yacht[] = [
  {
    id: "lagoon-62",
    name: "Lagoon 62",
    tagline: "Elegant catamaran with sweeping teak decks and sky-high flybridge.",
    category: "Catamaran",
    location: "ONE°15 Marina, Sentosa Cove, Singapore",
    lengthFt: 62,
    guests: 36,
    cabins: 3,
    crew: 3,
    rateFrom: 2900,
    image: "/images/yachts/lagoon-62/lagoon-62.jpg",
    images: [
      "/images/yachts/lagoon-62/lagoon-62.jpg",
      "/images/yachts/lagoon-62/lagoon-62-saloon.jpg",
      "/images/yachts/lagoon-62/lagoon-62-stern.jpg",
      "/images/yachts/lagoon-62/lagoon-62-cockpit.jpg",
      "/images/yachts/lagoon-62/lagoon-62-flybridge.jpg",
      "/images/yachts/lagoon-62/lagoon-62-cabin.jpg"
      // Add your gallery photos here — e.g. "/images/yachts/lagoon-62/02.jpg"
      // The first image (above) is used as the card hero.
    ],
    description:
      "The Lagoon 62 is one of the world's most celebrated blue-water catamarans, reimagined here for Singapore's stunning coastal waters. Her wide-beam hull delivers exceptional stability and deck space, making her ideal for groups who want both comfort and style. The flybridge commands panoramic views of the Singapore skyline and Southern Islands — an unrivalled setting for sundowners, corporate entertaining, or a private celebration on the water.",
    highlights: [
      "Expansive flybridge with 360° views",
      "Spacious twin-hull deck — ideal for large groups",
      "Air-conditioned saloon and cabins",
      "Professional crew of 3",
      "Ideal for sunset cruises, corporate events, and celebrations",
    ],
    amenities: [
      "Flybridge with seating and sunbeds",
      "Air-conditioned saloon",
      "3 private cabins",
      "Full galley kitchen",
      "Sound system",
      "Swimming platform",
      "Snorkelling gear",
      "Life jackets",
      "Bluetooth speaker",
      "Freshwater shower",
    ],
    gradient: "from-[#0A1E3F] via-[#0E2B58] to-[#122440]",
    accentGradient: "from-champagne-700/30 to-transparent",
  },
  {
    id: "ferretti-60",
    name: "Ferretti 60",
    tagline: "Classic Italian flybridge motor yacht — effortlessly elegant.",
    category: "Motor Yacht",
    location: "ONE°15 Marina, Sentosa Cove, Singapore",
    lengthFt: 60,
    guests: 23,
    cabins: 2,
    crew: 2,
    rateFrom: 1700,
    image: "/images/yachts/ferretti-60/ferretti-60.webp",
    images: [
      "/images/yachts/ferretti-60/ferretti-60.webp"
      "/images/yachts/ferretti-60/1.webp",
      "/images/yachts/ferretti-60/2.webp",
      "/images/yachts/ferretti-60/3.webp",
      "/images/yachts/ferretti-60/4.webp",
      "/images/yachts/ferretti-60/5.webp",
      "/images/yachts/ferretti-60/6.webp",
      "/images/yachts/ferretti-60/7.webp",
      "/images/yachts/ferretti-60/8.webp",
      "/images/yachts/ferretti-60/9.webp",
      "/images/yachts/ferretti-60/10.webp",
      "/images/yachts/ferretti-60/11.webp",
      "/images/yachts/ferretti-60/12.webp",
      "/images/yachts/ferretti-60/13.webp",
      "/images/yachts/ferretti-60/14.webp",
      "/images/yachts/ferretti-60/15.webp"
    ],
    description:
      "The Ferretti 60 is a masterpiece of Italian naval design — long, low, and breathtakingly proportioned. Her sleek flybridge and generous aft deck make her a natural entertainer, while two well-appointed cabins offer privacy and comfort for smaller, more intimate parties. Whether you're hosting clients, celebrating a milestone, or simply seeking an exclusive afternoon on the water, the Ferretti 60 delivers an experience that is wholly refined.",
    highlights: [
      "Iconic Italian flybridge design",
      "Intimate and private — perfect for smaller groups",
      "Elegant aft deck for al fresco dining",
      "2 private cabins with ensuite bathrooms",
      "Smooth, fast passage through Singapore waters",
    ],
    amenities: [
      "Flybridge with helm and seating",
      "Aft deck dining area",
      "Air-conditioned saloon",
      "2 private cabins with ensuites",
      "Full galley kitchen",
      "Premium sound system",
      "Swim platform with ladder",
      "Life jackets",
      "Bluetooth speaker",
      "Freshwater shower",
    ],
    gradient: "from-[#1C1C2E] via-[#2C2C40] to-[#1A1A2E]",
    accentGradient: "from-champagne-600/20 to-transparent",
  },
  {
    id: "horizon-105",
    name: "Horizon 105",
    tagline: "Singapore's most spectacular superyacht — built to impress.",
    category: "Superyacht",
    location: "ONE°15 Marina, Sentosa Cove, Singapore",
    lengthFt: 105,
    guests: 55,
    cabins: 3,
    crew: 5,
    rateFrom: 3900,
    image: "/images/yachts/horizon-105/horizon-105.jpg",
    images: [
      "/images/yachts/horizon-105/horizon-105.jpg",
      "/images/yachts/horizon-105/horizon-105-yacht.webp",
      "/images/yachts/horizon-105/horizon-105-2.avif",
      "/images/yachts/horizon-105/horizon-105-3.webp",
      "/images/yachts/horizon-105/horizon-105-cabin-1.webp",
      "/images/yachts/horizon-105/horizon-105-cabin-2.webp",
      "/images/yachts/horizon-105/horizon-105-flybridge.jpg",
      "/images/yachts/horizon-105/horizon-105-giant-water-slide.webp"
    ],
    description:
      "The Horizon 105 is in a class of her own. At 105 feet, she is one of the largest charter vessels in Singapore — a floating venue of extraordinary scale and luxury. Multiple expansive decks, a jacuzzi, full karaoke suite, and a professional crew of five ensure every charter is an event to remember. Whether you're hosting 55 guests for a product launch, rewarding your team, or celebrating in the grandest possible style, the Horizon 105 sets a standard nothing else in Singapore can match.",
    highlights: [
      "One of Singapore's largest charter vessels at 105ft",
      "Rooftop jacuzzi with panoramic views",
      "Full karaoke suite and premium sound system",
      "Multiple decks — ideal for 55+ guests",
      "Professional crew of 5 including chef",
    ],
    amenities: [
      "Rooftop jacuzzi",
      "Karaoke suite with professional AV system",
      "Multiple air-conditioned decks",
      "3 VIP cabins",
      "Full catering kitchen",
      "Bar setup",
      "LED dance floor lighting",
      "Premium sound system",
      "Swimming platform",
      "Life jackets for all guests",
      "Freshwater showers",
      "Crew of 5",
    ],
    gradient: "from-[#050D1F] via-[#091630] to-[#0A1128]",
    accentGradient: "from-champagne-500/25 to-transparent",
  },
];

export function getYachtBySlug(slug: string): Yacht | undefined {
  return YACHTS.find((y) => y.id === slug);
}
