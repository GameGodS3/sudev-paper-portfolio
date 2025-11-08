import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(useGSAP, TextPlugin);

export function useDesktopLandingAnimation(
    scopeRef: React.RefObject<HTMLElement | null>,
    enabled: boolean = true
) {
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useGSAP(
        () => {
            // Initial states

            // Sub-intro
            gsap.set(".sub-intro", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                y: "100%",
            });

            // Full Name
            // Capture original name
            const nameEl = document.querySelector(".fullname");
            const originalText = nameEl?.textContent || "";
            // Clear it for typing effect
            if (nameEl) nameEl.textContent = "";

            // DP and Sticky Note
            gsap.set(".profile-pic", {
                opacity: 0,
                rotate: -15,
            })
            gsap.set(".sticky-note-parent", {
                opacity: 0,
                rotate: 15,
            })

            // Social Icons and email
            gsap.set(".social-icon", {
                opacity: 0,
                x: "-100%",
            })
            gsap.set(".email-address", {
                opacity: 0,
                x: "100%",
            })


            // --------------------------------------------------
            if (!timelineRef.current) {
                const tl = gsap.timeline({ paused: true });

                tl.to(".sub-intro", {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    y: "0%",
                    duration: 0.5,
                    ease: "power2.out",
                })

                    // TYPEWRITER EFFECT
                    .to(".fullname", {
                        duration: 1,
                        text: originalText, // types the text in
                        ease: "power2.In"
                    }, "+=0.1")


                    // Rotate sticky note and profile pic in
                    .to(".profile-pic", {
                        opacity: 1,
                        rotate: 0,
                        ease: "power2.In",
                        duration: 0.5
                    })
                    .to(".sticky-note-parent", {
                        opacity: 1,
                        rotate: 0,
                        ease: "power2.In",
                        duration: 0.5
                    }, "<")

                    // Social Icons and email
                    .to(".social-icon", {
                        opacity: 1,
                        x: 0,
                        stagger: 0.1,
                        duration: 0.5
                    }, "<")
                    .to(".email-address", {
                        opacity: 1,
                        x: 0,
                        duration: 0.5
                    }, "<")

                    // CTAs
                    .from(".button", {
                        opacity: 0,
                        y: "50%",
                        duration: 0.5
                    })
                    ;

                timelineRef.current = tl;
            }
            // ----------------------------------------------------

            return () => {
                timelineRef.current?.kill();
                timelineRef.current = null;
                if (nameEl) nameEl.textContent = originalText; // restore clean DOM
            };
        },
        { scope: scopeRef }
    );

    useEffect(() => {
        enabled ? timelineRef.current?.play(0) : timelineRef.current?.pause(0);
    }, [enabled]);
}
