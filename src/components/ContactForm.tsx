"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactForm() {
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [error, setError] = useState<string>("");

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
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
            e.currentTarget.reset();
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
    const mapUrl = "https://maps.google.com/?q=54.453815228948436,16.980683571041087";
    const mapImage = "/images/map-static.avif";

    return (
        <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-lg bg-[#0e0e0e] ring-1 ring-white/10 transition-all hover:ring-yellow-400/30"
            aria-label="Otwórz lokalizację w Google Maps"
        >
            <div className="relative h-[260px] w-full sm:h-[300px] md:h-[340px]">
                {/* Static map image */}
                <Image
                    src={mapImage}
                    alt="Lokalizacja warsztatu Bezawaryjni - Szczecińska 1A, Kobylnica"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay with CTA */}
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-black shadow-lg">
                        Otwórz w Google Maps →
                    </span>
                </div>
                {/* Pin indicator always visible */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-2xl shadow-lg">
                        📍
                    </div>
                </div>
            </div>
        </a>
    );
}
