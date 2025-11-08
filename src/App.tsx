import Desktop from "./imports/Desktop1";
import { WorkExperience } from "./components/WorkExperience";
import { Projects } from "./components/Projects";
import { Education } from "./components/Education";
import { LanguagesAndSkills } from "./components/LanguagesAndSkills";
import { Volunteering } from "./components/Volunteering";
import { Achievements } from "./components/Achievements";
import { Hobbies } from "./components/Hobbies";
import { ChevronDown } from "lucide-react";
import notebookBg from "./assets/notebook-bg.jpg";
import { useEffect, useRef, useState } from "react";
import { useDesktopLandingAnimation } from "./animation/DesktopAnimation";

export default function App() {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const [hideOverlay, setHideOverlay] = useState(false);
    const landingScopeRef = useRef<HTMLDivElement>(null);

    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
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

    return (
        <div className="bg-white min-h-screen">
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
                {/* Repeating notebook background */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 opacity-50">
                        <img
                            src={notebookBg}
                            alt=""
                            className="w-screen h-full object-cover object-left-top"
                            style={{
                                objectFit: "cover",
                                objectPosition: "left center",
                            }}
                        />
                    </div>
                </div>

                {/* Actual content */}
                <div className="relative z-10 bg-transparent">
                    {/* Landing Section */}
                    <div className="h-screen relative overflow-hidden z-0" ref={landingScopeRef}>
                        <Desktop />

                        {/* Scroll Indicator */}
                        <div className="absolute bottom-20 md:bottom-8 inset-x-0 flex justify-center z-10">
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

                    <div className="border-t-2 border-dashed border-gray-300 my-4" />

                    <Projects />

                    <div className="border-t-2 border-dashed border-gray-300 my-4" />

                    <Education />

                    <div className="border-t-2 border-dashed border-gray-300 my-4" />

                    <LanguagesAndSkills />

                    <div className="border-t-2 border-dashed border-gray-300 my-4" />

                    <Volunteering />

                    <div className="border-t-2 border-dashed border-gray-300 my-4" />

                    <Achievements />

                    <div className="border-t-2 border-dashed border-gray-300 my-4" />

                    <Hobbies />

                    {/* Footer */}
                    <footer className="py-12 text-center mt-16">
                        <div className="max-w-md mx-auto">
                            <div className="inline-block p-6 bg-gradient-to-br from-blue-50 to-red-50 border-2 border-black" style={{ transform: 'rotate(-1deg)' }}>
                                <p className="font-['Caveat',_cursive] text-[28px] text-black mb-2">
                                    Thanks for visiting my portfolio!
                                </p>
                                <p className="font-['Patrick_Hand',_cursive] text-[16px] text-gray-700 mb-3">
                                    Let's create something amazing together
                                </p>
                                <p className="font-['Indie_Flower',_cursive] text-[14px] text-gray-600">
                                    © 2025 Sudev Suresh Sreedevi
                                </p>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}

