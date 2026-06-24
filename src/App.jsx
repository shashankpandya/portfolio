import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Float, MeshTransmissionMaterial, Text3D, Center } from '@react-three/drei';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaServer, FaCloud, FaRobot, FaExternalLinkAlt, FaDownload, FaBars, FaTimes, FaArrowDown, FaChevronRight, FaPlay, FaPause } from 'react-icons/fa';
import { SiReact, SiNodedotjs, SiPython, SiTypescript, SiTailwindcss, SiMongodb, SiSolidity, SiDocker } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

// 3D Model Component
function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={0.5} />;
}

function RotatingCube() {
  const meshRef = useRef();
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#06b6d4" wireframe />
    </mesh>
  );
}

function FloatingShapes() {
  const group = useRef();
  useFrame((state) => {
    group.current.rotation.y = state.clock.elapsedTime * 0.1;
  });
  return (
    <group ref={group}>
      {[...Array(8)].map((_, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[
            Math.sin(i * Math.PI * 0.25) * 3,
            Math.cos(i * Math.PI * 0.25) * 2,
            Math.sin(i * Math.PI * 0.5) * 2
          ]}>
            <octahedronGeometry args={[0.3]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#06b6d4" : "#8b5cf6"} 
              transparent 
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Particle Background
function Particles() {
  const points = useRef();
  const count = 200;
  
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    points.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#06b6d4" transparent opacity={0.6} />
    </points>
  );
}

// Animated Section Wrapper
function Section({ children, id, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`min-h-screen ${className}`}
    >
      {children}
    </motion.section>
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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#hero" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            SP
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-white transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="/CV_Shashank_Pandya.pdf"
              download
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 flex items-center gap-2"
            >
              <FaDownload className="text-sm" />
              Resume
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors py-2"
                  >
                    {item.name}
                  </a>
                ))}
                <a
                  href="/CV_Shashank_Pandya.pdf"
                  download
                  className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white font-semibold text-center flex items-center justify-center gap-2"
                >
                  <FaDownload className="text-sm" />
                  Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

// Hero Section with 3D
function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  return (
    <Section id="hero" className="relative flex items-center justify-center overflow-hidden">
      {/* Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <FloatingShapes />
            <Particles />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 z-10" />
      
      {/* Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-20 max-w-7xl mx-auto px-6 py-32 flex flex-col lg:flex-row items-center gap-12"
      >
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">Available for opportunities</span>
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6"
          >
            <span className="text-white">Hi, I'm </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Shashank
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0"
          >
            B.Tech Student at <span className="text-cyan-400">IIT Kharagpur</span> building 
            <span className="text-purple-400"> AI-powered solutions</span> that make a real impact.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <a
              href="#projects"
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/25"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-white/20 rounded-xl text-white font-semibold hover:bg-white/5 transition-all duration-300"
            >
              Get In Touch
            </a>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start"
          >
            <div className="text-center">
              <p className="text-4xl font-bold text-white">20+</p>
              <p className="text-gray-500 text-sm">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">4+</p>
              <p className="text-gray-500 text-sm">Years Coding</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">6</p>
              <p className="text-gray-500 text-sm">Technologies</p>
            </div>
          </motion.div>
        </div>
        
        {/* 3D Model Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1 relative w-full h-[400px] lg:h-[500px]"
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <pointLight position={[-5, -5, -5]} intensity={0.5} color="#06b6d4" />
              <RotatingCube />
              <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                autoRotate={isPlaying}
                autoRotateSpeed={2}
              />
            </Suspense>
          </Canvas>
          
          {/* Model Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors"
            >
              {isPlaying ? <FaPause className="text-white" /> : <FaPlay className="text-white" />}
            </button>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <a href="#about" className="flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors">
          <span className="text-xs tracking-widest">SCROLL</span>
          <FaArrowDown className="animate-bounce" />
        </a>
      </motion.div>
    </Section>
  );
}

// About Section
function About() {
  return (
    <Section id="about" className="relative py-32 bg-gradient-to-b from-black to-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center mb-16">
          <span className="text-cyan-400 font-mono tracking-wider">// About Me</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4">
            The Story Behind the <span className="text-purple-400">Code</span>
          </h2>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              Currently pursuing my <span className="text-cyan-400 font-semibold">B.Tech at IIT Kharagpur</span>, 
              I've spent the last 4+ years diving deep into software development, AI/ML, and cloud computing.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              My passion lies at the intersection of <span className="text-purple-400">generative AI</span> and 
              <span className="text-blue-400"> scalable systems</span>. I believe technology should 
              <span className="text-cyan-400"> solve real problems</span> — like making quality education 
              accessible to students in Tier-2/3 cities through WhatsApp.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              When I'm not coding, you'll find me on the basketball court or exploring new technologies. 
              I strongly believe in <span className="text-purple-400">collaboration over competition</span> — 
              the best solutions come from diverse perspectives working together.
            </p>
            
            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: <FaCode />, title: "Full-Stack Dev", desc: "React to AWS Lambda" },
                { icon: <FaRobot />, title: "AI/ML Engineer", desc: "LLMs & NLP" },
                { icon: <FaCloud />, title: "Cloud Native", desc: "AWS Certified" },
                { icon: <FaServer />, title: "Backend Systems", desc: "Scalable APIs" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors"
                >
                  <div className="text-cyan-400 mb-2">{item.icon}</div>
                  <h4 className="text-white font-semibold">{item.title}</h4>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent" />
            
            {[
              { year: "2021", title: "IIT Kharagpur", desc: "Started B.Tech journey" },
              { year: "2022", title: "First Production App", desc: "Built and deployed my first React app" },
              { year: "2023", title: "AWS Certification", desc: "Became AWS Cloud Practitioner" },
              { year: "2024", title: "AI/ML Focus", desc: "Deep dive into LLMs and GenAI" },
              { year: "Now", title: "Building Impactful Tools", desc: "Aira & Empathy Engine live" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative pl-8 pb-8 last:pb-0"
              >
                <div className="absolute left-0 top-1 w-4 h-4 -translate-x-[6px] rounded-full bg-cyan-500 border-4 border-black" />
                <span className="text-cyan-400 font-mono text-sm">{item.year}</span>
                <h4 className="text-white font-semibold mt-1">{item.title}</h4>
                <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
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
      stats: { label: "Commits", value: "26" },
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
    <Section id="projects" className="relative py-32 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center mb-16">
          <span className="text-cyan-400 font-mono tracking-wider">// Selected Work</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4">
            Projects That <span className="text-cyan-400">Matter</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            From AI-powered interview coaches to emotion-aware speech systems, each project solves a real problem.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${project.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              
              {/* Card */}
              <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className={`h-32 bg-gradient-to-r ${project.color} p-6 relative`}>
                  <span className="absolute top-4 right-4 px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full text-xs text-white font-mono">
                    {project.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                </div>
                
                {/* Content */}
                <div className="p-6 space-y-4">
                  <p className="text-gray-400">{project.description}</p>
                  
                  {/* Challenge & Impact */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">●</span>
                      <p className="text-sm text-gray-500">{project.challenge}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">●</span>
                      <p className="text-sm text-gray-500">{project.impact}</p>
                    </div>
                  </div>
                  
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Stats & Links */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-white">{project.stats.value}</span>
                      <span className="text-gray-500 text-sm">{project.stats.label}</span>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                        title="View Code"
                      >
                        <FaGithub className="text-gray-400" />
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                          title="View Live"
                        >
                          <FaExternalLinkAlt className="text-gray-400" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/shashankpandya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border border-gray-700 rounded-xl text-gray-300 hover:border-cyan-500 hover:text-cyan-400 transition-all group"
          >
            <FaGithub className="text-xl" />
            <span>View All 20+ Projects on GitHub</span>
            <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </Section>
  );
}

// Skills Section
function Skills() {
  const skillCategories = [
    {
      name: "Frontend",
      icon: <SiReact className="text-2xl" />,
      color: "from-blue-500 to-cyan-500",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"]
    },
    {
      name: "Backend",
      icon: <SiNodedotjs className="text-2xl" />,
      color: "from-green-500 to-emerald-500",
      skills: ["Node.js", "Express", "Python", "Flask", "REST APIs", "GraphQL"]
    },
    {
      name: "AI/ML",
      icon: <FaRobot className="text-2xl" />,
      color: "from-purple-500 to-pink-500",
      skills: ["Gemini API", "HuggingFace", "NLP", "Sentiment Analysis", "LLMs"]
    },
    {
      name: "Cloud",
      icon: <FaAws className="text-2xl" />,
      color: "from-orange-500 to-amber-500",
      skills: ["AWS Lambda", "EC2", "S3", "DynamoDB", "Serverless"]
    },
    {
      name: "Database",
      icon: <SiMongodb className="text-2xl" />,
      color: "from-green-600 to-green-400",
      skills: ["MongoDB", "MySQL", "DynamoDB", "Redis"]
    },
    {
      name: "DevOps",
      icon: <SiDocker className="text-2xl" />,
      color: "from-blue-600 to-blue-400",
      skills: ["Docker", "GitHub Actions", "Linux", "CI/CD"]
    }
  ];

  return (
    <Section id="skills" className="relative py-32 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center mb-16">
          <span className="text-cyan-400 font-mono tracking-wider">// Tech Stack</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4">
            Tools I <span className="text-purple-400">Work With</span>
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-transparent transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{category.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-gray-800/50 rounded-lg text-sm text-gray-400 group-hover:bg-gray-700/50 group-hover:text-gray-300 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* AWS Certification */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-2xl border border-amber-500/30">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
              <FaAws className="text-2xl text-white" />
            </div>
            <div className="text-left">
              <p className="text-white font-bold">AWS Cloud Practitioner</p>
              <p className="text-gray-400 text-sm">Building serverless architectures</p>
            </div>
          </div>
        </motion.div>
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
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <Section id="contact" className="relative py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center mb-16">
          <span className="text-cyan-400 font-mono tracking-wider">// Get In Touch</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4">
            Let's Build <span className="text-cyan-400">Something</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Have a project in mind, want to collaborate, or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              {[
                { icon: <FaEnvelope />, label: "Email", value: "pandyashashank1@gmail.com", href: "mailto:pandyashashank1@gmail.com" },
                { icon: <FaGithub />, label: "GitHub", value: "github.com/shashankpandya", href: "https://github.com/shashankpandya" },
                { icon: <FaLinkedin />, label: "LinkedIn", value: "linkedin.com/in/shashank-pandya", href: "https://linkedin.com/in/shashank-pandya" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-cyan-500/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">{item.label}</p>
                    <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-2xl bg-gray-900/50 border border-gray-800"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-cyan-400 font-mono text-sm mb-2 block">Name</label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className="w-full p-4 bg-gray-950 border border-gray-700 rounded-xl text-white placeholder:text-gray-600 focus:border-cyan-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-cyan-400 font-mono text-sm mb-2 block">Email</label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  className="w-full p-4 bg-gray-950 border border-gray-700 rounded-xl text-white placeholder:text-gray-600 focus:border-cyan-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-cyan-400 font-mono text-sm mb-2 block">Message</label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                  className="w-full p-4 bg-gray-950 border border-gray-700 rounded-xl text-white placeholder:text-gray-600 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                  submitted
                    ? 'bg-green-600 text-white'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500'
                } disabled:opacity-70`}
              >
                {submitted ? 'Message Sent!' : isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
        
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <p className="text-gray-500 text-sm">
            © 2024 Shashank Pandya. Crafted with passion from IIT Kharagpur.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <a href="https://github.com/shashankpandya" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-400 transition-colors">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/shashank-pandya" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-400 transition-colors">
              <FaLinkedin />
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// Main App
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
