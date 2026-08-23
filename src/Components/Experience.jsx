import React from "react";
import { useTheme } from "../context/ThemeContext";
import SectionHeader from "./SectionHeader";
import { useReveal } from "../hooks/useReveal";

// Written in my own words from what each role actually involved — not
// lifted from the CV. Stats are the receipts; the line above is the story.
const roles = [
  {
    title: "Blockchain Advisor",
    org: "KodeinKGP, IIT Kharagpur",
    period: "Aug 2023 — Present",
    color: "role-chain",
    summary:
      "I am part of IIT Kharagpur's KodeinKGP society - deciding what we teach, and building the events that get people to show up for it.",
    stats: [
      { value: "50+", label: "members led" },
      { value: "150+", label: "at GMUN Web3.0 workshop" },
      { value: "30k+", label: "reach, Tech Triad Hackathon" },
    ],
  },
  {
    title: "Web Development & Deployment Intern",
    org: "SRIC, IIT Kharagpur",
    period: "Jun 2026 — Jul 2026",
    color: "role-software",
    summary:
      "A faculty member needed a web app taken from a local build to something that actually stays up. I owned that end to end deployment, hosting, and the repo.",
    stats: [
      { value: "1", label: "production app shipped" },
      { value: "100%", label: "of the deploy pipeline, owned solo" },
    ],
  },
  {
    title: "Core Team Member (Web)",
    org: "Megalith, IIT Kharagpur",
    period: "Jul 2024 — May 2025",
    color: "role-software",
    summary:
      "Part of the 5-person team that built the registration platform for IIT Kharagpur's official fest, then spent the rest of the year making sure people actually knew about it.",
    stats: [
      { value: "1000s", label: "of registrations processed" },
      { value: "4+", label: "outreach drives led" },
      { value: "+25%", label: "lift in participation" },
    ],
  },
];

const barClass = {
  "role-chain": "border-role-chain",
  "role-software": "border-role-software",
  "role-ai": "border-role-ai",
};

const textClass = {
  "role-chain": "text-role-chain",
  "role-software": "text-role-software",
  "role-ai": "text-role-ai",
};

const achievements = [
  {
    label: "CodeChef",
    value: "3★ · peak 1709",
    detail: "Top 1.5% globally, Starters 191",
  },
  {
    label: "Codeforces",
    value: "Pupil · peak 1395",
    detail: "handle: pandyashashank1",
  },
  {
    label: "CodeNite 2025",
    value: "Top 8.8%",
    detail: "of 20,000+ participants",
  },
  { label: "Inter-Hall GC", value: "Gold", detail: "Basketball Tournament" },
];

const RoleCard = ({ role, isDark }) => {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal relative flex flex-col sm:flex-row gap-6 sm:gap-8 pl-5 sm:pl-6
      border-l-2 ${barClass[role.color]}`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3
            className={`font-display text-xl font-semibold ${isDark ? "text-paper-50" : "text-ink-950"}`}
          >
            {role.title}
          </h3>
          <span
            className={`font-mono text-xs whitespace-nowrap ${textClass[role.color]}`}
          >
            {role.period}
          </span>
        </div>
        <p
          className={`font-mono text-sm mt-1 ${isDark ? "text-paper-100/60" : "text-ink-900/60"}`}
        >
          {role.org}
        </p>
        <p
          className={`text-base mt-3 leading-relaxed max-w-xl ${isDark ? "text-paper-100/80" : "text-ink-900/80"}`}
        >
          {role.summary}
        </p>
      </div>

      <div className="flex sm:flex-col gap-4 sm:gap-3 sm:w-40 sm:shrink-0 flex-wrap">
        {role.stats.map((s) => (
          <div key={s.label}>
            <p
              className={`font-display text-2xl font-semibold ${textClass[role.color]}`}
            >
              {s.value}
            </p>
            <p
              className={`text-xs mt-0.5 leading-snug ${isDark ? "text-paper-100/55" : "text-ink-900/55"}`}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Experience = () => {
  const { isDark } = useTheme();

  return (
    <div
      name="experience"
      className={`w-full min-h-screen transition-colors duration-500
      ${isDark ? "bg-ink-950 text-paper-50" : "bg-paper-50 text-ink-950"}`}
    >
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-20">
        <SectionHeader
          eyebrow="Leadership & Work"
          title="Experience"
          note="What I've been building and organizing outside the classroom - the story first, the numbers as proof."
        />

        <div className="space-y-14 mb-16">
          {roles.map((r) => (
            <RoleCard key={r.title} role={r} isDark={isDark} />
          ))}
        </div>

        <div>
          <p
            className={`font-mono text-xs tracking-[0.2em] uppercase mb-3 ${isDark ? "text-accent-400" : "text-accent-600"}`}
          >
            Scoreboard
          </p>
          {/* A printed-ticket ledger, not a stat-card grid: name, a dotted
              leader like an old program listing, then the number. Two
              columns at desktop width so it actually fills the section. */}
          <div
            className={`relative border-y border-dashed py-1 px-1 grid sm:grid-cols-2 sm:gap-x-12
            ${isDark ? "border-paper-100/25" : "border-ink-950/25"}`}
          >
            {achievements.map((a, i) => (
              <div
                key={a.label}
                className={`py-5
                ${i > 0 ? `border-t border-dashed sm:border-t-0 ${isDark ? "border-paper-100/10" : "border-ink-950/10"}` : ""}
                ${i >= 2 ? `sm:border-t sm:border-dashed ${isDark ? "sm:border-paper-100/10" : "sm:border-ink-950/10"}` : ""}
                ${i % 2 === 1 ? `sm:border-l sm:border-dashed sm:pl-12 ${isDark ? "sm:border-paper-100/10" : "sm:border-ink-950/10"}` : ""}`}
              >
                <div className="flex items-baseline gap-2">
                  <span className={`font-mono text-base ${isDark ? "text-paper-100/70" : "text-ink-900/70"}`}>
                    {a.label}
                  </span>
                  <span
                    className={`flex-1 border-b border-dotted mb-1.5 ${isDark ? "border-paper-100/25" : "border-ink-950/30"}`}
                  />
                  <span
                    className={`font-display text-3xl font-semibold whitespace-nowrap ${isDark ? "text-accent-400" : "text-accent-600"}`}
                  >
                    {a.value}
                  </span>
                </div>
                <p className={`text-sm mt-1 ${isDark ? "text-paper-100/45" : "text-ink-900/50"}`}>
                  {a.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
