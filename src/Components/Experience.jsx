import React, { useEffect, useRef, useState } from "react";

const skillCategories = [
  {
    name: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML", "CSS"],
    color: "from-blue-500 to-cyan-500",
    icon: "🎨"
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express", "Python", "REST APIs", "MongoDB", "MySQL"],
    color: "from-green-500 to-emerald-500",
    icon: "⚙️"
  },
  {
    name: "Cloud & DevOps",
    skills: ["AWS Lambda", "Docker", "GitHub Actions", "Linux", "Serverless"],
    color: "from-orange-500 to-amber-500",
    icon: "☁️"
  },
  {
    name: "AI & Data",
    skills: ["Gemini API", "HuggingFace", "Amazon Polly", "Transcribe", "DynamoDB"],
    color: "from-purple-500 to-pink-500",
    icon: "🤖"
  },
  {
    name: "Blockchain",
    skills: ["Solidity", "Smart Contracts", "Web3", "Hardhat", "Ethereum"],
    color: "from-indigo-500 to-violet-500",
    icon: "⛓️"
  }
];

const SkillConstellation = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  
  return (
    <div className="relative w-full h-80 flex items-center justify-center">
      {/* Central Node */}
      <div className="absolute center-node w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.5)] animate-pulse-slow">
        <span className="text-2xl">🚀</span>
      </div>
      
      {/* Category Nodes */}
      {skillCategories.map((category, index) => {
        const angle = (index * 360) / skillCategories.length - 90;
        const radius = 140;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;
        
        return (
          <div
            key={category.name}
            className={`absolute cursor-pointer transition-all duration-500 ${
              activeCategory === category.name ? 'scale-125' : 'hover:scale-110'
            }`}
            style={{ 
              transform: `translate(${x}px, ${y}px)`,
              left: '50%',
              top: '50%',
              marginLeft: '-50px',
              marginTop: '-50px'
            }}
            onMouseEnter={() => setActiveCategory(category.name)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center shadow-lg`}>
              <span className="text-2xl">{category.icon}</span>
            </div>
            <p className="absolute top-full mt-2 text-center text-sm font-semibold text-gray-300 whitespace-nowrap">
              {category.name}
            </p>
            
            {/* Connection Line */}
            <div 
              className="absolute w-px h-24 bg-gradient-to-b from-gray-700 to-gray-500 origin-top"
              style={{
                left: '50%',
                bottom: '100%',
                transform: `translateX(-50%) rotate(${angle + 90}deg)`,
                transformOrigin: 'bottom center'
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("skills");
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
      name="experience" 
      className="relative py-32 w-full bg-gradient-to-b from-gray-950 via-black to-gray-900"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(6,182,212,0.5) 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-cyan-400 font-mono text-sm tracking-widest mb-4">&lt;Skills /&gt;</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Tech <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Stack</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Technologies I work with to bring ideas to life
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mt-6" />
        </div>

        {/* Tab Navigation */}
        <div className={`flex justify-center gap-4 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button
            onClick={() => setActiveTab("skills")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "skills"
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                : 'bg-gray-800/50 text-gray-400 hover:text-white border border-gray-700'
            }`}
          >
            Skill Grid
          </button>
          <button
            onClick={() => setActiveTab("constellation")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "constellation"
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                : 'bg-gray-800/50 text-gray-400 hover:text-white border border-gray-700'
            }`}
          >
            Constellation View
          </button>
        </div>

        {/* Skill Grid View */}
        <div className={`transition-all duration-700 ${activeTab === "skills" ? 'opacity-100' : 'opacity-0 hidden'} `}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div
                key={category.name}
                className={`p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all duration-500 group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {category.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill}
                      className={`px-4 py-2 bg-gradient-to-r ${category.color} bg-opacity-20 rounded-full text-sm font-medium text-gray-300 border border-gray-700 hover:border-gray-600 transition-colors cursor-default`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Constellation View */}
        <div className={`transition-all duration-700 ${activeTab === "constellation" ? 'opacity-100' : 'opacity-0 hidden'}`}>
          <div className="bg-gray-900/30 rounded-3xl border border-gray-800 p-12">
            <SkillConstellation />
            <p className="text-center text-gray-500 mt-8">Hover over the nodes to explore my skill categories</p>
          </div>
        </div>

        {/* Certification Badge */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🏆</span>
            </div>
            <div className="text-left">
              <p className="text-white font-bold">AWS Cloud Practitioner</p>
              <p className="text-gray-500 text-sm">Building serverless architectures</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
