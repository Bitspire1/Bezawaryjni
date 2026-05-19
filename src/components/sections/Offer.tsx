"use client";

import { tinaField } from "tinacms/dist/react";
import { useIsPreview } from "@/hooks/usePreviewHref";
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
    const isPreview = useIsPreview();
    const kontaktHref = isPreview ? "/preview#kontakt" : "#kontakt";
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
        <div key={idx} className="relative w-56 sm:w-60 lg:w-64">
            <button
                onClick={() => setSelectedService(globalIndex)}
                className="hex group relative w-full cursor-pointer transition-transform duration-300 ease-out will-change-transform hover:-translate-y-1.5 active:-translate-y-1"
                style={{ aspectRatio: "1 / 1" }}
                aria-label={`Zobacz szczegóły: ${item.title}`}
                data-tina-field={tinaField(data.services.items[globalIndex], "title")}
            >
                <div className="absolute inset-0 rounded-[2px] bg-yellow-400 shadow-[0_8px_26px_-12px_rgba(250,204,21,0.45)] transition-shadow duration-300 group-hover:shadow-[0_16px_44px_-14px_rgba(250,204,21,0.6)]" />
                <div className="hex absolute inset-[8px] overflow-hidden bg-gradient-to-b from-[#151515] to-[#0e0e0e] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
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
                                className="pointer-events-none aspect-square h-auto w-full object-contain drop-shadow-[0_8px_22px_rgba(250,204,21,0.3)] transition-transform duration-300 ease-out select-none group-hover:scale-[1.06]"
                            />
                        </div>
                    </div>
                </div>
            </button>
        </div>
    );

    return (
        <>
            <section
                id="uslugi"
                className="relative overflow-hidden bg-[#0b0b0b] py-12 text-white sm:py-16 lg:py-20"
            >
                <div aria-hidden className="deco-dots pointer-events-none absolute inset-0" />
                <div aria-hidden className="deco-vignette pointer-events-none absolute inset-0" />

                {/* Heksagony dla mobile - równomiernie rozłożone */}
                <div className="pointer-events-none absolute inset-0 z-0 md:hidden">
                    <div className="hex-deco absolute top-[8%] left-[8%] h-8 w-8 bg-yellow-400/10" />
                    <div className="hex-deco absolute top-[8%] right-[8%] h-8 w-8 bg-yellow-400/10" />
                    <div className="hex-deco absolute top-[50%] left-[5%] h-6 w-6 bg-yellow-400/8" />
                    <div className="hex-deco absolute top-[50%] right-[5%] h-6 w-6 bg-yellow-400/8" />
                    <div className="hex-deco absolute bottom-[8%] left-[8%] h-8 w-8 bg-yellow-400/10" />
                    <div className="hex-deco absolute right-[8%] bottom-[8%] h-8 w-8 bg-yellow-400/10" />
                    {/* Linie dekoracyjne */}
                    <div className="absolute top-[15%] left-0 h-px w-20 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
                    <div className="absolute right-0 bottom-[15%] h-px w-20 bg-gradient-to-l from-transparent via-yellow-400/20 to-transparent" />
                </div>

                {/* Heksagony dla desktop - równomierna siatka */}
                <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
                    {/* Górna warstwa */}
                    <div className="hex-deco absolute top-[10%] left-[8%] h-12 w-12 bg-yellow-400/8" />
                    <div className="hex-deco absolute top-[15%] left-[15%] h-10 w-10 bg-yellow-400/6" />
                    <div className="hex-deco absolute top-[8%] left-[49%] h-8 w-8 bg-yellow-400/5" />
                    <div className="hex-deco absolute top-[15%] right-[15%] h-10 w-10 bg-yellow-400/6" />
                    <div className="hex-deco absolute top-[10%] right-[8%] h-12 w-12 bg-yellow-400/8" />

                    {/* Środkowa warstwa */}
                    <div className="hex-deco absolute top-[50%] left-[5%] h-14 w-14 bg-yellow-400/7" />
                    <div className="hex-deco absolute top-[45%] left-[18%] h-8 w-8 bg-yellow-400/10" />
                    <div className="hex-deco absolute top-[55%] left-[25%] h-6 w-6 bg-yellow-400/5" />
                    <div className="hex-deco absolute top-[50%] right-[5%] h-14 w-14 bg-yellow-400/7" />
                    <div className="hex-deco absolute top-[45%] right-[18%] h-8 w-8 bg-yellow-400/10" />
                    <div className="hex-deco absolute top-[55%] right-[25%] h-6 w-6 bg-yellow-400/5" />

                    {/* Dolna warstwa */}
                    <div className="hex-deco absolute bottom-[10%] left-[8%] h-12 w-12 bg-yellow-400/8" />
                    <div className="hex-deco absolute bottom-[15%] left-[15%] h-10 w-10 bg-yellow-400/6" />
                    <div className="hex-deco absolute bottom-[12%] left-[24%] h-16 w-16 bg-yellow-400/12" />
                    <div className="hex-deco absolute bottom-[8%] left-[49%] h-8 w-8 bg-yellow-400/5" />
                    <div className="hex-deco absolute right-[24%] bottom-[12%] h-16 w-16 bg-yellow-400/12" />
                    <div className="hex-deco absolute right-[15%] bottom-[15%] h-10 w-10 bg-yellow-400/6" />
                    <div className="hex-deco absolute right-[8%] bottom-[10%] h-12 w-12 bg-yellow-400/8" />

                    {/* Linie dekoracyjne */}
                    <div className="absolute top-[20%] left-0 h-px w-32 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
                    <div className="absolute top-[30%] right-0 h-px w-32 bg-gradient-to-l from-transparent via-yellow-400/20 to-transparent" />
                    <div className="absolute bottom-[20%] left-0 h-px w-32 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
                    <div className="absolute right-0 bottom-[30%] h-px w-32 bg-gradient-to-l from-transparent via-yellow-400/20 to-transparent" />

                    {/* Małe punkty świetlne */}
                    <div className="absolute top-[25%] left-[12%] h-2 w-2 rounded-full bg-yellow-400/30 blur-sm" />
                    <div className="absolute top-[35%] right-[10%] h-2 w-2 rounded-full bg-yellow-400/30 blur-sm" />
                    <div className="absolute bottom-[25%] left-[20%] h-2 w-2 rounded-full bg-yellow-400/30 blur-sm" />
                    <div className="absolute right-[18%] bottom-[35%] h-2 w-2 rounded-full bg-yellow-400/30 blur-sm" />
                </div>
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 md:text-left lg:px-8">
                    <div className="relative mb-2 flex items-center justify-center gap-3 sm:gap-4">
                        <h2
                            className="text-center text-3xl font-bold sm:text-4xl"
                            data-tina-field={tinaField(data.services, "heading")}
                        >
                            {data.services.heading}
                        </h2>
                    </div>
                    <div className="relative z-10 mt-6 sm:mt-10">
                        {/* Mobile - vertical stack */}
                        <div className="flex flex-col items-center gap-6 sm:hidden">
                            {services.map((item, i) => renderHex(item, i, i))}
                        </div>

                        {/* Desktop - honeycomb layout */}
                        <div className="hidden sm:block">
                            {/* Górny rząd - 3 heksagony wyśrodkowane */}
                            <div className="mb-[-6.5rem] flex items-center justify-center gap-1 sm:mb-[-7rem] sm:gap-1.5 lg:mb-[-7.5rem] lg:gap-2">
                                {rowTop.map((item, i) => {
                                    const globalIndex = services.findIndex((s) => s === item);
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
                                                const globalIndex = services.findIndex(
                                                    (s) => s === item,
                                                );
                                                return renderHex(item, i, globalIndex);
                                            })}
                                            <div className="w-[14rem] sm:w-[15rem] lg:w-[16rem]" />
                                        </>
                                    ) : (
                                        rowBottom.map((item, i) => {
                                            const globalIndex = services.findIndex(
                                                (s) => s === item,
                                            );
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
                    className="animate-in fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-2 backdrop-blur-sm duration-300 sm:p-4"
                    onClick={() => setSelectedService(null)}
                >
                    <div
                        className="animate-in zoom-in-95 relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-gradient-to-b from-[#1a1a1a] to-[#0e0e0e] p-4 shadow-[0_20px_80px_-20px_rgba(250,204,21,0.3)] ring-2 ring-yellow-400/30 duration-300 sm:rounded-2xl sm:p-6 md:p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Przycisk zamknięcia */}
                        <button
                            onClick={() => setSelectedService(null)}
                            className="sticky top-0 z-10 float-right mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white sm:h-10 sm:w-10"
                            aria-label="Zamknij"
                        >
                            <svg
                                className="h-4 w-4 sm:h-5 sm:w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* Ikona usługi */}
                        <div className="clear-both mb-4 flex justify-center sm:mb-6">
                            <div className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24">
                                <Image
                                    src={encodeURI(services[selectedService].image)}
                                    alt={services[selectedService].alt}
                                    width={256}
                                    height={256}
                                    className="h-full w-full object-contain drop-shadow-[0_8px_22px_rgba(250,204,21,0.4)]"
                                />
                            </div>
                        </div>

                        {/* Tytuł */}
                        <h2
                            className="mb-3 px-2 text-center text-xl font-bold text-yellow-400 sm:mb-4 sm:text-2xl md:text-3xl"
                            data-tina-field={tinaField(
                                data.services.items[selectedService],
                                "title",
                            )}
                        >
                            {services[selectedService].title}
                        </h2>

                        {/* Opis */}
                        <div
                            className="mb-6 px-2 text-left text-sm leading-relaxed whitespace-pre-line text-white/80 sm:mb-8 sm:text-center sm:text-base"
                            data-tina-field={tinaField(
                                data.services.items[selectedService],
                                "description",
                            )}
                        >
                            {services[selectedService].description}
                        </div>

                        {/* Przycisk kontakt */}
                        <div className="flex justify-center px-2">
                            <a
                                href={kontaktHref}
                                onClick={() => setSelectedService(null)}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-yellow-300 sm:w-auto sm:px-6 sm:py-3 sm:text-base"
                            >
                                Umów się na wizytę
                                <svg
                                    className="h-4 w-4 sm:h-5 sm:w-5"
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
                </div>
            )}
        </>
    );
}
