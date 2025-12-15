import { tinaField } from "tinacms/dist/react";
import PolicySection from "@/components/sections/PolicySection";

interface TableOfContentsItem {
    label: string;
    href: string;
    [key: string]: unknown;
}

interface PolicySectionData {
    id: string;
    n: number;
    title: string;
    content: any;
    [key: string]: unknown;
}

interface PrivacyPolicyData {
    [key: string]: unknown;
    title: string;
    metaTitle?: string;
    metaDescription?: string;
    lastUpdate?: string;
    heading: string;
    tableOfContents?: TableOfContentsItem[];
    policySections: PolicySectionData[];
}

interface PrivacyPolicyWrapperProps {
    data: PrivacyPolicyData;
}

export default function PrivacyPolicyWrapper({ data }: PrivacyPolicyWrapperProps) {
    return (
        <main className="min-h-screen bg-black text-white">
            <section className="py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 
                        className="text-3xl sm:text-4xl font-bold wrap-balance text-yellow-400"
                        data-tina-field={tinaField(data, 'heading')}
                    >
                        {data.heading}
                    </h1>
                    {data.lastUpdate && (
                        <p 
                            className="mt-2 text-white/70 text-sm"
                            data-tina-field={tinaField(data, 'lastUpdate')}
                        >
                            Ostatnia aktualizacja: {data.lastUpdate}
                        </p>
                    )}

                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* TOC */}
                        {data.tableOfContents && data.tableOfContents.length > 0 && (
                            <aside className="lg:col-span-4">
                                <div className="rounded-xl bg-[#121212] ring-1 ring-white/10 p-4 lg:sticky lg:top-20">
                                    <h2 className="text-sm font-semibold text-yellow-400">Spis treści</h2>
                                    <nav aria-label="Spis treści" className="mt-3 text-sm">
                                        <ol className="space-y-2 text-white/80 list-decimal list-inside">
                                            {data.tableOfContents.map((item, index) => (
                                                <li key={index}>
                                                    <a 
                                                        className="hover:text-yellow-400" 
                                                        href={item.href}
                                                        data-tina-field={tinaField(data.tableOfContents![index], 'label')}
                                                    >
                                                        {item.label}
                                                    </a>
                                                </li>
                                            ))}
                                        </ol>
                                    </nav>
                                </div>
                            </aside>
                        )}

                        {/* Content */}
                        <div className={`${data.tableOfContents && data.tableOfContents.length > 0 ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-5`}>
                            {data.policySections?.map((section, index) => (
                                <PolicySection key={section.id || index} data={data} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
