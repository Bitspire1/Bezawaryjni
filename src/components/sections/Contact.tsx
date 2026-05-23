import { tinaField } from "tinacms/dist/react";
import ContactForm, { MapEmbed } from "../ContactForm";
import ObfuscatedEmail from "../ObfuscatedEmail";

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
        <section id="kontakt" className="bg-black py-16 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2
                    className="wrap-balance text-center text-3xl font-bold sm:text-4xl"
                    data-tina-field={tinaField(data.contact, "heading")}
                >
                    {data.contact.heading}
                </h2>
                <p
                    className="mx-auto mt-2 max-w-2xl text-center text-white/70"
                    data-tina-field={tinaField(data.contact, "description")}
                >
                    {data.contact.description}
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-[#121212] to-[#0e0e0e] p-4 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(250,204,21,0.35)] hover:ring-yellow-400/30 sm:p-5 lg:col-span-2">
                        <div
                            className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 hover:opacity-100"
                            style={{
                                background:
                                    "radial-gradient(360px circle at 0% 0%, rgba(250,204,21,0.06), transparent 40%)",
                            }}
                        />
                        <h3 className="relative text-center text-base font-semibold text-yellow-400 lg:text-left">
                            Formularz kontaktowy
                        </h3>
                        <div className="relative mt-3">
                            <ContactForm />
                        </div>
                    </div>

                    <div className="space-y-4 lg:col-span-1">
                        <a
                            href={`tel:${data.contact.phone}`}
                            className="group block rounded-lg bg-[#121212] px-4 py-3 ring-1 ring-white/10 transition-colors hover:bg-[#151515] hover:ring-yellow-400/30"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-yellow-400/10 text-yellow-400 ring-1 ring-yellow-400/30">
                                    <PhoneIcon className="h-5 w-5" />
                                </div>
                                <div className="leading-tight">
                                    <div className="text-xs text-white/60">Zadzwoń</div>
                                    <div
                                        className="text-lg font-semibold tracking-tight text-white"
                                        data-tina-field={tinaField(data.contact, "phone")}
                                    >
                                        {data.contact.phone}
                                    </div>
                                </div>
                            </div>
                        </a>

                        <a
                            href={`mailto:${data.contact.email}`}
                            className="group block rounded-lg bg-[#121212] px-4 py-3 ring-1 ring-white/10 transition-colors hover:bg-[#151515] hover:ring-yellow-400/30"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-yellow-400/10 text-yellow-400 ring-1 ring-yellow-400/30">
                                    <MailIcon className="h-5 w-5" />
                                </div>
                                <div className="leading-tight">
                                    <div className="text-xs text-white/60">Napisz maila</div>
                                    <div
                                        className="text-lg font-semibold tracking-tight text-white"
                                        data-tina-field={tinaField(data.contact, "email")}
                                    >
                                        <ObfuscatedEmail email={data.contact.email} />
                                    </div>
                                </div>
                            </div>
                        </a>

                        <div className="relative overflow-hidden rounded-lg bg-[#121212] p-3 ring-1 ring-white/10 transition-colors hover:ring-yellow-400/30 sm:p-4">
                            <div
                                className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 hover:opacity-100"
                                style={{
                                    background:
                                        "radial-gradient(260px circle at 0% 0%, rgba(250,204,21,0.06), transparent 40%)",
                                }}
                            />
                            <h3 className="relative text-sm font-semibold text-yellow-400">
                                Mapa dojazdu
                            </h3>
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
