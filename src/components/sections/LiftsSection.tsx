"use client";

import Image from "next/image";

interface LiftsSectionProps {
    data: {
        lifts?: {
            heading: string;
            description: string;
            items: Array<{
                title: string;
                image: string;
                alt: string;
                capacity?: string;
            }>;
        };
        [key: string]: unknown;
    };
}

export default function LiftsSection({ data }: LiftsSectionProps) {
    if (!data.lifts) {
        return null;
    }

    return (
        <section id="stanowiska" className="py-16 bg-gradient-to-b from-black to-zinc-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 
                    className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-4"
                >
                    {data.lifts.heading}
                </h2>
                <p 
                    className="text-lg text-white/80 max-w-3xl mx-auto"
                >
                    {data.lifts.description}
                </p>
            </div>                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.lifts.items.map((item, idx) => (
                        <div 
                            key={idx} 
                            className="group relative overflow-hidden rounded-xl bg-zinc-800/50 border border-white/10 hover:border-yellow-400/50 transition-all duration-300"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.alt}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                                    {item.title}
                                </h3>
                                {item.capacity && (
                                    <p className="text-white/70 text-sm">
                                        Udźwig: <span className="text-yellow-400 font-semibold">{item.capacity}</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
