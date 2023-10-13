/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    runtime: 'edge',
  },
  images: {
    loader: 'custom',
    loaderFile: './loader.js',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
