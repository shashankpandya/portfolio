import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { useTheme } from "../context/ThemeContext";

const links = [
  {
    id: 1,
    label: "LinkedIn",
    icon: <FaLinkedinIn size={18} />,
    href: "https://www.linkedin.com/in/shashank-pandya-213366287/",
  },
  {
    id: 2,
    label: "Resume",
    icon: <BsFillPersonLinesFill size={18} />,
    href: "/CV_Shashank_Pandya.pdf",
    download: true,
  },
  {
    id: 3,
    label: "Mail",
    icon: <HiOutlineMail size={18} />,
    href: "mailto:pandyashashank1@gmail.com",
  },
  {
    id: 4,
    label: "GitHub",
    icon: <FaGithub size={18} />,
    href: "https://github.com/shashankpandya",
  },
];

const SocialLinks = () => {
  const { isDark } = useTheme();

  return (
    <div className="hidden lg:flex flex-col top-1/3 left-0 fixed z-40">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.href}
          download={link.download}
          target="_blank"
          rel="noreferrer"
          className={`group flex items-center h-12 w-12 hover:w-44 overflow-hidden
          border-r border-t first:border-t-0 transition-[width] duration-300 ease-out
          ${
            isDark
              ? "bg-ink-900/90 border-accent-400/25 text-paper-100/80 hover:text-accent-400 hover:border-accent-400"
              : "bg-white/90 border-ink-950/20 text-ink-900/80 hover:text-accent-600 hover:border-accent-600"
          }`}
        >
          <span className="w-12 h-12 flex items-center justify-center shrink-0">
            {link.icon}
          </span>
          <span className="font-mono text-xs tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
            {link.label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
