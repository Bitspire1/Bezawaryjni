"use client";

// import { useTina } from "tinacms/dist/react";
import { pageRegistry } from "@/lib/pageRegistry";
// import { client } from "../../../tina/__generated__/client";

interface AdminPageProps {
    params: {
        slug?: string[];
    };
}

export default function AdminPage({ params }: AdminPageProps) {
    const slug = params.slug?.[0] || "home";

    // TODO: Odkomentuj po wygenerowaniu tina client i zainstalowaniu tinacms
    // const initialQuery = client.queries.pages({
    //     relativePath: `${slug}.mdx`,
    // });

    // const { data } = useTina({
    //     query: initialQuery.query,
    //     variables: { relativePath: `${slug}.mdx` },
    //     data: initialQuery.data,
    // });

    const Wrapper = pageRegistry[slug];
    if (!Wrapper) {
        return <div>Nieznany slug: {slug}</div>;
    }

    // Tymczasowy mock data
    const mockData = {
        hero: {
            tagline: "Warsztat samoobsługowy i serwis mechaniczny",
            heading: "Zrób to sam lub zleć to nam",
            description: "Wynajmij stanowisko z podnośnikiem i profesjonalnymi narzędziami albo skorzystaj z naszego serwisu mechanicznego. Uczciwa wycena, szybkie terminy i wsparcie na miejscu.",
            ctaPrimary: { text: "Umów wizytę", url: "https://app.autonova.com/pl/c/LjiDS" },
            ctaSecondary: { text: "Nasza firma", url: "#nasza-firma" }
        },
        services: { heading: "Nasze usługi", items: [] },
        suppliers: { heading: "Dostawcy", description: "Test", logos: [] },
        contact: { heading: "Kontakt", description: "Test", phone: "+48 784 669 601", email: "kontakt@bezawaryjni.pl" },
        faq: { heading: "FAQ", items: [] }
    };

    return <Wrapper data={mockData} />;
}
