import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: "/admin",
                destination: "/admin/index.html",
                permanent: false,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "assets.tina.io",
                pathname: "/**",
            },
        ],
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    compiler: {
        // Remove legacy polyfills for modern browsers
        removeConsole:
            process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
    },
    experimental: {
        // Optimize module splitting
        optimizePackageImports: ["react-icons"],
    },
    async headers() {
        return [
            {
                source: "/:all*(svg|jpg|jpeg|png|gif|avif|webp|ico)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                source: "/logo/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                source: "/offer/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
