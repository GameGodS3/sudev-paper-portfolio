import { Github, Instagram, Linkedin } from "lucide-react";
import type { ReactNode } from "react";
import sudevProfilePic from "../assets/sudev_profile_pic.jpg";
import { InkButton } from "./paper";

const NAME = "Sudev Suresh Sreedevi";
const EMAIL = "sudevssuresh@gmail.com";
const RESUME_URL = "https://drive.google.com/file/d/1dCxQPgzDM4TKncP1FjeuqByIoLHVRMU_/view?usp=sharing";

const SOCIALS: { href: string; label: string; icon: ReactNode }[] = [
    { href: "https://linkedin.com/in/sudevssuresh", label: "LinkedIn", icon: <Linkedin /> },
    { href: "https://instagram.com/they.call.me.sudev", label: "Instagram", icon: <Instagram /> },
    { href: "https://github.com/GameGodS3", label: "GitHub", icon: <Github /> },
];

function scrollToContact() {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
}

/**
 * Landing hero. One responsive layout (stacked and centred on phone and tablet, photo + text side by side from lg up)
 * replaces the old fixed-coordinate design export.
 *
 * Class names `profile-pic`, `sticky-note-parent`, `sub-intro`, `fullname`, `social-icon`,
 * `email-address` and `button` are the GSAP entrance-animation hooks (see animation/DesktopAnimation.tsx).
 * GSAP animates the outer element; the static tilt lives on an inner element so they never fight.
 */
export function Hero() {
    return (
        <div className="mx-auto flex w-full max-w-page flex-col items-center gap-12 px-gutter pb-28 pt-12 md:gap-16 md:pb-24 md:pt-16 lg:flex-row lg:justify-center lg:gap-20 lg:pb-16">
            {/* Photo + role note */}
            <div className="relative shrink-0">
                <div className="profile-pic">
                    <figure className="-rotate-[5deg] border border-ink/15 bg-white p-3 pb-10 shadow-[0_2px_4px_rgb(0_0_0/0.12),0_16px_30px_-12px_rgb(0_0_0/0.4)] md:p-4 md:pb-14">
                        <img
                            src={sudevProfilePic}
                            alt="Portrait of Sudev"
                            className="aspect-[4/5] w-[clamp(11rem,52vw,15rem)] object-cover object-[50%_20%] md:w-[clamp(17rem,38vw,21rem)] lg:w-[clamp(15rem,26vw,19rem)]"
                        />
                    </figure>
                </div>

                {/* Positioning wrapper: `.sticky-note-parent` (GSAP hook) is position:relative in globals.css */}
                <div className="absolute -bottom-8 -right-6 w-[clamp(8.5rem,36vw,12.5rem)] md:-bottom-10 md:-right-10">
                    <div className="sticky-note-parent">
                        <div className="aspect-square rotate-[8deg]">
                            <div className="sticky-note-body relative">
                                <div className="absolute inset-x-[7%] top-[9%] font-hand text-[clamp(1.15rem,1rem+0.8vw,1.55rem)] leading-tight text-sticky-ink">
                                    <p>{"< AI Product Manager"}</p>
                                    <p>{"& Developer />"}</p>
                                </div>
                            </div>
                            <div className="sticky-note-corner" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Text block */}
            <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
                <p className="sub-intro font-hand text-subtitle text-pen-blue">Hello there, I'm</p>

                {/* Ghost text reserves the final size so the typewriter never makes the layout jump */}
                <h1 aria-label={NAME} className="relative mt-1 font-display text-[clamp(2.5rem,1.2rem+5.4vw,4.5rem)] leading-[1.05] text-ink [text-wrap:balance]">
                    <span aria-hidden="true" className="invisible block">{NAME}</span>
                    <span aria-hidden="true" className="fullname absolute inset-0">{NAME}</span>
                </h1>

                <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-5 lg:justify-start">
                    <span className="button"><InkButton variant="solid" href={RESUME_URL} target="_blank" rel="noopener noreferrer">My Resume</InkButton></span>
                    <span className="button"><InkButton variant="outline" onClick={scrollToContact}>Contact Me</InkButton></span>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 lg:justify-start">
                    {SOCIALS.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.label}
                            className="social-icon inline-flex min-h-tap min-w-tap items-center justify-center text-ink transition-colors hover:text-pen-blue [&_svg]:h-6 [&_svg]:w-6 [&_svg]:stroke-[1.75]"
                        >
                            {s.icon}
                        </a>
                    ))}
                    <a href={`mailto:${EMAIL}`} className="email-address inline-flex min-h-tap items-center px-1 text-small text-ink-soft underline decoration-ink/30 underline-offset-4 transition-colors hover:text-pen-blue">
                        {EMAIL}
                    </a>
                </div>
            </div>
        </div>
    );
}
