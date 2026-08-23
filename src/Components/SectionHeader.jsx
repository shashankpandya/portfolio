import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useReveal } from "../hooks/useReveal";

const SectionHeader = ({ eyebrow, title, note }) => {
  const { isDark } = useTheme();
  const ref = useReveal();

  return (
    <div ref={ref} className="reveal pb-10">
      <p
        className={`font-mono text-xs tracking-[0.25em] uppercase mb-3
        ${isDark ? "text-accent-400" : "text-accent-600"}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-display text-3xl sm:text-5xl font-semibold tracking-tight
        ${isDark ? "text-paper-50" : "text-ink-950"}`}
      >
        {title}
      </h2>
      <div
        className={`h-px w-16 mt-5 ${isDark ? "bg-accent-400/50" : "bg-accent-600/50"}`}
      />
      {note && (
        <p
          className={`mt-4 max-w-xl text-base leading-relaxed
          ${isDark ? "text-paper-100/60" : "text-ink-900/60"}`}
        >
          {note}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
