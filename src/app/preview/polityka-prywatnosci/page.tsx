"use client";

import { useTina } from "tinacms/dist/react";
import { useEffect, useState } from "react";
import client from "tina/__generated__/client";
import PrivacyPolicyWrapper from "@/components/pages/PrivacyPolicyWrapper";

type QueryResult = Awaited<ReturnType<typeof client.queries.pages>>;

export default function PreviewPolitykaPrywatnosci() {
    const [data, setData] = useState<QueryResult | null>(null);

    useEffect(() => {
        client.queries
            .pages({ relativePath: "polityka-prywatnosci.md" })
            .then(setData)
            .catch(console.error);
    }, []);

    return data ? <LivePolicy query={data} /> : null;
}

function LivePolicy({ query }: { query: QueryResult }) {
    const { data } = useTina(query);

    return <PrivacyPolicyWrapper data={data.pages as any} />;
}
