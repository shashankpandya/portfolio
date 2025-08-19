import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";

const SocialLinks = () => {
  const links = [
    {
      id: 1,
      child: (
        <>
          LinkedIn
          <FaLinkedinIn size={30} />
        </>
      ),
      href: "https://www.linkedin.com/in/shashank-pandya-213366287/",
      style: "rounded-tr-md",
    },
    {
      id: 2,
      child: (
        <>
          Resume
          <BsFillPersonLinesFill size={30} />
        </>
      ),
      href: "/resume.pdf",
      download: true,
    },
    {
      id: 3,
      child: (
        <>
          Mail
          <HiOutlineMail size={30} />
        </>
      ),
      href: "mailto:pandyashashank1@gmail.com",
    },
    {
      id: 4,
      child: (
        <>
          GitHub
          <FaGithub size={30} />
        </>
      ),
      href: "https://github.com/shashankpandya",
      style: "rounded-br-md",
    },
  ];

  return (
    <div className="hidden lg:flex flex-col top-[35%]  left-0 fixed">
      <ul>
        {links.map((link) => (
          <li
            key={link.id}
            className="flex justify-between items-center w-40 h-14 px-4 
              ml-[-100px] hover:ml-[-10px] duration-300 
              bg-gradient-to-r from-gray-800 to-gray-700
              hover:from-cyan-600 hover:to-blue-600
              rounded-tr-md rounded-br-md
              border-r-4 border-cyan-500
              group"
          >
            <a
              href={link.href}
              className="flex justify-between items-center w-full text-white
                group-hover:scale-105 transition-transform duration-300"
              download={link.download}
              target="_blank"
              rel="noreferrer"
            >
              {link.child}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinks;
