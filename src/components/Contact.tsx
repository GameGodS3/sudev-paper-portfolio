import React from "react";
import { Send } from "lucide-react";

export const Contact: React.FC = () => {
    return (
        <section id="contact-form" className="py-16 px-8 max-w-6xl mx-auto drop-shadow-sm bg-white/10 backdrop-blur-[2px]">
            <h2 className="font-['There_Brat',_sans-serif] mb-4 text-center text-black text-[50px]">
                Contact Me
            </h2>
            <div className="text-center mb-12">
                <span className="font-['Caveat',_cursive] text-[24px] text-gray-600">
                    Let's get in touch! I'd love to hear from you.
                </span>
            </div>

            <div className="max-w-2xl mx-auto">
                <form method="POST" action="https://docs.google.com/forms/d/e/1FAIpQLSdlJNEQ-Tyi6j9SE3cO8TkBRnTW4E961Ejai65YLljoWwEJnQ/formResponse" target="_self" className="space-y-5">
                    <div>
                        <label className="block font-['Patrick_Hand',_cursive] text-[18px] text-black mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            name="entry.2005620554"
                            required
                            className="w-full border-2 border-gray-300 rounded px-4 py-3 font-['Patrick_Hand',_cursive] text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all"
                            style={{
                                transform: 'rotate(-0.25deg)',
                            }}
                        />
                    </div>

                    <div>
                        <label className="block font-['Patrick_Hand',_cursive] text-[18px] text-black mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="entry.1045781291"
                            required
                            className="w-full border-2 border-gray-300 rounded px-4 py-3 font-['Patrick_Hand',_cursive] text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all"
                            style={{
                                transform: 'rotate(0.25deg)',
                            }}
                        />
                    </div>

                    <div>
                        <label className="block font-['Patrick_Hand',_cursive] text-[18px] text-black mb-2">
                            Phone
                        </label>
                        <input
                            type="tel"
                            name="entry.1166974658"
                            className="w-full border-2 border-gray-300 rounded px-4 py-3 font-['Patrick_Hand',_cursive] text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all"
                            style={{
                                transform: 'rotate(-0.25deg)',
                            }}
                        />
                    </div>

                    <div>
                        <label className="block font-['Patrick_Hand',_cursive] text-[18px] text-black mb-2">
                            Message
                        </label>
                        <textarea
                            name="entry.839337160"
                            required
                            rows={6}
                            className="w-full border-2 border-gray-300 rounded px-4 py-3 font-['Patrick_Hand',_cursive] text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all"
                            style={{
                                transform: 'rotate(0.25deg)',
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-700 text-white font-['Patrick_Hand',_cursive] text-[18px] rounded hover:bg-blue-800 hover:shadow-lg transition-all transform hover:scale-105 duration-200"
                    >
                        <Send className="w-5 h-5" strokeWidth={2} />
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
