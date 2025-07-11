/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://cdn.dummyjson.com/recipe-images/**")],
  },
};

export default nextConfig;
