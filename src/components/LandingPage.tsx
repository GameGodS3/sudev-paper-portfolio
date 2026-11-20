import { Hero } from "./Hero";
import { WorkExperience } from "./WorkExperience";
import { Projects } from "./Projects";
import { Education } from "./Education";
import { LanguagesAndSkills } from "./LanguagesAndSkills";
import { Achievements } from "./Achievements";
import { Hobbies } from "./Hobbies";
import { Contact } from "./Contact";
import { ChevronDown } from "lucide-react";
import { NotebookBackground, PaperCard, SectionDivider } from "./paper";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDesktopLandingAnimation } from "../animation/DesktopAnimation";

export function LandingPage() {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const [hideOverlay, setHideOverlay] = useState(false);
    const landingScopeRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    const scrollToContent = () => {
        window.scrollTo({
            top: landingScopeRef.current?.offsetHeight ?? window.innerHeight,
            behavior: "smooth",
        });
    };

    // Loading screen
    useEffect(() => {
        let isWindowLoaded = document.readyState === "complete";
        let intervalId: number | undefined;

        // Fake incremental progress until the window load event.
        intervalId = window.setInterval(() => {
            setProgress((prev) => {
                if (isWindowLoaded) return prev; // will be set to 100 below
                const next = prev + Math.max(1, Math.floor((100 - prev) * 0.03));
                return Math.min(next, 90);
            });
        }, 60);

        const finishLoading = () => {
            isWindowLoaded = true;
            setProgress(100);
            // Allow the 100% text to render, then start exit animation
            requestAnimationFrame(() => setIsExiting(true));
        };

        if (isWindowLoaded) {
            finishLoading();
        } else {
            const onLoad = () => finishLoading();
            window.addEventListener("load", onLoad, { once: true });
            // Safety timeout in case load never fires due to caching quirks
            const safety = window.setTimeout(finishLoading, 4000);
            return () => {
                window.removeEventListener("load", onLoad);
                clearTimeout(safety);
                if (intervalId) clearInterval(intervalId);
            };
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, []);

    // Lock scroll while the loading overlay is visible
    useEffect(() => {
        const preventDefault = (e: Event) => {
            if (!hideOverlay) {
                e.preventDefault();
            }
        };

        if (!hideOverlay) {
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
            window.addEventListener("touchmove", preventDefault, { passive: false });
            window.addEventListener("wheel", preventDefault, { passive: false });
        } else {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
            window.removeEventListener("touchmove", preventDefault as EventListener);
            window.removeEventListener("wheel", preventDefault as EventListener);
        }

        return () => {
            window.removeEventListener("touchmove", preventDefault as EventListener);
            window.removeEventListener("wheel", preventDefault as EventListener);
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        };
    }, [hideOverlay]);

    // Landing entrance animation (start only after loading overlay fully hides)
    useDesktopLandingAnimation(landingScopeRef, hideOverlay);

    // If we navigated here with a scroll target (e.g. from an article), scroll to it
    useEffect(() => {
        const state: any = (location as any).state;
        const target = state?.scrollTo as string | undefined;
        if (!target) return;
        // wait until overlay has hidden to allow scrolling
        if (!hideOverlay) return;

        const el = document.getElementById(target);
        if (el) {
            // small delay to ensure layout is settled
            setTimeout(() => {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 80);

            // Clear the history state so we don't scroll again on refresh/back
            try {
                window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
            } catch (e) {
                // ignore
            }
        }
    }, [location, hideOverlay]);

    return (
        <div className="bg-paper min-h-screen">
            {!hideOverlay && (
                <div
                    className={
                        "fixed inset-0 z-[10000] bg-white flex items-center justify-center " +
                        "transition-all duration-500 ease-out " +
                        (isExiting ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100")
                    }
                    onTransitionEnd={() => {
                        if (isExiting) setHideOverlay(true);
                    }}
                    style={{
                        fontFamily: 'Ink Free, "InkFree", "Ink Free Regular", system-ui, -apple-system, "Segoe UI", Arial, sans-serif',
                    }}
                >
                    <span className="select-none" style={{ fontSize: "64px", lineHeight: 1 }}>
                        {progress}%
                    </span>
                </div>
            )}

            {/* Content Sections with Notebook Background */}
            <div className="relative">
                {/* Notebook paper (CSS-drawn, spans the whole page and scrolls with it) */}
                <NotebookBackground />

                {/* Actual content */}
                <div className="relative z-10 bg-transparent">
                    {/* Landing Section */}
                    <div className="relative z-0 flex min-h-[min(100svh,54rem)] flex-col justify-center overflow-x-clip" ref={landingScopeRef}>
                        <Hero />

                        {/* Scroll Indicator */}
                        <div className="absolute bottom-5 inset-x-0 flex justify-center z-10">
                            <button
                                onClick={scrollToContent}
                                className="animate-bounce cursor-pointer bg-white border-2 border-black p-2 rounded-full hover:bg-gray-100 transition-colors"
                                aria-label="Scroll to content"
                            >
                                <ChevronDown className="w-6 h-6" strokeWidth={2} />
                            </button>
                        </div>
                    </div>


                    <WorkExperience />

                    <SectionDivider />

                    <Projects />

                    <SectionDivider />

                    <LanguagesAndSkills />

                    <SectionDivider />

                    <Education />

                    <SectionDivider />

                    {/* <Volunteering />

                    <SectionDivider /> */}

                    <Achievements />

                    <SectionDivider />

                    <Hobbies />

                    <SectionDivider />

                    <Contact />

                    <SectionDivider />



                    {/* Footer */}
                    <footer className="px-gutter pb-16 pt-14 text-center">
                        <PaperCard tape tilt={-1.5} className="mx-auto max-w-md">
                            <p className="mb-2 font-hand text-subtitle text-ink">Thanks for visiting my portfolio!</p>
                            <p className="mb-3 text-body text-ink-soft">Let's create something amazing together</p>
                            <p className="text-small text-ink-soft">© 2025 Sudev Suresh Sreedevi</p>
                        </PaperCard>
                    </footer>
                </div>
            </div>
        </div>
    );
}
