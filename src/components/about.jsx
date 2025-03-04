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

    
      <div className="w-full  pr-6 mr-6 md:w-1/2 md:pl-12 mt-6 md:mt-0 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">ABOUT US</h2>
        <p className="text-white text-lg  p-1 leading-relaxed">
          We are a passionate team dedicated to delivering the best products and services. 
          Our mission is to create meaningful experiences for our customers through 
          innovation, quality, and commitment.
        </p>
        <p className="text-white text-lg mt-4">
          Established in 2020, we have been serving our clients with utmost dedication. 
          Join us in our journey and be a part of something amazing!
        </p>
      </div>
      
    </section>
  );
};

export default About;
