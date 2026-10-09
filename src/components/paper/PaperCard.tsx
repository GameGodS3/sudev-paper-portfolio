import type { CSSProperties, ElementType, ReactNode } from "react";
import type { Tilt } from "./tilt";

interface PaperCardProps {
    as?: ElementType;
    children: ReactNode;
    tilt?: Tilt;
    className?: string;
    style?: CSSProperties;
}

/** A sheet of paper laid on the notebook: one border, one shadow, used for every boxed item. */
export function PaperCard({ as: Tag = "div", children, tilt = 0, className = "", style }: PaperCardProps) {
    return (
        <Tag
            className={`rounded-[4px] border-2 border-ink/80 bg-white p-5 shadow-ink-sm md:p-6 ${className}`}
            style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined, ...style }}
        >
            {children}
        </Tag>
    );
}
