import ContactForm, { MapEmbed } from "../ContactForm";

interface ContactProps {
    data: {
        contact: {
            heading: string;
            description: string;
            phone: string;
            email: string;
        };
        [key: string]: unknown;
    };
}

export default function Contact({ data }: ContactProps) {
    return (
        <section id="kontakt" className="py-16 bg-black text-white" data-animate>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 
                    className="text-3xl sm:text-4xl font-bold wrap-balance text-center"
                    data-tina-field={data.contact.heading}
                >
                    {data.contact.heading}
                </h2>
                <p 
                    className="text-white/70 mt-2 max-w-2xl mx-auto text-center"
                    data-tina-field={data.contact.description}
                >
                    {data.contact.description}
                </p>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-[#121212] to-[#0e0e0e] ring-1 ring-white/10 p-4 sm:p-5 lg:col-span-2 transition-all duration-300 hover:-translate-y-1 hover:ring-yellow-400/30 hover:shadow-[0_12px_32px_-12px_rgba(250,204,21,0.35)]">
                        <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition duration-500" style={{
                            background: "radial-gradient(360px circle at 0% 0%, rgba(250,204,21,0.06), transparent 40%)",
                        }} />
                        <h3 className="relative text-base font-semibold text-yellow-400 text-center lg:text-left">Formularz kontaktowy</h3>
                        <div className="relative mt-3">
                            <ContactForm />
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-4">
                        <a 
                            href={`tel:${data.contact.phone}`}
                            className="group block rounded-lg ring-1 ring-white/10 bg-[#121212] px-4 py-3 hover:ring-yellow-400/30 hover:bg-[#151515] transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-md bg-yellow-400/10 text-yellow-400 ring-1 ring-yellow-400/30 flex items-center justify-center shrink-0">
                                    <PhoneIcon className="h-5 w-5" />
                                </div>
                                <div className="leading-tight">
                                    <div className="text-xs text-white/60">Zadzwoń</div>
                                    <div 
                                        className="text-lg font-semibold tracking-tight text-white"
                                        data-tina-field={data.contact.phone}
                                    >
                                        {data.contact.phone}
                                    </div>
                                </div>
                            </div>
                        </a>

                        <a 
                            href={`mailto:${data.contact.email}`}
                            className="group block rounded-lg ring-1 ring-white/10 bg-[#121212] px-4 py-3 hover:ring-yellow-400/30 hover:bg-[#151515] transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-md bg-yellow-400/10 text-yellow-400 ring-1 ring-yellow-400/30 flex items-center justify-center shrink-0">
                                    <MailIcon className="h-5 w-5" />
                                </div>
                                <div className="leading-tight">
                                    <div className="text-xs text-white/60">Napisz maila</div>
                                    <div 
                                        className="text-lg font-semibold tracking-tight text-white"
                                        data-tina-field={data.contact.email}
                                    >
                                        {data.contact.email}
                                    </div>
                                </div>
                            </div>
                        </a>

                        <div className="relative overflow-hidden rounded-lg bg-[#121212] ring-1 ring-white/10 p-3 sm:p-4 transition-colors hover:ring-yellow-400/30">
                            <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition duration-500" style={{
                                background: "radial-gradient(260px circle at 0% 0%, rgba(250,204,21,0.06), transparent 40%)",
                            }} />
                            <h3 className="relative text-sm font-semibold text-yellow-400">Mapa dojazdu</h3>
                            <div className="relative mt-2">
                                <MapEmbed />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function PhoneIcon({ className = "h-6 w-6" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C11.85 21 3 12.15 3 1a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.2 2.2z" />
        </svg>
    );
}

function MailIcon({ className = "h-6 w-6" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
            <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
    );
}
