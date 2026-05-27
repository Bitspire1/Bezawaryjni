import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import WhatsAppButton from "@/components/WhatsAppButton";

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

const originalPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE = originalPhone;
    vi.restoreAllMocks();
});

describe("WhatsAppButton", () => {
    it("renders nothing when phone is missing", () => {
        process.env.NEXT_PUBLIC_WHATSAPP_PHONE = "";
        const { container } = render(<WhatsAppButton />);
        expect(container.firstChild).toBeNull();
    });

    it("shows popup after delay and sends a message", () => {
        process.env.NEXT_PUBLIC_WHATSAPP_PHONE = "48111222333";
        const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

        render(<WhatsAppButton />);

        expect(screen.getByRole("button", { name: /Otw/ })).toBeInTheDocument();

        act(() => {
            vi.runOnlyPendingTimers();
        });

        const popupText = screen.getByText((content) => content.includes("Zapraszam"));
        fireEvent.click(popupText);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "Hello" } });

        const sendButton = screen.getByRole("button", { name: /Wy/ });
        expect(sendButton).not.toBeDisabled();
        fireEvent.click(sendButton);

        expect(openSpy).toHaveBeenCalledWith(
            "https://wa.me/48111222333?text=Hello",
            "_blank",
        );
    });
});
