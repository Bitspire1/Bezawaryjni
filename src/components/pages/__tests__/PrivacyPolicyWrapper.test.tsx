import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PrivacyPolicyWrapper from "@/components/pages/PrivacyPolicyWrapper";
import { mockPrivacyData } from "../../__tests__/mockData";

vi.mock("tinacms/dist/react", () => ({
    tinaField: () => undefined,
}));
vi.mock("@/components/sections/PolicySection", () => ({
    default: ({ data, index }: { data: typeof mockPrivacyData; index: number }) => (
        <div data-testid={`policy-section-${index}`}>{data.policySections[index].title}</div>
    ),
}));

describe("PrivacyPolicyWrapper", () => {
    it("renders main heading", () => {
        render(<PrivacyPolicyWrapper data={mockPrivacyData} />);
        expect(
            screen.getByRole("heading", { level: 1, name: /Polityka prywatno/i }),
        ).toBeInTheDocument();
    });

    it("renders last update date", () => {
        render(<PrivacyPolicyWrapper data={mockPrivacyData} />);
        expect(screen.getByText(/07\.10\.2025/)).toBeInTheDocument();
    });

    it("renders table of contents", () => {
        render(<PrivacyPolicyWrapper data={mockPrivacyData} />);
        expect(screen.getByRole("link", { name: "Informacje ogólne" })).toHaveAttribute(
            "href",
            "#wstep",
        );
    });

    it("renders policy sections", () => {
        render(<PrivacyPolicyWrapper data={mockPrivacyData} />);
        expect(screen.getByTestId("policy-section-0")).toBeInTheDocument();
    });
});
