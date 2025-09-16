/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // gera versão estática (out/)
  images: {
    unoptimized: true, // evita problemas com Image Optimization no Pages
  },
  basePath: "/health-calculators", // troque se o nome do repo for outro
  assetPrefix: "/health-calculators/",
};

module.exports = nextConfig;
