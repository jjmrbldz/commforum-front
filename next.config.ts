import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http',  hostname: '**' },
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  eslint: { ignoreDuringBuilds: process.env.NEXT_LITE_BUILD === "1" },
  typescript: { ignoreBuildErrors: process.env.NEXT_LITE_BUILD === "1" },
};

export default nextConfig;
