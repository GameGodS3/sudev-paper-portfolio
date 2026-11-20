import { GraduationCap, Calendar } from "lucide-react";
import { Section, Timeline, TimelineItem } from "./paper";

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  details?: string[];
}

const education: EducationItem[] = [
  {
    degree: "Bachelor of Technology: Computer Science & Engineering",
    institution: "College of Engineering Trivandrum, Kerala, India",
    period: "2019 - 2023",
    details: [
      "GPA: 8.0/10",
      "Final Year Project: Blockchain-Based Disaster Management System",
    ],
  },
  {
    degree: "Higher Secondary Education: Science Stream",
    institution: "Christ Nagar Higher Secondary School, Kerala, India",
    period: "2017 - 2019",
    details: [
      "12th Grade Percentage: 100%",
      "Founded the School Radio Club",
    ],
  },
  {
    degree: "High School",
    institution: "Our Own English High School, Sharjah, UAE",
    period: "2004 - 2017",
  },
];

// certifications removed (unused)

export function Education() {
  return (
    <Section id="education" title="Education" subtitle="Never stop learning!">
      <Timeline>
        {education.map((edu) => (
          <TimelineItem key={edu.degree} icon={<GraduationCap strokeWidth={1.75} />}>
            <h3 className="font-hand text-heading text-ink">{edu.degree}</h3>
            <p className="mt-1 text-lead leading-snug text-ink">{edu.institution}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-small text-ink-soft">
              <Calendar className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              {edu.period}
            </p>

            {edu.details && (
              <ul className="mt-3 space-y-2 text-body text-ink-soft">
                {edu.details.map((detail) => (
                  <li key={detail} className="flex gap-3">
                    <span aria-hidden="true" className="mt-px text-pen-red">✦</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            )}
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
}
