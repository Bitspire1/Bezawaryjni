import { render, screen, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Footer from "@/components/layout/Footer";
import { mockHomeData } from "@/components/__tests__/mockData";

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
vi.mock("@/hooks/usePreviewHref", () => ({
    useIsPreview: () => false,
}));

describe("Footer", () => {
    it("renders the logo image", () => {
        render(<Footer footerData={mockHomeData.footer} />);
        expect(screen.getByAltText("Bezawaryjni AutoSerwis")).toBeInTheDocument();
    });

    it("renders description text", () => {
        render(<Footer footerData={mockHomeData.footer} />);
        expect(screen.getByText(mockHomeData.footer.description)).toBeInTheDocument();
    });

    it("renders navigation links", () => {
        render(<Footer footerData={mockHomeData.footer} />);
        const nav = screen.getByRole("navigation", { name: "Nawigacja" });
        expect(within(nav).getByRole("link", { name: "Strona Główna" })).toBeInTheDocument();
        expect(within(nav).getByRole("link", { name: "Usługi" })).toBeInTheDocument();
        expect(within(nav).getByRole("link", { name: "Kontakt" })).toBeInTheDocument();
    });

    it("renders contact phone with correct href", () => {
        render(<Footer footerData={mockHomeData.footer} />);
        const phoneLink = screen.getByText(mockHomeData.footer.phone).closest("a");
        expect(phoneLink).toHaveAttribute("href", `tel:${mockHomeData.footer.phone.replace(/\s/g, "")}`);
    });

    it("renders contact email with correct href", () => {
        render(<Footer footerData={mockHomeData.footer} />);
        const emailLink = screen.getByText(mockHomeData.footer.email).closest("a");
        expect(emailLink).toHaveAttribute("href", `mailto:${mockHomeData.footer.email}`);
    });

    it("renders opening hours", () => {
        render(<Footer footerData={mockHomeData.footer} />);
        expect(screen.getByText(mockHomeData.footer.hoursWeekday)).toBeInTheDocument();
        expect(screen.getByText(mockHomeData.footer.hoursWeekend)).toBeInTheDocument();
    });

    it("renders privacy policy link", () => {
        render(<Footer footerData={mockHomeData.footer} />);
        const privacyLink = screen.getByText("Polityka prywatności");
        expect(privacyLink).toHaveAttribute("href", "/polityka-prywatnosci");
    });

    it("renders copyright with current year", () => {
        render(<Footer footerData={mockHomeData.footer} />);
        const year = new Date().getFullYear();
        expect(screen.getByText(new RegExp(`${year} Bezawaryjni`))).toBeInTheDocument();
    });

    it("uses default values when footerData is not provided", () => {
        render(<Footer />);
        expect(screen.getByText("+48 784 669 601")).toBeInTheDocument();
        expect(screen.getByText("kontakt@bezawaryjni.pl")).toBeInTheDocument();
    });
});
