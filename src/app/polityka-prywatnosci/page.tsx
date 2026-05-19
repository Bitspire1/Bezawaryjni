import type { Metadata } from "next";
import client from "tina/__generated__/client";
import PrivacyPolicyWrapper from "@/components/pages/PrivacyPolicyWrapper";

export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
    const result = await client.queries.pages({
        relativePath: "polityka-prywatnosci.md",
    });
    const data = result.data.pages;
    const title = data.metaTitle ?? "Polityka prywatności – Bezawaryjni AutoSerwis";
    const description =
        data.metaDescription ??
        "Polityka prywatności serwisu bezawaryjni.pl – informacje o przetwarzaniu danych osobowych.";
    return {
        title,
        description,
        alternates: {
            canonical: "https://bezawaryjni.pl/polityka-prywatnosci",
        },
        robots: {
            index: false,
            follow: true,
        },
        openGraph: {
            type: "website",
            locale: "pl_PL",
            url: "https://bezawaryjni.pl/polityka-prywatnosci",
            siteName: "Bezawaryjni AutoSerwis",
            title,
            description,
            images: [
                {
                    url: "/images/og-image.png",
                    width: 1200,
                    height: 630,
                    alt: "Bezawaryjni AutoSerwis – serwis mechaniczny Kobylnica / Słupsk",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/images/og-image.png"],
        },
    };
}

export default async function PolitykaPrywatnosci() {
    const result = await client.queries.pages({
        relativePath: "polityka-prywatnosci.md",
    });

    return <PrivacyPolicyWrapper data={result.data.pages as any} />;
}
