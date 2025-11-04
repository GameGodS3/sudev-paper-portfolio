import { StickyNote } from "./StickyNote";
import { Languages, Code2 } from "lucide-react";

const spokenLanguages = [
  { name: "English", level: "Native" },
  { name: "Spanish", level: "Fluent" },
  { name: "French", level: "Intermediate" },
  { name: "German", level: "Basic" },
];

const technicalSkills = [
  "React & Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Figma",
  "Adobe XD",
  "Tailwind CSS",
  "MongoDB",
  "Git & GitHub",
  "REST APIs",
  "UI/UX Design",
  "Responsive Web",
];

export function LanguagesAndSkills() {
  return (
    <section className="py-16 px-8 max-w-6xl mx-auto">
      <h2 className="font-['There_Brat',_sans-serif] mb-4 text-center text-black text-[50px]">
        Languages & Skills
      </h2>
      <div className="text-center mb-12">
        <span className="font-['Caveat',_cursive] text-[24px] text-gray-600">
          Tools of the trade & ways to communicate
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Spoken Languages */}
        <div>
          <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
            <Languages className="w-7 h-7 text-blue-700" strokeWidth={1.5} />
            <h3 className="font-['Caveat',_cursive] text-[32px] text-black">
              Spoken Languages
            </h3>
          </div>

          <div className="space-y-4">
            {spokenLanguages.map((lang, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-2"
              >
                <span className="font-['Patrick_Hand',_cursive] text-[22px] text-black">
                  {lang.name}
                </span>
                <span className="font-['Indie_Flower',_cursive] text-[18px] px-3 py-1 bg-red-50 text-red-700 border-2 border-red-300">
                  {lang.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills - Sticky Notes */}
        <div>
          <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
            <Code2 className="w-7 h-7 text-red-600" strokeWidth={1.5} />
            <h3 className="font-['Caveat',_cursive] text-[32px] text-black">
              Technical Skills
            </h3>
          </div>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {technicalSkills.map((skill, index) => (
              <div key={index} className="inline-block">
                <StickyNote rotation={Math.random() * 6 - 3}>
                  <p className="text-[17px] text-center whitespace-nowrap">{skill}</p>
                </StickyNote>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
