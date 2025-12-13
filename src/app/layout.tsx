import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AfterHydration from "@/components/AfterHydration";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bezawaryjni AutoSerwis – mechanika, diagnostyka, samoobsługa",
  description: "Serwis mechaniczny i warsztat samoobsługowy. Uczciwa wycena, szybkie terminy, jakość premium.",
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
        {/* Preload hero image to improve LCP */}
        <link
          rel="preload"
          as="image"
          href="/yellow-car.avif"
          imageSrcSet="/yellow-car.avif"
          imageSizes="100vw"
          fetchPriority="high"
        />
        <link rel="preload" as="image" href="/hero-garage.jpg" imageSizes="100vw" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* TinaCMS iframe bridge - enables visual editing */}
        <Script
          id="tina-iframe"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                if (window.parent !== window) {
                  window.parent.postMessage({ type: 'loaded' }, '*');
                  window.__TINA_IFRAME__ = true;
                }
              })();
            `,
          }}
        />
        <Header />
        {/* Non-critical client-only enhancers (lazy after hydration) */}
        <AfterHydration />
        {children}
        <Footer />
      </body>
    </html>
  );
}
