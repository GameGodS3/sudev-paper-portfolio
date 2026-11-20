import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

interface BaseProps {
    icon?: ReactNode;
    children: ReactNode;
    className?: string;
}

type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

const CLS =
    "inline-flex min-h-tap items-center gap-1.5 font-body text-body text-pen-blue " +
    "underline-offset-4 transition-colors hover:text-pen-blue-dark hover:underline [&_svg]:h-4 [&_svg]:w-4";

/** Inline text action: one style for every "Learn more" / "Source code" style link. */
export function TextLink(props: AnchorProps | ButtonProps) {
    const { icon, children, className = "", ...rest } = props;
    const inner = (<>{icon}{children}</>);
    if ("href" in rest && rest.href !== undefined) {
        return <a className={`${CLS} ${className}`} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>{inner}</a>;
    }
    return (
        <button type="button" className={`${CLS} ${className}`} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
            {inner}
        </button>
    );
}
