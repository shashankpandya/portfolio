import React, { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: 1,
    title: "Aira",
    subtitle: "AI-Powered Interview Coach",
    category: "Generative AI",
    description: "Voice-first multilingual technical interview coach for students in Tier-2/3 Indian cities. Makes quality interview prep accessible without requiring app downloads.",
    challenge: "Students in underserved regions lack access to quality interview preparation tools. Existing solutions are expensive, English-only, or require complex setup.",
    techStack: ["WhatsApp API", "AWS Lambda", "Gemini 2.5", "Amazon Transcribe", "Amazon Polly", "DynamoDB"],
    contribution: "Designed the serverless event-driven architecture, built Lambda functions for async audio processing, and optimized the system to $1.31/user/month.",
    impact: "Enabling multilingual interview practice via WhatsApp — no app download required. Directly addresses educational inequality in India.",
    color: "from-purple-500 to-pink-500",
    stats: [{ label: "Languages", value: "Multi" }, { label: "Cost", value: "$1.31/mo" }],
    link: "https://github.com/shashankpandya/Aira"
  },
  {
    id: 2,
    title: "Empathy Engine",
    subtitle: "Emotion-Aware Text-to-Speech",
    category: "AI/ML",
    description: "An AI-powered system that detects emotional sentiment in text and modulates speech parameters to produce expressive, human-like audio output.",
    challenge: "Standard TTS systems produce flat, robotic audio lacking emotional resonance — disconnecting users in accessibility tools and conversational AI.",
    techStack: ["Python", "HuggingFace Transformers", "gTTS", "Flask", "Web UI"],
    contribution: "Built emotion detection pipeline, created vocal parameter mapping system (rate/pitch/volume based on emotion), and designed intensity scaling for natural transitions.",
    impact: "7 emotion mappings (joy, sadness, anger, fear, disgust, surprise, neutral) with linearly interpolated intensity scaling for natural vocal output.",
    color: "from-cyan-500 to-blue-500",
    stats: [{ label: "Emotions", value: "7" }, { label: "Models", value: "HF" }],
    link: "https://github.com/shashankpandya/empathy-engine"
  },
  {
    id: 3,
    title: "Crypto Portfolio",
    subtitle: "Decentralized Asset Tracker",
    category: "Full-Stack + Blockchain",
    description: "A full-stack crypto portfolio tracker with smart contract integration and serverless cloud deployment. Self-custody with professional-grade analytics.",
    challenge: "Traditional crypto trackers require centralized servers creating single points of failure. Users want self-custody without sacrificing professional features.",
    techStack: ["React", "Node.js", "MongoDB", "Solidity", "AWS Lambda", "Serverless Framework", "GitHub Actions"],
    contribution: "Full-stack development: React dashboard, REST API endpoints, MongoDB schemas, smart contract integration, and CI/CD pipeline with automated testing.",
    impact: "Production-ready serverless architecture with 26 commits across frontend, backend, smart contracts, and deployment infrastructure.",
    color: "from-orange-500 to-yellow-500",
    stats: [{ label: "Commits", value: "26" }, { label: "Stack", value: "Full" }],
    link: "https://github.com/shashankpandya/Crypto_Portfolio"
  },
  {
    id: 4,
    title: "TriaAssignment",
    subtitle: "Contact Management System",
    category: "Frontend",
    description: "A modern, feature-rich React contact management application with custom design system, CSV import/export, and enterprise-grade UX patterns.",
    challenge: "Generic contact apps lack personality and modern UX. Need feature-rich elegance with bulk operations, activity logging, and responsive design.",
    techStack: ["React", "Vite", "Custom Design System", "CSV Parsing", "Toast Notifications"],
    contribution: "Built 11+ custom components with custom color palette, implemented CSV import/export with validation, and designed activity logging system.",
    impact: "Professional-grade UI demonstrating frontend craftsmanship with feature depth matching enterprise applications.",
    color: "from-green-500 to-emerald-500",
    stats: [{ label: "Components", value: "11+" }, { label: "Features", value: "Full" }],
    link: "https://github.com/shashankpandya/triaAssignment"
  }
];

const ProjectCard = ({ project, index, isVisible }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${project.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
      
      {/* Main Card */}
      <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden">
        {/* Header with Gradient */}
        <div className={`relative h-32 bg-gradient-to-r ${project.color} p-6`}>
          <span className="absolute top-4 right-4 px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full text-xs text-white font-mono">
            {project.category}
          </span>
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
          <p className="text-white/80 text-sm mt-1">{project.subtitle}</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-gray-400 leading-relaxed">{project.description}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech, i) => (
              <span key={i} className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300">
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-400">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-4">
            {project.stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-gray-500 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Expandable Case Study */}
          <button 
            onClick={() => setExpanded(!expanded)}
            className="w-full py-3 text-center text-gray-400 hover:text-cyan-400 transition-colors flex items-center justify-center gap-2 border-t border-gray-800 mt-4"
          >
            <span>{expanded ? 'Hide' : 'View'} Case Study</span>
            <svg className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Expanded Content */}
          <div className={`overflow-hidden transition-all duration-500 ${expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="space-y-4 pt-4 border-t border-gray-800">
              <div>
                <h4 className="text-cyan-400 font-semibold text-sm mb-2">🎯 Challenge</h4>
                <p className="text-gray-500 text-sm">{project.challenge}</p>
              </div>
              <div>
                <h4 className="text-purple-400 font-semibold text-sm mb-2">💡 My Contribution</h4>
                <p className="text-gray-500 text-sm">{project.contribution}</p>
              </div>
              <div>
                <h4 className="text-green-400 font-semibold text-sm mb-2">📈 Impact</h4>
                <p className="text-gray-500 text-sm">{project.impact}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 py-3 min-h-[48px] text-center bg-gradient-to-r ${project.color} rounded-xl font-semibold text-white hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900`}
            >
              View Code
            </a>
            <button className="px-6 py-3 min-h-[48px] border border-gray-700 rounded-xl text-gray-400 hover:border-gray-500 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900">
              Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      name="projects" 
      className="relative py-32 w-full bg-gradient-to-b from-gray-900 via-black to-gray-950"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-cyan-400 font-mono text-sm tracking-widest mb-4">&lt;Projects /&gt;</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Featured <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Work</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Deep dives into problems I've solved, systems I've built, and the impact they've created.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mt-6" />
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* View More */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a 
            href="https://github.com/shashankpandya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-gray-700 rounded-xl text-gray-300 hover:border-cyan-500 hover:text-cyan-400 transition-all group"
          >
            <span>View All Projects on GitHub</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
