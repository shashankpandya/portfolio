import React from "react";
import { Link } from "react-scroll";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { isDark } = useTheme();

  return (
    <div
      name="home"
      className={`relative w-full min-h-screen pt-16 overflow-hidden transition-colors duration-500
      ${isDark ? "bg-ink-950" : "bg-paper-50"}`}
    >
      <div
        className="absolute right-0 top-1/4 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-[0.15] pointer-events-none"
        style={{ background: "radial-gradient(circle, #9b87f5, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-screen-lg mx-auto px-4 sm:px-6 flex flex-col-reverse md:flex-row items-center gap-14 md:gap-10 min-h-[calc(100vh-4rem)] py-16">
        <div className="flex-1 flex flex-col justify-center">
          <h1
            className={`font-display text-4xl sm:text-6xl font-semibold leading-[1.05] tracking-tight
            ${isDark ? "text-paper-50" : "text-ink-950"}`}
          >
            Shashank
            <br />
            Pandya
          </h1>

          {/* The three disciplines live in the sentence itself, marked up
              like highlighter strokes on a page, instead of a row of
              category badges below it. */}
          <p
            className={`font-body text-lg mt-6 max-w-lg leading-relaxed
            ${isDark ? "text-paper-100/85" : "text-ink-900/85"}`}
          >
            I ship <span className="mark mark-software">production web apps</span>,{" "}
            <span className="mark mark-chain">on-chain systems</span> and{" "}
            <span className="mark mark-ai">RAG-based AI agents</span> — whichever
            the problem actually needs.
          </p>

          <p
            className={`font-body text-base mt-3 max-w-md leading-relaxed
            ${isDark ? "text-paper-100/60" : "text-ink-900/60"}`}
          >
            Blockchain Advisor at{" "}
            <span className={isDark ? "text-role-chain" : "text-role-chain-deep"}>KodeinKGP</span>,
            IIT Kharagpur.
          </p>

          <div className="mt-8 flex items-center gap-8">
            <Link
              to="portfolio"
              smooth
              duration={600}
              className={`group relative inline-flex items-center gap-2 pl-6 pr-8 py-3 font-mono text-sm tracking-wide
              cursor-pointer transition-colors duration-300
              ${isDark ? "bg-accent-500 text-ink-950 hover:bg-accent-400" : "bg-ink-950 text-paper-50 hover:bg-ink-800"}`}
              style={{ clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)" }}
            >
              View the work
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>

            <Link
              to="contact"
              smooth
              duration={600}
              className={`group inline-flex items-center font-mono text-sm tracking-wide cursor-pointer
              ${isDark ? "text-paper-100/80 hover:text-paper-50" : "text-ink-900/80 hover:text-ink-950"}`}
            >
              <span className="inline-block w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:w-3 group-hover:opacity-100">
                [
              </span>
              <span
                className={`border-b border-transparent transition-colors duration-200
                ${isDark ? "group-hover:border-accent-400" : "group-hover:border-accent-600"}`}
              >
                Get in touch
              </span>
              <span className="inline-block w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:w-3 group-hover:opacity-100">
                ]
              </span>
            </Link>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center gap-5 w-full">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-72 md:h-72 lg:w-80 lg:h-80">
            <div
              className="absolute -inset-6 rounded-full blur-2xl opacity-20 pointer-events-none"
              style={{ background: "radial-gradient(circle, #9b87f5, transparent 70%)" }}
              aria-hidden="true"
            />
            <div className="relative w-full h-full animate-float">
              <div
                className={`w-full h-full rounded-full overflow-hidden border-4
                ${isDark ? "border-ink-900" : "border-paper-50"}`}
                style={{ boxShadow: isDark ? "0 0 0 1px rgba(255,255,255,0.08)" : "0 0 0 1px rgba(0,0,0,0.08)" }}
              >
                <img src="/profile.jpg" alt="Shashank Pandya" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <p className={`font-mono text-xs flex items-center gap-2 ${isDark ? "text-paper-100/55" : "text-ink-900/55"}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-role-software opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-role-software" />
            </span>
            open to work
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
