import React from "react";

const About = () => {
  return (
    <div
      name="about"
      className="w-full h-screen bg-gradient-to-b from-gray-800 to-black text-white"
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold font-poppins inline border-b-4 border-gray-500">
            About
          </p>
        </div>
        <p className="text-xl mt-20 text-gray-400">
          I am currently pursuing my B.Tech at the prestigious IIT Kharagpur.
          Along with my academic journey, I am actively engaged in learning
          various programming languages, demonstrating a keen interest in
          technology and software development. My academic environment fosters a
          culture of innovation, which aligns perfectly with my passion for
          coding and problem-solving.
        </p>

        <br />
        <p className="text-xl text-gray-400">
          Beyond academics, I have a strong interest in basketball, a sport that
          not only keeps me physically active but also improve my teamwork and
          strategic thinking skills. Balancing my studies with love for the
          game.
        </p>
      </div>
    </div>
  );
};

export default About;
