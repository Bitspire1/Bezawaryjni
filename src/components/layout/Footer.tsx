"use client";

import Link from "next/link";
import Image from "next/image";
import { useIsPreview } from "@/hooks/usePreviewHref";

interface FooterProps {
    footerData?: {
        description?: string;
        phone?: string;
        email?: string;
        hoursWeekday?: string;
        hoursWeekend?: string;
    };

    page?: any;

    field?: (page: any, section: string, fieldName: string) => string | undefined;
}

export default function Footer({ footerData, page, field }: FooterProps) {
    const isPreview = useIsPreview();
    const resolveHref = (href: string): string => {
        if (!isPreview) return href;
        if (href === "/") return "/preview";
        if (href.startsWith("/#")) return `/preview#${href.slice(2)}`;
        if (href.startsWith("/")) return `/preview${href}`;
        return href;
    };
    const description =
        footerData?.description ||
        "Mechanika pojazdowa, diagnostyka komputerowa i serwis eksploatacyjny. Jakość, terminowość, przejrzysta wycena.";
    const phone = footerData?.phone || "+48 784 669 601";
    const email = footerData?.email || "kontakt@bezawaryjni.pl";
    const hoursWeekday = footerData?.hoursWeekday || "Pon – Pt: 7:00 – 19:00";
    const hoursWeekend = footerData?.hoursWeekend || "Sob – Niedz: nieczynne";

    const year = new Date().getFullYear();
    return (
        <footer className="bg-[#0b0b0b] text-white">
            <div className="h-px bg-linear-to-r from-transparent via-yellow-400/20 to-transparent"></div>
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-3">
                        <Link
                            href={resolveHref("/")}
                            aria-label="Bezawaryjni – strona główna"
                            className="inline-flex"
                        >
                            <Image
                                src="/favicon.svg"
                                alt="Bezawaryjni AutoSerwis"
                                width={160}
                                height={36}
                                className="h-8 w-auto"
                            />
                        </Link>
                        <p
                            className="max-w-xs text-sm text-white/70"
                            data-tina-field={field?.(page, "footer", "description")}
                        >
                            {description}
                        </p>
                    </div>

                    <nav aria-label="Nawigacja">
                        <p className="text-sm font-semibold text-yellow-400">Nawigacja</p>
                        <ul className="mt-3 space-y-2 text-sm">
                            {[
                                { label: "Strona Główna", href: "/" },
                                { label: "Usługi", href: "/#uslugi" },
                                { label: "Dlaczego my", href: "/#nasza-firma" },
                                { label: "FAQ", href: "/#faq" },
                                { label: "Kontakt", href: "/#kontakt" },
                            ].map((i) => (
                                <li key={i.label}>
                                    <Link
                                        href={resolveHref(i.href)}
                                        className="hover:text-yellow-400"
                                    >
                                        {i.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <p className="text-sm font-semibold text-yellow-400">Kontakt</p>
                        <ul className="mt-3 space-y-2 text-sm">
                            <li>
                                <a
                                    className="hover:text-yellow-400"
                                    href={`tel:${phone.replace(/\s/g, "")}`}
                                    data-tina-field={field?.(page, "footer", "phone")}
                                >
                                    {phone}
                                </a>
                            </li>
                            <li>
                                <a
                                    className="hover:text-yellow-400"
                                    href={`mailto:${email}`}
                                    data-tina-field={field?.(page, "footer", "email")}
                                >
                                    {email}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-yellow-400">Godziny otwarcia</p>
                        <ul className="mt-3 space-y-2 text-sm text-white/80">
                            <li data-tina-field={field?.(page, "footer", "hoursWeekday")}>
                                {hoursWeekday}
                            </li>
                            <li data-tina-field={field?.(page, "footer", "hoursWeekend")}>
                                {hoursWeekend}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/5 py-4">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-xs text-white/60 sm:flex-row sm:px-6 lg:px-8">
                    <div>© {year} Bezawaryjni AutoSerwis. Wszelkie prawa zastrzeżone.</div>
                    <div className="flex items-center gap-4">
                        <Link
                            href={resolveHref("/polityka-prywatnosci")}
                            className="link-visible hover:text-yellow-400"
                        >
                            Polityka prywatności
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
