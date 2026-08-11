/**
 * Lightweight wrapper around TinaCMS `tinaField`.
 * Returns `undefined` in production/server to avoid pulling `tinacms/dist/react`
 * into the client bundle when visual editing is not active.
 */
export function tinaField(obj: any, fieldName: string): any {
    if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_TINA_CLIENT_ID) {
        return undefined;
    }
    if (!window.location.pathname.startsWith("/preview")) {
        return undefined;
    }
    const { tinaField: realTinaField } = require("tinacms/dist/react");
    return realTinaField(obj, fieldName);
}
