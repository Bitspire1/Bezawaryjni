import client from "tina/__generated__/client";
import HomePageWrapper from "@/components/pages/HomePageWrapper";

export const revalidate = false;

export default async function HomePage() {
    const result = await client.queries.pages({
        relativePath: "home.md",
    });

    return <HomePageWrapper data={result.data.pages as any} />;
}
