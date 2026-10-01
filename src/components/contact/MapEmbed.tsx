"use client";

import { useState } from "react";

export default function MapEmbed() {
    const [showMap, setShowMap] = useState(false);
    const mapUrl =
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2321.6208396577733!2d16.97810777692425!3d54.45381997234147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4701a1234567890%3A0xabcdef1234567890!2sSzczeci%C5%84ska%201A%2C%2076-251%20Kobylnica!5e0!3m2!1spl!2spl!4v1699900000000";

    return (
        <div className="relative overflow-hidden rounded-lg bg-[#0e0e0e] ring-1 ring-white/10">
            {!showMap && (
                <div className="flex h-[260px] w-full flex-col items-center justify-center gap-4 sm:h-[300px] md:h-[340px]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400/10 text-yellow-400 ring-1 ring-yellow-400/30">
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </div>
                    <span className="text-sm text-white/70">
                        Kliknij, aby załadować mapę Google
                    </span>
                    <button
                        type="button"
                        onClick={() => setShowMap(true)}
                        className="inline-flex items-center gap-2 rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-300"
                    >
                        Pokaż mapę
                    </button>
                </div>
            )}
            {showMap && (
                <iframe
                    src={mapUrl}
                    title="Mapa dojazdu - Bezawaryjni AutoSerwis"
                    className="h-[260px] w-full rounded-lg sm:h-[300px] md:h-[340px]"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            )}
        </div>
    );
}
