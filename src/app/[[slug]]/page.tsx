import { pageRegistry, slugs } from "@/lib/pageRegistry";
// import { client } from "../../../tina/__generated__/client";

export async function generateStaticParams() {
    return slugs.map((slug) => ({ slug: [slug] }));
}

interface PageProps {
    params: {
        slug?: string[];
    };
}

export default async function Page({ params }: PageProps) {
    const slug = params.slug?.[0] || "home";

    const Wrapper = pageRegistry[slug];
    if (!Wrapper) {
        return <div>Strona nie znaleziona</div>;
    }

    // Fetch danych z Tina podczas build time (SSG)
    // TODO: Odkomentuj po wygenerowaniu tina client
    // const response = await client.queries.pages({
    //     relativePath: `${slug}.mdx`,
    // });
    
    // Tymczasowy mock - zastąpić prawdziwymi danymi z Tina
    const fs = await import('fs/promises');
    const path = await import('path');
    const matter = await import('gray-matter');
    
    const filePath = path.join(process.cwd(), 'content', 'pages', `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data } = matter.default(fileContent);

    return <Wrapper data={data} />;
}
