"use client";

import { tinaField } from "tinacms/dist/react";
import dynamic from "next/dynamic";
import { useIsPreview } from "@/hooks/usePreviewHref";

// Lazy load heavy lightbox component
const LightboxImage = dynamic(() => import("@/components/features/LightboxImage"), {
    ssr: false,
    loading: () => null,
});

interface LiftsSectionProps {
    data: {
        lifts: {
            badge: string;
            heading: string;
            description: string;
        };
        [key: string]: unknown;
    };
}

export default function LiftsSection({ data }: LiftsSectionProps) {
    const isPreview = useIsPreview();
    const kontaktHref = isPreview ? "/preview#kontakt" : "#kontakt";
    return (
        <>
            {/* Gradient transition */}
            <div className="h-16 bg-gradient-to-b from-[#0b0b0b] via-[#060606] to-[#0b0b0b] sm:h-24"></div>

            {/* NOWE PODNOSNIKI */}
            <section
                id="stanowiska"
                className="overflow-hidden bg-[#0b0b0b] py-10 text-white sm:py-14 lg:py-16"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
                        <div className="text-center lg:text-left">
                            <span
                                className="mx-auto inline-flex items-center rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-semibold tracking-wider text-yellow-300 uppercase ring-1 ring-yellow-400/30 lg:mx-0"
                                data-tina-field={tinaField(data.lifts, "badge")}
                            >
                                {data.lifts.badge}
                            </span>
                            <h2
                                className="wrap-balance mt-4 text-3xl font-bold text-yellow-400 sm:text-4xl"
                                data-tina-field={tinaField(data.lifts, "heading")}
                            >
                                {data.lifts.heading}
                            </h2>
                            <p
                                className="mx-auto mt-4 max-w-prose text-base text-white/80 sm:text-lg lg:mx-0"
                                data-tina-field={tinaField(data.lifts, "description")}
                            >
                                {data.lifts.description}
                            </p>
                            <div className="mt-6 flex justify-center lg:justify-start">
                                <a
                                    href={kontaktHref}
                                    className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black transition-all hover:bg-yellow-300 hover:shadow-lg hover:shadow-yellow-400/20"
                                >
                                    Umów wizytę
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] shadow-2xl ring-1 ring-white/10">
                                <div className="flex aspect-[16/10] w-full items-center justify-center p-4 sm:p-6 lg:p-8">
                                    <LightboxImage
                                        src="/images/podnosnik.avif"
                                        alt="Podnosniki w warsztacie Bezawaryjni"
                                        width={800}
                                        height={450}
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                                        className="h-full w-full object-contain drop-shadow-2xl"
                                        priority={false}
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gradient transition */}
            <div className="h-16 bg-gradient-to-b from-[#0b0b0b] via-[#050505] to-black sm:h-24"></div>
        </>
    );
}
