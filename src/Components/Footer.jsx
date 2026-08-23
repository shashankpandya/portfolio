import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer
      className={`w-full border-t px-4 sm:px-6 py-8 transition-colors duration-500
      ${isDark ? "bg-ink-950 border-accent-400/20 text-paper-100/60" : "bg-paper-50 border-ink-950/15 text-ink-900/60"}`}
    >
      <div className="max-w-screen-lg mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs">
          © {new Date().getFullYear()} Shashank Pandya. Built from scratch, shipped with React.
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/shashankpandya"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className={isDark ? "hover:text-accent-400" : "hover:text-accent-600"}
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/shashank-pandya-213366287/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className={isDark ? "hover:text-accent-400" : "hover:text-accent-600"}
          >
            <FaLinkedinIn size={18} />
          </a>
          <a
            href="mailto:pandyashashank1@gmail.com"
            aria-label="Email"
            className={isDark ? "hover:text-accent-400" : "hover:text-accent-600"}
          >
            <HiOutlineMail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
