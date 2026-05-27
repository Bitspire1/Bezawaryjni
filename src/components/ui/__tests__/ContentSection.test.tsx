import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ContentSection } from "@/components/ui/ContentSection";

describe("ContentSection", () => {
    it("renders heading, description, and children", () => {
        render(
            <ContentSection heading="Naglowek" description="Opis">
                <div>Tresc</div>
            </ContentSection>,
        );

        expect(screen.getByRole("heading", { level: 2, name: "Naglowek" })).toBeInTheDocument();
        expect(screen.getByText("Opis")).toBeInTheDocument();
        expect(screen.getByText("Tresc")).toBeInTheDocument();
    });

    it("renders children without heading and description", () => {
        render(
            <ContentSection>
                <div>Samodzielna tresc</div>
            </ContentSection>,
        );

        expect(screen.queryByRole("heading")).not.toBeInTheDocument();
        expect(screen.queryByText("Opis")).not.toBeInTheDocument();
        expect(screen.getByText("Samodzielna tresc")).toBeInTheDocument();
    });
});
