import { useEffect } from "react";
import { Calendar, MapPin, Send } from "lucide-react";
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

const SAMPLE_BULLETS = [
    "Launched native website tracking to process millions of daily events for enterprise clients.",
    "Established and led the entire QA process and company-wide user testing, cutting production bugs by 50%.",
    "Created a comprehensive Help Center reducing support tickets by 95% and response time to under 12 hours.",
];

const FONT_CANDIDATES = [
    { name: "Patrick Hand (current)", family: "'Patrick Hand'" },
    { name: "Kalam", family: "'Kalam'" },
];

function FontSample({ name, family }: { name: string; family: string }) {
    return (
        <PaperCard className="!p-5">
            <p className="mb-3 font-hand text-subtitle text-pen-blue">{name}</p>
            <div style={{ fontFamily: family }}>
                <div className="mb-1 text-lead text-ink">Inflection.io</div>
                <div className="mb-3 flex flex-wrap gap-x-4 text-small text-ink-soft">
                    <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" />Aug 2023 - Sept 2025</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />Bengaluru, KA, India</span>
                </div>
                <ul className="space-y-2 text-body text-ink-soft">
                    {SAMPLE_BULLETS.map((b) => (
                        <li key={b} className="flex gap-2"><span className="text-pen-blue">→</span><span>{b}</span></li>
                    ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-2 text-small">
                    <Tag>Spark Java</Tag><Tag>Apache Flink</Tag><Tag variant="level">Fluent</Tag>
                </div>
            </div>
        </PaperCard>
    );
}

export function StyleGuide() {
    // Kalam is loaded here only, for the comparison; it is not part of the production font set.
    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap";
        document.head.appendChild(link);
        return () => { link.remove(); };
    }, []);

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

                    <h3 className="mb-4 font-hand text-lead">Body font comparison (real content, same sizes)</h3>
                    <div className="mb-12 grid gap-5 md:grid-cols-2">
                        {FONT_CANDIDATES.map((f) => <FontSample key={f.name} {...f} />)}
                    </div>

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
