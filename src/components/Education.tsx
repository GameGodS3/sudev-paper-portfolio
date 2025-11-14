import { GraduationCap, Calendar } from "lucide-react";

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
    <section className="py-16 px-8 max-w-6xl mx-auto drop-shadow-sm bg-white/10 backdrop-blur-[2px]">
      <h2 className="font-['There_Brat',_sans-serif] mb-4 text-center text-black text-[50px]">
        Education
      </h2>
      <div className="text-center mb-12">
        <span className="font-['Caveat',_cursive] text-[24px] text-gray-600">
          Never stop learning!
        </span>
      </div>

      <div className="space-y-8 mb-12">
        {education.map((edu, index) => (
          <div
            key={index}
            className="relative pl-12"
          >
            <div className="absolute left-0 top-2">
              <GraduationCap className="w-8 h-8 text-blue-700" strokeWidth={1.5} />
            </div>

            <h3 className="font-['Caveat',_cursive] text-[30px] text-black mb-1">
              {edu.degree}
            </h3>
            <div className="font-['Patrick_Hand',_cursive] text-[20px] text-gray-800 mb-2">
              {edu.institution}
            </div>
            <div className="flex items-center gap-1 font-['Indie_Flower',_cursive] text-[16px] text-gray-600 mb-3">
              <Calendar className="w-4 h-4" strokeWidth={1.5} />
              {edu.period}
            </div>

            {edu.details && (
              <ul className="space-y-1">
                {edu.details.map((detail, i) => (
                  <li key={i} className="flex gap-2 font-['Patrick_Hand',_cursive] text-[17px] text-gray-700">
                    <span className="text-red-600 mt-1">✦</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* <div className="mt-12">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <Award className="w-7 h-7 text-red-600" strokeWidth={1.5} />
          <h3 className="font-['Caveat',_cursive] text-[32px] text-black">
            Certifications
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="flex gap-2 items-start font-['Patrick_Hand',_cursive] text-[18px] text-gray-700"
            >
              <CheckCircle2 className="w-5 h-5 text-blue-700 mt-1 flex-shrink-0" strokeWidth={2} />
              <span>{cert}</span>
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
}
