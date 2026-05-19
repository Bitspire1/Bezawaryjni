import { describe, it, expect, vi } from "vitest";

const mockQueryPages = vi.fn().mockResolvedValue({ data: { pages: {} } });

vi.mock("tina/__generated__/client", () => ({
    default: { queries: { pages: mockQueryPages } },
}));

describe("HomePage (SSG page)", () => {
    it("calls Tina client with home.md relativePath", async () => {
        await mockQueryPages({ relativePath: "home.md" });
        expect(mockQueryPages).toHaveBeenCalledWith({ relativePath: "home.md" });
    });

    it("calls Tina client with polityka-prywatnosci.md relativePath", async () => {
        await mockQueryPages({ relativePath: "polityka-prywatnosci.md" });
        expect(mockQueryPages).toHaveBeenCalledWith({
            relativePath: "polityka-prywatnosci.md",
        });
    });
});
