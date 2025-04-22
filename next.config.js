/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['yhmgmeoj713ne69o.public.blob.vercel-storage.com'],
  },
  reactStrictMode: true,
  // Remove the experimental appDir option as it's not needed in Next.js 15+
}

module.exports = nextConfig