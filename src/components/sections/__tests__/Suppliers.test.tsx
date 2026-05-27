import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Suppliers from "@/components/sections/Suppliers";
import { mockHomeData } from "@/components/__tests__/mockData";

vi.mock("tinacms/dist/react", () => ({
    tinaField: () => undefined,
}));
vi.mock("next/image", () => ({
    default: ({
        alt = "",
        priority,
        fill,
        ...props
    }: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean; fill?: boolean }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt={alt} {...props} />
    ),
}));

describe("Suppliers", () => {
    it("renders heading", () => {
        render(<Suppliers data={mockHomeData} />);
        expect(
            screen.getByRole("heading", { level: 2, name: mockHomeData.suppliers.heading }),
        ).toBeInTheDocument();
    });

    it("renders description", () => {
        render(<Suppliers data={mockHomeData} />);
        expect(screen.getByText(mockHomeData.suppliers.description)).toBeInTheDocument();
    });

    it("renders all supplier logos", () => {
        render(<Suppliers data={mockHomeData} />);
        mockHomeData.suppliers.logos.forEach((logo) => {
            expect(screen.getByAltText(logo.alt)).toBeInTheDocument();
        });
    });

    it("renders correct number of logo cards", () => {
        render(<Suppliers data={mockHomeData} />);
        const logoCount = mockHomeData.suppliers.logos.length;
        // Each logo is wrapped in a card - checking by alt text count
        const images = screen.getAllByRole("img");
        expect(images.length).toBeGreaterThanOrEqual(logoCount);
    });
});
