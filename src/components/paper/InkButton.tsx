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

const BASE =
    "inline-flex min-h-tap items-center justify-center gap-2 rounded-[4px] border-2 px-5 py-2 " +
    "font-body text-body leading-none no-underline shadow-ink " +
    "transition-[transform,box-shadow] duration-150 " +
    "hover:-translate-x-px hover:-translate-y-px hover:shadow-[4px_4px_0_0_var(--ink)] " +
    "active:translate-x-[3px] active:translate-y-[3px] active:shadow-none";

/** The single call-to-action style (buttons and button-like links). */
export function InkButton(props: ButtonProps | AnchorProps) {
    const { variant = "solid", className = "", children, ...rest } = props;
    const cls = `${BASE} ${VARIANTS[variant]} ${className}`;
    if ("href" in rest && rest.href !== undefined) {
        return <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>{children}</a>;
    }
    return (
        <button type="button" className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
            {children}
        </button>
    );
}
