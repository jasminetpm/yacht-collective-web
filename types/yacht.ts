export interface Yacht {
  id: string;
  slug: string;
  name: string;
  lengthMeters: number;
  guestCapacity: number;
  cabinCount: number;
  crewCount: number;
  description: string;
  heroImageUrl: string;
  galleryImageUrls: string[];
  amenities: string[];
  baseLocation: string;
  weeklyRateFrom: number;
  currency: string;
}

export type YachtSummary = Pick<
  Yacht,
  | "id"
  | "slug"
  | "name"
  | "guestCapacity"
  | "heroImageUrl"
  | "baseLocation"
  | "weeklyRateFrom"
  | "currency"
>;
