"use client";

import { tinaField } from "tinacms/dist/react";
import CountUp from "../features/CountUp";

interface AboutUsProps {
    data: {
        aboutUs: {
            heading: string;
            description: string;
            descriptionSecondary: string;
            stats: Array<{
                value: number;
                label: string;
            }>;
            benefits: Array<{
                text: string;
            }>;
        };
        [key: string]: unknown;
    };
}

export default function AboutUs({ data }: AboutUsProps) {
    return (
        <section id="nasza-firma" className="bg-black py-20 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-start gap-12 lg:grid-cols-2">
                    {/* Left: Text */}
                    <div className="space-y-6">
                        <h2
                            className="text-4xl font-bold text-yellow-400 md:text-5xl"
                            data-tina-field={tinaField(data.aboutUs, "heading")}
                        >
                            {data.aboutUs.heading}
                        </h2>
                        <p
                            className="text-lg leading-relaxed text-white/80"
                            data-tina-field={tinaField(data.aboutUs, "description")}
                        >
                            {data.aboutUs.description}
                        </p>
                        <p
                            className="text-lg leading-relaxed text-white/80"
                            data-tina-field={tinaField(data.aboutUs, "descriptionSecondary")}
                        >
                            {data.aboutUs.descriptionSecondary}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-6">
                            {data.aboutUs.stats.map((stat, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-lg border border-white/10 bg-white/5 p-6 text-center"
                                    data-tina-field={tinaField(data.aboutUs.stats[idx], "value")}
                                >
                                    <div className="text-3xl font-bold text-yellow-400 md:text-4xl">
                                        <CountUp end={stat.value} duration={2} />
                                    </div>
                                    <p
                                        className="mt-2 text-sm text-white/60"
                                        data-tina-field={tinaField(
                                            data.aboutUs.stats[idx],
                                            "label",
                                        )}
                                    >
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Benefits */}
                    <div className="rounded-xl border border-white/10 bg-[#111] p-8">
                        <h3 className="mb-6 text-2xl font-semibold text-yellow-400">
                            Co nas wyróżnia
                        </h3>
                        <ul className="space-y-4">
                            {data.aboutUs.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <span className="mt-0.5 text-xl text-yellow-400">•</span>
                                    <span
                                        className="text-white/90"
                                        data-tina-field={tinaField(
                                            data.aboutUs.benefits[idx],
                                            "text",
                                        )}
                                    >
                                        {benefit.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
