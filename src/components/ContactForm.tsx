"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactForm() {
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [error, setError] = useState<string>("");

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        setError("");
        setStatus("sending");

        const fd = new FormData(e.currentTarget);
        // simple honeypot
        if ((fd.get("company") as string)?.length) {
            setStatus("success");
            return;
        }

        const payload = {
            name: (fd.get("name") || "").toString().trim(),
            email: (fd.get("email") || "").toString().trim(),
            phone: (fd.get("phone") || "").toString().trim(),
            message: (fd.get("message") || "").toString().trim(),
        };

        if (!payload.name || !payload.email || !payload.message) {
            setError("Uzupełnij imię, e‑mail i wiadomość.");
            setStatus("idle");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
            setError("Podaj poprawny adres e‑mail.");
            setStatus("idle");
            return;
        }

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error("Błąd serwera");
            setStatus("success");
            form.reset();
        } catch {
            setStatus("error");
            setError("Nie udało się wysłać formularza. Spróbuj ponownie.");
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-3" noValidate>
            <input type="text" name="company" className="hidden" tabIndex={-1} aria-hidden="true" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm text-white/80" htmlFor="name">
                        Imię i nazwisko
                    </label>
                    <input
                        id="name"
                        name="name"
                        required
                        className="w-full rounded-md bg-black/30 px-3 py-2 text-white placeholder-white/40 ring-1 ring-white/15 focus:ring-yellow-400/40 focus:outline-none"
                        placeholder="Jan Kowalski"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm text-white/80" htmlFor="email">
                        E‑mail
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full rounded-md bg-black/30 px-3 py-2 text-white placeholder-white/40 ring-1 ring-white/15 focus:ring-yellow-400/40 focus:outline-none"
                        placeholder="jan@example.com"
                    />
                </div>
                <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm text-white/80" htmlFor="phone">
                        Telefon (opcjonalnie)
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        className="w-full rounded-md bg-black/30 px-3 py-2 text-white placeholder-white/40 ring-1 ring-white/15 focus:ring-yellow-400/40 focus:outline-none"
                        placeholder="+48 000 000 000"
                    />
                </div>
                <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm text-white/80" htmlFor="message">
                        Wiadomość
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        className="w-full rounded-md bg-black/30 px-3 py-2 text-white placeholder-white/40 ring-1 ring-white/15 focus:ring-yellow-400/40 focus:outline-none"
                        placeholder="Opisz krótko sprawę..."
                    />
                </div>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}
            {status === "success" && (
                <p className="text-sm text-green-400">Dziękujemy! Wiadomość została wysłana.</p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
                <button
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center rounded-md bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:bg-yellow-300 disabled:opacity-60"
                >
                    {status === "sending" ? "Wysyłanie..." : "Wyślij wiadomość"}
                </button>
                <a
                    href="tel:+48000000000"
                    className="inline-flex items-center justify-center rounded-md px-5 py-3 ring-1 ring-white/20 transition hover:bg-white/10 hover:ring-yellow-400/30"
                >
                    Zadzwoń do nas
                </a>
            </div>
        </form>
    );
}

export function MapEmbed() {
    const [isLoaded, setIsLoaded] = useState(false);
    const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2321.6208396577733!2d16.97810777692425!3d54.45381997234147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4701a1234567890%3A0xabcdef1234567890!2sSzczeci%C5%84ska%201A%2C%2076-251%20Kobylnica!5e0!3m2!1spl!2spl!4v1699900000000";

    return (
        <div className="relative overflow-hidden rounded-lg bg-[#0e0e0e] ring-1 ring-white/10">
            {!isLoaded && (
                <div className="flex h-[260px] w-full items-center justify-center sm:h-[300px] md:h-[340px]">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-yellow-400" />
                </div>
            )}
            <iframe
                src={mapUrl}
                title="Mapa dojazdu - Bezawaryjni AutoSerwis"
                className={`h-[260px] w-full rounded-lg sm:h-[300px] md:h-[340px] ${isLoaded ? "opacity-100" : "opacity-0"}`}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setIsLoaded(true)}
            />
        </div>
    );
}
