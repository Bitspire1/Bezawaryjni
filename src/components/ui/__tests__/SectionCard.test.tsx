import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SectionCard from "@/components/ui/SectionCard";

describe("SectionCard", () => {
    it("renders section content with title and number", () => {
        const { container } = render(
            <SectionCard id="sekcja-test" n={2} title="Tytul sekcji">
                <p>Tresc sekcji</p>
            </SectionCard>,
        );

        const section = container.querySelector("section");
        expect(section).toHaveAttribute("id", "sekcja-test");
        expect(screen.getByRole("heading", { level: 2, name: "Tytul sekcji" })).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("Tresc sekcji")).toBeInTheDocument();
    });
});
