import HomePageWrapper from "@/components/pages/HomePageWrapper";
import PrivacyPolicyWrapper from "@/components/pages/PrivacyPolicyWrapper";
import type React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pageRegistry: Record<string, React.ComponentType<any>> = {
    "home": HomePageWrapper,
    "polityka-prywatnosci": PrivacyPolicyWrapper,
    // Tutaj dodasz kolejne strony w przyszłości
    // "o-nas": AboutPageWrapper,
    // "kontakt": ContactPageWrapper,
};

export const slugs = Object.keys(pageRegistry);
