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
export function SectionWrapper({ 
    children, 
    id, 
    className = "", 
    ...props 
}: SectionWrapperProps) {
    return (
        <section 
            id={id} 
            className={className}
            {...props}
        >
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
    className = "" 
}: ContentSectionProps) {
    return (
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
            {heading && (
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                    {heading}
                </h2>
            )}
            {description && (
                <p className="text-center text-white/80 max-w-2xl mx-auto mb-8">
                    {description}
                </p>
            )}
            {children}
        </div>
    );
}
