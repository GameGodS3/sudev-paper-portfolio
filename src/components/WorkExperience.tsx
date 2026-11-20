import { Calendar, MapPin, Star } from "lucide-react";
import { Section, Timeline, TimelineItem } from "./paper";

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[]; // description remains an array of strings (can include **bold** markers)
  highlight?: boolean;
}

const experiences: Experience[] = [
  {
    title: "Product Manager",
    company: "Inflection.io",
    location: "Bengaluru, KA, India",
    period: "Aug 2023 - Sept 2025",
    description: [
      "Joined Inflection.io, an **AI-driven** B2B marketing automation startup for product-led SaaS teams.",
      "Launched native website tracking to process **millions of daily events** for enterprise clients.",
      "Piloted an **LLM-based email generator** for personalized outbound content.",
      "Established and led the entire **QA process** and company-wide user testing, cutting production bugs by **50%**.",
      "Created a comprehensive **Help Center** reducing support tickets by **95%** and response time to **under 12 hours**.",
      // "Streamlined PM workflows with **AI-assisted PRDs** and context engine, boosting delivery by 60%.",
      "Developed **MCP-powered analytics bot** for campaign insights and copilot features.",
    ],
    highlight: true,
  },
  {
    title: "UI/UX Design Intern",
    company: "WarpBuild (formerly Argonaut.dev)",
    location: "Remote",
    period: "May 2021 - Jul 2021",
    description: [
      "Joined WarpBuild, a **high-performance CI/CD infrastructure provider** specializing in **fast, secure**, GitHub Actions runners.",
      "Designed marketing and social media assets for different platforms, along with wireframes and interfaces.",
      "Handled interface designs end-to-end, from **scratch to deployment**.",
      "Utilized **Figma**, **Webflow**, and **React** for design and development."
    ],
  },
  // {
  //   title: "Junior Designer",
  //   company: "Creative Studio",
  //   location: "New York, NY",
  //   period: "Aug 2018 - May 2020",
  //   description: [
  //     "Created **wireframes** and prototypes for client projects",
  //     "Designed **marketing materials** and brand identities",
  //     "Conducted **user research** and usability testing",
  //     "Worked closely with clients to understand requirements",
  //   ],
  // },
];

// helper: parse **bold** markers into React nodes
function renderInlineFormatting(text: string) {
  const parts: (string | JSX.Element)[] = [];
  const re = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;
  let idx = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <strong key={`b-${idx}`} className="font-bold text-ink">
        {match[1]}
      </strong>
    );
    lastIndex = match.index + match[0].length;
    idx++;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export function WorkExperience() {
  return (
    <Section id="work" title="Work Experience" subtitle="My professional journey so far...">
      <Timeline>
        {experiences.map((exp) => (
          <TimelineItem key={`${exp.company}-${exp.period}`} highlight={exp.highlight}>
            {/* Roles read as: who/when on the left, what I did on the right (stacked on phone and tablet) */}
            <div className="grid gap-x-12 gap-y-4 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
              <div>
                <h3 className="font-hand text-heading text-ink">
                  {exp.title}
                  {exp.highlight && (
                    <Star aria-label="Current or featured role" className="ml-2 inline-block h-5 w-5 -translate-y-0.5 fill-pen-red text-pen-red" />
                  )}
                </h3>
                <p className="mt-1 text-lead leading-snug text-ink">{exp.company}</p>
                <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-small text-ink-soft">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                    {exp.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                    {exp.location}
                  </span>
                </p>
              </div>

              <ul className="space-y-3 text-body text-ink-soft">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden="true" className="mt-px text-pen-blue">→</span>
                    <span>{renderInlineFormatting(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
}
