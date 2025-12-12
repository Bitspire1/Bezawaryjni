import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Only static-export in production builds; allow full dev server during `next dev`
  ...(isProd ? { output: "export" } : {}),
  images: {
    // required for output: 'export' when using next/image
    unoptimized: true,
  },
};

export default nextConfig;
