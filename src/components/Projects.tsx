import { ExternalLink, Github, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  featured?: boolean;
  articleId?: string;
}

const projects: Project[] = [
  {
    title: "Hyperpersonalised email generator",
    description: "LLM-based platform for crafting highly personalized outbound emails, utilizing full recipient business context to optimize performance for massive enterprise B2B SaaS marketing initiatives.",
    technologies: ["ChatGPT", "Spark Java", "MongoDB", "SingleStore"],
    link: "https://example.com",
    // github: "https://github.com",
    featured: true,
    articleId: "ai-email-personalisation",
  },
  {
    title: "Website Tracking System",
    description: "In-house website tracking system for B2B SaaS platforms, enabling real-time event processing, user behavior analytics, and seamless integration with marketing automation tools.",
    technologies: ["Spark Java", "Apache Flink", "Fastly CDN", "SingleStore"],
    link: "https://example.com",
    // github: "https://github.com",
    featured: true,
    articleId: "website-tracking",
  },
  {
    title: "DropPoint",
    description: "An open-source (GPLv3), cross-platform desktop utility application for macOS, Windows, and Linux that simplifies drag-and-drop file transfers by eliminating the need for side-by-side windows, a tool supported by over 40K+ downloads and 1K+ GitHub stars.",
    technologies: ["Electron.JS"],
    link: "https://droppoint.netlify.app/",
    github: "https://github.com/GameGodS3/DropPoint",
  },
  {
    title: "Project Mudrika",
    description: "Blockchain-based infrastructure designed for the National Disaster Management Authority of India to streamline supply chains and improve community incentives during disaster relief operations.",
    technologies: ["Solidity", "Next.js", "Django", "PostgreSQL"],
    link: "https://1drv.ms/b/c/dbf4e6a6d4cc8b1f/EUiAymYqjnRBv746RzRcSxABi7XnIS_0yFp6c1SUbirkBg?e=kBxTMR",
    // github: "https://github.com",
  },
  // {
  //   title: "Dhwani CET Official Website",
  //   description: "Real-time weather dashboard with forecasts, interactive maps, and location-based alerts. Clean and intuitive interface.",
  //   technologies: ["React", "API Integration", "Chart.js"],
  //   link: "https://example.com",
  // },
];

export function Projects() {
  const navigate = useNavigate();

  const handleLearnMore = (articleId?: string) => {
    if (articleId) {
      navigate(`/article/${articleId}`);
    }
  };

  return (
    <section id="projects" className="py-16 px-8 max-w-6xl mx-auto drop-shadow-sm bg-white/10 backdrop-blur-[2px]">
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
                  {project.articleId && (
                    <button
                      onClick={() => handleLearnMore(project.articleId)}
                      className="flex items-center gap-1 text-blue-700 hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" strokeWidth={2} />
                      Learn More
                    </button>
                  )}
                  {project.link && !project.articleId && (
                    <a
                      href={project.link}
                      className="flex items-center gap-1 text-blue-700 hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" strokeWidth={2} />
                      Learn More
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

