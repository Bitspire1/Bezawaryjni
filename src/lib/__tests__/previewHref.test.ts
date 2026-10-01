import { describe, it, expect } from "vitest";
import { previewHref } from "@/lib/previewHref";

describe("previewHref", () => {
    it("keeps href unchanged outside preview", () => {
        expect(previewHref("/#kontakt", false)).toBe("/#kontakt");
        expect(previewHref("/", false)).toBe("/");
        expect(previewHref("/polityka-prywatnosci", false)).toBe("/polityka-prywatnosci");
    });

    it("transforms internal hrefs inside preview", () => {
        const cases = [
            { input: "/", expected: "/preview" },
            { input: "/#sekcja", expected: "/preview#sekcja" },
            { input: "#sekcja", expected: "/preview#sekcja" },
            { input: "/polityka-prywatnosci", expected: "/preview/polityka-prywatnosci" },
        ];

        cases.forEach(({ input, expected }) => {
            expect(previewHref(input, true)).toBe(expected);
        });
    });

    it("keeps external links unchanged inside preview", () => {
        const cases = ["https://example.com", "mailto:test@example.com", "tel:+48111222333"];

        cases.forEach((href) => {
            expect(previewHref(href, true)).toBe(href);
        });
    });
});
