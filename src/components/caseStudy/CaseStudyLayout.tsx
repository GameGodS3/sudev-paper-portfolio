import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CaseStudy, Figure } from "../../../data/caseStudies/types";
import { ImageModal } from "../ImageModal";
import { ImpactTiles, BlockRenderer } from "./blocks";
import { CaseStudyFigure } from "./CaseStudyFigure";
import { RichText } from "./RichText";
import "../../styles/case-study.css";

/** One layout renders any case study from data (data/caseStudies/*). */
export function CaseStudyLayout({ study }: { study: CaseStudy }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState<Figure | null>(null);

  const backToWork = () => navigate("/", { state: { scrollTo: "projects" } });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    const previous = document.title;
    document.title = study.pageTitle;
    return () => { document.title = previous; };
  }, [study.pageTitle]);

  const { hero } = study;

  return (
    <div className="cs">
      <div className="cs-sheet">
        <div className="cs-topbar">
          <button type="button" className="cs-back" onClick={backToWork}>← All work</button>
        </div>

        <main>
          <header className="cs-hero">
            <p className="cs-eyebrow">{hero.eyebrow}</p>
            <h1 className="cs-h1">{hero.title}</h1>
            <p className="cs-summary"><RichText text={hero.summary} /></p>
            <dl className="cs-meta">
              {hero.meta.map((m) => (
                <div key={m.label}>
                  <dt className="cs-label">{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
            {hero.image && <CaseStudyFigure figure={hero.image} onOpen={setOpen} />}
          </header>

          <ImpactTiles stats={study.impact} />

          {study.blocks.map((block) => (
            <BlockRenderer key={block.number} block={block} onOpen={setOpen} />
          ))}
        </main>

        <nav className="cs-nav" aria-label="Case study navigation">
          <button type="button" onClick={backToWork}>← All work</button>
          {study.next && <a href={study.next.href}>Next: {study.next.label} →</a>}
        </nav>
      </div>

      {open && <ImageModal src={open.src} alt={open.alt} caption={open.caption} onClose={() => setOpen(null)} />}
    </div>
  );
}
