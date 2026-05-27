import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ObfuscatedEmail from "@/components/ObfuscatedEmail";

describe("ObfuscatedEmail", () => {
    it("renders empty output for missing email", () => {
        const { container } = render(<ObfuscatedEmail email="" />);
        expect(container.textContent).toBe("");
    });

    it("renders raw value when email is invalid", () => {
        render(<ObfuscatedEmail email="not-an-email" />);
        expect(screen.getByText("not-an-email")).toBeInTheDocument();
    });

    it("obfuscates valid email into separate spans", () => {
        const { container } = render(<ObfuscatedEmail email="john@doe.com" />);
        const hiddenSpans = container.querySelectorAll('span[style*="display: none"]');

        expect(hiddenSpans.length).toBe(2);
        expect(hiddenSpans[0]).toHaveTextContent(".spam");
        expect(hiddenSpans[1]).toHaveTextContent(".trap");
        expect(screen.getByText("john")).toBeInTheDocument();
        expect(screen.getByText("doe")).toBeInTheDocument();
        expect(screen.getByText("com")).toBeInTheDocument();
        expect(screen.getByText("@")).toBeInTheDocument();
        expect(screen.getByText(".")).toBeInTheDocument();
    });
});
