import React from "react";

const About = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center    bg-black">


      <div className="w-full md:w-1/2">
        <img
          src="/background.png"
          alt="About Us"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>


      <div className="w-full pr-6 mr-6 md:w-1/2 md:pl-12 mt-6 md:mt-0 text-center md:text-left">
        <p className="text-white text-3xl md:text-4xl font-semibold italic px-6 py-4 leading-relaxed tracking-wide text-center md:text-left bg-black/50 rounded-2xl shadow-lg">
          <center>Cheers to quality, tradition, and unforgettable moments.</center>
        </p>
      </div>




    </section>
  );
};

export default About;
