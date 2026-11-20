import { StickyNote } from "./StickyNote";
import { Languages } from "lucide-react";
import { Section, Tag, tiltFor } from "./paper";

const spokenLanguages = [
  { name: "English", level: "Fluent" },
  { name: "Hindi", level: "Fluent" },
  { name: "Malayalam", level: "Native" },
  { name: "Arabic", level: "Basic" },
  { name: "Tamil", level: "Conversational" },
];

const coreStrengths = [
  "Product Strategy",
  "Systems Thinking",
  "Rapid Prototyping",
  "Analytical Thinking",
  "User-Centered Design",
  "Effective Communication",
  "Team Leadership",
  "Cross-functional Alignment",
  "Agile Methodology",
  "Problem Solving",
  "Structured Writing",
];

const technicalSkills = [

  "Python",
  "JavaScript",
  "Java",
  "C",
  "C#",
  "Model Context Protocol (MCP)",
  "Agentic AI Design",
  "REST APIs",
  "Snowflake",
  "SQL",
  "MongoDB",
  "Neo4j",

];

const toolsAndFrameworks = [
  "React.js",
  "Node.js",
  "Flask",
  "FastAPI",
  ".NET",
  "Express.js",
  "Segment",
  "Mixpanel",
  "Amplitude",
  "Git",
  "Linux",
  "Figma",
  "Adobe Suite",
  "ChatGPT",
  "Claude",
];



// Colour = group. The swatch beside each heading is the legend for its notes.
const NOTE_COLORS = { strengths: "#FFFF99", technical: "#CCCCFF", tools: "#FFD1DC" } as const;

function NoteGroup({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div>
      <h3 className="mb-6 flex items-center gap-3 font-hand text-heading text-ink">
        <span
          aria-hidden="true"
          className="h-5 w-5 shrink-0 -rotate-6 border border-ink/20 shadow-sm"
          style={{ backgroundColor: color }}
        />
        {title}
      </h3>
      <ul className="flex flex-wrap gap-x-4 gap-y-5">
        {items.map((item, i) => (
          <li key={item} className="max-w-full">
            <StickyNote rotation={tiltFor(i)} color={color}>
              <span className="block text-center leading-snug">{item}</span>
            </StickyNote>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LanguagesAndSkills() {
  return (
    <Section id="skills" title="Languages & Skills" subtitle="Tools of the trade & ways to communicate">
      <div className="grid gap-x-12 gap-y-14 md:grid-cols-2 lg:gap-x-16">
        {/* Spoken Languages */}
        <div>
          <h3 className="mb-6 flex items-center gap-3 font-hand text-heading text-ink">
            <Languages aria-hidden="true" className="h-6 w-6 shrink-0 text-pen-blue" strokeWidth={1.75} />
            Spoken Languages
          </h3>
          <ul>
            {spokenLanguages.map((lang) => (
              <li key={lang.name} className="flex items-center justify-between gap-4 border-b-2 border-dashed border-ink/20 py-3">
                <span className="text-lead text-ink">{lang.name}</span>
                <Tag variant="level">{lang.level}</Tag>
              </li>
            ))}
          </ul>
        </div>

        <NoteGroup title="Core Strengths" items={coreStrengths} color={NOTE_COLORS.strengths} />
        <NoteGroup title="Technical Skills" items={technicalSkills} color={NOTE_COLORS.technical} />
        <NoteGroup title="Tools & Frameworks" items={toolsAndFrameworks} color={NOTE_COLORS.tools} />
      </div>
    </Section>
  );
}
