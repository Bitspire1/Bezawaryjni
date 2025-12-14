"use client";

import dynamic from "next/dynamic";

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
    return (
        <>
            {/* Gradient transition */}
            <div className="h-16 sm:h-24 bg-gradient-to-b from-[#0b0b0b] via-[#060606] to-[#0b0b0b]"></div>

            {/* NOWE PODNOSNIKI */}
            <section id="stanowiska" className="py-10 sm:py-14 lg:py-16 bg-[#0b0b0b] text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <span className="inline-flex items-center rounded-full bg-yellow-400/10 ring-1 ring-yellow-400/30 text-yellow-300 px-3 py-1 text-xs font-semibold uppercase tracking-wider mx-auto lg:mx-0">
                                {data.lifts.badge}
                            </span>
                            <h2 className="mt-4 text-3xl sm:text-4xl font-bold wrap-balance text-yellow-400">
                                {data.lifts.heading}
                            </h2>
                            <p className="mt-4 text-base sm:text-lg text-white/80 max-w-prose mx-auto lg:mx-0">
                                {data.lifts.description}
                            </p>
                            <div className="mt-6 flex justify-center lg:justify-start">
                                <a 
                                    href="#kontakt" 
                                    className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 text-black font-semibold px-6 py-3 hover:bg-yellow-300 transition-all hover:shadow-lg hover:shadow-yellow-400/20"
                                >
                                    Umów wizytę
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative rounded-xl overflow-hidden ring-1 ring-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] shadow-2xl">
                                <div className="aspect-[16/10] w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
                                    <LightboxImage
                                        src="/podnosnik.avif"
                                        alt="Podnosniki w warsztacie Bezawaryjni"
                                        width={800}
                                        height={450}
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                                        className="w-full h-full object-contain drop-shadow-2xl"
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
            <div className="h-16 sm:h-24 bg-gradient-to-b from-[#0b0b0b] via-[#050505] to-black"></div>
        </>
    );
}
