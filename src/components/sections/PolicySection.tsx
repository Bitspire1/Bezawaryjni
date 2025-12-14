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
                className="prose prose-invert prose-sm max-w-none"
                data-tina-field={tinaField(data, 'content')}
                dangerouslySetInnerHTML={{ __html: data.content }}
            />
        </SectionCard>
    );
}
