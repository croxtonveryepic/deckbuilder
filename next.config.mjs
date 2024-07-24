/** @type {import('next').NextConfig} */
// const basePath = process.env.NODE_ENV === 'production' ? '/deckbuilder' : '';
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/deckbuilder',
  assetPrefix: '/deckbuilder/',
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
