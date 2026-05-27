import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useIsPreview, usePreviewHref } from "@/hooks/usePreviewHref";

let pathname: string | null = "/";

vi.mock("next/navigation", () => ({
    usePathname: () => pathname,
}));

describe("useIsPreview", () => {
    beforeEach(() => {
        pathname = "/";
    });

    it("returns true for preview paths", () => {
        pathname = "/preview";
        const { result } = renderHook(() => useIsPreview());
        expect(result.current).toBe(true);
    });

    it("returns false for non-preview paths", () => {
        pathname = "/";
        const { result } = renderHook(() => useIsPreview());
        expect(result.current).toBe(false);
    });

    it("returns false when pathname is null", () => {
        pathname = null;
        const { result } = renderHook(() => useIsPreview());
        expect(result.current).toBe(false);
    });
});

describe("usePreviewHref", () => {
    it("keeps href unchanged outside preview", () => {
        pathname = "/";
        const { result } = renderHook(() => usePreviewHref("/#kontakt"));
        expect(result.current).toBe("/#kontakt");
    });

    it("transforms internal hrefs inside preview", () => {
        pathname = "/preview";
        const cases = [
            { input: "/", expected: "/preview" },
            { input: "/#sekcja", expected: "/preview#sekcja" },
            { input: "#sekcja", expected: "/preview#sekcja" },
            { input: "/polityka-prywatnosci", expected: "/preview/polityka-prywatnosci" },
        ];

        cases.forEach(({ input, expected }) => {
            const { result } = renderHook(() => usePreviewHref(input));
            expect(result.current).toBe(expected);
        });
    });

    it("keeps external links unchanged inside preview", () => {
        pathname = "/preview";
        const cases = [
            "https://example.com",
            "mailto:test@example.com",
            "tel:+48111222333",
        ];

        cases.forEach((href) => {
            const { result } = renderHook(() => usePreviewHref(href));
            expect(result.current).toBe(href);
        });
    });
});
