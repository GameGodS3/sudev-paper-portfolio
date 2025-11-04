import { Code, ExternalLink, Github, Sparkles } from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce application with payment integration, inventory management, and admin dashboard. Built with modern web technologies for optimal performance.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "https://example.com",
    github: "https://github.com",
    featured: true,
  },
  {
    title: "Task Management App",
    description: "Collaborative task management tool with real-time updates, team collaboration features, and project tracking capabilities.",
    technologies: ["TypeScript", "Firebase", "Tailwind CSS"],
    link: "https://example.com",
    github: "https://github.com",
  },
  {
    title: "Portfolio Template",
    description: "Modern, responsive portfolio template for creative professionals. Features smooth animations and customizable themes.",
    technologies: ["Next.js", "Framer Motion", "CSS"],
    github: "https://github.com",
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather dashboard with forecasts, interactive maps, and location-based alerts. Clean and intuitive interface.",
    technologies: ["React", "API Integration", "Chart.js"],
    link: "https://example.com",
  },
];

export function Projects() {
  return (
    <section className="py-16 px-8 max-w-6xl mx-auto drop-shadow-sm bg-white/10 backdrop-blur-[2px]">
      <h2 className="font-['There_Brat',_sans-serif] mb-4 text-center text-black text-[50px]">
        Projects
      </h2>
      <div className="text-center mb-12">
        <span className="font-['Caveat',_cursive] text-[24px] text-gray-600">
          Things I've built with passion & curiosity
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative p-6"
            style={{
              transform: `rotate(${index % 2 === 0 ? '-0.5deg' : '0.5deg'})`,
            }}
          >
            {/* Underline effect */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

            <div className="flex flex-col gap-4 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-['Caveat',_cursive] text-[28px] text-black">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <Sparkles className="w-5 h-5 text-red-600 fill-red-600" />
                  )}
                </div>

                <p className="font-['Patrick_Hand',_cursive] text-[17px] text-gray-700 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-50 border-2 border-blue-700 font-['Indie_Flower',_cursive] text-[15px] text-blue-900"
                      style={{ transform: `rotate(${Math.random() * 4 - 2}deg)` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 font-['Patrick_Hand',_cursive] text-[16px]">
                  {project.link && (
                    <a
                      href={project.link}
                      className="flex items-center gap-1 text-blue-700 hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" strokeWidth={2} />
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      className="flex items-center gap-1 text-black hover:underline"
                    >
                      <Github className="w-4 h-4" strokeWidth={2} />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
