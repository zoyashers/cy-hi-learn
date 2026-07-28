/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow LAN IP to access dev resources (HMR, fonts, etc.)
  allowedDevOrigins: ['192.168.0.207'],

  // Optional: silence workspace root warnings
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
