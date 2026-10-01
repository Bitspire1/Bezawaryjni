import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import Analytics from "@/components/analytics/Analytics";

describe("Analytics", () => {
    afterEach(() => {
        document
            .querySelectorAll('script[src*="googletagmanager.com"]')
            .forEach((s) => s.remove());
        delete window.dataLayer;
        vi.useRealTimers();
    });

    it("renders nothing and loads gtag on first interaction", () => {
        const { container } = render(<Analytics />);
        expect(container).toBeEmptyDOMElement();
        expect(
            document.querySelector('script[src*="googletagmanager.com"]'),
        ).not.toBeInTheDocument();

        fireEvent.scroll(window);

        const loader = document.querySelector(
            'script[src*="googletagmanager.com/gtag/js?id=G-PJQFV2TCPV"]',
        );
        expect(loader).toBeInTheDocument();
        expect(window.dataLayer).toBeDefined();
        expect(
            window.dataLayer?.some(
                (e) => Array.isArray(e) && e[0] === "config" && e[1] === "G-PJQFV2TCPV",
            ),
        ).toBe(true);
    });

    it("loads gtag after the fallback timeout without interaction", () => {
        vi.useFakeTimers();
        render(<Analytics />);

        vi.advanceTimersByTime(6000);

        expect(
            document.querySelector('script[src*="googletagmanager.com/gtag/js?id=G-PJQFV2TCPV"]'),
        ).toBeInTheDocument();
    });

    it("injects the script only once across multiple events", () => {
        render(<Analytics />);

        fireEvent.pointerDown(window);
        fireEvent.scroll(window);
        fireEvent.keyDown(window);

        expect(
            document.querySelectorAll('script[src*="googletagmanager.com"]').length,
        ).toBe(1);
    });
});
