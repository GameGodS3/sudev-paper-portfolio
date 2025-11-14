import { Calendar, MapPin, Star } from "lucide-react";

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
      <strong key={`b-${idx}`} className="font-semibold">
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
    <section className="py-16 px-8 max-w-6xl mx-auto drop-shadow-sm bg-white/10 backdrop-blur-[2px]">
      <h2 className="font-['There_Brat',_sans-serif] mb-4 text-center text-black text-[50px]">
        Work Experience
      </h2>
      <div className="text-center mb-12">
        <span className="font-['Caveat',_cursive] text-[24px] text-gray-600">
          My professional journey so far...
        </span>
      </div>

      <div className="relative space-y-12">
        {/* Timeline line */}
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-300 -z-10 md:left-1/2 md:-ml-px" />

        {experiences.map((exp, index) => (
          <div
            key={index}
            className="relative"
          >
            {/* Timeline dot */}
            <div className="absolute left-0 top-0 md:left-1/2 md:-ml-3">
              <div className={`w-6 h-6 rounded-full border-4 ${exp.highlight ? 'border-blue-700 bg-blue-700' : 'border-black bg-white'}`} />
            </div>

            {/* Content card - alternating sides on desktop */}
            <div className={`md:w-[calc(50%-2rem)] ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
              <div className="relative">
                {/* Handwritten title */}
                <h3 className="font-['Caveat',_cursive] text-[32px] text-black mb-2">
                  {exp.title}
                  {exp.highlight && (
                    <Star className="inline-block ml-2 w-5 h-5 fill-red-600 text-red-600" />
                  )}
                </h3>

                <div className="font-['Patrick_Hand',_cursive] text-[20px] text-black mb-1">
                  {exp.company}
                </div>

                <div className="flex flex-wrap gap-3 mb-4 font-['Indie_Flower',_cursive] text-[16px] text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" strokeWidth={1.5} />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" strokeWidth={1.5} />
                    {exp.location}
                  </span>
                </div>

                {/* Description with handwritten font */}
                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex gap-2 font-['Patrick_Hand',_cursive] text-[17px] text-gray-700">
                      <span className="text-blue-700 mt-1">→</span>
                      <span>{renderInlineFormatting(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
