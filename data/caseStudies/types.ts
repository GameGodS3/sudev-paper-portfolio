/**
 * Case study schema. A case study is pure data rendered by one layout component
 * (src/components/caseStudy/CaseStudyLayout.tsx). See docs/case-studies/NEO-case-study-brief.md.
 *
 * Text fields may contain **bold** markers, which render as <strong>.
 * Figure `src` values are paths under data/articleImages/ (e.g. "neo-voicestack/01-system-map.svg").
 */
export type Figure = { src: string; alt: string; caption?: string };

export type Stat = { value: string; label: string };

type BlockHeader = { number: string; eyebrow: string };

export type Block =
  | (BlockHeader & {
      type: "split";
      heading: string;
      body: string[];
      chips?: string[];
      callout?: string;
      figure?: Figure;
    })
  | (BlockHeader & {
      type: "section";
      heading: string;
      intro?: string;
      stats?: Stat[];
      findings?: { title: string; body: string }[];
      figure?: Figure;
    })
  | (BlockHeader & { type: "gridPaperStatement"; text: string })
  | (BlockHeader & {
      type: "cards";
      heading: string;
      cards: { title: string; body: string }[];
    })
  | (BlockHeader & {
      type: "features";
      heading: string;
      intro?: string;
      items: { title: string; status?: string; body: string; figure: Figure }[];
    })
  | (BlockHeader & {
      type: "steps";
      heading: string;
      steps: string[];
      note?: string;
      figure?: Figure;
    })
  | (BlockHeader & {
      type: "outcome";
      heading: string;
      body: string[];
      reflection?: string;
    });

export type CaseStudy = {
  slug: string;
  /** Browser tab title */
  pageTitle: string;
  hero: {
    eyebrow: string;
    title: string;
    summary: string;
    meta: { label: string; value: string }[];
    image?: Figure;
  };
  impact: Stat[];
  blocks: Block[];
  next?: { label: string; href: string };
};
