/**
 * Post-build step: inlines the render-blocking Tailwind stylesheet into
 * every prerendered HTML page.
 *
 * The site's entire CSS is ~11 KB gzipped, so shipping it in the document
 * removes a full request from the critical path. The original <link> is
 * kept with media="print" so it still loads (non-blocking) for anything
 * that hydrates against stylesheet hrefs.
 *
 * Idempotent: only <link> tags carrying data-precedence are rewritten.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const serverAppDir = ".next/server/app";
const linkRe = /<link rel="stylesheet" href="([^"]+\.css)" data-precedence="[^"]*"\s*\/?>/g;

function* htmlFiles(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) yield* htmlFiles(path);
        else if (entry.name.endsWith(".html")) yield path;
    }
}

let inlined = 0;
for (const file of htmlFiles(serverAppDir)) {
    const html = readFileSync(file, "utf8");
    let changed = false;
    const out = html.replace(linkRe, (match, href) => {
        const cssPath = join(".next", href.replace(/^\/_next\//, ""));
        try {
            const css = readFileSync(cssPath, "utf8");
            if (css.includes("</style")) return match;
            changed = true;
            return (
                `<style>${css}</style>` +
                `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all'"/>`
            );
        } catch {
            return match;
        }
    });
    if (changed) {
        writeFileSync(file, out);
        inlined++;
    }
}

console.log(`inline-css: inlined stylesheet into ${inlined} html file(s)`);
