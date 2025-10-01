/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // enables next export (static HTML generation)
  basePath: '/ML-Experimentation-Hub', // repo name for GitHub Pages
  images: {
    unoptimized: true, // required because GitHub Pages doesn't support Next.js Image Optimization
  },
};

module.exports = nextConfig;
