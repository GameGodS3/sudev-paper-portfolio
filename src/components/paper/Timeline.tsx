import type { ReactNode } from "react";

/** A vertical pen-line with a marker per entry. Used by Work Experience and Education. */
export function Timeline({ children }: { children: ReactNode }) {
    return (
        <div className="relative">
            {/* the rail */}
            <div aria-hidden="true" className="absolute bottom-2 left-[11px] top-3 w-0.5 bg-ink/25" />
            <ol className="space-y-12 md:space-y-14">{children}</ol>
        </div>
    );
}

interface TimelineItemProps {
    children: ReactNode;
    /** filled blue dot (e.g. the current role) instead of a ring */
    highlight?: boolean;
    /** replaces the dot with an icon in a circle */
    icon?: ReactNode;
}

export function TimelineItem({ children, highlight = false, icon }: TimelineItemProps) {
    return (
        <li className="relative pl-11 md:pl-14">
            {icon ? (
                <span aria-hidden="true" className="absolute left-[-5px] top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-pen-blue bg-paper text-pen-blue [&_svg]:h-[18px] [&_svg]:w-[18px]">
                    {icon}
                </span>
            ) : (
                <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1.5 h-6 w-6 rounded-full border-4 ${highlight ? "border-pen-blue bg-pen-blue" : "border-ink bg-paper"}`}
                />
            )}
            {children}
        </li>
    );
}
