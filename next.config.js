/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // for static export
  eslint: {
    ignoreDuringBuilds: true, // skip ESLint errors during build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ skip TypeScript errors during build
  },
  images: {
    unoptimized: true, // used with `output: 'export'`
  },
};

module.exports = nextConfig;
