type IconName = "clock" | "wrench" | "cart" | "calendar" | "shield" | "payment" | "bag" | "support";

interface FAQProps {
    data: {
        faq: {
            heading: string;
            items: Array<{
                question: string;
                answer: string;
                icon: IconName;
            }>;
        };
        [key: string]: unknown;
    };
}

export default function FAQ({ data }: FAQProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.faq.items.map((it) => ({
            '@type': 'Question',
            name: it.question,
            acceptedAnswer: { '@type': 'Answer', text: it.answer },
        })),
    };

    return (
        <section id="faq" className="py-16 bg-[#0b0b0b] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 
                    className="text-3xl font-bold text-center wrap-balance"
                    data-tina-field={data.faq.heading}
                >
                    {data.faq.heading}
                </h2>
                <div className="mt-8 divide-y divide-white/10 rounded-lg ring-1 ring-white/10 bg-[#111]">
                    {data.faq.items.map((it, index) => (
                        <details key={it.question} className="group open:bg-[#141414]">
                            <summary className="list-none cursor-pointer select-none px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/30">
                                <span className="flex items-center gap-3 sm:gap-4 min-w-0">
                                    <span className="inline-flex flex-none h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-md bg-yellow-400/10 text-yellow-400 ring-1 ring-yellow-400/30" aria-hidden>
                                        <Icon name={it.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
                                    </span>
                                    <span 
                                        className="font-medium text-white/90 leading-snug break-words wrap-balance"
                                        data-tina-field={data.faq.items[index].question}
                                    >
                                        {it.question}
                                    </span>
                                </span>
                                <span className="flex-none">
                                    <ChevronDownIcon className="h-4 w-4 text-white/60 transition-transform group-open:rotate-180" />
                                </span>
                            </summary>
                            <div 
                                className="px-5 pb-5 text-white/80 text-sm leading-relaxed"
                                data-tina-field={data.faq.items[index].answer}
                            >
                                {it.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </section>
    );
}

function Icon({ name, className }: { name: IconName; className?: string }) {
    switch (name) {
        case "clock":
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                </svg>
            );
        case "wrench":
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M14 7a4 4 0 01-5.66 3.66L3 16v5h5l5.34-5.34A4 4 0 1014 7z" />
                </svg>
            );
        case "cart":
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M3 3h2l.4 2M7 13h10l1.5-8H5.4M7 13L5.4 5M7 13a2 2 0 100 4 2 2 0 000-4m10 0a2 2 0 100 4 2 2 0 000-4" />
                </svg>
            );
        case "calendar":
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M16 3v4M8 3v4M3 11h18" />
                </svg>
            );
        case "shield":
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 3l7 3v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-3z" />
                </svg>
            );
        case "payment":
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 10h18" />
                </svg>
            );
        case "bag":
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M9 7h6a2 2 0 012 2v2H7V9a2 2 0 012-2z" />
                    <rect x="5" y="11" width="14" height="9" rx="2" />
                </svg>
            );
        case "support":
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M7 12V9a5 5 0 1110 0v6h-2v-2h1a2 2 0 002-2V9a7 7 0 10-14 0v3a2 2 0 002 2h1v2H7a2 2 0 01-2-2v-2" />
                </svg>
            );
        default:
            return null;
    }
}

function ChevronDownIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
            <path d="M6 9l6 6 6-6" />
        </svg>
    );
}
