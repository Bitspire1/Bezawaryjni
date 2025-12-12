export function policyHref(which: "privacy" | "cookies") {
    const base = which === "privacy" ? "/polityka-prywatnosci" : "/polityka-cookies";
    // In production (static export), we serve .html files directly on the host.
    // In development (next dev), extensionless routes are available while .html is not.
    const suffix = process.env.NODE_ENV === "production" ? ".html" : "";
    return `${base}${suffix}`;
}
