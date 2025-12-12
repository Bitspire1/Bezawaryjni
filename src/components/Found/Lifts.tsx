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
            bodyStyle.touchAction = "none"; // prevent iOS bounce
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
                    className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Podgląd zdjęcia"
                    onClick={() => {
                        setOpen(false);
                        setScale(1); setTx(0); setTy(0);
                    }}
                >
                    <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                        {/* Toolbar */}
                        <div className="absolute -top-12 left-0 flex items-center gap-2 text-white/90">
                            <button className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20" onClick={() => setScaleClamped(scale + 0.25)} aria-label="Powiększ">+</button>
                            <button className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20" onClick={() => setScaleClamped(scale - 0.25)} aria-label="Pomniejsz">−</button>
                            <button className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20" onClick={() => { setScale(1); setTx(0); setTy(0); }} aria-label="Reset">Reset</button>
                            <button className="ml-2 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20" onClick={() => { setOpen(false); setScale(1); setTx(0); setTy(0); }} aria-label="Zamknij">Zamknij ✕</button>
                        </div>

                        {/* Viewer */}
                        <div
                            ref={frameRef}
                            className={`${rounded ? "rounded-lg" : ""} overflow-hidden ring-1 ring-white/10 bg-black h-[75vh]`}
                            onWheel={(e) => {
                                e.preventDefault();
                                const delta = -e.deltaY / 500; // smooth
                                setScaleClamped(scale + delta);
                            }}
                            onDoubleClick={() => setScaleClamped(scale === 1 ? 2 : 1)}
                            onMouseDown={(e) => {
                                if (scale <= 1) return;
                                setDrag({ sx: e.clientX, sy: e.clientY, tx0: tx, ty0: ty });
                            }}
                            onMouseMove={(e) => {
                                if (!drag) return;
                                const dx = e.clientX - drag.sx;
                                const dy = e.clientY - drag.sy;
                                const { x, y } = clampOffsets(drag.tx0 + dx, drag.ty0 + dy, scale);
                                setTx(x);
                                setTy(y);
                            }}
                            onMouseUp={() => setDrag(null)}
                            onMouseLeave={() => setDrag(null)}
                            onTouchStart={(e) => {
                                if (scale <= 1) return;
                                const t = e.touches[0];
                                setDrag({ sx: t.clientX, sy: t.clientY, tx0: tx, ty0: ty });
                            }}
                            onTouchMove={(e) => {
                                if (!drag) return;
                                const t = e.touches[0];
                                const dx = t.clientX - drag.sx;
                                const dy = t.clientY - drag.sy;
                                const { x, y } = clampOffsets(drag.tx0 + dx, drag.ty0 + dy, scale);
                                setTx(x);
                                setTy(y);
                            }}
                            onTouchEnd={() => setDrag(null)}
                        >
                            <div
                                className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                                style={{ transform: `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`, transition: drag ? "none" : "transform 120ms ease-out" }}
                            >
                                <Image
                                    src={currentSrc}
                                    alt={alt}
                                    fill
                                    className="object-contain select-none"
                                    sizes="100vw"
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
