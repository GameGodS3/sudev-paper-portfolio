/**
 * Ruled notebook paper with a red margin, drawn in CSS (see `.notebook-bg` in globals.css).
 * Place inside a `relative` wrapper that spans the whole page: the ruling then scrolls
 * with the content, like a real notebook, and keeps a constant 32px pitch on every device.
 */
export function NotebookBackground() {
    return <div aria-hidden="true" className="notebook-bg pointer-events-none absolute inset-0 z-0" />;
}
