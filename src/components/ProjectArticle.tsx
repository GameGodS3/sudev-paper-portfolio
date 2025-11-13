import { X, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ImageModal } from "./ImageModal";

type BulletPointData = {
  type: "bullet" | "numbered";
  items: string[];
};

type TableData = {
  type: "table";
  headers: string[];
  rows: string[][];
};

type BlockquoteData = {
  type: "blockquote";
  text: string;
  author?: string;
};

type ContentBlock = string | BulletPointData | TableData | BlockquoteData;

export interface ArticleSection {
  id: string;
  title: string;
  level: 1 | 2 | 3; // h1, h2, h3
  content: ContentBlock[];
  images?: {
    url: string;
    alt: string;
    caption?: string;
  }[];
}

export interface ProjectArticleData {
  title: string;
  subtitle?: string;
  sections: ArticleSection[];
}

interface ProjectArticleProps {
  article: ProjectArticleData;
  onClose: () => void;
}

export function ProjectArticle({ article, onClose }: ProjectArticleProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string; caption?: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = article.sections.map(s => s.id);

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    const articleContent = document.getElementById('article-content');
    articleContent?.addEventListener('scroll', handleScroll);

    return () => {
      articleContent?.removeEventListener('scroll', handleScroll);
    };
  }, [article.sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    const articleContent = document.getElementById('article-content');
    if (element && articleContent) {
      const elementTop = element.offsetTop;
      articleContent.scrollTo({
        top: elementTop - 100,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Prevent body scroll when article is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-hidden">
      {/* Header */}
      <div className="border-b-2 border-black bg-gradient-to-r from-blue-50 to-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={onClose}
          className="flex items-center gap-2 font-['Patrick_Hand',_cursive] text-[18px] text-black hover:text-blue-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2} />
          Back to Portfolio
        </button>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close article"
        >
          <X className="w-6 h-6" strokeWidth={2} />
        </button>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar Navigation */}
        <div className="hidden lg:block w-64 border-r-2 border-gray-200 bg-gradient-to-b from-red-50/30 to-white p-6 overflow-y-auto">
          <div className="sticky top-0">
            <h3 className="font-['Caveat',_cursive] text-[24px] text-black mb-4 pb-2 border-b-2 border-dashed border-gray-300">
              Contents
            </h3>
            <nav>
              <ul className="space-y-1">
                {article.sections.map((section) => (
                  <li
                    key={section.id}
                    style={{
                      marginLeft: section.level === 2 ? '16px' : section.level === 3 ? '32px' : '0'
                    }}
                  >
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`text-left w-full py-1.5 px-2 rounded font-['Patrick_Hand',_cursive] transition-colors ${activeSection === section.id
                        ? 'bg-blue-100 text-blue-900 text-[16px]'
                        : 'text-gray-700 hover:bg-gray-100 text-[15px]'
                        }`}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Article Content */}
        <div id="article-content" className="flex-1 overflow-y-auto ">
          <div className="max-w-3xl mx-auto px-6 py-12 bg-white/10 backdrop-blur-[2px] z-10">
            {/* Article Title */}
            <div className="mb-12 text-center">
              <h1 className="font-['There_Brat:Regular',_sans-serif] text-[56px] text-black mb-4">
                {article.title}
              </h1>
              {article.subtitle && (
                <p className="font-['Caveat',_cursive] text-[28px] text-gray-600">
                  {article.subtitle}
                </p>
              )}
              <div className="mt-6 h-1 bg-gradient-to-r from-transparent via-blue-700 to-transparent" />
            </div>

            {/* Article Sections */}
            {article.sections.map((section, sectionIndex) => (
              <div key={section.id} id={section.id} className="mb-12 scroll-mt-24">
                {/* Section Heading */}
                {section.level === 1 && (
                  <h2 className="font-['There_Brat:Regular',_sans-serif] text-[42px] text-black mb-6 mt-16">
                    {section.title}
                  </h2>
                )}
                {section.level === 2 && (
                  <h3 className="font-['Caveat',_cursive] text-[32px] text-black mb-4 mt-10">
                    {section.title}
                  </h3>
                )}
                {section.level === 3 && (
                  <h4 className="font-['Caveat',_cursive] text-[24px] text-gray-800 mb-3 mt-6">
                    {section.title}
                  </h4>
                )}

                {/* Section Content - Paragraphs */}
                <div className="space-y-4">
                  {section.content.map((contentBlock, pIndex) => (
                    <div key={pIndex}>
                      {/* Render paragraph */}
                      {typeof contentBlock === "string" && (
                        <p className="font-['Patrick_Hand',_cursive] text-[18px] text-gray-700 leading-relaxed">
                          {contentBlock}
                        </p>
                      )}

                      {/* Render bullet points or numbered list */}
                      {typeof contentBlock === "object" &&
                        "type" in contentBlock &&
                        (contentBlock.type === "bullet" || contentBlock.type === "numbered") && (
                          contentBlock.type === "bullet" ? (
                            <ul className="list-disc list-inside space-y-2 ml-4">
                              {contentBlock.items.map((item, itemIndex) => (
                                <li
                                  key={itemIndex}
                                  className="font-['Patrick_Hand',_cursive] text-[18px] text-gray-700 leading-relaxed"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <ol className="list-decimal list-inside space-y-2 ml-4">
                              {contentBlock.items.map((item, itemIndex) => (
                                <li
                                  key={itemIndex}
                                  className="font-['Patrick_Hand',_cursive] text-[18px] text-gray-700 leading-relaxed"
                                >
                                  {item}
                                </li>
                              ))}
                            </ol>
                          )
                        )}

                      {/* Render table */}
                      {typeof contentBlock === "object" &&
                        "type" in contentBlock &&
                        contentBlock.type === "table" && (
                          <div className="my-6 overflow-x-auto border-2 border-gray-300 bg-white p-3" style={{ transform: `rotate(${Math.random() * 0.5 - 0.25}deg)` }}>
                            <table className="w-full border-collapse">
                              <thead>
                                <tr>
                                  {contentBlock.headers.map((header, hIndex) => (
                                    <th
                                      key={hIndex}
                                      className="border border-gray-300 bg-blue-50 px-4 py-2 font-['Caveat',_cursive] text-[16px] text-black text-left"
                                    >
                                      {header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {contentBlock.rows.map((row, rIndex) => (
                                  <tr key={rIndex} className={rIndex % 2 === 0 ? "bg-white" : "bg-blue-50/30"}>
                                    {row.map((cell, cIndex) => (
                                      <td
                                        key={cIndex}
                                        className="border border-gray-300 px-4 py-2 font-['Patrick_Hand',_cursive] text-[16px] text-gray-700"
                                      >
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                      {/* Render blockquote */}
                      {typeof contentBlock === "object" &&
                        "type" in contentBlock &&
                        contentBlock.type === "blockquote" && (
                          <blockquote className="my-6 pl-6 border-l-4 border-blue-700 bg-blue-50/30 py-4 px-4" style={{ transform: `rotate(${Math.random() * 0.5 - 0.25}deg)` }}>
                            <p className="font-['Patrick_Hand',_cursive] text-[18px] text-gray-800 leading-relaxed italic">
                              "{contentBlock.text}"
                            </p>
                            {contentBlock.author && (
                              <p className="font-['Caveat',_cursive] text-[16px] text-gray-600 mt-2">
                                — {contentBlock.author}
                              </p>
                            )}
                          </blockquote>
                        )}

                      {/* Insert images after certain paragraphs if they exist */}
                      {section.images && section.images[pIndex] && (
                        <div className="my-8">
                          <div
                            className="border-2 border-gray-300 p-3 bg-white cursor-pointer hover:shadow-lg transition-shadow"
                            style={{ transform: `rotate(${Math.random() * 2 - 1}deg)` }}
                            onClick={() => setSelectedImage(section.images![pIndex])}
                          >
                            <ImageWithFallback
                              src={section.images[pIndex].url}
                              alt={section.images[pIndex].alt}
                              className="w-full h-auto"
                            />
                            {section.images[pIndex].caption && (
                              <p className="font-['Indie_Flower',_cursive] text-[14px] text-gray-600 text-center mt-2">
                                {section.images[pIndex].caption}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add a subtle divider between major sections */}
                {section.level === 1 && sectionIndex < article.sections.length - 1 && (
                  <div className="mt-12 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                )}
              </div>
            ))}

            {/* End decoration */}
            <div className="mt-16 mb-8 text-center">
              <div className="inline-block p-4 bg-gradient-to-br from-blue-50 to-red-50 border-2 border-black" style={{ transform: 'rotate(-1deg)' }}>
                <p className="font-['Caveat',_cursive] text-[24px] text-black">
                  End of Article
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar toggle could be added here if needed */}
      {selectedImage && (
        <ImageModal
          src={selectedImage.url}
          alt={selectedImage.alt}
          caption={selectedImage.caption}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
