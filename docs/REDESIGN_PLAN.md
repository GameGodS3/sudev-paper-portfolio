# Notebook Redesign: Plan & Living Checklist

> **Status:** 🟡 Draft, awaiting approval
> **Branch:** `redesign/notebook-cohesion`  →  PR into `main` when approved
> **Goal:** Keep the professional-yet-semi-playful paper-notebook vibe, but make the whole site feel like *one* notebook that works well on phone, tablet and desktop.

This file is the single source of truth for the redesign. It is updated in the same commit as each change: tick the box, add a one-line note, and log any decision in the [Decision log](#decision-log).

---

## 1. Critique summary (baseline)

Reviewed the live build at 390 / 820 / 1280 / 1920 px.

| # | Area | Problem |
|---|------|---------|
| C1 | Cohesion | Notebook paper only exists in the hero; every section below is a plain white card. Theme disappears after the first screen. |
| C2 | Cohesion | 5 font families in play (Caveat, Patrick Hand, Indie Flower, There Brat, system sans). Sticky note and buttons fall back to system sans. |
| C3 | Cohesion | 6+ accent colours with no meaning attached (blue, red, yellow, lavender, pink, green). |
| C4 | Cohesion | Mixed component language: wobbly tags, boxed language badges, flat blue submit button, differently styled links. Random tilt angles. |
| C5 | Layout | Hero is an absolutely-positioned Figma export (`imports/Desktop1.tsx`). On phone/tablet the name collides with the margin line, the vertical email and the social icons; the sticky note overlaps icons and the scroll arrow. |
| C6 | Layout | Desktop hero composition is off-balance (photo far left, sticky note cropped at the fold, tiny vertical email). |
| C7 | Layout | Timeline zig-zag leaves a blank half-column on tablet/desktop and is cramped at ~820 px. |
| C8 | Layout | Wide screens (≥1536 px): content card ends abruptly, ruled lines fade out. |
| C9 | Layout | Phone: skills are a single endless column; page is ~12,700 px tall. Brush headings wrap to 2 lines and dominate the body text. |
| C10 | Layout | Inconsistent section rhythm (Education left-aligned list, Achievements 3-col grid, uneven vertical gaps). |
| C11 | A11y | Low-contrast grey handwriting for dates/locations; light condensed fonts at small sizes; small tap targets (social icons, "Learn More"). |
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

### Phase 0: Setup
- [x] Create branch `redesign/notebook-cohesion` and push
- [x] Confirm source builds and matches the live bundle hashes
- [ ] Approve this plan (you)
- [ ] Add `docs/screenshots/` baseline captures of the current site at 4 widths ("before")
- [ ] Add a repeatable screenshot script (Playwright, `scripts/screenshots.mjs`) for before/after checkpoints
- [ ] Decide on legacy root-level files (`App.tsx`, `components/`, `styles/`, duplicate of `src/`, unused Figma export): remove or leave? *(needs your call)*

### Phase 1: Foundation
- [ ] CSS variables for ink palette, type scale, spacing in `src/styles/globals.css`; remove unused shadcn/dark-mode tokens that aren't used
- [ ] Extend Tailwind config (colours, fonts, breakpoints, `container` max-width)
- [ ] Font loading: drop `@import`, add preconnect + `swap`; consolidate to 3 families
- [ ] Global base styles: body font/size/colour, link and focus styles, `prefers-reduced-motion`
- [ ] Build shared components: `Section`, `PaperCard`, `Tag`, `StickyNote`, `InkButton`
- [ ] Fixed notebook background layer (ruled lines + red margin) behind the whole page, scaling cleanly 320 → 2560 px
- [ ] **Checkpoint 1:** foundation screenshots

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

1. **Legacy root files** (`App.tsx`, `components/`, `styles/` at repo root, a Figma-export duplicate of `src/`): delete in this redesign, or leave untouched?
2. **Contact form:** where should submissions go (Formspree/Web3Forms/mailto)? Keep the phone field?
3. **Volunteering section:** stays hidden?
4. **Body font:** happy for me to choose between Patrick Hand and Kalam after a side-by-side on phone?
5. **Dark mode:** out of scope (paper theme only). Confirm.
6. **Loading screen:** keep a (shorter) intro, or remove entirely?

---

## 8. Decision log

| Date | Decision | Notes |
|------|----------|-------|
| 2026-10-09 | Work on `redesign/notebook-cohesion` in the source repo; PR to `main` only after user approval | User merges and publishes the build |
| 2026-10-09 | Content changes deferred until resume and career brief arrive | Layout built to be data-driven |

## 9. Progress log

| Date | Commit | Summary |
|------|--------|---------|
| 2026-10-09 | _this doc_ | Initial plan and checklist |
