import React from "react";

const About = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden md:flex">

      {/* Image Section */}
      <div className="w-full h-full md:w-1/2">
        <img
          src="/back.gif"
          alt="About Us"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Text Overlay for Small Screens */}
      <div className="absolute inset-0 flex items-center justify-center px-6 py-8 bg-black/60 md:hidden">
        <div className="max-w-xl mt-6 mb-6 space-y-4 text-center">
          <h2 className="text-2xl italic font-bold leading-snug tracking-wide text-orange-400 sm:text-4xl">
            Raise your glass to moments worth savoring.
          </h2>
          <p className="text-sm leading-relaxed tracking-wide text-white">
            At the heart of every celebration lies a story — crafted with passion, steeped in tradition, and bursting with flavor.
            Whether it’s an intimate gathering or a grand event, our bottles bring people together to create unforgettable memories.
            Discover the perfect blend of heritage and excellence, designed to elevate your every toast.
            <span className="block mt-2 font-semibold text-amber-400">Join us</span> and make every sip a celebration of life’s finest moments.
          </p>
        </div>
      </div>

      {/* Right Side Text Content for Medium+ Screens */}
      <div className="items-center justify-center hidden w-full h-full p-6 md:flex md:w-1/2 bg-black/90 md:p-12">
        <div className="max-w-2xl text-center">
          <h2 className="mb-6 text-2xl italic font-bold leading-snug tracking-wide text-orange-400 md:text-3xl lg:text-5xl drop-shadow-md">
            Raise your glass to moments worth savoring.
          </h2>
          <p className="text-lg text-white md:text-xl lg:text-[1.35rem] leading-relaxed tracking-wide drop-shadow-sm">
            At the heart of every celebration lies a story — crafted with passion, steeped in tradition, and bursting with flavor.
            <br className="hidden md:block" />
            Whether it’s an intimate gathering or a grand event, our bottles bring people together to create unforgettable memories.
            <br className="hidden md:block" />
            Discover the perfect blend of heritage and excellence, designed to elevate your every toast.
            <br className="hidden md:block" />
            <span className="font-semibold text-amber-400">Join us</span>, and make every sip a celebration of life’s finest moments.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
