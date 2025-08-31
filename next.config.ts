import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'tazza365.com',
      },
      {
        protocol: 'http',
        hostname: 'www.tazza365.com',
      },
      {
        protocol: 'https',
        hostname: 'tazza365.com',
      },
      {
        protocol: 'https',
        hostname: 'www.tazza365.com',
      },
    ]
  }
};

export default nextConfig;
