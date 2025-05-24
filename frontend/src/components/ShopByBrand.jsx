import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const brands = [
  { name: "Rockland", logo: "/Rockland-Logo.png", path: "/brand/rockland", glow: "hover:shadow-yellow-500" },
  { name: "IDL", logo: "/idl-logo.png", path: "/brand/idl", glow: "hover:shadow-cyan-400" },
  { name: "DCSL", logo: "/DCSL_Logo.png", path: "/brand/dcsl", glow: "hover:shadow-red-500" },
  { name: "Mendis", logo: "/mendis_logo.png", path: "/brand/mendis", glow: "hover:shadow-blue-500" },
  { name: "Lion", logo: "/lion-logo.png", path: "/brand/lion", glow: "hover:shadow-amber-400" },
  { name: "DCSL Breweries", logo: "/DBL-Logo-PNG.png", path: "/brand/dcsl", glow: "hover:shadow-lime-400" },
  { name: "Heineken", logo: "/Heineken.webp", path: "/brand/heineken", glow: "hover:shadow-green-400" },
  { name: "Anchor", logo: "/Anchor.webp", path: "/brand/anchor", glow: "hover:shadow-brown-400" },
  { name: "Tiger", logo: "/Tiger.webp", path: "/brand/tiger", glow: "hover:shadow-blue-400" },
  { name: "Bison", logo: "/Bison.webp", path: "/brand/bison", glow: "hover:shadow-red-400" },
  { name: "DCSL Beer", logo: "/dcsl beer.jpg", path: "/brand/dcsl", glow: "hover:shadow-lime-400" },
];

const arrowStyle = `
  absolute top-1/2 -translate-y-1/2 z-20
  w-10 h-10 sm:w-12 sm:h-12
  bg-orange-500 bg-opacity-80 hover:bg-opacity-100
  rounded-full
  flex items-center justify-center
  cursor-pointer
  shadow-lg
  transition
  text-white
`;

const ShopByBrand = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkForScrollPosition = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    checkForScrollPosition();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkForScrollPosition);
    window.addEventListener("resize", checkForScrollPosition);
    return () => {
      el.removeEventListener("scroll", checkForScrollPosition);
      window.removeEventListener("resize", checkForScrollPosition);
    };
  }, []);

  const scrollBy = (offset) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  // Split brands into 2 rows
  const half = Math.ceil(brands.length / 2);
  const firstRow = brands.slice(0, half);
  const secondRow = brands.slice(half);

  return (
    <div className="min-h-screen px-6 py-20 font-sans text-white bg-gradient-to-br from-gray-950 via-black to-gray-900">
      <header className="mb-16 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-[0.3em] text-orange-400">
          Shop by Brand
        </h1>
        <p className="mt-4 text-lg tracking-wider text-gray-400">
          Navigate the universe of premium spirits
        </p>
      </header>

      <div className="relative">
        {canScrollLeft && (
          <button
            aria-label="Scroll Left"
            onClick={() => scrollBy(-300)}
            className={`${arrowStyle} left-2`}
            title="Scroll Left"
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {canScrollRight && (
          <button
            aria-label="Scroll Right"
            onClick={() => scrollBy(300)}
            className={`${arrowStyle} right-2`}
            title="Scroll Right"
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}

        {/* Scrollable container with two rows */}
        <div
          ref={scrollRef}
          className="flex flex-col space-y-8 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent scroll-smooth"
        >
          {[firstRow, secondRow].map((row, idx) => (
            <div key={idx} className="flex px-4 py-2 space-x-6 min-w-max">
              {row.map((brand, index) => (
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  key={index}
                  onClick={() => navigate(brand.path)}
                  className={`
                    relative rounded-3xl p-4 sm:p-6 md:p-8 
                    w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-56 
                    flex flex-col items-center justify-center 
                    bg-white/10 backdrop-blur-md border border-white/10 
                    transition-all duration-300 
                    hover:ring-2 hover:ring-white/40
                    ${brand.glow}  /* dynamic shadow color */
                  `}
                >
                  <img
                    src={brand.logo}
                    alt={`${brand.name} Logo`}
                    className="object-contain mb-3 h-14 sm:h-16 md:h-20 sm:mb-4"
                  />
                  <p className="text-xs font-semibold tracking-wide text-center text-white uppercase sm:text-sm drop-shadow-sm">
                    {brand.name}
                  </p>
                  <div className="absolute inset-0 rounded-3xl pointer-events-none shadow-[0_0_60px_8px_rgba(255,255,255,0.04)]" />
                </motion.button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopByBrand;
