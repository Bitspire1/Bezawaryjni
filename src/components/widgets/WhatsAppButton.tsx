"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "./whatsapp.css";

const POPUP_DELAY_MS = 5000;

function WhatsappIcon({ size = 32 }: { size?: number }) {
    return (
        <svg viewBox="0 0 448 512" width={size} height={size} fill="currentColor" aria-hidden>
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
    );
}

function TimesIcon({ size = 28 }: { size?: number }) {
    return (
        <svg viewBox="0 0 352 512" width={size} height={size} fill="currentColor" aria-hidden>
            <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
        </svg>
    );
}

function PaperPlaneIcon({ size = 16 }: { size?: number }) {
    return (
        <svg viewBox="0 0 512 512" width={size} height={size} fill="currentColor" aria-hidden>
            <path d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z" />
        </svg>
    );
}

export default function WhatsAppButton() {
    const [mounted, setMounted] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [message, setMessage] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "";

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !phone) return;
        const timer = setTimeout(() => setShowPopup(true), POPUP_DELAY_MS);
        return () => clearTimeout(timer);
    }, [mounted, phone]);

    // Handle Enter / Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter" && isChatOpen && message.trim()) {
                window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
                setMessage("");
            }
            if (e.key === "Escape" && isChatOpen) {
                setIsChatOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isChatOpen, message, phone]);

    if (!mounted || !phone) return null;

    const handleDismissPopup = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setShowPopup(false);
        setDismissed(true);
    };

    const handleToggleChat = () => {
        if (!isChatOpen) {
            // Opening chat dismisses the popup forever
            handleDismissPopup();
            setIsChatOpen(true);
            // focus input smoothly after open
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setIsChatOpen(false);
        }
    };

    const handleSend = () => {
        if (!message.trim()) return;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
        setMessage("");
    };

    const currentTime = new Date().toLocaleTimeString("pl-PL", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <>
            {/* ── CHAT WINDOW ── */}
            {isChatOpen && (
                <div className="wa-chat-container wa-chat-layout">
                    {/* Header */}
                    <div className="wa-chat-header">
                        <button
                            onClick={() => setIsChatOpen(false)}
                            aria-label="Zamknij czat"
                            className="wa-chat-close"
                        >
                            <TimesIcon size={16} />
                        </button>

                        <div className="wa-avatar-wrapper">
                            <Image
                                src="/images/Kacper.webp"
                                alt="Kacper Nowosielski"
                                width={50}
                                height={50}
                                className="wa-avatar"
                            />
                            <span className="wa-status-dot" />
                        </div>

                        <div>
                            <div className="wa-chat-name">Kacper Nowosielski</div>
                            <div className="wa-chat-status">Zwykle odpowiadam w parę minut</div>
                        </div>
                    </div>

                    {/* Chat Body */}
                    <div className="wa-chat-bg wa-chat-body">
                        {/* Message Bubble */}
                        <div className="wa-message-bubble">
                            <div className="wa-message-arrow" />
                            <div className="wa-message-sender">Kacper Nowosielski</div>
                            <div className="wa-message-text">Cześć! 👋 W czym mogę Ci pomóc?</div>
                            <div className="wa-message-time">{currentTime}</div>
                        </div>
                    </div>

                    {/* Footer Input */}
                    <div className="wa-chat-input wa-chat-input-custom">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Napisz wiadomość..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="wa-input-field"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!message.trim()}
                            className="wa-send-btn"
                            style={{
                                backgroundColor: message.trim() ? "#128C7E" : "#999",
                                cursor: message.trim() ? "pointer" : "default",
                            }}
                            aria-label="Wyślij"
                        >
                            <PaperPlaneIcon size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* ── POPUP (DYMEK) ── */}
            {showPopup && !dismissed && !isChatOpen && (
                <div onClick={handleToggleChat} className="wa-popup wa-popup-cursor">
                    <div className="wa-popup-inner">
                        <button
                            onClick={handleDismissPopup}
                            aria-label="Zamknij powiadomienie"
                            className="wa-popup-close"
                        >
                            ✕
                        </button>

                        <div className="wa-popup-avatar">
                            <Image
                                src="/images/Kacper.webp"
                                alt="Kacper Nowosielski"
                                width={48}
                                height={48}
                                className="wa-popup-avatar-img"
                            />
                            <span className="wa-popup-status" />
                        </div>

                        <div className="wa-popup-content">
                            <div className="wa-popup-title">Kacper Nowosielski</div>
                            <div className="wa-popup-role">Właściciel</div>
                            <div className="wa-popup-msg">Cześć! Zapraszam do kontaktu.</div>
                        </div>
                    </div>

                    <div className="wa-popup-arrow-custom" />
                </div>
            )}

            {/* ── GŁÓWNY GUZIK FLOATING ── */}
            <button
                onClick={handleToggleChat}
                className={`wa-button ${isChatOpen ? "wa-open" : ""} ${!isChatOpen && !showPopup && !dismissed ? "wa-pulse" : ""}`}
                aria-label={isChatOpen ? "Zamknij czat" : "Otwórz czat"}
            >
                {isChatOpen ? <TimesIcon size={28} /> : <WhatsappIcon size={32} />}

                {/* Powiadomienie (czerwona kropka) jeśli odrzucono popup i czat jest zamknięty */}
                {dismissed && !isChatOpen && <span className="wa-notification" />}
            </button>
        </>
    );
}
