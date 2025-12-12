"use client";

import dynamic from "next/dynamic";

// Load non-critical UI enhancers after hydration to avoid blocking initial render
const ScrollReveal = dynamic(() => import("./features/ScrollReveal"), { ssr: false });
const CookieConsent = dynamic(() => import("./features/CookieConsent"), { ssr: false });

export default function AfterHydration() {
    return (
        <>
            <ScrollReveal />
            <CookieConsent />
        </>
    );
}
