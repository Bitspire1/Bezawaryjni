"use client";

import ScrollReveal from "./features/ScrollReveal";

// Load non-critical UI enhancers after hydration to avoid blocking initial render
export default function AfterHydration() {
    return (
        <>
            <ScrollReveal />
        </>
    );
}
