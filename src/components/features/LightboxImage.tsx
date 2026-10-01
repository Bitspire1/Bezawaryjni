"use client";

import Image, { ImageProps } from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";

// Overlay (zoom/pan UI) is only fetched when the user opens the lightbox.
const LightboxOverlay = dynamic(() => import("./LightboxOverlay"), { ssr: false });

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
    const [currentSrc, setCurrentSrc] = useState<string>(src);

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

            {open && (
                <LightboxOverlay
                    src={currentSrc}
                    alt={alt}
                    rounded={rounded}
                    fallbackSrc={fallbackSrc}
                    onSrcError={() => {
                        if (fallbackSrc && currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
                    }}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
}
