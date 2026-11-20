import { ExternalLink, Github, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PaperCard, Section, Tag, TextLink } from "./paper";

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

  return (
    <Section id="projects" title="Projects" subtitle="Things I've built with passion & curiosity">
      <div className="grid items-stretch gap-x-8 gap-y-10 md:grid-cols-2">
        {projects.map((project) => (
          <PaperCard key={project.title} tape className="flex h-full flex-col">
            <h3 className="mb-2 font-hand text-heading text-ink">
              {project.title}
              {project.featured && (
                <Sparkles aria-label="Featured" className="ml-2 inline-block h-5 w-5 -translate-y-0.5 fill-pen-red text-pen-red" />
              )}
            </h3>

            <p className="mb-4 text-body text-ink-soft">{project.description}</p>

            <ul className="mb-4 flex flex-wrap gap-2" aria-label="Technologies">
              {project.technologies.map((tech) => (
                <li key={tech}><Tag>{tech}</Tag></li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap gap-x-5">
              {project.articleId && (
                <TextLink icon={<ExternalLink strokeWidth={2} />} onClick={() => navigate(`/article/${project.articleId}`)}>
                  Learn more
                </TextLink>
              )}
              {project.link && !project.articleId && (
                <TextLink icon={<ExternalLink strokeWidth={2} />} href={project.link}>Learn more</TextLink>
              )}
              {project.github && (
                <TextLink icon={<Github strokeWidth={2} />} href={project.github}>Source code</TextLink>
              )}
            </div>
          </PaperCard>
        ))}
      </div>
    </Section>
  );
}
