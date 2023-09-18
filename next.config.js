/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    loader: 'custom',
    loaderFile: './loader.js',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
