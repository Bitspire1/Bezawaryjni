import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FAQ from "@/components/sections/FAQ";
import { mockHomeData } from "../../__tests__/mockData";

describe("FAQ", () => {
    it("renders heading", () => {
        render(<FAQ data={mockHomeData} />);
        expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("FAQ");
    });

    it("renders question text", () => {
        render(<FAQ data={mockHomeData} />);
        expect(screen.getByText("Czy mogę wynająć stanowisko?")).toBeInTheDocument();
    });

    it("renders answer text", () => {
        render(<FAQ data={mockHomeData} />);
        expect(screen.getByText("Tak.")).toBeInTheDocument();
    });

    it("includes JSON-LD script", () => {
        const { container } = render(<FAQ data={mockHomeData} />);
        const script = container.querySelector('script[type="application/ld+json"]');
        expect(script).not.toBeNull();
        const json = JSON.parse(script!.innerHTML);
        expect(json["@type"]).toBe("FAQPage");
    });
});
