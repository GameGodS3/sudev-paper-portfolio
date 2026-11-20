import { ImageWithFallback } from "../figma/ImageWithFallback";
import type { Figure } from "../../../data/caseStudies/types";

interface Props {
  figure: Figure;
  onOpen: (figure: Figure) => void;
}

/**
 * Full-width, uncropped figure. Opens in the shared image lightbox (zoom/pan).
 * On very small screens the frame scrolls horizontally instead of shrinking the diagram's text.
 */
export function CaseStudyFigure({ figure, onOpen }: Props) {
  return (
    <figure className="cs-figure">
      <div className="cs-figure-frame" tabIndex={0} role="group" aria-label="Diagram (scrolls sideways on small screens)">
        <button type="button" className="cs-figure-btn" onClick={() => onOpen(figure)}>
          <ImageWithFallback src={figure.src} alt={figure.alt} loading="lazy" decoding="async" />
          <span className="cs-sr-only">Open enlarged view</span>
        </button>
      </div>
      {figure.caption && <figcaption>{figure.caption}</figcaption>}
    </figure>
  );
}
