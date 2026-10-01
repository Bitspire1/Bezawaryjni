"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const WhatsAppButton = dynamic(() => import("./WhatsAppButton"), {
    ssr: false,
    loading: () => null,
});

/**
 * Defers the WhatsApp widget chunk until the browser is idle, so it never
 * competes with hydration or the critical rendering path.
 */
export default function WhatsAppLazy() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if ("requestIdleCallback" in window) {
            const id = window.requestIdleCallback(() => setReady(true), { timeout: 4000 });
            return () => window.cancelIdleCallback(id);
        }
        const timer = setTimeout(() => setReady(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    return ready ? <WhatsAppButton /> : null;
}
