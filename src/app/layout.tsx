import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL("https://bezawaryjni.com"),
    title: {
        default: "Bezawaryjni AutoSerwis – mechanika, diagnostyka, samoobsługa",
        template: "%s | Bezawaryjni AutoSerwis",
    },
    description:
        "Bezawaryjni AutoSerwis – serwis mechaniczny i warsztat samoobsługowy w Kobylnicy koło Słupska. Diagnostyka, mechanika, zawieszenie. Uczciwa wycena, szybkie terminy.",
    alternates: {
        canonical: "https://bezawaryjni.com",
    },
    openGraph: {
        type: "website",
        locale: "pl_PL",
        url: "https://bezawaryjni.com",
        siteName: "Bezawaryjni AutoSerwis",
        title: "Bezawaryjni AutoSerwis – mechanika, diagnostyka, samoobsługa",
        description:
            "Bezawaryjni AutoSerwis – serwis mechaniczny i warsztat samoobsługowy w Kobylnicy koło Słupska. Diagnostyka, mechanika, zawieszenie.",
        images: [
            {
                url: "https://bezawaryjni.com/images/og-image.png",
                width: 1200,
                height: 630,
                alt: "Bezawaryjni AutoSerwis – serwis mechaniczny Kobylnica / Słupsk",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Bezawaryjni AutoSerwis – mechanika, diagnostyka, samoobsługa",
        description:
            "Bezawaryjni AutoSerwis – serwis mechaniczny i warsztat samoobsługowy w Kobylnicy koło Słupska. Diagnostyka, mechanika, zawieszenie.",
        images: ["https://bezawaryjni.com/images/og-image.png"],
    },
    manifest: "/site.webmanifest",
    icons: {
        icon: [
            { url: "/favicon.svg", type: "image/svg+xml" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        ],
        apple: [{ url: "/apple-touch-icon.png" }],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pl">
            <head>
                {/* Upgrade any http subresource URLs to https in supporting browsers */}
                <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
                {/* Warm DNS for Tina media host — used if CMS content references
                    images not present locally in /public */}
                <link rel="dns-prefetch" href="https://assets.tina.io" />
            </head>
            <body className="antialiased">{children}</body>
        </html>
    );
}
