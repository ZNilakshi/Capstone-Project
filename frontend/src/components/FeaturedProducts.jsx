import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    name: "Spirit",
    image: "/sprit2.jpg",
    path: "/sprite",
    tag: "🔥 Bestseller",
    description:
      "Refined and bold. Discover a collection of premium spirits to elevate your evenings.",
  },
  {
    name: "Shake & Beer",
    image: "/beer2.jpg",
    path: "/ShakeBeer",
    tag: "🍺 Chill Vibes",
    description:
      "Crisp and refreshing. The perfect choice for relaxed moments and friendly hangouts.",
  },
  {
    name: "Wine",
    image: "/wine2.jpg",
    path: "/WineStore",
    tag: "🍷 Classic Taste",
    description:
      "Sophistication in every sip. Explore the finest selection of red, white, and sparkling wines.",
  },
];

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isMobile = () => window.innerWidth < 768;

  const updateScrollButtons = () => {
    const container = containerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft + container.clientWidth < container.scrollWidth
    );
  };

  const scroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.7;
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Auto-scroll logic for mobile view
  useEffect(() => {
    let interval;
    if (isMobile()) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
      }, 2000);
    }

    return () => clearInterval(interval);
  }, []);

 
  useEffect(() => {
    if (isMobile()) {
      const container = containerRef.current;
      if (!container) return;

      const cardWidth = container.clientWidth;
      container.scrollTo({
        left: currentIndex * cardWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateScrollButtons();
    container.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  return (
    <section className="relative px-4 py-20 overflow-hidden text-white sm:px-10 lg:px-20 bg-gradient-to-b from-black via-zinc-900 to-black">
      {/* Background Decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[80vw] h-[80vw] bg-gradient-to-tr from-orange-500 to-pink-500 rounded-full opacity-10 blur-3xl -top-20 -left-40" />
        <div className="absolute w-[60vw] h-[60vw] bg-gradient-to-bl from-purple-500 to-orange-400 rounded-full opacity-10 blur-2xl bottom-0 right-0" />
      </div>

      {/* Header */}
      <header className="mb-16 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-[0.3em] text-orange-400">
          Featured Products
        </h1>
      </header>

      {/* Scroll Arrows */}
      <div className="relative hidden md:block">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll Left"
            className="absolute left-[-24px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-600 shadow-lg shadow-pink-500/60 flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={3}
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll Right"
            className="absolute right-[-24px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-600 shadow-lg shadow-pink-500/60 flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={3}
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Cards Container */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:snap-none scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-transparent"
      >
        {products.map((product, index) => (
          <div
            key={index}
            onClick={() => navigate(product.path)}
            className="
              snap-center shrink-0 cursor-pointer relative
              w-full sm:w-full md:w-full max-w-sm
              bg-white/5 backdrop-blur-lg border border-orange-500 rounded-3xl shadow-lg
              transition-transform duration-300 hover:-translate-y-2 hover:shadow-orange-300/40
              hover:ring-2 hover:ring-orange-400 hover:ring-offset-2 hover:ring-offset-black
              after:content-[''] after:absolute after:inset-0 after:rounded-3xl after:border-2 after:border-orange-400 after:scale-0 hover:after:scale-100 after:transition-transform after:duration-500 after:opacity-20
            "
            style={{ minWidth: "100%" }} 
          >
            {/* Image */}
            <div className="overflow-hidden rounded-t-3xl">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-56 transition-transform duration-300"
              />
            </div>

            {/* Tag */}
            <span className="absolute px-4 py-1 text-xs font-semibold text-black bg-orange-500 rounded-full shadow-md top-4 left-4">
              {product.tag}
            </span>

            {/* Content */}
            <div className="p-6 space-y-4 text-center">
              <h3 className="text-2xl font-bold text-orange-200 transition">
                {product.name}
              </h3>

              <p className="text-sm leading-relaxed text-gray-300">
                {product.description}
              </p>

              {product.name === "Spirit" && (
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {["Arrack", "Brandy", "Gin", "Rum", "Vodka", "Whisky","Nine Arches"].map(
                    (type) => (
                      <span
                        key={type}
                        className="px-3 py-1 text-xs font-semibold text-orange-400 transition rounded-full shadow-md cursor-default select-none bg-white/10 hover:bg-orange-500 hover:text-white"
                      >
                        {type}
                      </span>
                    )
                  )}
                </div>
              )}

              <button className="px-6 py-2 mt-4 font-semibold text-black transition bg-orange-500 rounded-full hover:bg-white hover:text-orange-500">
                Explore Now →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
