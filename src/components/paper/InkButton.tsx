import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "solid" | "outline" | "pen";

interface BaseProps {
    variant?: Variant;
    children: ReactNode;
    className?: string;
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const VARIANTS: Record<Variant, string> = {
    solid: "bg-ink text-white border-ink",
    outline: "bg-white text-ink border-ink",
    pen: "bg-pen-blue text-white border-pen-blue-dark",
};

const FACE =
    "relative inline-flex min-h-tap items-center justify-center gap-2 rounded-[6px_4px_7px_4px] border-2 px-5 py-2 " +
    "font-body text-body leading-none no-underline " +
    "transition-transform duration-200 ease-out " +
    "group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 " +
    "group-active:translate-x-[3px] group-active:translate-y-[3px]";

// The hand-drawn offset outline behind the button (a pen-traced "shadow", slightly off-square).
const SCRIBBLE =
    "pointer-events-none absolute inset-0 translate-x-[6px] translate-y-[6px] rotate-[0.6deg] " +
    "rounded-[4px_7px_4px_6px] border-2 border-ink transition-transform duration-200 ease-out " +
    "group-hover:translate-x-[9px] group-hover:translate-y-[9px] " +
    "group-active:translate-x-[3px] group-active:translate-y-[3px]";

/** The single call-to-action style (buttons and button-like links). */
export function InkButton(props: ButtonProps | AnchorProps) {
    const { variant = "solid", className = "", children, ...rest } = props;
    const cls = `${FACE} ${VARIANTS[variant]} ${className}`;
    return (
        <span className="group relative inline-flex">
            <span aria-hidden="true" className={SCRIBBLE} />
            {"href" in rest && rest.href !== undefined ? (
                <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>{children}</a>
            ) : (
                <button type="button" className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
                    {children}
                </button>
            )}
        </span>
    );
}
