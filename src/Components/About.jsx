import React from "react";
import { useTheme } from "../context/ThemeContext";
import SectionHeader from "./SectionHeader";
import { useReveal } from "../hooks/useReveal";

const education = [
  {
    school: "Indian Institute of Technology (IIT), Kharagpur",
    detail: "B.Tech (Hons.) in Civil Engineering — CGPA 7.92/10",
    period: "2023 — 2027",
  },
  {
    school: "Jawahar Navodaya Vidyalaya, Bhavnagar",
    detail: "Class XII (CBSE) — 90% · Class X (CBSE) — 86.7%",
    period: "2019 — 2022",
  },
];

const skills = [
  {
    group: "Full-Stack",
    color: "role-software",
    items: ["React.js", "Next.js", "Node.js", "Express", "MongoDB", "Tailwind CSS", "REST APIs", "Git/GitHub"],
  },
  {
    group: "Blockchain & Web3",
    color: "role-chain",
    items: ["Solidity", "Smart Contracts", "EVM", "ERC-20", "Web3.js", "ethers.js", "MetaMask", "Hardhat", "Sepolia Testnet"],
  },
  {
    group: "AI / ML",
    color: "role-ai",
    items: ["RAG", "LLM Agents", "Agentic Workflows", "AWS Lambda", "Prompt Engineering"],
  },
  {
    group: "Languages",
    color: null,
    items: ["Python", "C++", "C", "JavaScript", "SQL", "HTML/CSS"],
  },
];

const markClass = {
  "role-software": "mark-software",
  "role-chain": "mark-chain",
  "role-ai": "mark-ai",
};

// Written as a sentence per group, not a grid of chips — the category
// name is highlighter-marked, the skills themselves are just words.
const SkillGroup = ({ group, items, color, isDark }) => {
  const ref = useReveal();
  return (
    <p ref={ref} className={`reveal text-[15px] leading-relaxed ${isDark ? "text-paper-100/75" : "text-ink-900/75"}`}>
      <span className={`font-display font-medium ${color ? `mark ${markClass[color]}` : isDark ? "text-paper-50" : "text-ink-950"}`}>
        {group}
      </span>
      {" — "}
      {items.join(", ")}
    </p>
  );
};

const About = () => {
  const { isDark } = useTheme();
  const bioRef = useReveal();

  return (
    <div
      name="about"
      className={`w-full min-h-screen transition-colors duration-500
      ${isDark ? "bg-ink-950 text-paper-50" : "bg-paper-50 text-ink-950"}`}
    >
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-20">
        <SectionHeader eyebrow="Get to Know Me" title="About" note="What I do, and where I've done it." />

        <div ref={bioRef} className="reveal grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3 space-y-5">
            <p className={`text-lg leading-relaxed ${isDark ? "text-paper-100/80" : "text-ink-900/80"}`}>
              I build across three areas: full-stack products end to end, Web3
              tooling on top of Solidity and the EVM, and AI/ML systems built
              around LLM agents and retrieval-augmented generation. Which one
              I reach for depends entirely on what the problem actually needs.
            </p>
            <p className={`text-lg leading-relaxed ${isDark ? "text-paper-100/80" : "text-ink-900/80"}`}>
              As Blockchain Advisor at{" "}
              <span className={isDark ? "text-role-chain" : "text-role-chain-deep"}>KodeinKGP</span>,
              I set technical direction for a 50+ member community and run
              workshops on smart contracts and Web3 fundamentals. I also spent
              a year on the web team behind Megalith, IIT Kharagpur's official
              fest, and interned with SRIC deploying and maintaining a
              production web app end to end.
            </p>

            <div className="pt-4 space-y-4">
              {education.map((e) => (
                <div
                  key={e.school}
                  className={`flex items-baseline justify-between gap-4 border-b pb-3
                  ${isDark ? "border-paper-100/15" : "border-ink-950/15"}`}
                >
                  <div>
                    <p className="font-display font-medium">{e.school}</p>
                    <p className={`text-sm mt-0.5 ${isDark ? "text-paper-100/60" : "text-ink-900/60"}`}>
                      {e.detail}
                    </p>
                  </div>
                  <span className={`font-mono text-xs whitespace-nowrap ${isDark ? "text-accent-400" : "text-accent-600"}`}>
                    {e.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 space-y-5">
            <p className={`font-mono text-xs tracking-[0.2em] uppercase mb-1 ${isDark ? "text-paper-100/40" : "text-ink-900/40"}`}>
              What I build with
            </p>
            {skills.map((s) => (
              <SkillGroup key={s.group} {...s} isDark={isDark} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
