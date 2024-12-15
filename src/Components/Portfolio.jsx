import React from "react";
import Bookstore from "../assets/portfolio/Book Store.jpeg";

import BuyChai from "../assets/portfolio/Buy Chai.png";

import Restaurant from "../assets/portfolio/Heaven Restaurent.jpeg";

import portfolio from "../assets/portfolio/Portfolio.png";

import reactWeather from "../assets/portfolio/Weather.png";

import cryptofolio from "../assets/portfolio/cryptofolio.png";

const Portfolio = () => {
  const portfolios = [
    {
      id: 1,
      src: Bookstore,
      href: "https://shashankpandya.github.io/Web_Task_1.github.io/",
      code: "https://github.com/shashankpandya/Web_Task_1.github.io",
    },
    {
      id: 2,
      src: portfolio,
      href: "https://fantastic-torte-e859f3.netlify.app/",
      code: "https://github.com/shashankpandya/portfolio",
    },
    {
      id: 3,
      src: cryptofolio,
      href: "https://shashankpandya-crypto-portfolio.netlify.app/",
      code: "https://github.com/shashankpandya/Crypto_Portfolio",
    },

    {
      id: 4,
      src: reactWeather,
      href: "https://shashankpandya.github.io/Weather_app/",
      code: "https://github.com/shashankpandya/Weather_app",
    },

    {
      id: 5,
      src: Restaurant,
      href: "https://shashankpandya.github.io/Web_Task_2/",
      code: "https://github.com/shashankpandya/web_task_2",
    },
    {
      id: 6,
      src: BuyChai,
      href: "https://paymmentt-mettaamaskk-by-sp.netlify.app/",
      code: "https://github.com/shashankpandya/BuyChai",
    },
  ];

  return (
    <div
      name="portfolio"
      className="bg-gradient-to-b from-black to-gray-800 w-full text-white md:h-screen"
    >
      <div
        className="max-w-screen-lg p-4 mx-auto flex flex-col
      justify-center w-full h-full"
      >
        <div className="pb-8">
          {/*the structure of about section and portfolio is similar */}
          <p className="text-4xl font-bold font-poppins inline border-b-4 border-gray-500">
            Portfolio
          </p>
          <p className="py-6">Check out some of my work here</p>
        </div>

        <div className="grid sm:grid-flow-col-2 md:grid-cols-3 gap-8 px-12 sm:px-0">
          {portfolios.map((portfolio) => (
            <div
              key={portfolio.id}
              className="shadow-md shadow-gray-600 rounded-lg "
            >
              <img
                src={portfolio.src}
                alt=""
                className="rounded-md duration-200 hover:scale-105"
              />
              <div className="flex items-center justify-center">
                <button
                  className="w-1/2 px-6 py-3 m-4 duration-200 
              hover:scale-105"
                >
                  <a href={portfolio.href}>Demo</a>
                </button>
                <button
                  className="w-1/2 px-6 py-3 m-4 duration-200 
              hover:scale-105"
                >
                  <a href={portfolio.code}>Code</a>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
