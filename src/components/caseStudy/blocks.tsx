import type { ReactNode } from "react";
import type { Block, Figure, Stat } from "../../../data/caseStudies/types";
import { CaseStudyFigure } from "./CaseStudyFigure";
import { RichText } from "./RichText";

type OpenFigure = (figure: Figure) => void;

function Eyebrow({ number, eyebrow }: { number: string; eyebrow: string }) {
  return <p className="cs-eyebrow">{number} · {eyebrow}</p>;
}

function Chips({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="cs-chips" aria-label="Key themes">
      {items.map((c) => <li key={c} className="cs-chip">{c}</li>)}
    </ul>
  );
}

function Body({ paragraphs }: { paragraphs: string[] }) {
  return <>{paragraphs.map((p) => <p key={p} className="cs-body"><RichText text={p} /></p>)}</>;
}

function Section({ id, children }: { id: string; children: ReactNode }) {
  return <section className="cs-section" aria-labelledby={id}>{children}</section>;
}

export function ImpactTiles({ stats }: { stats: Stat[] }) {
  return (
    <div className="cs-impact-wrap">
      <ul className="cs-impact" aria-label="Impact">
        {stats.map((s) => (
          <li key={s.label} className="cs-tile">
            <p className="cs-tile-value">{s.value}</p>
            <p className="cs-tile-label">{s.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BlockRenderer({ block, onOpen }: { block: Block; onOpen: OpenFigure }) {
  const id = `cs-${block.number}`;

  switch (block.type) {
    case "split":
      return (
        <Section id={id}>
          <div className="cs-split">
            <div className="cs-split-left">
              <Eyebrow number={block.number} eyebrow={block.eyebrow} />
              <h2 id={id} className="cs-h2">{block.heading}</h2>
            </div>
            <div className="cs-split-right">
              <Body paragraphs={block.body} />
              <Chips items={block.chips} />
              {block.callout && (
                <p className="cs-callout cs-gridpaper"><span className="cs-highlight">{block.callout}</span></p>
              )}
            </div>
          </div>
          {block.figure && <CaseStudyFigure figure={block.figure} onOpen={onOpen} />}
        </Section>
      );

    case "section":
      return (
        <Section id={id}>
          <Eyebrow number={block.number} eyebrow={block.eyebrow} />
          <h2 id={id} className="cs-h2">{block.heading}</h2>
          {block.intro && <p className="cs-intro"><RichText text={block.intro} /></p>}
          {block.stats && (
            <ul className="cs-stats" aria-label="Key figures">
              {block.stats.map((s) => (
                <li key={s.label} className="cs-stat">
                  <p className="cs-stat-value">{s.value}</p>
                  <p className="cs-stat-label">{s.label}</p>
                </li>
              ))}
            </ul>
          )}
          {block.findings && (
            <>
              <p className="cs-label cs-findings-label">Findings</p>
              <ul className="cs-findings">
                {block.findings.map((f) => (
                  <li key={f.title}>
                    <h3 className="cs-h3">{f.title}</h3>
                    <p className="cs-card-body">{f.body}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
          {block.figure && <CaseStudyFigure figure={block.figure} onOpen={onOpen} />}
        </Section>
      );

    case "gridPaperStatement":
      return (
        <Section id={id}>
          <div className="cs-statement cs-gridpaper">
            <Eyebrow number={block.number} eyebrow={block.eyebrow} />
            <h2 id={id} className="cs-statement-text"><span className="cs-highlight">{block.text}</span></h2>
          </div>
        </Section>
      );

    case "cards":
      return (
        <Section id={id}>
          <Eyebrow number={block.number} eyebrow={block.eyebrow} />
          <h2 id={id} className="cs-h2">{block.heading}</h2>
          <ul className="cs-cards">
            {block.cards.map((c) => (
              <li key={c.title} className="cs-card">
                <h3 className="cs-h3">{c.title}</h3>
                <p className="cs-card-body">{c.body}</p>
              </li>
            ))}
          </ul>
        </Section>
      );

    case "features":
      return (
        <Section id={id}>
          <Eyebrow number={block.number} eyebrow={block.eyebrow} />
          <h2 id={id} className="cs-h2">{block.heading}</h2>
          {block.intro && <p className="cs-intro">{block.intro}</p>}
          {block.items.map((item) => (
            <article key={item.title} className="cs-feature">
              <CaseStudyFigure figure={item.figure} onOpen={onOpen} />
              <div className="cs-feature-head">
                <h3 className="cs-h3">{item.title}</h3>
                {item.status && <span className="cs-chip cs-chip-status">{item.status}</span>}
              </div>
              <p className="cs-body"><RichText text={item.body} /></p>
            </article>
          ))}
        </Section>
      );

    case "steps":
      return (
        <Section id={id}>
          <div className="cs-split">
            <div className="cs-split-left">
              <Eyebrow number={block.number} eyebrow={block.eyebrow} />
              <h2 id={id} className="cs-h2">{block.heading}</h2>
            </div>
            <div className="cs-split-right">
              <ol className="cs-steps">
                {block.steps.map((s) => <li key={s}><RichText text={s} /></li>)}
              </ol>
              {block.note && <p className="cs-note">{block.note}</p>}
            </div>
          </div>
          {block.figure && <CaseStudyFigure figure={block.figure} onOpen={onOpen} />}
        </Section>
      );

    case "outcome":
      return (
        <Section id={id}>
          <Eyebrow number={block.number} eyebrow={block.eyebrow} />
          <h2 id={id} className="cs-h2">{block.heading}</h2>
          <div style={{ marginTop: 16 }}><Body paragraphs={block.body} /></div>
          {block.reflection && (
            <div className="cs-reflection cs-gridpaper">
              <p className="cs-label"><span className="cs-highlight">Reflection</span></p>
              <p className="cs-reflection-text"><span className="cs-highlight">{block.reflection}</span></p>
            </div>
          )}
        </Section>
      );
  }
}
