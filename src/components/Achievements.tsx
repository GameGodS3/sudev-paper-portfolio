import { Trophy, Star, Zap, Rocket } from "lucide-react";
import { PaperCard, Section, Tag } from "./paper";

interface Achievement {
  title: string;
  description: string;
  year: string;
  type: "award" | "recognition" | "milestone";
}

const achievements: Achievement[] = [
  // {
  //   title: "Speaker at FossMeet'24",
  //   description: "Presented an intro session to FastAPI and building APIs with Python",
  //   year: "2024",
  //   type: "milestone",
  // },
  {
    title: "Runner up at GE Healthcare All-India Hackathon",
    description: "Secured runner-up for developing an ML-assisted system that automates medical equipment servicing.",
    year: "2022",
    type: "award",
  },
  {
    title: "First Microsoft Learn Student Ambassador from College of Engineering Trivandrum",
    description: "Selected as the first Microsoft Learn Student Ambassador at CET, leading tech initiatives and community engagement",
    year: "2021",
    type: "recognition",
  },
  {
    title: "DropPoint Crosses 40,000 Users and 1,000 Github Stars",
    description: "Open-source personal project - DropPoint, achieves 1K+ stars on GitHub and over 40K+ total downloads",
    year: "2020-Present",
    type: "milestone",
  },
];

function AchievementIcon({ type }: { type: Achievement["type"] }) {
  switch (type) {
    case "award":
      return <Trophy aria-hidden="true" className="h-6 w-6 text-pen-blue" strokeWidth={1.75} />;
    case "recognition":
      return <Star aria-hidden="true" className="h-6 w-6 text-pen-red" strokeWidth={1.75} />;
    default:
      return <Rocket aria-hidden="true" className="h-6 w-6 text-ink" strokeWidth={1.75} />;
  }
}

export function Achievements() {
  return (
    <Section
      id="achievements"
      title="Achievements"
      subtitle={
        <>
          <Zap aria-hidden="true" className="h-5 w-5 fill-pen-blue text-pen-blue" />
          Milestones & Recognition
          <Zap aria-hidden="true" className="h-5 w-5 fill-pen-red text-pen-red" />
        </>
      }
    >
      <div className="grid items-stretch gap-x-6 gap-y-10 lg:grid-cols-3">
        {achievements.map((achievement) => (
          <PaperCard key={achievement.title} tape className="flex h-full flex-col">
            <div className="mb-3 flex items-center justify-between gap-3">
              <AchievementIcon type={achievement.type} />
              <Tag variant="plain">{achievement.year}</Tag>
            </div>
            <h3 className="mb-2 font-hand text-heading text-ink">{achievement.title}</h3>
            <p className="text-body text-ink-soft">{achievement.description}</p>
          </PaperCard>
        ))}
      </div>
    </Section>
  );
}
