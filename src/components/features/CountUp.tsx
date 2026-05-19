"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
    end: number;
    start?: number;
    duration?: number; // seconds
    decimals?: number; // digits after decimal point
    prefix?: string;
    suffix?: string;
    className?: string;
    easing?: "linear" | "easeOutCubic";
    once?: boolean; // animate only on first view
};

function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
}

export default function CountUp({
    end,
    start = 0,
    duration = 1.2,
    decimals = 0,
    prefix = "",
    suffix = "",
    className,
    easing = "easeOutCubic",
    once = true,
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const [display, setDisplay] = useState<string>(format(start, decimals, prefix, suffix));
    const [active, setActive] = useState(false);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (once && done) return;
                        startAnim();
                    } else if (!once) {
                        // optionally reset to allow re-animating
                        cancel();
                        setDisplay(format(start, decimals, prefix, suffix));
                        setActive(false);
                    }
                });
            },
            { root: null, threshold: 0.35, rootMargin: "0px 0px -10% 0px" },
        );
        observer.observe(el);
        return () => {
            observer.disconnect();
            cancel();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [end, start, duration, decimals, prefix, suffix, easing, once, done]);

    function cancel() {
        if (rafRef.current != null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
        startTimeRef.current = null;
    }

    function step(ts: number) {
        if (startTimeRef.current == null) startTimeRef.current = ts;
        const elapsed = (ts - startTimeRef.current) / (duration * 1000);
        const t = Math.min(1, Math.max(0, elapsed));
        const eased = easing === "linear" ? t : easeOutCubic(t);
        const value = start + (end - start) * eased;
        setDisplay(format(value, decimals, prefix, suffix));
        if (t < 1) {
            rafRef.current = requestAnimationFrame(step);
        } else {
            setActive(false);
            setDone(true);
            cancel();
            // ensure final value is exact
            setDisplay(format(end, decimals, prefix, suffix));
        }
    }

    function startAnim() {
        cancel();
        setActive(true);
        setDone(false);
        rafRef.current = requestAnimationFrame(step);
    }

    return (
        <span
            ref={ref}
            className={[
                "inline-block transition-transform duration-300 will-change-transform",
                active ? "scale-[1.02]" : "",
                className ?? "",
            ].join(" ")}
        >
            {display}
        </span>
    );
}

function format(value: number, decimals: number, prefix = "", suffix = "") {
    // Use a fixed locale to avoid server/client hydration mismatches
    const nf = new Intl.NumberFormat("pl-PL", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
    return `${prefix}${nf.format(value)}${suffix}`;
}
