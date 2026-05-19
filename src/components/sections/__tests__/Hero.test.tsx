import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Hero from "@/components/sections/Hero";
import { mockHomeData } from "../../__tests__/mockData";

vi.mock("tinacms/dist/react", () => ({
    tinaField: () => undefined,
}));

describe("Hero", () => {
    it("renders tagline", () => {
        render(<Hero data={mockHomeData} />);
        expect(screen.getByText("CAR SERVICE")).toBeInTheDocument();
    });

    it("renders heading", () => {
        render(<Hero data={mockHomeData} />);
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("bezawaryjni.com");
    });

    it("renders description", () => {
        render(<Hero data={mockHomeData} />);
        expect(screen.getByText(/Skorzystaj z usług/)).toBeInTheDocument();
    });

    it("renders primary CTA link", () => {
        render(<Hero data={mockHomeData} />);
        const link = screen.getByRole("link", { name: "Umów wizytę" });
        expect(link).toHaveAttribute("href", "https://example.com");
    });

    it("renders secondary CTA link", () => {
        render(<Hero data={mockHomeData} />);
        const link = screen.getByRole("link", { name: "Nasza firma" });
        expect(link).toHaveAttribute("href", "#nasza-firma");
    });
});
