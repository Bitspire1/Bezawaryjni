"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = Omit<ImageProps, "onClick" | "src"> & {
    enablePreview?: boolean;
    rounded?: boolean;
    src: string;
    fallbackSrc?: string;
};

export default function LightboxImage({
    enablePreview = true,
    rounded = true,
    className = "",
    alt = "",
    fallbackSrc,
    src,
    ...imgProps
}: Props) {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0, posX: 0, posY: 0 });
    const [currentSrc, setCurrentSrc] = useState<string>(src);
    const [imageLoaded, setImageLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Pre-load image when lightbox opens
    useEffect(() => {
        if (open && !imageLoaded) {
            const img = new window.Image();
            img.src = currentSrc;
            img.onload = () => setImageLoaded(true);
        }
    }, [open, currentSrc, imageLoaded]);

    const handleClose = () => {
        setOpen(false);
        setScale(1);
        setPosition({ x: 0, y: 0 });
        setIsDragging(false);
        setImageLoaded(false);
    };

    const handleZoomIn = () => {
        setScale((prev) => Math.min(prev + 0.5, 4));
    };

    const handleZoomOut = () => {
        const newScale = Math.max(scale - 0.5, 1);
        setScale(newScale);
        if (newScale === 1) {
            setPosition({ x: 0, y: 0 });
        }
    };

    const handleReset = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (scale > 1) {
            setIsDragging(true);
            setDragStart({
                x: e.clientX,
                y: e.clientY,
                posX: position.x,
                posY: position.y,
            });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging && scale > 1) {
            const dx = e.clientX - dragStart.x;
            const dy = e.clientY - dragStart.y;
            setPosition({
                x: dragStart.posX + dx,
                y: dragStart.posY + dy,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const delta = -e.deltaY / 1000;
        const newScale = Math.max(1, Math.min(4, scale + delta));
        setScale(newScale);
        if (newScale === 1) {
            setPosition({ x: 0, y: 0 });
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (scale > 1 && e.touches.length === 1) {
            const touch = e.touches[0];
            setIsDragging(true);
            setDragStart({
                x: touch.clientX,
                y: touch.clientY,
                posX: position.x,
                posY: position.y,
            });
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (isDragging && scale > 1 && e.touches.length === 1) {
            const touch = e.touches[0];
            const dx = touch.clientX - dragStart.x;
            const dy = touch.clientY - dragStart.y;
            setPosition({
                x: dragStart.posX + dx,
                y: dragStart.posY + dy,
            });
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    return (
        <>
            <Image
                {...imgProps}
                src={currentSrc}
                alt={alt}
                className={`${className} ${enablePreview ? "cursor-zoom-in transition-opacity hover:opacity-90" : ""}`}
                onClick={() => enablePreview && setOpen(true)}
                onError={() => {
                    if (fallbackSrc && currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
                }}
            />

            {mounted &&
                open &&
                createPortal(
                    <div
                        className="animate-in fade-in fixed inset-0 z-[100] bg-black/95 backdrop-blur-md duration-200"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Podgląd zdjęcia"
                    >
                        {/* Top bar with controls */}
                        <div className="absolute top-0 right-0 left-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent p-4">
                            <div className="flex items-center gap-2">
                                {/* Zoom controls */}
                                <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/70 p-1 backdrop-blur-sm">
                                    <button
                                        onClick={handleZoomOut}
                                        disabled={scale <= 1}
                                        className="flex h-10 w-10 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                                        aria-label="Pomniejsz"
                                    >
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M20 12H4"
                                            />
                                        </svg>
                                    </button>
                                    <div className="min-w-[3rem] px-3 text-center text-sm font-medium text-white/80">
                                        {Math.round(scale * 100)}%
                                    </div>
                                    <button
                                        onClick={handleZoomIn}
                                        disabled={scale >= 4}
                                        className="flex h-10 w-10 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                                        aria-label="Powiększ"
                                    >
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                {/* Reset button */}
                                <button
                                    onClick={handleReset}
                                    disabled={scale === 1}
                                    className="flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-black/70 px-4 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                                    aria-label="Resetuj"
                                >
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                        />
                                    </svg>
                                    Reset
                                </button>
                            </div>

                            {/* Close button */}
                            <button
                                onClick={handleClose}
                                className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-black shadow-lg transition-all hover:scale-105 hover:bg-yellow-300 active:scale-95"
                                aria-label="Zamknij"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Image container */}
                        <div
                            ref={containerRef}
                            className="absolute inset-0 flex items-center justify-center p-4 pt-20 pb-8"
                            onClick={(e) => {
                                if (e.target === e.currentTarget && scale === 1) {
                                    handleClose();
                                }
                            }}
                        >
                            <div
                                className={`relative h-full w-full ${scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseUp}
                                onWheel={handleWheel}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                                onDoubleClick={() => {
                                    if (scale === 1) {
                                        handleZoomIn();
                                    } else {
                                        handleReset();
                                    }
                                }}
                            >
                                <div
                                    className="relative flex h-full w-full items-center justify-center"
                                    style={{
                                        transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
                                        transition: isDragging
                                            ? "none"
                                            : "transform 0.15s cubic-bezier(0.33, 1, 0.68, 1)",
                                        transformOrigin: "center center",
                                        willChange: "transform",
                                        backfaceVisibility: "hidden",
                                        perspective: 1000,
                                    }}
                                >
                                    {imageLoaded ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            ref={imageRef}
                                            src={currentSrc}
                                            alt={alt}
                                            className={`pointer-events-none h-auto max-h-full w-auto max-w-full object-contain select-none ${rounded ? "rounded-lg" : ""}`}
                                            style={{
                                                imageRendering: scale > 1 ? "crisp-edges" : "auto",
                                            }}
                                            draggable={false}
                                            onError={() => {
                                                if (fallbackSrc && currentSrc !== fallbackSrc)
                                                    setCurrentSrc(fallbackSrc);
                                            }}
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent"></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Bottom hint */}
                        <div className="absolute right-0 bottom-0 left-0 p-4 text-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-4 py-2 text-sm text-white/60 backdrop-blur-sm">
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="hidden sm:inline">
                                    Scroll aby powiększyć • Przeciągnij aby przesunąć • Kliknij ESC
                                    aby zamknąć
                                </span>
                                <span className="sm:hidden">Dotknij 2x aby powiększyć</span>
                            </div>
                        </div>
                    </div>,
                    document.body,
                )}
        </>
    );
}
