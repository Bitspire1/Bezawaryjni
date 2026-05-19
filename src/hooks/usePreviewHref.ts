"use client";

import { usePathname } from "next/navigation";

/**
 * Returns true when the page is rendered inside the TinaCMS iframe.
 * We detect this by checking if the current pathname starts with /preview.
 */
export function useIsPreview(): boolean {
    const pathname = usePathname();
    return pathname.startsWith("/preview");
}

/**
 * Transforms a regular site href to its /preview equivalent when inside TinaCMS iframe.
 *
 * Rules:
 *   "/"                → "/preview"
 *   "/#section"        → "/preview#section"
 *   "#section"         → "/preview#section"
 *   "/polityka-prywatnosci" → "/preview/polityka-prywatnosci"
 *   external URLs      → unchanged
 */
export function usePreviewHref(href: string): string {
    const isPreview = useIsPreview();
    if (!isPreview) return href;
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return href;
    }
    if (href === "/") return "/preview";
    if (href.startsWith("/#")) return `/preview#${href.slice(2)}`;
    if (href.startsWith("#")) return `/preview${href}`;
    return `/preview${href}`;
}
