import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import SectionHeader from "./SectionHeader";
import { useReveal } from "../hooks/useReveal";

const GH = (repo) => `https://github.com/shashankpandya/${repo}`;

const categories = [
  {
    id: "ai",
    name: "AI / ML",
    color: "role-ai",
    blurb: "Agents, retrieval systems and models that reason over real data.",
    projects: [
      {
        name: "Aira",
        tagline: "AI Multilingual Interview Coach",
        desc: "Voice-first interview coach built for the AI for Bharat Hackathon (AWS) — real-time RAG evaluation of candidate answers, an automated resume scan, a live confidence meter, and Hinglish code-switching recognition for bilingual candidates.",
        tech: ["RAG", "Agentic Workflows", "AWS Lambda", "Hinglish NLP"],
        img: "/projects/Aira.png",
        code: GH("Aira"),
        featured: true,
      },
      {
        name: "GeoAlert",
        tagline: "Live Global Hazard Dashboard",
        desc: "A 3D-globe dashboard tracking earthquakes, wildfires, storms and floods in real time, with AI-generated compound-risk analysis, proximity alerts and a live weather and space-weather feed.",
        tech: ["Three.js", "Real-time Data", "AI Risk Analysis"],
        img: "/projects/GeoAlert.png",
        code: GH("GeoAlert"),
        demo: "https://geoalert-natural-events-hub.vercel.app/",
      },
      {
        name: "LegalRAG",
        tagline: "Compliance Assistant for Indian Startups",
        desc: "A RAG-based assistant that answers startup compliance questions with citations pulled from official legal documents — document upload for a private knowledge base and per-company compliance checklists.",
        tech: ["RAG", "LLMs", "Document Ingestion"],
        img: "/projects/LegalRAG.png",
        code: GH("LegalRAG"),
        demo: "https://legal-rag-tau.vercel.app/",
      },
      {
        name: "Empathy Engine",
        tagline: "Emotion-Aware Text-to-Speech",
        desc: "Detects the emotion behind a line of text — with a confidence score — then modulates the rate, pitch and volume of the generated voice to match it.",
        tech: ["Sentiment Analysis", "TTS"],
        img: "/projects/Empathy-engine.png",
        code: GH("empathy-engine"),
        demo: "https://huggingface.co/spaces/shashankpandya/empathy-engine",
      },
      {
        name: "AI Browser Agent",
        tagline: "Autonomous Browser Automation",
        desc: "Give it a goal in plain language and it drives the browser itself — searching, filling out forms, clicking through a task queue — with a live debug view of every step it takes.",
        tech: ["Python", "LLM Agent", "Browser Automation"],
        img: "/projects/Autonomus AI-Browser-agent.png",
        code: GH("AI-browser-agent"),
      },
    ],
  },
  {
    id: "chain",
    name: "Blockchain",
    color: "role-chain",
    blurb: "Smart contracts and the dashboards that talk to them.",
    projects: [
      {
        name: "Crypto Portfolio",
        tagline: "Web3 Asset Dashboard",
        desc: "A full-stack dashboard for tracking token balances, allowances and on-chain transfers, backed by a Solidity ERC-20 contract, ethers.js/MetaMask authentication, and a fallback-aware backend that stays usable if the RPC layer fails.",
        tech: ["React", "Node.js", "ethers.js", "Solidity"],
        img: "/projects/cryptofolio.png",
        code: GH("Crypto_Portfolio"),
        demo: "https://cryptofolio-web3.netlify.app/",
      },
      {
        name: "Buy Chai",
        tagline: "On-Chain Tip Jar",
        desc: "A decentralized app where supporters send ETH with an on-chain message. The Solidity contract runs on Sepolia testnet, with Hardhat automating compilation, deployment and ABI export straight into the React frontend.",
        tech: ["Solidity", "Hardhat", "Sepolia Testnet"],
        img: "/projects/Buy Chai.png",
        code: GH("BuyChai"),
        demo: "https://buy-chai.vercel.app/",
      },
    ],
  },
  {
    id: "software",
    name: "Full-Stack",
    color: "role-software",
    blurb: "Products, tooling and the odd algorithms exercise.",
    projects: [
      {
        name: "Cash Flow Minimizer",
        tagline: "Graph-Based Settlement Engine",
        desc: "A C++ system that models transactions as a directed graph and applies a greedy strategy to match top creditors with top debtors, cutting settlement transaction count by roughly 40% while handling cross-bank mismatches through an intermediary fallback.",
        tech: ["C++", "Graph Theory", "STL"],
        img: "/projects/cpp-project.png",
        code: GH("cpp-project"),
        featured: true,
      },
      {
        name: "Claude Code Gateway",
        tagline: "Multi-Provider API Compatibility Layer",
        desc: "A gateway that lets Claude Code run against any OpenAI-compatible model — LiteLLM bridges Anthropic-format requests to a pooled provider backend, with routing, validation tests and setup guides included.",
        tech: ["LiteLLM", "Node.js", "API Gateway"],
        img: "/projects/Clude-code-gateway.png",
        code: GH("claude-code-freellmapi"),
      },
      {
        name: "Contact List Manager",
        tagline: "Contact CRUD Application",
        desc: "A contact manager with instant search, grid and list views, CSV import, and inline add/delete — a focused exercise in clean state management for list-heavy UIs.",
        tech: ["React", "CRUD"],
        img: "/projects/Contact-List-Management.png",
        code: GH("Contact-List-Manager"),
      },
      {
        name: "BookStore",
        tagline: "E-Commerce Storefront Concept",
        desc: "A front-end bookstore with best-seller rails, personalized recommendations, cart and reviews — built to practice component-driven e-commerce layout.",
        tech: ["React", "E-Commerce UI"],
        img: "/projects/BookStore.png",
        code: GH("Web_Task_1.github.io"),
        demo: "https://shashankpandya.github.io/Web_Task_1.github.io/",
      },
      {
        name: "Heaven Restaurant",
        tagline: "Restaurant Landing Site",
        desc: "A responsive restaurant site with menu browsing, cart and table reservations — an early exercise in responsive layout and component structure.",
        tech: ["React", "Responsive UI"],
        img: "/projects/Heaven Restaurant.png",
        code: GH("Web_Task_2"),
        demo: "https://shashankpandya.github.io/Web_Task_2/",
      },
    ],
  },
];

