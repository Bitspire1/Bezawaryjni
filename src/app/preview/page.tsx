"use client";

import { useTina } from "tinacms/dist/react";
import { useEffect, useState } from "react";
import client from "tina/__generated__/client";
import HomePageWrapper from "@/components/pages/HomePageWrapper";

type QueryResult = Awaited<ReturnType<typeof client.queries.pages>>;

export default function PreviewHome() {
    const [data, setData] = useState<QueryResult | null>(null);

    useEffect(() => {
        if (window.parent !== window) {
            (window as Window & { __TINA_IFRAME__?: boolean }).__TINA_IFRAME__ = true;
            window.parent.postMessage({ type: "loaded" }, "*");
        }
        client.queries.pages({ relativePath: "home.md" }).then(setData).catch(console.error);
    }, []);

    return data ? <LiveHome query={data} /> : null;
}

function LiveHome({ query }: { query: QueryResult }) {
    const { data } = useTina(query);

    return <HomePageWrapper data={data.pages as any} />;
}
