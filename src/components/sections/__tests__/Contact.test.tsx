import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Contact from "@/components/sections/Contact";
import { mockHomeData } from "../../__tests__/mockData";

vi.mock("@/components/ContactForm", () => ({
    default: () => <div data-testid="contact-form" />,
    MapEmbed: () => <div data-testid="map-embed" />,
}));

describe("Contact", () => {
    it("renders section heading", () => {
        render(<Contact data={mockHomeData} />);
        expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Skontaktuj się");
    });

    it("renders phone link", () => {
        render(<Contact data={mockHomeData} />);
        const link = screen.getByRole("link", { name: /\+48 784 669 601/ });
        expect(link).toHaveAttribute("href", "tel:+48 784 669 601");
    });

    it("renders email link", () => {
        render(<Contact data={mockHomeData} />);
        const link = screen.getByRole("link", { name: /kontakt@bezawaryjni\.pl/ });
        expect(link).toHaveAttribute("href", "mailto:kontakt@bezawaryjni.pl");
    });

    it("renders contact form", () => {
        render(<Contact data={mockHomeData} />);
        expect(screen.getByTestId("contact-form")).toBeInTheDocument();
    });

    it("renders map embed", () => {
        render(<Contact data={mockHomeData} />);
        expect(screen.getByTestId("map-embed")).toBeInTheDocument();
    });
});
