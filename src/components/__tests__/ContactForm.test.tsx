import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, afterEach } from "vitest";
import ContactForm, { MapEmbed } from "@/components/ContactForm";

afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
});

describe("ContactForm", () => {
    it("shows validation error when required fields are missing", async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        await user.click(screen.getByRole("button", { name: /Wy/ }));
        expect(screen.getByText((content) => content.startsWith("Uzupe"))).toBeInTheDocument();
    });

    it("shows validation error for invalid email", async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        await user.type(screen.getByLabelText(/Imi/i), "Jan Kowalski");
        await user.type(screen.getByLabelText(/mail/i), "jan");
        await user.type(screen.getByLabelText(/Wiadom/i), "Test message");
        await user.click(screen.getByRole("button", { name: /Wy/ }));

        expect(screen.getByText((content) => content.startsWith("Podaj"))).toBeInTheDocument();
    });

    it("submits form and resets fields on success", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true });
        vi.stubGlobal("fetch", fetchMock);

        const user = userEvent.setup();
        render(<ContactForm />);

        const nameInput = screen.getByLabelText(/Imi/i) as HTMLInputElement;
        const emailInput = screen.getByLabelText(/mail/i) as HTMLInputElement;
        const messageInput = screen.getByLabelText(/Wiadom/i) as HTMLTextAreaElement;

        await user.type(nameInput, "Jan Kowalski");
        await user.type(emailInput, "jan@example.com");
        await user.type(messageInput, "Test message");
        await user.click(screen.getByRole("button", { name: /Wy/ }));

        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
        await waitFor(() =>
            expect(screen.getByText((content) => content.startsWith("Dzi"))).toBeInTheDocument(),
        );

        await waitFor(() => expect(nameInput.value).toBe(""));
        expect(emailInput.value).toBe("");
        expect(messageInput.value).toBe("");
    });

    it("skips submit when honeypot is filled", async () => {
        const fetchMock = vi.fn();
        vi.stubGlobal("fetch", fetchMock);

        const { container } = render(<ContactForm />);
        const form = container.querySelector("form") as HTMLFormElement;
        const companyInput = container.querySelector("input[name='company']") as HTMLInputElement;

        fireEvent.change(companyInput, { target: { value: "spam" } });
        fireEvent.submit(form);

        expect(fetchMock).not.toHaveBeenCalled();
        await waitFor(() =>
            expect(screen.getByText((content) => content.startsWith("Dzi"))).toBeInTheDocument(),
        );
    });

    it("shows error message when submit fails", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: false });
        vi.stubGlobal("fetch", fetchMock);

        const user = userEvent.setup();
        render(<ContactForm />);

        await user.type(screen.getByLabelText(/Imi/i), "Jan Kowalski");
        await user.type(screen.getByLabelText(/mail/i), "jan@example.com");
        await user.type(screen.getByLabelText(/Wiadom/i), "Test message");
        await user.click(screen.getByRole("button", { name: /Wy/ }));

        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
        expect(screen.getByText((content) => content.startsWith("Nie"))).toBeInTheDocument();
    });
});

describe("MapEmbed", () => {
    it("shows spinner until iframe load", async () => {
        const { container } = render(<MapEmbed />);
        expect(container.querySelector(".animate-spin")).toBeInTheDocument();

        const iframe = screen.getByTitle(/Mapa/);
        fireEvent.load(iframe);

        await waitFor(() =>
            expect(container.querySelector(".animate-spin")).not.toBeInTheDocument(),
        );
    });
});
