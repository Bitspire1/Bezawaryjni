"use client";

import Image from "next/image";

function Logo({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="relative h-full w-full flex items-center justify-center">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 50vw, 33vw"
                priority={false}
            />
        </div>
    );
}

interface SuppliersProps {
    data: {
        suppliers: {
            heading: string;
            description: string;
            logos: Array<{
                name: string;
                image: string;
                alt: string;
            }>;
        };
        [key: string]: unknown;
    };
}

export default function Suppliers({ data }: SuppliersProps) {
    return (
        <section id="dostawcy" className="py-12 sm:py-16 bg-black text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 
                    className="text-3xl sm:text-4xl font-bold text-yellow-400 wrap-balance"
                    data-tina-field={data.suppliers.heading}
                >
                    {data.suppliers.heading}
                </h2>
                <p 
                    className="mt-3 text-white/80 max-w-2xl mx-auto"
                    data-tina-field={data.suppliers.description}
                >
                    {data.suppliers.description}
                </p>

                <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                    {data.suppliers.logos.map((logo, index) => (
                        <div 
                            key={index}
                            className="group relative overflow-hidden rounded-xl bg-white p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(250,204,21,0.4)]"
                        >
                            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500" style={{
                                background: "radial-gradient(360px circle at 50% 50%, rgba(250,204,21,0.08), transparent 60%)",
                            }} />
                            <div className="relative flex items-center justify-center h-24 sm:h-28">
                                <div className="relative h-full w-full">
                                    <Logo src={logo.image} alt={logo.alt} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
