import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LightboxImage from "@/components/features/LightboxImage";

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

vi.mock("react-dom", async () => {
    const actual = await vi.importActual<typeof import("react-dom")>("react-dom");
    return {
        ...actual,
        createPortal: (node: React.ReactNode) => node,
    };
});

describe("LightboxImage", () => {
    it("renders image and opens lightbox on click", async () => {
        render(<LightboxImage src="/test.png" alt="Test image" width={100} height={100} />);

        const image = screen.getByAltText("Test image");
        fireEvent.click(image);

        await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    });

    it("closes lightbox via close button", async () => {
        render(<LightboxImage src="/test.png" alt="Test image" width={100} height={100} />);

        fireEvent.click(screen.getByAltText("Test image"));
        await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

        fireEvent.click(screen.getByRole("button", { name: /Zamknij/ }));
        await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    });
});
