import { getCookie, setCookie } from "cookies-next";
import type { OptionsType } from "cookies-next";

export type Consent = {
    necessary: boolean;
    analytics: boolean;
    functional: boolean;
};

export const CONSENT_COOKIE = "bzwry_cookies_consent_v1";

export const defaultConsent: Consent = {
    necessary: true,
    analytics: false,
    functional: false,
};

// Forward-compatible options type accepted by cookies-next (supports req/res or cookies store)
type Ctx = OptionsType | undefined;

export function getConsent(ctx?: Ctx): Consent | null {
    try {
        const raw = getCookie(CONSENT_COOKIE, ctx);
        if (!raw) return null;
        const parsed = JSON.parse(String(raw)) as Consent;
        if (typeof parsed?.necessary === "boolean") return parsed;
        return null;
    } catch {
        return null;
    }
}

export function setConsentCookie(value: Consent, ctx?: Ctx) {
    setCookie(CONSENT_COOKIE, JSON.stringify(value), {
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
        secure: typeof window !== "undefined" ? window.location.protocol === "https:" : true,
        path: "/",
        ...(ctx ?? {}),
    });
}

export function hasAnalyticsConsent(ctx?: Ctx): boolean {
    const c = getConsent(ctx);
    return !!c?.analytics;
}
