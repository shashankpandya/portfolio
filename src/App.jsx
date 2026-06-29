import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaExternalLinkAlt, FaDownload, 
  FaBars, FaTimes, FaCode, FaServer, FaCloud, FaRobot, 
  FaMapMarkerAlt, FaGraduationCap, FaAward, FaBrain,
  FaSun, FaMoon, FaCheck, FaArrowRight, FaChevronDown,
  FaPython, FaJsSquare, FaJava, FaReact, FaNodeJs,
  FaDocker, FaGitAlt, FaDatabase, FaLinux, FaMicrochip,
  FaRocket, FaUniversalAccess, FaEye
} from 'react-icons/fa';
import { 
  SiTensorflow, SiPytorch, SiMongodb, SiPostgresql, SiRedis, 
  SiGraphql, SiAmazonaws, SiKubernetes,
  SiNextdotjs, SiTailwindcss, SiFigma, SiOpenai,
  SiScikitlearn, SiKeras,
  SiFastapi, SiSqlite,
  SiCplusplus
} from 'react-icons/si';

// Theme Context
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme: () => setIsDark(!isDark) }}>
      {children}
    </ThemeContext.Provider>
  );
}

const useTheme = () => useContext(ThemeContext);

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
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
}

// Counter Animation
function AnimatedCounter({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView(0.5);

  useEffect(() => {
    if (!isInView) return;
    
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Animated Section
function Section({ children, id, className = '', delay = 0 }) {
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

// Navigation Component
function Navigation({ isScrolled }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  
  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg dark:shadow-black/20 border-b border-gray-200 dark:border-gray-800' 
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2 group"
            aria-label="Shashank Pandya - Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300 group-hover:scale-105">
              SP
            </div>
            <span className="hidden sm:block text-lg font-bold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              Shashank Pandya
            </span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
          
          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </button>
            
            {/* Resume Button */}
            <a
              href="/CV_Shashank_Pandya.pdf"
              download="Shashank_Pandya_Resume.pdf"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
            >
              <FaDownload className="w-4 h-4" />
              Resume
            </a>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-1 border-t border-gray-200 dark:border-gray-800">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {item.name}
              </a>
            ))}
            <a
              href="/CV_Shashank_Pandya.pdf"
              download="Shashank_Pandya_Resume.pdf"
              className="flex items-center justify-center gap-2 mx-4 mt-4 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg"
            >
              <FaDownload className="w-4 h-4" />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function Hero() {
  const [ref, isInView] = useInView(0.1);
  
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-black"
      aria-label="Introduction"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>
      
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Status Badge */}
            <div 
              className="mb-6 transition-all duration-700"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '100ms' }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-sm text-green-700 dark:text-green-400 font-medium">Available for opportunities</span>
              </span>
            </div>
            
            {/* Main Heading */}
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-700"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(30px)', transitionDelay: '200ms' }}
            >
              <span className="text-gray-900 dark:text-white">Hi, I'm </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Shashank Pandya
              </span>
            </h1>
            
            {/* Subtitle */}
            <p 
              className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 transition-all duration-700"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(30px)', transitionDelay: '300ms' }}
            >
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">B.Tech Student at IIT Kharagpur</span> passionate about building 
              <span className="text-purple-600 dark:text-purple-400"> AI-powered solutions</span> and 
              <span className="text-blue-600 dark:text-blue-400"> scalable web applications</span>.
            </p>
            
            {/* CTA Buttons */}
            <div 
              className="flex flex-wrap gap-4 justify-center lg:justify-start transition-all duration-700"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(30px)', transitionDelay: '400ms' }}
            >
              <a 
                href="#projects" 
                onClick={(e) => { e.preventDefault(); document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' }); }}
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-1 flex items-center gap-2"
              >
                View My Work
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#contact" 
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }); }}
                className="group px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
              >
                Get In Touch
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            
            {/* Stats */}
            <div 
              className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start transition-all duration-700"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(30px)', transitionDelay: '500ms' }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white"><AnimatedCounter end={10} suffix="+" /></div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white"><AnimatedCounter end={5} /></div>
                <div className="text-sm text-gray-500 dark:text-gray-400">AI/ML Models</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white"><AnimatedCounter end={3} /></div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Certifications</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image / Visual */}
          <div 
            className="flex-1 transition-all duration-700"
            style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateX(0)' : 'translateX(50px)', transitionDelay: '300ms' }}
          >
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-cyan-400/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-purple-400/30 rounded-full blur-2xl" />
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-gray-900 to-black dark:bg-white rounded-3xl p-8 shadow-2xl">
                {/* Code Preview */}
                <div className="bg-gray-900 rounded-2xl p-6 font-mono text-sm overflow-hidden">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-gray-500 text-xs">ai_assistant.py</span>
                  </div>
                  <pre className="text-gray-300 overflow-x-auto">
{`import tensorflow as tf
from transformers import GPT2

class AIAssistant:
    def __init__(self):
        self.model = GPT2.from_pretrained(
            'gpt2-medium'
        )
    
    def generate(self, prompt):
        return self.model.complete(
            prompt,
            max_length=256
        )`}
                  </pre>
                </div>
                
                {/* Floating Tags */}
                <div className="absolute -top-4 -left-4 px-3 py-1.5 bg-cyan-500 text-white text-xs font-semibold rounded-lg shadow-lg animate-bounce">
                  AI/ML
                </div>
                <div className="absolute -top-4 -right-4 px-3 py-1.5 bg-purple-500 text-white text-xs font-semibold rounded-lg shadow-lg" style={{ animation: 'bounce 2s infinite 0.5s' }}>
                  Full-Stack
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-lg">
                  Cloud Native
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a 
            href="#about" 
            onClick={(e) => { e.preventDefault(); document.querySelector('#about').scrollIntoView({ behavior: 'smooth' }); }}
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-cyan-500 transition-colors"
            aria-label="Scroll to About section"
          >
            <span className="text-xs font-medium">Scroll</span>
            <FaChevronDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

