import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AboutUs from "@/components/sections/AboutUs";
import { mockHomeData } from "../../__tests__/mockData";

vi.mock("@/components/features/CountUp", () => ({
    default: ({ end }: { end: number }) => <span>{end}</span>,
}));

describe("AboutUs", () => {
    it("renders section heading", () => {
        render(<AboutUs data={mockHomeData} />);
        expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Nasza firma");
    });

    it("renders primary description", () => {
        render(<AboutUs data={mockHomeData} />);
        expect(screen.getByText("Opis firmy")).toBeInTheDocument();
    });

    it("renders benefits list", () => {
        render(<AboutUs data={mockHomeData} />);
        expect(screen.getByText("Darmowa wycena")).toBeInTheDocument();
        expect(screen.getByText("Szybkie terminy")).toBeInTheDocument();
    });

    it("renders stat labels", () => {
        render(<AboutUs data={mockHomeData} />);
        expect(screen.getByText("rok założenia")).toBeInTheDocument();
        expect(screen.getByText("napraw rocznie")).toBeInTheDocument();
    });
});
