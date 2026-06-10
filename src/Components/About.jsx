import React, { useEffect, useRef, useState } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  const highlights = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: "Problem Solver",
      desc: "Turning complex challenges into elegant code solutions"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Full-Stack Dev",
      desc: "From React UIs to AWS Lambda, I build complete systems"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "AI Enthusiast",
      desc: "Integrating Generative AI to build smarter applications"
    }
  ];

  const journey = [
    { year: "2021", event: "Joined IIT Kharagpur" },
    { year: "2022", event: "First React Project" },
    { year: "2023", event: "AWS Cloud Journey" },
    { year: "2024", event: "AI/ML Deep Dive" },
    { year: "Now", event: "Building Impactful Solutions" }
  ];

  return (
    <section 
      ref={sectionRef}
      name="about" 
      className="relative py-32 w-full bg-gradient-to-b from-black via-gray-950 to-gray-900"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(6,182,212,0.5) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-cyan-400 font-mono text-sm tracking-widest mb-4">&lt;About Me /&gt;</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            The <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Story</span> So Far
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Story */}
          <div className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-cyan-500/20 rounded-lg rotate-12" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-purple-500/20 rounded-lg -rotate-12" />
              
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                IIT Kharagpur — My Launchpad
              </h3>
              <p className="text-gray-400 leading-relaxed">
                As a <span className="text-white font-semibold">B.Tech student at one of India's most prestigious engineering institutions</span>, 
                I'm not just learning to code — I'm learning to think. The rigorous curriculum and collaborative environment 
                at IIT Kharagpur has shaped my approach to problem-solving: break it down, build it up, iterate relentlessly.
              </p>
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
            <div className="relative p-6 rounded-xl bg-gray-950 border border-gray-800 font-mono text-sm overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800 flex items-center px-4 gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <pre className="pt-8 text-gray-400 overflow-x-auto">
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
            {/* Highlights */}
            <div className="grid gap-6">
              {highlights.map((item, index) => (
                <div 
                  key={index}
                  className="group flex gap-6 p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 hover:bg-gray-800/50"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="relative pl-8 border-l-2 border-gray-700">
              <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                My Journey
              </h4>
              {journey.map((item, index) => (
                <div 
                  key={index}
                  className="relative mb-8 last:mb-0"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="absolute -left-[41px] w-4 h-4 rounded-full bg-gray-800 border-4 border-cyan-500" />
                  <p className="text-cyan-400 font-mono text-sm">{item.year}</p>
                  <p className="text-white font-medium mt-1">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { value: "4+", label: "Projects Shipped" },
            { value: "10+", label: "Technologies" },
            { value: "AWS", label: "Certified Skills" },
            { value: "∞", label: "Curiosity" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-cyan-500/50 transition-colors group"
            >
              <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                {stat.value}
              </p>
              <p className="text-gray-500 mt-2 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
