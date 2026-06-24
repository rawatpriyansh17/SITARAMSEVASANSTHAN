import type { NextConfig } from "next";
import { withGTConfig } from "gt-next/config";

const nextConfig: NextConfig = {
  images: {
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

export default withGTConfig(nextConfig, {
  renderSettings: {
    method: "replace",
  },
});
