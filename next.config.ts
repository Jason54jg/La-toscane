import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=true → GitHub Pages (temporaire, pas d’API).
 * STANDALONE=true → image Docker (serveur Node minimal, avec /api/reviews).
 * Sinon → mode serveur normal (local / Vercel) avec /api/reviews.
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";
const isStandalone = process.env.STANDALONE === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath: basePath || undefined,
        assetPrefix: basePath || undefined,
      }
    : {}),
  ...(isStandalone ? { output: "standalone" as const } : {}),
  images: {
    unoptimized: isStaticExport,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
