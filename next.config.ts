import type { NextConfig } from "next";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: projectId ? [{ protocol: "https", hostname: "cdn.sanity.io", pathname: `/images/${projectId}/${dataset}/**` }] : [],
  },
};

export default nextConfig;
