import { tinaField } from "tinacms/dist/react";

interface HeroProps {
    data: {
        hero: {
            tagline: string;
            heading: string;
            description: string;
            ctaPrimary: {
                text: string;
                url: string;
            };
            ctaSecondary: {
                text: string;
                url: string;
            };
        };
        [key: string]: unknown;
    };
}

export default function Hero({ data }: HeroProps) {
    return (
        <section id="home" className="relative isolate" data-tina-field={tinaField(data, "hero")}>
            <picture>
                <source srcSet="/images/yellow-car.avif" type="image/avif" />
                <img
                    src="/images/yellow-car.avif"
                    alt=""
                    aria-hidden
                    decoding="async"
                    loading="eager"
                    fetchPriority="high"
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
            </picture>
            <div className="pointer-events-none absolute inset-0 -z-10 bg-black/65" />
            <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-center px-4 py-16 text-center text-white sm:min-h-[70vh] sm:px-6 sm:py-24 md:py-36 md:text-left lg:px-8">
                <p
                    className="mb-4 text-sm font-semibold tracking-widest text-yellow-400 uppercase"
                    data-tina-field={tinaField(data.hero, "tagline")}
                >
                    {data.hero.tagline}
                </p>
                <h1
                    className="wrap-balance mb-4 text-3xl font-extrabold sm:text-5xl md:text-6xl"
                    data-tina-field={tinaField(data.hero, "heading")}
                >
                    {data.hero.heading}
                </h1>
                <p
                    className="mx-auto mb-8 max-w-2xl text-base text-white/90 sm:text-lg md:mx-0"
                    data-tina-field={tinaField(data.hero, "description")}
                >
                    {data.hero.description}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                    <a
                        href={data.hero.ctaPrimary.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:bg-yellow-300 sm:w-auto"
                        data-tina-field={tinaField(data.hero.ctaPrimary, "text")}
                    >
                        {data.hero.ctaPrimary.text}
                    </a>
                    <a
                        href={data.hero.ctaSecondary.url}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 ring-1 ring-white/40 transition hover:bg-white/10 sm:w-auto"
                        data-tina-field={tinaField(data.hero.ctaSecondary, "text")}
                    >
                        {data.hero.ctaSecondary.text}
                    </a>
                </div>
            </div>
        </section>
    );
}
