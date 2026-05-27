import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Offer from "@/components/sections/Offer";
import { mockHomeData } from "../../__tests__/mockData";

vi.mock("next/navigation", () => ({
    usePathname: () => "/",
    useRouter: () => ({ push: vi.fn() }),
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

describe("Offer", () => {
    it("renders section heading", () => {
        render(<Offer data={mockHomeData} />);
        expect(screen.getByRole("heading", { level: 2, name: "Nasze usługi" })).toBeInTheDocument();
    });

    it("renders service item button", () => {
        render(<Offer data={mockHomeData} />);
        const btns = screen.getAllByRole("button", { name: /Diagnostyka/ });
        expect(btns.length).toBeGreaterThan(0);
    });

    it("opens modal on service click", () => {
        render(<Offer data={mockHomeData} />);
        fireEvent.click(screen.getAllByRole("button", { name: /Diagnostyka/ })[0]);
        expect(screen.getByText("Opis diagnostyki")).toBeInTheDocument();
    });

    it("closes modal on close button click", () => {
        render(<Offer data={mockHomeData} />);
        fireEvent.click(screen.getAllByRole("button", { name: /Diagnostyka/ })[0]);
        fireEvent.click(screen.getByRole("button", { name: "Zamknij" }));
        expect(screen.queryByText("Opis diagnostyki")).not.toBeInTheDocument();
    });

    it("renders svg image for service", () => {
        render(<Offer data={mockHomeData} />);
        const images = screen.getAllByRole("img");
        const svgImage = images.find((img) => img.getAttribute("src")?.includes(".svg"));
        expect(svgImage).toBeTruthy();
    });
});
