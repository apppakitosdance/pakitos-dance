/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/pakitos-dance' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/pakitos-dance/' : '',
  experimental: {
    esmExternals: 'loose',
  },
}

export default nextConfig

