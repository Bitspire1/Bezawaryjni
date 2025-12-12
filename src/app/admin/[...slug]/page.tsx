"use client";

import { use } from "react";
import { useTina } from "tinacms/dist/react";
import { pageRegistry } from "@/lib/pageRegistry";
import client from "../../../../tina/__generated__/client";

interface AdminPageProps {
    params: Promise<{
        slug: string[];
    }>;
}

export default function AdminPage(props: AdminPageProps) {
    const params = use(props.params);
    const slug = params.slug?.[0] || "home";

    const Wrapper = pageRegistry[slug];
    if (!Wrapper) {
        return <div>Nieznany slug: {slug}</div>;
    }

    const queryPromise = client.queries.pages({
        relativePath: `${slug}.mdx`,
    });

    const result = use(queryPromise);

    const { data } = useTina({
        query: result.query,
        variables: result.variables,
        data: result.data,
    });

    return <Wrapper data={data.pages} />;
}