// About Section
function About() {
  const timeline = [
    {
      year: '2022 - Present',
      title: 'IIT Kharagpur',
      subtitle: 'B.Tech in Computer Science',
      description: 'Pursuing undergraduate degree with focus on AI/ML and full-stack development.',
      icon: <FaGraduationCap />,
    },
    {
      year: '2024',
      title: 'AWS Cloud Practitioner',
      subtitle: 'Amazon Web Services',
      description: 'Certified in cloud computing fundamentals and AWS services.',
      icon: <FaAward />,
    },
    {
      year: '2023',
      title: 'Machine Learning Specialization',
      subtitle: 'DeepLearning.AI',
      description: 'Completed comprehensive ML and deep learning program.',
      icon: <FaBrain />,
    },
    {
      year: '2023',
      title: 'Full-Stack Development',
      subtitle: 'React & Node.js',
      description: 'Built production-ready web applications with modern stack.',
      icon: <FaCode />,
    },
  ];

  const highlights = [
    { icon: <FaCode />, text: 'Full-Stack Development' },
    { icon: <FaRobot />, text: 'AI & Machine Learning' },
    { icon: <FaCloud />, text: 'Cloud Architecture' },
    { icon: <FaDatabase />, text: 'Data Engineering' },
  ];

  return (
    <Section id="about" className="py-24 lg:py-32 bg-white dark:bg-gray-900" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-sm font-semibold rounded-full mb-4">
            About Me
          </span>
          <h2 id="about-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            The Person <span className="text-cyan-500">Behind the Code</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A passionate developer at the intersection of artificial intelligence and scalable web solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Bio */}
          <div className="space-y-8">
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm <strong className="text-gray-900 dark:text-white">Shashank Pandya</strong>, a final year B.Tech student at 
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold"> IIT Kharagpur</span>, specializing in 
                <span className="text-purple-600 dark:text-purple-400 font-semibold"> Artificial Intelligence</span> and 
                <span className="text-blue-600 dark:text-blue-400 font-semibold"> Full-Stack Development</span>.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                My journey in tech began with a fascination for how machines can learn and adapt. Today, I build 
                AI-powered applications that solve real-world problems, from intelligent chatbots to predictive systems.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me exploring new ML papers, contributing to open source, or 
                mentoring fellow students in their programming journey.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/CV_Shashank_Pandya.pdf"
                download="Shashank_Pandya_Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/20"
              >
                <FaDownload className="w-5 h-5" />
                Download CV
              </a>
              <a
                href="https://github.com/shashankpandya"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-300"
              >
                <FaGithub className="w-5 h-5" />
                GitHub Profile
              </a>
            </div>
          </div>

          {/* Right Column - Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500" />

            {/* Timeline Items */}
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className="relative pl-20">
                  {/* Icon */}
                  <div className="absolute left-4 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-lg">
                    {item.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-cyan-200 dark:hover:border-cyan-700 transition-colors">
                    <span className="text-xs font-semibold text-cyan-500 uppercase tracking-wider">{item.year}</span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">{item.title}</h3>
                    <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">{item.subtitle}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
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
      title: 'AI-Powered Code Review System',
      tagline: 'ML-based code analysis and improvement suggestions',
      category: 'AI/ML',
      categoryColor: 'from-purple-500 to-pink-500',
      description: 'An intelligent system that analyzes code quality, identifies bugs, and suggests optimizations using machine learning.',
      role: 'Lead Developer & ML Engineer',
      technologies: ['Python', 'TensorFlow', 'FastAPI', 'React', 'Docker', 'AWS'],
      outcomes: [
        'Reduced code review time by 60%',
        'Achieved 92% accuracy in bug detection',
        'Deployed on AWS with auto-scaling'
      ],
      github: 'https://github.com/shashankpandya',
      demo: null,
      featured: true,
      gradient: 'from-purple-600 via-pink-500 to-rose-500',
    },
    {
      title: 'E-Commerce Platform',
      tagline: 'Full-stack marketplace with microservices',
      category: 'Full-Stack',
      categoryColor: 'from-cyan-500 to-blue-500',
      description: 'A scalable e-commerce platform built with microservices architecture, featuring real-time inventory and payment processing.',
      role: 'Full-Stack Developer',
      technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'Docker', 'Kubernetes'],
      outcomes: [
        'Handles 10,000+ concurrent users',
        '99.9% uptime achieved',
        'Sub-100ms average response time'
      ],
      github: 'https://github.com/shashankpandya',
      demo: null,
      featured: true,
      gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    },
    {
      title: 'Predictive Analytics Dashboard',
      tagline: 'Real-time business intelligence platform',
      category: 'Data Science',
      categoryColor: 'from-amber-500 to-orange-500',
      description: 'Interactive dashboard for visualizing business metrics and predicting trends using time-series forecasting.',
      role: 'Data Scientist & Frontend Developer',
      technologies: ['Python', 'Pandas', 'Plotly', 'React', 'PostgreSQL', 'TensorFlow'],
      outcomes: [
        '95% forecast accuracy',
        'Used by 50+ businesses',
        'Real-time data processing'
      ],
      github: 'https://github.com/shashankpandya',
      demo: null,
      featured: true,
      gradient: 'from-amber-500 via-orange-500 to-red-500',
    },
    {
      title: 'NLP Chatbot Framework',
      tagline: 'Conversational AI for customer support',
      category: 'AI/ML',
      categoryColor: 'from-emerald-500 to-teal-500',
      description: 'A customizable chatbot framework supporting multiple languages and integration with various platforms.',
      role: 'ML Engineer',
      technologies: ['Python', 'PyTorch', 'BERT', 'FastAPI', 'WebSocket', 'Redis'],
      outcomes: [
        'Supports 15+ languages',
        '85% customer satisfaction rate',
        'Processes 1M+ messages daily'
      ],
      github: 'https://github.com/shashankpandya',
      demo: null,
      featured: false,
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    },
  ];

  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedProject, setExpandedProject] = useState(null);

  const filters = ['All', 'AI/ML', 'Full-Stack', 'Data Science'];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <Section id="projects" className="py-24 lg:py-32 bg-gray-50 dark:bg-black" aria-labelledby="projects-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 text-sm font-semibold rounded-full mb-4">
            My Work
          </span>
          <h2 id="projects-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured <span className="text-purple-500">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A selection of my recent work showcasing skills in AI, full-stack development, and cloud architecture.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, i) => (
            <article
              key={i}
              className={`group relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                expandedProject === i ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              {/* Project Header with Gradient */}
              <div className={`relative h-48 bg-gradient-to-br ${project.gradient} p-8 flex flex-col justify-end`}>
                <span className={`inline-block self-start px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white mb-3`}>
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                <p className="text-white/80 text-sm mt-1">{project.tagline}</p>
                
                {/* Floating Action Buttons */}
                <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <FaGithub className="w-5 h-5" />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                      aria-label={`View ${project.title} live demo`}
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Expandable Details */}
                <div className={`overflow-hidden transition-all duration-300 ${expandedProject === i ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-4">
                    {/* Role */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Role</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{project.role}</p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, j) => (
                          <span key={j} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-md">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Outcomes */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Key Outcomes</h4>
                      <ul className="space-y-1">
                        {project.outcomes.map((outcome, k) => (
                          <li key={k} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <FaCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Expand Button */}
                <button
                  onClick={() => setExpandedProject(expandedProject === i ? null : i)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  {expandedProject === i ? (
                    <>Show Less <FaChevronDown className="w-4 h-4 rotate-180" /></>
                  ) : (
                    <>View Details <FaChevronDown className="w-4 h-4" /></>
                  )}
                </button>
              </div>

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                    <FaRocket className="w-3 h-3" /> Featured
                  </span>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/shashankpandya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            View All Projects on GitHub
            <FaExternalLinkAlt className="w-4 h-4" />
          </a>
        </div>
      </div>
    </Section>
  );
}

// Skills Section
function Skills() {
  const skillCategories = [
    {
      name: 'AI & Machine Learning',
      icon: <FaRobot className="text-xl" />,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'TensorFlow', icon: <SiTensorflow /> },
        { name: 'PyTorch', icon: <SiPytorch /> },
        { name: 'scikit-learn', icon: <SiScikitlearn /> },
        { name: 'Keras', icon: <SiKeras /> },
        { name: 'NLP', icon: <FaBrain /> },
        { name: 'Computer Vision', icon: <FaEye /> },
        { name: 'OpenAI', icon: <SiOpenai /> },
        { name: 'LLMs', icon: null },
      ],
    },
    {
      name: 'Frontend Development',
      icon: <FaCode className="text-xl" />,
      color: 'from-cyan-500 to-blue-500',
      skills: [
        { name: 'React', icon: <FaReact /> },
        { name: 'Next.js', icon: <SiNextdotjs /> },
        { name: 'TypeScript', icon: null },
        { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
        { name: 'HTML/CSS', icon: null },
        { name: 'Figma', icon: <SiFigma /> },
      ],
    },
    {
      name: 'Backend & APIs',
      icon: <FaServer className="text-xl" />,
      color: 'from-blue-500 to-indigo-500',
      skills: [
        { name: 'Node.js', icon: <FaNodeJs /> },
        { name: 'Python', icon: <FaPython /> },
        { name: 'FastAPI', icon: <SiFastapi /> },
        { name: 'GraphQL', icon: <SiGraphql /> },
        { name: 'REST APIs', icon: null },
        { name: 'WebSocket', icon: null },
      ],
    },
    {
      name: 'Databases',
      icon: <FaDatabase className="text-xl" />,
      color: 'from-emerald-500 to-teal-500',
      skills: [
        { name: 'MongoDB', icon: <SiMongodb /> },
        { name: 'PostgreSQL', icon: <SiPostgresql /> },
        { name: 'Redis', icon: <SiRedis /> },
        { name: 'SQLite', icon: <SiSqlite /> },
      ],
    },
    {
      name: 'Cloud & DevOps',
      icon: <FaCloud className="text-xl" />,
      color: 'from-amber-500 to-orange-500',
      skills: [
        { name: 'AWS', icon: <SiAmazonaws /> },
        { name: 'Docker', icon: <FaDocker /> },
        { name: 'Kubernetes', icon: <SiKubernetes /> },
        { name: 'Git', icon: <FaGitAlt /> },
        { name: 'CI/CD', icon: null },
        { name: 'Linux', icon: <FaLinux /> },
      ],
    },
    {
      name: 'Programming Languages',
      icon: <FaMicrochip className="text-xl" />,
      color: 'from-rose-500 to-red-500',
      skills: [
        { name: 'Python', icon: <FaPython /> },
        { name: 'JavaScript', icon: <FaJsSquare /> },
        { name: 'C++', icon: <SiCplusplus /> },
        { name: 'Java', icon: <FaJava /> },
      ],
    },
  ];

  return (
    <Section id="skills" className="py-24 lg:py-32 bg-white dark:bg-gray-900" aria-labelledby="skills-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-sm font-semibold rounded-full mb-4">
            My Expertise
          </span>
          <h2 id="skills-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & <span className="text-cyan-500">Technologies</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit built through years of hands-on experience with modern technologies.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-5">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{category.name}</h3>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-4 gap-3">
                {category.skills.map((skill, j) => (
                  <div
                    key={j}
                    className="group/skill relative flex flex-col items-center gap-1.5 p-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 hover:border-cyan-300 dark:hover:border-cyan-600 transition-all duration-200 cursor-default"
                  >
                    {skill.icon ? (
                      <span className="text-xl text-gray-600 dark:text-gray-400 group-hover/skill:text-cyan-500 transition-colors">
                        {skill.icon}
                      </span>
                    ) : (
                      <div className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-700" />
                    )}
                    <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 text-center leading-tight">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8">Certifications & Achievements</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'AWS Cloud Practitioner', provider: 'Amazon Web Services', icon: <SiAmazonaws className="text-2xl" /> },
              { name: 'Machine Learning Specialization', provider: 'DeepLearning.AI', icon: <FaBrain className="text-2xl" /> },
              { name: 'TensorFlow Developer', provider: 'Google', icon: <SiTensorflow className="text-2xl" /> },
            ].map((cert, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 rounded-2xl border border-amber-200 dark:border-amber-500/20"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white">
                  {cert.icon}
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900 dark:text-white">{cert.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{cert.provider}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// Contact Section
function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formState.name.trim()) newErrors.name = 'Name is required';
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formState.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    { 
      icon: <FaEnvelope className="w-6 h-6" />, 
      label: 'Email', 
      value: 'pandyashashank1@gmail.com', 
      href: 'mailto:pandyashashank1@gmail.com',
      gradient: 'from-cyan-500 to-blue-500'
    },
    { 
      icon: <FaGithub className="w-6 h-6" />, 
      label: 'GitHub', 
      value: 'github.com/shashankpandya', 
      href: 'https://github.com/shashankpandya',
      gradient: 'from-gray-600 to-gray-800'
    },
    { 
      icon: <FaLinkedin className="w-6 h-6" />, 
      label: 'LinkedIn', 
      value: 'linkedin.com/in/shashank-pandya', 
      href: 'https://linkedin.com/in/shashank-pandya',
      gradient: 'from-blue-500 to-blue-700'
    },
    { 
      icon: <FaMapMarkerAlt className="w-6 h-6" />, 
      label: 'Location', 
      value: 'IIT Kharagpur, West Bengal, India', 
      href: null,
      gradient: 'from-rose-500 to-red-500'
    },
  ];

  return (
    <Section id="contact" className="py-24 lg:py-32 bg-gray-50 dark:bg-black" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 text-sm font-semibold rounded-full mb-4">
            Get In Touch
          </span>
          <h2 id="contact-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Let's <span className="text-green-500">Connect</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind, want to collaborate, or just want to say hello? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((item, i) => (
              <a
                key={i}
                href={item.href}
                target={item.href?.startsWith('http') ? '_blank' : undefined}
                rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 transition-all duration-300 ${
                  item.href 
                    ? 'hover:border-cyan-300 dark:hover:border-cyan-600 hover:shadow-lg hover:-translate-x-1 group' 
                    : ''
                }`}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                  <p className={`font-medium text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors ${!item.href ? 'cursor-default' : ''}`}>
                    {item.value}
                  </p>
                </div>
              </a>
            ))}

            {/* Availability Note */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-500/10 dark:to-emerald-500/10 border border-green-200 dark:border-green-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative">
                  <span className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75" />
                </div>
                <span className="font-semibold text-green-700 dark:text-green-400">Currently Available</span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-500">
                I'm open to new opportunities, internships, and collaborations. Response within 24 hours.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center mb-6">
                  <FaCheck className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-gray-600 dark:text-gray-400">Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Your name"
                      required
                      className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border ${
                        errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                      } text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all`}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && <p id="name-error" className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                      className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border ${
                        errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                      } text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all`}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && <p id="email-error" className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project, idea, or just say hello..."
                    rows={6}
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border ${
                      errors.message ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                    } text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all resize-none`}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && <p id="message-error" className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FaArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

// Footer Component
function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'GitHub', icon: <FaGithub className="w-5 h-5" />, href: 'https://github.com/shashankpandya' },
    { name: 'LinkedIn', icon: <FaLinkedin className="w-5 h-5" />, href: 'https://linkedin.com/in/shashank-pandya' },
    { name: 'Email', icon: <FaEnvelope className="w-5 h-5" />, href: 'mailto:pandyashashank1@gmail.com' },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
              SP
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white">Shashank Pandya</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Full-Stack & AI Engineer</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-cyan-100 dark:hover:bg-cyan-500/20 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} Shashank Pandya. Crafted with passion.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Accessibility Statement Component
function AccessibilityStatement() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-40"
        aria-label="View accessibility information"
      >
        <FaUniversalAccess className="w-5 h-5" />
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="accessibility-title"
        >
          <div 
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="accessibility-title" className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Accessibility Features
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>This portfolio includes the following accessibility features:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Keyboard navigation support</li>
                <li>Screen reader compatible</li>
                <li>High contrast mode support</li>
                <li>Reduced motion preference respected</li>
                <li>Semantic HTML structure</li>
                <li>Focus indicators for interactive elements</li>
              </ul>
              <p className="text-sm">
                To reduce motion: Go to your device's accessibility settings and enable "Reduce Motion."
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Main App Component
function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <ThemeProvider>
      <div className={`${prefersReducedMotion ? '' : 'smooth-scroll'}`}>
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-white focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>

        <Navigation isScrolled={isScrolled} />
        
        <main id="main-content">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        
        <Footer />
        <AccessibilityStatement />
      </div>
    </ThemeProvider>
  );
}

export default App;
