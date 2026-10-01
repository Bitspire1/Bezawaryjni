/**
 * Lightweight `tinaField` reimplementation (same output format as
 * `@tinacms/bridge`, e.g. `queryId---path.to.field`).
 *
 * Returns `undefined` outside the `/preview` iframe routes and during SSR,
 * so the public site markup ships no Tina attributes and no Tina code ever
 * reaches the client bundle.
 */
export function tinaField(
    obj: unknown,
    fieldName?: string,
    index?: number,
): string | undefined {
    if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_TINA_CLIENT_ID) {
        return undefined;
    }
    if (!window.location.pathname.startsWith("/preview")) {
        return undefined;
    }
    const contentSource = (
        obj as { _content_source?: { queryId: string; path: string[] } } | null | undefined
    )?._content_source;
    if (!contentSource) {
        return undefined;
    }
    if (!fieldName) {
        return `${contentSource.queryId}---${contentSource.path.join(".")}`;
    }
    const fullPath =
        typeof index === "number"
            ? [...contentSource.path, fieldName, index]
            : [...contentSource.path, fieldName];
    return `${contentSource.queryId}---${fullPath.join(".")}`;
}
