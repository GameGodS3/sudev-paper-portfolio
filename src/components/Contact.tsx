import React from "react";
import { Send } from "lucide-react";
import { InkButton, Section } from "./paper";

const FIELD =
    "w-full min-h-tap rounded-[4px_6px_5px_7px] border-2 border-ink/70 bg-white px-4 py-2.5 font-body text-body text-ink " +
    "placeholder:text-ink-soft/60 transition-shadow focus:border-pen-blue focus:outline-none focus:ring-2 focus:ring-pen-blue/40";
const LABEL = "mb-1.5 block font-body text-lead text-ink";

export const Contact: React.FC = () => {
    return (
        <Section id="contact-form" title="Contact Me" subtitle="Let's get in touch! I'd love to hear from you.">
            <div className="mx-auto max-w-2xl">
                <form method="POST" action="https://docs.google.com/forms/d/e/1FAIpQLSdlJNEQ-Tyi6j9SE3cO8TkBRnTW4E961Ejai65YLljoWwEJnQ/formResponse" target="_self" className="space-y-6">
                    <div>
                        <label htmlFor="contact-name" className={LABEL}>Name</label>
                        <input id="contact-name" type="text" name="entry.2005620554" required autoComplete="name" className={FIELD} />
                    </div>

                    <div>
                        <label htmlFor="contact-email" className={LABEL}>Email</label>
                        <input id="contact-email" type="email" name="entry.1045781291" required autoComplete="email" className={FIELD} />
                    </div>

                    <div>
                        <label htmlFor="contact-phone" className={LABEL}>
                            Phone <span className="text-small text-ink-soft">(optional)</span>
                        </label>
                        <input id="contact-phone" type="tel" name="entry.1166974658" autoComplete="tel" className={FIELD} />
                    </div>

                    <div>
                        <label htmlFor="contact-message" className={LABEL}>Message</label>
                        <textarea id="contact-message" name="entry.839337160" required rows={6} className={FIELD} />
                    </div>

                    <InkButton type="submit" variant="pen" fullWidth>
                        <Send className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                        Send Message
                    </InkButton>
                </form>
            </div>
        </Section>
    );
};

export default Contact;
