/**
 * Content Section Wrappers
 *
 * Best practice from TinaCMS demo:
 * - Separate rendering logic into reusable components
 * - Makes testing and maintenance easier
 * - Enables component composition
 */

import type { ReactNode } from "react";

interface SectionWrapperProps {
    children: ReactNode;
    id?: string;
    className?: string;
    "data-animate"?: boolean;
    "data-animate-delay"?: string;
}

/**
 * Generic section wrapper with animation support
 */
export function SectionWrapper({ children, id, className = "", ...props }: SectionWrapperProps) {
    return (
        <section id={id} className={className} {...props}>
            {children}
        </section>
    );
}

interface ContentSectionProps {
    heading?: string;
    description?: string;
    children: ReactNode;
    className?: string;
}

/**
 * Content section with optional heading and description
 * Reusable pattern for consistent section layouts
 */
export function ContentSection({
    heading,
    description,
    children,
    className = "",
}: ContentSectionProps) {
    return (
        <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
            {heading && (
                <h2 className="mb-4 text-center text-3xl font-bold sm:text-4xl">{heading}</h2>
            )}
            {description && (
                <p className="mx-auto mb-8 max-w-2xl text-center text-white/80">{description}</p>
            )}
            {children}
        </div>
    );
}
