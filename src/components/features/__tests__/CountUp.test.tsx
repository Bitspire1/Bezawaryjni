import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import CountUp from "@/components/features/CountUp";

let rafTime = 0;

class MockIntersectionObserver {
    private callback: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
    }

    observe() {
        this.callback(
            [
                {
                    isIntersecting: true,
                    target: document.createElement("span"),
                    intersectionRatio: 1,
                } as IntersectionObserverEntry,
            ],
            this as unknown as IntersectionObserver,
        );
    }

    disconnect() {}
    unobserve() {}
}

beforeEach(() => {
    rafTime = 0;
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver as unknown as typeof IntersectionObserver);
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
        rafTime += 1000;
        cb(rafTime);
        return rafTime;
    });
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
});

afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

describe("CountUp", () => {
    it("animates to the end value when visible", async () => {
        render(<CountUp end={12} />);
        await waitFor(() => expect(screen.getByText("12")).toBeInTheDocument());
    });

    it("renders prefix and suffix around value", async () => {
        render(<CountUp end={5} prefix="~" suffix=" km" />);
        await waitFor(() => expect(screen.getByText("~5 km")).toBeInTheDocument());
    });
});
