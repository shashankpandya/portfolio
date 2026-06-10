import React, { useEffect, useRef, useState } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const highlights = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: "Problem Solver",
      desc: "Turning complex challenges into elegant code solutions",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Full-Stack Dev",
      desc: "From React UIs to AWS Lambda, I build complete systems",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "AI Enthusiast",
      desc: "Integrating Generative AI to build smarter applications",
      color: "from-orange-500 to-yellow-500"
    }
  ];

  const journey = [
    { year: "2021", event: "Joined IIT Kharagpur", icon: "🎓" },
    { year: "2022", event: "First React Project", icon: "⚛️" },
    { year: "2023", event: "AWS Cloud Journey", icon: "☁️" },
    { year: "2024", event: "AI/ML Deep Dive", icon: "🤖" },
    { year: "Now", event: "Building Impactful Solutions", icon: "🚀" }
  ];

  return (
    <section 
      ref={sectionRef}
      name="about" 
      className="relative py-32 w-full bg-gradient-to-b from-black via-gray-950 to-gray-900 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(6,182,212,0.5) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Animated Orbs */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 mb-6">
            <span className="text-cyan-400 font-mono text-sm">&lt;About Me /&gt;</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
            The <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Story</span> So Far
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Story */}
          <div 
            ref={cardRef}
            className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
            style={{
              transform: `rotateX(${(mousePos.y - 0.5) * -3}deg) rotateY(${(mousePos.x - 0.5) * 3}deg)`,
              transition: 'transform 0.2s ease-out'
            }}
          >
            {/* Main Card with 3D Effect */}
            <div className="relative p-10 rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 group-hover:border-cyan-500/30 transition-all duration-500">
              {/* Glow Effect */}
              <div 
                className="absolute -inset-1 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-700"
                style={{
                  background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(6,182,212,0.3) 0%, transparent 50%)`
                }}
              />
              
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(74,222,128,0.8)]" />
                  <h3 className="text-2xl font-bold text-white">IIT Kharagpur — My Launchpad</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  As a <span className="text-white font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">B.Tech student at India's premier engineering institution</span>, 
                  I'm not just learning to code — I'm learning to think. The rigorous curriculum and collaborative environment 
                  at IIT Kharagpur has shaped my approach to problem-solving: <span className="text-cyan-400">break it down</span>, <span className="text-purple-400">build it up</span>, <span className="text-pink-400">iterate relentlessly</span>.
                </p>
              </div>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed">
              My focus? Building systems that are <span className="text-cyan-400 font-semibold">easy to reason about, deploy, and extend</span>. 
              Whether it's a React dashboard, a serverless AWS architecture, or an AI pipeline with Gemini — I care about 
              clean design and real-world impact.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              Currently exploring the intersection of <span className="text-purple-400 font-semibold">Generative AI</span> and 
              <span className="text-blue-400 font-semibold"> scalable cloud systems</span>. When I'm not coding, you'll find me 
              on the basketball court — where I learned that <span className="text-gray-400">great teamwork beats solo genius every time</span>.
            </p>

            {/* Code Block Decoration */}
            <div className="relative p-8 rounded-2xl bg-gray-950 border border-gray-800 font-mono text-sm overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-10 bg-gray-800 flex items-center px-4 gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-gray-500 text-xs">mission.js</span>
              </div>
              <pre className="pt-12 text-gray-400 overflow-x-auto">
                <span className="text-purple-400">const</span> <span className="text-cyan-400">mission</span> = {'{'}
                <br />
                &nbsp;&nbsp;build: <span className="text-green-400">"meaningful software"</span>,
                <br />
                &nbsp;&nbsp;learn: <span className="text-green-400">"every single day"</span>,
                <br />
                &nbsp;&nbsp;impact: <span className="text-green-400">"communities that matter"</span>
                <br />
                {'}'}
              </pre>
            </div>
          </div>

          {/* Right: Highlights & Timeline */}
          <div className={`space-y-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Highlights with 3D Cards */}
            <div className="grid gap-6">
              {highlights.map((item, index) => (
                <div 
                  key={index}
                  className="group relative p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-transparent transition-all duration-500 overflow-hidden"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* 3D Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
                  
                  <div className="relative flex gap-6">
                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-y-180 transition-all duration-500`}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline with 3D Effect */}
            <div className="relative pl-12 border-l-2 border-gray-800">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-500/5 to-purple-500/5 rounded-l-full" />
              <h4 className="text-lg font-bold text-white mb-8 flex items-center gap-2 relative">
                <span className="text-2xl">⏳</span> My Journey
              </h4>
              {journey.map((item, index) => (
                <div 
                  key={index}
                  className="relative mb-8 last:mb-0 group"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="absolute -left-[52px] w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-lg shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    {item.icon}
                  </div>
                  <div className="absolute -left-[52px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-900 border-4 border-cyan-500 group-hover:bg-cyan-500 transition-colors" />
                  <p className="text-cyan-400 font-mono text-sm group-hover:translate-x-2 transition-transform">{item.year}</p>
                  <p className="text-white font-medium mt-1 group-hover:text-cyan-400 transition-colors">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Bar with 3D Effect */}
        <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { value: "4+", label: "Projects Shipped", icon: "🚀", color: "from-cyan-500 to-blue-500" },
            { value: "10+", label: "Technologies", icon: "⚡", color: "from-purple-500 to-pink-500" },
            { value: "AWS", label: "Certified Skills", icon: "☁️", color: "from-orange-500 to-yellow-500" },
            { value: "∞", label: "Curiosity", icon: "💡", color: "from-green-500 to-emerald-500" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="group relative text-center p-8 rounded-2xl bg-gray-800/30 border border-gray-700/50 hover:border-transparent transition-all duration-500 overflow-hidden"
              style={{ transform: `translateZ(${index * 10}px)` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
              <div className="relative">
                <span className="text-4xl mb-4 block">{stat.icon}</span>
                <p className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform`}>
                  {stat.value}
                </p>
                <p className="text-gray-500 mt-2 text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
