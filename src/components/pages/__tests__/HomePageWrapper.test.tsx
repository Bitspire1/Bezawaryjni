import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HomePageWrapper from "@/components/pages/HomePageWrapper";
import { mockHomeData } from "../../__tests__/mockData";

vi.mock("next/navigation", () => ({
    usePathname: () => "/",
    useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/components/features/LightboxImage", () => ({
    default: () => <div data-testid="lightbox-image" />,
}));

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
vi.mock("@/components/features/CountUp", () => ({
    default: ({ end }: { end: number }) => <span>{end}</span>,
}));
vi.mock("@/components/ContactForm", () => ({
    default: () => <div data-testid="contact-form" />,
    MapEmbed: () => <div data-testid="map-embed" />,
}));

describe("HomePageWrapper", () => {
    it("renders hero section", () => {
        render(<HomePageWrapper data={mockHomeData} />);
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("bezawaryjni.com");
    });

    it("renders services section heading", () => {
        render(<HomePageWrapper data={mockHomeData} />);
        expect(screen.getByText("Nasze usługi")).toBeInTheDocument();
    });

    it("renders about us section", () => {
        render(<HomePageWrapper data={mockHomeData} />);
        expect(screen.getByRole("heading", { level: 2, name: "Nasza firma" })).toBeInTheDocument();
    });

    it("renders faq section", () => {
        render(<HomePageWrapper data={mockHomeData} />);
        expect(screen.getByText("FAQ")).toBeInTheDocument();
    });

    it("renders contact section", () => {
        render(<HomePageWrapper data={mockHomeData} />);
        expect(screen.getByText("Skontaktuj się")).toBeInTheDocument();
    });
});
