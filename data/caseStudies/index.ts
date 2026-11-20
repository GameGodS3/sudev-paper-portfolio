import type { CaseStudy } from "./types";
import { neoVoicestack } from "./neo-voicestack";

/** Case studies built on the block-based template, keyed by slug (served at /article/:slug). */
export const caseStudies: Record<string, CaseStudy> = {
  [neoVoicestack.slug]: neoVoicestack,
};

export type { CaseStudy } from "./types";
