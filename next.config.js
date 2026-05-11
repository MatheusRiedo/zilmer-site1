const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_CDN_URL: 'https://zilmer-static-assets-494934331329-us-east-2-an.s3.us-east-2.amazonaws.com',
  },
  serverExternalPackages: ['sharp'],
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
  // Trust proxy headers forwarded by CloudFront / ALB
  experimental: {
    trustHostHeader: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Allow CloudFront to forward the original protocol
          { key: 'X-Forwarded-Proto', value: 'https' },
          // Security headers
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

module.exports = withNextIntl(nextConfig)

