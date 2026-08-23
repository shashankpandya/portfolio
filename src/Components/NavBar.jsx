import React, { useState } from "react";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { Link } from "react-scroll";
import { useTheme } from "../context/ThemeContext";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const links = [
    { link: "home", label: "Home" },
    { link: "about", label: "About" },
    { link: "portfolio", label: "Work" },
    { link: "experience", label: "Experience" },
    { link: "contact", label: "Contact" },
  ];

  return (
    <div
      className={`fixed top-0 z-50 w-full h-16 px-4 sm:px-6 flex items-center justify-between
      border-b backdrop-blur-md transition-colors duration-500
      ${
        isDark
          ? "bg-ink-950/85 border-accent-400/20 text-paper-50"
          : "bg-paper-50/90 border-ink-950/15 text-ink-950"
      }`}
    >
      <Link to="home" smooth duration={500} className="flex items-center gap-3 cursor-pointer">
        <img
          src="/profile.jpg"
          alt=""
          className={`w-8 h-8 rounded-full object-cover border ${isDark ? "border-accent-400/60" : "border-accent-600/60"}`}
        />
        <span className="font-display text-lg font-semibold tracking-tight hidden sm:inline">
          Shashank Pandya
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-1">
        {links.map((l) => (
          <Link
            key={l.link}
            to={l.link}
            smooth
            duration={500}
            className={`relative px-3 py-2 cursor-pointer font-mono text-xs tracking-wide
            after:content-[''] after:absolute after:left-3 after:right-3 after:-bottom-px after:h-px
            after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100
            transition-colors duration-200
            ${
              isDark
                ? "text-paper-100/70 hover:text-paper-50 after:bg-accent-400"
                : "text-ink-900/70 hover:text-ink-950 after:bg-accent-600"
            }`}
          >
            {l.label}
          </Link>
        ))}

        <button
          onClick={toggleTheme}
          className={`ml-3 p-2 border transition-all duration-300 hover:scale-105
          ${
            isDark
              ? "border-accent-400/40 text-accent-400 hover:border-accent-400"
              : "border-ink-950/20 text-accent-600 hover:border-accent-600"
          }`}
          aria-label="Toggle theme"
        >
          {isDark ? <FaSun size={14} /> : <FaMoon size={14} />}
        </button>
      </div>

      <div className="flex items-center gap-2 md:hidden">
        <button
          onClick={toggleTheme}
          className={`p-2 border ${isDark ? "border-accent-400/40 text-accent-400" : "border-ink-950/20 text-accent-600"}`}
          aria-label="Toggle theme"
        >
          {isDark ? <FaSun size={14} /> : <FaMoon size={14} />}
        </button>

        <button
          onClick={() => setNav(!nav)}
          className="cursor-pointer p-2"
          aria-label="Toggle navigation menu"
        >
          {nav ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {nav && (
        <div
          className={`fixed top-16 left-0 w-full h-[calc(100vh-4rem)] transition-colors duration-500
          ${isDark ? "bg-ink-950 text-paper-50" : "bg-paper-50 text-ink-950"}`}
        >
          <ul className="flex flex-col h-full">
            {links.map((l) => (
              <li
                key={l.link}
                className={`border-b ${isDark ? "border-accent-400/15" : "border-ink-950/10"}`}
              >
                <Link
                  onClick={() => setNav(false)}
                  to={l.link}
                  smooth
                  duration={500}
                  className="block px-6 py-5 cursor-pointer font-display text-2xl"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
