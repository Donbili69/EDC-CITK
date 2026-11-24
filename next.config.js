/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      // Add Cloudinary / S3-compatible host(s) here once media storage is live.
    ],
  },
};

module.exports = nextConfig;