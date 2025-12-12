"use client";

import CountUp from "../features/CountUp";

interface AboutUsProps {
    data: {
        aboutUs?: {
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
    if (!data.aboutUs) {
        return null;
    }

    return (
        <section id="nasza-firma" className="py-20 bg-black text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Text */}
                    <div className="space-y-6">
                        <h2 
                            className="text-4xl md:text-5xl font-bold text-yellow-400"
                            data-tina-field={data.aboutUs.heading}
                        >
                            {data.aboutUs.heading}
                        </h2>
                        <p 
                            className="text-lg text-white/80 leading-relaxed"
                            data-tina-field={data.aboutUs.description}
                        >
                            {data.aboutUs.description}
                        </p>
                        <p 
                            className="text-lg text-white/80 leading-relaxed"
                            data-tina-field={data.aboutUs.descriptionSecondary}
                        >
                            {data.aboutUs.descriptionSecondary}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-6">
                            {data.aboutUs.stats.map((stat, idx) => (
                                <div 
                                    key={idx} 
                                    className="bg-white/5 rounded-lg p-6 text-center border border-white/10"
                                >
                                    <div className="text-3xl md:text-4xl font-bold text-yellow-400">
                                        <CountUp end={stat.value} duration={2} />
                                    </div>
                                    <p className="text-sm text-white/60 mt-2">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Benefits */}
                    <div className="bg-[#111] rounded-xl p-8 border border-white/10">
                        <h3 className="text-2xl font-semibold text-yellow-400 mb-6">
                            Co nas wyróżnia
                        </h3>
                        <ul className="space-y-4">
                            {data.aboutUs.benefits.map((benefit, idx) => (
                                <li 
                                    key={idx} 
                                    className="flex items-start gap-3"
                                >
                                    <span className="text-yellow-400 text-xl mt-0.5">•</span>
                                    <span className="text-white/90">{benefit.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
