import type { CaseStudy } from "./types";

const img = (file: string) => `neo-voicestack/${file}`;

// Copy is final (owner-supplied NEO-article.md). Do not reword.
// Voice: objective and passive. No "I"/"we"/"my", no names; the only personal detail is hero meta "Role".
export const neoVoicestack: CaseStudy = {
  slug: "neo-voicestack",
  pageTitle: "NEO: an AI front desk for dental practices",
  hero: {
    eyebrow: "VoiceStack · Nov 2025 – Nov 2026",
    title: "NEO: an AI front desk for dental practices, built to scale without custom code",
    summary:
      "Every NEO bot used to be custom-built by engineers, practice by practice. That model was **replaced with a configurable bot platform**, NEO was repositioned as an overflow and after-hours assistant, and the staff and owner experiences around it were rebuilt. NEO grew from **10–15 to ~100 practices**.",
    meta: [
      { label: "Role", value: "Product Manager" },
      {
        label: "Team",
        value:
          "10 (developers, QA, prompt engineers, senior architects, consultants), working with the CEO, customer success and implementation",
      },
      { label: "Timeline", value: "Nov 2025 – Nov 2026" },
      { label: "Tools", value: "Claude Code, Cursor, Claude, Vapi, Figma, Google Docs" },
    ],
    image: {
      src: img("01-system-map.svg"),
      alt: "System overview: the configurable platform turns a practice's configuration into a live bot; NEO answers after-hours and overflow calls and sorts each into fully completed, partially completed or needs follow-up; missed calls are recovered by SMS; staff work in the AI Front Desk and owners see the renewal dashboard.",
    },
  },
  impact: [
    { value: "20–25 days → ~30 min", label: "to set up a bot for a practice" },
    { value: "10–15 → ~100", label: "practices live, across ~120 locations" },
    { value: "~40%", label: "of incoming calls fully handled by NEO, ~30% more partially" },
    { value: "40–50 hrs", label: "of staff time saved a month at a small practice" },
  ],
  blocks: [
    {
      type: "split",
      number: "01",
      eyebrow: "The problem",
      heading: "A bot that couldn't scale, for calls that couldn't wait",
      body: [
        "Dental practices lose patients to calls nobody answers: after hours, and when every line is busy.",
        "NEO, VoiceStack's AI voice and SMS assistant, was built to catch those calls. But every bot was custom-coded for each practice and location. Setup took **20–25 days** from a practice expressing interest, and building bots consumed **half to nearly all of each sprint**, roughly two engineers and a QA engineer.",
        "Each new customer slowed the product down instead of growing it.",
      ],
      chips: ["Custom code per practice", "20–25 day setup", "Engineering bottleneck"],
      callout: "Building bots, not features, was taking up most of every sprint.",
    },
    {
      type: "section",
      number: "02",
      eyebrow: "Discovery",
      heading: "13,000 calls, and the practices behind them",
      intro:
        "Call transcripts and metadata were analysed with AI to find how conversations actually unfold, then checked through interviews with dental practices and input from customer success and implementation.",
      stats: [
        { value: "10,000", label: "bot calls analysed" },
        { value: "3,000", label: "human front-desk calls analysed" },
        { value: "37%", label: "transfers to staff that rang out unanswered" },
        { value: "51%", label: "transfer miss rate at close of business" },
      ],
      findings: [
        {
          title: "Most practices needed the same bot.",
          body: "The differences were details, functions and wording, not logic. That made a configurable model possible.",
        },
        {
          title: "Human calls set the standard.",
          body: "How front-desk staff handle calls shaped NEO's conversation design.",
        },
        {
          title: "Handoffs leaked patients.",
          body: "When staff didn't pick up a transfer, the caller was left stranded. This became the warm transfer spec.",
        },
      ],
      figure: {
        src: img("02-call-quality-analysis.svg"),
        alt: "AI-assisted analysis of 10,000 bot calls and 3,000 human calls feeding conversation design, plus transfer analysis: 37% of transfers rang out, 51% at close of business, callers hung up after about 32 seconds.",
      },
    },
    {
      type: "section",
      number: "03",
      eyebrow: "Alignment",
      heading: "Four sets of priorities, one 90-day roadmap",
      intro:
        "Input from the CEO, the engineering tech lead, customer success and implementation was synthesised into a **90-day roadmap, with every feature backed by call data and a written justification**. The plan put US stabilisation ahead of new markets and treated NEO as a product, not a service queue: fix what drives churn, defer one-off requests.",
      figure: {
        src: img("03-roadmap-alignment.svg"),
        alt: "Inputs from the CEO, engineering tech lead, customer success and implementation synthesised into shared priorities and a four-feature 90-day roadmap.",
      },
    },
    {
      type: "gridPaperStatement",
      number: "04",
      eyebrow: "Opportunity",
      text: "How might any practice get a reliable AI front desk in a day, without engineering?",
    },
    {
      type: "split",
      number: "05",
      eyebrow: "Key decision",
      heading: "Back up the front desk, don't replace it",
      body: [
        "The beta had been deployed as a full frontline receptionist, which hurt trust with practices. NEO was repositioned as an **AI front desk assistant for overflow and after-hours calls**, and frontline placement was discouraged.",
        "Confirmations, cancellations and general inquiries stayed fully automated. For booking and rescheduling, NEO collects the details for staff to complete. During open hours, it routes callers to the right person or department.",
        "Website claims were cut back to match what NEO could actually do.",
      ],
      chips: ["Reputation risk", "Implementation scalability", "Capability accuracy"],
      figure: {
        src: img("04-scope-decision.svg"),
        alt: "Scope matrix comparing what the beta attempted with what the relaunch retained, reduced to data collection, or deferred, with decision drivers and positioning.",
      },
    },
    {
      type: "cards",
      number: "06",
      eyebrow: "Approach",
      heading: "Data-led, aligned before build, tested before launch",
      cards: [
        {
          title: "Call analysis",
          body: "AI-assisted analysis of 10,000 bot calls and 3,000 human calls to drive conversation design and find where calls were lost.",
        },
        {
          title: "User research",
          body: "Interviews with dental practices and a US design-partner practice to check findings against real front-desk needs.",
        },
        {
          title: "Leadership alignment",
          body: "Evidence and a low-fi concept taken to the CEO and leadership for sign-off before anything was built.",
        },
        {
          title: "Specs for engineering",
          body: "Implementation-ready requirements with a decision log, prototypes and annotated mockups, groomed with developers, QA, prompt engineers and architects.",
        },
        {
          title: "Prototyping",
          body: "Bot behaviour prototyped and tested by phone in Vapi; internal tooling prototyped in greyscale to move fast.",
        },
        {
          title: "Acceptance and launch",
          body: "Acceptance testing before release, and go-to-market shaped with the CEO and sales.",
        },
      ],
    },
    {
      type: "features",
      number: "07",
      eyebrow: "The solution",
      heading: "Four shipped products around one configurable core",
      intro: "Each maps to a numbered point on the system overview at the top of the page.",
      items: [
        {
          title: "Configurable bot platform",
          status: "Shipped",
          body: "One standard bot template replaced custom code. Each practice is described by a configuration of 20+ inputs: practice details as variables (hours, address, providers, accepted insurance), functions as toggles (new or existing patient booking, offering a reschedule on cancellation), and editable wording for each moment of the call (greeting, sign-off, cost questions, insurance not accepted). The configuration is automatically rendered into a prompt and loaded into the Bot Builder, so implementation deploys and updates bots **without code or engineering**. Setup fell from **20–25 days to about half an hour** (3–4 days at worst), multiple locations can go live the same day, and roughly **two engineers and a QA engineer were returned to product work every sprint**. Custom bots remain a separate, higher-effort option, used by 4–5 practices (8–10 locations) with very specific flows.",
          figure: {
            src: img("05-config-platform.svg"),
            alt: "Configuration form with practice variables, function toggles and editable wording, flowing through a standard template and rendered prompt into a live bot, with before-and-after on setup time, engineering cost and scale.",
          },
        },
        {
          title: "AI Front Desk workspace (UX overhaul)",
          status: "Shipped, in daily use",
          body: "Calls are grouped by what staff need to do: **fully completed** (~40%), **partially completed** (~30%), and **needs follow-up**. Calls that need a person open with the summary, transcript and captured details side by side, so staff can create the patient or appointment straight from the call. Unfinished calls become next-day tasks. A small practice reported saving **40–50 staff hours a month**.",
          figure: {
            src: img("06-front-desk-ux.svg"),
            alt: "AI Front Desk workspace: calls grouped into fully completed, partially completed and needs follow-up, with a detail panel of summary, transcript and captured details and quick actions to create an appointment or patient.",
          },
        },
        {
          title: "Renewal dashboard",
          status: "Shipped, used in renewals",
          body: "The practice-owner dashboard was rebuilt from an activity report that led with declining numbers into a six-part narrative: verdict, reach, recovery, disposition, handoff attribution, opportunity. It became a key tool in renewal conversations for showing NEO's value.",
          figure: {
            src: img("07-renewal-dashboard.svg"),
            alt: "Renewal dashboard before and after: an activity report leading with declining metrics, redesigned as a six-part narrative for practice owners.",
          },
        },
        {
          title: "SMS recovery",
          status: "Shipped, live at 3 locations at handover",
          body: "When a call is missed, a workflow rule triggers the Text Bot to text the caller back and continue the conversation. Conversations are modelled as a thread anchored to the original call, with one outcome at the end. Pre-launch research projected that **15–20% of missed calls** could be recovered this way.",
          figure: {
            src: img("08-sms-recovery.svg"),
            alt: "SMS recovery model: workflow trigger rule, a thread of sessions and pauses with nudges and a single outcome, and compliance gaps flagged.",
          },
        },
      ],
    },
    {
      type: "split",
      number: "08",
      eyebrow: "Measurement",
      heading: "One outcome per call",
      body: [
        "Every call NEO handles gets exactly one outcome, grouped into **fully completed, partially completed, or needs human follow-up**.",
        "The same groups drive the AI Front Desk view and the renewal dashboard, so staff, owners and the team read performance the same way. NEO is framed as **the first responder on every call**, not a bot with a pass/fail rate.",
      ],
      chips: ["Evaluation framework", "One label per call", "Owner-facing language"],
      figure: {
        src: img("09-outcome-taxonomy.svg"),
        alt: "Call outcome taxonomy grouping each disposition into fully completed, partially completed or needs human follow-up, with the share of calls in each group.",
      },
    },
    {
      type: "split",
      number: "09",
      eyebrow: "In progress at handover",
      heading: "Warm transfer with whisper",
      body: [
        "Built on the transfer findings: NEO holds the caller while it rings staff and briefs whoever answers on who's calling and why. If no one picks up, it returns to the caller to help or take a message.",
        "The spec locked one attempt per call and clear outcome rules. The telephony architecture was the open decision at handover.",
      ],
      figure: {
        src: img("10-warm-transfer.svg"),
        alt: "Sequence diagram of warm transfer with whisper across caller, NEO and staff, with locked decisions and open questions; marked in progress at handover.",
      },
    },
    {
      type: "steps",
      number: "10",
      eyebrow: "Process",
      heading: "How the work moved",
      steps: [
        "**Discover:** AI-assisted analysis of 10,000 bot calls and 3,000 human calls; transfer and outcome data",
        "**Validate:** interviews with dental practices and a US design partner; customer success and implementation input",
        "**Align + decide:** evidence and a low-fi concept taken to the CEO and leadership; justified 90-day roadmap",
        "**CEO + leadership sign-off**, before anything is built",
        "**Specify:** requirements with a decision log, plus prototypes and annotated mockups handed to engineering",
        "**Groom + build:** with developers, QA, prompt engineers and architects; spec revised on feedback",
        "**Acceptance testing** before release",
        "**Take to market:** go-to-market shaped with the CEO and sales",
      ],
      figure: {
        src: img("11-process.svg"),
        alt: "Process from data-led discovery and practice interviews, through leadership alignment and CEO sign-off before build, to specification, grooming and build, acceptance testing, and go-to-market.",
      },
    },
    {
      type: "outcome",
      number: "11",
      eyebrow: "Outcome",
      heading: "From custom builds to a product that scales",
      body: [
        "NEO grew from 10–15 practices to **~100 practices across ~120 locations**, peaking at **40 locations onboarded in a single month**, with **~60 more practices in the pipeline through a DSO**. Onboarding was limited by the sales pipeline, not by setup.",
        "Wherever it sat in the phone tree, NEO **fully handled ~40% of incoming calls** and partially handled ~30% more, either capturing details for staff or routing callers to the right person.",
      ],
      reflection:
        "Scaling an AI product is mostly about removing the work that doesn't scale. Turning custom bots into configuration freed engineering to build the product instead of copies of it, and let implementation serve a practice in an afternoon. Narrowing what NEO promised, and measuring every call the same way, gave practices a number they could trust.",
    },
  ],
};
