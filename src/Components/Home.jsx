import React from "react";
import MyPic from "../assets/Img.jpg";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-scroll";
const Home = () => {
  return (
    <div
      name="home"
      className="h-screen w-full bg-gradient-to-b from-black via-black to-gray-800 "
    >
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row md:space-x-10">
        <div className="flex flex-col justify-center h-full mx-auto">
          <h2 className="text-3xl sm:text-6xl font-bold text-white font-poppins">
            I'm novice programmer
          </h2>
          <p className="text-gray-400 font-poppins font-bold py-4 max-w-md">
            I have a passion for developing user-friendly applications and
            creating engaging digital experiences. My goal is to help people
            achieve their goals through innovative and creative solutions.
          </p>
          <div>
            <Link
              to="portfolio"
              smooth
              duration={600}
              className="group text-white text-2xl sm:text-3xl w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer"
            >
              Portfolio
              <span className="group-hover:rotate-90 duration-300">
                <MdKeyboardDoubleArrowRight size={30} className="ml-2" />
              </span>
            </Link>
          </div>
        </div>
        <div>
          <img
            src={MyPic}
            alt="my profile pic."
            className="rounded-2xl mx-auto w-2/3 md:w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
