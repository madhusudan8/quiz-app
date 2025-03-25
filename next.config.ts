import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // TEMPORARILY IGNORE NEXT'S AUTO GENERATED DIFF CHECK
  },
  /* config options here */
};

export default nextConfig;
