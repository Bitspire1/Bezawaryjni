"use client";

import { tinaField } from "tinacms/dist/react";
import { CheckCircle } from "lucide-react";

interface WhyUsSectionProps {
    data: {
        whyUs?: {
            heading: string;
            description: string;
            points: Array<{
                title: string;
                description: string;
            }>;
        };
        [key: string]: unknown;
    };
}

export default function WhyUsSection({ data }: WhyUsSectionProps) {
    if (!data.whyUs) return null;

    const { whyUs } = data;

    return (
        <section id="dlaczego-my" className="bg-[#0b0b0b] py-16 text-white sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2
                        className="wrap-balance text-3xl font-bold text-yellow-400 sm:text-4xl"
                        data-tina-field={tinaField(whyUs, "heading")}
                    >
                        {whyUs.heading}
                    </h2>
                    <p
                        className="mx-auto mt-4 max-w-3xl text-lg text-white/80"
                        data-tina-field={tinaField(whyUs, "description")}
                    >
                        {whyUs.description}
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {whyUs.points.map((point, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-[#121212] to-[#0e0e0e] p-6 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(250,204,21,0.35)] hover:ring-yellow-400/30"
                            data-tina-field={tinaField(whyUs.points[index], "title")}
                        >
                            <div
                                className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                                style={{
                                    background:
                                        "radial-gradient(360px circle at 50% 0%, rgba(250,204,21,0.08), transparent 40%)",
                                }}
                            />
                            <div className="relative">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400/10 text-yellow-400">
                                    <CheckCircle className="h-6 w-6" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-white">
                                    {point.title}
                                </h3>
                                <p className="text-sm text-white/70">{point.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
