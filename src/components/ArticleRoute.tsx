import { useParams } from "react-router-dom";
import { caseStudies } from "../../data/caseStudies";
import { ArticlePage } from "./ArticlePage";
import { CaseStudyLayout } from "./caseStudy/CaseStudyLayout";

/**
 * /article/:articleId. Case studies on the new block template take precedence;
 * everything else still renders through the original ArticlePage.
 */
export function ArticleRoute() {
  const { articleId } = useParams<{ articleId: string }>();
  const study = articleId ? caseStudies[articleId] : undefined;
  return study ? <CaseStudyLayout study={study} /> : <ArticlePage />;
}
