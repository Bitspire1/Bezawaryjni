"use client";

// Tina v2 with iframe admin doesn't require wrapping the app.
// This component is a no-op placeholder to keep a stable import if needed later.
export default function TinaRoot({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
