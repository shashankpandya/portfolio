import React, { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaExternalLinkAlt, FaDownload, FaBars, FaTimes, FaArrowDown, FaChevronRight, FaCode, FaServer, FaCloud, FaRobot, FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaAward, FaBrain } from 'react-icons/fa';
import { SiReact, SiNodedotjs, SiMongodb, SiDocker, SiAmazonaws } from 'react-icons/si';

// Animation hook
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
}

// Animated Section
function Section({ children, id, className = "", delay = 0 }) {
  const [ref, isInView] = useInView(0.1);
  
  return (
    <section
      ref={ref}
      id={id}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </section>
  );
}

// Navigation
function Navigation({ isScrolled }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-black/95 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#hero" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            SP
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-white transition-colors duration-300 relative group text-sm font-medium"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <a href="https://github.com/shashankpandya" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <FaGithub size={20} />
            </a>
            <a href="https://linkedin.com/in/shashank-pandya" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <FaLinkedin size={20} />
            </a>
            <a
              href="/CV_Shashank_Pandya.pdf"
              download
              className="px-5 py-2.5 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 text-sm"
            >
              <FaDownload size={14} />
              Resume
            </a>
          </div>
          
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a key={item.name} href={item.href} onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors py-2">
                  {item.name}
                </a>
              ))}
              <a href="/CV_Shashank_Pandya.pdf" download className="px-5 py-2.5 bg-white text-black font-semibold rounded-lg text-center">
                Download Resume
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function Hero() {
  const [ref, isInView] = useInView(0.1);
  
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_70%)]" />
      </div>
      
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div 
              className="mb-6 transition-all duration-700"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '100ms' }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-gray-300">Available for opportunities</span>
              </span>
            </div>
            
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-700"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(30px)', transitionDelay: '200ms' }}
            >
              <span className="text-white">Hi, I&apos;m </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Shashank
              </span>
            </h1>
            
            <p 
              className="text-xl md:text-2xl text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 transition-all duration-700"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(30px)', transitionDelay: '300ms' }}
            >
              B.Tech Student at <span className="text-cyan-400 font-semibold">IIT Kharagpur</span> building 
              <span className="text-purple-400"> AI-powered solutions</span> that make a real impact.
            </p>
            
            <div 
              className="flex flex-wrap gap-4 justify-center lg:justify-start transition-all duration-700"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(30px)', transitionDelay: '400ms' }}
            >
              <a href="#projects" className="px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg shadow-white/10">
                View My Work
              </a>
              <a href="#contact" className="px-8 py-4 border border-white/20 rounded-xl text-white font-semibold hover:bg-white/5 transition-all duration-300">
                Get In Touch
              </a>
            </div>
            
            <div 
              className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start transition-all duration-700"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(30px)', transitionDelay: '500ms' }}
            >
              <div className="text-center">
                <p className="text-4xl font-bold text-white">20+</p>
                <p className="text-gray-500 text-sm">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-white">6</p>
                <p className="text-gray-500 text-sm">Core Technologies</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-white">AWS</p>
                <p className="text-gray-500 text-sm">Certified</p>
              </div>
            </div>
          </div>
          
          <div 
            className="flex-1 flex justify-center transition-all duration-700"
            style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(30px)', transitionDelay: '200ms' }}
          >
            <div className="relative">
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
                <img 
                  src="https://avatars.githubusercontent.com/u/146766254?v=4" 
                  alt="Shashank Pandya"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
                <span className="text-sm text-gray-300">IIT Kharagpur</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors">
          <span className="text-xs tracking-widest">SCROLL</span>
          <FaArrowDown />
        </a>
      </div>
    </section>
  );
}

