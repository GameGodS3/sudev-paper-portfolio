import type { CSSProperties, ElementType, ReactNode } from "react";
import type { Tilt } from "./tilt";

interface PaperCardProps {
    as?: ElementType;
    children: ReactNode;
    tilt?: Tilt;
    /** A strip of masking tape across the top edge */
    tape?: boolean;
    className?: string;
    style?: CSSProperties;
}

/** A sheet of paper laid on the notebook: one border, one shadow, used for every boxed item. */
export function PaperCard({ as: Tag = "div", children, tilt = 0, tape = false, className = "", style }: PaperCardProps) {
    return (
        <Tag
            className={`relative rounded-[4px] border-2 border-ink/80 bg-white p-5 shadow-ink-sm md:p-6 ${className}`}
            style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined, ...style }}
        >
            {tape && (
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-3.5 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-2 border border-yellow-300/70 bg-yellow-200/70"
                />
            )}
            {children}
        </Tag>
    );
}
