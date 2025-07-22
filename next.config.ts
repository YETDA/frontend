import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "yetdas3.s3.ap-northeast-2.amazonaws.com",
      "static.toss.im",
      "images.unsplash.com",
    ],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "yetdas3.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.toss.im",
        port: "",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
