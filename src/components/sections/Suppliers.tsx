"use client";

import { tinaField } from "tinacms/dist/react";
import Image from "next/image";

function Logo({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="relative flex h-full w-full items-center justify-center">
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
        <section id="dostawcy" className="bg-black py-12 text-white sm:py-16">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <h2
                    className="wrap-balance text-3xl font-bold text-yellow-400 sm:text-4xl"
                    data-tina-field={tinaField(data.suppliers, "heading")}
                >
                    {data.suppliers.heading}
                </h2>
                <p
                    className="mx-auto mt-3 max-w-2xl text-white/80"
                    data-tina-field={tinaField(data.suppliers, "description")}
                >
                    {data.suppliers.description}
                </p>

                <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8">
                    {data.suppliers.logos.map((logo, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-xl bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(250,204,21,0.4)] sm:p-8"
                            data-tina-field={tinaField(data.suppliers.logos[index], "image")}
                        >
                            <div
                                className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                                style={{
                                    background:
                                        "radial-gradient(360px circle at 50% 50%, rgba(250,204,21,0.08), transparent 60%)",
                                }}
                            />
                            <div className="relative flex h-24 items-center justify-center sm:h-28">
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
