import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Yacht photos can be linked from the fleet Google Sheet (Drive links or any https image host). */
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
