import React from "react";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";
import SectionHeader from "./SectionHeader";

const Contacts = () => {
  const { isDark } = useTheme();

  const inputClasses = `w-full p-3 my-2 bg-transparent border font-body
    focus:outline-none transition-all duration-300
    ${
      isDark
        ? "text-paper-50 border-accent-400/30 placeholder:text-paper-100/40 focus:border-accent-400"
        : "text-ink-950 border-ink-950/25 placeholder:text-ink-900/40 focus:border-accent-600"
    }`;

  return (
    <div
      name="contact"
      className={`w-full min-h-screen transition-colors duration-500
      ${isDark ? "bg-ink-900 text-paper-50" : "bg-paper-100 text-ink-950"}`}
    >
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-20">
        <SectionHeader eyebrow="Let's Connect" title="Contact" note="Open to internships, collaborations and interesting problems." />

        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2 space-y-4">
            <a
              href="mailto:pandyashashank1@gmail.com"
              className={`flex items-center gap-3 font-mono text-sm
              ${isDark ? "text-paper-100/80 hover:text-accent-400" : "text-ink-900/80 hover:text-accent-600"}`}
            >
              <HiOutlineMail size={18} /> pandyashashank1@gmail.com
            </a>
            <a
              href="tel:+916354932966"
              className={`flex items-center gap-3 font-mono text-sm
              ${isDark ? "text-paper-100/80 hover:text-accent-400" : "text-ink-900/80 hover:text-accent-600"}`}
            >
              <HiOutlinePhone size={18} /> +91 63549 32966
            </a>
          </div>

          <form
            action="https://getform.io/f/aejyzvob"
            method="POST"
            className="md:col-span-3 flex flex-col"
          >
            <input type="text" name="name" placeholder="Your name" className={inputClasses} required />
            <input type="email" name="email" placeholder="Your email" className={inputClasses} required />
            <textarea name="message" placeholder="Your message" rows={6} className={inputClasses} required />
            <button
              type="submit"
              className={`group self-start mt-4 inline-flex items-center gap-2 pl-8 pr-10 py-3 font-mono text-sm tracking-wide
              cursor-pointer transition-colors duration-300
              ${isDark ? "bg-accent-500 text-ink-950 hover:bg-accent-400" : "bg-ink-950 text-paper-50 hover:bg-ink-800"}`}
              style={{ clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)" }}
            >
              Send message
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
