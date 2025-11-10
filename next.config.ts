import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["picsum.photos"],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
