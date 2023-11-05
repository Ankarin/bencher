/** @type {import("next").NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/developers',
        destination: '/developers/1',
        permanent: true,
      },
      {
        source: '/jobs',
        destination: '/jobs/1',
        permanent: true,
      },
      {
        source: '/companies',
        destination: '/companies/1',
        permanent: true,
      },
    ]
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
