import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { ArticlePage } from "./components/ArticlePage";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/article/:articleId" element={<ArticlePage />} />
            </Routes>
        </Router>
    );
}

