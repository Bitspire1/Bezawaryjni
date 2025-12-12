"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
    useEffect(() => {
        if (typeof window === "undefined") return;
        const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        if (reduce) return; // respect reduced motion

        const els = Array.from(document.querySelectorAll<HTMLElement>("[data-animate]"));
        if (!els.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        el.classList.add("sr-in");
                        observer.unobserve(el);
                    }
                }
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
        );

        els.forEach((el) => {
            // initialize hidden state + optional delay
            el.classList.add("sr-prep");
            const delay = el.getAttribute("data-animate-delay");
            if (delay) el.style.transitionDelay = delay;
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return null;
}
