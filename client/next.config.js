/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'maydochuyendung.com', 'www.ecommerce-admin.com'],
    formats: ['image/avif', 'image/webp'],
  }
}

module.exports = nextConfig
