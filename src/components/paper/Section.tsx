import type { ReactNode } from "react";

interface SectionProps {
    id?: string;
    title: string;
    subtitle?: string;
    children: ReactNode;
    className?: string;
}

/**
 * A "page" of the notebook: consistent column width, gutters, vertical rhythm and heading style.
 * The notebook ruling shows through (no card, no blur); the divider is drawn by `SectionDivider`.
 */
export function Section({ id, title, subtitle, children, className = "" }: SectionProps) {
    return (
        <section id={id} className={`mx-auto w-full max-w-page px-gutter py-section ${className}`}>
            <header className="mb-10 text-center md:mb-14">
                <h2 className="font-display text-title text-ink">{title}</h2>
                {subtitle && <p className="mt-3 font-hand text-subtitle text-ink-soft">{subtitle}</p>}
            </header>
            {children}
        </section>
    );
}

export function SectionDivider() {
    return <hr className="mx-auto w-full max-w-page border-0 border-t-2 border-dashed border-ink/20" />;
}
