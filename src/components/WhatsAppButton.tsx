"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaWhatsapp, FaTimes, FaPaperPlane } from "react-icons/fa";

const POPUP_DELAY_MS = 5000;

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
                            <FaTimes />
                        </button>

                        <div className="wa-avatar-wrapper">
                            <Image
                                src="/images/Kacper.png"
                                alt="Kacper Nowosielski"
                                width={50}
                                height={50}
                                className="wa-avatar"
                            />
                            <span className="wa-status-dot" />
                        </div>

                        <div>
                            <div className="wa-chat-name">Kacper Nowosielski</div>
                            <div className="wa-chat-status">
                                Zwykle odpowiadam w parę minut
                            </div>
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
                            <FaPaperPlane size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* ── POPUP (DYMEK) ── */}
            {showPopup && !dismissed && !isChatOpen && (
                <div
                    onClick={handleToggleChat}
                    className="wa-popup wa-popup-cursor"
                >
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
                                src="/images/Kacper.png"
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
                className={`wa-button ${!isChatOpen && !showPopup && !dismissed ? "wa-pulse" : ""}`}
                style={{
                    transform: isChatOpen ? "scale(0.9)" : "scale(1)",
                }}
                onMouseEnter={(e) => {
                    if (!isChatOpen) e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                    if (!isChatOpen) e.currentTarget.style.transform = "scale(1)";
                }}
                aria-label={isChatOpen ? "Zamknij czat" : "Otwórz czat"}
            >
                {isChatOpen ? <FaTimes size={28} /> : <FaWhatsapp size={32} />}

                {/* Powiadomienie (czerwona kropka) jeśli odrzucono popup i czat jest zamknięty */}
                {dismissed && !isChatOpen && (
                    <span className="wa-notification" />
                )}
            </button>
        </>
    );
}
