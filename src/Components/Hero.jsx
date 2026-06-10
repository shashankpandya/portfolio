import React, { useEffect, useState } from "react";
import MyPic from "../assets/Img.jpg";

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  
  const titles = [
    "Full-Stack Developer",
    "AI/ML Engineer", 
    "Cloud Architect",
    "Problem Solver"
  ];
  
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    
    const typeSpeed = isDeleting ? 50 : 100;
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentTitle.length) {
          setTypedText(currentTitle.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setTypedText(currentTitle.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIndex, isDeleting, titleIndex]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <section name="home" className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Grid */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            transform: 'perspective(500px) rotateX(60deg)'
          }}
        />
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[180px]" />
        
        {/* Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/50 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-center min-h-screen px-6 lg:px-16 gap-12">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-gray-300">Available for opportunities</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <p className="text-cyan-400 font-mono text-lg tracking-wide animate-fade-in">
              &lt;Hello World /&gt;
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                I'm
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Shashank
              </span>
            </h1>
            
            {/* Animated Title */}
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <span className="text-gray-500 font-mono">$</span>
              <span className="text-2xl md:text-3xl font-mono text-gray-300">
                {typedText}
              </span>
              <span className={`text-2xl md:text-3xl text-cyan-400 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
            <span className="text-cyan-400 font-semibold">B.Tech @ IIT Kharagpur</span> — building 
            AI-powered systems and scalable architectures that solve real problems. 
            Currently focused on <span className="text-purple-400">Generative AI</span> and 
            <span className="text-blue-400"> serverless cloud solutions</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
            <a 
              href="#projects"
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            <a 
              href="mailto:pandyashashank1@gmail.com"
              className="px-8 py-4 border-2 border-gray-600 rounded-xl font-semibold text-gray-300 hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300 hover:bg-cyan-500/10"
            >
              Let's Talk
            </a>
            
            <a 
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 border border-gray-700 rounded-xl font-semibold text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </a>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-8 justify-center lg:justify-start pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">4+</p>
              <p className="text-sm text-gray-500">Projects Built</p>
            </div>
            <div className="w-px bg-gray-700" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">IIT</p>
              <p className="text-sm text-gray-500">Kharagpur</p>
            </div>
            <div className="w-px bg-gray-700" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">AWS</p>
              <p className="text-sm text-gray-500">Certified</p>
            </div>
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex-shrink-0 relative">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Glow Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-spin-slow" 
              style={{ animationDuration: '8s' }}
            />
            <div className="absolute inset-2 rounded-full bg-gray-950" />
            
            {/* Image Container */}
            <div className="absolute inset-4 rounded-full overflow-hidden group">
              <img 
                src={MyPic} 
                alt="Shashank Pandya" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-700 shadow-xl animate-float">
              <p className="text-sm font-mono text-cyan-400">building...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
        <span className="text-xs font-mono tracking-wider">SCROLL</span>
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-cyan-400 rounded-full animate-bounce" />
        </div>
      </div>

      {/* Custom Cursor Follower */}
      <div className="fixed w-4 h-4 bg-cyan-400/50 rounded-full pointer-events-none blur-sm mix-blend-difference" id="cursor-glow" />
    </section>
  );
};

export default Hero;