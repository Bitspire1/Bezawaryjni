"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type NavItem = {
    label: string;
    href?: string;
    children?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
    { label: "Strona Główna", href: "/#home" },
    { label: "Samoobsługa", href: "/#samoobsluga" },
    { label: "Usługi", href: "/#uslugi" },
    { label: "Dlaczego my", href: "/#dlaczego" },
    { label: "FAQ", href: "/#faq" },
    { label: "Kontakt", href: "/#kontakt" },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);

    // Make the closed mobile menu non-focusable and non-interactive for a11y
    useEffect(() => {
        const el = mobileMenuRef.current as unknown as { inert?: boolean } | null;
        if (!el) return;
        // Apply the inert property when menu is closed; remove when open
        if (!mobileOpen) {
            el.inert = true;
        } else {
            // Some browsers require deleting the property to restore interaction
            delete el.inert;
        }
    }, [mobileOpen]);

    return (
        <header className="sticky top-0 z-50 shadow-lg">
            <div className="bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/85 text-white border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group" aria-label="Bezawaryjni – strona główna">
                        <Image
                            src="/logo/logo-bezawaryjni.svg"
                            alt="Bezawaryjni AutoSerwis"
                            width={260}
                            height={64}
                            priority
                            className="h-10 sm:h-12 xl:h-14 w-auto drop-shadow-[0_2px_8px_rgba(250,204,21,0.25)]"
                        />
                    </Link>

                    {/* Desktop nav centered in middle column */}
                    <div className="min-w-0 justify-self-stretch">
                        <ul className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 text-sm md:text-base xl:text-base overflow-x-auto no-scrollbar whitespace-nowrap px-1">
                            {navItems.map((item, idx) => (
                                <li
                                    key={item.label}
                                    className="relative"
                                    onMouseEnter={() => setOpenDropdown(idx)}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    {item.children ? (
                                        <div className="group/nav flex items-center gap-1.5 cursor-pointer hover:text-yellow-400 whitespace-nowrap">
                                            <span className="font-semibold relative after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-0 after:bg-yellow-400 after:transition-all after:duration-300 group-hover/nav:after:w-full whitespace-nowrap">{item.label}</span>
                                            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <Link href={item.href ?? "#"} className="group/nav font-semibold hover:text-yellow-400 relative after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-0 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full whitespace-nowrap">
                                            <span className="whitespace-nowrap">{item.label}</span>
                                        </Link>
                                    )}

                                    {/* dropdown */}
                                    {item.children && openDropdown === idx && (
                                        <div className="absolute left-0 mt-3 w-60 rounded-lg bg-[#111315] ring-1 ring-white/10 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.6)] p-2 z-50">
                                            {item.children.map((c) => (
                                                <Link
                                                    key={c.label}
                                                    href={c.href}
                                                    className="block rounded-md px-3.5 py-2.5 hover:bg-white/10"
                                                >
                                                    {c.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right side: hours + mobile button */}
                    <div className="flex items-center justify-self-end gap-2">
                        <div className="hidden 2xl:flex items-center gap-3 text-sm">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400/10 text-yellow-400 ring-1 ring-yellow-400/30">
                                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="9" />
                                    <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <div className="opacity-90 leading-tight">
                                <div className="uppercase text-[11px] sm:text-xs tracking-wider">Otwarte (Pon-Pt)</div>
                                <div className="font-semibold text-yellow-300 text-sm sm:text-base">7:00 - 19:00</div>
                            </div>
                        </div>
                        <button
                            className="lg:hidden inline-flex items-center justify-center rounded-md p-3 text-white hover:bg-white/10 transition-colors tap-44"
                            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-primary-nav"
                            onClick={() => setMobileOpen((v) => !v)}
                        >
                            <svg viewBox="0 0 24 24" className={`h-6 w-6 transition-transform duration-200 ${mobileOpen ? "rotate-90" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth="1.5">
                                {mobileOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu (below bar) with open/close animation */}
                <div
                    id="mobile-primary-nav"
                    ref={mobileMenuRef}
                    className={`lg:hidden px-4 sm:px-6 lg:px-8 space-y-1 text-base overflow-hidden transition-all duration-300 ${mobileOpen
                        ? "opacity-100 translate-y-0 max-h-96 py-2 ease-out"
                        : "opacity-0 -translate-y-2 max-h-0 py-0 pointer-events-none ease-in"
                        }`}
                    aria-hidden={!mobileOpen || undefined}
                >
                    {navItems.map((item) => (
                        <div key={item.label}>
                            {item.children ? (
                                <details className="group">
                                    <summary className="list-none flex items-center justify-between px-2.5 py-2.5 rounded hover:bg-white/10 cursor-pointer font-medium">
                                        <span>{item.label}</span>
                                        <span className="transition-transform group-open:rotate-180">▾</span>
                                    </summary>
                                    <div className="pl-3">
                                        {item.children.map((c) => (
                                            <Link
                                                key={c.label}
                                                href={c.href}
                                                className="block px-2.5 py-2.5 rounded hover:bg-white/10"
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                {c.label}
                                            </Link>
                                        ))}
                                    </div>
                                </details>
                            ) : (
                                <Link
                                    href={item.href ?? "#"}
                                    className="block px-2.5 py-2.5 rounded hover:bg-white/10 font-medium"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </header>
    );
}
