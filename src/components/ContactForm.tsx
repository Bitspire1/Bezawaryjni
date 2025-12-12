"use client";

import { useState } from "react";

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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm text-white/80 mb-1" htmlFor="name">Imię i nazwisko</label>
                    <input id="name" name="name" required className="w-full rounded-md bg-black/30 ring-1 ring-white/15 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-yellow-400/40" placeholder="Jan Kowalski" />
                </div>
                <div>
                    <label className="block text-sm text-white/80 mb-1" htmlFor="email">E‑mail</label>
                    <input id="email" name="email" type="email" required className="w-full rounded-md bg-black/30 ring-1 ring-white/15 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-yellow-400/40" placeholder="jan@example.com" />
                </div>
                <div className="sm:col-span-2">
                    <label className="block text-sm text-white/80 mb-1" htmlFor="phone">Telefon (opcjonalnie)</label>
                    <input id="phone" name="phone" className="w-full rounded-md bg-black/30 ring-1 ring-white/15 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-yellow-400/40" placeholder="+48 000 000 000" />
                </div>
                <div className="sm:col-span-2">
                    <label className="block text-sm text-white/80 mb-1" htmlFor="message">Wiadomość</label>
                    <textarea id="message" name="message" required rows={4} className="w-full rounded-md bg-black/30 ring-1 ring-white/15 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-yellow-400/40" placeholder="Opisz krótko sprawę..." />
                </div>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}
            {status === "success" && <p className="text-sm text-green-400">Dziękujemy! Wiadomość została wysłana.</p>}

            <div className="flex flex-col sm:flex-row gap-3">
                <button disabled={status === "sending"} className="inline-flex items-center justify-center rounded-md bg-yellow-400 text-black font-semibold px-5 py-3 hover:bg-yellow-300 transition disabled:opacity-60">
                    {status === "sending" ? "Wysyłanie..." : "Wyślij wiadomość"}
                </button>
                <a href="tel:+48000000000" className="inline-flex items-center justify-center rounded-md ring-1 ring-white/20 px-5 py-3 hover:bg-white/10 hover:ring-yellow-400/30 transition">Zadzwoń do nas</a>
            </div>
        </form>
    );
}

export function MapEmbed() {
    const [interactive, setInteractive] = useState(false);
    return (
        <div className="relative rounded-lg overflow-hidden ring-1 ring-white/10 bg-[#0e0e0e]">
            {!interactive && (
                <button
                    type="button"
                    onClick={() => setInteractive(true)}
                    className="absolute inset-0 z-10 grid place-items-center bg-black/30 text-white/80 backdrop-blur-sm"
                    aria-label="Włącz interakcję z mapą"
                >
                    <span className="rounded-full bg-black/40 ring-1 ring-white/20 px-4 py-2 text-sm">Kliknij, aby włączyć mapę</span>
                </button>
            )}
            <iframe
                title="Mapa dojazdu"
                className="w-full h-[260px] sm:h-[300px] md:h-[340px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Szczeci%C5%84ska+1A,+76-251+Kobylnica&output=embed"
                style={{ border: 0, pointerEvents: interactive ? "auto" as const : "none" as const }}
                allowFullScreen
            />
        </div>
    );
}
