/**
 * Maps Tina Cloud media URLs (`https://assets.tina.io/<client-id>/<path>`)
 * back to the local `/public` file so media already present in the repo is
 * served same-origin — no extra TLS handshake or CDN hop per image.
 */
export function localMedia(src: string): string {
    return src.replace(/^https?:\/\/assets\.tina\.io\/[^/]+/, "");
}
