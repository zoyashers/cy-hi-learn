import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    reactRefresh: false, // Disable Fast Refresh to stop infinite reload
  },
};

export default nextConfig;
