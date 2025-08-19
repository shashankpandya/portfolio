import React from "react";

const Contacts = () => {
  return (
    <div
      name="contact"
      className="w-full h-screen bg-gradient-to-b from-black to-gray-800 p-4 text-white"
    >
      <div className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            Contacts
          </p>
          <p className="py-6">Submit the form below to get in touch with me</p>
          <div className="flex justify-center items-center">
            <form
              action="https://getform.io/f/aejyzvob"
              method="POST"
              className="flex flex-col w-full md:w-1/2"
            >
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="p-3 my-4 bg-transparent border-2 rounded-lg
                  text-white focus:outline-none
                  transition-all duration-300
                 focus:border-cyan-500
                  focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]
                  placeholder:text-gray-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="p-3 my-4 bg-transparent border-2 rounded-md text-white focus:outline-none focus:border-cyan-500 transition duration-300"
              />
              <textarea
                name="message"
                placeholder="Enter your message"
                rows={10}
                className="p-3 my-4 bg-transparent border-2 rounded-md text-white focus:outline-none focus:border-cyan-500 transition duration-300"
              ></textarea>
              <button
                className="relative overflow-hidden
                text-white bg-gradient-to-r from-cyan-500 to-blue-500 
                px-8 py-3 my-4 mx-auto rounded-lg
                hover:scale-105 duration-300 transition-all
                group"
              >
                <span className="relative z-10">Let's talk</span>
                <div
                  className="absolute inset-0 w-1/3 h-full 
                  bg-white/20 skew-x-[45deg]
                  group-hover:translate-x-[200%]
                  transition-transform duration-1000"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
