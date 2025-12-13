"use client";

import { use, useEffect, useState } from "react";
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
    
    const [pageData, setPageData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);

    // Detect if we're in TinaCMS iframe
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsEditMode(window.self !== window.top);
            console.log('🎯 Edit Mode:', window.self !== window.top);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await client.queries.pages({
                    relativePath: `${slug}.mdx`,
                });
                setPageData(result);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching page data:", error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [slug]);

    const Wrapper = pageRegistry[slug];
    
    if (!Wrapper) {
        return <div>Nieznany slug: {slug}</div>;
    }

    if (isLoading || !pageData) {
        console.log('⏳ Loading state:', { isLoading, hasPageData: !!pageData });
        return <div>Ładowanie...</div>;
    }

    console.log('✅ Rendering AdminPageContent with slug:', slug);
    return <AdminPageContent pageData={pageData} Wrapper={Wrapper} />;
}

function AdminPageContent({ pageData, Wrapper }: { pageData: any; Wrapper: any }) {
    console.log('🚀 AdminPageContent mounted');
    
    const { data } = useTina({
        query: pageData.query,
        variables: pageData.variables,
        data: pageData.data,
    });

    console.log('📦 useTina returned data');

    useEffect(() => {
        console.log('🔍 TinaCMS Visual Edit Debug:', {
            isInIframe: window.self !== window.top,
            dataKeys: Object.keys(data),
            pagesKeys: data.pages ? Object.keys(data.pages) : [],
            heroKeys: data.pages?.hero ? Object.keys(data.pages.hero) : [],
            hasContentSource: '_content_source' in (data.pages || {}),
            hasHeroContentSource: '_content_source' in (data.pages?.hero || {}),
            sampleData: {
                tagline: data.pages?.hero?.tagline,
                heading: data.pages?.hero?.heading,
            }
        });
    }, [data]);

    return <Wrapper data={data.pages} />;
}
