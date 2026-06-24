import React, { useEffect } from "react";
import NavBar from "./Components/NavBar";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Portfolio from "./Components/Portfolio";
import Experience from "./Components/Experience";
import Contacts from "./Components/Contacts";
import Terminal from "./Components/Terminal";

function App() {
  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <div className="App bg-black min-h-screen" id="main-content">
        <NavBar />
        <Hero />
        <About />
        <Portfolio />
        <Experience />
        <Contacts />
        <Terminal />
      </div>
    </>
  );
}

export default App;