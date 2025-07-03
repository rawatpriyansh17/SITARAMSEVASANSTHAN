import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['ik.imagekit.io'], // Already added
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;