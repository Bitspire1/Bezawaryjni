/**
 * Transforms a regular site href to its /preview equivalent when rendered
 * inside the TinaCMS iframe.
 *
 * Rules:
 *   "/"                → "/preview"
 *   "/#section"        → "/preview#section"
 *   "#section"         → "/preview#section"
 *   "/polityka-prywatnosci" → "/preview/polityka-prywatnosci"
 *   external URLs      → unchanged
 */
export function previewHref(href: string, isPreview: boolean): string {
    if (!isPreview) return href;
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return href;
    }
    if (href === "/") return "/preview";
    if (href.startsWith("/#")) return `/preview#${href.slice(2)}`;
    if (href.startsWith("#")) return `/preview${href}`;
    return `/preview${href}`;
}
