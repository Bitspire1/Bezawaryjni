import { tinaField } from "tinacms/dist/react";
import SectionCard from "@/components/ui/SectionCard";

interface PolicySectionProps {
    data: {
        id: string;
        n: number;
        title: string;
        content: string;
    };
}

export default function PolicySection({ data }: PolicySectionProps) {
    return (
        <SectionCard 
            id={data.id} 
            n={data.n} 
            title={data.title}
            data-tina-field={tinaField(data, 'title')}
        >
            <div 
                className="prose prose-invert max-w-none
                    [&>p]:text-white/80 [&>p]:leading-relaxed [&>p]:mb-3
                    [&>ul]:space-y-2 [&>ul]:mt-3 [&>ul]:ml-0 [&>ul]:list-none
                    [&>ul>li]:text-white/80 [&>ul>li]:pl-6 [&>ul>li]:relative
                    [&>ul>li]:before:content-['•'] [&>ul>li]:before:absolute [&>ul>li]:before:left-2
                    [&>ul>li]:before:text-yellow-400 [&>ul>li]:before:font-bold
                    [&_strong]:text-yellow-400 [&_strong]:font-semibold
                    [&_a]:text-yellow-400 [&_a]:underline [&_a]:decoration-yellow-400/30
                    [&_a:hover]:text-yellow-300 [&_a:hover]:decoration-yellow-300"
                data-tina-field={tinaField(data, 'content')}
                dangerouslySetInnerHTML={{ __html: data.content }}
            />
        </SectionCard>
    );
}
