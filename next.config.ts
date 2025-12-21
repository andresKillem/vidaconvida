import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed 'output: export' to enable API routes for Redis caching and rate limiting
  // Netlify will automatically handle Next.js server-side features via Netlify Functions
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
