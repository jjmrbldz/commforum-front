import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/uploads/**'
      },
      {
        protocol: 'http',
        hostname: 'tazza365.com',
        pathname: '/uploads/**'
      },
      {
        protocol: 'http',
        hostname: 'www.tazza365.com',
        pathname: '/uploads/**'
      },
      {
        protocol: 'https',
        hostname: 'tazza365.com',
        pathname: '/uploads/**'
      },
      {
        protocol: 'https',
        hostname: 'www.tazza365.com',
        pathname: '/uploads/**'
      },
    ]
  }
};

export default nextConfig;
