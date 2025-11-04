import { Camera, Music, Book, Palette, Plane, Coffee } from "lucide-react";

interface Hobby {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const hobbies: Hobby[] = [
  {
    name: "Photography",
    description: "Capturing moments through landscape and street photography. Weekend adventures with my camera.",
    icon: <Camera className="w-8 h-8" strokeWidth={1.5} />,
    color: "blue",
  },
  {
    name: "Music",
    description: "Playing guitar and exploring different genres. Occasional jam sessions with friends.",
    icon: <Music className="w-8 h-8" strokeWidth={1.5} />,
    color: "red",
  },
  {
    name: "Reading",
    description: "Avid reader of design books, sci-fi novels, and technology blogs. Currently exploring philosophy.",
    icon: <Book className="w-8 h-8" strokeWidth={1.5} />,
    color: "black",
  },
  {
    name: "Digital Art",
    description: "Creating illustrations and experimenting with different digital art styles during free time.",
    icon: <Palette className="w-8 h-8" strokeWidth={1.5} />,
    color: "blue",
  },
  {
    name: "Travel",
    description: "Exploring new places and cultures. Combining travel with photography for creative inspiration.",
    icon: <Plane className="w-8 h-8" strokeWidth={1.5} />,
    color: "red",
  },
  {
    name: "Coffee Brewing",
    description: "Enthusiast of specialty coffee. Experimenting with different brewing methods and beans.",
    icon: <Coffee className="w-8 h-8" strokeWidth={1.5} />,
    color: "black",
  },
];

export function Hobbies() {
  return (
    <section className="py-16 px-8 max-w-6xl mx-auto drop-shadow-sm bg-white/10 backdrop-blur-[2px]">
      <h2 className="font-['There_Brat',_sans-serif] mb-4 text-center text-black text-[50px]">
        Hobbies & Interests
      </h2>
      <div className="text-center mb-12">
        <span className="font-['Caveat',_cursive] text-[24px] text-gray-600">
          What I do when I'm not coding...
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {hobbies.map((hobby, index) => (
          <div
            key={index}
            className="relative"
            style={{
              transform: `rotate(${index % 2 === 0 ? '1deg' : '-1deg'})`,
            }}
          >
            <div className="text-center">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${hobby.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                    hobby.color === 'red' ? 'bg-red-100 text-red-600' :
                      'bg-gray-100 text-black'
                  }`}
              >
                {hobby.icon}
              </div>

              <h3 className="font-['Caveat',_cursive] text-[28px] text-black mb-2">
                {hobby.name}
              </h3>

              <p className="font-['Patrick_Hand',_cursive] text-[17px] text-gray-700">
                {hobby.description}
              </p>

              {/* Decorative arrow or line */}
              <div className="mt-4 flex justify-center">
                <div className={`w-12 h-0.5 ${hobby.color === 'blue' ? 'bg-blue-700' :
                    hobby.color === 'red' ? 'bg-red-600' :
                      'bg-black'
                  }`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fun quote */}
      <div className="mt-16 text-center max-w-2xl mx-auto">
        <div className="relative inline-block p-6 bg-blue-50 border-l-4 border-blue-700" style={{ transform: 'rotate(-0.5deg)' }}>
          <p className="font-['Caveat',_cursive] text-[26px] text-black mb-2">
            "Design is not just what it looks like and feels like. Design is how it works."
          </p>
          <p className="font-['Indie_Flower',_cursive] text-[16px] text-gray-600">
            - Steve Jobs
          </p>
        </div>
      </div>
    </section>
  );
}
