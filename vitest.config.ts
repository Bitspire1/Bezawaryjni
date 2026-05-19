import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
    esbuild: {
        jsx: "automatic",
        jsxImportSource: "react",
    },
    test: {
        environment: "jsdom",
        setupFiles: ["./vitest.setup.ts"],
        globals: true,
        coverage: {
            provider: "v8",
            reporter: ["text", "lcov"],
            include: ["src/**/*.{ts,tsx}"],
            exclude: ["src/**/__tests__/**", "src/**/*.d.ts"],
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
