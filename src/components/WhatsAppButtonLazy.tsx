"use client";

import dynamic from "next/dynamic";

const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), {
    ssr: false,
    loading: () => null,
});

export default function WhatsAppButtonLazy() {
    return <WhatsAppButton />;
}
