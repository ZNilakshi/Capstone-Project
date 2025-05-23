import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import About from "../components/about";
import FeaturedProducts from "../components/FeaturedProducts";
import ShopByBrand from "../components/ShopByBrand";

const Home = () => {
  const [index, setIndex] = useState(0);
  const [username, setUsername] = useState("");

  const items = [" SPRITE", " WINE", " SHAKE & BEER"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [items.length]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username) {
      setUsername(storedUser.username);
    }
  }, []);

  return (
    <div>
      <div
        className="relative flex items-center justify-center h-screen text-center bg-center bg-cover"
        style={{ backgroundImage: "url('/back.jpeg')" }}
      >
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center bg-black bg-opacity-60">
          <div className="text-white">
            {username && (
              <h2 className="mb-2 text-lg text-orange-400 md:text-2xl">
                Welcome, {username}!
              </h2>
            )}

            <h1 className="mb-4 text-5xl font-bold md:text-5xl">
              GET YOUR FAVORITE
              <motion.span
                key={index}
                className="block mb-6 text-orange-500 text-md md:text-6xl"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
              >
                {items[index]}
              </motion.span>
            </h1>

            <p className="mb-4 text-2xl font-medium md:text-4xl">
              Your One-Stop Shop
            </p>

            <p className="mb-6 text-xl md:text-xl">
              <span className="text-orange-500">EXCLUSIVE DEALS</span> &{" "}
              <span className="text-orange-500">TOP BRANDS</span>
            </p>
          </div>
        </div>
      </div>
      
      <FeaturedProducts />
      <About />
      
      <ShopByBrand />
    </div>
  );
};

export default Home;
