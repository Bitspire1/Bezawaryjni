import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import WhyUsSection from "@/components/sections/WhyUsSection";
import { mockHomeData } from "@/components/__tests__/mockData";

vi.mock("tinacms/dist/react", () => ({
    tinaField: () => undefined,
}));

describe("WhyUsSection", () => {
    it("renders section heading", () => {
        render(<WhyUsSection data={mockHomeData} />);
        expect(
            screen.getByRole("heading", { level: 2, name: mockHomeData.whyUs.heading }),
        ).toBeInTheDocument();
    });

    it("renders section description", () => {
        render(<WhyUsSection data={mockHomeData} />);
        expect(screen.getByText(mockHomeData.whyUs.description)).toBeInTheDocument();
    });

    it("renders all four benefit points", () => {
        render(<WhyUsSection data={mockHomeData} />);
        mockHomeData.whyUs.points.forEach((point) => {
            expect(screen.getByText(point.title)).toBeInTheDocument();
            expect(screen.getByText(point.description)).toBeInTheDocument();
        });
    });

    it("renders correct number of benefit cards", () => {
        render(<WhyUsSection data={mockHomeData} />);
        const pointCount = mockHomeData.whyUs.points.length;
        // Check that all titles are present
        const titles = mockHomeData.whyUs.points.map((p) => screen.getByText(p.title));
        expect(titles.length).toBe(pointCount);
    });

    it("returns null when whyUs data is missing", () => {
        const { container } = render(<WhyUsSection data={{}} />);
        expect(container.firstChild).toBeNull();
    });
});
