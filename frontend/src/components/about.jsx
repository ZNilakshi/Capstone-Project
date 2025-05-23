import React from "react";

const About = () => {
  return (
    <section className="flex flex-col w-full h-screen overflow-hidden md:flex-row">

      {/* Left Side - Image */}
      <div className="w-full h-64 md:w-1/2 md:h-full">
        <img
          src="/back.gif"
          alt="About Us"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Side - Text with Background Color */}
      <div className="flex items-center justify-center w-full h-full p-6 md:w-1/2 bg-black/90 md:p-12">
        <div className="text-center">
          {/* Heading */}
          <h2 className="mb-6 text-xl italic font-extrabold text-white sm:text-3xl md:text-5xl lg:text-6xl">
            Raise your glass to moments worth savoring.
          </h2>

          {/* Paragraph */}
          <p className="text-sm leading-relaxed text-white sm:text-base md:text-lg lg:text-xl">
            At the heart of every celebration lies a story — crafted with passion, steeped in tradition, and bursting with flavor.
            <br className="hidden md:block" />
            Whether it’s an intimate gathering or a grand event, our bottles bring people together to create unforgettable memories.
            <br className="hidden md:block" />
            Discover the perfect blend of heritage and excellence, designed to elevate your every toast.
            Join us, and make every sip a celebration of life’s finest moments.
          </p>
        </div>
      </div>

    </section>
  );
};

export default About;
