import {  motion } from "framer-motion";
import { useState, useEffect } from "react";
import About from "../components/about";
import FeaturedProducts from "../components/FeaturedProducts";
import ShooByBrand from "../components/ShooByBrand";

const Home = () => {
  const [index, setIndex] = useState(0);
  const items = ["  SPRITE", " WINE", " SHAKE & BEER"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div>
    <div className="relative h-screen bg-cover bg-center flex items-center justify-center text-center" style={{ backgroundImage: "url('/back.jpeg')" }}>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-center px-6">
        
        <div className="text-white">
          <h1 className="text-5xl md:text-5xl font-bold mb-4">
          GET YOUR FAVORITE  
             <motion.span 
            key={index}
            className="text-md md:text-6xl mb-6 text-orange-500"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
          >
            {items[index]}
          </motion.span>
          </h1>

          <p className="text-2xl md:text-4xl font-medium mb-4">
            Your One-Stop Shop 
          </p>

          {/* Animated Changing Text */}
          

          <p className="text-xl md:text-xl mb-6">
            <span className="text-orange-500">EXCLUSIVE DEALS</span> &  
            <span className="text-orange-500"> TOP BRANDS</span>
          </p>
        </div>

      </div>
    </div>
    <About />
    <FeaturedProducts />
    <ShooByBrand/>
    </div>
  );
};

export default Home;
