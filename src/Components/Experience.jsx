import React from "react";

import html from "../assets/html.png";
import css from "../assets/css.png";
import node from "../assets/node.png";
import javascript from "../assets/javascript.png";
import react from "../assets/react.png";
import solidity from "../assets/solidity.png";
import nextjs from "../assets/nextjs.png";
import tailwind from "../assets/tailwind.png";
import github from "../assets/github.png";

const Experience = () => {
  const experiences = [
    {
      id: 1,
      src: html,
      name: "HTML",
      style: "shadow-orange-500",
      hoverBg: "group-hover:bg-orange-500/20",
      textColor: "group-hover:text-orange-400",
      glowColor: "group-hover:shadow-orange-500/50",
    },
    {
      id: 2,
      src: css,
      name: "CSS",
      style: "shadow-blue-500",
      hoverBg: "group-hover:bg-blue-500/20",
      textColor: "group-hover:text-blue-400",
      glowColor: "group-hover:shadow-blue-500/50",
    },
    {
      id: 3,
      src: javascript,
      name: "Javascript",
      style: "shadow-yellow-500",
      hoverBg: "group-hover:bg-yellow-500/20",
      textColor: "group-hover:text-yellow-400",
      glowColor: "group-hover:shadow-yellow-500/50",
    },
    {
      id: 4,
      src: react,
      name: "React",
      style: "shadow-blue-600",
      hoverBg: "group-hover:bg-blue-600/20",
      textColor: "group-hover:text-blue-400",
      glowColor: "group-hover:shadow-blue-600/50",
    },
    {
      id: 5,
      src: node,
      name: "Nodejs",
      style: "shadow-green-500",
      hoverBg: "group-hover:bg-green-500/20",
      textColor: "group-hover:text-green-400",
      glowColor: "group-hover:shadow-green-500/50",
    },
    {
      id: 6,
      src: solidity,
      name: "Solidity",
      style: "shadow-gray-400",
      hoverBg: "group-hover:bg-gray-400/20",
      textColor: "group-hover:text-gray-400",
      glowColor: "group-hover:shadow-gray-400/50",
    },
    {
      id: 7,
      src: nextjs,
      name: "Nextjs",
      style: "shadow-white-500",
      hoverBg: "group-hover:bg-white-500/20",
      textColor: "group-hover:text-white-400",
      glowColor: "group-hover:shadow-white-500/50",
    },
    {
      id: 8,
      src: tailwind,
      name: "Tailwind",
      style: "shadow-cyan-500",
      hoverBg: "group-hover:bg-cyan-500/20",
      textColor: "group-hover:text-cyan-400",
      glowColor: "group-hover:shadow-cyan-500/50",
    },
    {
      id: 9,
      src: github,
      name: "Github",
      style: "shadow-gray-500",
      hoverBg: "group-hover:bg-gray-500/20",
      textColor: "group-hover:text-gray-400",
      glowColor: "group-hover:shadow-gray-500/50",
    },
  ];

  return (
    <div
      name="experience"
      className="bg-gradient-to-b from-gray-800 to-black w-full min-h-screen"
    >
      <div
        className="max-w-screen-lg mx-auto p-4 flex flex-col
      justify-center w-full h-full text-white"
      >
        <div>
          <p className="text-4xl font-bold fond-poppins border-b-4 border-gray-500 p-2 inline">
            Experience
          </p>
          <p className="py-6">These are the technology I've worked with</p>
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-12 text-center py-8 px-12 sm:px-0">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className={`
                card relative h-[250px] w-[200px] mx-auto
                perspective-[2500px] group cursor-pointer
                transition-all duration-500 hover:z-10
                ${experience.style}
              `}
            >
              <div
                className={`
                absolute inset-0 rounded-xl opacity-0 
                group-hover:opacity-100 transition-opacity duration-500
                blur-xl bg-gradient-to-t ${experience.glowColor}
              `}
              />

              <div
                className={`
                  wrapper absolute w-full h-full transition-all duration-500 
                  bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-gray-800/90
                  group-hover:transform group-hover:translate-y-[-5%] 
                  group-hover:rotate-x-[25deg] group-hover:translate-z-0
                  rounded-xl shadow-lg
                  border border-gray-800/50 group-hover:border-gray-700/50
                  backdrop-blur-sm backdrop-saturate-200
                  ${experience.hoverBg}
                  before:absolute before:inset-0 before:rounded-xl
                  before:bg-gradient-to-b before:from-transparent before:to-transparent
                  before:border-t before:border-white/10
                  group-hover:before:opacity-100
                  overflow-hidden
                `}
              >
                <div className="relative w-full h-full flex flex-col items-center justify-center p-6">
                  <div
                    className="
                    absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]
                    animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  "
                  />

                  <img
                    src={experience.src}
                    alt=""
                    className="w-24 transition-all duration-500
                    group-hover:transform group-hover:translate-z-[100px] 
                    group-hover:translate-y-[-20px] group-hover:scale-125
                    drop-shadow-2xl animate-float"
                  />

                  <p
                    className={`
                    mt-6 text-xl font-bold transition-all duration-500
                    group-hover:transform group-hover:translate-z-[100px] 
                    group-hover:translate-y-[-10px] group-hover:scale-110
                    tracking-wider
                    ${experience.textColor}
                  `}
                  >
                    {experience.name}
                  </p>

                  <div
                    className="
                    absolute inset-0 opacity-0 group-hover:opacity-100 
                    transition-opacity duration-1000 delay-100
                    bg-gradient-to-tr from-transparent via-white/5 to-transparent
                    translate-x-[-100%] group-hover:translate-x-[100%]
                    transition-transform duration-1000 ease-in-out
                  "
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
