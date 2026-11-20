import { Music, Book, Palette } from "lucide-react";
import { PaperCard, Section } from "./paper";

interface Hobby {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const hobbies: Hobby[] = [
  {
    name: "Reading",
    description: "Avid reader of fiction, historical memoirs, and technology blogs. Currently exploring personal development.",
    icon: <Book className="w-8 h-8" strokeWidth={1.5} />,
    color: "black",
  },
  {
    name: "Music",
    description: "Playing guitar and exploring different genres. Occasional jam sessions with friends.",
    icon: <Music className="w-8 h-8" strokeWidth={1.5} />,
    color: "red",
  },
  {
    name: "Drawing & Painting",
    description: "Experimenting with pencils & watercolors to create still life and landscapes. Currently exploring human character sketches.",
    icon: <Palette className="w-8 h-8" strokeWidth={1.5} />,
    color: "blue",
  },
  
];

const HOBBY_TONES: Record<string, string> = {
  blue: "bg-blue-100 text-pen-blue",
  red: "bg-red-100 text-pen-red",
  black: "bg-gray-100 text-ink",
};

export function Hobbies() {
  return (
    <Section id="hobbies" title="Hobbies & Interests" subtitle="What I do when I'm not coding...">
      <div className="grid items-stretch gap-x-6 gap-y-10 lg:grid-cols-3">
        {hobbies.map((hobby) => (
          <PaperCard key={hobby.name} tape className="flex h-full flex-col items-center text-center">
            <div className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full ${HOBBY_TONES[hobby.color] ?? HOBBY_TONES.black}`}>
              {hobby.icon}
            </div>
            <h3 className="mb-2 font-hand text-heading text-ink">{hobby.name}</h3>
            <p className="text-body text-ink-soft">{hobby.description}</p>
          </PaperCard>
        ))}
      </div>

      {/* Fun quote */}
      <figure className="mx-auto mt-14 max-w-2xl border-l-4 border-pen-blue bg-blue-50/70 px-6 py-5">
        <blockquote className="font-hand text-subtitle text-ink">
          "Design is not just what it looks like and feels like. Design is how it works."
        </blockquote>
        <figcaption className="mt-2 text-small text-ink-soft">- Steve Jobs</figcaption>
      </figure>
    </Section>
  );
}
