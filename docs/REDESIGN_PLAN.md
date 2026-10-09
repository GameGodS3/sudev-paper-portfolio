# Notebook Redesign: Plan & Living Checklist

> **Status:** 🟢 Approved. Phases 0 and 1 done (awaiting Checkpoint 1 review); Phase 2 next
> **Branch:** `redesign/notebook-cohesion`  →  PR into `main` when approved
> **Goal:** Keep the professional-yet-semi-playful paper-notebook vibe, but make the whole site feel like *one* notebook that works well on phone, tablet and desktop.

This file is the single source of truth for the redesign. It is updated in the same commit as each change: tick the box, add a one-line note, and log any decision in the [Decision log](#decision-log).

---

## 1. Critique summary (baseline)

Reviewed the live build at 390 / 820 / 1280 / 1920 px.

| # | Area | Problem |
|---|------|---------|
| C1 | Cohesion | ~~Notebook paper only exists in the hero~~ **Corrected after checking real viewport screenshots:** the paper is a fixed layer behind the whole page, but each section laid a blurred white wash over it (`bg-white/10 backdrop-blur`), the JPG was stretched with `object-cover` so ruling spacing varied 40–60px by screen size, and the margin line ran through text. *(Full-page screenshots had misled me because they don't render fixed layers.)* |
| C2 | Cohesion | 5 font families in play (Caveat, Patrick Hand, Indie Flower, There Brat, system sans). Sticky note and buttons fall back to system sans. |
| C3 | Cohesion | 6+ accent colours with no meaning attached (blue, red, yellow, lavender, pink, green). |
| C4 | Cohesion | Mixed component language: wobbly tags, boxed language badges, flat blue submit button, differently styled links. Random tilt angles. |
| C5 | Layout | Hero is an absolutely-positioned Figma export (`imports/Desktop1.tsx`). On phone/tablet the name collides with the margin line, the vertical email and the social icons; the sticky note overlaps icons and the scroll arrow. |
| C6 | Layout | Desktop hero composition is off-balance (photo far left, sticky note cropped at the fold, tiny vertical email). |
| C7 | Layout | Timeline zig-zag leaves a blank half-column on tablet/desktop and is cramped at ~820 px. |
| C8 | Layout | Wide screens (≥1536 px): content card ends abruptly, ruled lines fade out. |
| C9 | Layout | Phone: skills are a single endless column; page is ~12,700 px tall. Brush headings wrap to 2 lines and dominate the body text. |
| C10 | Layout | Inconsistent section rhythm (Education left-aligned list, Achievements 3-col grid, uneven vertical gaps). |
| C11 | A11y | Dates/locations look faint mainly because of thin, light handwriting strokes at small sizes, not the colour value (`gray-600` already passes AA, verified). Fix is font weight/size, not just darker ink. Small tap targets (social icons, "Learn More"). |
| C12 | A11y/UX | No section navigation on a very long page; no `prefers-reduced-motion` handling; loading overlay locks scroll with a fake progress bar. |
| C13 | Perf | Google Fonts loaded via CSS `@import` (render-blocking); multi-MB JPGs for project images and profile photo. |
| C14 | Content | Title says "Product Manager", sticky note says "AI Product Manager & Developer". Contact form includes phone and its destination is unclear. (Content changes are deferred until the resume is provided.) |

---

## 2. Design principles

1. **One notebook, many pages.** The ruled paper and red margin run behind the whole site; each section is a "page" on it, not a separate white card.
2. **Semi-playful, never messy.** Playfulness comes from a small, *systematic* set of devices (tape, highlighter, pen underline, gentle tilt), not random rotation.
3. **Readable first.** Handwriting is for display and accents; body copy stays highly legible with proper contrast.
4. **Fluid by default.** `clamp()` type and spacing plus one breakpoint set, rather than per-section magic numbers.
5. **Content-agnostic.** Section components take their content from data files so the upcoming resume update is a data change, not a redesign.

---

## 3. Design system (to be implemented in Phase 1)

### Type roles (3 families, down from 5)
| Role | Use | Font (proposed) |
|------|-----|-----------------|
| Display | Hero name, section titles | `There Brat` (existing, self-hosted) |
| Hand | Subtitles, role titles, accents, sticky notes | `Caveat` |
| Body | Bullets, paragraphs, form labels, metadata | A legible handwriting-flavoured face (candidates: *Patrick Hand* or *Kalam*) with a system fallback. Final pick after side-by-side check on phone. |

Fonts self-hosted or `<link rel=preconnect>` + `display=swap`; no CSS `@import`. `Ink Free` is Windows-only; drop it unless it is the existing local fallback for the hero.

### Ink palette (CSS variables)
| Token | Meaning | Use |
|-------|---------|-----|
| `--ink` | Black ink | Headings, primary text |
| `--ink-soft` | Graphite (meets AA on paper) | Secondary text, dates, locations |
| `--pen-blue` | Blue pen | Links, bullets, timeline, primary actions |
| `--pen-red` | Red pen | Margin line, key highlights, stars |
| `--highlight` | Yellow highlighter / sticky | Sticky notes, emphasised terms |
| `--paper`, `--paper-line` | Paper and ruled lines | Background |

Skill groups keep distinct sticky colours but get a **small legend** so colour has meaning; other decorative colours are removed.

### Spacing, type scale, breakpoints
- Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536` (Tailwind defaults) with a single `max-w` page column (~1100 px) centred on the paper.
- Fluid type scale via `clamp()` for display / h2 / h3 / body / small. Minimum body size 16 px on phone.
- Section rhythm: one shared section padding token; one divider style.
- Tap targets ≥ 44 px.

### Core components (shared, reused everywhere)
| Component | Replaces |
|-----------|----------|
| `<Section title subtitle>` | Per-section heading markup + white card wrapper + dashed divider |
| `<PaperCard>` | Ad-hoc bordered/shadowed boxes |
| `<Tag>` | Tech tags, language level badges, achievement chips |
| `<StickyNote color tilt>` | Skill chips and hero note (extends existing `StickyNote.tsx`) |
| `<InkButton variant>` | Resume/Contact buttons, form submit, "Learn more"/"Source" links |
| `<NotebookBackground>` | Hero-only background; becomes a fixed layer for the whole page |
| `<TabNav>` | New: index-tab style section navigation |

Tilt rule: a fixed set of 3 angles (−1.5°, 0°, +1.5°) assigned deterministically (by index) so layout is stable between renders and snapshots.

---

## 4. Phased task list

Legend: `[ ]` todo · `[~]` in progress · `[x]` done · `[-]` dropped (with reason). Each phase ends with a **preview checkpoint**: screenshots at 390 / 820 / 1280 / 1920 px shared for review before the next phase starts.

### Phase 0: Setup ✅
- [x] Create branch `redesign/notebook-cohesion` and push
- [x] Confirm source builds and matches the live bundle hashes
- [x] Approve this plan (you)
- [x] Add `docs/screenshots/before/` baseline captures of the current site at 4 widths
- [x] Add a repeatable screenshot script (`scripts/screenshots.mjs`; `--dev --path=/styleguide` for the dev-only style guide)
- [x] Legacy root files: verified the build output is **byte-identical** without root `App.tsx`, `components/`, `imports/`, `styles/`, then removed them. **`data/` is kept**: `data/projectArticles.ts` and `data/articleImages/**` (the case studies and their images) are imported by `src/`. `Attributions.md` and `guidelines/` kept.

### Phase 1: Foundation ✅ (pending your review)
- [x] CSS variables for ink palette, fluid type scale, spacing in `src/styles/globals.css`; removed the unused shadcn/dark-mode tokens and Tailwind-v4-only at-rules (the project uses Tailwind 3, so they were no-ops)
- [x] Tailwind config: colours, 3 font roles, fluid font sizes, `max-w-page`, spacing and shadow tokens, 44px `min-h-tap`
- [x] Font loading: removed the CSS `@import`; `<link rel=preconnect>` + `display=swap` in `index.html`. Display font gets `font-display: swap`
- [~] Consolidate to 3 families: tokens and roles are defined (`font-display`, `font-hand`, `font-body`). **Indie Flower is still loaded** because the existing sections reference it; it is dropped in Phase 3 when they migrate
- [x] Global base styles: body font/size/colour, focus-visible ring, balanced headings, smooth scroll and animation damping under `prefers-reduced-motion`
- [x] Shared components in `src/components/paper/`: `Section`, `SectionDivider`, `PaperCard`, `Tag`, `InkButton`, `NotebookBackground`, `tiltFor`; `StickyNote` updated (token font, `className`). Not yet applied to sections (Phase 3)
- [x] Notebook background redrawn in CSS: constant 32px ruling on every device, red margin hugs the content column (never crosses text), scrolls with the page. Removed the blurred white wash from every section
- [x] Dev-only `/styleguide` route (not in production build) with palette, type scale, components and the **body-font comparison**
- [x] **Checkpoint 1:** screenshots in `docs/screenshots/phase1/` (site at 390/820/1280/1920, style guide at 390/820/1280)
- [ ] **Your call:** body font, Patrick Hand (current) vs Kalam. See the comparison in the style guide screenshots. Until you pick, `--font-body` stays Patrick Hand (one-line swap in `globals.css`)

### Phase 2: Hero (landing)
- [ ] Replace absolutely-positioned Figma export (`imports/Desktop1.tsx`) with a responsive layout
  - [ ] Phone: stacked (photo → greeting → name → role → CTAs → socials)
  - [ ] Tablet: two-column photo / text split
  - [ ] Desktop and wide: balanced composition with max-width, sticky note anchored deliberately
- [ ] Name never collides with margin line, socials or email at any width (320–2560)
- [ ] Email and socials as readable, ≥44 px tap targets (no tiny vertical-text email on phone)
- [ ] Keep the entrance animation (GSAP) but re-target it to the new markup; respect `prefers-reduced-motion`
- [ ] Rework loading overlay: shorter, doesn't lock scrolling longer than necessary
- [ ] Unify role wording (pending your resume)
- [ ] **Checkpoint 2:** hero at 4 widths

### Phase 3: Sections
- [ ] Work Experience: single-rail timeline on phone/tablet; compact two-sided or single-rail on desktop without empty halves
- [ ] Projects: consistent `PaperCard`, tag and link styles; 1 col phone / 2 col tablet+; unify the "Learn more"/"Source" links
- [ ] Languages & Skills: wrapping sticky chips (2-col on phone), colour legend, language levels as `Tag`
- [ ] Education: align with shared timeline/card rhythm
- [ ] Achievements: 1 → 2 → 3 columns with consistent card design
- [ ] Hobbies: same card system
- [ ] Volunteering: currently commented out in `LandingPage`; keep hidden unless you want it back
- [ ] Contact: restyle form with `InkButton` and paper inputs; clarify submit behaviour *(see Open questions)*
- [ ] Footer: align with system
- [ ] **Checkpoint 3:** all sections at 4 widths

### Phase 4: Navigation & article pages
- [ ] Index-tab section nav (sticky; collapses to a compact control on phone)
- [ ] Smooth-scroll + active-section highlighting
- [ ] Article pages (`/article/:id`) and `ImageModal` brought onto the same design system and made responsive
- [ ] Compress oversized images (profile photo, project images are 0.5–1.5 MB each); responsive `srcset`/`loading="lazy"`
- [ ] **Checkpoint 4:** nav + article pages

### Phase 5: Accessibility, polish, QA
- [ ] Contrast audit (WCAG AA) on all text/ink combinations
- [ ] Keyboard navigation and visible focus on every interactive element
- [ ] Semantic landmarks and heading order; alt text review; `lang`, meta description, OG tags
- [ ] Reduced-motion verified
- [ ] Cross-device test matrix (below) with no horizontal scroll at any width
- [ ] Lighthouse pass (Perf / A11y / Best-practices / SEO) with before/after numbers recorded here
- [ ] Remove dead code and unused UI primitives that nothing imports (only after verifying with a build)
- [ ] **Checkpoint 5:** final review

### Phase 6: Content update *(after you send your resume and career brief)*
- [ ] Update `data/` and section copy
- [ ] Re-check layout with the real lengths of text
- [ ] Final role/title wording across `<title>`, hero, meta tags

### Phase 7: Handoff
- [ ] Final build passes (`npm run build`, `npm run lint`)
- [ ] Open PR `redesign/notebook-cohesion` → `main` with before/after screenshots *(only after your go-ahead)*
- [ ] You merge, build and publish to `gamegods3.github.io` `main`

---

## 5. Test matrix

| Class | Widths / devices to verify |
|-------|----------------------------|
| Small phone | 320, 360 |
| Phone | 390 (iPhone), 412 (Android), 430 |
| Phone landscape | 844 × 390 |
| Tablet portrait | 768, 820 (iPad Air) |
| Tablet landscape | 1024, 1180 |
| Laptop | 1280, 1366, 1440 |
| Desktop / wide | 1920, 2560 |

Per width: no horizontal scroll, no overlapping elements, hero fits first fold sensibly, tap targets ≥ 44 px, text ≥ 16 px body, all sections reachable via nav.

Checks are run with Playwright (Chromium) screenshots; real-device behaviour (iOS Safari address-bar `100vh`, font rendering) will be flagged as *unverified* unless you test on a device.

---

## 6. Risks and notes

- **Hero rewrite is the largest change.** The current hero is a design-tool export with absolute coordinates; it can't be made responsive by tweaks. Plan is a clean rebuild that keeps its look.
- **GSAP animation** targets specific elements; changing markup means updating selectors in `src/animation/DesktopAnimation.tsx`.
- **`100vh` on mobile browsers:** use `100svh`/`dvh` with fallbacks.
- **Bundle/hash changes:** the deployed `gamegods3.github.io` repo contains hashed build output; a new build replaces it wholesale.
- **Article routes:** `/article/:id` uses client-side routing. GitHub Pages needs a `404.html` fallback (or hash routing) for direct links; to be checked at handoff, not changed unless needed.

---

## 7. Open questions

All answered by the owner:

1. ~~Legacy root files~~ → verified unused by the build and removed; `data/` (case studies) kept.
2. ~~Contact form~~ → keep the existing Google Form submission untouched; visual changes only; phone field stays and is optional (already not `required`).
3. ~~Volunteering~~ → stays hidden.
4. **Body font** → owner will choose between Patrick Hand and Kalam from the style-guide comparison (Checkpoint 1).
5. ~~Dark mode~~ → out of scope.
6. ~~Loading screen~~ → keep as is. Revisit a shorter intro after standardisation and before the content update.

---

## 8. Decision log

| Date | Decision | Notes |
|------|----------|-------|
| 2026-10-09 | Work on `redesign/notebook-cohesion` in the source repo; PR to `main` only after user approval | User merges and publishes the build |
| 2026-10-09 | Content changes deferred until resume and career brief arrive | Layout built to be data-driven |
| 2026-10-09 | Legacy root `App.tsx`, `components/`, `imports/`, `styles/` removed; `data/` kept | Build output verified byte-identical; `data/` holds the case studies |
| 2026-10-09 | Contact form: no logic changes, Google Form endpoint stays | Visual restyle only in Phase 3 |
| 2026-10-09 | Volunteering stays hidden; no dark mode; loading screen unchanged | Per owner |
| 2026-10-09 | Notebook paper drawn in CSS (32px pitch, margin hugs column, scrolls with page) | Replaces stretched JPG; `ArticlePage` still uses the JPG until Phase 4 |
| 2026-10-09 | Body font choice deferred to owner at Checkpoint 1 | Default stays Patrick Hand |

## 9. Progress log

| Date | Commit | Summary |
|------|--------|---------|
| 2026-10-09 | `86b71da` | Initial plan and checklist |
| 2026-10-09 | `be2cbb8` | Phase 0: remove unused legacy files, screenshot script, "before" baseline |
| 2026-10-09 | _Phase 1 commit_ | Design tokens, Tailwind mapping, fonts, base styles, shared `paper/` components, CSS notebook background, dev style guide |

**Known side effects of Phase 1 (to be tuned in later phases):** page is ~340px taller on phone (global `line-height: 1.6`); section headings are still fixed `50px` until sections migrate to `Section` (Phase 3); skill sticky notes still use `Math.random()` rotation until Phase 3; hero is untouched (Phase 2).
