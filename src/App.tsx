import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { ArticlePage } from "./components/ArticlePage";
import { lazy, Suspense } from "react";

// Dev-only design-system reference page (tree-shaken out of production builds)
const StyleGuide = import.meta.env.DEV
    ? lazy(() => import("./components/StyleGuide").then((m) => ({ default: m.StyleGuide })))
    : null;

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/article/:articleId" element={<ArticlePage />} />
                {StyleGuide && (
                    <Route path="/styleguide" element={<Suspense fallback={null}><StyleGuide /></Suspense>} />
                )}
            </Routes>
        </Router>
    );
}

