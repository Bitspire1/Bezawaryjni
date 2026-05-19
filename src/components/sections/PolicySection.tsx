import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

interface PolicySectionProps {
    data: {
        policySections: Array<{
            id: string;
            n: number;
            title: string;
            content: any;
        }>;
        [key: string]: unknown;
    };
    index: number;
}

export default function PolicySection({ data, index }: PolicySectionProps) {
    const section = data.policySections[index];

    return (
        <section
            id={section.id}
            className="rounded-xl bg-[#121212] p-4 ring-1 ring-white/10 sm:p-5"
        >
            <div className="flex items-baseline gap-3">
                <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-yellow-400/15 text-xs font-semibold text-yellow-300 ring-1 ring-yellow-400/30">
                    {section.n}
                </span>
                <h2
                    className="text-lg font-semibold text-white"
                    data-tina-field={tinaField(data.policySections[index], "title")}
                >
                    {section.title}
                </h2>
            </div>
            <div
                className="prose prose-invert mt-3 max-w-none [&_a]:text-yellow-400 [&_a]:underline [&_a]:decoration-yellow-400/30 [&_a:hover]:text-yellow-300 [&_a:hover]:decoration-yellow-300 [&_strong]:font-semibold [&_strong]:text-yellow-400 [&>p]:mb-3 [&>p]:leading-relaxed [&>p]:text-white/80 [&>ul]:mt-3 [&>ul]:ml-0 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6 [&>ul>li]:pl-2 [&>ul>li]:text-white/80 [&>ul>li]:marker:text-yellow-400"
                data-tina-field={tinaField(data.policySections[index], "content")}
            >
                <TinaMarkdown content={section.content} />
            </div>
        </section>
    );
}
