"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import LightboxImage from "@/components/LightboxImage";
import CountUp from "@/components/CountUp";
import ContactForm, { MapEmbed } from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TinaData = { data: any; variables: Record<string, unknown>; query: string } | null;

type DefaultData = {
    hero: {
        tagline: string;
        heading: string;
        description: string;
    };
    services: {
        heading: string;
        items: Array<{ title: string; image: string; alt: string; description: string }>;
    };
    workshop: {
        heading: string;
        description: string;
        features: Array<{ text: string }>;
        steps: Array<{ text: string }>;
    };
    lifts: {
        badge: string;
        heading: string;
        description: string;
    };
    about: {
        heading: string;
        description1: string;
        description2: string;
        stats: Array<{ value: string; label: string }>;
        features: Array<{ text: string }>;
    };
    contact: {
        heading: string;
        description: string;
        phone: string;
        email: string;
    };
    faq: {
        heading: string;
        items: Array<{ question: string; answer: string }>;
    };
    footer: {
        description: string;
        phone: string;
        email: string;
        hoursWeekday: string;
        hoursWeekend: string;
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FieldFn = (page: any, section: string, field: string) => string | undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FAQSection({ content, page, field }: { content: any; page: any; field: any }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-12 bg-[#0b0b0b] text-white" data-animate>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-center wrap-balance mb-8 text-yellow-400" data-tina-field={field(page, 'faq', 'heading')}>
                    {content.faq.heading}
                </h2>
                <div className="space-y-4">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {content.faq.items.map((item: any, i: number) => {
                        const faqItem = page?.faq?.items?.[i];
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={i}
                                className={`rounded-lg bg-gradient-to-b from-[#121212] to-[#0e0e0e] ring-1 ring-white/10 hover:ring-yellow-400/30 transition-all duration-300 ${isOpen ? 'ring-yellow-400/40' : ''}`}
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    className="w-full text-left p-4 cursor-pointer font-semibold text-white/90 flex items-start gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/50"
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-answer-${i}`}
                                >
                                    <span className={`mt-1 text-yellow-400 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>▸</span>
                                    <span className="flex-1" data-tina-field={faqItem ? tinaField(faqItem, 'question') : undefined}>
                                        {item.question}
                                    </span>
                                </button>
                                <div
                                    id={`faq-answer-${i}`}
                                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                                >
                                    <div className="overflow-hidden">
                                        <p
                                            className={`ml-6 mr-4 pb-4 text-white/70 transition-all duration-500 ease-out ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'}`}
                                            data-tina-field={faqItem ? tinaField(faqItem, 'answer') : undefined}
                                        >
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default function PageClient({ tinaData, defaultData }: { tinaData: TinaData; defaultData: DefaultData }) {
    const [selectedService, setSelectedService] = useState<number | null>(null);

    // Use Tina only if we have data
    let content = defaultData;
    let page = null;
    let field: FieldFn = () => undefined;

    if (tinaData) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { data } = useTina({ query: tinaData.query, variables: tinaData.variables, data: tinaData.data });
        page = data?.page;

        if (page) {
            content = {
                hero: {
                    tagline: page.hero?.tagline || "",
                    heading: page.hero?.heading || "",
                    description: page.hero?.description || "",
                },
                services: {
                    heading: page.services?.heading || "",
                    items: page.services?.items || [],
                },
                workshop: {
                    heading: page.workshop?.heading || "",
                    description: page.workshop?.description || "",
                    features: page.workshop?.features || [],
                    steps: page.workshop?.steps || [],
                },
                lifts: {
                    badge: page.lifts?.badge || "",
                    heading: page.lifts?.heading || "",
                    description: page.lifts?.description || "",
                },
                about: {
                    heading: page.about?.heading || "",
                    description1: page.about?.description1 || "",
                    description2: page.about?.description2 || "",
                    stats: page.about?.stats || [],
                    features: page.about?.features || [],
                },
                contact: {
                    heading: page.contact?.heading || "",
                    description: page.contact?.description || "",
                    phone: page.contact?.phone || "",
                    email: page.contact?.email || "",
                },
                faq: {
                    heading: page.faq?.heading || "",
                    items: page.faq?.items || [],
                },
                footer: {
                    description: page.footer?.description || "",
                    phone: page.footer?.phone || "",
                    email: page.footer?.email || "",
                    hoursWeekday: page.footer?.hoursWeekday || "",
                    hoursWeekend: page.footer?.hoursWeekend || "",
                },
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            field = (pg: any, section: string, fieldName: string) => {
                if (!pg || !pg[section]) return undefined;
                return tinaField(pg[section], fieldName);
            };
        }
    }

    const services = content.services.items;
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

    const renderHex = (item: typeof services[number], idx: number, globalIndex: number) => (
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
                            <Image src={encodeURI(item.image)} alt={item.alt} width={512} height={512} draggable={false} loading="lazy"
                                className="w-full h-auto aspect-square object-contain select-none pointer-events-none drop-shadow-[0_8px_22px_rgba(250,204,21,0.3)] transition-transform duration-300 ease-out group-hover:scale-[1.06]" />
                        </div>
                    </div>
                </div>
            </button>
        </div>
    );

    return (
        <main className="min-h-screen bg-black">
            {/* HERO */}
            <section id="home" className="relative isolate">
                <picture>
                    <source srcSet="/yellow-car.avif" type="image/avif" />
                    <img src="/hero-garage.jpg" alt="" aria-hidden decoding="async" loading="eager" fetchPriority="high"
                        className="absolute inset-0 -z-10 h-full w-full object-cover" />
                </picture>
                <div className="pointer-events-none absolute inset-0 -z-10 bg-black/65" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-36 min-h-[60vh] sm:min-h-[70vh] flex flex-col justify-center text-white text-center md:text-left" data-animate>
                    <p className="text-yellow-400 font-semibold tracking-widest uppercase text-sm mb-4" data-tina-field={field(page, 'hero', 'tagline')}>
                        {content.hero.tagline}
                    </p>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 wrap-balance text-yellow-400" data-tina-field={field(page, 'hero', 'heading')}>
                        {content.hero.heading}
                    </h1>
                    <p className="text-base sm:text-lg text-white/90 max-w-2xl mb-8 mx-auto md:mx-0" data-tina-field={field(page, 'hero', 'description')}>
                        {content.hero.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <a href="https://app.autonova.com/pl/c/LjiDS" target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-yellow-400 text-black font-semibold px-5 py-3 hover:bg-yellow-300 transition w-full sm:w-auto">
                            Umów wizytę
                        </a>
                        <button
                            onClick={() => {
                                const element = document.getElementById('nasza-firma');
                                if (element) {
                                    const yOffset = -100;
                                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                    window.scrollTo({ top: y, behavior: 'smooth' });
                                }
                            }}
                            className="inline-flex items-center justify-center gap-2 rounded-md ring-1 ring-white/40 px-5 py-3 hover:bg-white/10 transition w-full sm:w-auto"
                        >
                            Nasza firma
                        </button>
                    </div>
                </div>
            </section>

            {/* USŁUGI */}
            <section id="uslugi" className="relative py-12 sm:py-16 lg:py-20 bg-[#0b0b0b] text-white overflow-hidden" data-animate>
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
                        <h2 className="text-3xl sm:text-4xl font-bold text-center text-yellow-400" data-tina-field={field(page, 'services', 'heading')}>
                            {content.services.heading}
                        </h2>
                    </div>
                    <div className="mt-6 sm:mt-10 relative z-10" data-animate data-animate-delay="100ms">
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

            {/* Gradient transition */}
            <div className="h-16 sm:h-24 bg-gradient-to-b from-[#0b0b0b] via-[#060606] to-[#0b0b0b]"></div>

            {/* NOWE PODNOŚNIKI */}
            <section id="nowe-podnosniki" className="py-10 sm:py-14 lg:py-16 bg-[#0b0b0b] text-white overflow-hidden" data-animate>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <span className="inline-flex items-center rounded-full bg-yellow-400/10 ring-1 ring-yellow-400/30 text-yellow-300 px-3 py-1 text-xs font-semibold uppercase tracking-wider mx-auto lg:mx-0"
                                data-tina-field={field(page, 'lifts', 'badge')}>
                                {content.lifts.badge}
                            </span>
                            <h2 className="mt-4 text-3xl sm:text-4xl font-bold wrap-balance text-yellow-400" data-tina-field={field(page, 'lifts', 'heading')}>
                                {content.lifts.heading}
                            </h2>
                            <p className="mt-4 text-base sm:text-lg text-white/80 max-w-prose mx-auto lg:mx-0" data-tina-field={field(page, 'lifts', 'description')}>
                                {content.lifts.description}
                            </p>
                            <div className="mt-6 flex justify-center lg:justify-start">
                                <a href="https://app.autonova.com/pl/c/LjiDS" target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 text-black font-semibold px-6 py-3 hover:bg-yellow-300 transition-all hover:shadow-lg hover:shadow-yellow-400/20">
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
                                        fallbackSrc="/podnosnik.png"
                                        alt="Podnośnik w warsztacie Bezawaryjni"
                                        width={1280}
                                        height={720}
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

            {/* DOSTAWCA CZĘŚCI */}
            <section id="dostawca-czesci" className="py-12 sm:py-16 bg-black text-white" data-animate>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 sm:mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
                            Oryginalne części od sprawdzonych dostawców
                        </h2>
                        <p className="text-white/80 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
                            Pracujemy wyłącznie na wysokiej jakości częściach od Inter Cars - lidera na rynku dystrybucji części samochodowych.
                            Dzięki temu gwarantujemy niezawodność i trwałość każdej naprawy.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                        <a
                            href="https://www.intercars.com.pl/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/98 rounded-xl p-8 sm:p-10 ring-1 ring-white/20 shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300 hover:-translate-y-1 hover:ring-yellow-400/30 flex items-center justify-center group"
                            aria-label="Odwiedź stronę Inter Cars"
                        >
                            <Image
                                src="/logo-intercars.webp"
                                alt="Inter Cars - Nasz dostawca części"
                                width={220}
                                height={73}
                                className="h-14 sm:h-16 md:h-20 w-auto group-hover:scale-105 transition-transform duration-300"
                            />
                        </a>
                        <a
                            href="https://www.autopartner.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/98 rounded-xl p-8 sm:p-10 ring-1 ring-white/20 shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300 hover:-translate-y-1 hover:ring-yellow-400/30 flex items-center justify-center group"
                            aria-label="Odwiedź stronę AutoPartner"
                        >
                            <Image
                                src="/autopartner.svg"
                                alt="AutoPartner - Nasz dostawca części"
                                width={240}
                                height={73}
                                className="h-14 sm:h-16 md:h-20 w-auto group-hover:scale-105 transition-transform duration-300"
                            />
                        </a>
                    </div>
                </div>
            </section>

            {/* Gradient transition */}
            <div className="h-16 sm:h-24 bg-gradient-to-b from-black via-[#050505] to-[#0b0b0b]"></div>

            {/* NASZA FIRMA */}
            <section id="nasza-firma" className="py-12 bg-[#0b0b0b] text-white" data-animate>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                    <div className="md:col-span-2 text-center md:text-left">
                        <h2 className="text-3xl sm:text-4xl font-bold wrap-balance text-yellow-400" data-tina-field={field(page, 'about', 'heading')}>
                            {content.about.heading}
                        </h2>
                        <p className="mt-3 text-white/80 max-w-prose mx-auto md:mx-0" data-tina-field={field(page, 'about', 'description1')}>
                            {content.about.description1}
                        </p>
                        <p className="mt-3 text-white/70 max-w-prose mx-auto md:mx-0" data-tina-field={field(page, 'about', 'description2')}>
                            {content.about.description2}
                        </p>

                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
                            {content.about.stats.map((stat, i) => {
                                const statItem = page?.about?.stats?.[i];
                                return (
                                    <div key={i} className="rounded-lg bg-[#111] ring-1 ring-white/10 p-3.5 sm:p-4 text-center" data-tina-field={statItem ? tinaField(statItem, 'value') : undefined}>
                                        <div className="text-2xl sm:text-3xl font-extrabold text-yellow-400 leading-none tracking-tight">
                                            {stat.value.includes('/') ? (
                                                <CountUp end={parseFloat(stat.value)} decimals={1} suffix={stat.value.match(/\/.*/)?.[0]} duration={1.2} />
                                            ) : stat.value.includes('+') ? (
                                                <CountUp end={parseInt(stat.value)} suffix="+" duration={1.2} />
                                            ) : (
                                                <CountUp end={parseInt(stat.value)} duration={1.2} />
                                            )}
                                        </div>
                                        <div className="pt-1 text-[11px] sm:text-xs text-white/75 leading-snug wrap-balance" data-tina-field={statItem ? tinaField(statItem, 'label') : undefined}>
                                            {stat.label}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="rounded-xl p-6 bg-gradient-to-b from-[#121212] to-[#0e0e0e] ring-1 ring-white/10">
                        <h3 className="font-semibold text-yellow-400">Co nas wyróżnia</h3>
                        <ul className="mt-3 space-y-2 text-white/80">
                            {content.about.features.map((feat, i) => {
                                const featureItem = page?.about?.features?.[i];
                                return (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-yellow-400"></span>
                                        <span data-tina-field={featureItem ? tinaField(featureItem, 'text') : undefined}>
                                            {feat.text}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Gradient transition */}
            <div className="h-16 sm:h-24 bg-gradient-to-b from-[#0b0b0b] via-[#050505] to-black"></div>

            {/* KONTAKT */}
            <section id="kontakt" className="py-12 bg-black text-white" data-animate>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold wrap-balance text-center text-yellow-400" data-tina-field={field(page, 'contact', 'heading')}>
                        {content.contact.heading}
                    </h2>
                    <p className="text-white/70 mt-2 max-w-2xl mx-auto text-center" data-tina-field={field(page, 'contact', 'description')}>
                        {content.contact.description}
                    </p>

                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-[#121212] to-[#0e0e0e] ring-1 ring-white/10 p-4 sm:p-5 lg:col-span-2 transition-all duration-300 hover:-translate-y-1 hover:ring-yellow-400/30 hover:shadow-[0_12px_32px_-12px_rgba(250,204,21,0.35)]">
                            <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition duration-500" style={{
                                background: "radial-gradient(360px circle at 0% 0%, rgba(250,204,21,0.06), transparent 40%)",
                            }} />
                            <h3 className="relative text-base font-semibold text-yellow-400 text-center lg:text-left">Formularz kontaktowy</h3>
                            <div className="relative mt-3">
                                <ContactForm />
                            </div>
                        </div>

                        <div className="lg:col-span-1 space-y-4">
                            <a href={`tel:${content.contact.phone}`} className="group block rounded-lg ring-1 ring-white/10 bg-[#121212] px-4 py-3 hover:ring-yellow-400/30 hover:bg-[#151515] transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-md bg-yellow-400/10 text-yellow-400 ring-1 ring-yellow-400/30 flex items-center justify-center shrink-0">
                                        <PhoneIcon className="h-5 w-5" />
                                    </div>
                                    <div className="leading-tight">
                                        <div className="text-xs text-white/60">Zadzwoń</div>
                                        <div className="text-lg font-semibold tracking-tight text-white" data-tina-field={field(page, 'contact', 'phone')}>
                                            {content.contact.phone}
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <a href={`mailto:${content.contact.email}`} className="group block rounded-lg ring-1 ring-white/10 bg-[#121212] px-4 py-3 hover:ring-yellow-400/30 hover:bg-[#151515] transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-md bg-yellow-400/10 text-yellow-400 ring-1 ring-yellow-400/30 flex items-center justify-center shrink-0">
                                        <MailIcon className="h-5 w-5" />
                                    </div>
                                    <div className="leading-tight">
                                        <div className="text-xs text-white/60">Napisz maila</div>
                                        <div className="text-lg font-semibold tracking-tight text-white" data-tina-field={field(page, 'contact', 'email')}>
                                            {content.contact.email}
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <div className="relative overflow-hidden rounded-lg bg-[#121212] ring-1 ring-white/10 p-3 sm:p-4 transition-colors hover:ring-yellow-400/30">
                                <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition duration-500" style={{
                                    background: "radial-gradient(260px circle at 0% 0%, rgba(250,204,21,0.06), transparent 40%)",
                                }} />
                                <h3 className="relative text-sm font-semibold text-yellow-400">Mapa dojazdu</h3>
                                <div className="relative mt-2">
                                    <MapEmbed />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gradient transition */}
            <div className="h-16 sm:h-24 bg-gradient-to-b from-black via-[#050505] to-[#0b0b0b]"></div>

            {/* FAQ */}
            <FAQSection content={content} page={page} field={field} />

            <Footer footerData={content.footer} page={page} field={field} />

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
                                    src={encodeURI(content.services.items[selectedService].image)}
                                    alt={content.services.items[selectedService].alt}
                                    width={256}
                                    height={256}
                                    className="w-full h-full object-contain drop-shadow-[0_8px_22px_rgba(250,204,21,0.4)]"
                                />
                            </div>
                        </div>

                        {/* Tytuł */}
                        <h2
                            className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-yellow-400 mb-3 sm:mb-4 px-2"
                            data-tina-field={page?.services?.items?.[selectedService] ? tinaField(page.services.items[selectedService], 'title') : undefined}
                        >
                            {content.services.items[selectedService].title}
                        </h2>

                        {/* Opis */}
                        <div
                            className="text-white/80 text-sm sm:text-base leading-relaxed whitespace-pre-line text-left sm:text-center px-2 mb-6 sm:mb-8"
                            data-tina-field={page?.services?.items?.[selectedService] ? tinaField(page.services.items[selectedService], 'description') : undefined}
                        >
                            {content.services.items[selectedService].description}
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
        </main>
    );
}

// Icon components
function PhoneIcon({ className = "h-6 w-6" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C11.85 21 3 12.15 3 1a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.2 2.2z" />
        </svg>
    );
}

function MailIcon({ className = "h-6 w-6" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
            <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
    );
}
