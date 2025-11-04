import { Heart, Calendar, Users, Smile } from "lucide-react";

interface VolunteerRole {
  role: string;
  organization: string;
  period: string;
  description: string;
}

const volunteerWork: VolunteerRole[] = [
  {
    role: "Web Design Mentor",
    organization: "Code for Good",
    period: "2021 - Present",
    description: "Mentor aspiring designers and developers, teaching fundamental design principles and web development best practices to underserved communities.",
  },
  {
    role: "UI/UX Workshop Facilitator",
    organization: "TechBridge Academy",
    period: "2020 - 2021",
    description: "Conducted monthly workshops on UI/UX design for students, covering topics from wireframing to prototyping and user testing.",
  },
  {
    role: "Website Developer",
    organization: "Local Animal Shelter",
    period: "2019",
    description: "Designed and developed a responsive website to help increase pet adoptions and streamline the donation process.",
  },
];

export function Volunteering() {
  return (
    <section className="py-16 px-8 max-w-6xl mx-auto drop-shadow-sm bg-white/10 backdrop-blur-[2px]">
      <h2 className="font-['There_Brat',_sans-serif] mb-4 text-center text-black text-[50px]">
        Volunteering
      </h2>
      <div className="text-center mb-12 flex items-center justify-center gap-2">
        <span className="font-['Caveat',_cursive] text-[24px] text-gray-600">
          Giving back to the community
        </span>
        <Heart className="w-6 h-6 text-red-600 fill-red-600" />
      </div>

      <div className="space-y-10">
        {volunteerWork.map((work, index) => (
          <div
            key={index}
            className="relative"
            style={{
              transform: `rotate(${index % 2 === 0 ? '0.5deg' : '-0.5deg'})`,
            }}
          >
            <div className="border-l-4 border-red-600 pl-6">
              <h3 className="font-['Caveat',_cursive] text-[30px] text-black mb-2">
                {work.role}
              </h3>

              <div className="flex items-center gap-4 mb-3 flex-wrap font-['Indie_Flower',_cursive] text-[16px]">
                <span className="flex items-center gap-1 text-gray-700">
                  <Users className="w-4 h-4" strokeWidth={1.5} />
                  {work.organization}
                </span>
                <span className="flex items-center gap-1 text-gray-600">
                  <Calendar className="w-4 h-4" strokeWidth={1.5} />
                  {work.period}
                </span>
              </div>

              <p className="font-['Patrick_Hand',_cursive] text-[18px] text-gray-700">
                {work.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="inline-block p-4 bg-red-50 border-2 border-red-200" style={{ transform: 'rotate(-1deg)' }}>
          <Smile className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <p className="font-['Caveat',_cursive] text-[20px] text-red-700">
            Making a difference, one project at a time!
          </p>
        </div>
      </div>
    </section>
  );
}
