import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",

        hostname: "picsum.photos", 
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000", // nếu server của bạn chạy port 8000
        pathname: "/storage/**", // ** để match tất cả file trong storage
      },
    ],
  },
};

export default nextConfig;
