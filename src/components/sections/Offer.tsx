"use client";

import Image from "next/image";
import { useState } from "react";

type ServiceItem = {
    title: string;
    image: string;
    alt: string;
    description: string;
};

interface OfferProps {
    data: {
        services: {
            heading: string;
            items: ServiceItem[];
        };
        [key: string]: unknown;
    };
}

export default function Offer({ data }: OfferProps) {
    const [selectedService, setSelectedService] = useState<number | null>(null);
    const services = data.services.items;

    let rowTop: typeof services = [];
    let rowBottom: typeof services = [];
    if (services.length >= 6) {
        rowTop = services.slice(0, 4);
        rowBottom = services.slice(4, 6);
    } else if (services.length === 5) {
        rowTop = services.slice(0, 3);
        rowBottom = services.slice(3, 5);
    } else if (services.length === 4) {
        rowTop = services.slice(0, 2);
        rowBottom = services.slice(2, 4);
    } else if (services.length === 3) {
        rowTop = services.slice(0, 2);
        rowBottom = services.slice(2, 3);
    } else {
        rowTop = services;
    }

    const renderHex = (item: ServiceItem, idx: number, globalIndex: number) => (
        <div key={idx} className="w-56 sm:w-60 lg:w-64 relative">
            <button
                onClick={() => setSelectedService(globalIndex)}
                className="hex relative will-change-transform transition-transform duration-300 ease-out hover:-translate-y-1.5 active:-translate-y-1 cursor-pointer w-full group"
                style={{ aspectRatio: '1 / 1' }}
                aria-label={`Zobacz szczegóły: ${item.title}`}
            >
                <div className="absolute inset-0 bg-yellow-400 rounded-[2px] transition-shadow duration-300 shadow-[0_8px_26px_-12px_rgba(250,204,21,0.45)] group-hover:shadow-[0_16px_44px_-14px_rgba(250,204,21,0.6)]" />
                <div className="absolute inset-[8px] hex overflow-hidden bg-gradient-to-b from-[#151515] to-[#0e0e0e] ring-1 ring-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.55)]">
                    <div className="flex h-full w-full items-center justify-center">
                        <div className="w-1/2 sm:w-2/5 lg:w-1/2">
                            <Image 
                                src={encodeURI(item.image)} 
                                alt={item.alt} 
                                width={256} 
                                height={256}
                                sizes="(max-width: 640px) 96px, (max-width: 1024px) 128px, 160px"
                                draggable={false} 
                                loading="lazy"
                                className="w-full h-auto aspect-square object-contain select-none pointer-events-none drop-shadow-[0_8px_22px_rgba(250,204,21,0.3)] transition-transform duration-300 ease-out group-hover:scale-[1.06]" 
                            />
                        </div>
                    </div>
                </div>
            </button>
        </div>
    );

    return (
        <>
            <section id="uslugi" className="relative py-12 sm:py-16 lg:py-20 bg-[#0b0b0b] text-white overflow-hidden">
                <div aria-hidden className="pointer-events-none absolute inset-0 deco-dots" />
                <div aria-hidden className="pointer-events-none absolute inset-0 deco-vignette" />

                {/* Heksagony dla mobile - równomiernie rozłożone */}
                <div className="pointer-events-none absolute inset-0 z-0 md:hidden">
                    <div className="hex-deco absolute top-[8%] left-[8%] w-8 h-8 bg-yellow-400/10" />
                    <div className="hex-deco absolute top-[8%] right-[8%] w-8 h-8 bg-yellow-400/10" />
                    <div className="hex-deco absolute top-[50%] left-[5%] w-6 h-6 bg-yellow-400/8" />
                    <div className="hex-deco absolute top-[50%] right-[5%] w-6 h-6 bg-yellow-400/8" />
                    <div className="hex-deco absolute bottom-[8%] left-[8%] w-8 h-8 bg-yellow-400/10" />
                    <div className="hex-deco absolute bottom-[8%] right-[8%] w-8 h-8 bg-yellow-400/10" />
                    {/* Linie dekoracyjne */}
                    <div className="absolute top-[15%] left-0 w-20 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
                    <div className="absolute bottom-[15%] right-0 w-20 h-px bg-gradient-to-l from-transparent via-yellow-400/20 to-transparent" />
                </div>

                {/* Heksagony dla desktop - równomierna siatka */}
                <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
                    {/* Górna warstwa */}
                    <div className="hex-deco absolute top-[10%] left-[8%] w-12 h-12 bg-yellow-400/8" />
                    <div className="hex-deco absolute top-[15%] left-[15%] w-10 h-10 bg-yellow-400/6" />
                    <div className="hex-deco absolute top-[8%] left-[49%] w-8 h-8 bg-yellow-400/5" />
                    <div className="hex-deco absolute top-[15%] right-[15%] w-10 h-10 bg-yellow-400/6" />
                    <div className="hex-deco absolute top-[10%] right-[8%] w-12 h-12 bg-yellow-400/8" />

                    {/* Środkowa warstwa */}
                    <div className="hex-deco absolute top-[50%] left-[5%] w-14 h-14 bg-yellow-400/7" />
                    <div className="hex-deco absolute top-[45%] left-[18%] w-8 h-8 bg-yellow-400/10" />
                    <div className="hex-deco absolute top-[55%] left-[25%] w-6 h-6 bg-yellow-400/5" />
                    <div className="hex-deco absolute top-[50%] right-[5%] w-14 h-14 bg-yellow-400/7" />
                    <div className="hex-deco absolute top-[45%] right-[18%] w-8 h-8 bg-yellow-400/10" />
                    <div className="hex-deco absolute top-[55%] right-[25%] w-6 h-6 bg-yellow-400/5" />

                    {/* Dolna warstwa */}
                    <div className="hex-deco absolute bottom-[10%] left-[8%] w-12 h-12 bg-yellow-400/8" />
                    <div className="hex-deco absolute bottom-[15%] left-[15%] w-10 h-10 bg-yellow-400/6" />
                    <div className="hex-deco absolute bottom-[12%] left-[24%] w-16 h-16 bg-yellow-400/12" />
                    <div className="hex-deco absolute bottom-[8%] left-[49%] w-8 h-8 bg-yellow-400/5" />
                    <div className="hex-deco absolute bottom-[12%] right-[24%] w-16 h-16 bg-yellow-400/12" />
                    <div className="hex-deco absolute bottom-[15%] right-[15%] w-10 h-10 bg-yellow-400/6" />
                    <div className="hex-deco absolute bottom-[10%] right-[8%] w-12 h-12 bg-yellow-400/8" />

                    {/* Linie dekoracyjne */}
                    <div className="absolute top-[20%] left-0 w-32 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
                    <div className="absolute top-[30%] right-0 w-32 h-px bg-gradient-to-l from-transparent via-yellow-400/20 to-transparent" />
                    <div className="absolute bottom-[20%] left-0 w-32 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
                    <div className="absolute bottom-[30%] right-0 w-32 h-px bg-gradient-to-l from-transparent via-yellow-400/20 to-transparent" />

                    {/* Małe punkty świetlne */}
                    <div className="absolute top-[25%] left-[12%] w-2 h-2 rounded-full bg-yellow-400/30 blur-sm" />
                    <div className="absolute top-[35%] right-[10%] w-2 h-2 rounded-full bg-yellow-400/30 blur-sm" />
                    <div className="absolute bottom-[25%] left-[20%] w-2 h-2 rounded-full bg-yellow-400/30 blur-sm" />
                    <div className="absolute bottom-[35%] right-[18%] w-2 h-2 rounded-full bg-yellow-400/30 blur-sm" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
                    <div className="relative flex items-center justify-center gap-3 sm:gap-4 mb-2">
                        <h2 
                            className="text-3xl sm:text-4xl font-bold text-center"
                            data-tina-field={data.services.heading}
                        >
                            {data.services.heading}
                        </h2>
                    </div>
                    <div className="mt-6 sm:mt-10 relative z-10">
                        {/* Mobile - vertical stack */}
                        <div className="sm:hidden flex flex-col items-center gap-6">
                            {services.map((item, i) => renderHex(item, i, i))}
                        </div>

                        {/* Desktop - honeycomb layout */}
                        <div className="hidden sm:block">
                            {/* Górny rząd - 3 heksagony wyśrodkowane */}
                            <div className="flex items-center justify-center gap-1 sm:gap-1.5 lg:gap-2 mb-[-6.5rem] sm:mb-[-7rem] lg:mb-[-7.5rem]">
                                {rowTop.map((item, i) => {
                                    const globalIndex = services.findIndex(s => s === item);
                                    return renderHex(item, i, globalIndex);
                                })}
                            </div>

                            {/* Dolny rząd - 2 heksagony przesunięte (z offsetem po bokach) */}
                            {rowBottom.length > 0 && (
                                <div className="flex items-center justify-center gap-1 sm:gap-1.5 lg:gap-2">
                                    {rowBottom.length === 2 ? (
                                        <>
                                            <div className="w-[14rem] sm:w-[15rem] lg:w-[16rem]" />
                                            {rowBottom.map((item, i) => {
                                                const globalIndex = services.findIndex(s => s === item);
                                                return renderHex(item, i, globalIndex);
                                            })}
                                            <div className="w-[14rem] sm:w-[15rem] lg:w-[16rem]" />
                                        </>
                                    ) : (
                                        rowBottom.map((item, i) => {
                                            const globalIndex = services.findIndex(s => s === item);
                                            return renderHex(item, i, globalIndex);
                                        })
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal z opisem usługi */}
            {selectedService !== null && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
                    onClick={() => setSelectedService(null)}
                >
                    <div
                        className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#1a1a1a] to-[#0e0e0e] ring-2 ring-yellow-400/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_20px_80px_-20px_rgba(250,204,21,0.3)] animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Przycisk zamknięcia */}
                        <button
                            onClick={() => setSelectedService(null)}
                            className="sticky top-0 float-right w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors z-10 mb-2"
                            aria-label="Zamknij"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Ikona usługi */}
                        <div className="flex justify-center mb-4 sm:mb-6 clear-both">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 relative">
                                <Image
                                    src={encodeURI(services[selectedService].image)}
                                    alt={services[selectedService].alt}
                                    width={256}
                                    height={256}
                                    className="w-full h-full object-contain drop-shadow-[0_8px_22px_rgba(250,204,21,0.4)]"
                                />
                            </div>
                        </div>

                        {/* Tytuł */}
                        <h2 
                            className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-yellow-400 mb-3 sm:mb-4 px-2"
                            data-tina-field={data.services.items[selectedService].title}
                        >
                            {services[selectedService].title}
                        </h2>

                        {/* Opis */}
                        <div 
                            className="text-white/80 text-sm sm:text-base leading-relaxed whitespace-pre-line text-left sm:text-center px-2 mb-6 sm:mb-8"
                            data-tina-field={data.services.items[selectedService].description}
                        >
                            {services[selectedService].description}
                        </div>

                        {/* Przycisk kontakt */}
                        <div className="flex justify-center px-2">
                            <a
                                href="#kontakt"
                                onClick={() => setSelectedService(null)}
                                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-lg transition-colors text-sm sm:text-base w-full sm:w-auto"
                            >
                                Umów się na wizytę
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
