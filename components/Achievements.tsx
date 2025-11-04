import { Trophy, Star, Award, Zap, Target, Rocket } from "lucide-react";
import { StickyNote } from "./StickyNote";

interface Achievement {
  title: string;
  description: string;
  year: string;
  type: "award" | "recognition" | "milestone";
}

const achievements: Achievement[] = [
  {
    title: "Best UI/UX Design Award",
    description: "Received top honors at the Annual Design Conference for innovative mobile app interface",
    year: "2023",
    type: "award",
  },
  {
    title: "Employee of the Year",
    description: "Recognized for outstanding contributions and leadership in product development",
    year: "2022",
    type: "recognition",
  },
  {
    title: "50+ Projects Completed",
    description: "Successfully delivered over 50 client projects with 98% satisfaction rate",
    year: "2022",
    type: "milestone",
  },
  {
    title: "Speaker at TechConf 2021",
    description: "Presented on 'The Future of Web Design' to an audience of 500+ professionals",
    year: "2021",
    type: "recognition",
  },
  {
    title: "Open Source Contributor",
    description: "100+ contributions to popular open-source design and development projects",
    year: "2020-Present",
    type: "milestone",
  },
  {
    title: "Hackathon Winner",
    description: "First place in 48-hour design challenge with innovative e-learning platform",
    year: "2020",
    type: "award",
  },
];

const highlights = [
  { text: "Published 15+ articles", icon: "📝" },
  { text: "10k+ Dribbble followers", icon: "🎨" },
  { text: "Mentor to 20+ designers", icon: "👥" },
  { text: "Featured in Design Weekly", icon: "⭐" },
];

export function Achievements() {
  const getIcon = (type: string) => {
    switch (type) {
      case "award":
        return <Trophy className="w-6 h-6 text-blue-700" strokeWidth={1.5} />;
      case "recognition":
        return <Star className="w-6 h-6 text-red-600" strokeWidth={1.5} />;
      default:
        return <Rocket className="w-6 h-6 text-black" strokeWidth={1.5} />;
    }
  };

  return (
    <section className="py-16 px-8 max-w-6xl mx-auto">
      <h2 className="font-['There_Brat',_sans-serif] mb-4 text-center text-black text-[50px]">
        Achievements
      </h2>
      <div className="text-center mb-12 flex items-center justify-center gap-2">
        <Zap className="w-6 h-6 text-blue-700 fill-blue-700" />
        <span className="font-['Caveat',_cursive] text-[24px] text-gray-600">
          Milestones & Recognition
        </span>
        <Zap className="w-6 h-6 text-red-600 fill-red-600" />
      </div>

      {/* Main Achievements */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="relative p-5"
            style={{
              transform: `rotate(${Math.random() * 2 - 1}deg)`,
            }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-3">
                {getIcon(achievement.type)}
                <span className="font-['Indie_Flower',_cursive] text-[14px] text-gray-500">
                  {achievement.year}
                </span>
              </div>

              <h3 className="font-['Caveat',_cursive] text-[24px] text-black mb-2 leading-tight">
                {achievement.title}
              </h3>

              <p className="font-['Patrick_Hand',_cursive] text-[16px] text-gray-700">
                {achievement.description}
              </p>

              {/* Decorative underline */}
              <div className="mt-4 h-1 bg-gradient-to-r from-blue-300 via-red-300 to-transparent" />
            </div>
          </div>
        ))}
      </div>

      {/* Highlights on Sticky Notes */}
      <div className="mt-16">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Target className="w-6 h-6 text-blue-700" strokeWidth={2} />
          <h3 className="font-['Caveat',_cursive] text-[28px] text-black">
            Quick Highlights
          </h3>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {highlights.map((highlight, index) => (
            <div key={index}>
              <StickyNote rotation={Math.random() * 8 - 4} color={index % 2 === 0 ? "#ffff99" : "#ffcce0"}>
                <div className="text-center">
                  <div className="text-[32px] mb-1">{highlight.icon}</div>
                  <p className="text-[18px] whitespace-nowrap">{highlight.text}</p>
                </div>
              </StickyNote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
