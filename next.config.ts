import type { NextConfig } from "next";

// Keep the image allowlist available even before the CMS environment is loaded.
const projectId = process.env.SANITY_PROJECT_ID || "uljstmd1";
const dataset = process.env.SANITY_DATASET || "production";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: `/images/${projectId}/${dataset}/**` }],
  },
};

export default nextConfig;