const styles = {
  "role-ai": { text: "text-role-ai", bar: "bg-role-ai", tagText: "text-role-ai", mark: "mark-ai" },
  "role-chain": { text: "text-role-chain", bar: "bg-role-chain", tagText: "text-role-chain", mark: "mark-chain" },
  "role-software": { text: "text-role-software", bar: "bg-role-software", tagText: "text-role-software", mark: "mark-software" },
};

const ProjectCard = ({ project, color, isDark }) => {
  const ref = useReveal();
  const s = styles[color];
  return (
    <div
      ref={ref}
      className={`reveal group relative flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1
      ${isDark ? "bg-ink-900" : "bg-white"}
      ${project.featured ? "md:col-span-2" : ""}`}
    >
      <div className={`h-1 w-full ${s.bar}`} />

      <div
        className={`flex-1 flex flex-col ${project.featured ? "md:flex-row" : ""}`}
      >
        {project.img ? (
          <div
            className={`relative overflow-hidden ${project.featured ? "md:w-1/2 aspect-[4/3] md:aspect-auto" : "aspect-[4/3]"}`}
          >
            <img
              src={project.img}
              alt={`${project.name} screenshot`}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div
            className={`flex items-center justify-center font-mono text-xs aspect-[4/3]
            ${isDark ? "bg-ink-950/60 text-paper-100/40" : "bg-paper-100/60 text-ink-900/40"}`}
          >
            C++ console app — no screenshot
          </div>
        )}

        <div
          className={`p-5 flex flex-col flex-1 ${project.featured ? "md:w-1/2" : ""}`}
        >
          <h4
            className={`font-display text-lg font-semibold ${isDark ? "text-paper-50" : "text-ink-950"}`}
          >
            {project.name}
          </h4>
          <p className={`font-mono text-xs mt-1 ${s.text}`}>
            {project.tagline}
          </p>
          <p
            className={`text-sm mt-3 leading-relaxed flex-1 ${isDark ? "text-paper-100/70" : "text-ink-900/70"}`}
          >
            {project.desc}
          </p>

          <p className={`font-mono text-[11px] mt-4 ${s.tagText} opacity-80`}>
            {project.tech.join("  ·  ")}
          </p>

          <div
            className={`flex items-center gap-4 mt-5 pt-4 border-t ${isDark ? "border-paper-100/10" : "border-ink-950/10"}`}
          >
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 font-mono text-xs
                ${isDark ? "text-paper-50 hover:text-accent-400" : "text-ink-950 hover:text-accent-600"}`}
              >
                <FaExternalLinkAlt size={11} /> Live demo
              </a>
            )}
            <a
              href={project.code}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-1.5 font-mono text-xs
              ${isDark ? "text-paper-50 hover:text-accent-400" : "text-ink-950 hover:text-accent-600"}`}
            >
              <FaGithub size={13} /> Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryBlock = ({ cat, isDark }) => {
  const s = styles[cat.color];
  const headerRef = useReveal();
  return (
    <div id={`work-${cat.id}`} className="scroll-mt-20 mb-16 last:mb-0">
      <div
        ref={headerRef}
        className="reveal flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-6"
      >
        <h3 className={`font-display text-2xl font-semibold whitespace-nowrap ${isDark ? "text-paper-50" : "text-ink-950"}`}>
          <span className={`mark ${s.mark}`}>{cat.name}</span>
        </h3>
        <span
          className={`font-mono text-xs ${isDark ? "text-paper-100/40" : "text-ink-900/40"}`}
        >
          {cat.blurb}
        </span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {cat.projects.map((p) => (
          <ProjectCard
            key={p.name}
            project={p}
            color={cat.color}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  );
};

const Portfolio = () => {
  const { isDark } = useTheme();

  return (
    <div
      name="portfolio"
      className={`w-full min-h-screen transition-colors duration-500
      ${isDark ? "bg-ink-900 text-paper-50" : "bg-paper-100 text-ink-950"}`}
    >
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-20">
        <SectionHeader
          eyebrow="Selected Work"
          title="Work"
          note="Twelve builds across the three things I actually spend my time on."
        />

        <p className={`font-mono text-sm mb-14 ${isDark ? "text-paper-100/50" : "text-ink-900/50"}`}>
          {categories.map((cat, i) => {
            const s = styles[cat.color];
            return (
              <React.Fragment key={cat.id}>
                {i > 0 && <span className="mx-3 opacity-40">/</span>}
                <a
                  href={`#work-${cat.id}`}
                  className={`${s.tagText} hover:underline underline-offset-4 decoration-1`}
                >
                  {cat.name}
                </a>
                <span className="ml-1">({cat.projects.length})</span>
              </React.Fragment>
            );
          })}
        </p>

        {categories.map((cat) => (
          <CategoryBlock key={cat.id} cat={cat} isDark={isDark} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
