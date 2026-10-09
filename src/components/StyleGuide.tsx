import { Send } from "lucide-react";
import { InkButton, NotebookBackground, PaperCard, Section, SectionDivider, Tag, tiltFor } from "./paper";
import { StickyNote } from "./StickyNote";

/**
 * Dev-only reference page (route `/styleguide`, only registered when `import.meta.env.DEV`).
 * Used for design-system checkpoints and the body-font comparison. Not part of the production build.
 */

const SWATCHES: [string, string, string][] = [
    ["paper", "var(--paper)", "page"],
    ["ink", "var(--ink)", "headings, text"],
    ["ink-soft", "var(--ink-soft)", "secondary text"],
    ["pen-blue", "var(--pen-blue)", "links, bullets, primary"],
    ["pen-blue-dark", "var(--pen-blue-dark)", "tag text, hover"],
    ["pen-red", "var(--pen-red)", "stars, levels"],
    ["highlight", "var(--highlight)", "sticky notes"],
    ["sticky-ink", "var(--sticky-ink)", "text on sticky"],
];

export function StyleGuide() {
    return (
        <div className="relative min-h-screen bg-paper">
            <NotebookBackground />
            <div className="relative z-10">
                <Section title="Style Guide" subtitle="Design tokens and shared components (dev only)">
                    <h3 className="mb-4 font-hand text-lead">Palette</h3>
                    <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {SWATCHES.map(([name, color, use]) => (
                            <div key={name} className="rounded border-2 border-ink/70 bg-white p-2">
                                <div className="h-12 rounded border border-ink/20" style={{ background: color }} />
                                <div className="mt-2 text-small text-ink">{name}</div>
                                <div className="text-small text-ink-soft">{use}</div>
                            </div>
                        ))}
                    </div>

                    <h3 className="mb-4 font-hand text-lead">Type scale (fluid)</h3>
                    <PaperCard className="mb-12 space-y-3">
                        <p className="font-display text-display">Display: Sudev</p>
                        <p className="font-display text-title">Title: Work Experience</p>
                        <p className="font-hand text-subtitle text-ink-soft">Subtitle: My professional journey so far...</p>
                        <p className="font-hand text-lead">Lead: Product Manager</p>
                        <p className="text-body">Body: Joined Inflection.io, an AI-driven B2B marketing automation startup.</p>
                        <p className="text-small text-ink-soft">Small: Aug 2023 - Sept 2025 · Bengaluru, KA, India</p>
                    </PaperCard>

                    <h3 className="mb-4 font-hand text-lead">Buttons</h3>
                    <div className="mb-12 flex flex-wrap gap-4">
                        <InkButton variant="solid" href="#">My Resume</InkButton>
                        <InkButton variant="outline" href="#">Contact Me</InkButton>
                        <InkButton variant="pen"><Send className="h-5 w-5" />Send Message</InkButton>
                    </div>

                    <h3 className="mb-4 font-hand text-lead">Tags</h3>
                    <div className="mb-12 flex flex-wrap gap-3">
                        <Tag>ChatGPT</Tag><Tag>SingleStore</Tag><Tag variant="level">Native</Tag><Tag variant="level">Conversational</Tag><Tag variant="plain">2022</Tag>
                    </div>

                    <h3 className="mb-4 font-hand text-lead">Cards (tilt cycles −1.5° / 0° / +1.5°)</h3>
                    <div className="mb-12 grid gap-5 sm:grid-cols-3">
                        {[0, 1, 2].map((i) => (
                            <PaperCard key={i} tilt={tiltFor(i)}>
                                <p className="font-hand text-lead">Paper card {i + 1}</p>
                                <p className="text-small text-ink-soft">One border, one shadow, one radius.</p>
                            </PaperCard>
                        ))}
                    </div>

                    <h3 className="mb-4 font-hand text-lead">Sticky notes</h3>
                    <div className="flex flex-wrap gap-4">
                        <StickyNote rotation={tiltFor(0)}>Product Strategy</StickyNote>
                        <StickyNote rotation={tiltFor(1)} color="#CCCCFF">Python</StickyNote>
                        <StickyNote rotation={tiltFor(2)} color="#FFD1DC">React.js</StickyNote>
                    </div>
                </Section>
                <SectionDivider />
                <Section title="Ruling check" subtitle="Lines are 32px apart on every device; the margin hugs the column">
                    <p className="text-body">Body text on the ruled paper. The red margin line should never cross this text on any screen width.</p>
                </Section>
            </div>
        </div>
    );
}
