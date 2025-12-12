import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Only static-export in production builds; allow full dev server during `next dev`
  ...(isProd ? { output: "export" } : {}),
  images: {
    // required for output: 'export' when using next/image
    unoptimized: true,
  },
  // In dev, proxy Tina Admin (port 4001) under the same origin to enable Visual Editing
  ...(isProd
    ? {}
    : {
      async rewrites() {
        return [
          {
            source: "/admin/:path*",
            destination: "http://localhost:4001/admin/:path*",
          },
          // Alternate proxied path to avoid collisions with a public/admin file in dev
          {
            source: "/tina-admin/:path*",
            destination: "http://localhost:4001/admin/:path*",
          },
        ];
      },
    }),
};

export default nextConfig;
