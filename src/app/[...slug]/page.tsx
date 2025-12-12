import { pageRegistry, slugs } from "@/lib/pageRegistry";
import client from "../../../tina/__generated__/client";

export async function generateStaticParams() {
    return slugs.map((slug) => ({ slug: slug === 'home' ? [] : [slug] }));
}

interface PageProps {
    params: Promise<{
        slug: string[];
    }>;
}

export default async function Page(props: PageProps) {
    const params = await props.params;
    const slug = params.slug?.[0] || "home";

    const Wrapper = pageRegistry[slug];
    if (!Wrapper) {
        return <div>Strona nie znaleziona</div>;
    }

    const result = await client.queries.pages({
        relativePath: `${slug}.mdx`,
    });

    return <Wrapper data={result.data.pages} />;
}
