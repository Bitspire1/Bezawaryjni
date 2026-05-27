import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LiftsSection from "@/components/sections/LiftsSection";
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
vi.mock("next/dynamic", () => ({
    default: () =>
        ({
            alt = "",
            priority,
            fill,
            ...props
        }: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean; fill?: boolean }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt={alt} {...props} />
        ),
}));

describe("LiftsSection", () => {
    it("renders badge text", () => {
        render(<LiftsSection data={mockHomeData} />);
        expect(screen.getByText(mockHomeData.lifts.badge)).toBeInTheDocument();
    });

    it("renders heading", () => {
        render(<LiftsSection data={mockHomeData} />);
        expect(
            screen.getByRole("heading", { level: 2, name: mockHomeData.lifts.heading }),
        ).toBeInTheDocument();
    });

    it("renders description", () => {
        render(<LiftsSection data={mockHomeData} />);
        expect(screen.getByText(mockHomeData.lifts.description)).toBeInTheDocument();
    });

    it("renders image with correct alt text", () => {
        render(<LiftsSection data={mockHomeData} />);
        const image = screen.getByAltText(mockHomeData.lifts.imageAlt);
        expect(image).toBeInTheDocument();
    });
});
