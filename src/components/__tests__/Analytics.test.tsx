import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Analytics from "@/components/Analytics";

vi.mock("next/script", () => ({
    default: ({ id, children, strategy, ...props }: { id?: string; children?: React.ReactNode; strategy?: string }) => (
        <script id={id} {...props}>
            {children}
        </script>
    ),
}));

describe("Analytics", () => {
    it("renders GA loader and config scripts", () => {
        const { container } = render(<Analytics />);

        const loader = container.querySelector(
            'script[src*="googletagmanager.com/gtag/js?id=G-PJQFV2TCPV"]',
        );
        const inline = container.querySelector("script#google-analytics");

        expect(loader).toBeInTheDocument();
        expect(inline).toBeInTheDocument();
        expect(inline?.textContent).toContain("G-PJQFV2TCPV");
        expect(inline?.textContent).toContain("gtag('config'");
    });
});
