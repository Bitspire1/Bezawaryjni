import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Analytics from "@/components/Analytics";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: "swap",
    preload: true,
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap",
    preload: true,
});

export const metadata: Metadata = {
    metadataBase: new URL("https://bezawaryjni.pl"),
    title: {
        default: "Bezawaryjni AutoSerwis – mechanika, diagnostyka, samoobsługa",
        template: "%s | Bezawaryjni AutoSerwis",
    },
    description:
        "Bezawaryjni AutoSerwis – serwis mechaniczny i warsztat samoobsługowy w Kobylnicy koło Słupska. Diagnostyka, mechanika, zawieszenie. Uczciwa wycena, szybkie terminy.",
    alternates: {
        canonical: "https://bezawaryjni.pl",
    },
    openGraph: {
        type: "website",
        locale: "pl_PL",
        url: "https://bezawaryjni.pl",
        siteName: "Bezawaryjni AutoSerwis",
        title: "Bezawaryjni AutoSerwis – mechanika, diagnostyka, samoobsługa",
        description:
            "Bezawaryjni AutoSerwis – serwis mechaniczny i warsztat samoobsługowy w Kobylnicy koło Słupska. Diagnostyka, mechanika, zawieszenie.",
        images: [
            {
                url: "https://bezawaryjni.pl/images/og-image.png",
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
        images: ["https://bezawaryjni.pl/images/og-image.png"],
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
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* Upgrade any http subresource URLs to https in supporting browsers */}
                <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />

                {/* Preconnect to Google Maps used in Contact section */}
                <link rel="preconnect" href="https://maps.google.com" />
                <link rel="dns-prefetch" href="https://maps.google.com" />
                <link rel="preconnect" href="https://maps.googleapis.com" />
                <link rel="dns-prefetch" href="https://maps.googleapis.com" />

                {/* Preload hero image to improve LCP */}
                <link
                    rel="preload"
                    as="image"
                    href="/images/yellow-car.png"
                    fetchPriority="high"
                />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Header />
                <main>{children}</main>
                <Footer />
                <WhatsAppButton />
                <Analytics />
            </body>
        </html>
    );
}
