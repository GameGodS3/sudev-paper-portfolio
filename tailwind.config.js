/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // Design tokens live in src/styles/globals.css (:root). Tailwind only maps names to them.
            colors: {
                paper: "var(--paper)",
                ink: "var(--ink)",
                "ink-soft": "var(--ink-soft)",
                "ink-faint": "var(--ink-faint)",
                "pen-blue": "var(--pen-blue)",
                "pen-blue-dark": "var(--pen-blue-dark)",
                "pen-red": "var(--pen-red)",
                highlight: "var(--highlight)",
                "sticky-ink": "var(--sticky-ink)",
            },
            fontFamily: {
                display: ["var(--font-display)"],
                hand: ["var(--font-hand)"],
                body: ["var(--font-body)"],
            },
            // Fluid type scale (values defined as clamp() in globals.css)
            fontSize: {
                display: ["var(--step-display)", { lineHeight: "1.05" }],
                title: ["var(--step-title)", { lineHeight: "1.15" }],
                subtitle: ["var(--step-subtitle)", { lineHeight: "1.25" }],
                lead: ["var(--step-lead)", { lineHeight: "1.4" }],
                body: ["var(--step-body)", { lineHeight: "1.6" }],
                small: ["var(--step-small)", { lineHeight: "1.5" }],
            },
            maxWidth: { page: "var(--page-max)" },
            spacing: {
                gutter: "var(--gutter)",
                section: "var(--section-y)",
                line: "var(--line)",
            },
            minHeight: { tap: "2.75rem" },
            minWidth: { tap: "2.75rem" },
            boxShadow: {
                ink: "3px 3px 0 0 var(--ink)",
                "ink-sm": "2px 2px 0 0 var(--ink)",
                paper: "0 1px 2px rgb(0 0 0 / 0.06), 0 6px 16px -8px rgb(0 0 0 / 0.18)",
            },
        },
    },
    plugins: [],
}
