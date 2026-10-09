import type { ReactNode } from "react";

type TagVariant = "pen" | "level" | "plain";

interface TagProps {
    children: ReactNode;
    variant?: TagVariant;
    className?: string;
}

const VARIANTS: Record<TagVariant, string> = {
    // tech / topic chips: blue pen
    pen: "border-pen-blue text-pen-blue-dark bg-blue-50/70",
    // proficiency / status: red pen
    level: "border-pen-red text-pen-red bg-red-50/70",
    // neutral: graphite
    plain: "border-ink/70 text-ink bg-white",
};

/** The single chip style for tech tags, language levels and achievement labels. */
export function Tag({ children, variant = "pen", className = "" }: TagProps) {
    return (
        <span
            className={`inline-flex min-h-[2rem] items-center rounded-[4px_6px_5px_7px] border-2 px-3 py-0.5 font-body text-small leading-tight ${VARIANTS[variant]} ${className}`}
        >
            {children}
        </span>
    );
}
