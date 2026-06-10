import React, { useEffect, useState, useRef } from "react";
import MyPic from "../assets/Img.jpg";

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [particles, setParticles] = useState([]);
  
  const titles = [
    "Full-Stack Developer",
    "AI/ML Engineer", 
    "Cloud Architect",
    "Problem Solver"
  ];
  
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const heroRef = useRef(null);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  // Typing effect
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
    <section ref={heroRef} name="home" className="relative min-h-screen w-full overflow-hidden bg-[#030712]">
      {/* 3D Floating Grid Background */}
      <div 
        className="absolute inset-0 perspective-[1000px]"
        style={{
          transform: `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6,182,212,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6,182,212,0.4) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: 'translateZ(-100px) scale(1.5)'
          }}
        />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-[200px]" />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: 0.6,
            animation: `floatParticle ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            filter: 'blur(1px)'
          }}
        />
      ))}

      {/* Holographic Lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-pulse" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-center min-h-screen px-6 lg:px-16 gap-12">
        
        {/* Text Content */}
        <div 
          className="flex-1 text-center lg:text-left space-y-8"
          style={{
            transform: `translateX(${mousePos.x * 2}px) translateY(${mousePos.y * 2}px)`,
            transition: 'transform 0.2s ease-out'
          }}
        >
          {/* Glowing Badge */}
          <div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-cyan-500/30 text-sm group hover:border-cyan-500/60 transition-all duration-500">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
            <span className="relative flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
              <span className="text-gray-300 font-medium">Open to opportunities</span>
            </span>
          </div>

          {/* Main Heading with 3D Effect */}
          <div className="space-y-2 relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent rounded-full opacity-50" />
            <p className="text-cyan-400 font-mono text-lg tracking-widest">
              <span className="animate-pulse">&lt;</span>
              Hello World
              <span className="animate-pulse">/&gt;</span>
            </p>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-none relative">
              <span 
                className="block bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                style={{ textShadow: '0 0 40px rgba(255,255,255,0.3)' }}
              >
                I'm
              </span>
              <span 
                className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
                style={{ 
                  textShadow: '0 0 60px rgba(6,182,212,0.5)',
                  transform: 'translateZ(20px)'
                }}
              >
                SHASHANK
              </span>
            </h1>
            
            {/* Animated Title with Glitch Effect */}
            <div className="flex items-center gap-4 justify-center lg:justify-start mt-6">
              <div className="relative">
                <span className="absolute -left-4 top-1/2 w-8 h-px bg-gradient-to-r from-transparent to-cyan-500" />
                <span className="text-gray-600 font-mono text-2xl">~/</span>
              </div>
              <div className="relative group">
                <span className="text-2xl md:text-3xl font-bold font-mono text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                  {typedText}
                </span>
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 ${showCursor ? 'w-full' : 'w-0'}`} />
                <span className={`text-2xl md:text-3xl text-cyan-400 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>▋</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          {/* Description with Glassmorphism */}
          <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-gray-700/50 group">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-lg text-gray-300 leading-relaxed relative">
              <span className="text-cyan-400 font-bold">B.Tech @ IIT Kharagpur</span> — architecting 
              <span className="text-purple-400"> AI-powered systems</span> and 
              <span className="text-blue-400"> scalable cloud architectures</span> that solve real-world problems.
            </p>
          </div>

          {/* CTA Buttons with 3D Hover */}
          <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4">
            <a 
              href="#projects"
              className="group relative px-8 py-4 rounded-xl font-bold text-white overflow-hidden perspective-[1000px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 shadow-[0_0_30px_rgba(6,182,212,0.5)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-3">
                <span className="group-hover:scale-110 transition-transform">Explore</span>
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
            
            <a 
              href="mailto:pandyashashank1@gmail.com"
              className="group relative px-8 py-4 rounded-xl font-semibold text-gray-300 overflow-hidden border-2 border-gray-700 hover:border-cyan-500 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-3 group-hover:text-cyan-400">
                <span>Let's Connect</span>
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
            </a>
          </div>

          {/* Stats with 3D Cards */}
          <div className="flex gap-8 justify-center lg:justify-start pt-8">
            {[
              { value: "4+", label: "Projects", color: "from-cyan-500 to-blue-500" },
              { value: "IIT", label: "Kharagpur", color: "from-purple-500 to-pink-500" },
              { value: "AWS", label: "Certified", color: "from-orange-500 to-yellow-500" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="relative group"
                style={{
                  transform: `translateY(${mousePos.y * (index + 1)}px)`,
                  transition: 'transform 0.2s ease-out'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-6 rounded-2xl bg-gray-800/30 border border-gray-700/50 backdrop-blur-sm group-hover:border-cyan-500/50 transition-all duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Profile Image with Orbiting Elements */}
        <div 
          className="flex-shrink-0 relative"
          style={{
            transform: `translateX(${-mousePos.x * 3}px) translateY(${-mousePos.y * 3}px)`,
            transition: 'transform 0.2s ease-out'
          }}
        >
          {/* Orbiting Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[400px] h-[400px] md:w-[450px] md:h-[450px] relative">
              {/* Outer Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/30 animate-spin-slow" style={{ animationDuration: '30s' }} />
              
              {/* Middle Ring */}
              <div className="absolute inset-8 rounded-full border border-purple-500/30 animate-spin-slow" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
              
              {/* Inner Ring */}
              <div className="absolute inset-16 rounded-full border border-blue-500/30 animate-spin-slow" style={{ animationDuration: '15s' }} />
              
              {/* Floating Tech Icons on Orbit */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg animate-float">
                  <span className="text-2xl">⚛️</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                  <span className="text-2xl">☁️</span>
                </div>
              </div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                  <span className="text-2xl">🤖</span>
                </div>
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '1.5s' }}>
                  <span className="text-2xl">🔗</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Profile Container */}
          <div className="relative w-72 h-72 md:w-80 md:h-80">
            {/* Glow Rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-spin-slow" style={{ animationDuration: '8s', padding: '3px' }}>
              <div className="w-full h-full rounded-full bg-[#030712]" />
            </div>
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 animate-spin-slow" style={{ animationDuration: '6s', animationDirection: 'reverse', padding: '2px' }}>
              <div className="w-full h-full rounded-full bg-[#030712]" />
            </div>
            
            {/* Image Container with 3D Effect */}
            <div className="absolute inset-4 rounded-full overflow-hidden group perspective-[1000px]">
              <img 
                src={MyPic} 
                alt="Shashank Pandya" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-y-12"
                style={{
                  transform: `rotateY(${mousePos.x * 5}deg) rotateX(${-mousePos.y * 5}deg)`,
                  transition: 'transform 0.1s ease-out'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 via-transparent to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-cyan-500/50 transition-all duration-500" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 px-5 py-3 bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl animate-float">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
                <span className="text-sm font-mono text-cyan-400">building...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator with 3D Effect */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-xs font-mono tracking-[0.3em] text-gray-500 animate-pulse">SCROLL TO EXPLORE</span>
        <div className="relative w-8 h-14 rounded-full border-2 border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-4 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full animate-bounce" 
            style={{ boxShadow: '0 0 15px rgba(6,182,212,0.8)' }}
          />
          {/* 3D depth effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gray-800/20 to-transparent" />
        </div>
      </div>

      {/* Custom Cursor Glow */}
      <div 
        className="fixed w-96 h-96 rounded-full pointer-events-none blur-[100px] opacity-30 transition-all duration-300 ease-out"
        id="cursor-glow"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
          left: '0px',
          top: '0px',
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* CSS for particle animation */}
      <style>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          25% {
            transform: translate(50px, -50px) scale(1.2);
            opacity: 0.8;
          }
          50% {
            transform: translate(-30px, -80px) scale(0.8);
            opacity: 0.4;
          }
          75% {
            transform: translate(-60px, -20px) scale(1.1);
            opacity: 0.7;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;