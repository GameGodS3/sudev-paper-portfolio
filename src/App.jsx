import { useState, useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Landing from "./pages/Landing";
import About from "./pages/About.jsx";
import PageContainer from "./components/PageContainer";
import Navbar from "./components/Navbar";
import { landingAnimation } from "./animation/LandingAnimation";

import "./App.css";

function App() {
  const rootRef = useRef();

  // Timeline
  const tl = useRef();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      tl.current && tl.current.progress(0).kill();
      tl.current = gsap.timeline().add(landingAnimation()).from(".iconGroup", {
        x: -16,
        opacity: 0,
        ease: "elastic.out(1, 0.2)",
        stagger: 0.04,
        duration: 1,
      });
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="App" ref={rootRef}>
      <Navbar />
      <PageContainer>
        <Landing />
        <About />
      </PageContainer>
    </div>
  );
}

export default App;
