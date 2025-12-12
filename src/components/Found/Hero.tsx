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
    };
}

export default function Hero({ data }: HeroProps) {
    return (
        <section id="home" className="relative isolate">
            <picture>
                <source srcSet="/yellow-car.avif" type="image/avif" />
                <img src="/hero-garage.jpg" alt="" aria-hidden decoding="async" loading="eager" fetchPriority="high"
                    className="absolute inset-0 -z-10 h-full w-full object-cover" />
            </picture>
            <div className="pointer-events-none absolute inset-0 -z-10 bg-black/65" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-36 min-h-[60vh] sm:min-h-[70vh] flex flex-col justify-center text-white text-center md:text-left" data-animate>
                <p 
                    className="text-yellow-400 font-semibold tracking-widest uppercase text-sm mb-4"
                    data-tina-field={data.hero.tagline}
                >
                    {data.hero.tagline}
                </p>
                <h1 
                    className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 wrap-balance"
                    data-tina-field={data.hero.heading}
                >
                    {data.hero.heading}
                </h1>
                <p 
                    className="text-base sm:text-lg text-white/90 max-w-2xl mb-8 mx-auto md:mx-0"
                    data-tina-field={data.hero.description}
                >
                    {data.hero.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <a 
                        href={data.hero.ctaPrimary.url}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-yellow-400 text-black font-semibold px-5 py-3 hover:bg-yellow-300 transition w-full sm:w-auto"
                        data-tina-field={data.hero.ctaPrimary.text}
                    >
                        {data.hero.ctaPrimary.text}
                    </a>
                    <a 
                        href={data.hero.ctaSecondary.url}
                        className="inline-flex items-center justify-center gap-2 rounded-md ring-1 ring-white/40 px-5 py-3 hover:bg-white/10 transition w-full sm:w-auto"
                        data-tina-field={data.hero.ctaSecondary.text}
                    >
                        {data.hero.ctaSecondary.text}
                    </a>
                </div>
            </div>
        </section>
    );
}
