import React from "react";

export default function SectionCard({
    id,
    n,
    title,
    children,
}: {
    id: string;
    n: number;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section id={id} className="rounded-xl bg-[#121212] p-4 ring-1 ring-white/10 sm:p-5">
            <div className="flex items-baseline gap-3">
                <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-yellow-400/15 text-xs font-semibold text-yellow-300 ring-1 ring-yellow-400/30">
                    {n}
                </span>
                <h2 className="text-lg font-semibold text-white">{title}</h2>
            </div>
            <div className="prose prose-invert mt-3 max-w-none">{children}</div>
        </section>
    );
}
