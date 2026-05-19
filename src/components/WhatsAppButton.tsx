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
            <style>{`
        @keyframes waSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes waPulse {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
          70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        .wa-chat-bg {
          background-color: #e5ddd5;
          background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
          background-size: cover;
        }
      `}</style>

            {/* ── CHAT WINDOW ── */}
            {isChatOpen && (
                <div
                    style={{
                        position: "fixed",
                        bottom: 90,
                        right: 20,
                        zIndex: 10001,
                        width: 360,
                        maxWidth: "calc(100vw - 40px)",
                        backgroundColor: "#fff",
                        borderRadius: 16,
                        boxShadow: "0 12px 28px rgba(0,0,0,0.22)",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        animation: "waSlideUp 250ms cubic-bezier(0.16, 1, 0.3, 1) both",
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            backgroundColor: "#128C7E",
                            color: "#fff",
                            padding: "16px",
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            position: "relative",
                        }}
                    >
                        <button
                            onClick={() => setIsChatOpen(false)}
                            aria-label="Zamknij czat"
                            style={{
                                position: "absolute",
                                top: 12,
                                right: 12,
                                background: "none",
                                border: "none",
                                color: "rgba(255,255,255,0.8)",
                                fontSize: 20,
                                cursor: "pointer",
                            }}
                        >
                            <FaTimes />
                        </button>

                        <div style={{ position: "relative" }}>
                            <Image
                                src="/images/Kacper.avif"
                                alt="Kacper Nowosielski"
                                width={50}
                                height={50}
                                style={{
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    display: "block",
                                    border: "2px solid rgba(255,255,255,0.2)",
                                }}
                            />
                            <span
                                style={{
                                    position: "absolute",
                                    bottom: 2,
                                    right: 2,
                                    width: 12,
                                    height: 12,
                                    backgroundColor: "#25D366",
                                    borderRadius: "50%",
                                    border: "2px solid #128C7E",
                                }}
                            />
                        </div>

                        <div>
                            <div style={{ fontWeight: 600, fontSize: 16 }}>Kacper Nowosielski</div>
                            <div
                                style={{
                                    fontSize: 13,
                                    color: "rgba(255,255,255,0.8)",
                                    marginTop: 2,
                                }}
                            >
                                Zwykle odpowiadam w parę minut
                            </div>
                        </div>
                    </div>

                    {/* Chat Body */}
                    <div
                        className="wa-chat-bg"
                        style={{
                            padding: "20px",
                            minHeight: 220,
                            maxHeight: "50vh",
                            overflowY: "auto",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {/* Message Bubble */}
                        <div
                            style={{
                                backgroundColor: "#fff",
                                color: "#111",
                                padding: "8px 12px",
                                borderRadius: "0 8px 8px 8px",
                                maxWidth: "85%",
                                boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
                                position: "relative",
                                alignSelf: "flex-start",
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: -8,
                                    width: 0,
                                    height: 0,
                                    borderLeft: "8px solid transparent",
                                    borderTop: "8px solid #fff",
                                    borderBottom: "8px solid transparent",
                                }}
                            />
                            <div
                                style={{
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: "rgba(0,0,0,0.4)",
                                    marginBottom: 4,
                                }}
                            >
                                Kacper Nowosielski
                            </div>
                            <div style={{ fontSize: 14, lineHeight: 1.4, wordBreak: "break-word" }}>
                                Cześć! 👋 W czym mogę Ci pomóc?
                            </div>
                            <div
                                style={{
                                    fontSize: 11,
                                    color: "rgba(0,0,0,0.45)",
                                    textAlign: "right",
                                    marginTop: 4,
                                }}
                            >
                                {currentTime}
                            </div>
                        </div>
                    </div>

                    {/* Footer Input */}
                    <div
                        style={{
                            padding: "12px",
                            backgroundColor: "#f0f0f0",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Napisz wiadomość..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            style={{
                                flex: 1,
                                padding: "12px 16px",
                                borderRadius: 24,
                                border: "none",
                                outline: "none",
                                fontSize: 15,
                                color: "#111", // fixed contrast
                                backgroundColor: "#fff",
                                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
                            }}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!message.trim()}
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: "50%",
                                backgroundColor: message.trim() ? "#128C7E" : "#999",
                                color: "#fff",
                                border: "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: message.trim() ? "pointer" : "default",
                                transition: "background-color 0.2s",
                                paddingLeft: 4, // optical centering for send icon
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
                    style={{
                        position: "fixed",
                        bottom: 90,
                        right: 20,
                        zIndex: 10000,
                        animation: "waSlideUp 400ms ease-out both",
                        maxWidth: 320,
                        width: "calc(100vw - 40px)",
                        cursor: "pointer",
                    }}
                >
                    <div
                        style={{
                            background: "#fff",
                            borderRadius: 12,
                            boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
                            padding: "14px 16px",
                            position: "relative",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 12,
                            transition: "transform 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                    >
                        <button
                            onClick={handleDismissPopup}
                            aria-label="Zamknij powiadomienie"
                            style={{
                                position: "absolute",
                                top: 6,
                                right: 8,
                                background: "none",
                                border: "none",
                                color: "#999",
                                fontSize: 18,
                                cursor: "pointer",
                                lineHeight: 1,
                                padding: 4,
                            }}
                        >
                            ✕
                        </button>

                        <div style={{ position: "relative", flexShrink: 0 }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/Kacper.avif"
                                alt="Kacper Nowosielski"
                                width={48}
                                height={48}
                                style={{
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                            <span
                                style={{
                                    position: "absolute",
                                    bottom: 1,
                                    right: 1,
                                    width: 12,
                                    height: 12,
                                    backgroundColor: "#25D366",
                                    borderRadius: "50%",
                                    border: "2px solid #fff",
                                }}
                            />
                        </div>

                        <div style={{ paddingRight: 16 }}>
                            <div
                                style={{
                                    fontWeight: 700,
                                    fontSize: 15,
                                    color: "#1a1a1a",
                                    lineHeight: 1.3,
                                }}
                            >
                                Kacper Nowosielski
                            </div>
                            <div style={{ fontSize: 12, color: "#888", marginTop: 1 }}>
                                Właściciel
                            </div>
                            <div
                                style={{
                                    fontSize: 14,
                                    color: "#444",
                                    marginTop: 6,
                                    lineHeight: 1.4,
                                }}
                            >
                                Cześć! Zapraszam do kontaktu.
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            position: "absolute",
                            bottom: -8,
                            right: 28,
                            width: 0,
                            height: 0,
                            borderLeft: "8px solid transparent",
                            borderRight: "8px solid transparent",
                            borderTop: "8px solid #fff",
                            filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.08))",
                        }}
                    />
                </div>
            )}

            {/* ── GŁÓWNY GUZIK FLOATING ── */}
            <button
                onClick={handleToggleChat}
                style={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                    zIndex: 10000,
                    width: 60,
                    height: 60,
                    backgroundColor: "#25D366",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(37,211,102,0.4)",
                    transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    animation:
                        !isChatOpen && !showPopup && !dismissed ? "waPulse 2s infinite" : "none",
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
                    <span
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: 14,
                            height: 14,
                            backgroundColor: "#e53e3e",
                            borderRadius: "50%",
                            border: "2px solid #fff",
                        }}
                    />
                )}
            </button>
        </>
    );
}
