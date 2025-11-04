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

export default function App() {
    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
        });
    };

    return (
        <div className="bg-white min-h-screen">

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
                    <div className="h-screen relative overflow-hidden z-0">
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

