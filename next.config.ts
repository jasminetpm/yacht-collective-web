import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Photos are pre-compressed (WebP, max 1920px wide) in public/images, so Vercel's
       on-the-fly Image Optimization is switched off. This keeps usage at zero against the
       free tier (5,000 transformations/month). Compress any new photo before adding it
       (see docs/fleet-sheet.md). */
    unoptimized: true,
    /* Photos can also be linked from the fleet Google Sheet (Drive links or any https host). */
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
