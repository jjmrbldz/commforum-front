import type { NextConfig } from "next";

function getMediaHostPattern(): { protocol: 'http' | 'https'; hostname: string; port?: string }[] {
  const mediaPath = process.env.NEXT_PUBLIC_MEDIA_PATH;
  if (!mediaPath) return [];
  try {
    const url = new URL(mediaPath);
    if (url.hostname === 'localhost') return [];
    return [{
      protocol: url.protocol.replace(':', '') as 'http' | 'https',
      hostname: url.hostname,
      ...(url.port ? { port: url.port } : {}),
    }];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'localhost' },
      ...getMediaHostPattern(),
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  typescript: { ignoreBuildErrors: process.env.NEXT_LITE_BUILD === "1" },
};

export default nextConfig;
