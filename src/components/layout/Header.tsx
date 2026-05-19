"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useIsPreview } from "@/hooks/usePreviewHref";

type NavItem = {
    label: string;
    href?: string;
    children?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
    { label: "Strona Główna", href: "/" },
    { label: "Usługi", href: "/#uslugi" },
    { label: "Dlaczego my", href: "/#nasza-firma" },
    { label: "FAQ", href: "/#faq" },
    { label: "Kontakt", href: "/#kontakt" },
    { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);
    const pathname = usePathname();
    const router = useRouter();
    const isPreview = useIsPreview();
    const homePathname = isPreview ? "/preview" : "/";

    // Obsługa scrollowania do sekcji po załadowaniu strony
    useEffect(() => {
        const hash = window.location.hash;
        if (hash && pathname === homePathname) {
            setTimeout(() => {
                const id = hash.substring(1);
                const element = document.getElementById(id);
                if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                    });
                }
            }, 100);
        }
    }, [pathname, homePathname]);

    const resolveHref = (href: string): string => {
        if (href === "/") return homePathname;
        if (href.startsWith("/#")) return isPreview ? `/preview#${href.slice(2)}` : href;
        if (href.startsWith("/")) return isPreview ? `/preview${href}` : href;
        return href;
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href === "/" || href.startsWith("/#")) {
            e.preventDefault();
            setMobileOpen(false);

            // If not on home, navigate there (with hash)
            if (pathname !== homePathname) {
                router.push(resolveHref(href));
                return;
            }

            if (href === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }

            // Scroll to section
            const id = href.substring(2);
            const element = document.getElementById(id);
            if (element) {
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        }
    };

    return (
        <header className="sticky top-0 z-50 shadow-lg">
            <div className="border-b border-white/5 bg-black/95 text-white backdrop-blur supports-backdrop-filter:bg-black/85">
                <div className="mx-auto grid h-16 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:h-20 sm:gap-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Link
                        href={homePathname}
                        className="group flex items-center gap-3"
                        aria-label="Bezawaryjni – strona główna"
                        onClick={(e) => handleNavClick(e, "/")}
                    >
                        <Image
                            src="/favicon.svg"
                            alt="Bezawaryjni AutoSerwis"
                            width={260}
                            height={64}
                            className="h-10 w-auto drop-shadow-[0_2px_8px_rgba(250,204,21,0.25)] sm:h-12 xl:h-14"
                        />
                    </Link>

                    {/* Desktop nav centered in middle column */}
                    <div className="min-w-0 justify-self-stretch">
                        <ul className="no-scrollbar hidden items-center justify-center gap-6 overflow-x-auto px-1 text-sm whitespace-nowrap md:text-base lg:flex xl:gap-8 xl:text-base">
                            {navItems.map((item, idx) => (
                                <li
                                    key={item.label}
                                    className="relative"
                                    onMouseEnter={() => setOpenDropdown(idx)}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    {item.children ? (
                                        <div className="group/nav flex cursor-pointer items-center gap-1.5 whitespace-nowrap hover:text-yellow-400">
                                            <span className="relative font-semibold whitespace-nowrap after:absolute after:-bottom-1 after:left-0 after:h-1 after:w-0 after:bg-yellow-400 after:transition-all after:duration-300 group-hover/nav:after:w-full">
                                                {item.label}
                                            </span>
                                            <svg
                                                className="h-4 w-4"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <Link
                                            href={resolveHref(item.href ?? "#")}
                                            className="group/nav relative font-semibold whitespace-nowrap after:absolute after:-bottom-1 after:left-0 after:h-1 after:w-0 after:bg-yellow-400 after:transition-all after:duration-300 hover:text-yellow-400 hover:after:w-full"
                                            onClick={(e) => handleNavClick(e, item.href ?? "#")}
                                        >
                                            <span className="whitespace-nowrap">{item.label}</span>
                                        </Link>
                                    )}

                                    {/* dropdown */}
                                    {item.children && openDropdown === idx && (
                                        <div className="absolute left-0 z-50 mt-3 w-60 rounded-lg bg-[#111315] p-2 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
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
                    <div className="flex items-center gap-2 justify-self-end">
                        <div className="hidden items-center gap-3 text-sm 2xl:flex">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400/10 text-yellow-400 ring-1 ring-yellow-400/30">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="h-5 w-5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <circle cx="12" cy="12" r="9" />
                                    <path
                                        d="M12 6v6l4 2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                            <div className="leading-tight opacity-90">
                                <div className="text-[11px] tracking-wider uppercase sm:text-xs">
                                    Otwarte (Pon-Pt)
                                </div>
                                <div className="text-sm font-semibold text-yellow-300 sm:text-base">
                                    7:00 - 19:00
                                </div>
                            </div>
                        </div>
                        <button
                            className="tap-44 inline-flex items-center justify-center rounded-md p-3 text-white transition-colors hover:bg-white/10 lg:hidden"
                            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-primary-nav"
                            onClick={() => setMobileOpen((v) => !v)}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className={`h-6 w-6 transition-transform duration-200 ${mobileOpen ? "rotate-90" : "rotate-0"}`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                {mobileOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu (below bar) with open/close animation */}
                <div
                    id="mobile-primary-nav"
                    ref={mobileMenuRef}
                    className={`space-y-1 overflow-hidden px-4 text-base transition-all duration-300 sm:px-6 lg:hidden lg:px-8 ${
                        mobileOpen
                            ? "max-h-96 translate-y-0 py-2 opacity-100 ease-out"
                            : "pointer-events-none max-h-0 -translate-y-2 py-0 opacity-0 ease-in"
                    }`}
                    aria-hidden={!mobileOpen || undefined}
                >
                    {navItems.map((item) => (
                        <div key={item.label}>
                            {item.children ? (
                                <details className="group">
                                    <summary className="flex cursor-pointer list-none items-center justify-between rounded px-2.5 py-2.5 font-medium hover:bg-white/10">
                                        <span>{item.label}</span>
                                        <span className="transition-transform group-open:rotate-180">
                                            ▾
                                        </span>
                                    </summary>
                                    <div className="pl-3">
                                        {item.children.map((c) => (
                                            <Link
                                                key={c.label}
                                                href={c.href}
                                                className="block rounded px-2.5 py-2.5 hover:bg-white/10"
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                {c.label}
                                            </Link>
                                        ))}
                                    </div>
                                </details>
                            ) : (
                                <Link
                                    href={resolveHref(item.href ?? "#")}
                                    className="block rounded px-2.5 py-2.5 font-medium hover:bg-white/10"
                                    onClick={(e) => handleNavClick(e, item.href ?? "#")}
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
