type ImageData = {
  url: string;
  alt?: string;
  caption?: string;
};

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

type SectionData = {
  id: string;
  title: string;
  level: number;
  content: ContentBlock[];
  images?: ImageData[];
};

export type ProjectArticleData = {
  title: string;
  subtitle?: string;
  sections: SectionData[];
};

export const projectArticles: Record<string, ProjectArticleData> = {
  "ai-email-personalisation": {
    title: "AI-Powered Email Personalization Suite for Inflection",
    subtitle: "LLM Tokens • AI Email Generation • Dynamic Personalization at Scale",
    sections: [
      {
        id: "overview",
        title: "Overview",
        level: 1,
        content: [
          "Modern go-to-market teams struggle with personalization at scale: SDRs manually craft emails, customer data lives in silos, and personalization is often limited to superficial tokens like \"{{First Name}}\" rather than insights that actually drive engagement.",
          "This project introduces an AI layer inside a marketing automation platform to enable real-time AI email generation, intelligent LLM-driven data tokens, prompt-driven asset builders, a measurable scoring system, and a predictable credit-based cost model.",
        ],
      },
      {
        id: "inflection",
        title: "What is Inflection?",
        level: 1,
        content: [
          "Inflection is a next-generation Marketing Automation Platform built specifically for B2B SaaS companies with a Product-Led Growth (PLG) motion. Unlike traditional marketing tools that depend on static segments and generic messaging, Inflection helps teams build engagement that is smarter, contextual, and driven by actual product behavior.",
          "At its core, Inflection unifies product, marketing, and account data, then adds AI-powered enrichment so personalization becomes scalable without losing relevance or control. The result is customer communication that adapts to the user—not the other way around, enabling teams to shift from volume-driven outreach to meaningful, high-value engagement.",
        ],
      },
      {
        id: "problem",
        title: "The Problem",
        level: 2,
        content: [
          "Personalization was shallow and manual — SDRs copy-pasted research, and scaling personalization meant hiring more people rather than adding intelligence.",
          "Contact data lacked structured, inferred intelligence (ICP fit, tech stack, business model), and existing systems couldn't reliably create deterministic derived insights from unstructured sources.",
          "There was no governance for AI content quality: outputs were unmeasured, inconsistent, and lacked feedback loops for improvement. Finally, cost predictability for AI usage was unclear, risking runaway token spend for enterprises.",
        ],
      },
      {
        id: "role",
        title: "My Role",
        level: 2,
        content: [
          "Product lead for discovery, product definition, system design, and requirements. I owned problem validation, PRD, use cases, acceptance criteria, and success metrics.",
          "I defined the AI system architecture (prompt layer, context ingestion, evaluation layer, feedback loop), token taxonomy, asset builder UX, the credit system for cost control, and enterprise guardrails for content quality and safety.",
        ],
      },
      {
        id: "design-principles",
        title: "Design Principles",
        level: 1,
        content: [
          {
            type: "bullet" as const,
            items: [
              "Write once, personalize endlessly — reusable prompt-driven templates and asset generators reduce manual effort.",
              "Accuracy over creativity — enterprise trust requires a scoring system, context anchoring, and hallucination guardrails.",
              "Explainability over black-box output — system provides rationales and feedback reports so users can trust AI decisions.",
              "Cost transparency — credits and fixed costs per generation provide predictable billing and guardrails.",
              "Iterative improvement built-in — automatic scoring and improvement suggestions let prompts get better over time.",
            ]
          }
        ],
        images: [
          {
            url: "./articleImages/ai-email-generator/flowchart.jpg",
            alt: "How Inflection's AI Email Assistant works — turning customer data and product context into human-quality, on-brand communication through intelligent prompt generation",
            caption: "How Inflection's AI Email Assistant works — turning customer data and product context into human-quality, on-brand communication through intelligent prompt generation"
          },
        ],
      },
      {
        id: "capabilities",
        title: "Core Capabilities Delivered",
        level: 1,
        content: [
          {
            type: "bullet" as const,
            items: [
              "AI Email Generation: contextual emails generated from product data, user activity, company attributes, and CRM signals with enforced brand tone and quality scoring (contextual accuracy, personalization depth, clarity, and prompt quality).",
              "AI Data Tokens: LLM-generated structured fields (e.g., is_ICP_fit, Lead_Score, Has_Free_Trial) with fixed types so tokens are deterministic and safe to use in segmentation and automation. Tokens are tested before deployment to prevent unpredictable outputs.",
              "Prompt Builder with Continuous Feedback: a single interface for prompt definition with context toggles (contact fields, account fields, product activity, marketing data) and AI evaluation metrics plus prompt improvement suggestions before publishing.",
              "Inflection Credit System: predictable pricing with credits deducted per email/token generation, overdraft support to avoid campaign disruption, and blocking of test runs when balance is insufficient.",
            ]
          }
        ],
        images: [
          {
            url: "./articleImages/ai-email-generator/rendered-result-email.jpg",
            alt: "Inflection's AI Prompt Builder interface, showing context selection, prompt definition, and AI evaluation metrics with improvement suggestions",
            caption: "Inflection's AI Prompt Builder interface, showing context selection, prompt definition, and AI evaluation metrics with improvement suggestions"
          },
          
        ],
      },
      {
        id: "constraints",
        title: "System Constraints & Key Decisions",
        level: 2,
        content: [
          {
            type: "bullet" as const,
            items: [
              "Generation was designed to be asynchronous (not instant) to handle large prompts and evaluation overhead reliably.",
              "We avoided nested token inference to prevent cascading failures and recursion risks.",
              "Assets must be tested before storing to avoid hallucinated production content; HTML in emails was disallowed to reduce injection risk and improve reliability.",
              "A fixed credit cost per generation was selected to keep billing predictable for enterprise customers.",
            ]
          }
        ],
        images: [
          {
            url: "./articleImages/ai-email-generator/pricing.jpg",
            alt: "Inflection's AI Credit System provides predictable per-use credit deduction, overdraft to prevent campaign failure, and blocks test runs when the balance is low.",
            caption: "Inflection's AI Credit System provides predictable per-use credit deduction, overdraft to prevent campaign failure, and blocks test runs when the balance is low."
          },
        ],
      },
      {
        id: "impact",
        title: "Impact",
        level: 1,
        content: [
          "Personalization depth moved from \"template + name\" to behavior-aware AI outreach, enabling far more relevant engagement.",
          "Scalability: the system supports millions of personalized emails in a single journey, making it feasible to run large-scale campaigns with meaningful personalization.",
          "Operational load decreased as manual enrichment bottlenecks were removed for SDRs; governance and scoring improved quality and auditability.",
          "Cost control and transparency increased through the credit model and per-generation cost reporting in the UI.",
        ],
      },
      {
        id: "learnings",
        title: "What I Learned",
        level: 1,
        content: [
          {
            type: "blockquote" as const,
            text: "Enterprise AI is less about raw intelligence and more about consistency, explainability, and predictable behavior.",
            author: "Insight from implementation"
          },
          "Prompt quality is a first-class UX surface that needs to be surfaced and iterated on, not hidden behind engineering knobs.",
          "Scalable AI must be auditable, measurable, and billable to gain enterprise trust.",
        ],
      },
      {
        id: "closing",
        title: "Closing Note & Status",
        level: 2,
        content: [
          "This project transforms how organizations talk to customers by moving from scripted outreach to intelligently inferred, context-rich communication at scale without losing trust or control.",
          "Status: Released as V1 with iterative expansion for a limited set of enterprise customers. Domain: AI + Personalization + Marketing Automation. Role: Product Manager.",
          "Images will be added later.",
        ],
      },
    ],
  },

  "website-tracking": {
    title: "Website Tracking for Inflection — From Anonymous Clicks to Actionable Customer Intent",
    subtitle: "Web Activity • Intent Signals • Identity Resolution for Product-Led Growth",
    sections: [
      {
        id: "backdrop",
        title: "The Backdrop",
        level: 1,
        content: [
          "For most B2B SaaS companies, the story begins before the user ever signs up. Clicks happen. Intent forms. Pages get skimmed. Pricing gets revisited (often multiple times). But in many cases, all of this happens outside the product — invisible to the very teams that need it most.",
          "At Inflection, we were helping Product-Led Growth teams orchestrate better customer journeys, but there was a blind spot: we didn't have visibility into user behavior on their websites.",
          "This meant:",
          {
            type: "bullet" as const,
            items: [
              "No idea who visited, from where, or why",
              "No way to map anonymous visits to real contacts later",
              "No ability to trigger journeys based on pre-signup intent",
              "And a hard dependency on external tools like HubSpot, Segment, or Google Analytics"
            ]
          },
          "So the question became: What if website behavior wasn't just analytics data — but a real input into how a company engages its users?"
        ]
      },
      {
        id: "inflection",
        title: "What is Inflection?",
        level: 1,
        content: [
          "Inflection is a next-generation Marketing Automation Platform built specifically for B2B SaaS companies with a Product-Led Growth (PLG) motion. Unlike traditional marketing tools that depend on static segments and generic messaging, Inflection helps teams build engagement that is smarter, contextual, and driven by actual product behavior.",
          "At its core, Inflection unifies product, marketing, and account data, then adds AI-powered enrichment so personalization becomes scalable without losing relevance or control. The result is customer communication that adapts to the user—not the other way around, enabling teams to shift from volume-driven outreach to meaningful, high-value engagement.",
        ],
      },
      {
        id: "opportunity",
        title: "The Opportunity",
        level: 1,
        content: [
          "Bring web activity, intent signals, and visitor identity directly into Inflection so teams can:",
          {
            type: "bullet" as const,
            items: [
              "Understand who is engaging before sign-up",
              "Capture when a visitor turns into a known lead",
              "Use website behavior as triggers and segmentation logic in automation",
              "Create campaigns powered not just by product usage, but full user journey context"
            ]
          },
          "This wasn't just building a tracker. This was laying the foundation for learning customer intent earlier than ever before."
        ],
        images: [
          {
            url: "./articleImages/website-tracking/flowchart.jpg",
            alt: "How Inflection Website Tracking works - Turning anonymous website visits into actionable, contextual insights for marketing and product teams.",
            caption: "How Inflection Website Tracking works - Turning anonymous website visits into actionable, contextual insights for marketing and product teams."
          }
        ],
      },
      {
        id: "role",
        title: "My Role",
        level: 2,
        content: [
          "I led the product definition and experience design for Website Tracking, focusing on:",
          {
            type: "bullet" as const,
            items: [
              "Defining what to track, how, and why",
              "Designing identity mapping from anonymous → known user",
              "Ensuring low-latency, privacy-safe, and first-party tracking",
              "Making the data actionable in journeys and segmentation",
              "Collaborating with engineering, design, and GTM teams to shape the scope",
              "Translating raw tracking data into automation-ready product signals"
            ]
          }
        ]
      },
      {
        id: "core-questions",
        title: "Core Questions That Shaped the Product",
        level: 2,
        content: [
          'Throughout the design process, a few questions kept us anchored:',
          {
            type: "table" as const,
            headers: ["Question", "Why it mattered"],
            rows: [
              ["How do we identify users without violating privacy norms?", "We needed first-party cookies + consent-aware tracking"],
              ["When does an anonymous visitor become a real contact?", "We relied on form submissions + email click re-entry"],
              ["How do we make this more than analytics?", "By feeding data into campaigns, journeys, and audience filters"],
              ["Can tracking be lightweight and fast?", "Yes — performance impact capped to < 500ms"],
              ["What if users don't want tracking?", "Built opt-out support + GPC compliance"],
            ]
          }
        ]
      },
      {
        id: "what-we-built",
        title: "What We Built",
        level: 1,
        content: [
          {
            type: "numbered" as const,
            items: [
              "A lightweight first-party Website Tracking SDK - Embedded via script tag on customer websites, tracks both anonymous and identified users, doesn't rely on third-party cookies, fast and privacy-safe (<500ms added latency), and tracks across devices, sessions, and visits",
              "Rich intent capture, not just pageviews - Page URLs, visits, frequency, UTM parameters, referrer data, device/OS/location/timezone, on-page form submissions, session duration, and anonymous ID → Contact mapping",
              "Visitor-to-contact identity resolution - Visitors remain anonymous until form submission or email campaign click-through, then their entire past behavior is stitched into the contact timeline retroactively",
              "Actionable insights inside Inflection - Web activity becomes journey triggers, dynamic list filters, contact timeline events, and marketing activity records usable across automations",
              "A UI that makes setup and debugging painless - Teams can add & verify domains, copy tracking scripts, see domain health and activity status, debug live tracking data, and segment users using captured URLs and UTM values"
            ]
          }
        ],
        images: [
          {
            url: "./articleImages/website-tracking/domains-registered.png",
            alt: "Inflection's Website Tracking domain management interface, showing registered domains, health status, and setup instructions",
            caption: "Inflection's Website Tracking domain management interface, showing registered domains, health status, and setup instructions"
          }
        ],
      },
      {
        id: "real-magic",
        title: "The Real Magic",
        level: 1,
        content: [
          'What made this more than "just another tracker" was intent → automation:',
          {
            type: "blockquote" as const,
            text: "User visits pricing page → visits again from email campaign (UTM tracked) → submits form → contact created → journey triggered based on behavior → messaging personalized using real intent signals"
          },
          'Instead of guessing interest, we respond to it.'
        ],
        images:[
          {
            url: "./articleImages/website-tracking/marketing-activities.png",
            alt: "Inflection's contact timeline showing website tracking events, including page visits, UTM parameters, and form submissions",
            caption: "Inflection's contact timeline showing website tracking events, including page visits, UTM parameters, and form submissions"
          }
        ],
      },
      {
        id: "constraints",
        title: "Constraints We Embraced",
        level: 1,
        content: [
          'We made deliberate calls to keep the system:',
          {
            type: "bullet" as const,
            items: [
              "Fast → no perceptible delay to page load",
              "Secure → no identifiable IDs in script, no third-party cookies",
              "Consent-aware → GPC compliant + manual opt-out support",
              "Future-ready → segment-compatible + extensible architecture",
              "Action-oriented → data must feed journeys, not dashboards"
            ]
          }
        ]
      },
      {
        id: "impact",
        title: "The Impact",
        level: 1,
        content: [
          'Without Website Tracking: Marketing automation starts after sign-up.',
          'With Website Tracking: Automation starts from the very first visit.',
          'Teams can now:',
          {
            type: "bullet" as const,
            items: [
              "Segment users by real browsing intent",
              "Attribute top-of-funnel sources accurately",
              "Convert anonymous visitors into contact profiles",
              "Power journeys using pre-product behavior",
              "Unify acquisition, intent, and lifecycle data in one place"
            ]
          }
        ]
      },
      {
        id: "takeaways",
        title: "Takeaways",
        level: 1,
        content: [
          "This project taught me that:",
          {
            type: "bullet" as const,
            items: [
              "The best automation doesn't start in the product — it starts before it",
              "Great tracking isn't about data collection — it's about data usability",
              "Identity resolution is a UX problem as much as an engineering one"
            ]
          },
          {
            type: "blockquote" as const,
            text: "And curiosity is the best product compass: Not just \"can we track this?\", but \"what can this knowledge help a team do next?\""
          }
        ]
      },
      {
        id: "closing-thought",
        title: "Closing Thought",
        level: 1,
        content: [
          'Website Tracking unlocked the missing half of the user journey. It turned anonymous clicks into meaningful product signals, enabling companies to engage users based on real intent, not assumptions.',
          'And in a world full of generic outreach — that context makes all the difference.',
          'Images will be added later.'
        ]
      }
    ]
  },

};