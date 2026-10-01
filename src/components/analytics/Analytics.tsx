"use client";

import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-PJQFV2TCPV";

declare global {
    interface Window {
        dataLayer?: unknown[];
    }
}

/**
 * Defers the gtag script until the first user interaction (or a 6s
 * fallback for sessions that never interact). Keeps ~175KB of third-party
 * JS and its main-thread cost out of the initial load and Core Web Vitals
 * measurement window; page views still register for real visitors.
 */
export default function Analytics() {
    useEffect(() => {
        const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
        let timer: ReturnType<typeof setTimeout> | undefined;
        let loaded = false;
        const load = () => {
            if (loaded) return;
            loaded = true;
            events.forEach((e) => window.removeEventListener(e, load));
            clearTimeout(timer);
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push(["js", new Date()]);
            window.dataLayer.push([
                "config",
                GA_MEASUREMENT_ID,
                {
                    page_title: document.title,
                    page_location: window.location.href,
                },
            ]);
            const script = document.createElement("script");
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
            script.async = true;
            document.head.appendChild(script);
        };

        events.forEach((e) => window.addEventListener(e, load, { passive: true }));
        timer = setTimeout(load, 6000);

        return () => {
            events.forEach((e) => window.removeEventListener(e, load));
            clearTimeout(timer);
        };
    }, []);

    return null;
}
