"use client";
import { useEffect, useState } from "react";
import { policyHref } from "@/lib/paths";
import { CONSENT_COOKIE, Consent, defaultConsent, setConsentCookie, getConsent } from "@/lib/cookies";

// Consent is imported from lib/cookies

export default function CookieConsent() {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [consent, setConsent] = useState<Consent>(defaultConsent);

    useEffect(() => {
        setMounted(true);
        try {
            // Prefer cookie (new storage)
            const c = getConsent();
            if (c) {
                setConsent(c);
                return;
            }

            // Backward-compatibility: migrate from localStorage if present
            const legacy = typeof window !== "undefined" ? localStorage.getItem(CONSENT_COOKIE) : null;
            if (legacy) {
                try {
                    const parsed = JSON.parse(legacy) as Consent;
                    if (parsed) {
                        persist(parsed);
                        return;
                    }
                } catch {
                    // ignore
                }
            }

            // Nothing saved yet → show banner
            setOpen(true);
        } catch {
            setOpen(true);
        }
    }, []);

    const acceptAll = () => {
        const all: Consent = { necessary: true, analytics: true, functional: true };
        persist(all);
    };

    const acceptNecessary = () => {
        const nec: Consent = { necessary: true, analytics: false, functional: false };
        persist(nec);
    };

    const persist = (value: Consent) => {
        // 1 year, lax, secure in production, available site-wide
        setConsentCookie(value);
        setConsent(value);
        setOpen(false);
    };

    if (!mounted || !open) return null;

    return (
        <div className="fixed inset-x-0 bottom-0 z-50" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0px)" }}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4">
                <div className="rounded-xl bg-[#111] ring-1 ring-white/10 text-white p-4 sm:p-5 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)]">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="text-sm text-white/80">
                            Używamy plików cookies w celach niezbędnych oraz – za Twoją zgodą – analitycznych
                            i funkcjonalnych. Szczegóły znajdziesz w
                            <a href={policyHref("cookies")} className="link-visible text-yellow-400 hover:text-yellow-300 ml-1">Polityce cookies</a>.
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <button onClick={acceptNecessary} className="rounded-md ring-1 ring-white/20 px-3 py-2 text-sm hover:bg-white/10 w-full sm:w-auto">
                                Tylko niezbędne
                            </button>
                            <button onClick={acceptAll} className="rounded-md bg-yellow-400 text-black font-semibold px-3 py-2 text-sm hover:bg-yellow-300 w-full sm:w-auto">
                                Akceptuję wszystkie
                            </button>
                            <button onClick={() => persist(consent)} className="rounded-md ring-1 ring-white/20 px-3 py-2 text-sm hover:bg-white/10 w-full sm:w-auto">
                                Zapisz wybór
                            </button>
                        </div>
                    </div>
                    <div className="mt-3 flex items-center gap-3 text-xs text-white/70">
                        <label className="inline-flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked
                                readOnly
                                className="accent-yellow-400"
                            />
                            Niezbędne
                        </label>
                        <label className="inline-flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={consent.analytics}
                                onChange={(e) => setConsent((c) => ({ ...c, analytics: e.target.checked }))}
                                className="accent-yellow-400"
                            />
                            Analityczne
                        </label>
                        <label className="inline-flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={consent.functional}
                                onChange={(e) => setConsent((c) => ({ ...c, functional: e.target.checked }))}
                                className="accent-yellow-400"
                            />
                            Funkcjonalne
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
