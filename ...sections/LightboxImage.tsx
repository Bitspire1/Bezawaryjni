"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = Omit<ImageProps, "onClick" | "src"> & {
    enablePreview?: boolean;
    rounded?: boolean;
    src: string; // enforce string paths from public/
    fallbackSrc?: string; // optional fallback (e.g., PNG)
};

export default function LightboxImage({ enablePreview = true, rounded = true, className = "", alt = "", fallbackSrc, src, ...imgProps }: Props) {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const frameRef = useRef<HTMLDivElement | null>(null);
    const [scale, setScale] = useState(1);
    const [tx, setTx] = useState(0);
    const [ty, setTy] = useState(0);
    const [drag, setDrag] = useState<{ sx: number; sy: number; tx0: number; ty0: number } | null>(null);
    const [currentSrc, setCurrentSrc] = useState<string>(src);
    const prevBodyOverflow = useRef<string | null>(null);
    const prevBodyTouchAction = useRef<string | null>(null);
    const touchStartPos = useRef<{ x: number; y: number; time: number } | null>(null);
    const [swipeY, setSwipeY] = useState(0);

    useEffect(() => {
        setMounted(true);
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        if (open) {
            // Save current body styles and lock scroll
            const bodyStyle = document.body.style as CSSStyleDeclaration & { touchAction?: string };
            prevBodyOverflow.current = bodyStyle.overflow;
            prevBodyTouchAction.current = bodyStyle.touchAction ?? "";
            document.addEventListener("keydown", onKey);
            bodyStyle.overflow = "hidden";
            // NIE blokuj touch action - pozwól na gesty mobilne
            return () => {
                document.removeEventListener("keydown", onKey);
                const bs = document.body.style as CSSStyleDeclaration & { touchAction?: string };
                bs.overflow = prevBodyOverflow.current ?? "";
                bs.touchAction = prevBodyTouchAction.current ?? "";
                prevBodyOverflow.current = null;
                prevBodyTouchAction.current = null;
            };
        } else {
            // Ensure cleanup if state toggled off without unmount
            const bs = document.body.style as CSSStyleDeclaration & { touchAction?: string };
            if (prevBodyOverflow.current !== null) bs.overflow = prevBodyOverflow.current ?? "";
            if (prevBodyTouchAction.current !== null) bs.touchAction = prevBodyTouchAction.current ?? "";
            prevBodyOverflow.current = null;
            prevBodyTouchAction.current = null;
        }
    }, [open]);

    // Helpers
    const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
    const clampOffsets = (nx: number, ny: number, s: number) => {
        const rect = frameRef.current?.getBoundingClientRect();
        const fw = rect?.width ?? 0;
        const fh = rect?.height ?? 0;
        const maxX = Math.max(0, (s - 1) * fw * 0.5);
        const maxY = Math.max(0, (s - 1) * fh * 0.5);
        return { x: clamp(nx, -maxX, maxX), y: clamp(ny, -maxY, maxY) };
    };

    const setScaleClamped = (ns: number) => {
        const s = clamp(ns, 1, 4);
        const { x, y } = clampOffsets(tx, ty, s);
        setTx(x);
        setTy(y);
        setScale(s);
    };

    const handleClose = () => {
        setOpen(false);
        setScale(1);
        setTx(0);
        setTy(0);
    };

    return (
        <>
            <Image
                {...imgProps}
                src={currentSrc}
                alt={alt}
                className={`${className} ${enablePreview ? "cursor-zoom-in" : ""}`}
                onClick={() => enablePreview && setOpen(true)}
                onError={() => {
                    if (fallbackSrc && currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
                }}
            />

            {mounted && open && (
                <div
                    className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-0"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Podgląd zdjęcia"
                    onClick={handleClose}
                >
                    {/* Close button - zawsze widoczny w prawym górnym rogu */}
                    <button
                        className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-yellow-400/90 hover:bg-yellow-400 text-black font-bold text-xl shadow-lg transition-all active:scale-95"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClose();
                        }}
                        aria-label="Zamknij"
                    >
                        ✕
                    </button>

                    <div
                        className="relative w-full h-full max-w-7xl flex flex-col items-center justify-center px-2 sm:px-4 py-2 sm:py-4 transition-transform"
                        style={{
                            transform: swipeY > 0 ? `translateY(${swipeY}px)` : undefined,
                            opacity: swipeY > 0 ? Math.max(0.3, 1 - swipeY / 300) : 1
                        }}
                    >
                        {/* Toolbar - na dole na mobile, na górze na desktop */}
                        <div
                            className="absolute bottom-2 left-2 right-2 sm:bottom-auto sm:top-2 sm:left-4 sm:right-auto flex items-center justify-center sm:justify-start gap-1 sm:gap-2 text-white/90 bg-black/60 backdrop-blur-sm sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none z-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="px-2 sm:px-3 py-1.5 text-sm sm:text-base rounded bg-white/10 hover:bg-white/20 active:scale-95 transition-transform" onClick={() => setScaleClamped(scale + 0.25)} aria-label="Powiększ">+</button>
                            <button className="px-2 sm:px-3 py-1.5 text-sm sm:text-base rounded bg-white/10 hover:bg-white/20 active:scale-95 transition-transform" onClick={() => setScaleClamped(scale - 0.25)} aria-label="Pomniejsz">−</button>
                            <button className="px-2 sm:px-3 py-1.5 text-sm sm:text-base rounded bg-white/10 hover:bg-white/20 active:scale-95 transition-transform" onClick={() => { setScale(1); setTx(0); setTy(0); }} aria-label="Reset">Reset</button>
                        </div>

                        {/* Viewer */}
                        <div
                            ref={frameRef}
                            className={`${rounded ? "rounded-lg" : ""} overflow-hidden ring-1 ring-white/10 bg-black w-full max-w-6xl mx-auto touch-none`}
                            style={{
                                height: 'calc(100vh - 80px)',
                                maxHeight: 'calc(100vh - 80px)'
                            }}
                            onClick={(e) => {
                                // Na mobile: pozwól zamknąć przez tap gdy scale = 1
                                if (scale === 1 && !drag) {
                                    handleClose();
                                }
                                e.stopPropagation();
                            }}
                            onWheel={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const delta = -e.deltaY / 500;
                                setScaleClamped(scale + delta);
                            }}
                            onDoubleClick={(e) => {
                                e.stopPropagation();
                                setScaleClamped(scale === 1 ? 2 : 1);
                            }}
                            onMouseDown={(e) => {
                                if (scale <= 1) return;
                                e.stopPropagation();
                                setDrag({ sx: e.clientX, sy: e.clientY, tx0: tx, ty0: ty });
                            }}
                            onMouseMove={(e) => {
                                if (!drag) return;
                                e.stopPropagation();
                                const dx = e.clientX - drag.sx;
                                const dy = e.clientY - drag.sy;
                                const { x, y } = clampOffsets(drag.tx0 + dx, drag.ty0 + dy, scale);
                                setTx(x);
                                setTy(y);
                            }}
                            onMouseUp={(e) => {
                                e.stopPropagation();
                                setDrag(null);
                            }}
                            onMouseLeave={() => setDrag(null)}
                            onTouchStart={(e) => {
                                const t = e.touches[0];
                                touchStartPos.current = {
                                    x: t.clientX,
                                    y: t.clientY,
                                    time: Date.now()
                                };
                                if (scale > 1) {
                                    e.stopPropagation();
                                    setDrag({ sx: t.clientX, sy: t.clientY, tx0: tx, ty0: ty });
                                }
                            }}
                            onTouchMove={(e) => {
                                if (scale > 1 && drag) {
                                    e.stopPropagation();
                                    const t = e.touches[0];
                                    const dx = t.clientX - drag.sx;
                                    const dy = t.clientY - drag.sy;
                                    const { x, y } = clampOffsets(drag.tx0 + dx, drag.ty0 + dy, scale);
                                    setTx(x);
                                    setTy(y);
                                } else if (scale === 1 && touchStartPos.current) {
                                    // Swipe down or up to close
                                    const t = e.touches[0];
                                    const dy = t.clientY - touchStartPos.current.y;
                                    setSwipeY(dy);
                                }
                            }}
                            onTouchEnd={() => {
                                // Zamknij jeśli swipe down > 100px LUB swipe up > 100px
                                if (Math.abs(swipeY) > 100) {
                                    handleClose();
                                }
                                setSwipeY(0);
                                setDrag(null);
                                touchStartPos.current = null;
                            }}
                        >
                            <div
                                className="relative w-full h-full flex items-center justify-center"
                                style={{
                                    transform: `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`,
                                    transition: drag ? "none" : "transform 120ms ease-out",
                                    cursor: scale > 1 ? (drag ? 'grabbing' : 'grab') : 'pointer'
                                }}
                            >
                                <Image
                                    src={currentSrc}
                                    alt={alt}
                                    fill
                                    className="object-contain select-none pointer-events-none"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                    priority
                                    draggable={false}
                                    onError={() => {
                                        if (fallbackSrc && currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
