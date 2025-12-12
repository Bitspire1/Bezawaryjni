"use client";

import dynamic from "next/dynamic";

// Load non-critical UI enhancers after hydration to avoid blocking initial render
const ScrollReveal = dynamic(() => import("./ScrollReveal"), { ssr: false });
const CookieConsent = dynamic(() => import("./CookieConsent"), { ssr: false });

export default function AfterHydration() {
    return (
        <>
            <ScrollReveal />
            <CookieConsent />
        </>
    );
}
