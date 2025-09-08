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
  eslint: { ignoreDuringBuilds: process.env.NODE_ENV === "production" },
  typescript: { ignoreBuildErrors: process.env.NODE_ENV === "production" },
};

export default nextConfig;
