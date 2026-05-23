"use client";

interface ObfuscatedEmailProps {
    email: string;
    className?: string;
}

export default function ObfuscatedEmail({ email, className = "" }: ObfuscatedEmailProps) {
    // Handle null/undefined email during SSR/build
    if (!email || !email.includes("@")) {
        return <span className={className}>{email || ""}</span>;
    }

    // Obfuscate email by splitting and using HTML entities
    const [user, domain] = email.split("@");
    const [domainName, tld] = domain.split(".");

    return (
        <span className={className}>
            <span>{user}</span>
            <span style={{ display: "none" }}>.spam</span>
            <span>{"\u0040"}</span>
            <span style={{ display: "none" }}>.trap</span>
            <span>{domainName}</span>
            <span>{"\u002e"}</span>
            <span>{tld}</span>
        </span>
    );
}
