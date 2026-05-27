import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PolicySection from "@/components/sections/PolicySection";
import { mockPrivacyData } from "@/components/__tests__/mockData";

vi.mock("tinacms/dist/react", () => ({
    tinaField: () => undefined,
}));
vi.mock("tinacms/dist/rich-text", () => ({
    TinaMarkdown: ({ content }: { content: string }) => <div>{content}</div>,
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

describe("PolicySection", () => {
    it("renders section with correct number", () => {
        render(<PolicySection data={mockPrivacyData} index={0} />);
        expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("renders section title", () => {
        render(<PolicySection data={mockPrivacyData} index={0} />);
        expect(screen.getByText(mockPrivacyData.policySections[0].title)).toBeInTheDocument();
    });

    it("renders section content", () => {
        render(<PolicySection data={mockPrivacyData} index={0} />);
        expect(screen.getByText(mockPrivacyData.policySections[0].content)).toBeInTheDocument();
    });

    it("has correct section id", () => {
        const { container } = render(<PolicySection data={mockPrivacyData} index={0} />);
        const section = container.querySelector("section");
        expect(section).toHaveAttribute("id", mockPrivacyData.policySections[0].id);
    });

    it("renders multiple sections independently", () => {
        const { rerender } = render(<PolicySection data={mockPrivacyData} index={0} />);
        expect(screen.getByText(mockPrivacyData.policySections[0].title)).toBeInTheDocument();

        rerender(<PolicySection data={mockPrivacyData} index={0} />);
        expect(screen.getByText(mockPrivacyData.policySections[0].title)).toBeInTheDocument();
    });
});
