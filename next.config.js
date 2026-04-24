const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Correct key for Next.js 14.1+ (was experimental.serverComponentsExternalPackages)
  serverExternalPackages: ['sharp'],
  // Must be at root level in Next.js 14+ (not inside experimental)
  outputFileTracingExcludes: {
    '/api/admin/produtos/upload': ['public/**', '.next/cache/**'],
    '/api/admin/produtos': ['public/**', '.next/cache/**'],
    '/api/admin/produtos/images': ['public/**', '.next/cache/**'],
    '/api/admin/areas': ['public/**', '.next/cache/**'],
    '/api/admin/sobre': ['public/**', '.next/cache/**'],
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = withNextIntl(nextConfig)

