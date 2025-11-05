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
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org", // 👈 thêm dòng này
        pathname: "/t/p/**",         // 👈 match tất cả đường dẫn ảnh TMDB
      },
    ],
  },
};

export default nextConfig;