// About Section
function About() {
  return (
    <Section id="about" className="relative py-32 bg-gradient-to-b from-black via-gray-950 to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-mono text-sm tracking-wider">{'// About Me'}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
            The Story Behind the <span className="text-purple-400">Code</span>
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              Currently pursuing my <span className="text-cyan-400 font-semibold">B.Tech at IIT Kharagpur</span>, 
              I&apos;ve spent the last 4+ years diving deep into software development, AI/ML, and cloud computing.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              My passion lies at the intersection of <span className="text-purple-400">generative AI</span> and 
              <span className="text-blue-400"> scalable systems</span>. I believe technology should 
              <span className="text-cyan-400"> solve real problems</span> — like making quality education 
              accessible to students in Tier-2/3 cities through WhatsApp.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              When I&apos;m not coding, you&apos;ll find me on the basketball court or exploring new technologies. 
              I strongly believe in <span className="text-purple-400">collaboration over competition</span> — 
              the best solutions come from diverse perspectives working together.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: <FaCode />, title: "Full-Stack Dev", desc: "React to AWS Lambda" },
                { icon: <FaRobot />, title: "AI/ML Engineer", desc: "LLMs & NLP" },
                { icon: <FaCloud />, title: "Cloud Native", desc: "AWS Certified" },
                { icon: <FaServer />, title: "Backend Systems", desc: "Scalable APIs" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors">
                  <div className="text-cyan-400 mb-2">{item.icon}</div>
                  <h4 className="text-white font-semibold">{item.title}</h4>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative pl-8">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent" />
            
            {[
              { year: "2021", icon: <FaGraduationCap />, title: "IIT Kharagpur", desc: "Started B.Tech journey" },
              { year: "2022", icon: <FaCode />, title: "First Production App", desc: "Built and deployed my first React app" },
              { year: "2023", icon: <FaAward />, title: "AWS Certification", desc: "Became AWS Cloud Practitioner" },
              { year: "2024", icon: <FaRobot />, title: "AI/ML Focus", desc: "Deep dive into LLMs and GenAI" },
              { year: "Now", icon: <FaBriefcase />, title: "Building Impactful Tools", desc: "Aira & Empathy Engine live" },
            ].map((item, i) => (
              <div key={i} className="relative pb-8 last:pb-0">
                <div className="absolute left-0 top-1 w-4 h-4 -translate-x-[6px] rounded-full bg-cyan-500 border-4 border-black" />
                <span className="text-cyan-400 font-mono text-sm">{item.year}</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-gray-500">{item.icon}</span>
                  <h4 className="text-white font-semibold">{item.title}</h4>
                </div>
                <p className="text-gray-500 text-sm mt-1 ml-6">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// Projects Section
function Projects() {
  const projects = [
    {
      title: "Aira",
      subtitle: "AI Interview Coach",
      description: "Voice-first multilingual technical interview coach accessible via WhatsApp. Built for students in Tier-2/3 Indian cities to get quality interview prep without downloading any app.",
      tags: ["Python", "AWS Lambda", "Gemini API", "WhatsApp API", "DynamoDB"],
      color: "from-purple-500 to-pink-500",
      link: "https://github.com/shashankpandya/Aira",
      live: "https://github.com/shashankpandya/Aira",
      stats: { label: "Languages", value: "Multi" },
      challenge: "Students lack access to quality interview prep. Existing solutions are expensive and complex.",
      impact: "Reducing educational inequality in India through accessible AI-powered learning."
    },
    {
      title: "Empathy Engine",
      subtitle: "Emotion-Aware TTS",
      description: "An AI system that detects emotional sentiment in text and modulates speech parameters to produce expressive, human-like audio output. Deployed on HuggingFace Spaces.",
      tags: ["Python", "HuggingFace", "Flask", "NLP", "gTTS"],
      color: "from-cyan-500 to-blue-500",
      link: "https://github.com/shashankpandya/empathy-engine",
      live: "https://huggingface.co/spaces/shashankpandya/empathy-engine",
      stats: { label: "Emotions", value: "7" },
      challenge: "Flat, robotic TTS lacks emotional resonance and human connection.",
      impact: "Making AI voices feel more natural and emotionally intelligent."
    },
    {
      title: "Crypto Portfolio",
      subtitle: "DeFi Asset Tracker",
      description: "A full-stack decentralized cryptocurrency portfolio tracker with smart contract integration. Features real-time price tracking, wallet connectivity, and serverless cloud deployment.",
      tags: ["React", "Node.js", "Solidity", "MongoDB", "AWS"],
      color: "from-orange-500 to-yellow-500",
      link: "https://github.com/shashankpandya/Crypto_Portfolio",
      live: "https://cryptofolio-web3.netlify.app/",
      stats: { label: "Commits", value: "26+" },
      challenge: "Centralized trackers have single points of failure. Users want self-custody.",
      impact: "Production-ready serverless architecture with 26 commits across full stack."
    },
    {
      title: "LegalRAG",
      subtitle: "Legal Document AI",
      description: "RAG-based system for legal document analysis and retrieval. Built during an internship at PrimeTrade.ai for processing complex legal documents efficiently.",
      tags: ["TypeScript", "LLMs", "Vector DB", "Node.js"],
      color: "from-green-500 to-emerald-500",
      link: "https://github.com/shashankpandya/LegalRAG",
      live: null,
      stats: { label: "Stack", value: "TypeScript" },
      challenge: "Legal documents are complex and require precise context-aware retrieval.",
      impact: "Streamlining legal research with AI-powered document understanding."
    }
  ];

  return (
    <Section id="projects" className="relative py-32 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-mono text-sm tracking-wider">{'// Selected Work'}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
            Projects That <span className="text-cyan-400">Matter</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            From AI-powered interview coaches to emotion-aware speech systems, each project solves a real problem.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.title} className="group relative">
              <div className={`absolute -inset-1 bg-gradient-to-r ${project.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
              
              <div className="relative bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden hover:border-gray-600 transition-colors">
                <div className={`h-20 bg-gradient-to-r ${project.color} p-5 relative`}>
                  <span className="absolute top-3 right-4 px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full text-xs text-white font-mono">
                    {project.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                </div>
                
                <div className="p-6 space-y-4">
                  <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">{'●'}</span>
                      <p className="text-sm text-gray-500">{project.challenge}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">{'●'}</span>
                      <p className="text-sm text-gray-500">{project.impact}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gray-700/50 rounded-full text-xs text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-white">{project.stats.value}</span>
                      <span className="text-gray-500 text-sm">{project.stats.label}</span>
                    </div>
                    <div className="flex gap-3">
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors" title="View Code">
                        <FaGithub className="text-gray-400" />
                      </a>
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors" title="View Live">
                          <FaExternalLinkAlt className="text-gray-400" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <a href="https://github.com/shashankpandya" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 border border-gray-700 rounded-xl text-gray-300 hover:border-cyan-500 hover:text-cyan-400 transition-all group">
            <FaGithub size={20} />
            <span>View All 20+ Projects on GitHub</span>
            <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </Section>
  );
}

// Skills Section
function Skills() {
  const skillCategories = [
    { name: "Frontend", icon: <SiReact className="text-2xl text-blue-400" />, skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { name: "Backend", icon: <SiNodedotjs className="text-2xl text-green-400" />, skills: ["Node.js", "Express", "Python", "Flask", "REST APIs"] },
    { name: "AI/ML", icon: <FaBrain className="text-2xl text-purple-400" />, skills: ["Gemini API", "HuggingFace", "NLP", "Sentiment Analysis", "LLMs"] },
    { name: "Cloud", icon: <SiAmazonaws className="text-2xl text-orange-400" />, skills: ["AWS Lambda", "EC2", "S3", "DynamoDB", "Serverless"] },
    { name: "Database", icon: <SiMongodb className="text-2xl text-green-500" />, skills: ["MongoDB", "MySQL", "DynamoDB", "Redis"] },
    { name: "DevOps", icon: <SiDocker className="text-2xl text-blue-500" />, skills: ["Docker", "GitHub Actions", "Linux", "CI/CD"] }
  ];

  return (
    <Section id="skills" className="relative py-32 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-mono text-sm tracking-wider">{'// Tech Stack'}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
            Tools I <span className="text-purple-400">Work With</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <div key={category.name} className="group p-6 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gray-700/50 flex items-center justify-center">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{category.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-gray-700/50 rounded-lg text-sm text-gray-400">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-2xl border border-amber-500/30">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
              <SiAmazonaws className="text-2xl text-white" />
            </div>
            <div className="text-left">
              <p className="text-white font-bold">AWS Cloud Practitioner</p>
              <p className="text-gray-400 text-sm">Building serverless architectures</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// Contact Section
function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <Section id="contact" className="relative py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-mono text-sm tracking-wider">{'// Get In Touch'}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
            Let&apos;s Build <span className="text-cyan-400">Something</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Have a project in mind, want to collaborate, or just want to say hi? I&apos;d love to hear from you.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-4">
            {[
              { icon: <FaEnvelope />, label: "Email", value: "pandyashashank1@gmail.com", href: "mailto:pandyashashank1@gmail.com" },
              { icon: <FaGithub />, label: "GitHub", value: "github.com/shashankpandya", href: "https://github.com/shashankpandya" },
              { icon: <FaLinkedin />, label: "LinkedIn", value: "linkedin.com/in/shashank-pandya", href: "https://linkedin.com/in/shashank-pandya" },
              { icon: <FaMapMarkerAlt />, label: "Location", value: "IIT Kharagpur, India", href: null },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target={item.href?.startsWith('http') ? '_blank' : undefined}
                rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800 transition-colors ${item.href ? 'hover:border-cyan-500/50' : ''}`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white">
                  {item.icon}
                </div>
                <div>
                  <p className="text-gray-500 text-sm">{item.label}</p>
                  <p className="text-white font-medium">{item.value}</p>
                </div>
              </a>
            ))}
          </div>
          
          <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-cyan-400 font-mono text-sm mb-2 block">Name</label>
                <input type="text" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} placeholder="Your name" required className="w-full p-4 bg-gray-950 border border-gray-800 rounded-xl text-white placeholder:text-gray-600 focus:border-cyan-500 focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-cyan-400 font-mono text-sm mb-2 block">Email</label>
                <input type="email" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} placeholder="your@email.com" required className="w-full p-4 bg-gray-950 border border-gray-800 rounded-xl text-white placeholder:text-gray-600 focus:border-cyan-500 focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-cyan-400 font-mono text-sm mb-2 block">Message</label>
                <textarea value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} placeholder="Tell me about your project..." rows={5} required className="w-full p-4 bg-gray-950 border border-gray-800 rounded-xl text-white placeholder:text-gray-600 focus:border-cyan-500 focus:outline-none transition-colors resize-none" />
              </div>
              <button type="submit" disabled={isSubmitting || submitted} className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${submitted ? 'bg-green-600 text-white' : 'bg-white text-black hover:bg-gray-100'} disabled:opacity-70`}>
                {submitted ? 'Message Sent!' : isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-24 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 Shashank Pandya. Crafted with passion from IIT Kharagpur.
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="https://github.com/shashankpandya" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-400 transition-colors">
              <FaGithub size={20} />
            </a>
            <a href="https://linkedin.com/in/shashank-pandya" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-400 transition-colors">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      <Navigation isScrolled={isScrolled} />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}

export default App;
