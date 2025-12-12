import HomePageWrapper from "@/components/pages/HomePageWrapper";
import type React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pageRegistry: Record<string, React.ComponentType<any>> = {
    "home": HomePageWrapper,
    // Tutaj dodasz kolejne strony w przyszłości
    // "o-nas": AboutPageWrapper,
    // "kontakt": ContactPageWrapper,
};

export const slugs = Object.keys(pageRegistry);
