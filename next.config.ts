import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  experimental: { optimizePackageImports: ["lucide-react", "framer-motion"] },
  partialPrefetching: true,
  images: {
    qualities: [75, 80, 100],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Project screenshots, videos and service images rarely change: let browsers
  // and CDNs keep them for a week so repeat visits do not re-download them.
  async headers() {
    // Production only, so replacing an image while developing shows up instantly.
    if (process.env.NODE_ENV !== "production") return [];
    const cache = [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }];
    return [
      { source: "/projects/:path*", headers: cache },
      { source: "/images/:path*", headers: cache },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
