import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Header from "@/components/layout/Header";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
    usePathname: () => "/",
    useRouter: () => ({ push: mockPush }),
}));
vi.mock("next/image", () => ({
    default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));
vi.mock("next/link", () => ({
    default: ({
        href,
        children,
        ...rest
    }: {
        href: string;
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <a href={href} {...rest}>
            {children}
        </a>
    ),
}));

describe("Header", () => {
    it("renders the logo image", () => {
        render(<Header />);
        expect(screen.getByAltText("Bezawaryjni AutoSerwis")).toBeInTheDocument();
    });

    it("renders desktop nav items", () => {
        render(<Header />);
        expect(screen.getAllByText("Strona Główna").length).toBeGreaterThan(0);
        expect(screen.getAllByText("Usługi").length).toBeGreaterThan(0);
        expect(screen.getAllByText("Kontakt").length).toBeGreaterThan(0);
    });

    it("renders polityka prywatnosci nav link", () => {
        render(<Header />);
        const links = screen.getAllByRole("link", { name: "Polityka prywatności" });
        expect(links[0]).toHaveAttribute("href", "/polityka-prywatnosci");
    });

    it("mobile menu is hidden by default", () => {
        render(<Header />);
        const mobileNav = document.getElementById("mobile-primary-nav");
        expect(mobileNav).toHaveClass("opacity-0");
    });

    it("toggles mobile menu on button click", () => {
        render(<Header />);
        const toggleBtn = screen.getByRole("button", { name: /Otwórz menu/i });
        fireEvent.click(toggleBtn);
        const mobileNav = document.getElementById("mobile-primary-nav");
        expect(mobileNav).toHaveClass("opacity-100");
    });
});
